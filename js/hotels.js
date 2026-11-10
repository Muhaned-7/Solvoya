(() => {
  let cards = document.querySelectorAll(".hotels-grid .box");

  let searchBtn = document.querySelector(".search-box .search-btn");
  let headerInput = document.querySelector(".search-box .search-input");

  let heroForm = document.querySelector("#hero-search");
  let destinationInput = document.querySelector("#destination");

  let priceFilters = document.querySelectorAll('input[name="price"]');
  let amenityFilters = document.querySelectorAll('input[name="amenity"]');
  let ratingFilters = document.querySelectorAll('input[name="rating"]');

  let hotelsGrid = document.querySelector(".hotels-grid");

  let searchValue = "";

  let noResults = document.createElement("p");

  noResults.textContent = "No hotels found.";
  noResults.classList.add("no-results");
  noResults.style.display = "none";

  if (hotelsGrid) {
    hotelsGrid.appendChild(noResults);
  }

  function filterHotels() {
    let selectedPrices = [...priceFilters]
      .filter((input) => input.checked)
      .map((input) => input.value);

    let selectedAmenities = [...amenityFilters]
      .filter((input) => input.checked)
      .map((input) => input.value);

    let selectedRatings = [...ratingFilters]
      .filter((input) => input.checked)
      .map((input) => Number(input.value));

    let visibleCount = 0;

    cards.forEach((card) => {
      let name = card.querySelector("h3")?.textContent.toLowerCase() || "";

      let location =
        card.querySelector(".box-content p")?.textContent.toLowerCase() || "";

      let price = Number(card.dataset.price);
      let rating = Number(card.dataset.rating);

      let amenities = (card.dataset.amenities || "").split(" ");

      let matchesSearch =
        name.includes(searchValue) || location.includes(searchValue);

      let matchesPrice =
        selectedPrices.length === 0 ||
        selectedPrices.some((range) => {
          if (range === "300+") {
            return price >= 300;
          }

          let [min, max] = range.split("-").map(Number);

          return price >= min && price < max;
        });

      let matchesAmenities = selectedAmenities.every((amenity) =>
        amenities.includes(amenity),
      );

      let matchesRating =
        selectedRatings.length === 0 ||
        selectedRatings.some((value) => rating >= value);

      let isVisible =
        matchesSearch && matchesPrice && matchesAmenities && matchesRating;

      card.style.display = isVisible ? "" : "none";

      if (isVisible) {
        visibleCount++;
      }
    });

    noResults.style.display = visibleCount === 0 ? "block" : "none";

    return visibleCount;
  }

  function scrollToHotel() {
    let firstVisibleHotel = Array.from(cards).find((card) => {
      return getComputedStyle(card).display !== "none";
    });

    if (!firstVisibleHotel) return;

    setTimeout(() => {
      let hotelPosition =
        firstVisibleHotel.getBoundingClientRect().top + window.scrollY;

      let scrollPosition =
        hotelPosition -
        window.innerHeight / 2 +
        firstVisibleHotel.offsetHeight / 2;

      window.scrollTo({
        top: scrollPosition,
        behavior: "smooth",
      });
    }, 100);
  }

  function searchHotels(value) {
    searchValue = value.trim().toLowerCase();

    let visibleCount = filterHotels();

    if (visibleCount > 0) {
      scrollToHotel();
    }
  }

  if (searchBtn && headerInput) {
    searchBtn.addEventListener("click", function (e) {
      e.preventDefault();

      let isOpen = headerInput.classList.toggle("show");

      if (isOpen) {
        setTimeout(() => {
          headerInput.focus();
        }, 300);
      } else {
        searchHotels(headerInput.value);
      }
    });

    headerInput.addEventListener("keydown", function (e) {
      if (e.key === "Enter") {
        e.preventDefault();
        searchHotels(headerInput.value);
      }
    });
  }

  if (heroForm && destinationInput) {
    heroForm.addEventListener("submit", function (e) {
      e.preventDefault();
      searchHotels(destinationInput.value);
    });
  }

  priceFilters.forEach((input) => {
    input.addEventListener("change", filterHotels);
  });

  amenityFilters.forEach((input) => {
    input.addEventListener("change", filterHotels);
  });

  ratingFilters.forEach((input) => {
    input.addEventListener("change", filterHotels);
  });
})();
