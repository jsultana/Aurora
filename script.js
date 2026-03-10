let focusDuration = 25 * 60;
let breakDuration = 5 * 60;

let mode = "focus";
let timeLeft = focusDuration;
let timerInterval = null;

const timerDisplay = document.getElementById("timer");
const modeLabel = document.getElementById("modeLabel");
const startBtn = document.getElementById("startBtn");
const pauseBtn = document.getElementById("pauseBtn");
const resetBtn = document.getElementById("resetBtn");
const focusInput = document.getElementById("focusInput");
const breakInput = document.getElementById("breakInput");
const applyBtn = document.getElementById("applyBtn");

function updateDisplay() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    timerDisplay.textContent =
        `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
}

function switchMode() {
    if (mode === "focus") {
        mode = "break";
        timeLeft = breakDuration;
        modeLabel.textContent = "Break";
    } else {
        mode = "focus";
        timeLeft = focusDuration;
        modeLabel.textContent = "Focus";
    }
    updateDisplay();
}

function startTimer() {
    if (timerInterval !== null) return;

    startBtn.disabled = true;

    timerInterval = setInterval(() => {
        if (timeLeft > 0) {
            timeLeft--;
            updateDisplay();
        } else {
            clearInterval(timerInterval);
            timerInterval = null;
            startBtn.disabled = false;
            switchMode();
        }
    }, 1000);
}

function pauseTimer() {
    clearInterval(timerInterval);
    timerInterval = null;
    startBtn.disabled = false;
}

function resetTimer() {
    pauseTimer();
    mode = "focus";
    modeLabel.textContent = "Focus";
    timeLeft = focusDuration;
    updateDisplay();
}

function applySettings() {
    const newFocus = parseInt(focusInput.value) * 60;
    const newBreak = parseInt(breakInput.value) * 60;

    if (newFocus > 0 && newBreak > 0) {
        focusDuration = newFocus;
        breakDuration = newBreak;

        // Reset to focus mode after applying
        mode = "focus";
        modeLabel.textContent = "Focus";
        timeLeft = focusDuration;

        pauseTimer();
        updateDisplay();
    }
}

startBtn.addEventListener("click", startTimer);
pauseBtn.addEventListener("click", pauseTimer);
resetBtn.addEventListener("click", resetTimer);
applyBtn.addEventListener("click", applySettings);

updateDisplay();