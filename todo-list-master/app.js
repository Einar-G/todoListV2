"use strict";

const TODO_STORAGE = "todo.items";
const LIST_STORAGE = "list.items";

let todos = JSON.parse(localStorage.getItem(TODO_STORAGE)) || [];
let lists = JSON.parse(localStorage.getItem(LIST_STORAGE)) || [];

let todoRoot = document.querySelector(".todo-container");
let todoForm = document.querySelector("[data-todo-form]");
let todoInput = document.querySelector("[data-todo-input]");

let listsContainer= document.querySelector(".lists-container");
let listForm = document.querySelector("[data-new-list-form]");
let listInput = document.querySelector("[data-new-list-input]");

todoForm.addEventListener("submit", (e) => {
  e.preventDefault();
  if (todoInput.value.trim() === "") {
    return;
  }
  todos.push(createTodo(todoInput.value.trim()));
  updateTodo();
  todoInput.value = "";
});

listForm.addEventListener("submit", (e) => {
  e.preventDefault();
  if (listInput.value.trim() === "") {
    return;
  }
  lists.push(createTodo(listInput.value.trim()));
  updateList();
  listInput.value = null;
  lists.push(list);
  renderLists();
  saveLists();
});

function renderLists( ){
    lists.forEach(list => {
        const listElement = document.createElement("li")
        listElement.classList.add("list-name");
        listElement.innerText = list.name;
        listsContainer.appendChild(listElement);
        listElement.dataset.listid = list.id;
    });
}

function createList(name) {
   return {
    id: Date.now().toString(),
    name: name, tasks: []
    }; 
}

function saveLists() {
    localStorage.setItem(JSON.stringify(lists));
}

function updateLists() {
   saveLists();
}

function createTodo(name) {
  return {
    id: Date.now().toString(),
    name: name
  };
}

function todoList(items) {
    let list = document.createElement("ul");
    items.forEach((item) => {
    let todoListItem = document.createElement("li");
    todoListItem.innerText = item.name;
    todoListItem.setAttribute("data-id", item.id);
    todoListItem.classList.add("todo-list-item");
    todoListItem.addEventListener("click", removeItem);
    list.append(todoListItem);
  });
  return list;
}

function removeItem(event) {
  let itemToRemove = event.target.getAttribute("data-id");
  todos = todos.filter((item) => item.id !== itemToRemove);
  updateTodo();
}

function updateTodo() {
  saveTodo();
  todoRoot.innerHTML = "";
  todoRoot.append(todoList(todos));
}

function saveTodo() {
  localStorage.setItem(TODO_STORAGE, JSON.stringify(todos));
}

renderLists();
updateTodo();