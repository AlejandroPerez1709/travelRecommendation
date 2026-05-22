// Seleccionamos los elementos del DOM que vamos a utilizar
const btnSearch = document.getElementById("btnSearch");
const btnClear = document.getElementById("btnClear");
const searchInput = document.getElementById("searchInput");
const resultsContainer = document.getElementById("resultsContainer");

// --- TAREA 6, 7 y 8: Obtener datos, buscar y mostrar recomendaciones ---
function searchDestination() {
  // Capturamos el valor del input y lo convertimos a minúsculas como piden las instrucciones
  const input = searchInput.value.toLowerCase().trim();

  // Limpiamos los resultados anteriores antes de mostrar los nuevos
  resultsContainer.innerHTML = "";

  // Validamos que el usuario haya escrito algo
  if (input === "") {
    resultsContainer.innerHTML =
      '<p style="color: white; padding: 20px;">Por favor, ingresa un destino o palabra clave.</p>';
    return;
  }

  // Consumimos el archivo JSON usando la API Fetch
  fetch("travel_recommendation_api.json")
    .then((response) => response.json())
    .then((data) => {
      let results = [];

      // Lógica de palabras clave (evaluamos tanto en inglés como en español)
      if (input.includes("playa") || input.includes("beach")) {
        results = data.beaches;
      } else if (input.includes("templo") || input.includes("temple")) {
        results = data.temples;
      } else if (
        input.includes("pais") ||
        input.includes("país") ||
        input.includes("country")
      ) {
        // Como los países tienen ciudades anidadas, iteramos para extraer las ciudades
        data.countries.forEach((country) => {
          results = results.concat(country.cities);
        });
      }

      // Inyectamos el HTML de las tarjetas si hay resultados
      if (results.length > 0) {
        results.forEach((place) => {
          resultsContainer.innerHTML += `
                        <div class="card">
                            <img src="${place.imageUrl}" alt="${place.name}">
                            <div class="card-body">
                                <h3>${place.name}</h3>
                                <p>${place.description}</p>
                                <button class="btn-book" style="margin-top: 10px;">Visitar</button>
                            </div>
                        </div>
                    `;
        });
      } else {
        // Mensaje si la palabra clave no coincide con ninguna categoría
        resultsContainer.innerHTML =
          '<p style="color: white; padding: 20px;">No se encontraron recomendaciones para tu búsqueda. Intenta con "playa", "templo" o "país".</p>';
      }
    })
    .catch((error) => {
      console.error("Error al obtener los datos:", error);
      resultsContainer.innerHTML =
        '<p style="color: white; padding: 20px;">Ocurrió un error al cargar los datos.</p>';
    });
}

// --- TAREA 9: Botón de limpiar ---
function clearResults() {
  // Vaciamos el input de búsqueda y el contenedor de resultados
  searchInput.value = "";
  resultsContainer.innerHTML = "";
}

// Escuchamos los eventos de clic en los botones
btnSearch.addEventListener("click", searchDestination);
btnClear.addEventListener("click", clearResults);
