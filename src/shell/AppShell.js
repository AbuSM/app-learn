class AppShell extends HTMLElement {
    connectedCallback() {
        this.innerHTML = /*html*/ `
        <app-sidebar></app-sidebar>
        <app-header></app-header>
        <div class="main">
            <main class="container mx-auto p-4">
                <app-outlet></app-outlet>
            </main>
            <app-footer></app-footer>
        </div>
        `;
    }
}
customElements.define("app-shell", AppShell);