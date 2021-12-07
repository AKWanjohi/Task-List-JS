let form = document.getElementById("task-form");
let taskList = document.querySelector("ul.collection");
let clearBtn = document.querySelector(".clear-tasks");
let filter = document.getElementById("filter");
let taskInput = document.getElementById("task");

loadEventListeners();

function loadEventListeners() {
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

    taskInput.value = "";
  }
}

function removeTask(e) {
  e.preventDefault();
  if (e.target.parentElement.classList.contains("delete-item")) {
    if (
      confirm(
        `Are you sure you wish to delete '${e.target.parentElement.parentElement.textContent}'?`
      )
    ) {
      e.target.parentElement.parentElement.remove();
    }
  }
}

function clearTasks() {
  while (taskList.firstChild) {
    taskList.removeChild(taskList.firstChild);
  }
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
