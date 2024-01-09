function addTask() {
    var taskTitle = document.getElementById("taskTitle").value;
    var taskDescription = document.getElementById("taskDescription").value;
    var dueDate = document.getElementById("dueDate").value;
    var priority = document.getElementById("priority").value;
    var category = document.getElementById("category").value;

    if (taskTitle.trim() === "") {
        alert("Please enter a task title!");
        return;
    }

    var task = {
        title: taskTitle,
        description: taskDescription,
        dueDate: dueDate,
        priority: priority,
        category: category,
        status: "New"
    };

    saveTask(task);
    displayTasks();
    clearInputs();
}

function saveTask(task) {
    var tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.push(task);
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function displayTasks() {
    var taskList = document.getElementById("taskList");
    taskList.innerHTML = "";

    var tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    tasks.forEach(function (task, index) {
        var li = document.createElement("li");
        li.innerHTML = `
            <span>${task.title} - ${task.description}</span>
            <span>Due: ${task.dueDate}</span>
            <span>Priority: ${task.priority}</span>
            <span>Category: ${task.category}</span>
            <span>Status: ${task.status}</span>
            <button onclick="completeTask(${index})">Complete</button>
        `;
        li.classList.add(task.status.toLowerCase());

        taskList.appendChild(li);
    });
}

function completeTask(index) {
    var tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks[index].status = "Completed";
    localStorage.setItem("tasks", JSON.stringify(tasks));
    displayTasks();
}

function clearInputs() {
    document.getElementById("taskTitle").value = "";
    document.getElementById("taskDescription").value = "";
    document.getElementById("dueDate").value = "";
    document.getElementById("priority").value = "Low";
    document.getElementById("category").value = "";
}

// Display tasks when the page loads
displayTasks();
