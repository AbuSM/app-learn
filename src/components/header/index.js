class AppHeader extends HTMLElement {
	connectedCallback() {
		this.innerHTML = /*html*/ `
        <header>
            <div id="weather-area">
                ☀️<span id="weather-result">14</span>&#8451;
            </div>
        </header>
        `;
	}
}
customElements.define("app-header", AppHeader);
