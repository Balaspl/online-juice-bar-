const API_KEY = "31d2c20da7bfe57ab81895f6e4861dd6";

const cityInput = document.getElementById("city");
const searchBtn = document.getElementById("searchBtn");
const weatherDiv = document.getElementById("weather");
const forecastDiv = document.getElementById("forecast");
const errorDiv = document.getElementById("error");
const animationContainer = document.getElementById("animation-container");

searchBtn.addEventListener("click", getWeather);

cityInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        getWeather();
    }
});

async function getWeather() {

    const city = cityInput.value.trim();

    if (!city) {
        errorDiv.innerHTML = "Please enter a city name";
        return;
    }

    errorDiv.innerHTML = "";

    try {

        // Current Weather

        const weatherResponse = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`
        );

        const weatherData = await weatherResponse.json();

        if (weatherData.cod != 200) {
            throw new Error(weatherData.message);
        }

        displayCurrentWeather(weatherData);

        setTheme(weatherData.weather[0].main);

        // 5 Day Forecast details

        const forecastResponse = await fetch(
            `https://api.openweathermap.org/data/2.5/forecast?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`
        );

        const forecastData = await forecastResponse.json();

        displayForecast(forecastData);

    }

    catch (error) {

        errorDiv.innerHTML = error.message;

    }
}

function displayCurrentWeather(data) {

    weatherDiv.innerHTML = `

        <h2>
            📍 ${data.name}, ${data.sys.country}
        </h2>

        <img
        src="https://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png">

        <h1>
            ${Math.round(data.main.temp)}°C
        </h1>

        <h3>
            ${data.weather[0].main}
        </h3>

        <p>
            Feels Like :
            ${Math.round(data.main.feels_like)}°C
        </p>

        <p>
            Humidity :
            ${data.main.humidity}%
        </p>

        <p>
            Wind Speed :
            ${data.wind.speed} m/s
        </p>

    `;
}

function displayForecast(data) {

    forecastDiv.innerHTML = "";

    const dailyForecast =
        data.list.filter(item =>
            item.dt_txt.includes("12:00:00")
        );

    dailyForecast.slice(0, 5).forEach(day => {

        forecastDiv.innerHTML += `

            <div class="forecast-card">

                <h3>
                ${new Date(day.dt_txt)
                    .toLocaleDateString(
                        "en-US",
                        { weekday: "short" }
                    )}
                </h3>

                <img
                src="https://openweathermap.org/img/wn/${day.weather[0].icon}.png">

                <p>
                    ${Math.round(day.main.temp)}°C
                </p>

                <small>
                    ${day.weather[0].main}
                </small>

            </div>

        `;
    });
}

function setTheme(condition) {

    document.body.className = "";

    animationContainer.innerHTML = "";

    if (condition === "Clear") {

        document.body.classList.add("sunny");

        createSun();
        createParticles();
    }

    else if (
        condition === "Rain" ||
        condition === "Drizzle"
    ) {

        document.body.classList.add("rain");

        createRain();
    }

    else if (condition === "Snow") {

        document.body.classList.add("snow");

        createSnow();
    }

    else if (condition === "Thunderstorm") {

        document.body.classList.add("thunder");

        createRain();
        createLightning();
    }

    else if (
        condition === "Mist" ||
        condition === "Fog" ||
        condition === "Haze"
    ) {

        document.body.classList.add("fog");

        createFog();
    }

    else {

        document.body.classList.add("clouds");

        createClouds();
    }
}

/* SUNNY  view*/

function createSun() {

    const sun = document.createElement("div");

    sun.classList.add("sun");

    animationContainer.appendChild(sun);
}

function createParticles() {

    for (let i = 0; i < 40; i++) {

        const particle =
            document.createElement("div");

        particle.classList.add("particle");

        particle.style.left =
            Math.random() * 100 + "vw";

        particle.style.animationDuration =
            (5 + Math.random() * 10) + "s";

        animationContainer.appendChild(particle);
    }
}

/* CLOUDS view */

function createClouds() {

    for (let i = 0; i < 10; i++) {

        const cloud =
            document.createElement("div");

        cloud.classList.add("cloud");

        cloud.style.top =
            Math.random() * 50 + "vh";

        cloud.style.left =
            (-400 - Math.random() * 500) + "px";

        cloud.style.animationDuration =
            (25 + Math.random() * 25) + "s";

        animationContainer.appendChild(cloud);
    }
}

/* RAIN view*/

function createRain() {

    for (let i = 0; i < 150; i++) {

        const drop =
            document.createElement("div");

        drop.classList.add("drop");

        drop.style.left =
            Math.random() * 100 + "vw";

        drop.style.animationDelay =
            Math.random() + "s";

        animationContainer.appendChild(drop);
    }
}

/* SNOW view */

function createSnow() {

    for (let i = 0; i < 100; i++) {

        const snow =
            document.createElement("div");

        snow.classList.add("snowflake");

        snow.innerHTML = "❄";

        snow.style.left =
            Math.random() * 100 + "vw";

        snow.style.animationDelay =
            Math.random() * 8 + "s";

        animationContainer.appendChild(snow);
    }
}

/* THUNDER view */

function createLightning() {

    const lightning =
        document.createElement("div");

    lightning.classList.add("lightning");

    animationContainer.appendChild(lightning);
}

/* FOG view */

function createFog() {

    for (let i = 0; i < 8; i++) {

        const fog =
            document.createElement("div");

        fog.classList.add("fog-layer");

        fog.style.top =
            Math.random() * 80 + "vh";

        fog.style.animationDelay =
            Math.random() * 10 + "s";

        animationContainer.appendChild(fog);
    }
}