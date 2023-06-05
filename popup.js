document.addEventListener("DOMContentLoaded", function () {
  // Array to store the selected tasks
  let selectedTasks = [];

  // Function to add a task to the list and local storage
  // function addTaskToList(task) {
  //   const taskList = document.getElementById("task-list");

  //   // Create a new list item
  //   const listItem = document.createElement("li");
  //   listItem.classList.add("task-item");

  //   // Create the task title
  //   const taskTitle = document.createElement("h3");
  //   taskTitle.textContent = task;

  //   // Add event listener for selecting task item
  //   listItem.addEventListener("click", function () {
  //     selectTask(task);
  //   });

  //   // Create the edit button
  //   const editButton = document.createElement("button");
  //   editButton.classList.add("edit-button");
  //   editButton.innerHTML = '<i class="fas fa-pen"></i>';
  //   editButton.addEventListener("click", function (event) {
  //     event.stopPropagation(); // Prevent selecting task when clicking the edit button
  //     editTask(task, listItem);
  //   });

  //   // Create the delete button
  //   const deleteButton = document.createElement("button");
  //   deleteButton.classList.add("delete-button");
  //   deleteButton.innerHTML = '<i class="fas fa-trash-alt"></i>';
  //   deleteButton.addEventListener("click", function (event) {
  //     event.stopPropagation(); // Prevent selecting task when clicking the delete button
  //     deleteTask(task, listItem);
  //   });

  //   // Append the elements to the list item
  //   listItem.appendChild(taskTitle);
  //   listItem.appendChild(editButton);
  //   listItem.appendChild(deleteButton);

  //   // Append the list item to the task list
  //   taskList.appendChild(listItem);
  // }

  function addTaskToList(task) {
    const taskList = document.getElementById("task-list");

    // Create a new list item
    const listItem = document.createElement("li");
    listItem.classList.add("task-item");

    // Create the task title
    const taskTitle = document.createElement("h3");
    taskTitle.textContent = task;

    // Create the checkbox
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.addEventListener("change", function () {
      toggleSelection(task, listItem);
    });

    // Create the edit button
    const editButton = document.createElement("button");
    editButton.classList.add("edit-button");
    editButton.innerHTML = '<i class="fas fa-pen"></i>';
    editButton.addEventListener("click", function (event) {
      event.stopPropagation(); // Prevent selecting task when clicking the edit button
      editTask(task, listItem);
    });

    // Create the delete button
    const deleteButton = document.createElement("button");
    deleteButton.classList.add("delete-button");
    deleteButton.innerHTML = '<i class="fas fa-trash-alt"></i>';
    deleteButton.addEventListener("click", function (event) {
      event.stopPropagation(); // Prevent selecting task when clicking the delete button
      deleteTask(task, listItem);
    });

    // Append the elements to the list item
    listItem.appendChild(checkbox);
    listItem.appendChild(taskTitle);
    listItem.appendChild(editButton);
    listItem.appendChild(deleteButton);

    // Append the list item to the task list
    taskList.appendChild(listItem);
  }

  // Function to toggle the selection of a task
  function toggleSelection(task, listItem) {
    const checkbox = listItem.querySelector('input[type="checkbox"]');

    if (checkbox.checked) {
      selectedTasks.push(task);
      listItem.classList.add("selected");
    } else {
      const index = selectedTasks.indexOf(task);
      selectedTasks.splice(index, 1);
      listItem.classList.remove("selected");
    }
  }

  // Function to copy the selected tasks to the clipboard
  function copySelectedTasksToClipboard() {
    const selectedTasksText = selectedTasks.join("\n");

    if (selectedTasksText) {
      navigator.clipboard.writeText(selectedTasksText).then(
        function () {
          alert("Selected tasks copied to clipboard!");
        },
        function () {
          alert("Unable to copy selected tasks to clipboard.");
        }
      );
    }
  }

  // Function to select a task
  function selectTask(task) {
    const selectedTask = document.getElementById("selected-task");
    selectedTask.textContent = task;
  }

  // Function to load tasks from local storage
  function loadTasks() {
    let tasks = localStorage.getItem("tasks");
    tasks = tasks ? JSON.parse(tasks) : [];

    const taskSelect = document.getElementById("task-select");
    const taskList = document.getElementById("task-list");

    tasks.forEach(function (task) {
      addTaskToList(task);

      // Add the task as an option in the select dropdown
      const option = document.createElement("option");
      option.value = task;
      option.text = task;
      taskSelect.appendChild(option);
    });
  }

  // Function to save tasks to local storage
  function saveTasks(tasks) {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }

  // Function to add a new task
  function addTask(task) {
    let tasks = localStorage.getItem("tasks");
    tasks = tasks ? JSON.parse(tasks) : [];

    tasks.push(task);
    saveTasks(tasks);
    addTaskToList(task);
  }

  // Function to delete a task
  function deleteTask(task, listItem) {
    let tasks = localStorage.getItem("tasks");
    tasks = tasks ? JSON.parse(tasks) : [];

    const index = tasks.indexOf(task);
    if (index !== -1) {
      tasks.splice(index, 1);
      saveTasks(tasks);
      listItem.remove();
    }
  }

  // // Function to edit a task
  // function editTask(task, listItem) {
  //   const newTask = prompt("Enter the updated task:", task);
  //   if (newTask !== null && newTask.trim() !== "") {
  //     let tasks = localStorage.getItem("tasks");
  //     tasks = tasks ? JSON.parse(tasks) : [];

  //     const index = tasks.indexOf(task);
  //     if (index !== -1) {
  //       tasks[index] = newTask;
  //       saveTasks(tasks);
  //       listItem.textContent = newTask;
  //     }
  //   }
  // }

  function editTask(task, listItem) {
    const newTask = prompt("Edit task:", task);

    if (newTask !== null && newTask.trim() !== "") {
      listItem.querySelector("h3").textContent = newTask;
      updateLocalStorage();
    }
  }

  function updateLocalStorage() {
    const taskItems = Array.from(document.querySelectorAll(".task-item"));
    const tasks = taskItems.map(function (item) {
      return item.querySelector("h3").textContent;
    });

    localStorage.setItem("tasks", JSON.stringify(tasks));
  }

  // Function to copy the selected task text to the clipboard
  function copyToClipboard() {
    const selectedTask = document.getElementById("selected-task").textContent;

    if (selectedTask) {
      navigator.clipboard.writeText(selectedTask).then(
        function () {
          alert("Task copied to clipboard!");
        },
        function () {
          alert("Unable to copy task to clipboard.");
        }
      );
    }
  }

  // Event listener for the add button
  document.getElementById("add-button").addEventListener("click", function () {
    const taskInput = document.getElementById("task-input");
    const task = taskInput.value.trim();

    if (task) {
      addTask(task);
      taskInput.value = "";
    }
  });

  // Event listener for the copy button
  document
    .getElementById("copy-button")
    .addEventListener("click", copySelectedTasksToClipboard);

  // Load the tasks when the extension is loaded
  loadTasks();
});
