class Reply extends HTMLElement {
    connectedCallback() {
        const className = this.getAttribute("class");
        this.innerHTML = /* html */ `
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-reply-icon lucide-reply"><path d="M20 18v-2a4 4 0 0 0-4-4H4"/><path d="m9 17-5-5 5-5"/></svg>
        `;
    }
}
customElements.define("reply-icon", Reply);
