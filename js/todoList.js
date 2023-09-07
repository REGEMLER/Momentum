import greetingTranslation from './lang.js';

const list = document.querySelector(".toDo-list");
const todoBtn = document.querySelector(".toDo-btn");
const toDoContainer = document.querySelector(".toDo");
const todoInput = document.getElementById("toDoInput");
const todoSubmit = document.getElementById("toDoSubmit");

//Язык кнопки 
export const setLenguageInTODOBtn = () => {
    let language = localStorage.getItem('language') ?? "en";
    let appLang = greetingTranslation[language];
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