class PageEvents extends HTMLElement {
    connectedCallback() {
        this.innerHTML = /*html*/ `
        <div>
            <h1 class="!text-red-500">Hello world</h1>
        </div>
        `;
    }
}

customElements.define("page-events", PageEvents);