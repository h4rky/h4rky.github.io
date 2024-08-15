document.addEventListener('DOMContentLoaded', function() {
    const checklist = document.getElementById('checklist');
    const newTaskInput = document.getElementById('new-task-input');

    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    function renderChecklist() {
        checklist.innerHTML = '';
        tasks.forEach((task, index) => {
            const li = document.createElement('li');
            li.classList.toggle('completed', task.completed);
            li.innerHTML = `
                <input type="checkbox" ${task.completed ? 'checked' : ''} data-index="${index}">
                <span contenteditable="true">${task.text}</span>
            `;
            checklist.appendChild(li);
        });

        newTaskInput.disabled = tasks.length > 0 && !tasks[tasks.length - 1].completed;
        if (!newTaskInput.disabled) {
            newTaskInput.focus();
        }
    }

    function addTask(taskText) {
        tasks.push({ text: taskText, completed: false });
        localStorage.setItem('tasks', JSON.stringify(tasks));
        renderChecklist();
    }

    function toggleTaskCompletion(index) {
        tasks[index].completed = !tasks[index].completed;
        localStorage.setItem('tasks', JSON.stringify(tasks));
        renderChecklist();
    }

    function editTask(index, newText) {
        tasks[index].text = newText;
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    checklist.addEventListener('change', function(e) {
        if (e.target.tagName === 'INPUT' && e.target.type === 'checkbox') {
            const index = e.target.getAttribute('data-index');
            toggleTaskCompletion(index);
        }
    });

    checklist.addEventListener('input', function(e) {
        if (e.target.tagName === 'SPAN') {
            const index = e.target.previousElementSibling.getAttribute('data-index');
            editTask(index, e.target.textContent);
        }
    });

    newTaskInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            const taskText = newTaskInput.value.trim();
            if (taskText) {
                addTask(taskText);
                newTaskInput.value = '';
            }
        }
    });

    renderChecklist();
});
