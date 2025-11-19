class taskHistoryPopover extends HTMLElement {
    connectedCallback() {
        this.render();
    }

    getHistoryListHTML() {
        let taskHistory = window.taskHistory || [];

        let historyListHTML = "";

        taskHistory = taskHistory.toReversed();

        for (let element of taskHistory) {
            historyListHTML += /*html*/ `
                <li class="inline-icon border-2 border-[var(--border-gray)] p-2 rounded-xl text-[16px] text-neutral-900">
                    <${element.icon} class="icon" size="16"></${element.icon}>
                    ${element.title}
                </li>
            `;
        }

        return historyListHTML;
    }

    render() {
        const historyListHTML = this.getHistoryListHTML();
        const idCustom = this.getAttribute("custom-id");

        this.innerHTML = /*html*/ `
        <div data-popover id="${idCustom}" role="tooltip" class="absolute z-10 invisible inline-block w-64 text-sm text-gray-500 transition-opacity duration-300 bg-white border border-gray-200 rounded-lg shadow-xs opacity-0">
            <div class="px-3 py-2 bg-white border-b border-gray-200 rounded-t-lg">
                <h3 class="font-semibold text-gray-900">История изменений</h3>
                <p class="text-[13px] text-gray-500">последние 100 изменения</p>
            </div>
            <div class="px-3 py-2 max-h-[200px] overflow-auto">
                <ul class="flex gap-3 flex-col">
                    ${historyListHTML}
                </ul>
            </div>
            <div data-popper-arrow></div>
        </div>
        `;
    }

    update() {
        const historyListHTML = this.getHistoryListHTML();
        this.querySelector("ul").innerHTML = historyListHTML;
    }
}

customElements.define("todo-history-popover", taskHistoryPopover);
