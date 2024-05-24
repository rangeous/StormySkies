let weather = {
	"apiKey" : "f2b681a2a2beb8201ce8ed93a998d7be",
	fetch_weather: function (city) {
		fetch(
			"https://api.openweathermap.org/data/2.5/weather?q=" 
			+ city 
			+ "&units=metric&appid=" 
			+ this.apiKey
		).then((response) => response.json())
		.then((data) => this.display_weather(data));
	},
	display_weather: function (data) {
		const { name } = data;
		const { icon, description } = data.weather[0];
		const { temp, humidity } = data.main;
		const { speed } = data.wind;
		document.querySelector(".city").innerText = "Weather in " + name;
		document.querySelector(".icon").src = 
		"https://openweathermap.org/img/wn/" + icon + ".png";
		document.querySelector(".description").innerText = description;
		document.querySelector(".temp").innerText = temp + "°C";
		document.querySelector(".humidity").innerText = "Humidity: " + humidity + "%";
		document.querySelector(".wind").innerText = "Wind speed: " + speed + "km/h";
		document.querySelector(".weather").classList.remove("loading");
		document.body.style.backgroundImage = "url('https://source.unsplash.com/1920x1080/?" + name + "')"
	},
	search: function () {
		this.fetch_weather(document.querySelector(".search_bar").value);
	},
};

document
	.querySelector(".search button")
	.addEventListener("click", function() {
		weather.search();
})

document.querySelector(".search_bar").addEventListener("keyup", function (event) {
	if (event.key == "Enter"){
		weather.search();
	}
});

weather.fetch_weather("Vilnius");