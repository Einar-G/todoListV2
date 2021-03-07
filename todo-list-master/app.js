"use strict";

const TODO_STORAGE = "todo.items";

let todos = JSON.parse(localStorage.getItem(TODO_STORAGE)) || [];

let todoRoot = document.querySelector(".todo-container");
let todoForm = document.querySelector("[data-todo-form]");
let todoInput = document.querySelector("[data-todo-input]");
let completedRoot = document.querySelector(".completed-root");

 var options = {
  year: 'numeric', month: 'numeric', day: 'numeric',
  hour: 'numeric', minute: 'numeric', second: 'numeric',
  hour12: false
}

let dateFormat = new Intl.DateTimeFormat("sv-SE", options);

todoForm.addEventListener("submit", (e) => {
  e.preventDefault();
  if (todoInput.value.trim() === "") {
    return;
  }
  todos.push(createTodo(todoInput.value.trim()));
  updateTodo();
  todoInput.value = "";
});

function createTodo(name) {
  return {
    id: Date.now().toString(),
    name: name, 
    createdDate: dateFormat.format(new Date())
  };
}

function todoList(items) {
    let list = document.createElement("ul");
    items.forEach((item) => {
    let todoListItem = document.createElement("li");
    todoListItem.innerText = item.name;
    todoListItem.setAttribute("data-id", item.id);
    todoListItem.setAttribute("created-date", item.createdDate);
    todoListItem.classList.add("todo-list-item");
    todoListItem.addEventListener("click", removeItem);
    list.append(todoListItem);
  });
  return list;
}

function removeItem(event) {
  let itemToRemove = event.target.getAttribute("data-id");
  let completedName = event.target.innerText;
  let createdDate = event.target.getAttribute("created-date");
  todos = todos.filter((item) => item.id !== itemToRemove);
  updateTodo();
  updateCompletedItem(completedName, createdDate);
}

function updateCompletedItem(completedName, createdDate) {
  let completedRow = document.createElement("tr");
  completedRoot.append(completedRow);
  let itemText = document.createElement("td");
  completedRow.append(itemText);
  itemText.innerText = completedName;
  let itemCreated = document.createElement("td");
  completedRow.append(itemCreated);
  itemCreated.innerText = createdDate;
  let itemCompleted = document.createElement("td");
  itemCompleted.innerText = dateFormat.format(new Date());
  completedRow.append(itemCompleted);  
}

function updateTodo() {
  saveTodo();
  todoRoot.innerHTML = "";
  todoRoot.append(todoList(todos));
}

function saveTodo() {
  localStorage.setItem(TODO_STORAGE, JSON.stringify(todos));
}

updateTodo();