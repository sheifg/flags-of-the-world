"use strict";

const renderCountry = (data) => {
  const {
    region,
    population,
    name: { common: countryName },
    flags: { svg: flag },
    capital,
    languages,
  } = data;

  const countryDiv = document.createElement("div");
  countryDiv.classList = `card col-12 col-sm-6 col-lg-3 m-3`;
  countryDiv.innerHTML = ` <img src="${flag}" class="card-img-top mt-3 border border-secondary" />
            <div class="card-body">
              <h5 class="card-title">${countryName}</h5>
              <p class="card-text">${region}</p>
              <ul class="list-group">
                <li
                  class="list-group-item d-flex justify-content-between align-items-center"
                >
                  <span><i class="fas fa-2x fa-landmark mx-3"></i>${
                    capital[0]
                  }</span>
                </li>
                <li
                  class="list-group-item d-flex justify-content-between align-items-center"
                >
                  <span><i class="fas fa-lg fa-users mx-3"></i>${(
                    population / 1_000_000
                  ).toFixed(2)} M</span>
                </li>
                <li
                  class="list-group-item d-flex justify-content-between align-items-center"
                >
                  <span><i class="fas fa-lg fa-comments mx-3"></i>${
                    Object.values(languages)[0]
                  }</span>
                </li>
              </ul>
            </div>`;
  const container = document.getElementById("country-container");
  container.append(countryDiv);
};

const renderError = (msg) => {
  const header = document.getElementById("header-container");
  const divError = document.createElement("div");
  divError.className = `container`;
  const html = `<div class="alert alert-danger text-center m-3">${msg}</div>`;
  divError.innerHTML = html;
  header.appendChild(divError);
  // Removing the error message after 4s
  setTimeout(() => {
    divError.remove();
  }, 4000);
};

const viewCountry = async (countryName) => {
  const url = `https://restcountries.com/v3.1/name/${countryName}`;
  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`${response.status}-${response.statusText}`);
    }
    const data = await response.json();
    // data[0] is the first object and correspons to the country
    renderCountry(data[0]);
  } catch (error) {
    renderError(error);
  }
};

const clearBtn = document.getElementById("clear");
clearBtn.addEventListener("click", () => {
  document.getElementById("country-container").innerHTML = "";
  document.getElementById("input").value = "";
});

const input = document.getElementById("input");
const searchBtn = document.getElementById("search");
// Searching for the country flag
searchBtn.addEventListener("click", () => {
  let country = input.value;
  viewCountry(country);
});
