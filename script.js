let focusDuration = 25 * 60;
let breakDuration = 5 * 60;

let mode = "focus";
let timeLeft = focusDuration;
let timerInterval = null;
let sessions = [];

const timerDisplay = document.getElementById("timer");
const modeLabel = document.getElementById("modeLabel");
const startBtn = document.getElementById("startBtn");
const pauseBtn = document.getElementById("pauseBtn");
const resetBtn = document.getElementById("resetBtn");
const focusInput = document.getElementById("focusInput");
const breakInput = document.getElementById("breakInput");
const applyBtn = document.getElementById("applyBtn");
const sessionList = document.getElementById("sessionList");
const sessionCountEl = document.getElementById("sessionCount");
const totalMinutesEl = document.getElementById("totalMinutes");

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

function logSession() {
    const session = {
        type: mode,
        duration: mode === "focus" ? focusDuration : breakDuration,
        completedAt: new Date().toISOString()
    };

    sessions.push(session);
    renderSessions();

    console.log("Session logged:", session);
    console.log("All sessions:", sessions);
}

function saveSessions() {
    localStorage.setItem("auroraSessions", JSON.stringify(sessions));
}

function renderSessions() {
    sessionList.innerHTML = "";

    sessions.forEach(session => {
        const li = document.createElement("li");

        const minutes = session.duration / 60;
        const time = new Date(session.completedAt).toLocaleTimeString();

        li.textContent = `${session.type.toUpperCase()} - ${minutes} min - completed at ${time}`;

        sessionList.appendChild(li);
    });

    // Update summary stats
    sessionCountEl.textContent = sessions.length;

    const totalMinutes = sessions.reduce((sum, session) => {
        return sum + (session.duration / 60);
    }, 0);

    totalMinutesEl.textContent = totalMinutes;
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
renderSessions();