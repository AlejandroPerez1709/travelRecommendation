const btnSearch = document.getElementById("btnSearch");
const btnClear = document.getElementById("btnClear");
const searchInput = document.getElementById("searchInput");
const resultsContainer = document.getElementById("resultsContainer");

function searchDestination() {
  const input = searchInput.value.toLowerCase().trim();
  resultsContainer.innerHTML = "";

  if (input === "") {
    resultsContainer.innerHTML =
      '<p style="color: white; padding: 20px;">Please enter a destination or keyword.</p>';
    return;
  }

  fetch("travel_recommendation_api.json")
    .then((response) => response.json())
    .then((data) => {
      let results = [];

      if (input.includes("beach")) {
        results = data.beaches;
      } else if (input.includes("temple")) {
        results = data.temples;
      } else if (input.includes("country")) {
        data.countries.forEach((country) => {
          results = results.concat(country.cities);
        });
      }

      if (results.length > 0) {
        results.forEach((place) => {
          resultsContainer.innerHTML += `
                        <div class="card">
                            <img src="${place.imageUrl}" alt="${place.name}">
                            <div class="card-body">
                                <h3>${place.name}</h3>
                                <p>${place.description}</p>
                                <button class="btn-book" style="margin-top: 10px;">Visit</button>
                            </div>
                        </div>
                    `;
        });
      } else {
        resultsContainer.innerHTML =
          '<p style="color: white; padding: 20px;">No recommendations found. Try searching for "beach", "temple", or "country".</p>';
      }
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
      resultsContainer.innerHTML =
        '<p style="color: white; padding: 20px;">An error occurred while fetching data.</p>';
    });
}

function clearResults() {
  searchInput.value = "";
  resultsContainer.innerHTML = "";
}

// Agregamos un "if" para que el código no falle en las páginas que no tienen barra de búsqueda
if (btnSearch) {
  btnSearch.addEventListener("click", searchDestination);
}
if (btnClear) {
  btnClear.addEventListener("click", clearResults);
}
