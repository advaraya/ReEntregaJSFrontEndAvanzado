const localKeyDate = "beerflixDateFilter";
let listOfBeers = [];

const renderBeer = (beer) => {
  return `<div class="row cardBeer">
        <div class="col-4">
            <img class="imgBeer" src="${beer.image}" alt="${beer.name}"/>
        </div>
        <div class="col-8">
            <h5 >${beer.name}</h5>
            <p style="max-height: 150px;overflow: hidden;">${beer.description}</p>
            <button id="${beer.beerId}" class="btn btn-primary button-go-to-profile">More info</button>
        </div>
    </div>`;
};

const handleClickRadio = (element) => {
  var filterDateDiv = document.getElementById("filterDateDiv");
  if (element.checked) {
    filterDateDiv.style.display = "block";
  } else {
    filterDateDiv.style.display = "none";
    window.localStorage.removeItem(localKeyDate);
  }
};

const renderDateFilter = () => {
  let local = window.localStorage.getItem(localKeyDate);

  return `
  <div class="row no-gutters">
    <div class="col-12">
        <div class="form-group">
            <input type="checkbox" onclick="handleClickRadio(this);" name="search-type" value="byDate" 
            ${local !== null ? "checked" : ""}>
             Filter by first brew
        </div>
    </div>
    <div class="col-12" id="filterDateDiv" style="display:${local !== null ? "block" : "none"};">
      <div class="input-group mb-3">
        <div class="input-group-prepend">
          <span class="input-group-text">First brewed</span>
        </div>
        <input id="fcDate" class="form-control" type="month" name="FirstBrewed" value="${local}">
        <div class="input-group-append">
          <button class="btn btn-outline-secondary" type="button" id="filterDateButton">Filter</button>
        </div>
      </div>
    </div>
  
  </div>`;
};

const filterResults = () => {
  var toFilter = document.getElementById("fcDate").value;
  console.log(toFilter);
  var dateToCheck = toFilter.split("-");
  dateToCheck = `${dateToCheck[1]}/${dateToCheck[0]}`;

  window.localStorage.setItem(localKeyDate, toFilter);

  let filteredList = listOfBeers.filter((beer) => beer.firstBrewed === dateToCheck);
  createHTMLForList(document.getElementById("beerList"), filteredList);
};

const createHTMLForList = (beerListElement, beerArray) => {
  let blist = [];

  let listHTML = "";
  if (beerArray.length === 0) {
    listHTML = `<div class="alert alert-primary" role="alert">No beers found.</div>`;
  } else {
    beerArray.map((b) => {
      blist.push(renderBeer(b));
    });
    listHTML = blist.join("");
  }

  beerListElement.innerHTML = renderDateFilter() + "<h3>Results</h3>" + listHTML;

  //Filter button
  const filterbt = document.getElementById("filterDateButton");
  filterbt.addEventListener("click", filterResults);

  //Add events to buttons
  const buttons = document.getElementsByClassName("button-go-to-profile");
  for (let bti = 0; bti < buttons.length; bti++) {
    buttons[bti].addEventListener("click", (event) => {
      const bp = document.getElementById("beer-profile");
      bp.setAttribute("idB", buttons[bti].id);
      showSection("beer-profile");
    });
  }
};

async function renderBeerDom(search = "") {
  const beerList = document.getElementById("beerList");

  beerList.innerHTML = `
    <div class="row">
        <div class="col-12">
          <div class="d-flex justify-content-center">
            <div class="spinner-border" role="status">
              <span class="sr-only">Loading...</span>
            </div>
          </div>
        </div>
    </div>`;

  //Request
  let respBeers = [];
  try {
    respBeers = await getBeers(search);
    //console.log(respBeers);
  } catch (error) {}

  createHTMLForList(beerList, respBeers.beers);

  listOfBeers = [...respBeers.beers];
}
