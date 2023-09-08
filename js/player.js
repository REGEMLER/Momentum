import playList from './playList.js';

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
const playAudio = (e) => {
    const songTitle = document.querySelector('.play-title');
    const audioItems = document.querySelectorAll(".play-item");
    const container = document.querySelector(".progress-container");
    const progress = document.querySelector(".progress-inner");
    audioItems.forEach(item => {
        item.classList.remove("play-item_active");
    });
    audioItems[playNum].classList.add("play-item_active");
    const icon = document.getElementById("playIcon")
    audio.src = playList[playNum].src;
    songTitle.textContent = playList[playNum].title;
    songDuration.textContent = playList[playNum].duration;
    let durationArray = playList[playNum].duration.split(":").map( item => {
        let newArr = item.split("");
        if(newArr[0] === "0") newArr.shift();
        return newArr.join("");
    })
    const [mins, secs] = durationArray;
    const duration = +mins * 60 + +secs
    const width = progress.clientWidth * 100 / container.clientWidth;
    const time = width * duration / 100;
    let durationSeconds = Math.floor(time % 60);
    let durationMin = Math.floor(time / 60);
    audio.muted = false;
    audio.volume = 0.5;
    if (isPlaying) {
        icon.src = "assets/premium-icon-play-button-4980098.png";
        songCurrentDuration.textContent = `${String(durationMin).padStart(2, "0")}:${String(durationSeconds).padStart(2, "0")}`;
        audio.pause();
        isPlaying = false;
    } else {
        if(e.target.closest === playButton || e.target.id === "playIcon"){
            audio.currentTime = time;
        }
        audio.play();
        icon.src = "assets/free-icon-video-pause-button-16427.png";
        isPlaying = true;
    }
}

//Переключение песен
const playNext = (e) => {
    if (playNum >= playList.length - 1) {
        playNum = 0;
        isPlaying = false;
    } else {
        playNum++;
        isPlaying = false;
    }
    playAudio(e);
}
const playPrev = (e) => {
    if (playNum <= 0) {
        playNum = playList.length - 1;
        isPlaying = false;
    } else {
        playNum--;
        isPlaying = false;
    }
    playAudio(e);
}
//Создаем список песен 
const createPlayer = (elem) => {
    const li = document.createElement('li');
    li.classList.add("play-item");
    li.textContent = elem.title;
    li.id = elem.id;
    playMenu.append(li);
}

window.addEventListener('load', () => {
    playList.forEach(item => {
        createPlayer(item);
    });
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
    // console.log(duration)
    if(isPlaying){
        songCurrentDuration.textContent = `${String(durationMin).padStart(2, "0")}:${String(durationSeconds).padStart(2, "0")}`;
    }
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
        playAudio(event);
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