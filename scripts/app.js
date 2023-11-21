"use strict";
function init() {
  const headerBanner = document.querySelector(".header");
  const faqTabs = document.querySelectorAll(".question-item__title");
  const searchBtn = document.getElementById("search-btn");
  const searchTabHover = document.querySelectorAll(
    ".search-wrapper__city-item"
  );
  const citiesCards = document.querySelectorAll(".cities-list__city-card");
  weatherFirstLoad();

  searchTabHover.forEach((elem) => {
    darkMode(elem);
  });

  addListenerTab(faqTabs);
  setSearchBox(getCitiesJSON);
  darkMode(searchBtn, headerBanner);
  footerSetYear();
  addListenerSuggestions(citiesCards);
}

function setSearchBox() {
  const searchBtn = document.getElementById("search-btn");
  const searchInput = document.getElementById("search-input");
  searchBtn.addEventListener("click", async () => {
    const citiesList = await getCitiesJSON();
    showCitiesList(citiesList);
    const citiesTabs = document.querySelectorAll(".search-wrapper__city-item");
    addListenerSuggestions(citiesTabs);
  });
  searchInput.addEventListener("keydown", () => {
    if (searchInput.value.length < 3) {
      document
        .querySelector(".search-wrapper__cities-list")
        .classList.remove("active");
    }
  });
  searchInput.addEventListener("keydown", async (event) => {
    if (event.code == "Enter") {
      const citiesList = await getCitiesJSON();
      showCitiesList(citiesList);
      const citiesTabs = document.querySelectorAll(
        ".search-wrapper__city-item"
      );
      addListenerSuggestions(citiesTabs);
    }
  });
}

function addListenerTab(tabs) {
  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      const tabBtn = tab.querySelector(".arrow-btn__icon");
      const tabContent = tab.nextElementSibling;
      addClass("active", tabBtn, tabContent);
    });
  });
}
function addListenerSuggestions(citiesTabs) {
  const fetchWeather = new FetchWeather();
  const displayWeather = new DisplayWeather();
  citiesTabs.forEach((tab) => {
    tab.addEventListener("click", async () => {
      const cityId = tab.getAttribute("data-value");
      const cityObj = await fetchWeather.getCityWeather(cityId);
      displayWeather.displayCityWeather(cityObj);

      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
    });
  });
}
function addClass(className, ...elementNames) {
  for (let elem of elementNames) {
    elem.classList.toggle(className);
  }
}
function weatherFirstLoad() {
  const fetchWeather = new FetchWeather();
  const displayWeather = new DisplayWeather();
  const firstCityId = 703448; //Kyiv id
  const cityObj = fetchWeather
    .getCityWeather(firstCityId)
    .then((cityObj) => displayWeather.displayCityWeather(cityObj));
}
function footerSetYear() {
  const currentDate = new Date();
  const footerYear = document.getElementById("currentYear");
  footerYear.innerText = currentDate.getFullYear();
}

function darkMode(...elementNames) {
  const currentDate = new Date();
  if (currentDate.getHours() >= 21 || currentDate.getHours() < 6) {
    addClass("dark", ...elementNames);
  }
}

function getCitiesJSON() {
  const fetchWeather = new FetchWeather();
  const searchValue = document.getElementById("search-input").value;
  return fetchWeather.getCitiesList(searchValue);
}
function showCitiesList(array) {
  const displayWeather = new DisplayWeather();
  displayWeather.displayCitiesList(array);
}
init();
