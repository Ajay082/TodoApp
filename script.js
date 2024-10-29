document.addEventListener('DOMContentLoaded', loadTasksFromLocalStorage);

document.getElementsByClassName('task_inp')[0].addEventListener('focus', () => {
    document.querySelectorAll('.hidden_items').forEach(item => item.classList.add('show'));
});

document.addEventListener("click", (e) => {
    if (!e.target.closest('.task_ip')) {
        document.querySelectorAll('.hidden_items').forEach(item => item.classList.remove('show'));
    }
});

document.getElementsByClassName('add_task')[0].addEventListener("click", (e) => {
    e.preventDefault();
    const taskTitle = document.getElementsByClassName('task_title')[0].value;
    const taskDesc = document.getElementsByClassName('task_desc')[0].value;

    if (taskTitle && taskDesc) {
        const taskData = { title: taskTitle, desc: taskDesc };
        createTask(taskData);
        saveTaskToLocalStorage(taskData);
        document.getElementsByClassName('task_title')[0].value = '';
        document.getElementsByClassName('task_desc')[0].value = '';
    } else {
        const notify = document.getElementById('notify');
        notify.style.display = 'flex';
        setTimeout(() => {
            notify.style.display = 'none';
        }, 2000);
    }
});

function createTask(taskData) {
    const { title, desc } = taskData;
    const taskContainer = document.getElementsByClassName('task-container')[0];
    const taskElement = document.createElement('div');
    taskElement.classList.add('tasks', 'shadow', 'p-3');
    taskElement.innerHTML = `
        <h3>${title}</h3>
        <p class="desc">${desc}</p>
        <button class="btn d-block ms-auto btn-danger" onclick="deleteTask(event)">
            <i class="fa-solid fa-trash"></i>
        </button>
    `;
    taskContainer.appendChild(taskElement);
}

function saveTaskToLocalStorage(taskData) {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.push(taskData);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasksFromLocalStorage() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(createTask);
}

function deleteTask(e) {
    const taskElement = e.target.closest('.tasks');
    const title = taskElement.querySelector('h3').innerText;
    taskElement.remove();
    deleteTaskFromLocalStorage(title);
}

function deleteTaskFromLocalStorage(taskTitle) {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks = tasks.filter(task => task.title !== taskTitle);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}
