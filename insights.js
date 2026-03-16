const sessionList = document.getElementById("sessionList");
const sessionCountEl = document.getElementById("sessionCount");
const totalMinutesEl = document.getElementById("totalMinutes");
const mostUsedTagEl = document.getElementById("mostUsedTag");
const tagMinutesList = document.getElementById("tagMinutesList");
const tagChartEl = document.getElementById("tagChart");
const sessions = JSON.parse(localStorage.getItem("auroraSessions")) || [];

function renderInsights() {
    sessionList.innerHTML = "";
    tagMinutesList.innerHTML = "";

    // Session history
    sessions.forEach(session => {
        const li = document.createElement("li");

        const minutes = session.duration / 60;
        const time = new Date(session.completedAt).toLocaleTimeString();
        const tag = session.tag || "untitled";

        li.textContent = `${session.type.toUpperCase()} (${tag}) - ${minutes} min - completed at ${time}`;
        sessionList.appendChild(li);
    });

    // Summary stats
    sessionCountEl.textContent = sessions.length;

    const totalMinutes = sessions.reduce((sum, session) => {
        return sum + (session.duration / 60);
    }, 0);

    totalMinutesEl.textContent = totalMinutes;

    // Most used tag
    const tagCounts = {};

    sessions.forEach(session => {
        const tag = session.tag || "untitled";
        tagCounts[tag] = (tagCounts[tag] || 0) + 1;
    });

    let mostUsedTag = "None yet";
    let highestCount = 0;

    for (const tag in tagCounts) {
        if (tagCounts[tag] > highestCount) {
            highestCount = tagCounts[tag];
            mostUsedTag = tag;
        }
    }

    mostUsedTagEl.textContent = mostUsedTag;

    // Minutes per tag
    const tagMinutes = {};

    sessions.forEach(session => {
        const tag = session.tag || "untitled";
        const minutes = session.duration / 60;
        tagMinutes[tag] = (tagMinutes[tag] || 0) + minutes;
    });

    for (const tag in tagMinutes) {
        const li = document.createElement("li");
        li.textContent = `${tag}: ${tagMinutes[tag]} min`;
        tagMinutesList.appendChild(li);
    }
const tagLabels = Object.keys(tagMinutes);
const tagValues = Object.values(tagMinutes);

new Chart(tagChartEl, {
    type: "bar",
    data: {
        labels: tagLabels,
        datasets: [{
            label: "Minutes",
            data: tagValues
        }]
    },
    options: {
        responsive: true,
        plugins: {
            legend: {
                display: false
            }
        }
    }
});
}

renderInsights();