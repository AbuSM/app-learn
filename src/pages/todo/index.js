// import { loadInitialData } from "./script";

class TodoPage extends HTMLElement {
    connectedCallback() {
        this.innerHTML = /* html */ `
            <h2 class="my-3 text-2xl font-bold">ToDo List</h2>
            <div class="task-lists flex items-start gap-3 overflow-auto p-3"></div>
        `;
        import("./script");
    }
}
customElements.define("page-todo", TodoPage);
