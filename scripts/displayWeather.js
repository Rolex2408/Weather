class DisplayWeather {

   displayCitiesList(array) {
      const citiesListBox = document.querySelector(".search-wrapper__cities-list");
      citiesListBox.classList.add("active");
      citiesListBox.innerHTML = "";
      if (array.length == 0) {
         const cityItem = document.createElement("div");
         cityItem.classList.add("search-wrapper__city-not-found");
         cityItem.innerText = "City not found, please try to change your search query";
         citiesListBox.appendChild(cityItem);
      }
      else {
         for (let item of array) {
            const cityItem = document.createElement("div");
            cityItem.classList.add("search-wrapper__city-item");
            cityItem.innerText = `${item.name} ${item.sys.country}`;
            cityItem.setAttribute("data-value", `${item.id}`)
            citiesListBox.appendChild(cityItem);
         }
      }

   }

   displayCityWeather(cityObj) {
      const citiesListBox = document.querySelector(".search-wrapper__cities-list");
      citiesListBox.classList.remove("active");
      const weatherPicture = document.getElementById("weather-picture");
      const weatherCurrTemp = document.getElementById("weather-curr-temp");
      const weatherType = document.querySelector(".weather-details__weather-type");
      const weatherDesc = document.querySelector(".weather-details__type-desc")
      const weatherLocation = document.querySelector(".weather-date__location");
      const weatherDate = document.querySelector(".weather-date__date")
      const weatherMinTemp = document.getElementById("min-temp");
      const weatherMaxTemp = document.getElementById("max-temp");

      const options = {  year: 'numeric', month: 'long', day: 'numeric' };

      weatherPicture.innerHTML = ` <img src=" http://openweathermap.org/img/wn/${cityObj.weather[0].icon}@2x.png" id="weather-picture" alt="">`;
      weatherCurrTemp.innerHTML = Math.round(cityObj.main.temp - 273) + "&deg;C";
      weatherType.innerHTML = cityObj.weather[0].main;
      weatherDesc.innerHTML = cityObj.weather[0].description;

      weatherLocation.innerHTML = cityObj.name + ', ' + cityObj.sys.country;
      weatherDate.innerHTML = new Date().toLocaleString('en-US', options);

      weatherMinTemp.innerHTML = Math.round(cityObj.main.temp_min- 273) + "&deg;C";
      weatherMaxTemp.innerHTML = Math.round(cityObj.main.temp_max - 273) + "&deg;C";


   }
}