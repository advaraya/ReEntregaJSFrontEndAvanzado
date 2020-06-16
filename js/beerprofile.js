async function renderBeerProfileDom() {
  const beerP = document.getElementById("beer-profile");
  const id = beerP.getAttribute("idb");

  beerP.innerHTML = `
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
  let respB = {};
  try {
    respB = await getBeerWithID(id);

    beerP.innerHTML = `
    <div class="row">
        <div class="col-12">
          <a href="" style="margin:10px;">< Back to list</a>
        </div>
        <div class="col-12">
            <div class="jumbotron jumbotron-fluid" style="padding: 10px;">
                <div style="display: flex;">
                    <img class="beerProfileImg" src="${respB.beer.image}" 
                    alt="${respB.beer.name}"/>
                    <h1 class="display-4">${respB.beer.name}</h1>
                </div>
                <p style="color:grey">By ${respB.beer.contributedBy}</p>
                <p class="lead">${respB.beer.description}</p>
                <ul>
                    <li>First brewed: ${respB.beer.firstBrewed}</li>
                    <li>Price: $${respB.beer.price}</li>
                </ul>
                <hr class="my-4">
                <h2>Ingredients</h2>
                <ul>
                    <li>
                        <div>
                            <h3>Hops</h3>
                            <ul>
                            ${respB.beer.ingredients.hops
                              .map((hop) => {
                                return `<li>${hop.name} (${hop.attribute}), ${hop.amount.value} ${hop.amount.unit}. Add at ${hop.add}</li>`;
                              })
                              .join(" ")}
                            </ul>
                        </div>
                    </li>
                    <li>
                        <div>
                            <h3>Malt</h3>
                            <ul>
                            ${respB.beer.ingredients.malt
                              .map((hop) => {
                                return `<li>${hop.name}, ${hop.amount.value} ${hop.amount.unit}</li>`;
                              })
                              .join(" ")}
                            </ul>
                        </div>
                    </li>
                    <li>
                        <div>
                            <h3>Yeast</h3>${respB.beer.ingredients.yeast}
                        </div>
                    </li>
                </ul>
                <hr class="my-4">
                <h2>Brewers Tips</h2>
                <p>${respB.beer.brewersTips}</p>
                <hr class="my-4">
                <h2>Comments</h2>
                  <ul class="list-group">
                  ${
                    respB.beer.comments.length === 0 &&
                    `<div class="alert alert-primary" role="alert">No comments yet.</div>`
                  }
                  ${respB.beer.comments
                    .map((comment) => {
                      return `<li class="list-group-item"><b>${comment.dateComment}</b><br>${comment.comment}</li>`;
                    })
                    .join(" ")}
                  </ul>
                  <textarea id="addComment" name="textarea" placeholder="Write a comment!"></textarea>
                  <button id="addCommentButton" type="button" class="btn btn-success" style="width:100%;">Send</button>
            </div>
        </div>
    </div>`;

    document.getElementById("addCommentButton").addEventListener("click", buttonComment);
  } catch (error) {
    beerP.innerHTML = '<div class="alert alert-danger" role="alert">Error in the request.</div >';
  }
}

async function buttonComment() {
  const comment = document.getElementById("addComment").value;

  const id = document.getElementById("beer-profile").getAttribute("idb");

  let r = await sendCommentToBeer(id, comment);
  if (r.success) {
    await renderBeerProfileDom();
    //location.reload();
  } else {
    alert("Error while saving comment!");
  }
}
