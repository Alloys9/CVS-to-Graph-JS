# Kiva Loan Analytics

## Project Overview

Kiva is an international nonprofit founded in 2005 with the mission to connect people through lending to alleviate poverty. By lending as little as $25 on Kiva, anyone can help a borrower start or grow a business, go to school, access clean energy, or realize their potential.

### Project Objective

The board of Kiva Loan has approached us to create a modern data warehouse to perform detailed analytics on the following areas:
i. The borrowing rate across different times of the year
iv. The disbursement rate across the year
x. The demographic trend of the fundraisers across different regions in relation to time of the year

## Project Structure

### Data Sources

The following CSV files are used as data sources for this project:
- `kiva_loans.csv`
- `kiva_mpi_region_locations.csv`
- `loan_theme_ids.csv`
- `loan_themes_by_region.csv`

### Technologies Used

- **Node.js**: For data extraction and transformation.
- **MySQL**: As the database for storing and querying the data.
- **JavaScript (D3.js and Chart.js)**: For data visualization on the web.
- **HTML & CSS**: For structuring and styling the web pages.

## Setup and Installation

### Prerequisites
1. **Install Node.js Packages:**
    ```sh
    npm install
   
2. **Set Up MySQL Database:**
    ```sh
    node extract.js
   
3. **Run Data Extraction Script:**
    ```sh
    node transform.js
   
4. **Open the HTML File:**



**Clone the Repository:**
   https://github.com/Alloys9/CVS-to-Graph-JS.git
  
