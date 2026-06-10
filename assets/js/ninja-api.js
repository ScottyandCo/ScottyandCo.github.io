const API_KEY = "UVZKJs84H9ISuVWsT8VOiPaHn2KMHN6PUuev11EN";
const COUNTRY_URL = "https://api.api-ninjas.com/v1/country?name=";
const FLAG_URL = "https://api.api-ninjas.com/v1/countryflag?country="; // Country must be a 2-letter ISO-3166 alpha-2 country code (e.g. AU, CA, FR)
var returnContainer = document.getElementById('returnContainer');

document.addEventListener('DOMContentLoaded', function () {
  // wait for DOM to be loaded before attaching the submit even listener

  // add event listeners to each checkbox to ensure only 1 api route is selectable at a time.
  document.getElementById('cbCapital').addEventListener('click', function () {
    if (this.checked) {
      document.getElementById('cbFlag').checked = false;
    }
  });
  document.getElementById('cbCurrency').addEventListener('click', function () {
    if (this.checked) {
      document.getElementById('cbFlag').checked = false;
    }
  });
  document.getElementById('cbPopulation').addEventListener('click', function () {
    if (this.checked) {
      document.getElementById('cbFlag').checked = false;
    }
  });
  document.getElementById('cbFlag').addEventListener('click', function () {
    if (this.checked) {
      document.getElementById('cbCapital').checked = false;
      document.getElementById('cbCurrency').checked = false;
      document.getElementById('cbPopulation').checked = false;
    }
  });

  document.getElementById('myForm').addEventListener('submit', async function (event) {
    // prevent the page from reloading on submit
    event.preventDefault();
    returnContainer.innerHTML = '<p style="font-weight: bold; text-align: center">Working...</p>';
    const userInput = document.getElementById('inputCountry').value.trim();
    // Call the getData function and await the data return
    const countryData = await getData(userInput, "countryData");
    // if data.length < 1 then no data has been returned, advise the user
    if (countryData.length > 0) {
      const countryName = countryData['0']['name'];
      returnContainer.innerHTML = `<p class="countryHeader">${countryName}</p>`;

      // Create boolean variables for each checkbox (true === checked)
      const flagRequested = document.getElementById('cbFlag').checked;
      const populationRequested = document.getElementById('cbPopulation').checked;
      const currencyRequested = document.getElementById('cbCurrency').checked;
      const capitalRequested = document.getElementById('cbCapital').checked;

      // TODO: create dictionary and use a for loop to iterate through options instead of multiple if statements.
      // return the correct data and add the line to the returnContainer item to show in the DOM.
      if (populationRequested) {
        const population = countryData['0']['population'];
        returnContainer.innerHTML += `<p style="font-weight: bold">Population: <span style="font-weight: normal">${population}</span></p>`;
      }
      if (capitalRequested) {
        const capitalCity = countryData['0']['capital'];
        returnContainer.innerHTML += `<p style="font-weight: bold">Capital City: <span style="font-weight: normal">${capitalCity}</span></p>`;
      }
      if (currencyRequested) {
        const currency = countryData['0']['currency']['name'];
        returnContainer.innerHTML += `<p style="font-weight: bold">Currency: <span style="font-weight: normal">${currency}</span></p>`;
      }
      if (flagRequested) {
        const jsonReturn = await getData(countryData, "Flag");
        const flagURL = jsonReturn['rectangle_image_url'];
        returnContainer.innerHTML += `<p style="font-weight: bold">Flag:</p>
        <p>
        <img style="max-width: 200px; max-height: 100px" src="${flagURL}">`;
      }
    } else {
      returnContainer.innerHTML = `<p style="font-weight: bold">No Country was found, try again</p>`;
    }
  });
});

async function getData(input, requestType) {
  if (input.length > 0) {
    var url;
    var requestData;
    if (requestType == "countryData") {
      url = COUNTRY_URL;
      requestData = input;
    } else {
      url = FLAG_URL;
      const countryCodeFromData = input['0']['iso2'];
      requestData = countryCodeFromData;
    }
    try {
      const response = await fetch(`${url}${requestData}`, {
        method: 'GET',
        headers: {
          'X-Api-Key': API_KEY
        },
      });
      if (!response.ok) {
        console.log(response);
        throw new Error(`API Error ${response.status}: ${response.statusText}`);
      } else {
        console.log(response);
        const requestedData = await response.json();
        return requestedData;
      }
    } catch (error) {
    returnContainer.innerHTML = `<p style="font-weight: bold">Something went wrong <span style="color: red">${error.message}</span></p>`;
    }
  } else {
    returnContainer.innerHTML = `<p>You <span style="font-weight: bold">must</span> enter a Country Name</p>`;
  }
}
