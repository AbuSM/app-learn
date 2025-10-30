import "./stopwatch.css";
import "./timer.css";
import "../../api/weather-api.js";

class PageTimers extends HTMLElement {
	connectedCallback() {
		this.innerHTML = /*html*/ `
        <section class="space-y-8">
            <div id="stopwatch">
                <ui-toggle></ui-toggle>
                <div class="container">
                    <h2>Stopwatch</h2>
                    <div class="area" id="stopwatch-area">
                        <div class="seconds">0</div>
                        <span class="milliseconds">.</span>
                        <div class="milliseconds">00</div>
                    </div>
                    <div>
                        <button class="btn" id="start">Start</button>
                        <button class="btn" id="stop">Pause</button>
                        <button class="btn" id="reset">Reset</button>
                        <button class="btn" id="save">Save</button>
                        <button class="btn" id="track">Track</button>
                    </div>
                    <dialog id="dialog">
                        <form class="dialog" method="dialog">
                            <p>Success!</p>
                            <button>Ok</button>
                        </form>
                    </dialog>
                </div>
                <div class="log-container">
                    <p id="log"></p>
                </div>
            </div>
            <div id="timer" class="mt-2">
                <div class="container">
                    <h2>Timer</h2>
                    <div class="area" id="timer-area">
                        <div class="seconds">0</div>
                        <span class="milliseconds">.</span>
                        <div class="milliseconds">00</div>
                    </div>
                    <div>
                        <label for="">Enter initial timer seconds</label>
                        <input type="number" id="initial-number" class="" />
                    </div>
                    <div>
                        <button class="btn" id="timer-start">Start</button>
                        <button class="btn" id="timer-stop">Pause</button>
                        <button class="btn" id="timer-plus-five">+5sec</button>
                        <button class="btn" id="timer-minus-five">-5sec</button>
                    </div>
                </div>
            </div>
            <audio controls style="display: none">
                <source src="./media/egg_timer_alrm.mp3" type="audio/mpeg" />
            </audio>
        </section>
        `;
	}
}
customElements.define("page-timers", PageTimers);
