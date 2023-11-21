class FetchWeather{
   #apiKey = "0f705e0fc46ddbbe68a4a3272c6fb30d" 
   
   async getCitiesList(input) {
      const response = await fetch(`https://api.openweathermap.org/data/2.5/find?q=${input}&appid=${this.#apiKey}`);

      if (response.ok) {
         const data = await response.json();
         return data.list;
      }
      else {
         return new Array(0);
      }
   }
   async getCityWeather(cityId){
      const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?id=${cityId}&appid=${this.#apiKey}`);

      if (response.ok) {
         const data = await response.json();
         return data;
      }
      else {
         alert("something went wrong..."); 
      }
   }

}