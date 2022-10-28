var taskIdCounter = 0;

var formEl = document.querySelector("#task-form");
var tasksToDoEl = document.querySelector("#tasks-2-slay");
var tasksInProgressEl = document.querySelector("#slaying-in-progress");
var tasksCompletedEl = document.querySelector("#tasks-Slayed");
var pageContentEl = document.querySelector("#page-content");
var tasks = [];


var taskFormHandler = function (event) {
  event.preventDefault();
  var taskNameInput = document.querySelector("input[name='task-name']").value;
  var taskTypeInput = document.querySelector("select[name='task-type']").value;

  if (taskNameInput === "" || taskTypeInput === "") {
    alert("You need to Input a task 2 slay!");
    return false;
  }
  
  document.querySelector("input[name='task-name']").value = "";
  document.querySelector("select[name='task-type']").selectedIndex = 0;
  
  var isEdit = formEl.hasAttribute("data-task-id");
  // has data attribute, so get the task id and call the function to complete edit process
  if (isEdit) {
    var taskId = formEl.getAttribute("data-task-id");
    completeEditTask(taskNameInput, taskTypeInput, taskId);
  } else {
    var taskDataObj = {
      name: taskNameInput,
      type: taskTypeInput,
      status: "2 slay"
    };
    
    createTaskEl(taskDataObj);
  }
};

var createTaskEl = function (taskDataObj) {
  var listItemEl = document.createElement("li");
  listItemEl.className = "task-item";
  // add a task id as a custom attribute
  listItemEl.setAttribute("data-task-id", taskIdCounter);

  var taskInfoEl = document.createElement("div");
  taskInfoEl.className = "task-item";

  taskInfoEl.innerHTML = "<h3 class='task-name'>" + taskDataObj.name + "</h3><span   class='task-type'>" + taskDataObj.type +"</span>";
  listItemEl.appendChild(taskInfoEl);

  console.dir(listItemEl);
  var taskActionsEl = createTaskActions(taskIdCounter);
  listItemEl.appendChild(taskActionsEl);
  tasksToDoEl.appendChild(listItemEl);
  // console.log(taskActionsEl);
 taskDataObj.id = taskIdCounter;

 tasks.push(taskDataObj);
  // increase task counter for next unique id
  console.log(taskDataObj);
  console.log(taskDataObj.status);

  taskIdCounter++;
};

var completeEditTask = function (taskName, taskType, taskId) {
  // find the matching task list item
  var taskSelected = document.querySelector(
    ".task-item[data-task-id='" + taskId + "']"
  );

  // set new values
  taskSelected.querySelector("h3.task-name").textContent = taskName;
  taskSelected.querySelector("span.task-type").textContent = taskType;

  for (var i = 0; i < tasks.length; i++) {
    if (tasks[i].id === parseInt(taskId)){
      tasks[i].name = taskName;
      tasks[i].type = taskType;
    }
  };
  alert("Task Updated!");

  formEl.removeAttribute("data-task-id");
  document.querySelector("#save-task").textContent = "Add Task";
};

var taskStatusChangeHandler = function (event) {
  // console.log(event.target, event.target.getAttribute("data-task-id"))
  //get the task item's id
  var taskId = event.target.getAttribute("data-task-id");

  // get the currently selected option's value and convert to lowercase
  var statusValue = event.target.value.toLowerCase();

  // find the parent task item element based on the id
  var taskSelected = document.querySelector(
    ".task-item[data-task-id='" + taskId + "']"
  );

  if (statusValue === "about 2 slay") {
    tasksToDoEl.appendChild(taskSelected);
  } else if (statusValue === "slaying in progress") {
    tasksInProgressEl.appendChild(taskSelected);
  } else if (statusValue === "slayed") {
    tasksCompletedEl.appendChild(taskSelected);
  }

  for (var i = 0; i < tasks.length; i++) {
    if (tasks[i].id === parseInt(taskId)) {
      tasks[i].status = statusValue;
    }
    console.log(tasks);
  }
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

var taskButtonHandler = function (event) {
  // get target element from event
  var targetEl = event.target;
  var updatedTaskArr = [];

  // edit button was clicked
  if (targetEl.matches(".edit-btn")) {
    var taskId = targetEl.getAttribute("data-task-id");
    editTask(taskId);
  }

  // delete button clicked
  else if (event.target.matches(".delete-btn")) {
    // get the element's task id
    var taskId = event.target.getAttribute("data-task-id");
    deleteTask(taskId);
  }

  for (var i = 0; i < tasks.length; i++) {
    if (tasks[i].id !== parseInt(taskId)) {
      updatedTaskArr.push(tasks[i]);
    }
  }
  tasks = updatedTaskArr;
};

var editTask = function (taskId) {
  // console.log("editing task #" + taskId);

  // get task list item element
  var taskSelected = document.querySelector(
    ".task-item[data-task-id='" + taskId + "']"
  );
  // var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");

  // get content from task name and type
  var taskName = taskSelected.querySelector("h3.task-name").textContent;

  var taskType = taskSelected.querySelector("span.task-type").textContent;
  document.querySelector("input[name='task-name']").value = taskName;
  document.querySelector("select[name='task-type']").value = taskType;
  document.querySelector("#save-task").textContent = "Save Task";

  formEl.setAttribute("data-task-id", taskId);
  // console.log(taskName, taskType);
};

var deleteTask = function (taskId) {
  // console.log(taskId);
  var taskSelected = document.querySelector(
    ".task-item[data-task-id='" + taskId + "']"
  );
  taskSelected.remove();
};

// buttonEl.addEventListener("click", createTaskHandler);
formEl.addEventListener("submit", taskFormHandler);

// for edit and delete
pageContentEl.addEventListener("click", taskButtonHandler);

// for changing status
pageContentEl.addEventListener("change", taskStatusChangeHandler);
