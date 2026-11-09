
// Get Search From URL
let params = new URLSearchParams(window.location.search);
let searchValue = params.get("search") || "";


let cards = document.querySelectorAll(".destinations-grid .card");


let searchInput = document.querySelector("#destination-search");


let searchForm = document.querySelector(".search-form");


let countrySelect = document.querySelector('select[name="country"]');
let typeSelect = document.querySelector('.search-form select[name="type"]');
let seasonSelect = document.querySelector('select[name="season"]');


function getCheckedValues(name) {
  let checkboxes = document.querySelectorAll(
    `.filters input[name="${name}"]:checked`
  );

  return Array.from(checkboxes).map(function (checkbox) {
    return checkbox.value;
  });
}


function filterCards() {
  let searchText = searchInput.value.trim().toLowerCase();

  let selectedCountry = countrySelect.value;
  let selectedType = typeSelect.value;
  let selectedSeason = seasonSelect.value;

  let selectedPrices = getCheckedValues("price");
  let selectedTypes = getCheckedValues("type");
  let selectedRatings = getCheckedValues("rating").map(Number);

  cards.forEach(function (card) {
    let name = card.dataset.name.toLowerCase();
    let price = Number(card.dataset.price);
    let country = card.dataset.country;
    let type = card.dataset.type;
    let season = card.dataset.season;
    let rating = Number(card.dataset.rating);


    let matchesSearch = name.includes(searchText);


    let matchesCountry =
      selectedCountry === "" || country === selectedCountry;

    let matchesType =
      selectedType === "" || type === selectedType;

    let matchesSeason =
      selectedSeason === "" || season === selectedSeason;


    let matchesPrice =
      selectedPrices.length === 0 ||
      selectedPrices.some(function (range) {
        if (range.endsWith("+")) {
          let min = Number(range.replace("+", ""));
          return price >= min;
        }

        let [min, max] = range.split("-").map(Number);

        return price >= min && price < max;
      });


    let matchesSidebarType =
      selectedTypes.length === 0 ||
      selectedTypes.includes(type);


    let matchesRating =
      selectedRatings.length === 0 ||
      selectedRatings.some(function (minRating) {
        return rating >= minRating;
      });


    let isVisible =
      matchesSearch &&
      matchesCountry &&
      matchesType &&
      matchesSeason &&
      matchesPrice &&
      matchesSidebarType &&
      matchesRating;

    card.style.display = isVisible ? "" : "none";
  });
}

searchInput.addEventListener("input", filterCards);

searchForm.addEventListener("submit", function (e) {
  e.preventDefault();

  filterCards();

  let firstVisibleCard = Array.from(cards).find(function (card) {
    return card.style.display !== "none";
  });

  if (firstVisibleCard) {
    firstVisibleCard.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  }
});


[countrySelect, typeSelect, seasonSelect].forEach(function (select) {
  select.addEventListener("change", filterCards);
});


let checkboxes = document.querySelectorAll(
  '.filters input[type="checkbox"]'
);

checkboxes.forEach(function (checkbox) {
  checkbox.addEventListener("change", filterCards);
});


if (searchValue) {
  searchInput.value = searchValue;

  filterCards();

  let matchingCard = Array.from(cards).find(function (card) {
    return (
      card.dataset.name.toLowerCase() === searchValue.toLowerCase() &&
      card.style.display !== "none"
    );
  });

  if (matchingCard) {
    setTimeout(function () {
      matchingCard.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }, 100);
  }
}
