'use strict'

// ELEMENTS 
const countrys = document.querySelector(".countrys");
const btn = document.querySelector(".country__btn");


/////////////////////////////////////////////////
/////////////////////////////////////////////////

function countryName(str) {
    const arr = str.split(" ");
    const length = arr.length;
    return arr[length - 1];
}

const renderCountry = function (data, className = '') {
    const html = `
            <article class="country__card ${className}">
                <img class="country--flag" src="${data.flags.png}" alt="">
                <div class="country__details">
                    <h1 class="country--name">${countryName(data.name.official)}</h1>
                    <h3 class="country--region">${data.region}</h3>
                    <p class="country--row"><span>👫</span>${(+data.population / 1000000).toFixed(1)} M</p>
                    <p class="country--row"><span>🗣️</span>${Object.values(data.languages).join(", ")}</p>
                    <p class="country--row"><span>💰</span>${Object.values(data.currencies)[0].name}</p>
                </div>
            </article>
    `;
    countrys.insertAdjacentHTML("beforeend", html);
    countrys.style.opacity = 1;
}

const renderErr = (msg) => {
    countrys.insertAdjacentText("beforeend", msg)
    countrys.style.opacity = 1;
}

const getPosition = () => {
    return new Promise((resolve, rejected) => {
        // navigator.geolocation.getCurrentPosition(
        //     position => resolve(position),
        //     error => rejected(error)
        // )
        navigator.geolocation.getCurrentPosition(resolve, rejected);
    })
}

// FINAL CODE 

let clicks = 0;
const whereAmI = async () => {
    try {// Geolocation
        if (clicks < 1) {
            const pos = await getPosition();
            const { latitude: lat, longitude: lng } = pos.coords;
            // Revers GeoCoding
            const geoRes = await fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}&localityLanguage=en`)
            if (!geoRes.ok) throw new Error("Something went to wrong in geo coding")
            const geoData = await geoRes.json();

            // Country Data
            const res = await fetch(`https://restcountries.com/v3.1/alpha/${geoData.countryCode}`);
            if (!res.ok) throw new Error("Something went to wrong in country data")
            const data = await res.json();
            renderCountry(data[0])
        }
        clicks++;
    } catch (err) {
        renderErr(`${err.message}`)
        // console.error(err)

        // throw err
    }
}

btn.addEventListener("click", whereAmI)

// whereAmI()
// (async function () {
//     try {
//         const str = await whereAmI();
//         console.log(str)
//     } catch (err) {
//         console.error(`🔥🔥 ${err}`)
//     }
// })()

// const getJSON = (url, error = 'country not found') => {
//     return fetch(url)
//         .then(response => {
//             if (!response.ok)
//                 throw new Error(`${error} (${response.status})`)
//             return response.json()
//         })
// }

// const getCountryData = function (country) {
//     //Country 1
//     getJSON(`https://restcountries.com/v3.1/name/${country}`)
//         .then(data => {
//             renderCountry(data[0])

//             // Country 2
//             let neighbour;
//             if (!data[0].borders) {
//                 throw new Error(`Neighbour not found!`)
//             } else {
//                 [neighbour] = data[0].borders
//             };
//             return getJSON(`https://restcountries.com/v3.1/alpha/${neighbour}`);
//         })
//         .then(data => renderCountry(data[0], "neighbour"))
//         .catch(err => displayMsg(`Something went wrong🔥🔥 ${err.message}. try again`))
//         .finally(() => {
//             countrys.style.opacity = 1;
//         })
// }

// const getPosition = () => {
//     return new Promise((reslolve, rejected) => {
//         navigator.geolocation.getCurrentPosition(reslolve, rejected);
//     })
// }

// function whereAmI() {
//     getPosition().then(pos => {
//         const { latitude: lat, longitude: lng } = pos.coords;
//         return fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}&localityLanguage=en`)
//     })
//         .then(response => {
//             if (!response.ok) throw new Error(`${response.status} (Bad request)`)
//             return response.json()
//         })
//         .then(data => getCountryData(data.countryName))
//         .catch(err => console.error(`Somthing went wrong ${err.message}. try again`))
// }

// btn.addEventListener("click", whereAmI)

// const searchTheCountry = function (country) {
//     const request = new XMLHttpRequest();
//     request.open('GET', `https://restcountries.com/v3.1/name/${country}`)
//     request.send();

//     request.addEventListener("load", function () {

//         const [data1] = JSON.parse(this.responseText);
//         console.log(data1);
//         renderCountry(data1)

//         const [neighbour] = data1.borders;

//         // Second AJAX Call
//         const request2 = new XMLHttpRequest();
//         request2.open('GET', `https://restcountries.com/v3.1/alpha/${neighbour}`);
//         request2.send();
//         request2.addEventListener("load", function () {
//             const [data2] = JSON.parse(this.responseText);
//             console.log(data2)
//             renderCountry(data2, "neighbour")
//         })
//     })
// }

// searchTheCountry("usa")

// searchTheCountry("portugal")


// const getAllLang = function (obj) {
//     console.log(obj)
//     console.log()
// }

// getCountryData("japan")

// console.log("Republic of India".slice(-1))

// CHALLENG 1

// whereAmI(52.508, 13.381)
// whereAmI(19.037, 72.873)
// whereAmI(-33.933, 18.474)

// How the poromice and Ascynchronous work behind the sine

// console.log("start");
// setTimeout(() => console.log("after 0 sec"), 0);
// Promise.resolve("reslolve promise 0").then(res => console.log(res));
// Promise.resolve("resolve promise 1").then((res) => {
//     // for (let i = 0; i < 1000000000; i++);
//     console.log(res)
// })
// console.log('end');

// const lotaryTicket = new Promise(function (reslolve, rejected) {
//     console.log(`lotary ticket rendaring`)
//     setTimeout(() => {
//         if (Math.random() >= 0.5) { reslolve(`You win 🏆`) }
//         else { rejected('You lost your money 😅') };
//     }, 2000);
// })

// lotaryTicket
//     .then(res => console.log(res))
//     .catch(err => console.error(err));

// const wait = (sec) => {
//     return new Promise((reslolve) => {
//         setTimeout(reslolve, sec * 1000);
//     })
// }

// wait(1).then(() => {
//     console.log('I waited for 1 seconds');
//     return wait(1);
// }).then(() => {
//     console.log('I waited for 1 second');
// })





