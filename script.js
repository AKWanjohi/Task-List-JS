let form = document.getElementById("task-form");
let taskList = document.querySelector("ul.collection");
let clearBtn = document.querySelector(".clear-tasks");
let filter = document.getElementById("filter");
let taskInput = document.getElementById("task");

loadEventListeners();

function loadEventListeners() {
  form.addEventListener("submit", addTask);
}

function addTask(e) {
  e.preventDefault();

  if (taskInput.value == "") {
    alert("Add a task!");
  }

  let li = document.createElement("li");
  li.className = "collection-item";
  li.appendChild(document.createTextNode(taskInput.value));

  let link = document.createElement("a");
  link.className = "delete-item secondary-content";
  link.innerHTML = "<i class='fas fa-trash-alt'></i>";

  li.appendChild(link);

  taskList.appendChild(li);

  taskInput.value = "";
}
