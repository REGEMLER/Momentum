import playList from './playList.js';
import greetingTranslation from './lang.js';

//  Настройки приложения
//Показать/скрыть меню настроек 
const adj = document.querySelector(".adj");
const adjBtn = document.querySelector(".footer-adj");

adj.addEventListener("click", (e)=>{
    e.stopPropagation();
})

document.body.addEventListener("click", ()=>{
    if(adj.classList.contains(`adj_active`)){
        adj.classList.remove(`adj_active`);
    } return false; 
})

const showAdj = (e) => {
    e.stopPropagation();
    if(adj.classList.contains(`adj_active`)){
        adj.classList.remove(`adj_active`);
    } else{
        adj.classList.add(`adj_active`); 
    }
}
adjBtn.addEventListener("click",showAdj);

// Показать/скрыть отдельные элементы  
const isPlayer = document.getElementById("forPlayer");

const showPlayer = () => {
    const block  =  document.querySelector(".player");
    if(isPlayer.checked){
        block.classList.remove("invisible");
    } else {
        block.classList.add("invisible");
    }
}

isPlayer.addEventListener("input", showPlayer); 

const isWheather = document.getElementById("forWheather");

const showWhether = () => {
    const block  =  document.querySelector(".weather");
    if(isWheather.checked){
        block.classList.remove("invisible");
    } else {
        block.classList.add("invisible");
    }
}
isWheather.addEventListener("input", showWhether); 

const isClock = document.getElementById("forClock");

const showClock = () => {
    const block  =  document.querySelector(".main-date-container");
    if(isClock.checked){
        block.classList.remove("invisible");
    } else {
        block.classList.add("invisible");
    }
}
isClock.addEventListener("input", showClock); 

const isGreating = document.getElementById("forGreating");

const showGreating = () => {
    const block  =  document.querySelector(".main-greating");
    if(isGreating.checked){
        block.classList.remove("invisible");
    } else {
        block.classList.add("invisible");
    }
}
isGreating.addEventListener("input", showGreating); 

const isQuote = document.getElementById("forCite");

const showQuote = () => {
    const block  =  document.querySelector(".footer-quote");
    if(isQuote.checked){
        block.classList.remove("invisible");
    } else {
        block.classList.add("invisible");
    }
}
isQuote.addEventListener("input", showQuote);

//  Перевод приложения на два языка 
const lenguageEN = document.getElementById("lenguage1");
const lenguageRU = document.getElementById("lenguage2");
let isEng = localStorage.getItem('localLang') ?? lenguageEN.checked;

//Строка false преобразуется в true!
if(isEng==="false"){
    isEng = false; 
}

const setLangLocalStorage = () => {
    localStorage.setItem("localLang", isEng);
}

let appLang = isEng ? greetingTranslation.en : greetingTranslation.ru;
 
const toggleLang = document.querySelector(".language");
const todoSubmit = document.getElementById("toDoSubmit");

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
    adjText1.textContent = appLang.settings[0]; 
    adjText2.textContent = appLang.settings[1];  
    adjText3.textContent = appLang.settings[2]; 
    adjTitle.textContent = appLang.settings[3]; 
    playerLabel.textContent = appLang.settings[4]; 
    wheatherLabel.textContent = appLang.settings[5]; 
    timeLabel.textContent = appLang.settings[6]; 
    greatingLabel.textContent = appLang.settings[7]; 
    quoteLabel.textContent = appLang.settings[8];  
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
    if (isEng) {
        appLang = greetingTranslation.ru;
        setLenguageInButtonLenguage();
        setLenguageInTODOBtn();
        setLenguageInSettings();
        getWeather();
        getQuotes();
        lenguageEN.checked = false; 
        lenguageRU.checked = true;
        isEng = !isEng;
    } else {
        appLang = greetingTranslation.en;
        setLenguageInButtonLenguage();
        setLenguageInTODOBtn();
        setLenguageInSettings();
        getWeather();
        getQuotes();
        lenguageEN.checked = true; 
        lenguageRU.checked = false;
        isEng = !isEng;
    }
}

lenguageEN.addEventListener("input", switchLang);
lenguageRU.addEventListener("input", switchLang);
toggleLang.addEventListener("click", switchLang);
window.addEventListener('beforeunload', setLangLocalStorage);


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
    showPlayer();
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

//  Слайдер изображений
const arrowRight = document.getElementById("arrow-right");
const arrowRLeft = document.getElementById("arrow-left");
const GITHUB = document.getElementById("bg1");
const Unsplash = document.getElementById("bg2");
const Flickr = document.getElementById("bg3");
const bgs = document.getElementsByName("bg");

// Получаем рандомное число 
const getRandomIntInclusive = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

let randomNum = getRandomIntInclusive(1, 20);

// Функция для установки фона 
const setBg = () => {
    const arr = [...bgs];
    const cb = arr.find(item => item.checked); 
    if(cb.value ==="GITHUB"){
        setBgGit();
    }
    if(cb.value ==="Unsplash"){
        getLinkToImageUnsplash(); 
    }
    if(cb.value ==="Flickr"){
        getLinkToImageFlickr(); 
    }
}

// Устанавливаем фоновое изображение из гитхаба 
const setBgGit = () => {
    const img = new Image();
    const date = new Date();
    const hour = date.getHours();
    let dayTime;
    if (hour >= 6 && hour < 12) {
        dayTime = "morning";
    } else if (hour >= 12 && hour < 18) {
        dayTime = "afternoon";
    } else if (hour >= 18 && hour < 24) {
        dayTime = "evening";
    } else {
        dayTime = "night";
    }
    const bgNum = String(randomNum).padStart(2, "0");
    let src = `url('https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/${dayTime}/${bgNum}.jpg')`;
    img.src = `https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/${dayTime}/${bgNum}.jpg`;
    img.onload = () => {
        document.body.style.backgroundImage = src;
    };
}

//получаем фоновое изображение от  Unsplash API
async function getLinkToImageUnsplash() {
    const img = new Image();
    const url = 'https://api.unsplash.com/photos/random?query=morning&client_id=6pJV3K7B93fP_mmR31tE_zXipoY-1wqf8aUuukVWG3c';
    const res = await fetch(url);
    const data = await res.json();
    const src = await data.urls.regular;
    const urlSRc = `url(${src})`;
    img.src = await src;
    img.onload = () => {
        document.body.style.backgroundImage = urlSRc;
    };
}

//получаем фоновое изображение от  Flickr  API
async function getLinkToImageFlickr() {
    const img = new Image();
    const num = Math.floor(Math.random() * 100);
    const url = 'https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=1ee4b6764c41e4fb002e4719e2e9981e&tags=nature&extras=url_l&format=json&nojsoncallback=1';
    const res = await fetch(url);
    const data = await res.json();
    const src = await data.photos.photo[num].url_l;
    const urlSRc = `url(${src})`
    img.src = await src;
    img.onload = () => {
        document.body.style.backgroundImage = urlSRc;
    };
}

// Перелистывание фонового изображения 
const getSlideNext = () => {
    randomNum < 20 ? ++randomNum : randomNum = 1;
    setBg();
}
const getSlidePrev = () => {
    randomNum > 1 ? --randomNum : randomNum = 20;
    setBg();
}

arrowRight.addEventListener('click', getSlideNext);
arrowRLeft.addEventListener('click', getSlidePrev);
GITHUB.addEventListener("input",setBg);
Unsplash.addEventListener("input",setBg);
Flickr.addEventListener("input",setBg);
setBg();

// Виджет погоды
const city = document.getElementById("city");
if (!city.value) {
    city.value = appLang.defaultCity;
}
const setCityLocalStorage = () => {
    localStorage.setItem("userCity", city.value)
}
const getCityLocalStorage = () => {
    if (localStorage.getItem('userCity')) {
        city.value = localStorage.getItem('userCity');
    }
}

async function getWeather() {
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
    } catch (Error) {
        weatherError.classList.add("wheather-error_active");
        wheatherDescription.classList.add("wheather-description_passive");
    }
}
city.addEventListener("change", (e) => {
    getWeather();
})
city.addEventListener('keydown', (e) => {
    if (e.keyCode === 13) {
        e.stopPropagation();
        getWeather();
    }
});
city.addEventListener('blur', (e) => {
    e.stopPropagation();
    getWeather();
});

getWeather();
window.addEventListener('beforeunload', setCityLocalStorage);
window.addEventListener('load', getCityLocalStorage);


// Виджет "цитата дня"
const quoteBtn = document.querySelector('.footer-btn');

async function getQuotes() {
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

// Аудиоплеер
let playNum = 0;
let isPlaying = false;
const audio = new Audio();
const playButton = document.getElementById("play_btn");
const playButtonPrev = document.getElementById("play_btnPrev");
const playButtonNext = document.getElementById("play_btnNext");
const songDuration = document.querySelector('.full-time');
const songCurrentDuration = document.querySelector('.current-time');
const playMenu = document.getElementById("play-list");
songDuration.textContent = playList[playNum].duration;

// Основная функция включает и выключает песню 
const playAudio = () => {
    const songTitle = document.querySelector('.play-title');
    const audioItems = document.querySelectorAll(".play-item");
    audioItems.forEach(item => {
        item.classList.remove("play-item_active");
    });
    audioItems[playNum].classList.add("play-item_active");
    const icon = document.getElementById("playIcon")
    audio.src = playList[playNum].src;
    songTitle.textContent = playList[playNum].title;
    songDuration.textContent = playList[playNum].duration;
    audio.muted = false;
    // audio.volume = 0.5;
    // console.log( audio.volume)
    if (isPlaying) {
        audio.pause();
        icon.src = "assets/premium-icon-play-button-4980098.png";
        isPlaying = false;
    } else {
        audio.play();
        icon.src = "assets/free-icon-video-pause-button-16427.png";
        isPlaying = true;
    }
}

//Переключение песен
const playNext = () => {
    if (playNum >= playList.length - 1) {
        playNum = 0;
        isPlaying = false;
        playAudio();
    } else {
        playNum++;
        isPlaying = false;
        playAudio();
    }
}
const playPrev = () => {
    if (playNum <= 0) {
        playNum = playList.length - 1;
        isPlaying = false;
        playAudio();
    } else {
        playNum--;
        isPlaying = false;
        playAudio();
    }
}
//Создаем список песен 
const createPlayer = (elem) => {
    const li = document.createElement('li');
    li.classList.add("play-item");
    li.textContent = elem.title;
    li.id = elem.id;
    playMenu.append(li);
}
playList.forEach(item => {
    createPlayer(item);
});

playButton.addEventListener("click", playAudio);
playButtonPrev.addEventListener("click", playPrev);
playButtonNext.addEventListener("click", playNext);
audio.addEventListener("ended", playNext);

//  Продвинутый аудиоплеер; 
const progressBar = document.querySelector(".progress-container");
const soundBar = document.querySelector(".sound-container");
const muteImg = document.querySelector(".player-sound_img");

// Отображаем прогресс проигрывания и показываем текущее время
const getProgress = (event) => {
    const progress = document.querySelector(".progress-inner");
    const { duration, currentTime } = event.srcElement;
    const progressPercent = currentTime / duration * 100;
    progress.style.width = `${progressPercent}%`;
    let durationSeconds = Math.floor(currentTime % 60);
    let durationMin = Math.floor(currentTime / 60);
    songCurrentDuration.textContent = `${durationMin}:${durationSeconds}`
}
audio.addEventListener("timeupdate", getProgress);

// Создаем возможность перемотки 
const setProgress = (e) => {
    const width = progressBar.clientWidth;
    const click = e.clientX - progressBar.offsetLeft;
    const duration = audio.duration;
    audio.currentTime = click / width * duration;
}
progressBar.addEventListener("click", setProgress);

// Создаем возможность включить песню кликнув по ней 
const changeSong = (event) => {
    const id = event.target.id;
    if (id) {
        playNum = id;
        isPlaying = false;
        playAudio();
    }
    return false;
}
playMenu.addEventListener("click", changeSong);

// Создаем функционал включить/выключить звук
const setMute = () => {
    if (audio.muted) {
        muteImg.src = "assets/premium-icon-sound-3980158.png";
        audio.muted = false;

    } else {
        muteImg.src = "assets/premium-icon-mute-2989884.png";
        audio.muted = true;
    }
}
muteImg.addEventListener("click", setMute)

//Регулировка громкости 
const setVolume = (e) => {
    const progress = document.querySelector(".sound-inner");
    const width = soundBar.clientWidth;
    const click = e.clientX - soundBar.offsetLeft;
    progress.style.width = `${click}px`
    let val = click / width;
    audio.volume = +val.toFixed(1);
}
soundBar.addEventListener("click", setVolume);

// Дополнительный функционал на выбор ToDo List
const list = document.querySelector(".toDo-list");
const todoBtn = document.querySelector(".toDo-btn");
const toDoContainer = document.querySelector(".toDo");
const todoInput = document.getElementById("toDoInput");

//Язык кнопки 
const setLenguageInTODOBtn = () => {
    const todoBtn = document.querySelector(".toDo-btn"); 
    todoBtn.textContent = appLang.ToDo[0]; 
    todoSubmit.value = appLang.ToDo[1]; 
}
setLenguageInTODOBtn();

//Показать/скрыть список дел 
toDoContainer.addEventListener("click", (e)=>{
    e.stopPropagation(); 
})

document.body.addEventListener("click", ()=>{
    if (toDoContainer.classList.contains("toDo_active")) {
        toDoContainer.classList.remove("toDo_active");
    } return false; 
})

const showToDoList = (e) => {
    e.stopPropagation(); 
    if (toDoContainer.classList.contains("toDo_active")) {
        toDoContainer.classList.remove("toDo_active");
    } else {
        toDoContainer.classList.add("toDo_active");
    }
}
todoBtn.addEventListener("click", showToDoList);

// Создаем экземпляр задачи
const createToDo = (todoText) => {
    const li = document.createElement("li");
    li.classList.add("todo-item");
    li.insertAdjacentHTML(
        `afterbegin`,
        `
        <div class="list_buttons">
            <i class="far fa-check-square"></i>
            <i class="fas fa-times"></i>
            <i class="fas fa-trash-alt"></i>
        </div>
        <p class="item_text">${todoText}</p>
        `);
    return li;
}

//Добавляем задачу в список 
const addToDo = () => {
    if (todoInput.value === "") {
        return false;
    }
    const newTask = createToDo(todoInput.value);
    todoInput.value = "";
    todoInput.focus();
    list.append(newTask);
}
todoSubmit.addEventListener("click", addToDo);

//Управление задачей
const handleToDo = (e) => {
    if (e.target.classList.contains("fa-trash-alt")) {
        e.target.parentElement.parentElement.remove();
    }
    if (e.target.classList.contains("fa-times")) {
        e.target.parentElement.parentElement.classList.add('todo-failed');
        e.target.previousElementSibling.remove();
        e.target.remove();
    }
    if (e.target.classList.contains("fa-check-square")) {
        e.target.parentElement.parentElement.classList.add('todo-done');
        e.target.nextElementSibling.remove();
        e.target.remove();
    }
}
list.addEventListener("click", handleToDo);

// Устанавлием список дел в LocalStorage
const setToDoLocalStorage = () => {
    localStorage.setItem("listToDo", list.innerHTML);
}
// Получаем имя из setLoca lStorage
const getToDoLocalStorage = () => {
    if (localStorage.getItem('listToDo')) {
        list.innerHTML = localStorage.getItem('listToDo');
    }
}

window.addEventListener('beforeunload', setToDoLocalStorage);
window.addEventListener('load', getToDoLocalStorage);

showTime();