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