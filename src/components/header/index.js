class AppHeader extends HTMLElement {
	connectedCallback() {
		this.innerHTML = `
      <header>
        <nav>
            <ul>
                <li>
                    <a class="nav-link" href=""> Home </a>
                </li>
                <li>
                    <a class="nav-link open" href="">Timer</a>
                    <ul>
                        <li><a class="nav-link" href="">Stopwatch</a></li>
                        <li><a class="nav-link" href="">Clock</a></li>
                    </ul>
                </li>
                <li>
                    <a class="nav-link" href="">Events</a>
                </li>
                <li>
                    <a class="nav-link" href="">Blog</a>
                </li>
            </ul>
            <ul>
                <li>
                    <a href="">
                        <button class="btn btn-sm">Sign Up</button>
                    </a>
                </li>
                <li>
                    <a href="./auth/login.html">
                        <button class="btn btn-sm">Login</button>
                    </a>
                </li>
            </ul>
        </nav>
        <div id="weather-area">
            ☀️<span id="weather-result">14</span>&#8451;
        </div>
    </header>
    `;
	}
}
customElements.define("app-header", AppHeader);
