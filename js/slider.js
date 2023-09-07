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