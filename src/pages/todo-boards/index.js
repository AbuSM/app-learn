import loadInitialBoards from "./loadInitialBoards";

class PageTodoBoards extends HTMLElement {
    connectedCallback() {
        this.innerHTML = /*html*/ `
            <div class="boards-container flex gap-4">
                
            </div>
        `;

        import("./renderBoards.js");
    }
}
customElements.define("page-todo-boards", PageTodoBoards);
