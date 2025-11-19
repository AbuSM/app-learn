import "./stopwatch.css";
import "./timer.css";
import "../../api/weather-api.js";

class PageTimers extends HTMLElement {
	connectedCallback() {
		this.innerHTML = /*html*/ `
        <section class="timers-section">
            <div id="stopwatch" class="timer-card">
                <div class="container">
                    <h2 class="timer-title">Stopwatch</h2>
                    <div class="area" id="stopwatch-area">
                        <div class="minutes">00</div>
                        <span class="time-separator">:</span>
                        <div class="seconds">00</div>
                        <span class="milliseconds">.</span>
                        <div class="milliseconds">00</div>
                    </div>
                    <div class="button-group">
                        <button class="btn btn-primary" id="start">Start</button>
                        <button class="btn btn-secondary" id="stop">Pause</button>
                        <button class="btn btn-secondary" id="reset">Reset</button>
                        <button class="btn btn-secondary" id="save">Save</button>
                        <button class="btn btn-secondary" id="track">Track</button>
                    </div>
                    <dialog id="dialog" class="success-dialog">
                        <form class="dialog-form" method="dialog">
                            <p>Time saved successfully!</p>
                            <button type="submit" class="btn btn-primary">OK</button>
                        </form>
                    </dialog>
                </div>
                <div class="log-container">
                    <p id="log" class="log-list"></p>
                </div>
            </div>

            <div id="timer" class="timer-card">
                <div class="container">
                    <h2 class="timer-title">Timer</h2>
                    <div class="area" id="timer-area">
                        <div class="minutes">00</div>
                        <span class="time-separator">:</span>
                        <div class="seconds">00</div>
                        <span class="milliseconds">.</span>
                        <div class="milliseconds">00</div>
                    </div>
                    <div class="input-group">
                        <label for="initial-number">Enter seconds:</label>
                        <input type="number" id="initial-number" min="0" placeholder="0" />
                    </div>
                    <div class="button-group">
                        <button class="btn btn-primary" id="timer-start">Start</button>
                        <button class="btn btn-secondary" id="timer-stop" disabled>Stop</button>
                        <button class="btn btn-secondary" id="timer-plus-five">+5 sec</button>
                        <button class="btn btn-secondary" id="timer-minus-five">−5 sec</button>
                    </div>
                </div>
            </div>

            <audio style="display: none;">
                <source src="./media/egg_timer_alrm.mp3" type="audio/mpeg" />
            </audio>
        </section>
        `;

		setTimeout(() => {
			import("./stopwatch.js");
			import("./timer.js");
		}, 0);
	}
}

customElements.define("page-timers", PageTimers);
