"use strict";

const btn = document.querySelector(".btn-country");
const countriesContainer = document.querySelector(".countries");

const renderError = function (msg) {
  countriesContainer.insertAdjacentText("beforeend", msg);
  // countriesContainer.style.opacity = 1;
};

///////////////////////////////////////

// const getCountryData = function (country) {
//   const request = new XMLHttpRequest();
//   request.open("GET", `https://restcountries.com/v3.1/name/${country}`);

//   request.send();

//   request.addEventListener("load", function () {
//     console.log(this.responseText);

//     const [data] = JSON.parse(this.responseText);
//     console.log(data);

//     const html = `
//     <article article class="country">
//         <img class="country__img" src="${data.flags.png}" />
//         <div class="country__data">
//             <h3 class="country__name">${data.altSpellings[2]}</h3>
//             <h4 class="country__region">${data.region}</h4>
//             <p class="country__row"><span>👫</span>${(
//               +data.population / 1000000
//             ).toFixed(1)} M</p>
//             <p class="country__row"><span>🗣️</span>${
//               Object.values(data.languages)[0]
//             }</p>
//             <p class="country__row"><span>💰</span>${
//               Object.values(Object.values(data.currencies)[0])[0]
//             } ${Object.values(Object.values(data.currencies)[0])[1]}</p>
//         </div>
//     </article>
//   `;
//     countriesContainer.insertAdjacentHTML("beforeend", html);
//     countriesContainer.style.opacity = 1;
//   });
// };

// getCountryData("armenia");

// getCountryData("russia");

// getCountryData("france");

// const getCountryAndNeighbiur = function (country) {
//   // AJAX call country 1
//   const request = new XMLHttpRequest();
//   request.open("GET", `https://restcountries.com/v3.1/name/${country}`);
//   request.send();

//   const renderCountry = function (data, className = "") {
//     const html = `
//       <article article class=${className}>
//           <img class="country__img" src="${data.flags.png}" />
//           <div class="country__data">
//               <h3 class="country__name">${data.altSpellings[2]}</h3>
//               <h4 class="country__region">${data.region}</h4>
//               <p class="country__row"><span>👫</span>${(
//                 +data.population / 1000000
//               ).toFixed(1)} M</p>
//               <p class="country__row"><span>🗣️</span>${
//                 Object.values(data.languages)[0]
//               }</p>
//               <p class="country__row"><span>💰</span>${
//                 Object.values(Object.values(data.currencies)[0])[0]
//               } ${Object.values(Object.values(data.currencies)[0])[1]}</p>
//           </div>
//       </article>
//     `;
//     countriesContainer.insertAdjacentHTML("beforeend", html);
//     countriesContainer.style.opacity = 1;
//   };

//   request.addEventListener("load", function () {
//     console.log(this.responseText);

//     const [data] = JSON.parse(this.responseText);
//     console.log(data);

//     // Render country 1
//     renderCountry(data);

//     // Get neighbiur
//     const [...neighbour] = data.borders;
//     if (!neighbour) return;

//     // AJAX call country 2
//     neighbour.map((value) => {
//       let request2 = new XMLHttpRequest();
//       request2.open("GET", `https://restcountries.com/v3.1/alpha/${value}`);
//       request2.send();

//       request2.addEventListener("load", function () {
//         const [data2] = JSON.parse(this.responseText);
//         renderCountry(data2, "neighbour");
//       });
//     });
//   });
// };
// getCountryAndNeighbiur("portugal");

// // Callback hell
// setTimeout(() => {
//   console.log("1 second passed");
//   setTimeout(() => {
//     console.log("2 second passed");
//     setTimeout(() => {
//       console.log("3 second passed");
//       setTimeout(() => {
//         console.log("4 second passed");
//       }, 1000);
//     }, 1000);
//   }, 1000);
// }, 1000);

// const request = new XMLHttpRequest();
//   request.open("GET", `https://restcountries.com/v3.1/name/${country}`);

//   request.send();

///==========================================================================================

const renderCountry = function (data, className = "") {
  const html = `
    <article article class=${className}>
        <img class="country__img" src="${data.flags.png}" />
        <div class="country__data">
            <h3 class="country__name">${data.altSpellings[2]}</h3>
            <h4 class="country__region">${data.region}</h4>
            <p class="country__row"><span>👫</span>${(
              +data.population / 1000000
            ).toFixed(1)} M</p>
            <p class="country__row"><span>🗣️</span>${
              Object.values(data.languages)[0]
            }</p>
            <p class="country__row"><span>💰</span>${
              Object.values(Object.values(data.currencies)[0])[0]
            } ${Object.values(Object.values(data.currencies)[0])[1]}</p>
        </div>
    </article>
  `;
  countriesContainer.insertAdjacentHTML("beforeend", html);
  countriesContainer.style.opacity = 1;
};

const getCountryData = function (country) {
  fetch(`https://restcountries.com/v3.1/name/${country}`)
    .then((response) => {
      console.log(response);
      if (!response.ok) throw new Error(`Country not found ${response.status}`);
      return response.json();
    })
    .then((data) => {
      console.log(data);
      renderCountry(data[0]);
      const [...neighbour] = data[0].borders;

      //Country 2
      if (!neighbour) return;

      neighbour.map((value) =>
        fetch(`https://restcountries.com/v3.1/alpha/${value}`)
          .then((response) => {
            if (!response.ok)
              throw new Error(`Country not found ${response.status}`);
            return response.json();
          })
          .then((array) => renderCountry(array[0], "neighbour"))
      );
    })
    .catch((err) => {
      console.error(`${err} 🔴`);
      renderError(`Something went wrong 🔴🔴🔴 ${err.message}. Try again!`);
    })
    .finally(() => {
      // countriesContainer.style.opacity = 1;
    });
};

const getJSON = function (url, errorMsg = " Something went wrong") {
  return fetch(url).then((response) => {
    if (!response.ok) throw new Error(`${errorMsg} ${response.status}`);

    return response.json();
  });
};

// const getCountryData = function (country) {
//   getJSON(`https://restcountries.com/v3.1/name/${country}`, "Contry not found")
//     .then((data) => {
//       console.log(data);
//       renderCountry(data[0]);
//       const [...neighbour] = data[0].borders;
//       // console.log(neighbour);
//       //Country 2

//       if (!neighbour) throw new Error(`No neighbour found!`);
//       console.log("s");
//       neighbour.map((value) => {
//         fetch(`https://restcountries.com/v3.1/alpha/${value}`)
//           .then((response) => {
//             if (!response.ok)
//               throw new Error(`Country not found ${response.status}`);
//             return response.json();
//           })
//           .then((array) => renderCountry(array[0], "neighbour"));
//       });
//     })
//     .catch((err) => {
//       console.error(`${err} 🔴`);
//       renderError(`Something went wrong 🔴🔴🔴 ${err.message}. Try again!`);
//     })
//     .finally(() => {
//       countriesContainer.style.opacity = 1;
//     });
// };

// btn.addEventListener("click", function () {
//   getCountryData("spain");
// });
// getCountryData("australia");

///////////////////////////////////////////////////////////
// The Event Loop in Practice

// console.log("test start");
// setTimeout(() => {
//   console.log("0 sec timer");
// }, 0);
// Promise.resolve("Resolve promise 1").then((res) => console.log(res));

// Promise.resolve("Resolved promise 2").then((res) => {
//   for (let i = 0; i < 1000000; i++) {}
//   console.log(res);
// });

// console.log("Test end");

//////////////////////////////////////////////////////////////
// // Building a Simple Promise

// setTimeout(() => {
//   console.log("Settimeout 0");
// }, 0);
// const lotteryPromis = new Promise(function (resolve, reject) {
//   console.log("Lotter draw is heppening 🔮");
//   for (let i = 0; i < 10; i++) {
//     console.log(i);
//   }
//   setTimeout(() => {
//     if (Math.random() >= 0.5) {
//       resolve(" You win 💵");
//     } else {
//       reject("You lost your money 😢");
//     }
//   }, 2000);
// });

// lotteryPromis
//   .then((res) => console.log(res))
//   .catch((err) => console.error(err));

// // Prommisify settimeout
// const wait = function (sec) {
//   return new Promise(function (resolve) {
//     setTimeout(resolve, sec * 1000);
//   });
// };

// wait(1)
//   .then(() => {
//     console.log("1 second passed");
//     return wait(1);
//   })
//   .then(() => {
//     console.log("2 second passed");
//     return wait(1);
//   })
//   .then(() => {
//     console.log("3 second passed");
//     return wait(1);
//   });

// // // Callback hell
// // setTimeout(() => {
// //   console.log("1 second passed");
// //   setTimeout(() => {
// //     console.log("2 second passed");
// //     setTimeout(() => {
// //       console.log("3 second passed");
// //       setTimeout(() => {
// //         console.log("4 second passed");
// //       }, 1000);
// //     }, 1000);
// //   }, 1000);
// // }, 1000);

// Promisifyng the Geolocation

// console.log("Getting position");

// const getPosition = function () {
//   return new Promise(function (resolve, reject) {
//     // navigator.geolocation.getCurrentPosition(
//     //   (position) => resolve(position),
//     //   (err) => reject(err)
//     // );
//     navigator.geolocation.getCurrentPosition(resolve, reject);
//   });
// };

// getPosition().then((pos) => console.log(pos));

// const whereAmI = function () {
//   getPosition()
//     .then((pos) => {
//       const { latitude: lat, longitude: lng } = pos.coords;

//       return fetch(
//         `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&accept-language=en`
//       );
//     })
//     .then((res) => {
//       if (!res.ok) throw new Error(`Problem with geocoding ${res.status}`);
//       return res.json();
//     })
//     .then((data) => {
//       console.log(data);
//       console.log(`You are in ${data.address.city}, ${data.address.country}`);

//       return fetch(
//         `https://restcountries.com/v3.1/name/${data.address.country}`
//       );
//     })
//     .then((res) => {
//       if (!res.ok) throw new Error(`Country not found (${res.status})`);
//       return res.json();
//     })
//     .then((data) => renderCountry(data[0]))
//     .catch((err) => console.error(`${err.message} 💥`));
// };

// btn.addEventListener("click", whereAmI);
////////////////////////////////////////////////////
// Consuming Promises with Async/Await
// Error Handling With try...catch

// const getPosition = function () {
//   return new Promise(function (resolve, reject) {
//     navigator.geolocation.getCurrentPosition(resolve, reject);
//   });
// };
// const whereAmI = async function (country) {
//   try {
//     // Geolocation;
//     const pos = await getPosition();

//     const { latitude: lat, longitude: lng } = pos.coords;

//     const resGeo = await fetch(
//       `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&accept-language=en`
//     );
//     if (!resGeo) throw new Error("Problem getting location data");

//     // Reverse geocoding
//     const dataGeo = await resGeo.json();

//     // Country data
//     const res = await fetch(
//       `https://restcountries.com/v3.1/name/${dataGeo.address.countryq}`
//     );
//     if (!res) throw new Error("Problem getting country");
//     const data = await res.json();
//     renderCountry(data[0]);
//     return `You are in ${dataGeo.address.city}, ${dataGeo.address.country}`;
//   } catch (err) {
//     console.error(`Something wrong ${err}🔥`);

//     // Reject promise returned from async function

//     throw err;
//   }
// };

// console.log("1: Will get location");
// const city = whereAmI();
// console.log(city);

// whereAmI()
//   .then((city) => console.log(`2: ${city}`))
//   .catch((err) => console.error(`2: ${err.message}🤷‍♀️`))
//   .finally(() => console.log("3: Finished getting location"));

// (async function () {
//   try {
//     const city = await whereAmI();
//     console.log(`2: ${city}`);
//   } catch (err) {
//     console.error(`2: ${err.message}🤷‍♀️`);
//   }
//   console.log("3: Finished getting location");
// })();

// try {
//   let y = 1;
//   const x = 2;
//   x = 3;
// } catch (err) {
//   console.error(err.message);
// }

///////////////////////////////////////
// Running Promises in Parallel

// const get3Countries = async function (c1, c2, c3) {
//   try {
//     const data = await Promise.all([
//       getJSON(`https://restcountries.com/v3.1/name/${c1}`),
//       getJSON(`https://restcountries.com/v3.1/name/${c2}`),
//       getJSON(`https://restcountries.com/v3.1/name/${c3}`),
//     ]);
//     // console.log(data);
//     console.log(data.map((d) => d[0].capital));
//   } catch (err) {
//     console.error(err);
//   }
// };

// get3Countries("portugal", "canada", "armenia");

////////////////////////////////////////////////////////////
// Other Promise Combinators: race, allSettled and any
// Promise.race

// (async function () {
//   const res = await Promise.race([
//     getJSON`https://restcountries.com/v3.1/name/italy`,
//     getJSON`https://restcountries.com/v3.1/name/egypt`,
//     getJSON`https://restcountries.com/v3.1/name/usa`,
//   ]);
//   console.log(res[0]);
// })();

// const timeout = function (sec) {
//   return new Promise(function (_, reject) {
//     setTimeout(() => reject(new Error("Request took too long!")), sec * 1000);
//   });
// };

// Promise.race([getJSON`https://restcountries.com/v3.1/name/armenia`, timeout(1)])
//   .then((res) => console.log(res[0]))
//   .catch((err) => console.error(err));

// // Promise.allSettled
// Promise.allSettled([
//   Promise.resolve("Success"),
//   Promise.reject("Error"),
//   Promise.resolve("Another success"),
// ]).then((res) => console.log(res));

// Promise.all([
//   Promise.resolve("Success"),
//   Promise.reject("Error"),
//   Promise.resolve("Another success"),
// ])
//   .then((res) => console.log(res))
//   .catch((err) => {
//     console.error(err);
//   });

// // Promise.any [ES2021]

// Promise.any([
//   Promise.resolve("Success"),
//   Promise.reject("Error"),
//   Promise.resolve("Another success"),
// ])
//   .then((res) => console.log(res))
//   .catch((err) => console.error(err));

////////////////////////////////////////////////////////////////////////////////////
// ============================Coding Challenge #1=========================================

/* 
In this challenge you will build a function 'whereAmI' 
which renders a country ONLY based on GPS coordinates. 
For that, you will use a second API to geocode coordinates.

Here are your tasks:

PART 1
1. Create a function 'whereAmI' which takes as inputs a latitude value (lat) and a longitude value (lng) (these are GPS coordinates, examples are below).
2. Do 'reverse geocoding' of the provided coordinates. Reverse geocoding means to convert coordinates to a meaningful location, like a city and country name. Use this API to do reverse geocoding: https://geocode.xyz/api.
The AJAX call will be done to a URL with this format: https://geocode.xyz/52.508,13.381?geoit=json. Use the fetch API and promises to get the data. Do NOT use the getJSON function we created, that is cheating 😉
3. Once you have the data, take a look at it in the console to see all the attributes that you recieved about the provided location. Then, using this data, log a messsage like this to the console: 'You are in Berlin, Germany'
4. Chain a .catch method to the end of the promise chain and log errors to the console
5. This API allows you to make only 3 requests per second. If you reload fast, you will get this error with code 403. This is an error with the request. Remember, fetch() does NOT reject the promise in this case. So create an error to reject the promise yourself, with a meaningful error message.
 
PART 2
6. Now it's time to use the received data to render a country. So take the relevant attribute from the geocoding API result, and plug it into the countries API that we have been using.
7. Render the country and catch any errors, just like we have done in the last lecture (you can even copy this code, no need to type the same code)

TEST COORDINATES 1: 52.508, 13.381 (Latitude, Longitude)
TEST COORDINATES 2: 19.037, 72.873
TEST COORDINATES 2: -33.933, 18.474
*/

//https://nominatim.openstreetmap.org/reverse?format=json&lat={lat}&lon={lon}

// const getMyLocation = function (latitude, longitude) {
//   const getCoords = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&accept-language=en`;
//   fetch(getCoords)
//     .then((response) => {
//       // Check error
//       if (!response.ok) throw new Error(`${errorMsg} ${response.status}`);

//       // Geting JSON
//       return response.json();
//     })
//     .then((object) => {
//       console.log(object);

//       // Posting yout location
//       console.log(
//         `You are in ${object.address.city}, ${object.address.country}`
//       );
//       return fetch(
//         `https://restcountries.com/v3.1/name/${object.address.country}`
//       )
//         .then((response) => {
//           // Check error
//           if (!response.ok) throw new Error(`${errorMsg} ${response.status}`);

//           // Geting JSON
//           return response.json();
//         })
//         .then((data) => {
//           console.log(data);
//           renderCountry(data[0]);
//           const [...neighbour] = data[0].borders;

//           //Country 2
//           if (!neighbour) return;

//           neighbour.map((value) =>
//             fetch(`https://restcountries.com/v3.1/alpha/${value}`)
//               .then((response) => {
//                 if (!response.ok)
//                   throw new Error(`Country not found ${response.status}`);
//                 return response.json();
//               })
//               .then((array) => renderCountry(array[0], "neighbour"))
//           );
//         });
//     })
//     .catch((error) => {
//       // Alert if you we have error
//       console.log(`Something wrong ${error.message}`);
//     })
//     .finally(() => {
//       countriesContainer.style.opacity = 1;
//     });
// };

// if (navigator.geolocation) {
//   // Getting your location
//   navigator.geolocation.getCurrentPosition(function (position) {
//     const { latitude } = position.coords;
//     const { longitude } = position.coords;

//     getMyLocation(latitude, longitude);
//     // Fake Error
//     // const getCoords = `https://nominatim.openstreetmap.org/reverse?format=json&lat=123&lon=123&accept-language=en`;
//   }),
//     function (error) {
//       console.error("Error geting geolocation", error);
//     };
// } else {
//   console.error("Geolocation dont work in your browser");
// }

// // getMyLocation(52.508, 13.381);

// // getMyLocation(19.037, 72.873);

// // getMyLocation(-33.933, 18.474);

////////////////////////////////////////////////////////////////////////////////////
// ============================Coding Challenge #2=========================================

/* 
Build the image loading functionality that I just showed you on the screen.

Tasks are not super-descriptive this time, so that you can figure out some stuff on your own. Pretend you're working on your own 😉

PART 1
1. Create a function 'createImage' which receives imgPath as an input. This function returns a promise which creates a new image (use document.createElement('img')) and sets the .src attribute to the provided image path. When the image is done loading, append it to the DOM element with the 'images' class, and resolve the promise. The fulfilled value should be the image element itself. In case there is an error loading the image ('error' event), reject the promise.

If this part is too tricky for you, just watch the first part of the solution.

PART 2
2. Comsume the promise using .then and also add an error handler;
3. After the image has loaded, pause execution for 2 seconds using the wait function we created earlier;
4. After the 2 seconds have passed, hide the current image (set display to 'none'), and load a second image (HINT: Use the image element returned by the createImage promise to hide the current image. You will need a global variable for that 😉);
5. After the second image has loaded, pause execution for 2 seconds again;
6. After the 2 seconds have passed, hide the current image.

TEST DATA: Images in the img folder. Test the error handler by passing a wrong image path. Set the network speed to 'Fast 3G' in the dev tools Network tab, otherwise images load too fast.

GOOD LUCK 😀
*/

// const wait = function (sec) {
//   return new Promise(function (resolve) {
//     setTimeout(resolve, sec * 1000);
//   });
// };

// const hiddeImg = function (imgSrc) {
//   document.querySelector(`img[src="${imgSrc}"]`).style.display = "none";
// };

// const imgContainer = document.querySelector(".images");
// const createImage = function (imgPath, imgName) {
//   return new Promise(function (resolve, reject) {
//     const img = document.createElement("img");
//     img.src = imgPath;

//     img.addEventListener("load", function () {
//       imgContainer.append(img);
//       resolve(img);
//     });
//     img.addEventListener("error", function (err) {
//       reject(new Error(`imege error ${err}`));
//     });
//   });
// };

// wait(2)
//   .then(() => {
//     createImage("img-1.jpg");

//     return wait(2);
//   })
//   .then(() => {
//     hiddeImg("img-1.jpg");

//     return wait(2);
//   })
//   .then(() => {
//     createImage("img-2.jpg");
//     return wait(2);
//   })
//   .then(() => {
//     hiddeImg("img-2.jpg");
//     return wait(2);
//   })
//   .then(() => {
//     createImage("img-3.jpg");
//     return wait(2);
//   })
//   .then(() => {
//     hiddeImg("img-3.jpg");
//   });

////////////////////////////////////////////////////////////////////////////////////
// ============================ Coding Challenge #3  =========================================

const wait = function (sec) {
  return new Promise(function (resolve) {
    setTimeout(resolve, sec * 1000);
  });
};

const hiddeImg = function (imgSrc) {
  document.querySelector(`img[src="${imgSrc}"]`).style.display = "none";
};

const imgContainer = document.querySelector(".images");
const createImage = function (imgPath, imgName) {
  return new Promise(function (resolve, reject) {
    const img = document.createElement("img");
    img.src = imgPath;

    img.addEventListener("load", function () {
      imgContainer.append(img);
      resolve(img);
    });
    img.addEventListener("error", function (err) {
      reject(new Error(`imege error ${err}`));
    });
  });
};

const loadNPause = async function () {
  try {
    let img = await createImage("img-1.jpg");
    await wait(2);
    img.style.display = "none";
  } catch (error) {
    console.error(`Something wrong ${error}`);
  }
};
loadNPause();

const loadAll = async function (imgArr) {
  try {
    let imgs = imgArr.map(async (img) => await createImage(img));
    console.log(imgs);
    const imgsEl = await Promise.all(imgs);
    console.log(imgsEl);
    imgsEl.forEach((img) => img.classList.add("parallel"));
  } catch (error) {
    console.error(error);
  }
};

loadAll(["img-1.jpg", "img-2.jpg", "img-3.jpg"]);
