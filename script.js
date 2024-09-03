document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('taskInput');
    const dueDate = document.getElementById('dueDate');
    const priority = document.getElementById('priority');
    const addTaskBtn = document.getElementById('addTaskBtn');
    const tasksList = document.getElementById('tasks');
    const searchInput = document.getElementById('searchInput');
    const priorityFilter = document.getElementById('priorityFilter');

    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    function renderTasks() {
        tasksList.innerHTML = '';
        const filterPriority = priorityFilter.value;
        const filteredTasks = tasks.filter(task =>
            (!filterPriority || task.priority === filterPriority)
        );

        filteredTasks.forEach((task, index) => {
            const li = document.createElement('li');
            li.innerHTML = `
                <span class="${task.completed ? 'complete' : ''}">
                    ${task.text} (Due: ${task.dueDate} | Priority: ${task.priority})
                </span>
                <button class="complete-btn" onclick="completeTask(${index})">Complete</button>
                <button class="delete-btn" onclick="deleteTask(${index})">Delete</button>
            `;
            tasksList.appendChild(li);
        });
    }

    function saveTasks() {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    window.completeTask = function(index) {
        tasks[index].completed = !tasks[index].completed;
        saveTasks();
        renderTasks();
    };

    window.deleteTask = function(index) {
        tasks.splice(index, 1);
        saveTasks();
        renderTasks();
    };

    addTaskBtn.addEventListener('click', () => {
        const taskText = taskInput.value.trim();
        const taskDueDate = dueDate.value;
        const taskPriority = priority.value;
        if (taskText) {
            tasks.push({ text: taskText, dueDate: taskDueDate, priority: taskPriority, completed: false });
            saveTasks();
            taskInput.value = '';
            dueDate.value = '';
            renderTasks();
        }
    });

    searchInput.addEventListener('input', () => {
        const query = searchInput.value.toLowerCase();
        const filteredTasks = tasks.filter(task =>
            task.text.toLowerCase().includes(query)
        );
        tasksList.innerHTML = '';
        filteredTasks.forEach((task, index) => {
            const li = document.createElement('li');
            li.innerHTML = `
                <span class="${task.completed ? 'complete' : ''}">
                    ${task.text} (Due: ${task.dueDate} | Priority: ${task.priority})
                </span>
                <button class="complete-btn" onclick="completeTask(${index})">Complete</button>
                <button class="delete-btn" onclick="deleteTask(${index})">Delete</button>
            `;
            tasksList.appendChild(li);
        });
    });

    priorityFilter.addEventListener('change', renderTasks);

    renderTasks();
});
