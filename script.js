// ✅ Your API Key (WeatherAPI.com)
const apiKey = "e0b30c90b2a248d09fd181530260604";

const searchBtn = document.getElementById("searchBtn");
const cityInput = document.getElementById("cityInput");

const weatherInfo = document.getElementById("weatherInfo");
const loader = document.getElementById("loader");
const error = document.getElementById("error");

const cityName = document.getElementById("cityName");
const temperature = document.getElementById("temperature");
const condition = document.getElementById("condition");
const humidity = document.getElementById("humidity");
const wind = document.getElementById("wind");
const icon = document.getElementById("weatherIcon");
const dateTime = document.getElementById("dateTime");

/* Fetch Weather */
async function getWeather(city) {
    try {
        loader.classList.remove("hidden");
        weatherInfo.classList.add("hidden");
        error.classList.add("hidden");

        const res = await fetch(
            `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&aqi=no`
        );

        if (!res.ok) throw new Error("City not found");

        const data = await res.json();

        updateUI(data);

    } catch (err) {
        error.classList.remove("hidden");
    } finally {
        loader.classList.add("hidden");
    }
}

/* Update UI */
function updateUI(data) {
    weatherInfo.classList.remove("hidden");

    cityName.innerText = data.location.name;
    temperature.innerText = `${data.current.temp_c}°C`;
    condition.innerText = data.current.condition.text;
    humidity.innerText = `${data.current.humidity}%`;
    wind.innerText = `${data.current.wind_kph} km/h`;

    // Icon
    icon.src = "https:" + data.current.condition.icon;

    // Date Time
    dateTime.innerText = data.location.localtime;

    // Background Change
    changeBackground(data.current.condition.text);
}

/* Background Change */
function changeBackground(weather) {
    weather = weather.toLowerCase();

    if (weather.includes("sunny") || weather.includes("clear")) {
        document.body.style.background = "linear-gradient(135deg, #fceabb, #f8b500)";
    } else if (weather.includes("rain")) {
        document.body.style.background = "linear-gradient(135deg, #4b79a1, #283e51)";
    } else if (weather.includes("cloud")) {
        document.body.style.background = "linear-gradient(135deg, #bdc3c7, #2c3e50)";
    } else {
        document.body.style.background = "linear-gradient(135deg, #4facfe, #00f2fe)";
    }
}

/* Events */
searchBtn.addEventListener("click", () => {
    const city = cityInput.value.trim();
    if (city) getWeather(city);
});

cityInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        getWeather(cityInput.value.trim());
    }
});

/* Default Load */
window.onload = () => {
    getWeather("Delhi");
};

/* Dark Mode */
const toggle = document.getElementById("toggleMode");

toggle.addEventListener("click", () => {
    document.body.classList.toggle("dark");
});