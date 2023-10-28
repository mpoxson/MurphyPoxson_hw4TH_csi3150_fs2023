import usedCars from "./usedCars.js";
// Import array from other file

//grab the container for the cards
const parent = document.querySelector(".cardHolder");

//Creates cards for single car
function createCard(car) {
  //Create individual card
  const card = document.createElement("div");
  card.className = "card";

  //Create div inside card and add car year text from object into div, add to card
  const name = document.createElement("div");
  name.className = "name";
  name.innerHTML += `<h1>${usedCars[car].year} ${usedCars[car].make} ${usedCars[car].model}</h1>`;
  card.append(name);

  //Create div inside card and add car image into div, add to card
  const pic = document.createElement("div");
  pic.className = "Image";
  pic.innerHTML += `<img src="./img/${usedCars[car].year}${usedCars[car].model}.jpg" alt="${usedCars[car].model}" />`;
  card.append(pic);

  //Create div inside card and add miles text from object into div, add to card
  const miles = document.createElement("div");
  miles.className = "Miles";
  miles.innerHTML += `<h2>Miles: ${usedCars[car].mileage}</h2>`;
  card.append(miles);

  //Create div inside card and add gas mileage text from object into div, add to card
  const mpg = document.createElement("div");
  mpg.className = "MPG";
  mpg.innerHTML += `<p>Mileage: ${usedCars[car].gasMileage}</p>`;
  card.append(mpg);

  //Create div inside card and add price and color text from object into div, add to card
  const pc = document.createElement("div");
  pc.className = "pc";
  pc.innerHTML += `<span class="Left">Price: ${usedCars[car].price} </span><span class="Right">Color: ${usedCars[car].color}</span>`;
  card.append(pc);

  return card;
}

//Grab the color filter drop down and add a blank option to it
const colorFilter = document.querySelector("#colorF");
colorFilter.innerHTML += `<option value=""></option>`;
//initialize a colors array
let color = [];
let i = 0;

//Grab make filter drop down and add a blank option to it
const makeFilter = document.querySelector("#makeF");
makeFilter.innerHTML += `<option value=""></option>`;

//grabe mileage range filter and initialize data to create max and min bounds
const mileFilter = document.querySelector("#milesF");
let maxMiles = 0;
let minMiles = usedCars[0].mileage;

//Create cards on load
usedCars.forEach((element) => {
  //grab index of the object in car array
  let index = usedCars.indexOf(element);

  //Add option for each car's make from array
  makeFilter.innerHTML += `<option value=${element.make}>${element.make}</option>`;

  //Add each car's color to the array (only one of each color)
  if (!color.includes(element.color)) {
    color[i] = element.color;
    i++;
  }

  //Update max and min miles
  if (element.mileage > maxMiles) {
    maxMiles = element.mileage;
  }
  if (element.mileage < minMiles) {
    minMiles = element.mileage;
  }

  //Add each car's card to the container
  parent.appendChild(createCard(index));
});

//set the range's max and min values and starting value
mileFilter.min = minMiles;
mileFilter.max = maxMiles;
mileFilter.value = maxMiles;

//Grab the label for the range and change the miles to whatever the user changes the range to
let label = document.querySelector("#mileLabel");
label.textContent = `Mileage: ${maxMiles}`;
mileFilter.addEventListener("change", (e) => {
  label.textContent = `Mileage: ${mileFilter.value}`;
});

//Add color options to color dropdown
color.forEach((element) => {
  colorFilter.innerHTML += `<option value=${element}>${element}</option>`;
});

//Grab submit button and create event listener
const submit = document.querySelector("#submit");
submit.addEventListener("click", (e) => {
  //filter cars array
  let array = usedCars.filter(filterFunc);

  //reset the html for the container
  parent.innerHTML = "";

  //If there are no items in the array after filtering, show message
  if (array.length == 0) {
    parent.innerHTML = `<h1 class="sorry">Sorry! There are no cars found!</h1>`;
  }

  //Create a card for each car in the filtered array and add it to the container
  array.forEach((element) => {
    let index = usedCars.indexOf(element);
    parent.appendChild(createCard(index));
  });
});

//Filters array
function filterFunc(jason) {
  //grabs all the filters
  let yearMin = document.querySelector("#yearMin").value;
  let yearMax = document.querySelector("#yearMax").value;
  let makeF = document.querySelector("#makeF").value;
  let milesF = document.querySelector("#milesF").value;
  let priceMin = document.querySelector("#priceMin").value;
  let priceMax = document.querySelector("#priceMax").value;
  let colorF = document.querySelector("#colorF").value;

  //doesn't return anything if the current car is younger than the minimum year
  if (parseInt(jason.year) < parseInt(yearMin) && yearMin != "") {
    return;
  }
  //doesn't return anything if the current car is older than the maximum year
  if (parseInt(jason.year) > parseInt(yearMax) && yearMax != "") {
    return;
  }

  //doesn't return anything if the current car is not of the same make as selected
  if (jason.make != makeF && makeF != "") {
    return;
  }

  //doesn't return anything if the current car has more than the maximum miles
  if (jason.mileage > milesF) {
    return;
  }

  //doesn't return anything if the current car is less than the minimum price
  if (parseInt(jason.price) < parseInt(priceMin) && priceMin != "") {
    return;
  }

  //doesn't return anything if the current car is more than the maximum year
  if (parseInt(jason.price) > parseInt(priceMax) && priceMax != "") {
    return;
  }

  //doesn't return anything if the current car is not the same color as selected
  if (jason.color != colorF && colorF != "") {
    return;
  }

  //if car passes all filters, return it
  return jason;
}
