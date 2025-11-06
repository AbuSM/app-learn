class TodoPage extends HTMLElement {
    connectedCallback() {
        this.innerHTML = /* html */ `
            <div class="flex h-full overflow-auto relative">
                <div class="flex flex-col h-full p-6">
                    <h2 class="my-3 text-2xl font-bold">ToDo List</h2>
                    <div class="task-lists flex-[1_1_0] overflow-hidden flex items-start gap-3 py-4"></div>
                </div>
                <div class="fixed h-full bg-white pt-[65px] p-3 top-0 right-0">
                    Hello
                </div>
            </div>
        `;
        import("./script");
    }
}
customElements.define("page-todo", TodoPage);
