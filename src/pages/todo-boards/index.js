class PageTodoBoards extends HTMLElement {
    connectedCallback() {
        this.innerHTML = /*html*/ `
            <div class="flex gap-4">
                <div class="flex-1 flex flex-col gap-4">
                    <ui-card link="/todo/123" title="Test" btn-text="Перейти" image-link="https://marketing.uz/uploads/articles/4338/article-original.jpg"></ui-card>
                    <ui-card link="/todo/123" title="Test" btn-text="Перейти" image-link="https://marketing.uz/uploads/articles/4338/article-original.jpg"></ui-card>
                </div>
                <div class="flex-1 flex flex-col gap-4">
                    <ui-card link="/todo/123" title="Muhammad" btn-text="Перейти" image-link="https://s1.stc.all.kpcdn.net/putevoditel/projectid_346574/images/tild3965-3034-4533-a530-333537663435__woman-792162_1920.jpg"></ui-card>
                    <ui-card link="/todo/123" title="Muhammad" btn-text="Перейти" image-link="https://s1.stc.all.kpcdn.net/putevoditel/projectid_346574/images/tild3965-3034-4533-a530-333537663435__woman-792162_1920.jpg"></ui-card>
                </div>
                <div class="flex-1 flex flex-col gap-4">
                    <ui-card link="/todo/123" title="Hello" btn-text="Перейти"></ui-card>
                    <ui-card link="/todo/123" title="About" btn-text="Перейти" image-link="https://s1.stc.all.kpcdn.net/putevoditel/projectid_346574/images/tild3965-3034-4533-a530-333537663435__woman-792162_1920.jpg"></ui-card>
                    <ui-card link="/todo/123" title="Hello" btn-text="Перейти"></ui-card>
                </div>
            </div>
        `;
    }
}
customElements.define("page-todo-boards", PageTodoBoards);
