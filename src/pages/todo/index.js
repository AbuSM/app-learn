class TodoPage extends HTMLElement {
    connectedCallback() {
        this.innerHTML = /* html */ `
            <h2 class="my-3 text-2xl font-bold">ToDo List</h2>
            <div class="task-lists flex-[1_1_0] overflow-auto flex items-start gap-3 py-4"></div>
        `;
        import("./script");
    }
}
customElements.define("page-todo", TodoPage);
