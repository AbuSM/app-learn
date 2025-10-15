import { getMilliseconds } from "./../../utils.js";
import { TIMER_RANGE } from "./../../constants.js";

const start = document.getElementById("timer-start");
const stop = document.getElementById("timer-stop");
const plusFive = document.getElementById("timer-plus-five");
const minusFive = document.getElementById("timer-minus-five");
const timerArea = document.getElementById("timer-area");
const initialNumber = document.getElementById("initial-number");
const audio = document.getElementsByTagName("audio")[0];

let millisecondsTimer = getMilliseconds(0);
let timerClearIntervalId;

function setTimerArea(val) {
    timerArea.innerHTML = `
        <div class="seconds">${Math.floor(val / 1000)}</div>
        <span class="milliseconds">.</span>
        <div class="milliseconds">${getMilliseconds(val)}</div>
    `;
}

initialNumber.addEventListener("input", function (event) {
    const val = event.target.value;
    console.log("val: ", val);
    const m = val * 1000;
    setTimerArea(m);
    millisecondsTimer = m;
});

start.addEventListener("click", () => {
    if (!timerClearIntervalId) {
        timerClearIntervalId = setInterval(() => {
            if (millisecondsTimer <= 0) {
                audio.play();
                clearInterval(timerClearIntervalId);
                timerClearIntervalId = 0;
            }
            setTimerArea(millisecondsTimer);
            millisecondsTimer -= TIMER_RANGE;
        }, TIMER_RANGE);
    }
    setTimerArea(millisecondsTimer);
});

plusFive.addEventListener("click", () => {
    millisecondsTimer = Number(millisecondsTimer) + 5000;
    setTimerArea(millisecondsTimer);
});

minusFive.addEventListener("click", () => {
    if (millisecondsTimer > 0) {
        millisecondsTimer = Number(millisecondsTimer) - 5000;
        setTimerArea(millisecondsTimer);
    }
});
