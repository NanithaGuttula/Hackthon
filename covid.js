// Fetch data from disease.sh API
function fetchData(url) {
    return fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .catch(error => {
            console.error('There was a problem with your fetch operation:', error);
        });
}

// Function to create dropdown options
function createDropdownOptions(data, dropdownId) {
    const dropdown = document.getElementById(dropdownId);
    dropdown.innerHTML = '';
    data.forEach(item => {
        const option = document.createElement('option');
        option.text = item.country;
        option.value = item.country;
        dropdown.add(option);
    });
}

// Function to display data in a table
function displayDataInTable(data, tableId) {
    const table = document.getElementById(tableId);
    table.innerHTML = '';
    data.forEach(countryData => {
        const row = table.insertRow();
        Object.values(countryData).forEach(value => {
            const cell = row.insertCell();
            cell.textContent = value;
        });
    });
}

// Function to display line chart
function displayLineChart(data, chartId) {
    // Code to display line chart
}

// Fetch data for dropdown options
fetchData('https://disease.sh/v3/covid-19/countries')
    .then(data => {
        createDropdownOptions(data, 'affectedDropdown');
        createDropdownOptions(data, 'vaccinatedDropdown');
    });

// Fetch data for neighboring countries and display in table
const neighboringCountries = ['India', 'Sri Lanka', 'Bangladesh', 'China', 'Nepal'];
const neighboringCountriesData = [];
neighboringCountries.forEach(country => {
    fetchData(`https://disease.sh/v3/covid-19/countries/${country}`)
        .then(data => {
            neighboringCountriesData.push({
                country: data.country,
                cases: data.cases,
                deaths: data.deaths,
                recoveries: data.recovered,
                vaccinations: data.population - data.active
            });
            if (neighboringCountriesData.length === neighboringCountries.length) {
                displayDataInTable(neighboringCountriesData, 'neighboringCountriesTable');
            }
        });
});
