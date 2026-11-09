let destinationsContainer = document.querySelector("#favorite-destinations");
let hotelsContainer = document.querySelector("#favorite-hotels");

let tabBtns = document.querySelectorAll(".tab-btn");
let panels = document.querySelectorAll(".favorites-panel");

let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

function renderFavorites() {
  let destinationFavorites = favorites.filter(
    (item) => item.type === "destination"
  );

  let hotelFavorites = favorites.filter(
    (item) => item.type === "hotel"
  );

  destinationsContainer.innerHTML = destinationFavorites.length
    ? destinationFavorites.map((item) => item.html).join("")
    : "<p>No favorite destinations yet.</p>";

  hotelsContainer.innerHTML = hotelFavorites.length
    ? hotelFavorites.map((item) => item.html).join("")
    : "<p>No favorite hotels yet.</p>";

  addRemoveEvents();
}

function addRemoveEvents() {
  let favoriteBtns = document.querySelectorAll(
    ".favorites-panel .favorite-btn"
  );

  favoriteBtns.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();

      let card = btn.closest(".card, .box");
      let id = card.dataset.id;

      favorites = favorites.filter((item) => item.id !== id);

      localStorage.setItem("favorites", JSON.stringify(favorites));

      renderFavorites();
    });
  });
}

tabBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    tabBtns.forEach((tab) => tab.classList.remove("active"));
    panels.forEach((panel) => panel.classList.remove("active"));

    btn.classList.add("active");

    let panel = document.querySelector(`#${btn.dataset.tab}-panel`);
    panel.classList.add("active");
  });
});

renderFavorites();