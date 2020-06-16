let inputValue = "";
let localSearch = window.localStorage.getItem("beerflixSearch");
if (localSearch !== null) {
  inputValue = localSearch;
}

const filtersForList = document.getElementById("filtersForList");
filtersForList.innerHTML = `
<div class="row no-gutters">
    <div class="col-12">
      <div class="input-group mb-3">
        <input id="fcName" type="search" class="form-control" placeholder="Search a beer" 
        aria-label="Search a beer" aria-describedby="button-addon2" value="${inputValue}">
        <div class="input-group-append">
          <button class="btn btn-outline-secondary" type="button" id="button-addon2" 
          onclick="requestWithFilters()">Search</button>
        </div>
      </div>
    </div>
</div>`;

async function requestWithFilters() {
  try {
    var toSearch = document.getElementById("fcName").value;

    if (toSearch !== "") {
      window.localStorage.setItem("beerflixSearch", toSearch);
    } else {
      window.localStorage.removeItem("beerflixSearch");
    }

    await renderBeerDom(toSearch);
  } catch (e) {}
}
