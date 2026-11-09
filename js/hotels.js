let cards = document.querySelectorAll(".hotels-grid .box");
let hotelsSection = document.querySelector(".hotels");

let searchBtn = document.querySelector(".search-box .search-btn");
let headerInput = document.querySelector(".search-box .search-input");

let heroForm = document.querySelector("#hero-search");
let destinationInput = document.querySelector("#destination");

let priceFilters = document.querySelectorAll('input[name="price"]');
let amenityFilters = document.querySelectorAll('input[name="amenity"]');
let ratingFilters = document.querySelectorAll('input[name="rating"]');

let searchValue = "";

let noResults = document.createElement("p");
noResults.textContent = "No hotels found.";
noResults.classList.add("no-results");
document.querySelector(".hotels-grid").appendChild(noResults);

function filterHotels() {
  let selectedPrices = [...priceFilters]
    .filter(input => input.checked)
    .map(input => input.value);

  let selectedAmenities = [...amenityFilters]
    .filter(input => input.checked)
    .map(input => input.value);

  let selectedRatings = [...ratingFilters]
    .filter(input => input.checked)
    .map(input => Number(input.value));

  let visibleCount = 0;

  cards.forEach(card => {
    let name = card.querySelector("h3").textContent.toLowerCase();
    let location = card.querySelector(".box-content p").textContent.toLowerCase();

    let price = Number(card.dataset.price);
    let rating = Number(card.dataset.rating);
    let amenities = card.dataset.amenities.split(" ");

    let matchesSearch =
      name.includes(searchValue) || location.includes(searchValue);

    let matchesPrice =
      selectedPrices.length === 0 ||
      selectedPrices.some(range => {
        if (range === "300+") return price >= 300;

        let [min, max] = range.split("-").map(Number);
        return price >= min && price < max;
      });

    let matchesAmenities = selectedAmenities.every(amenity =>
      amenities.includes(amenity)
    );

    let matchesRating =
      selectedRatings.length === 0 ||
      selectedRatings.some(value => rating >= value);

    let isVisible =
      matchesSearch &&
      matchesPrice &&
      matchesAmenities &&
      matchesRating;

    card.style.display = isVisible ? "" : "none";

    if (isVisible) visibleCount++;
  });

  noResults.style.display = visibleCount === 0 ? "block" : "none";
}

searchBtn.addEventListener("click", function () {
  let isOpen = headerInput.classList.toggle("show");

  if (isOpen) {
    setTimeout(() => {
      headerInput.focus();
    }, 300);
  } else if (headerInput.value.trim() !== "") {
    searchValue = headerInput.value.trim().toLowerCase();
    filterHotels();
    hotelsSection.scrollIntoView({ behavior: "smooth" });
  }
});

headerInput.addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    searchValue = headerInput.value.trim().toLowerCase();
    filterHotels();
    hotelsSection.scrollIntoView({ behavior: "smooth" });
  }
});

heroForm.addEventListener("submit", function (e) {
  e.preventDefault();

  searchValue = destinationInput.value.trim().toLowerCase();

  filterHotels();

  hotelsSection.scrollIntoView({ behavior: "smooth" });
});

priceFilters.forEach(input => {
  input.addEventListener("change", filterHotels);
});

amenityFilters.forEach(input => {
  input.addEventListener("change", filterHotels);
});

ratingFilters.forEach(input => {
  input.addEventListener("change", filterHotels);
});