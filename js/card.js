import usedCars from "./usedCars.js";

const parent = document.querySelector(".cardHolder");

function createCard(car) {
  const card = document.createElement("div");
  card.className = "card";

  const name = document.createElement("div");
  name.className = "name";
  name.innerHTML += `<h1>${usedCars[car].year} ${usedCars[car].make} ${usedCars[car].model}</h1>`;
  card.append(name);

  const pic = document.createElement("div");
  pic.className = "Image";
  pic.innerHTML += `<img src="./img/${usedCars[car].year}${usedCars[car].model}.jpg" alt="${usedCars[car].model}" />`;
  card.append(pic);

  const miles = document.createElement("div");
  miles.className = "Miles";
  miles.innerHTML += `<h2>Miles: ${usedCars[car].mileage}</h2>`;
  card.append(miles);

  const mpg = document.createElement("div");
  mpg.className = "MPG";
  mpg.innerHTML += `<p>Mileage: ${usedCars[car].gasMileage}</p>`;
  card.append(mpg);

  const pc = document.createElement("div");
  pc.className = "pc";
  pc.innerHTML += `<span class="Left">Price: ${usedCars[car].price} </span><span class="Right">Color: ${usedCars[car].color}</span>`;
  card.append(pc);

  return card;
}

const colorFilter = document.querySelector("#colorF");
colorFilter.innerHTML += `<option value=""></option>`;
let color = [];
let i = 0;
const makeFilter = document.querySelector("#makeF");
makeFilter.innerHTML += `<option value=""></option>`;
const mileFilter = document.querySelector("#milesF");
let maxMiles = 0;
let minMiles = usedCars[0].mileage;

usedCars.forEach((element) => {
  let index = usedCars.indexOf(element);
  makeFilter.innerHTML += `<option value=${element.make}>${element.make}</option>`;
  if (!color.includes(element.color)) {
    color[i] = element.color;
    i++;
  }
  if (element.mileage > maxMiles) {
    maxMiles = element.mileage;
  }
  if (element.mileage < minMiles) {
    minMiles = element.mileage;
  }
  parent.appendChild(createCard(index));
});

mileFilter.min = minMiles;
mileFilter.max = maxMiles;
mileFilter.value = maxMiles;

let label = document.querySelector("#mileLabel");
label.textContent = `Mileage: ${maxMiles}`;
mileFilter.addEventListener("change", (e) => {
  label.textContent = `Mileage: ${mileFilter.value}`;
});

color.forEach((element) => {
  colorFilter.innerHTML += `<option value=${element}>${element}</option>`;
});

const submit = document.querySelector("#submit");
submit.addEventListener("click", (e) => {
  let array = usedCars.filter(filterFunc);
  parent.innerHTML = "";

  if (array.length == 0) {
    parent.innerHTML = `<h1 class="sorry">Sorry! There are no cars found!</h1>`;
  }

  array.forEach((element) => {
    let index = usedCars.indexOf(element);
    parent.appendChild(createCard(index));
  });
});

function filterFunc(jason) {
  let yearMin = document.querySelector("#yearMin").value;
  let yearMax = document.querySelector("#yearMax").value;
  let makeF = document.querySelector("#makeF").value;
  let milesF = document.querySelector("#milesF").value;
  let priceMin = document.querySelector("#priceMin").value;
  let priceMax = document.querySelector("#priceMax").value;
  let colorF = document.querySelector("#colorF").value;

  if (parseInt(jason.year) < parseInt(yearMin) && yearMin != "") {
    return;
  }

  if (parseInt(jason.year) > parseInt(yearMax) && yearMax != "") {
    return;
  }
  if (jason.make != makeF && makeF != "") {
    return;
  }
  if (jason.mileage > milesF) {
    return;
  }
  if (parseInt(jason.price) < parseInt(priceMin) && priceMin != "") {
    return;
  }

  if (parseInt(jason.price) > parseInt(priceMax) && priceMax != "") {
    return;
  }
  if (jason.color != colorF && colorF != "") {
    return;
  }

  return jason;
}
