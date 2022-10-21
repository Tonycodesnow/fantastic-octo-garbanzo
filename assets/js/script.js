
var formEl = document.querySelector("#task-form");
var tasksToDoEl = document.querySelector("#tasks-to-do");

var taskFormHandler = function (event) {
  event.preventDefault();

  var taskNameInput = document.querySelector("input[name='task-name']").value;
  var taskTypeInput = document.querySelector("select[name='task-type']").value;

  // "if either one or both of the variables are not true, then proceed," which is the same as "if either one or both of the variables are false, then proceed."
  if (!taskNameInput || !taskTypeInput) {
    alert("You need to fill out the task form!");
    return false;
  }
  
  formEl.reset();
  
  // Package up data as an object
  var taskDataObj = {
    name: taskNameInput,
    type: taskTypeInput
  };
  
  // send it as an argument to createTaskEl
  createTaskEl(taskDataObj);
  console.table({taskTypeInput, taskNameInput});
  
};

var createTaskEl = function(taskDataObj) {
  
  var listItemEl = document.createElement("li");
  listItemEl.className = "task-item";
  
  var taskInfoEl = document.createElement("div");
  taskInfoEl.className = "task-item";
  
  // taskInfoEl.innerHTML = "<h3 class='task-name'>" + taskNameInput + "</h3><span class='task-type'>" + taskTypeInput + "</span>";
  taskInfoEl.innerHTML = "<h3 class='task-name'>" + taskDataObj.name + "</h3><span class='task-type'>" + taskDataObj.type + "</span>";
  
  listItemEl.appendChild(taskInfoEl);
  
  console.dir(listItemEl);
  // listItemEl.textContent = taskNameInput;
  
  tasksToDoEl.appendChild(listItemEl);

}

formEl.addEventListener("submit", taskFormHandler);
// buttonEl.addEventListener("click", createTaskHandler);
