let addBtn = document.querySelector("#addBtn");
let taskInput = document.querySelector("#taskInput");
let taskList = document.querySelector("#taskList");

// Load tasks on page load
window.addEventListener("DOMContentLoaded", loadTasks);

// Add task
function addTask() {
    let taskText = taskInput.value.trim();
    if (taskText === "") return;

    // create unique id for each task
    const task = {
        id: Date.now().toString(), // unique id as string
        text: taskText,
        completed: false
    };

    createTaskElement(task);
    saveTask(task);

    taskInput.value = "";
}

// Create li element and set dataset id
function createTaskElement(task) {
    let li = document.createElement("li");
    li.dataset.id = task.id; // store id on element

    // create text node so delete button doesn't become part of text
    let span = document.createElement("span");
    span.textContent = task.text;
    span.style.flex = "1";

    if (task.completed) {
        li.classList.add("completed");
    }

    // delete button
    let delBtn = document.createElement("button");
    delBtn.textContent = "X";
    delBtn.style.marginLeft = "10px";
    delBtn.addEventListener("click", function (e) {
        e.stopPropagation();
        li.remove();
        deleteTask(task.id);
    });

    // complete toggle on li click (not on delete button)
    li.addEventListener("click", function () {
        li.classList.toggle("completed");
        toggleTask(task.id);
    });

    li.appendChild(span);
    li.appendChild(delBtn);
    taskList.appendChild(li);
}

// Save task to localStorage
function saveTask(task) {
    let tasks = getTasks();
    tasks.push(task);
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Get all tasks from localStorage
function getTasks() {
    let tasks = localStorage.getItem("tasks");
    return tasks ? JSON.parse(tasks) : [];
}

// Load tasks on startup
function loadTasks() {
    let tasks = getTasks();
    tasks.forEach(task => createTaskElement(task));
}

// Delete task by id
function deleteTask(id) {
    let tasks = getTasks();
    tasks = tasks.filter(t => t.id !== id);
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Toggle completed status by id
function toggleTask(id) {
    let tasks = getTasks();
    tasks = tasks.map(t => {
        if (t.id === id) {
            return { ...t, completed: !t.completed };
        }
        return t;
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Add button click
addBtn.addEventListener("click", addTask);

// Enter key press
taskInput.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
        addTask();
    }
});
// script.js (replace your existing file with this)
