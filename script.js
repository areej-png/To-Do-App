let addBtn = document.querySelector("#addBtn");
let taskInput = document.querySelector("#taskInput");
let taskList = document.querySelector("#taskList");

// function to add task
function addTask() {
    let taskText = taskInput.value.trim();
    if (taskText === "") return;

    // li create
    let li = document.createElement("li");
    li.textContent = taskText;

    // delete button
    let delBtn = document.createElement("button");
    delBtn.textContent = "X";
    delBtn.style.marginLeft = "10px";
    delBtn.addEventListener("click", function (e) {
        e.stopPropagation(); // delete click se complete toggle na ho
        li.remove();
    });

    // complete toggle
    li.addEventListener("click", function () {
        li.classList.toggle("completed");
    });

    li.appendChild(delBtn);
    taskList.appendChild(li);

    // clear input
    taskInput.value = "";
}

// Add button click
addBtn.addEventListener("click", addTask);

// Enter key press
taskInput.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
        addTask();
    }
});
