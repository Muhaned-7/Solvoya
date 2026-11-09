let searchBtn = document.querySelector(".search-box .search-btn");
let headerSearchInput = document.querySelector(".search-box .search-input");

if (searchBtn && headerSearchInput) {
  function goToSearch() {
    let searchValue = headerSearchInput.value.trim();

    if (searchValue !== "") {
      window.location.href = `destinations.html?search=${encodeURIComponent(
        searchValue,
      )}`;
    }
  }

  searchBtn.addEventListener("click", function () {
    let isOpen = headerSearchInput.classList.toggle("show");

    if (isOpen) {
      setTimeout(function () {
        headerSearchInput.focus();
      }, 300);
    } else {
      goToSearch();
    }
  });

  headerSearchInput.addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
      e.preventDefault();
      goToSearch();
    }
  });
}

let heroSearch = document.querySelector("#hero-search");

if (heroSearch) {
  heroSearch.addEventListener("submit", function (e) {
    e.preventDefault();

    let destination = document.querySelector("#destination").value.trim();
    let checkin = document.querySelector("#checkin").value;
    let checkout = document.querySelector("#checkout").value;
    let guests = document.querySelector("#guests").value;

    let params = new URLSearchParams({
      search: destination,
      checkin: checkin,
      checkout: checkout,
      guests: guests,
    });

    window.location.href = `destinations.html?${params.toString()}`;
  });
}

let favoriteBtns = document.querySelectorAll(".favorite-btn");

let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

favoriteBtns.forEach((btn) => {
  let card = btn.closest(".card, .box");

  if (!card) return;

  let id = card.dataset.id;

  if (!id) return;

  if (favorites.some((item) => item.id === id)) {
    btn.classList.add("active");
  }

  btn.addEventListener("click", (e) => {
    e.preventDefault();
    e.stopPropagation();

    let isActive = btn.classList.toggle("active");

    if (isActive) {
      let type = card.classList.contains("card")
        ? "destination"
        : "hotel";

      favorites = favorites.filter((item) => item.id !== id);

      favorites.push({
        id: id,
        type: type,
        html: card.outerHTML,
      });
    } else {
      favorites = favorites.filter((item) => item.id !== id);
    }

    localStorage.setItem("favorites", JSON.stringify(favorites));
  });
});


let password = document.getElementById("password");
let togglePassword = document.getElementById("togglePassword");

togglePassword.addEventListener("click", function () {
  if (password.type === "password") {
    password.type = "text";
    togglePassword.classList.replace("fa-eye", "fa-eye-slash");
  } else {
    password.type = "password";
    togglePassword.classList.replace("fa-eye-slash", "fa-eye");
  }
});

let confirmPassword = document.getElementById("confirmPassword");
let toggleConfirmPassword = document.getElementById("toggleConfirmPassword");

toggleConfirmPassword.addEventListener("click", function () {
  if (confirmPassword.type === "password") {
    confirmPassword.type = "text";
    toggleConfirmPassword.classList.replace("fa-eye", "fa-eye-slash");
  } else {
    confirmPassword.type = "password";
    toggleConfirmPassword.classList.replace("fa-eye-slash", "fa-eye");
  }
});