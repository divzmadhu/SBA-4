/**
 * =================================================================
 * PROJECT: Dynamic Task Management Application
 * MODULE:  JavaScript Review (SBA)
 * DATE:    09/20/26
 * 
 **  Objectives:
 * 1. Add new tasks with details such as the task name, category, deadline, and status.
 * 2. Update the status of tasks to reflect their progress (e.g., “In Progress,” “Completed,” “Overdue”).
 * 3. Automatically update task status based on the current date (tasks past their deadline will be marked as “Overdue”).
 * 4. Filter tasks by status or category.
 * 5. Persist task data using local storage so tasks are saved even after refreshing the page.
 * =================================================================
 */

//  Add new tasks with details such as the task name, category, deadline, and status.

let tasks = [];


let taskName = document.getElementById("taskName");
let taskCategory = document.getElementById("taskCategory");
let taskDeadline = document.getElementById("taskDeadline");
let taskStatus = document.getElementById("taskStatus");

let statusFilter = document.getElementById("statusFilter");
let categoryFilter = document.getElementById("categoryFilter");
let filterButton = document.getElementById("filterButton");




// let savedTasks = localStaorage.getItem(taskMateTasks);



let addTaskButton = document.getElementById("addTaskButton");

let displayTaskButton = document.getElementById("displayTaskButton");

let updateStatusButton = document.getElementById("updateStatusButton");


let taskList = document.getElementById("taskList");

let updateTaskList = document.getElementById("updateTaskList");

//let taskText = taskInput.value;

// LocalStorage  functions

function saveTasks() {       // Saving the data from the objects to the localstorage 
    localStorage.setItem("taskMateTasks", JSON.stringify(tasks));
}

function loadTasks() {     // Retrieving the data from the localStorage 
    let savedTasks = localStorage.getItem("taskMateTasks");

    if (savedTasks) {
        tasks = JSON.parse(savedTasks);
        tasks.forEach(function (task) {
            task.deadline = new Date(task.deadline);

        });
    }
}

loadTasks();


addTaskButton.addEventListener("click", function addTaskButton() {
    let newTask = {
        id: Date.now().toString(),
        taskName: taskName.value.trim(),
        category: taskCategory.value,
        deadline: new Date(taskDeadline.value),
        status: taskStatus.value
    };

    if (taskName.value.trim() === "" || taskDeadline.value === "") {
        alert("Please enter a Task Name and a Deadline.");
        return;
    }

    tasks.push(newTask);
    saveTasks();

    console.log("Updated Tasks Array:", tasks);

    // let listTask = document.createElement("li");
    // listTask.innerText = taskText;

    // taskList.appendChild(listTask);
    // taskInput.value = ""   //Clear the input field
    taskName.value = "";
    taskCategory.value = "";
    taskDeadline.value = "";
    taskStatus.value = "";


});

displayTaskButton.addEventListener("click", displayTasks);

function displayTasks() {

    taskList.innerHTML = "";

    if (tasks.length === 0) {
        taskList.innerText = "No tasks to display.";
        return;
    }

    tasks.forEach(function (task) {

        let taskCard = document.createElement("li");



        let taskNameElement = document.createElement("h3");
        taskNameElement.innerText = task.taskName;

        let categoryElement = document.createElement("p");
        categoryElement.innerText = "Category: " + task.category;

        let deadlineElement = document.createElement("p");
        deadlineElement.innerText = "Deadline: " + task.deadline.toDateString();

        let statusElement = document.createElement("p");
        statusElement.innerText = "Status: " + task.status;

        // Remove button
let removeButton = document.createElement("button");
removeButton.innerText = "Remove";

removeButton.addEventListener("click", function () {

    tasks = tasks.filter(function (item) {
        return item.id !== task.id;
    });

    saveTasks();
    displayTasks();
});


        taskCard.appendChild(taskNameElement);
        taskCard.appendChild(categoryElement);
        taskCard.appendChild(deadlineElement);
        taskCard.appendChild(statusElement);

        taskCard.appendChild(removeButton);

        taskList.appendChild(taskCard);
    });
}




// function compare_twodates(date1, temp) {
//     date2=new Date();
//     if (date1 < date2) {
//         alert("Overdue");
//     }
//     else if (date1 > date2) {
//         if (temp) {
//             alert("Completed");
//         }
//         else {
//             alert("In Progress");
//         }
//     }
// }

// let date1 = new Date("2026-11-10");
// let temp=0;

// compare_twodates(date1,temp);

// Update Status Version 1 

// updateStatusButton.addEventListener("click", updateStatus);

// function updateStatus() {
//     taskList.innerHTML = "";

//     if (tasks.length === 0) {
//         taskList.innerText = "No tasks to display.";
//         return;
//     }
//     for (let i = 0; i < tasks.length; i++) {
//         // var task = tasks[i];
//         // tasks.forEach(function (task) {

//         let currentTaskIndex = i;
//         let currentTask = tasks[currentTaskIndex]
//         alert(currentTask.taskName);
//         let userAnswer = confirm("Is this task completed?");
//         if (userAnswer) {
//             tasks.taskStatus = "Completed";
//         }
//         else if (tasks.deadline > new Date()) {
//             tasks.taskStatus = "Overdue";
//         }
//         else {
//             tasks.taskStatus = "In Progress";
//         }
//     }

// }

filterButton.addEventListener("click", filterTasks);

function filterTasks() {

    let selectedStatus = statusFilter.value;
    let selectedCategory = categoryFilter.value;

    let filteredTasks = tasks.filter(function (task) {

        // Check status
        let statusMatches =
            selectedStatus === "All" ||
            task.status === selectedStatus;

        // Check category
        let categoryMatches =
            selectedCategory === "All" ||
            task.category === selectedCategory;

        // Task must match both filters
        return statusMatches && categoryMatches;
    });

    displayFilteredTasks(filteredTasks);
}


function displayFilteredTasks(filteredTasks) {

    taskList.innerHTML = "";

    if (filteredTasks.length === 0) {
        taskList.innerText = "No matching tasks found.";
        return;
    }

    filteredTasks.forEach(function (task) {

        let taskCard = document.createElement("li");

        let taskNameElement = document.createElement("h3");
        taskNameElement.innerText = task.taskName;

        let categoryElement = document.createElement("p");
        categoryElement.innerText = "Category: " + task.category;

        let deadlineElement = document.createElement("p");
        deadlineElement.innerText =
            "Deadline: " + task.deadline.toDateString();

        let statusElement = document.createElement("p");
        statusElement.innerText = "Status: " + task.status;


        taskCard.appendChild(taskNameElement);
        taskCard.appendChild(categoryElement);
        taskCard.appendChild(deadlineElement);
        taskCard.appendChild(statusElement);

        taskList.appendChild(taskCard);
    });
}


updateStatusButton.addEventListener("click", updateStatus);

function updateStatus() {
    taskList.innerHTML = "";

    if (tasks.length === 0) {
        taskList.innerText = "No tasks to display.";
        return;
    }
    let checkedTasks =0;
    for (let i = 0; i < tasks.length; i++) {
        let task = tasks[i];
        

        let taskItem = document.createElement('li');

        let taskNameElement = document.createElement("span");
        taskNameElement.innerText = task.taskName;

        let completedButton = document.createElement("button");
        completedButton.innerText = "Completed?";

        completedButton.addEventListener("click",function(){
            let userAnswer = confirm("Is this task completed?");
            if(userAnswer)
            {
                task.status ="Completed";
            }
            else if(task.deadline > new Date())
            {
              task.status ="In Progress"
            }
            else{
                task.status ="Overdue"
            }
            console.log(task);
            checkedTasks ++;
            completedButton.disabled = true;
            if (checkedTasks === tasks.length)
            {
                taskList.innerHTML ="";
                
                displayTasks();
            }
            
        });
        taskItem.appendChild(taskNameElement);
        taskItem.appendChild(completedButton);
        taskList.appendChild(taskItem);
    }
}



