const icons = {
	menu: `
    <svg class="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
      <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M8 6h8M6 10h12M8 14h8M6 18h12"/>
    </svg>`,
	close: `
    <svg class="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
      <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M6 6l12 12M6 18L18 6"/>
    </svg>`,
};

class UiIcon extends HTMLElement {
	static get observedAttributes() {
		return ["name", "class"];
	}
	connectedCallback() {
		this.render();
	}
	attributeChangedCallback() {
		this.render();
	}
	render() {
		const name = this.getAttribute("name") || "menu";
		const extra = this.getAttribute("class") || "";
		this.innerHTML = icons[name] || "";
		// merge extra classes
		this.firstElementChild?.classList.add(
			...extra.split(" ").filter(Boolean)
		);
	}
}
customElements.define("ui-icon", UiIcon);
