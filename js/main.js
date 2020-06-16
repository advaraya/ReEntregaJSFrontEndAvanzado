function showSection(domIDSection) {
  //Hide all sections
  const container = document.getElementById("main-content");

  for (var i = 0; i < container.childNodes.length; i++) {
    if (container.childNodes[i].tagName === "DIV") {
      container.childNodes[i].style.display = "none";
    }
  }

  //Get the one
  const ourC = document.getElementById(domIDSection);
  ourC.style.display = "block";

  //Custom requests
  switch (domIDSection) {
    case "list-interface":
      let localSearch = window.localStorage.getItem("beerflixSearch");
      if (localSearch !== null) {
        renderBeerDom(localSearch);
      } else {
        renderBeerDom();
      }

      break;

    case "beer-profile":
      renderBeerProfileDom();
      break;

    default:
      break;
  }
}

showSection("list-interface");
