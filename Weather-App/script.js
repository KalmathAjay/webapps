let weather = {
  apiKey: "", //!remove api
  fetchWeather: function (city) {
    fetch(
      "https://api.openweathermap.org/data/2.5/weather?q=" +
        city +
        "&units=metric&appid=" +
        this.apiKey
    )
      .then((response) => {
        if (!response.ok) {
          alert("No weather found.");
          throw new Error("No weather found.");
        }
        return response.json();
      })
      .then((data) => this.displayWeather(data));
  },

  displayWeather: function (data) {
    const { name } = data;
    const { description } = data.weather[0];
    const { temp, humidity } = data.main;
    const { speed } = data.wind;

    console.log(name, description, temp, humidity, speed);

    document.querySelector(".city").innerText = "Weather in " + name;
    document.querySelector(".des").innerText = description;
    document.querySelector(".temp").innerText = temp + "°C";
    document.querySelector(".hum").innerText = "Humidity: " + humidity + "%";
    document.querySelector(".windspeed").innerText = "Wind speed: " + speed + " km/h";
    document.querySelector(".weather").classList.remove("loading");
  },
  search: function () {
    this.fetchWeather(document.querySelector(".searchbar").value);
  },
};

document.querySelector(".search button").addEventListener("click", function () {
  weather.search();
});

document
  .querySelector(".searchbar")
  .addEventListener("keyup", function (event) {
    if (event.key == "Enter") {
      weather.search();
    }
  });

weather.fetchWeather("Bengaluru");

// https://openweathermap.org/weathermap?basemap=map&cities=true&layer=temperature&lat=30&lon=-20&zoom=5
