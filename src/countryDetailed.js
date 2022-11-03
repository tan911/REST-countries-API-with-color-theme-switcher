const renderDetailedCountry = document.querySelector('.container');

function detailedCountry(data) {
  // const data = JSON.parse(region);
  //   console.log('hello data');
  if (data.length === 0) return;
  const htmlDetailedCountry = `
    <div class="img-container">
    <img src=${data[0].flag} alt="flag" />
  </div>
  <div class="rootData-container">
    <h3 class="country--name">${data[0].name}</h3>
    <div class="data-container">
    <div>
      <p class="data_row">Native name:  <span>${data[0].nativeName}</span></p>
      <p class="data_row">Population:  <span>${data[0].population}</span></p>
      <p class="data_row">Region:  <span>${data[0].region}</span></p>
      <p class="data_row">Sub region:  <span>${data[0].subregion}</span></p>
      <p class="data_row capital">Capital:  <span>${data[0].capital}</span></p>
      </div>
      <div>
      <p class="data_row domain">Top Level Domain:  <span>${data[0].topLevelDomain}</span></p>
      <p class="data_row">Currencies:  <span>${data[0].currencies.name}</span></p>
      <p class="data_row">Languages:  <span>${data[0].languages.name}</span></p>
      </div>
    </div>
    <div class="borders-container">
      <p>Border countries:</p>
      <div class="borders">
        <a href="#" class="borders__link">Borders</a>
        <a href="#" class="borders__link">Boreder</a>
        <a href="#" class="borders__link">Borders</a>
      </div>
    </div>
  </div>
    `;

  if (renderDetailedCountry) {
    renderDetailedCountry.insertAdjacentHTML('beforeend', htmlDetailedCountry);
  }
}

export default async function getCountryName(nameData) {
  try {
    const response = await fetch(
      `https://restcountries.com/v2/name/${nameData}`
    );
    const data = await response.json();

    localStorage.setItem('data', JSON.stringify(data));
    detailedCountry(data);
  } catch (err) {
    alert('Failed to load a country data');
  }
}

export function name(name) {
  console.log(name);
}
