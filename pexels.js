const ApiKey = "TlWgfeBQEKzrikzJdMv0PryjORfh1fEYa9g9YMvkLqXxgFt2WeNUgDub";
const baseURL = "https://api.pexels.com/v1/search?per_page=9";

const loadImagesWithQuery = (query) => {
  const URL = `${baseURL}&query=${query}`;
  fetch(URL, { headers: { Authorization: ApiKey } })
    .then((resp) => resp.json())
    .then((data) => {
      const cards = document.querySelectorAll(".card");
      data.photos.forEach((photo, index) => {
        if (cards[index]) {
          const img = cards[index].querySelector("img");
          img.src = photo.src.medium;
          img.alt = photo.photographer;

          const title = cards[index].querySelector(".card-title");
          title.textContent = photo.photographer;

          const text = cards[index].querySelector(".card-text");
          text.textContent = `Photo by ${photo.photographer} on Pexels.`;

          const btnGroup = cards[index].querySelector(".btn-group");
          btnGroup.innerHTML = "";

          const hideButton = document.createElement("button");
          hideButton.textContent = "Hide";
          hideButton.className = "btn btn-sm btn-outline-secondary";
          hideButton.addEventListener("click", () => {
            cards[index].style.display = "none";
          });

          btnGroup.appendChild(hideButton);

          const smallText = cards[index].querySelector("small.text-muted");
          if (smallText) {
            smallText.textContent = `ID: ${photo.id}`;
          }
        }
      });
    })
    .catch((err) => console.error("Errore nel caricamento delle immagini:", err));
};

document.querySelector(".btn.btn-primary.my-2").addEventListener("click", () => {
  loadImagesWithQuery("nature");
});

document.querySelector(".btn.btn-secondary.my-2").addEventListener("click", () => {
  loadImagesWithQuery("cloud");
});

const searchField = document.createElement("input");
const searchButton = document.createElement("button");

searchField.type = "text";
searchField.placeholder = "Search for images...";
searchField.classList.add("form-control", "mb-3");

searchButton.textContent = "Search";
searchButton.classList.add("btn", "btn-success", "mb-3");

const container = document.querySelector(".jumbotron .container");
container.appendChild(searchField);
container.appendChild(searchButton);

searchButton.addEventListener("click", () => {
  const query = searchField.value.trim();
  if (query) {
    loadImagesWithQuery(query);
  } else {
    alert("Please enter a search term!");
  }
});
