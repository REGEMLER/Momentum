const menu = document.querySelector(".adj");
const btn = document.querySelector(".footer-adj");

menu.addEventListener("click", (e)=>{
    e.stopPropagation();
})

document.body.addEventListener("click", ()=>{
    if(menu.classList.contains(`adj_active`)){
        menu.classList.remove(`adj_active`);
    }  
    return false; 
})

const showAdj = (e) => {
    e.stopPropagation();
    if(menu.classList.contains(`adj_active`)){
        menu.classList.remove(`adj_active`);
    } else{
        menu.classList.add(`adj_active`); 
    }
}
btn.addEventListener("click",showAdj);

export function show(block, flag){
    if(flag.checked){
        block.classList.remove("invisible");
    } else {
        block.classList.add("invisible");
    }
}

// Показать/скрыть отдельные элементы  
const isPlayer = document.getElementById("forPlayer");
export const showPlayer = () => {
    show(document.querySelector(".player"), isPlayer);
}
isPlayer.addEventListener("input", showPlayer); 

const isWheather = document.getElementById("forWheather");
const showWhether = () => {
    show(document.querySelector(".weather"), isWheather);
}
isWheather.addEventListener("input", showWhether); 

const isClock = document.getElementById("forClock");
const showClock = () => {
    show(document.querySelector(".main-date-container"), isClock);
}
isClock.addEventListener("input", showClock); 

const isGreating = document.getElementById("forGreating");
const showGreating = () => {
    show(document.querySelector(".main-greating"), isGreating);
}
isGreating.addEventListener("input", showGreating); 

const isQuote = document.getElementById("forCite");
const showQuote = () => {
    show(document.querySelector(".footer-quote"), isQuote);
}
isQuote.addEventListener("input", showQuote);

const isSongs = document.getElementById("forSongs");
const showSongs = () => {
    show(document.querySelector(".play-list"), isSongs);
}
isSongs.addEventListener("input", showSongs);