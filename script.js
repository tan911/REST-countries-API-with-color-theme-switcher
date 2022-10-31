'use strict';

const selectRegion = document.getElementById('select-region');
const filterRegion = document.querySelector('.filter--region');
const regions = document.querySelectorAll('.region-items');
const filterTitle = document.querySelector('.filtered-title');
const search = document.querySelector('.input');
const country = document.querySelector('.countries--container');

function countries(data) {
  // console.log(data.length);
  const htmlCountry = `
  <div class="countries">
     <article class="country">
    <img class="country__img" src=${data[0].flag} />
    <div class="country__data">
      <h3 class="country__name">${data[0].name}</h3>
      <p class="country__row">Population: <span>${(
        +data[0].population / 1000000
      ).toFixed(1)}</span></p>
      <p class="country__row">Region: <span>${data[0].region}</span></p>
      <p class="country__row">Capital: <span>${data[0].capital}</span></p>
    </div>
    </article>
    </div>
    `;

  const htmlRegion = data
    .map(region => {
      return `
    <div class="countries">
       <article class="country">
      <img class="country__img" src=${region.flags.svg} />
      <div class="country__data">
        <h3 class="country__name">${region.name.common}</h3>
        <p class="country__row">Population: <span>${(
          +region.population / 1000000
        ).toFixed(1)}</span></p>
        <p class="country__row">Region: <span>${region.region}</span></p>
        <p class="country__row">Capital: <span>${region.capital}</span></p>
      </div>
      </article>
      </div>
      `;
    })
    .join('');

  // country.insertAdjacentHTML('beforeend', htmlCountry);
  // country.style.opacity = 1;

  if (data.length === 1) {
    country.insertAdjacentHTML('beforeend', htmlCountry);
    country.style.opacity = 1;
  } else {
    country.insertAdjacentHTML('beforeend', htmlRegion);
    country.style.opacity = 1;
  }
}

////////////////////////////////////
// getting the country data from api
async function getCountry(country) {
  try {
    const response = await fetch(
      `https://restcountries.com/v2/name/${country}`
    );
    const data = await response.json();

    //   console.log(data);
    countries(data);
  } catch (err) {
    alert('failed to load a data.');
    console.log(err.message);
  }
}

////////////////////////////////
// Filter by region
async function getCountryRegion(region) {
  try {
    const response = await fetch(
      `https://restcountries.com/v3.1/region/${region}`
    );
    const data = await response.json();
    // console.log(data);
    countries(data);
  } catch (err) {
    alert('Failed to load by region');
  }
}

///////////////////
// Search by name
async function getCountryName(name) {
  try {
    const response = await fetch(`https://restcountries.com/v2/name/${name}`);
    const data = await response.json();
    countries(data);
  } catch (err) {
    alert('Failed to load a country data');
  }
}

//////////////////////////////
// toggle the filter dropdown
selectRegion.addEventListener('click', () => {
  filterRegion.classList.toggle('hidden');
});

//////////////////////
// selecting a region
for (let i = 0; i < regions.length; i++) {
  regions[i].addEventListener('click', () => {
    filterTitle.textContent = regions[i].textContent;
    filterRegion.classList.toggle('hidden');
    const region = regions[i].textContent;

    // filter by region
    getCountryRegion(region);
  });
}

search.addEventListener('search', e => {
  let name = e.target.value;
  getCountryName(name);
});

getCountry('Germany');
getCountry('United States of America');
getCountry('Brazil');
getCountry('Iceland');
getCountry('Philippines');
getCountry('Albania');
getCountry('Japan');
getCountry('Russia');
