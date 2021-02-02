class Todo {
  constructor() {
    //adding todo selector
    this.todoInput = document.querySelector(".todo-input");
    this.addTodoButton = document.querySelector(".add-todo");
    this.todoContainer = document.querySelector(".todo-container");
    this.todoList = document.querySelector(".todo-list");

    this.title = document.querySelectorAll("h1");
    this.editTodos = document.getElementsByClassName("edit-todo");

    this.todos = this.todoList.children;
    this.todoCounter = document.querySelector(".todo-counter");

    this.allCompleted = document.getElementsByClassName("completed");

    //todo selector
  }

  addTodo(todoInput) {
    //create the todo div
    const todo = document.createElement("div");
    todo.classList.add("todo");

    //create the li
    const todoText = document.createElement("li");
    todoText.classList.add("todo-text");

    // const editForm = document.createElement("form");
    // editForm.classList.add("edit-form");

    const editTodo = document.createElement("input");
    editTodo.classList.add("edit-todo");
    editTodo.setAttribute("type", "text");

    // const editSubmit = document.createElement("input");
    // editSubmit.setAttribute("type", "submit");
    // editSubmit.setAttribute("hidden", true);
    // editSubmit.classList.add("edit-submit");

    todoText.appendChild(editTodo);
    // todoText.appendChild(editForm);

    editTodo.value = todoInput;
    editTodo.setAttribute("name", editTodo.value);
    this.todoInput.value = "";

    //create todo buttons

    const checkBtn = document.createElement("button");
    checkBtn.classList.add("check-button");
    checkBtn.innerHTML = '<i class="far fa-square"></i>';

    const trashBtn = document.createElement("button");
    trashBtn.classList.add("delete-button");
    trashBtn.innerHTML = '<i class="fas fa-trash"></i>';

    todo.appendChild(todoText);
    todo.appendChild(checkBtn);
    todo.appendChild(trashBtn);
    this.todoList.appendChild(todo);
  }

  createTodo(e, todoInput) {
    e.preventDefault();
    this.addTodo(todoInput);
    this.saveToLocalStorage(todoInput);
    this.editTodos = document.getElementsByClassName("edit-todo");
  }

  updateCounter() {
    const totalNbrOfTodos = this.todos.length;
    const completedTodos = this.allCompleted.length;

    this.todoCounter.innerText = totalNbrOfTodos - completedTodos;
  }

  deleteCheckEditTodo(e) {
    const item = e.target;

    const allTodo = item.parentElement;

    const todo = item.parentElement.getElementsByClassName("edit-todo");

    if (item.classList[0] === "delete-button") {
      allTodo.remove();
      console.log(allTodo);
      this.deleteLocalStorageTodo(todo[0].value);
    } else if (item.classList[0] === "check-button") {
      todo[0].classList.toggle("completed");

      if (todo[0].classList.contains("completed")) {
        item.children[0].classList.replace("fa-square", "fa-check-square");
      } else {
        item.children[0].classList.replace("fa-check-square", "fa-square");
      }
    }
    this.updateCounter();
  }

  editTodo(e) {
    //e.preventDefault();

    const item = e.target;

    const oldValue = item.name;

    console.log(oldValue);

    const newValue = item.value;

    console.log(newValue);

    this.updateLocalStorageTodo(oldValue, newValue);

    item.setAttribute("name", newValue);

    item.blur();
  }

  saveToLocalStorage(todo) {
    let todos;
    if (localStorage.getItem("todos") === null) {
      todos = [];
    } else {
      todos = JSON.parse(localStorage.getItem("todos"));
    }
    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));
  }

  deleteLocalStorageTodo(todo) {
    let todos;
    if (localStorage.getItem("todos") === null) {
      todos = [];
    } else {
      todos = JSON.parse(localStorage.getItem("todos"));
    }

    const todoIndex = todo;

    todos.splice(todos.indexOf(todoIndex), 1);
    localStorage.setItem("todos", JSON.stringify(todos));
  }

  updateLocalStorageTodo(oldTodo, todo) {
    let todos;
    if (localStorage.getItem("todos") === null) {
      todos = [];
    } else {
      todos = JSON.parse(localStorage.getItem("todos"));
    }

    const indexToChange = todos.indexOf(oldTodo);

    todos[indexToChange] = todo;

    localStorage.setItem("todos", JSON.stringify(todos));
  }

  getLocalStorageTodos() {
    let todos;

    if (localStorage.getItem("todos") === null) {
      todos = [];
    } else {
      todos = JSON.parse(localStorage.getItem("todos"));
    }

    todos.forEach((todo) => {
      this.addTodo(todo);
    });
  }
}

const todo = new Todo();

//Event listener

document.addEventListener("DOMContentLoaded", function () {
  todo.getLocalStorageTodos(todo);
  todo.updateCounter();
});

todo.addTodoButton.addEventListener("click", function (e) {
  todo.createTodo(e, todo.todoInput.value);
  todo.updateCounter();
});

todo.todoList.addEventListener("click", function (e) {
  todo.deleteCheckEditTodo(e);
});

todo.todoList.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    e.target.blur();
    todo.todoList.addEventListener("change", function (e, oldValue, newValue) {
      todo.editTodo(e, oldValue, newValue);
    });
  }
});
