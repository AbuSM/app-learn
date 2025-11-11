class PageTodoBoards extends HTMLElement {
    connectedCallback() {
        const hello = (event) => {
            console.log(event);
        };
        window.hello = hello;
        this.innerHTML = /*html*/ `
            <ui-card link="/todo/123" title="Hello" btn-text="Перейти"></ui-card>
        `;
    }
}
customElements.define("page-todo-boards", PageTodoBoards);
