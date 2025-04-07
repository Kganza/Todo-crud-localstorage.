const form = document.getElementById('task-form');
const taskList = document.getElementById('task-list');
const clearBtn = document.getElementById('clear-tasks');

let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

function renderTasks() {
  taskList.innerHTML = '';
  tasks.forEach(task => {
    const card = document.createElement('div');
    card.className = 'task-card';
    card.style.background = task.bgColor;
    card.innerHTML = `
      <div class="task-actions">
        <button onclick="editTask('${task.id}')">Edit</button>
        <button onclick="deleteTask('${task.id}')">Delete</button>
      </div>
      <h3>${task.name}</h3>
      <small><strong>Type:</strong> ${task.type}</small>
      <p>${task.desc}</p>
    `;
    taskList.appendChild(card);
  });
}

function saveToLocalStorage() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

form.addEventListener('submit', function (e) {
  e.preventDefault();

  const idInput = document.getElementById('task-id');
  const name = document.getElementById('task-name').value;
  const type = document.getElementById('task-type').value;
  const desc = document.getElementById('task-desc').value;
  const bgColor = document.getElementById('task-bg').value;

  if (idInput.value) {
    
    tasks = tasks.map(task =>
      task.id === idInput.value ? { ...task, name, type, desc, bgColor } : task
    );
    idInput.value = '';
  } else {
  
    const newTask = {
      id: Date.now().toString(),
      name,
      type,
      desc,
      bgColor
    };
    tasks.push(newTask);
  }

  saveToLocalStorage();
  renderTasks();
  form.reset();
});

function editTask(id) {
  const task = tasks.find(t => t.id === id);
  document.getElementById('task-id').value = task.id;
  document.getElementById('task-name').value = task.name;
  document.getElementById('task-type').value = task.type;
  document.getElementById('task-desc').value = task.desc;
  document.getElementById('task-bg').value = task.bgColor;
}

function deleteTask(id) {
  tasks = tasks.filter(task => task.id !== id);
  saveToLocalStorage();
  renderTasks();
}

clearBtn.addEventListener('click', () => {
  if (confirm("Are you sure you want to delete all tasks?")) {
    tasks = [];
    saveToLocalStorage();
    renderTasks();
  }
});

renderTasks();
