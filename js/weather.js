import greetingTranslation from './lang.js';

const city = document.getElementById("city");

export const getCityLocalStorage = () => {
    if (localStorage.getItem('userCity')) {
        city.value = localStorage.getItem('userCity');
    } else {
        let language = localStorage.getItem('language') ?? "en";
        let appLang = greetingTranslation[language]; 
        city.value = appLang.defaultCity;
    }
}

export async function getWeather() {
    let language = localStorage.getItem('language') ?? "en";
    let appLang = greetingTranslation[language];
    const weatherError = document.querySelector('.wheather-error');
    const wheatherDescription = document.querySelector('.wheather-description');
    const weatherIcon = document.querySelector('.weather-icon');
    const temperature = document.querySelector('.temperature');
    const weatherDescription = document.querySelector('.weather-description');
    const humidity = document.querySelector('.humidity');
    const wind = document.querySelector('.wind');
    if (!city.value) {
        city.value = appLang.defaultCity;
    }
    try {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&lang=${appLang.language}&appid=62979e0079fca9e440a6dff201386479&units=metric`;
        const res = await fetch(url);
        const data = await res.json();
        const temper = Math.round(data.main.temp);
        const windSpeed = Math.round(data.wind.speed);
        const humid = Math.round(data.main.humidity);
        weatherError.classList.remove("wheather-error_active");
        wheatherDescription.classList.remove("wheather-description_passive");
        weatherIcon.className = 'weather-icon owf';
        weatherIcon.classList.add(`owf-${data.weather[0].id}`);
        temperature.textContent = `${appLang.wheather[0]} - ${temper}°C`;
        weatherDescription.textContent = data.weather[0].description;
        wind.textContent = `${appLang.wheather[1]} - ${windSpeed} ${appLang.wheather[2]}`;
        humidity.textContent = `${appLang.wheather[3]} - ${humid}%`;
        return true;
    } catch (Error) {
        weatherError.classList.add("wheather-error_active");
        wheatherDescription.classList.add("wheather-description_passive");
        return false;
    }
}
function onWheather(e){
    e.stopPropagation();
    const isWheather = getWeather();
    if(isWheather) localStorage.setItem("userCity", city.value);
}

city.addEventListener("change", (e) => {
    onWheather(e)
})
city.addEventListener('keydown', (e) => {
    if (e.keyCode === 13) {
        onWheather(e)
    }
});
city.addEventListener('blur', (e) => {
    onWheather(e)
});

getWeather();
window.addEventListener('load', getCityLocalStorage);


// Виджет "цитата дня"
const quoteBtn = document.querySelector('.footer-btn');

 export async function getQuotes() {
    let language = localStorage.getItem('language') ?? "en";
    let appLang = greetingTranslation[language];
    const quote = document.querySelector('.quote');
    const author = document.querySelector('.author');
    const quotes = `${appLang.quote}`;
    const res = await fetch(quotes);
    const data = await res.json();
    const dataSort = await data.sort(() => Math.random() - 0.5);
    quote.textContent = dataSort[0].text;
    author.textContent = dataSort[0].author;
}

quoteBtn.addEventListener("click", getQuotes);
getQuotes();