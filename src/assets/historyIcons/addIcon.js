class AddIcon extends HTMLElement {
    connectedCallback() {
        const size = this.getAttribute("size");
        const className = this.getAttribute("class");
        this.innerHTML = /* html */ `
        <svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-circle-plus-icon lucide-circle-plus"><circle cx="12" cy="12" r="10"/><path d="M8 12h8"/><path d="M12 8v8"/></svg>`;
    }
}
customElements.define("history-add-icon", AddIcon);
