class AppShell extends HTMLElement {
	connectedCallback() {
		this.innerHTML = /*html*/ `
        <app-sidebar></app-sidebar>
        <div class="main">
            <app-header></app-header>
            <main class="container mx-auto p-6">
                <app-outlet></app-outlet>
            </main>
            <app-footer></app-footer>
        </div>
        `;
	}
}
customElements.define("app-shell", AppShell);
