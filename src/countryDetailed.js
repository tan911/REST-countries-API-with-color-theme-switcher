const renderDetailedCountry = document.querySelector('.container');

let dataCountry = JSON.parse(localStorage.getItem('data')) || [];

function detailedCountry(data) {
  // console.log(data[0].currencies[0].name);

  if (data.length === 0) return;

  const htmlDetailedCountry = `
    <div class="img-container">
    <img src=${
      data[0].flags === undefined ? data[0].flags.svg : data[0].flag
    } alt="flag" />
  </div>
  <div class="rootData-container">
    <h3 class="country--name">${
      data[0].name === undefined
        ? data[0].name.nativeName.grn.official
        : data[0].name
    }</h3>
    <div class="data-container">
    <div>
      <p class="data_row">Native name:  <span>${data[0].nativeName}</span></p>
      <p class="data_row">Population:  <span>${data[0].population}</span></p>
      <p class="data_row">Region:  <span>${data[0].region}</span></p>
      <p class="data_row">Sub region:  <span>${data[0].subregion}</span></p>
      <p class="data_row capital">Capital:  <span>${data[0].capital}</span></p>
      </div>
      <div>
      <p class="data_row domain">Top Level Domain:  <span>${
        data[0].topLevelDomain
      }</span></p>
      <p class="data_row">Currencies:  <span>${
        data[0].currencies[0].name
      }</span></p>
      <p class="data_row">Languages:  <span>${
        data[0].languages[0].name
      }</span></p>
      </div>
    </div>
    <div class="borders-container">
      <p>Border countries:</p>
      <div class="borders">
        <a href="#" class="borders__link">${
          data[0].borders === undefined || data[0].borders === null
            ? 'no borders'
            : data[0].borders[0]
        }</a>
        <a href="#" class="borders__link">${
          data[0].borders === undefined || data[0].borders === null
            ? 'no borders'
            : data[0].borders[0]
        }</a>
        <a href="#" class="borders__link">${
          data[0].borders === undefined || data[0].borders === null
            ? 'no borders'
            : data[0].borders[0]
        }</a>
      </div>
    </div>
  </div>
    `;

  if (renderDetailedCountry) {
    renderDetailedCountry.insertAdjacentHTML('beforeend', htmlDetailedCountry);
  }

  const border = document.querySelectorAll('.borders__link');

  for (let i = 0; i < border.length; i++) {
    border[i].addEventListener('click', e => {
      e.preventDefault();
      const name = border[i].textContent;
      getBorderCountry(name);
    });
  }
}

export default async function getCountryName(nameData) {
  try {
    const response = await fetch(
      `https://restcountries.com/v2/name/${nameData}`
    );
    const data = await response.json();

    // detailedCountry(data);
    // console.log(data);
    localStorage.setItem('data', JSON.stringify(data));
  } catch (err) {
    alert('Failed to load a country data');
  }
}

async function getBorderCountry(name) {
  try {
    const response = await fetch(
      `https://restcountries.com/v3.1/alpha/${name}`
    );
    const data = await response.json();
    // localStorage.setItem('data', JSON.stringify(data));
    console.log(data);
    // detailedCountry(dataCountry);
  } catch (err) {
    console.log(err.message);
  }
}

detailedCountry(dataCountry);
