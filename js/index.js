import greetingTranslation from './lang.js';
import { getWeather, getQuotes, getCityLocalStorage } from './weather.js';
import { setLenguageInTODOBtn } from './todoList.js';

//  Перевод приложения на два языка 
const lenguageEN = document.getElementById("lenguage1");
const lenguageRU = document.getElementById("lenguage2");
let language = localStorage.getItem('language') ?? "en";
let appLang = greetingTranslation[language];
 
const toggleLang = document.querySelector(".language");

//Язык настроек
const setLenguageInSettings = () => {
    const adjText1 = document.querySelector(".adj-text1");
    const adjText2 = document.querySelector(".adj-text2");
    const adjText3 = document.querySelector(".adj-text3");
    const adjTitle = document.querySelector(".adj-title"); 
    const playerLabel = document.getElementById("playerLabel"); 
    const wheatherLabel = document.getElementById("wheatherLabel"); 
    const timeLabel = document.getElementById("timeLabel"); 
    const greatingLabel = document.getElementById("greatingLabel"); 
    const quoteLabel = document.getElementById("quoteLabel");
    const playListLabel = document.getElementById("playListLabel");
    adjText1.textContent = appLang.settings[0]; 
    adjText2.textContent = appLang.settings[1];  
    adjText3.textContent = appLang.settings[2]; 
    adjTitle.textContent = appLang.settings[3]; 
    playerLabel.textContent = appLang.settings[4]; 
    wheatherLabel.textContent = appLang.settings[5]; 
    timeLabel.textContent = appLang.settings[6]; 
    greatingLabel.textContent = appLang.settings[7]; 
    quoteLabel.textContent = appLang.settings[8];  
    playListLabel.textContent = appLang.settings[9];  
}
setLenguageInSettings();

//Язык смены языка
const setLenguageInButtonLenguage = () => {
    const flag = document.querySelector(".flag");
    const text = document.querySelector(".lenguage-text");
    flag.style.backgroundImage = appLang.flagBg; 
    text.textContent = appLang.language; 
}
setLenguageInButtonLenguage();

const switchLang = () => {
    if (language === "en") {
        appLang = greetingTranslation.ru;
        language = "ru";
    } else {
        appLang = greetingTranslation.en;
        language = "en";
    }
    localStorage.setItem("language", language);
    setLenguageInButtonLenguage();
    setLenguageInTODOBtn();
    setLenguageInSettings();
    getWeather();
    getQuotes();
    getCityLocalStorage();
}

lenguageEN.addEventListener("input", switchLang);
lenguageRU.addEventListener("input", switchLang);
toggleLang.addEventListener("click", switchLang);
window.addEventListener('beforeunload', () => {
    localStorage.setItem("language", language);
});

//  Часы и календарь 
//Получаем дату
const showDate = () => {
    const elemDate = document.getElementById("main-date");
    const date = new Date();
    const options = { month: 'long', day: 'numeric', timeZone: 'UTC', weekday: 'long' };
    const local = appLang.local;
    const currentDate = date.toLocaleDateString(`${local}`, options);
    elemDate.textContent = currentDate;
}

// Получаем время
const showTime = () => {
    const elemTime = document.getElementById("main-time");
    const date = new Date();
    const currentTime = date.toLocaleTimeString();
    elemTime.textContent = currentTime;
    showDate();
    setGreating();
    setTimeout(showTime, 1000);
}

// Приветствие 
const user = document.getElementById("userName")
// Получаем время дня
const getTimeofDay = () => {
    const date = new Date();
    const hour = date.getHours();
    if (hour >= 6 && hour < 12) {
        return 0;
    } else if (hour >= 12 && hour < 18) {
        return 1;
    } else if (hour >= 18 && hour < 24) {
        return 2;
    } else {
        return 3;
    }
}
// Устанавливаем приветствие
const setGreating = () => {
    const greating = document.getElementById("greating");
    const timeOfDay = getTimeofDay();
    const greetingText = `${appLang.greating[timeOfDay]} ${appLang.timeOfDay[timeOfDay]}`;
    user.placeholder = appLang.placeholder;
    greating.textContent = greetingText;
}
// Устанавлием имя в LocalStorage
const setLocalStorage = () => {
    localStorage.setItem("userName", user.value)
}
// Получаем имя из LocalStorage
const getLocalStorage = () => {
    if (localStorage.getItem('userName')) {
        user.value = localStorage.getItem('userName');
    }
}

window.addEventListener('beforeunload', setLocalStorage);
window.addEventListener('load', getLocalStorage);

showTime();