class TodoPage extends HTMLElement {
    connectedCallback() {
        window.todoID = this.dataset.id;
        this.innerHTML = /* html */ `
            <div class="flex h-full overflow-auto flex-col">
                <div class="w-full px-6 py-2 flex justify-between items-center">
                    <h3 class="text-2xl">Доска ${this.dataset.id}</h3>
                    <div class="flex">
                        <history-icon data-popover-target="todo-history-popover" class="rounded hover:bg-black/10 transition hover:cursor-pointer p-1.5"></history-icon>
                        <todo-history-popover custom-id="todo-history-popover"></todo-history-popover>
                    </div>
                </div>
                <div class="flex flex-col h-full">
                    <div class="task-lists flex-[1_1_0] overflow-y-hidden px-6 flex items-start gap-3 py-4"></div>
                </div>
            </div>
        `;
        import("./script");
    }
}
customElements.define("page-todo", TodoPage);
