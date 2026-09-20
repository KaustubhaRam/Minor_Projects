document.addEventListener('DOMContentLoaded', () => {
    const addTaskBtn = document.getElementById('addTaskBtn');
    const taskInput = document.getElementById('taskInput');
    const taskList = document.getElementById('taskList');

    addTaskBtn.addEventListener('click', () => {
        const taskText = taskInput.value.trim();

        if (taskText) {
            const li = document.createElement('li');
            li.innerHTML = `
                <input type="checkbox" class="checkbox">
                <span class="taskText">${taskText}</span>
                <button class="deleteBtn">Delete</button>
            `;
            taskList.appendChild(li);
            taskInput.value = '';
        }
    });

    taskList.addEventListener('click', (e) => {
        if (e.target.classList.contains('deleteBtn')) {
            e.target.parentElement.remove();
        } else if (e.target.classList.contains('checkbox')) {
            e.target.parentElement.classList.toggle('completed');
        }
    });
});
