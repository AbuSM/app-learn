class AppHeader extends HTMLElement {
	connectedCallback() {
		this.innerHTML = /*html*/ `
        <header class="px-6 py-2">
            <div id="weather-area">
                ☀️<span id="weather-result">14</span>&#8451;
            </div>
        </header>
        `;
	}
}
customElements.define("app-header", AppHeader);
