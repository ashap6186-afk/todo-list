let taskInput = document.getElementById("taskInput");
let taskTime = document.getElementById("taskTime");
let taskList = document.getElementById("taskList");

// Load saved tasks and mode
window.onload = function() {
  taskList.innerHTML = localStorage.getItem("tasks") || "";
  if (localStorage.getItem("mode") === "dark") {
    document.body.classList.add("dark");
  }
};

// Add task
function addTask() {
  if (taskInput.value === "" || taskTime.value === "") {
    alert("Please enter task and date/time");
    return;
  }

  let li = document.createElement("li");

  li.innerHTML = `
    <div class="task-text">${taskInput.value}</div>
    <div class="task-time">${taskTime.value}</div>
    <div class="actions">
      <button onclick="editTask(this)">Edit</button>
      <button class="delete-btn" onclick="deleteTask(this)">Delete</button>
    </div>
  `;

  taskList.appendChild(li);
  saveTasks();

  taskInput.value = "";
  taskTime.value = "";
}

// Delete task
function deleteTask(btn) {
  btn.parentElement.parentElement.remove();
  saveTasks();
}

// Edit task
function editTask(btn) {
  let li = btn.parentElement.parentElement;
  let text = li.querySelector(".task-text").innerText;
  let time = li.querySelector(".task-time").innerText;

  let newText = prompt("Edit task:", text);
  let newTime = prompt("Edit date & time:", time);

  if (newText && newTime) {
    li.querySelector(".task-text").innerText = newText;
    li.querySelector(".task-time").innerText = newTime;
    saveTasks();
  }
}

// Save tasks
function saveTasks() {
  localStorage.setItem("tasks", taskList.innerHTML);
}

// Dark / Light mode
function toggleMode() {
  document.body.classList.toggle("dark");

  if (document.body.classList.contains("dark")) {
    localStorage.setItem("mode", "dark");
  } else {
    localStorage.setItem("mode", "light");
  }
}