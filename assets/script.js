const newName = document.getElementById("cityInput");
const cityName = document.getElementById("cityName");
const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const imgSrc = "http://openweathermap.org/img/wn/";

function getWeatherData(cityName) {
    return fetch(`https://api.openweathermap.org/data/2.5/forecast/?q=${cityName}&appid=ee0f9a588c4aa47825e2a42bb3f4672f&units=imperial`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .catch(error => {
            const errorMessage = document.createElement('p');
            errorMessage.textContent = `Something went wrong: ${error.message}`;
            document.body.appendChild(errorMessage);
        });
}

function setWeatherData(weatherData) {
    for (let i = 0; i < 5; i++) {
        const dayOfWeek = daysOfWeek[getDayOfWeek(i)];
        const icon = imgSrc + weatherData.list[i].weather[0].icon + ".png";
        const minTemp = Number(weatherData.list[i].main.temp_min).toFixed(1);
        const maxTemp = Number(weatherData.list[i].main.temp_max).toFixed(2);

        document.getElementById(`day${i+1}`).textContent = dayOfWeek;
        document.getElementById(`img${i+1}`).src = icon;
        document.getElementById(`day${i+1}Min`).textContent = `Min: ${minTemp}°`;
        document.getElementById(`day${i+1}Max`).textContent = `Max: ${maxTemp}°`;
    }
}

function getDayOfWeek(day) {
    const today = new Date();
    let dayOfWeek = day + today.getDay();
    if (dayOfWeek > 6) {
        dayOfWeek -= 7;
    }
    return dayOfWeek;
}

function getInfo() {
    cityName.textContent = `--${newName.value}--`;
    getWeatherData(newName.value)
        .then(weatherData => setWeatherData(weatherData));
}

function defaultScreen() {
    newName.defaultValue = "Flagstaff";
    getInfo();
}

document.getElementById("cityInput").addEventListener("keyup", function(event) {
    if (event.key === "Enter") {
        getInfo();
    }
});

defaultScreen();