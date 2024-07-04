 // Function to load CSV data
 async function loadCSV(url) {
    const response = await fetch(url);
    const data = await response.text();
    console.log(`Data loaded from ${url}`, data); // Debug statement
    return d3.csvParse(data);
  }

  // Load datasets
  Promise.all([
    loadCSV('kiva_loans.csv'),
    loadCSV('kiva_mpi_region_locations.csv'),
    loadCSV('loan_theme_ids.csv'),
    loadCSV('loan_themes_by_region.csv')
  ]).then(([kivaLoans, mpiRegions, loanThemeIds, loanThemesByRegion]) => {
    console.log('kivaLoans:', kivaLoans); 
    console.log('mpiRegions:', mpiRegions); 
    console.log('loanThemeIds:', loanThemeIds); 
    console.log('loanThemesByRegion:', loanThemesByRegion); 
    
    // Process and visualize data
    visualizeBorrowingRate(kivaLoans);
    visualizeDisbursementRate(kivaLoans);
    visualizeDemographicTrend(kivaLoans, mpiRegions);
  }).catch(error => {
    console.error('Error loading datasets:', error);
  });

  // Function to visualize borrowing rate
  function visualizeBorrowingRate(data) {
    const ctx = document.getElementById('borrowingRateChart').getContext('2d');
    const loader = document.getElementById('borrowingRateLoader');
    
    // Sample data processing for borrowing rate
    const borrowingRateData = {};
    data.forEach(row => {
      const date = new Date(row.date);
      if (!isNaN(date.getTime())) {
        const yearMonth = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}`;
        if (!borrowingRateData[yearMonth]) {
          borrowingRateData[yearMonth] = 0;
        }
        borrowingRateData[yearMonth] += 1;
      }
    });

    console.log('Borrowing Rate Data:', borrowingRateData); 
    

    const labels = Object.keys(borrowingRateData).sort();
    const chartData = Object.values(borrowingRateData);

    const chart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: labels,
        datasets: [{
          label: 'Borrowing Rate',
          data: chartData,
          borderColor: 'rgba(75, 192, 192, 1)',
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
        }]
      }
    });

    loader.classList.add('hidden');
  }

  // Function to visualize disbursement rate
  function visualizeDisbursementRate(data) {
    const ctx = document.getElementById('disbursementRateChart').getContext('2d');
    const loader = document.getElementById('disbursementRateLoader');
    
    // Sample data processing for disbursement rate
    const disbursementRateData = {};
    data.forEach(row => {
      const date = new Date(row.disbursed_time);
      if (!isNaN(date.getTime())) {
        const yearMonth = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}`;
        if (!disbursementRateData[yearMonth]) {
          disbursementRateData[yearMonth] = 0;
        }
        disbursementRateData[yearMonth] += parseFloat(row.loan_amount);
      }
    });

    console.log('Disbursement Rate Data:', disbursementRateData); 

    const labels = Object.keys(disbursementRateData).sort();
    const chartData = Object.values(disbursementRateData);

    const chart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: labels,
        datasets: [{
          label: 'Disbursement Rate',
          data: chartData,
          borderColor: 'rgba(153, 102, 255, 1)',
          backgroundColor: 'rgba(153, 102, 255, 0.2)',
        }]
      }
    });

    loader.classList.add('hidden');
  }

  // Function to visualize demographic trend
  function visualizeDemographicTrend(loansData, regionsData) {
    const ctx = document.getElementById('demographicTrendChart').getContext('2d');
    const loader = document.getElementById('demographicTrendLoader');
    
    // Sample data processing for demographic trend
    const demographicTrendData = {};
    loansData.forEach(row => {
      const region = row.region;
      if (region) {
        if (!demographicTrendData[region]) {
          demographicTrendData[region] = 0;
        }
        demographicTrendData[region] += 1;
      }
    });

    console.log('Demographic Trend Data:', demographicTrendData); 

    const labels = Object.keys(demographicTrendData);
    const chartData = Object.values(demographicTrendData);

    const chart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [{
          label: 'Demographic Trend',
          data: chartData,
          backgroundColor: 'rgba(54, 162, 235, 0.6)',
          borderColor: 'rgba(54, 162, 235, 1)', 
          borderWidth: 1,
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          x: {
            beginAtZero: true,
            ticks: {
              maxRotation: 90,
              minRotation: 45
            }
          },
          y: {
            beginAtZero: true
          }
        },
        plugins: {
          legend: {
            position: 'top'
          },
          tooltip: {
            callbacks: {
              label: function(context) {
                return `${context.label}: ${context.raw}`;
              }
            }
          }
        }
      }
    });

    loader.classList.add('hidden');
  }