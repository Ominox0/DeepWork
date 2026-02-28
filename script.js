// State Variables
let timeLeft = 1500; // Default 25 minutes
let timerId = null;
let isRunning = false;

// DOM Elements
const timerDisplay = document.getElementById('timer');
const startBtn = document.getElementById('start-btn');
const resetBtn = document.getElementById('reset-btn');
const modeBtns = document.querySelectorAll('.mode-btn');
const taskInput = document.getElementById('task-input');
const addTaskBtn = document.getElementById('add-task-btn');
const taskList = document.getElementById('task-list');

// --- Timer Logic ---

function updateDisplay() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    const formattedTime = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    timerDisplay.textContent = formattedTime;
    document.title = `${formattedTime} - DeepWork`;
}

function startTimer() {
    if (isRunning) {
        clearInterval(timerId);
        startBtn.textContent = 'Resume Session';
        startBtn.classList.remove('active');
        isRunning = false;
    } else {
        isRunning = true;
        startBtn.textContent = 'Pause Session';
        startBtn.classList.add('active');
        timerId = setInterval(() => {
            timeLeft--;
            updateDisplay();
            if (timeLeft === 0) {
                clearInterval(timerId);
                alert('Session complete! Time for a break.');
                resetTimer();
            }
        }, 1000);
    }
}

function resetTimer() {
    clearInterval(timerId);
    isRunning = false;
    const activeBtn = document.querySelector('.mode-btn.active');
    timeLeft = parseInt(activeBtn.dataset.time);
    startBtn.textContent = 'Start Session';
    updateDisplay();
}

// Mode Selection
modeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        modeBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        timeLeft = parseInt(btn.dataset.time);
        resetTimer();
    });
});

startBtn.addEventListener('click', startTimer);
resetBtn.addEventListener('click', resetTimer);

// --- Task List Logic ---

function addTask() {
    const text = taskInput.value.trim();
    if (text) {
        const li = document.createElement('li');
        li.innerHTML = `
            <input type="checkbox">
            <span>${text}</span>
        `;
        taskList.appendChild(li);
        taskInput.value = '';
    }
}

addTaskBtn.addEventListener('click', addTask);
taskInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') addTask();
});

// Initialize display
updateDisplay();
