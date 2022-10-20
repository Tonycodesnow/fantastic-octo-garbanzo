
var formEl = document.querySelector("#task-form");
var tasksToDoEl = document.querySelector("#tasks-to-do");

var createTaskHandler = function (event) {
  event.preventDefault();

  console.log(event)
  var taskNameInput = document.querySelector("input[name='task-name']").value;

  var listItemEl = document.createElement("li");
  listItemEl.className = "task-item";
  listItemEl.textContent = "This is a new task.";
  tasksToDoEl.appendChild(listItemEl);

  console.dir(taskNameInput);
};

formEl.addEventListener("submit", createTaskHandler);
// buttonEl.addEventListener("click", createTaskHandler);
