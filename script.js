let focusDuration = 25 * 60;
let breakDuration = 5 * 60;

let mode = "focus";
let timeLeft = focusDuration;
let timerInterval = null;
let sessions = JSON.parse(localStorage.getItem("auroraSessions")) || [];

const timerDisplay = document.getElementById("timer");
const modeLabel = document.getElementById("modeLabel");
const startBtn = document.getElementById("startBtn");
const pauseBtn = document.getElementById("pauseBtn");
const resetBtn = document.getElementById("resetBtn");
const focusInput = document.getElementById("focusInput");
const breakInput = document.getElementById("breakInput");
const applyBtn = document.getElementById("applyBtn");
const tagInput = document.getElementById("tagInput");

// Load saved durations
const savedDurations = JSON.parse(localStorage.getItem("auroraDurations"));

if (savedDurations) {
    focusDuration = savedDurations.focus;
    breakDuration = savedDurations.break;

    focusInput.value = focusDuration / 60;
    breakInput.value = breakDuration / 60;

    timeLeft = focusDuration;
}

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

function saveSessions() {
    localStorage.setItem("auroraSessions", JSON.stringify(sessions));
}

function saveDurations() {
    const durationData = {
        focus: focusDuration,
        break: breakDuration
    };

    localStorage.setItem("auroraDurations", JSON.stringify(durationData));
}

function logSession() {
    const session = {
        type: mode,
        duration: mode === "focus" ? focusDuration : breakDuration,
        tag: tagInput.value.trim().toLowerCase() || "untitled",
        completedAt: new Date().toISOString()
    };

    sessions.push(session);
    saveSessions();

    console.log("Session logged:", session);
    console.log("All sessions:", sessions);
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

            if (mode === "focus") {
                logSession();
            }

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
        saveDurations();

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