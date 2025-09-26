const stopwatchArea = document.getElementById("stopwatch-area");
const dialog = document.getElementById("dialog");

let arr = [];
let millisecond = +(localStorage.getItem("timer") || 0);
let clearIntervalId;
const timerRange = 45;

const setStopWatchArea = () => {
	const getMilliseconds = () => {
		let answer = millisecond - Math.floor(millisecond / 1000) * 1000;

		if (answer >= 100) {
			return Math.floor(answer / 10);
		}
		if (answer < 10) {
			return "0" + String(answer);
		}
		return answer;
	};
	stopwatchArea.innerHTML = `
        <div class="seconds">${Math.floor(millisecond / 1000)}</div>
        <span class="milliseconds">.</span>
        <div class="milliseconds">${getMilliseconds()}</div>
    `;
};

// console.log("clear: ", clearIntervalId);
setStopWatchArea(millisecond);

start.addEventListener("click", () => {
	if (!clearIntervalId) {
		millisecond += timerRange;
		clearIntervalId = setInterval(() => {
			setStopWatchArea();
			millisecond += timerRange;
		}, timerRange);
		console.log("clear: ", clearIntervalId);
	}
});

stop1.addEventListener("click", () => {
	clearInterval(clearIntervalId);
	clearIntervalId = undefined;
});

reset.addEventListener("click", () => {
	millisecond = 0;
	setStopWatchArea();
	log.textContent = "";
	arr.length = 0;
	localStorage.removeItem("timer");
});

save.addEventListener("click", () => {
	localStorage.setItem("timer", millisecond);
	dialog.setAttribute("open", true);
	setTimeout(() => {
		dialog.removeAttribute("open");
	}, 3000);
});

track.addEventListener("click", () => {
	logBtn();
});

function logBtn() {
	// console.log("Save btn");
	const seconds = stopwatchArea.textContent.split("\n")[1].trim();
	const milliseconds = stopwatchArea.textContent.split("\n")[3].trim();
	const time = Date().split(" ");

	arr.push(
		`<div class='log_data'>
            <span class="main-element">${
				seconds + "." + milliseconds
			} секунд</span>
            <div class="date-element">
                <svg width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 7V12L14.5 10.5M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                ${time[1] + " " + time[2] + " " + time[3] + " " + time[4]}
            </div>
        </div>`
	);
	const arr2 = arr.toReversed();

	let str = "";
	arr2.forEach((el) => {
		str += el;
	});
	log.innerHTML = str;
	// console.log("arr: ", arr);
}
