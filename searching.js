'use strict'


// ELEMENTS 
const searchInput = document.getElementById("search--input");
const searchBtn = document.getElementById("search--btn");
const overly = document.querySelector(".overly");
const errorContainer = document.querySelector(".error__messge");
const errorText = document.querySelector(".error--text");
const okBtn = document.querySelector(".ok--btn");
const searchResults = document.querySelector(".search__results");
const countrys2 = document.querySelector(".countrys");


// Country Searching 
searchBtn.addEventListener("click", searching);
searchInput.addEventListener("keydown", (e) => {
    if (e.key === 'Enter') searching()
})

// Searching 
function searching() {
    const country = searchInput.value;
    searchingCountry(country);
}

// Display and hidde error 
okBtn.addEventListener("click", removeError)
overly.addEventListener("click", removeError)

function displayError(err) {
    overly.classList.remove("hidden");
    errorText.textContent = err;
    errorContainer.classList.remove("hidden");
}

function removeError() {
    overly.classList.add("hidden");
    errorContainer.classList.add("hidden");
}

let countryData;
async function searchingCountry(name) {
    try {
        const res = await fetch(`https://restcountries.com/v3.1/name/${name}`);
        // console.log(res)
        if (!res.ok) throw new Error(`Somthing went to wrong. country ${res.statusText}`)
        const data = await res.json();
        countryData = data;
        addResults(data)
        console.log(data)
    } catch (err) {
        // console.log(err.message);
        displayError(err)
    }
}

function addResults(data) {
    overly.classList.remove("hidden");
    data.forEach((el, i) => {
        console.log(el, i)
        const html = `
            <div data-index="${i}" class="search--result">
                <img src="${el.flags.png}" alt="" class="country--flag">
                <p class="country--name">${el.name.official}</p>
            </div>
        `
        searchResults.insertAdjacentHTML("beforeend", html);
    });
}

searchResults.addEventListener("click", displayCountry);

function displayCountry(e) {
    if (!e.target.closest(".search--result")) return
    const i = +e.target.closest(".search--result").dataset.index;
    console.log(countryData[i])
    const html = `
            <article class="country__card ">
                <img class="country--flag" src="${countryData[i].flags.png}" alt="">
                <div class="country__details">
                    <h1 class="country--name">${countryName(countryData[i].name.official)}</h1>
                    <h3 class="country--region">${countryData[i].region}</h3>
                    <p class="country--row"><span>👫</span>${(+countryData[i].population / 1000000).toFixed(1)} M</p>
                    <p class="country--row"><span>🗣️</span>${Object.values(countryData[i].languages).join(", ")}</p>
                    <p class="country--row"><span>💰</span>${Object.values(countryData[i].currencies)[0].name}</p>
                </div>
            </article>
    `;
    countrys2.insertAdjacentHTML("beforeend", html);
    countrys2.style.opacity = 1;
    searchResults.innerHTML = '';
    overly.classList.add("hidden")
}