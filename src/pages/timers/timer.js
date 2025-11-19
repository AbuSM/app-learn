import { getMilliseconds } from "./../../utils.js";
import { TIMER_RANGE } from "./../../constants.js";

const start = document.getElementById("timer-start");
const stop = document.getElementById("timer-stop");
const plusFive = document.getElementById("timer-plus-five");
const minusFive = document.getElementById("timer-minus-five");
const timerArea = document.getElementById("timer-area");
const initialNumber = document.getElementById("initial-number");
const audio = document.getElementsByTagName("audio")[0];

let millisecondsTimer = 0;
let timerClearIntervalId = null;
let isTimerRunning = false;

function setTimerArea(val) {
	const totalSeconds = Math.floor(val / 1000);
	const minutes = Math.floor(totalSeconds / 60);
	const seconds = totalSeconds % 60;
	const millis = getMilliseconds(val);

	timerArea.innerHTML = `
        <div class="minutes">${String(minutes).padStart(2, "0")}</div>
        <span class="time-separator">:</span>
        <div class="seconds">${String(seconds).padStart(2, "0")}</div>
        <span class="milliseconds">.</span>
        <div class="milliseconds">${millis}</div>
    `;
}

// Initialize display
setTimerArea(0);

initialNumber.addEventListener("input", function (event) {
	const val = event.target.value;
	const m = val * 1000;
	millisecondsTimer = m;
	setTimerArea(m);
});

start.addEventListener("click", () => {
	// Only start if not already running and timer is set
	if (!isTimerRunning && millisecondsTimer > 0) {
		isTimerRunning = true;
		start.disabled = true;
		stop.textContent = "Pause";
		stop.disabled = false;
		initialNumber.disabled = true;
		plusFive.disabled = true;
		minusFive.disabled = true;

		timerClearIntervalId = setInterval(() => {
			millisecondsTimer -= TIMER_RANGE;

			if (millisecondsTimer <= 0) {
				millisecondsTimer = 0;
				clearInterval(timerClearIntervalId);
				timerClearIntervalId = null;
				isTimerRunning = false;
				setTimerArea(millisecondsTimer);
				audio.play();
				start.disabled = false;
				stop.textContent = "Stop";
				stop.disabled = false;
				initialNumber.disabled = false;
				plusFive.disabled = false;
				minusFive.disabled = false;
			} else {
				setTimerArea(millisecondsTimer);
			}
		}, TIMER_RANGE);
	}
});

stop.addEventListener("click", () => {
	if (isTimerRunning) {
		// Pause the timer
		clearInterval(timerClearIntervalId);
		timerClearIntervalId = null;
		isTimerRunning = false;
		start.disabled = false;
		start.textContent = "Resume";
		stop.textContent = "Stop";
	} else if (stop.textContent === "Stop") {
		// Stop and reset timer
		millisecondsTimer = 0;
		setTimerArea(millisecondsTimer);
		start.textContent = "Start";
		start.disabled = false;
		stop.disabled = true;
		initialNumber.disabled = false;
		plusFive.disabled = false;
		minusFive.disabled = false;
		initialNumber.value = "";
	}
});

plusFive.addEventListener("click", () => {
	if (!isTimerRunning) {
		millisecondsTimer = Number(millisecondsTimer) + 5000;
		setTimerArea(millisecondsTimer);
	}
});

minusFive.addEventListener("click", () => {
	if (!isTimerRunning && millisecondsTimer > 0) {
		millisecondsTimer = Math.max(0, Number(millisecondsTimer) - 5000);
		setTimerArea(millisecondsTimer);
	}
});
