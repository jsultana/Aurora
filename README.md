Aurora

A focused productivity timer with session tagging and insights analytics.

Overview

Aurora is a browser-based productivity timer inspired by structured focus methods such as the Pomodoro technique. It enables users to run timed focus and break sessions, label their work using custom tags, and analyse how their time is distributed.

The project was developed as an independent front-end exercise to explore state management, client-side persistence, and basic data visualisation using JavaScript.

Rather than functioning solely as a timer, Aurora encourages reflection. By tagging sessions (e.g. “fyp”, “revision”, “reading”), users can gain insight into where their attention is actually being spent.

⸻

Features

Timer Interface
	•	Customisable focus and break durations
	•	Start, pause, and reset functionality
	•	Automatic switching between focus and break modes
	•	Focus sessions automatically logged upon completion

Session Tagging
	•	Custom text-based session tags
	•	Case-normalised tagging (e.g. “FYP” and “fyp” are treated the same)
	•	All sessions stored using browser localStorage

Insights Dashboard
	•	Total focus sessions completed
	•	Total focus minutes accumulated
	•	Most frequently used tag
	•	Minutes spent per tag
	•	Bar chart visualisation using Chart.js

⸻

Technical Implementation

Aurora is built using:
	•	HTML5
	•	CSS3
	•	Vanilla JavaScript
	•	localStorage for persistent client-side storage
	•	Chart.js for data visualisation

The project is structured across two pages:
	•	index.html — Timer interface
	•	insights.html — Analytics dashboard

Logic separation:
	•	script.js — Timer functionality
	•	insights.js — Data aggregation and visualisation

Session data is stored as structured objects in localStorage, allowing for flexible aggregation and future extension.

⸻

Design Considerations
	•	Separation of timer logic and analytics logic improves maintainability.
	•	Tags are normalised to prevent duplication through inconsistent casing.
	•	Data visualisation was included to make usage patterns immediately interpretable.
	•	No backend is required, keeping the project lightweight and portable.

⸻

Future Improvements
	•	Time filtering (weekly / monthly views)
	•	Export functionality (CSV / JSON)
	•	Dark mode
	•	Accessibility refinements
	•	Session editing and deletion

⸻

Running the Project
	1.	Clone the repository
	2.	Open index.html in a browser
	3.	No installation or build tools required

⸻

Project Reflection

Aurora evolved from a simple timer into a small behavioural insight tool. The addition of tagging and analytics introduced aggregation logic, data persistence, and visualisation concerns that required careful separation of responsibilities within the codebase.

The project demonstrates structured front-end thinking, modular logic separation, and client-side data handling.