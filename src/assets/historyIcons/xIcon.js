class XIcon extends HTMLElement {
    connectedCallback() {
        const size = this.getAttribute("size");
        const className = this.getAttribute("class");
        this.innerHTML = /* html */ `
        <svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-circle-x-icon lucide-circle-x"><circle cx="12" cy="12" r="10"/><path d="m15 9-6 6"/><path d="m9 9 6 6"/></svg>`;
    }
}
customElements.define("history-x-icon", XIcon);
