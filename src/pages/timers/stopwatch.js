import { getMilliseconds } from "./../../utils.js";
import { TIMER_RANGE } from "./../../constants.js";

const stopwatchArea = document.getElementById("stopwatch-area");
const start = document.getElementById("start");
const stop = document.getElementById("stop");
const reset = document.getElementById("reset");
const save = document.getElementById("save");
const track = document.getElementById("track");
const dialog = document.getElementById("dialog");

let arr = [];
let millisecond = +(localStorage.getItem("stopwatch-time") || 0);
let clearIntervalId = null;
let isRunning = false;

/**
 * Format time as MM:SS.mm
 */
function formatTime(ms) {
	const totalSeconds = Math.floor(ms / 1000);
	const minutes = Math.floor(totalSeconds / 60);
	const seconds = totalSeconds % 60;
	const millis = getMilliseconds(ms);

	return {
		minutes: String(minutes).padStart(2, "0"),
		seconds: String(seconds).padStart(2, "0"),
		millis: millis,
	};
}

const setStopWatchArea = () => {
	const { minutes, seconds, millis } = formatTime(millisecond);
	stopwatchArea.innerHTML = `
        <div class="minutes">${minutes}</div>
        <span class="time-separator">:</span>
        <div class="seconds">${seconds}</div>
        <span class="milliseconds">.</span>
        <div class="milliseconds">${millis}</div>
    `;
};

setStopWatchArea();

function onStart() {
	if (!isRunning) {
		isRunning = true;
		stop.textContent = "Pause";
		clearIntervalId = setInterval(() => {
			millisecond += TIMER_RANGE;
			setStopWatchArea();
		}, TIMER_RANGE);
	}
}

function onStop() {
	if (isRunning) {
		clearInterval(clearIntervalId);
		clearIntervalId = null;
		isRunning = false;
		stop.textContent = "Stop";
	} else if (stop.textContent === "Stop") {
		// Second click on stop resets to paused state
		millisecond = 0;
		setStopWatchArea();
		stop.textContent = "Pause";
	}
}

function onReset() {
	clearInterval(clearIntervalId);
	clearIntervalId = null;
	isRunning = false;
	millisecond = 0;
	setStopWatchArea();
	stop.textContent = "Pause";
	document.getElementById("log").textContent = "";
	arr.length = 0;
	localStorage.removeItem("stopwatch-time");
}

function onSave() {
	localStorage.setItem("stopwatch-time", millisecond);
	showSaveDialog();
}

function showSaveDialog() {
	dialog.setAttribute("open", true);
	setTimeout(() => {
		dialog.removeAttribute("open");
	}, 3000);
}

function onTrack() {
	const { minutes, seconds, millis } = formatTime(millisecond);
	const timeString = `${minutes}:${seconds}.${millis}`;
	const currentTime = new Date().toLocaleString();

	arr.unshift(
		`<div class='log_data'>
			<span class="main-element">${timeString}</span>
			<div class="date-element">
				<svg width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path d="M12 7V12L14.5 10.5M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
				</svg>
				<span>${currentTime}</span>
			</div>
		</div>`
	);

	let str = "";
	arr.forEach((el) => {
		str += el;
	});
	document.getElementById("log").innerHTML = str;
}

start.addEventListener("click", () => {
	onStart();
});

stop.addEventListener("click", () => {
	onStop();
});

reset.addEventListener("click", () => {
	onReset();
});

save.addEventListener("click", () => {
	onSave();
});

track.addEventListener("click", () => {
	onTrack();
});
