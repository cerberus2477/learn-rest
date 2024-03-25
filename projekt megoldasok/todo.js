const todoForm = document.getElementById('todoForm');
const todoList = document.getElementById('todoList');

// Az összes teendő betöltése
function loadTodos() {
    fetch('/todos')
        .then(response => response.json())
        .then(todos => {
            todoList.innerHTML = '';
            todos.forEach(todo => {
                const li = document.createElement('li');
                li.innerHTML = `<b>${todo.title}</b><br>${todo.description}<br>Határidő: ${todo.due_date}
                    <button onclick="editTodo(${todo.id})">Szerkesztés</button>
                    <button onclick="deleteTodo(${todo.id})">Törlés</button>`;
                todoList.appendChild(li);
            });
        })
        .catch(error => console.error('Hiba a teendők betöltésekor:', error));
}

// Új teendő létrehozása
todoForm.addEventListener('submit', event => {
    event.preventDefault();
    const formData = new FormData(todoForm);
    fetch('/todos', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            title: formData.get('title'),
            description: formData.get('description'),
            due_date: formData.get('dueDate')
        })
    })
        .then(response => response.json())
        .then(() => {
            loadTodos();
            todoForm.reset();
        })
        .catch(error => console.error('Hiba az új teendő létrehozásakor:', error));
});

// Teendő szerkesztése
function editTodo(id) {
    // Implementáció hiányzik
    console.log('Teendő szerkesztése id:', id);
}

// Teendő törlése
function deleteTodo(id) {
    fetch(`/todos/${id}`, {
        method: 'DELETE'
    })
        .then(() => {
            loadTodos();
        })
        .catch(error => console.error('Hiba a teendő törlésekor:', error));
}

// Teendők betöltése az oldal betöltésekor
window.addEventListener('load', () => {
    loadTodos();
});