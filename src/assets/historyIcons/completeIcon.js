class CompleteIcon extends HTMLElement {
    connectedCallback() {
        const size = this.getAttribute("size");
        const className = this.getAttribute("class");
        this.innerHTML = /* html */ `
        <svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-circle-check-icon lucide-circle-check"><circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/></svg>`;
    }
}
customElements.define("history-complete-icon", CompleteIcon);
