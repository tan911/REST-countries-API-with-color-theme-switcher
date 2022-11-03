'use strict';

import API from './countryDetailed.js';
import { name } from './countryDetailed.js';

const selectRegion = document.getElementById('select-region');
const filterRegion = document.querySelector('.filter--region');
const regions = document.querySelectorAll('.region-items');
const filterTitle = document.querySelector('.filtered-title');
const search = document.querySelector('.input');
const country = document.querySelector('.countries--container');
// const renderDetailedCountry = document.querySelector('.container');
const backBtn = document.querySelector('.button');

let dataCountry = JSON.parse(localStorage.getItem('data')) || [];

///////////////////////
// RENDER A COUNTRY
function countries(data) {
  /////////////////////////////////
  // categories for dropdown region
  for (let i = 0; i < regions.length; i++) {
    regions[i].addEventListener('click', () => {
      filterTitle.textContent = regions[i].textContent;
      filterRegion.classList.toggle('hidden');
      const cRegion = regions[i].textContent;

      filter(cRegion, countryDetailed, '', r);
    });
  }

  //////////////////////
  // search by name
  if (search) {
    search.addEventListener('search', e => {
      let name = e.target.value;

      filter(name, countryDetailed, data, '');
      e.target.value = '';
    });
  }

  const r = [];

  const htmlCountry = data
    .map(region => {
      r.push(region.region);
      return `
      <div class="countries" onclick="dCountry('${
        region.name.common === undefined ? region.name : region.name.common
      }')">
      <a href="./countryDetailed.html">
       <article class="country">
      <img class="country__img" src=${region.flags.svg} />
      <div class="country__data">
        <h3 class="country__name">${
          region.name.common === undefined ? region.name : region.name.common
        }</h3>
        <p class="country__row">Population: <span>${(
          +region.population / 1000000
        ).toFixed(1)}</span></p>
        <p class="country__row">Region: <span>${region.region}</span></p>
        <p class="country__row">Capital: <span>${region.capital}</span></p>
      </div>
      </article>
      </a>
      </div>
      `;
    })
    .join('');

  if (country) {
    country.insertAdjacentHTML('beforeend', htmlCountry);
  }

  const countryDetailed = document.querySelectorAll('.countries');
  filter('', countryDetailed, r);
}

///////////////////////
// FILTERED COUNTRY
function filter(region, countryDetailed, data, r) {
  if (!region) return;

  if (r !== '' && data === '') {
    for (let i = 0; i < r.length; i++) {
      if (r[i] !== region) {
        countryDetailed[i].classList.add('hidden');
      } else if (r[i] === region) {
        countryDetailed[i].classList.remove('hidden');
      }
    }
  } else {
    for (let i = 0; i < data.length; i++) {
      if (data[i].name['common'] !== region) {
        countryDetailed[i].classList.add('hidden');
      } else if (data[i].name['common'] === region) {
        countryDetailed[i].classList.remove('hidden');
      }
    }
  }
}

// TODO
function dCountry(name) {
  API(name);
}

dCountry('Barbados');

/////////////////////////////
// Render Detailed Country
// function detailedCountry(data) {
//   // const data = JSON.parse(region);
//   console.log('hello data');
//   if (data.length === 0) return;
//   const htmlDetailedCountry = `
//     <div class="img-container">
//     <img src=${data[0].flag} alt="flag" />
//   </div>
//   <div class="rootData-container">
//     <h3>${data[0].name}</h3>
//     <div class="data-container">
//       <p class="data_row">Native name: <span>${data[0].nativeName}</span></p>
//       <p class="data_row">Top Level Domain: <span>${data[0].topLevelDomain}</span></p>
//       <p class="data_row">Population: <span>${data[0].population}</span></p>
//       <p class="data_row">Currencies: <span>${data[0].currencies.name}</span></p>
//       <p class="data_row">Region: <span>${data[0].region}</span></p>
//       <p class="data_row">Languages: <span>${data[0].languages.name}</span></p>
//       <p class="data_row">Sub region: <span>${data[0].subregion}</span></p>
//       <p class="data_row">Capital: <span>${data[0].capital}</span></p>
//     </div>
//     <div class="borders-container">
//       <p>Border countries:</p>
//       <div>
//         <a href="#">Borders</a>
//         <a href="#">Boreder</a>
//         <a href="#">Borders</a>
//       </div>
//     </div>
//   </div>
//     `;

//   if (htmlDetailedCountry) {
//     renderDetailedCountry.insertAdjacentHTML('beforeend', htmlDetailedCountry);
//   }
// }

////////////////////////////////////
// GETTING COUNTRY DATA
async function getCountry() {
  try {
    const response = await fetch(`https://restcountries.com/v3.1/all`);
    const data = await response.json();
    countries(data);
  } catch (err) {
    console.log(err);
  }
}

///////////////////
// SET DATA BY NAME
// if (renderDetailedCountry) {
//   async function getCountryName(nameData) {
//     try {
//       const response = await fetch(
//         `https://restcountries.com/v2/name/${nameData}`
//       );
//       const data = await response.json();

//       console.log(data);
//     } catch (err) {
//       alert('Failed to load a country data');
//     }
//   }
// }

//////////////////////////////
// toggle the filter dropdown
if (selectRegion) {
  selectRegion.addEventListener('click', () => {
    filterRegion.classList.toggle('hidden');
  });
}

/////////////////////////////////////////////////////////////
/// set the data empty in locastorage if back button is clicked
if (backBtn) {
  backBtn.addEventListener('click', () => {
    dataCountry = [];
    localStorage.setItem('data', JSON.stringify(dataCountry));
  });
}

////////////////////
// starting data
getCountry();
