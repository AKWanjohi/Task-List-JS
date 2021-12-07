let form = document.getElementById("task-form");
let taskList = document.querySelector("ul.collection");
let clearBtn = document.querySelector(".clear-tasks");
let filter = document.getElementById("filter");
let taskInput = document.getElementById("task");

loadEventListeners();

function loadEventListeners() {
  document.addEventListener("DOMContentLoaded", getTasks);
  form.addEventListener("submit", addTask);
  taskList.addEventListener("click", removeTask);
  clearBtn.addEventListener("click", clearTasks);
  filter.addEventListener("keyup", filterTasks);
}

function addTask(e) {
  e.preventDefault();

  if (taskInput.value == "") {
    alert("Add a task!");
  } else {
    let li = document.createElement("li");
    li.className = "collection-item";
    li.appendChild(document.createTextNode(taskInput.value));

    let link = document.createElement("a");
    link.className = "delete-item secondary-content";
    link.innerHTML = "<i class='fas fa-trash-alt'></i>";

    li.appendChild(link);

    taskList.appendChild(li);

    storeTaskInLocalStorage(taskInput.value);

    taskInput.value = "";
  }
}

function removeTask(e) {
  e.preventDefault();

  if (e.target.parentElement.classList.contains("delete-item")) {
    let taskItem = e.target.parentElement.parentElement;

    if (confirm(`Are you sure you wish to delete '${taskItem.textContent}'?`)) {
      removeTaskFromLocalStorage(taskItem);

      e.target.parentElement.parentElement.remove();
    }
  }
}

function clearTasks() {
  while (taskList.firstChild) {
    taskList.removeChild(taskList.firstChild);
  }
  clearTasksFromLocalStorage();
}

function filterTasks(e) {
  let text = e.target.value.toLowerCase();

  let tasks = document.querySelectorAll(".collection-item");

  tasks.forEach(function (task) {
    let item = task.firstChild.textContent;

    if (item.toLowerCase().indexOf(text) == -1) {
      task.style.display = "none";
    } else {
      task.style.display = "block";
    }
  });
}

function storeTaskInLocalStorage(task) {
  let tasks;

  if (localStorage.getItem("tasks") == null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }
  tasks.push(task);

  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function getTasks() {
  if (localStorage.getItem("tasks") != null) {
    let tasks = JSON.parse(localStorage.getItem("tasks"));

    tasks.forEach(function (task) {
      let li = document.createElement("li");
      li.className = "collection-item";
      li.appendChild(document.createTextNode(task));

      let link = document.createElement("a");
      link.className = "delete-item secondary-content";
      link.innerHTML = "<i class='fas fa-trash-alt'></i>";

      li.appendChild(link);

      taskList.appendChild(li);
    });
  }
}

function removeTaskFromLocalStorage(taskItem) {
  let tasks;
  tasks = JSON.parse(localStorage.getItem("tasks"));

  tasks.forEach(function (task) {
    if (task == taskItem.textContent) {
      tasks.pop(task);
    }
  });

  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function clearTasksFromLocalStorage() {
  localStorage.removeItem("tasks");
}
