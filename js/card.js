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
  miles.className = "miles";
  miles.innerHTML += `<p>Mileage: ${usedCars[car].gasMileage}</p>`;
  card.append(miles);

  const pc = document.createElement("div");
  pc.className = "pc";
  pc.innerHTML += `<span class="Left">Price: ${usedCars[car].price} </span><span class="Right">Color: ${usedCars[car].color}</span>`;
  card.append(pc);

  return card;
}

usedCars.forEach((element) => {
  let index = usedCars.indexOf(element);
  parent.appendChild(createCard(index));
});
