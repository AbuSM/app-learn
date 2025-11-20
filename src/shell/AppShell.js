import "../api/weather-api.js";

class AppShell extends HTMLElement {
	connectedCallback() {
		this.innerHTML = /*html*/ `
        <app-sidebar></app-sidebar>
        <div class="main">
            <app-header></app-header>
            <main class="p-6">
                <app-outlet></app-outlet>
            </main>
            <app-footer></app-footer>
            <ui-toast id="global-toast"></ui-toast>
        </div>
        `;
	}
}
customElements.define("app-shell", AppShell);
