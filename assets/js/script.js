var taskIdCounter = 0;
var formEl = document.querySelector("#task-form");
var tasksToDoEl = document.querySelector("#tasks-to-do");
var pageContentEl = document.querySelector("#page-content");


var taskFormHandler = function (event) {
  event.preventDefault();
  
  var taskNameInput = document.querySelector("input[name='task-name']").value;
  var taskTypeInput = document.querySelector("select[name='task-type']").value;
  
  // "if either one or both of the variables are not true, then proceed," which is the same as "if either one or both of the variables are false, then proceed."
  if (!taskNameInput || !taskTypeInput) {
    alert("You need to Input a task to slay!");
    return false;
  }
  
  formEl.reset();
  
  // Package up data as an object
  var taskDataObj = {
    name: taskNameInput,
    type: taskTypeInput,
  };
  
  // send it as an argument to createTaskEl
  createTaskEl(taskDataObj);
  console.table({ taskTypeInput, taskNameInput });
};

var createTaskEl = function (taskDataObj) {
  var listItemEl = document.createElement("li");
  listItemEl.className = "task-item";
  
  // add a task id as a custom attribute
  listItemEl.setAttribute("data-task-id", taskIdCounter);
  
  var taskInfoEl = document.createElement("div");
  taskInfoEl.className = "task-item";
  
  // taskInfoEl.innerHTML = "<h3 class='task-name'>" + taskNameInput + "</h3><span class='task-type'>" + taskTypeInput + "</span>";
  taskInfoEl.innerHTML =
  "<h3 class='task-name'>" +
  taskDataObj.name +
  "</h3><span class='task-type'>" +
  taskDataObj.type +
  "</span>";
  
  listItemEl.appendChild(taskInfoEl);
  
  console.dir(listItemEl);
  // listItemEl.textContent = taskNameInput;
  var taskActionsEl = createTaskActions(taskIdCounter);
  listItemEl.appendChild(taskActionsEl);
  console.log(taskActionsEl);
  
  tasksToDoEl.appendChild(listItemEl);
  
  // increase task counter for next unique id
  taskIdCounter++;
};

var createTaskActions = function (taskId) {
  var actionContainerEl = document.createElement("div");
  actionContainerEl.className = "task-actions";
  
  // create edit button
  var editButtonEl = document.createElement("button");
  editButtonEl.textContent = "Edit";
  editButtonEl.className = "btn edit-btn";
  editButtonEl.setAttribute("data-task-id", taskId);
  
  actionContainerEl.appendChild(editButtonEl);
  
  // create delete button
  var deleteButtonEl = document.createElement("button");
  deleteButtonEl.textContent = "Delete";
  deleteButtonEl.className = "btn delete-btn";
  deleteButtonEl.setAttribute("data-task-id", taskId);
  
  console.log(taskId);
  actionContainerEl.appendChild(deleteButtonEl);
  
  var statusSelectEl = document.createElement("select");
  statusSelectEl.className = "select-status";
  statusSelectEl.setAttribute("name", "status-change");
  statusSelectEl.setAttribute("data-task-id", taskId);
  
  var statusChoice = ["About 2 Slay", "Slaying in progress", "Slayed"];
  for (var i = 0; i < statusChoice.length; i++) {
    // create option element
    var statusOptionEl = document.createElement("option");
    statusOptionEl.textContent = statusChoice[i];
    statusOptionEl.setAttribute("value", statusChoice[i]);
    
    // append to select
    statusSelectEl.appendChild(statusOptionEl);
  }
  
  actionContainerEl.appendChild(statusSelectEl);
  
  return actionContainerEl;
};

// buttonEl.addEventListener("click", createTaskHandler);
formEl.addEventListener("submit", taskFormHandler);

var taskButtonHandler = function(event) {
  console.log(event.target);
  
  if (event.target.matches(".delete-btn")) {
    // get the element's task id
    var taskId = event.target.getAttribute("data-task-id");
    deleteTask(taskId);
    console.log(taskId);
  }
 
};

var deleteTask = function(taskId) {
  var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");
  taskSelected.remove();
  console.log(taskSelected);
};

pageContentEl.addEventListener("click", taskButtonHandler);