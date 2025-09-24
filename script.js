const stopwatchArea = document.getElementById("stopwatch-area");

const arr = [];
let second = localStorage.getItem("timer") || 0;
let clearIntervalId;
stopwatchArea.textContent = second;

console.log("clear: ", clearIntervalId);

start.addEventListener("click", () => {
	if (!clearIntervalId) {
		clearIntervalId = setInterval(() => {
			console.log(second);
			stopwatchArea.textContent = second;
			second++;
		}, 1000);
		console.log("clear: ", clearIntervalId);
	}
});

stop1.addEventListener("click", () => {
	clearInterval(clearIntervalId);
	clearIntervalId = undefined;
});

reset.addEventListener("click", () => {
	second = 1;
	stopwatchArea.textContent = 0;
	log.textContent = "";
	arr.length = 0;
	localStorage.removeItem("timer");
});

save.addEventListener("click", () => {
	localStorage.setItem("timer", stopwatchArea.textContent);
});

track.addEventListener("click", () => {
	logBtn();
});

function logBtn() {
	console.log("Save btn");
	arr.push(
		`<div>${arr.length + 1}. <span class="main-element">${
			stopwatchArea.textContent
		} секунд</span><small class="date-element">${Date().toLocaleString()}</small></div>`
	);
	let str = "";
	arr.forEach((el) => {
		str += `<div class="element">${el}</div>`;
	});
	log.innerHTML = str;
	console.log("arr: ", arr);
}
