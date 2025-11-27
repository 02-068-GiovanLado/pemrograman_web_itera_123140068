// Data penyimpanan tugas
let tasks = [];

// Fungsi untuk menyimpan ke localStorage
function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Fungsi untuk mengambil dari localStorage
function loadTasks() {
    const saved = localStorage.getItem('tasks');
    tasks = saved ? JSON.parse(saved) : [];
}

// Inisialisasi aplikasi
document.addEventListener('DOMContentLoaded', () => {
    loadTasks();
    renderTasks();
    attachEventListeners();
});

// Attach Event Listeners
function attachEventListeners() {
    const taskForm = document.getElementById('taskForm');
    const searchInput = document.getElementById('searchInput');
    const filterBtns = document.querySelectorAll('.filter-btn');

    taskForm.addEventListener('submit', handleAddTask);
    searchInput.addEventListener('input', filterTasks);
    filterBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            filterBtns.forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');
            filterTasks();
        });
    });
}

// Validasi Form
function validateForm(taskName, taskCourse, taskDeadline) {
    const nameError = document.getElementById('nameError');
    const courseError = document.getElementById('courseError');
    const deadlineError = document.getElementById('deadlineError');

    // Reset error messages
    nameError.classList.remove('show');
    courseError.classList.remove('show');
    deadlineError.classList.remove('show');

    let isValid = true;

    // Validasi nama tugas
    if (!taskName.trim()) {
        nameError.textContent = 'Nama tugas tidak boleh kosong';
        nameError.classList.add('show');
        isValid = false;
    } else if (taskName.trim().length < 3) {
        nameError.textContent = 'Nama tugas minimal 3 karakter';
        nameError.classList.add('show');
        isValid = false;
    }

    // Validasi mata kuliah
    if (!taskCourse.trim()) {
        courseError.textContent = 'Mata kuliah tidak boleh kosong';
        courseError.classList.add('show');
        isValid = false;
    } else if (taskCourse.trim().length < 3) {
        courseError.textContent = 'Mata kuliah minimal 3 karakter';
        courseError.classList.add('show');
        isValid = false;
    }

    // Validasi deadline
    if (!taskDeadline) {
        deadlineError.textContent = 'Deadline harus dipilih';
        deadlineError.classList.add('show');
        isValid = false;
    } else {
        const selectedDate = new Date(taskDeadline);
        const now = new Date();
        
        if (selectedDate <= now) {
            deadlineError.textContent = 'Deadline harus di masa depan';
            deadlineError.classList.add('show');
            isValid = false;
        }
    }

    return isValid;
}

// Tambah Tugas
function handleAddTask(e) {
    e.preventDefault();

    const taskName = document.getElementById('taskName').value;
    const taskCourse = document.getElementById('taskCourse').value;
    const taskDeadline = document.getElementById('taskDeadline').value;

    if (!validateForm(taskName, taskCourse, taskDeadline)) {
        return;
    }

    const newTask = {
        id: Date.now(),
        name: taskName.trim(),
        course: taskCourse.trim(),
        deadline: taskDeadline,
        completed: false,
        createdAt: new Date().toISOString()
    };

    tasks.push(newTask);
    saveTasks();
    renderTasks();

    // Reset form
    e.target.reset();
    document.getElementById('nameError').classList.remove('show');
    document.getElementById('courseError').classList.remove('show');
    document.getElementById('deadlineError').classList.remove('show');
}

// Toggle tugas selesai
function toggleTaskComplete(id) {
    const task = tasks.find(t => t.id === id);
    if (task) {
        task.completed = !task.completed;
        saveTasks();
        renderTasks();
    }
}

// Hapus tugas
function deleteTask(id) {
    if (confirm('Apakah Anda yakin ingin menghapus tugas ini?')) {
        tasks = tasks.filter(t => t.id !== id);
        saveTasks();
        renderTasks();
    }
}

// Format tanggal deadline
function formatDeadline(deadline) {
    const date = new Date(deadline);
    const now = new Date();
    const diff = date - now;
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

    if (days > 0) {
        return `${days} hari ${hours} jam lagi`;
    } else if (days === 0) {
        return `${hours} jam lagi`;
    } else {
        return 'Sudah melewati batas waktu';
    }
}

// Format tanggal display
function formatDate(deadline) {
    return new Date(deadline).toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
}

// Filter tugas
function filterTasks() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    const activeFilter = document.querySelector('.filter-btn.active').dataset.filter;

    let filtered = tasks.filter(task => {
        const matchSearch = 
            task.name.toLowerCase().includes(searchTerm) ||
            task.course.toLowerCase().includes(searchTerm);

        const matchFilter = 
            activeFilter === 'all' ||
            (activeFilter === 'completed' && task.completed) ||
            (activeFilter === 'pending' && !task.completed);

        return matchSearch && matchFilter;
    });

    renderFilteredTasks(filtered);
}

// Render tugas yang difilter
function renderFilteredTasks(filteredTasks) {
    const tasksList = document.getElementById('tasksList');

    if (filteredTasks.length === 0) {
        tasksList.innerHTML = '<p class="empty-message">Tidak ada tugas yang sesuai. 🔍</p>';
        return;
    }

    tasksList.innerHTML = filteredTasks.map(task => createTaskCard(task)).join('');
}

// Buat HTML task card
function createTaskCard(task) {
    return `
        <div class="task-card ${task.completed ? 'completed' : ''}">
            <input 
                type="checkbox" 
                class="task-checkbox" 
                ${task.completed ? 'checked' : ''} 
                onchange="toggleTaskComplete(${task.id})"
            >
            <div class="task-content">
                <h3 class="task-title">${escapeHtml(task.name)}</h3>
                <div class="task-meta">
                    <div class="meta-item">
                        📖 <strong>${escapeHtml(task.course)}</strong>
                    </div>
                    <div class="meta-item">
                        📅 ${formatDate(task.deadline)}
                    </div>
                    <div class="meta-item">
                        ⏱️ ${formatDeadline(task.deadline)}
                    </div>
                    <span class="task-status ${task.completed ? 'status-completed' : 'status-pending'}">
                        ${task.completed ? '✓ Selesai' : '⏳ Belum Selesai'}
                    </span>
                </div>
            </div>
            <div class="task-actions">
                <button class="btn-small btn-delete" onclick="deleteTask(${task.id})">
                    🗑️ Hapus
                </button>
            </div>
        </div>
    `;
}

// Escape HTML untuk keamanan
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Update statistik
function updateStats() {
    const totalTasks = tasks.length;
    const pendingTasks = tasks.filter(t => !t.completed).length;
    const completedTasks = tasks.filter(t => t.completed).length;

    document.getElementById('totalTasks').textContent = totalTasks;
    document.getElementById('pendingTasks').textContent = pendingTasks;
    document.getElementById('completedTasks').textContent = completedTasks;
}

// Render semua tugas
function renderTasks() {
    updateStats();
    filterTasks();
}