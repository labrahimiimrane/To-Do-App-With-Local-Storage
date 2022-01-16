let input = document.querySelector('.input');
let submit = document.querySelector('.add');
let taskDiv = document.querySelector('.tasks');

// Declare Empty Array for Store The Tasks 
let arrayOfTasks = [];

// Check If There is a Task In Local Storage
if(this.localStorage.getItem('tasks')) {
    arrayOfTasks = JSON.parse(this.localStorage.getItem('tasks'));
}



// Submit Task
submit.addEventListener('click', function(e) {
    e.preventDefault();
    if(input.value !== "") {
        addTaskToArray(input.value); //Add Task To Array Of Tasks
        input.value = ""; // Reset The Input Value To Empty
    } else {
        e.preventDefault();
    }
});

// Click On Task Element
taskDiv.addEventListener('click', (e) => {

    if(e.target.classList.contains("del")) {
        // Remove Element From Page 
        e.target.parentElement.remove();

        // Remove Task From Local Storag
        deleteTaskLocStor(e.target.parentElement.getAttribute('data-id'));
    }

    // Task El

    if(e.target.classList.contains('task')) {
        // Toggle Done Class
        e.target.classList.toggle('task-done');

        // Toggle Completed For The Task
        toggleCompeletedTask(e.target.getAttribute('data-id'));
    }

})

const addTaskToArray = (taskText) => {
    // Task Data
    const task = {
        id: Date.now(),
        title: taskText,
        completed: false,
    };

    // Push Task To Array Of Tasks
    arrayOfTasks.push(task);

    // Add Elemet Task To Page
    addElToPage(arrayOfTasks);

    // Add Task To Local Storage
    addDataToLocStor(arrayOfTasks);

}

const addElToPage = (arrayOfTasks) => {
    // Empty Tasks Div
    taskDiv.innerHTML = "";

    // Loop On Array Of Tasks

    arrayOfTasks.forEach((task) => {
        // Create Div Task
        let div = document.createElement('div');
        div.className = "task";
        // check If Task Is Done
        if(task.completed === true){
            div.classList.add("task-done");
        }
        div.setAttribute('data-id', task.id);
        // Title Task
        let p = document.createElement('p');
        p.appendChild(document.createTextNode(task.title));
        // Delete Task
        let span = document.createElement('span');
        span.className = "del";
        span.appendChild(document.createTextNode('X'));
        // Append Content To Div Task
        div.appendChild(p);
        div.appendChild(span);
        // Add Task Div To Tasks Container
        taskDiv.appendChild(div);

    });

}


const addDataToLocStor = (arrayOfTasks) => {
    window.localStorage.setItem('tasks', JSON.stringify(arrayOfTasks));
}

const getDataFromLocStor = () => {
    let data = window.localStorage.getItem('tasks');
    if(data){
        let tasks = JSON.parse(data);
        addElToPage(tasks);
    }
}

// Trigger Get Data From Local Storage
getDataFromLocStor();

function deleteTaskLocStor(taskId) {
    arrayOfTasks = arrayOfTasks.filter((task) => task.id != taskId);
    addDataToLocStor(arrayOfTasks);
}

function toggleCompeletedTask(taskId) {
    for(let i = 0; i < arrayOfTasks.length; i++) {
        if(arrayOfTasks[i].id == taskId) {
            arrayOfTasks[i].completed == false ? (arrayOfTasks[i].completed = true) : (arrayOfTasks[i].completed = false)
        }
    }
    addDataToLocStor(arrayOfTasks);
}