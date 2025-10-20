import "../components/header/index.js";
import "../components/footer/index.js";

class AppShell extends HTMLElement {
	connectedCallback() {
		this.innerHTML = `
      <app-header></app-header>
      <main class="container mx-auto p-4">
        <app-outlet></app-outlet>
      </main>
      <app-footer></app-footer>
    `;
	}
}
customElements.define("app-shell", AppShell);
