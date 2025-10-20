class Test extends HTMLElement {
	constructor() {
		super();

		const shadow = this.attachShadow({ mode: "open" });

		// Create elements for the shadow DOM
		const wrapper = document.createElement("span");
		const name = this.getAttribute("name") || "Stranger"; // Get 'name' attribute or default

		wrapper.textContent = `Hello, ${name}!`;

		// Apply some basic styling within the shadow DOM
		const style = document.createElement("style");
		style.textContent = `
            span {
                font-family: sans-serif;
                color: #333;
                padding: 5px;
                border: 1px solid #ccc;
                border-radius: 3px;
                display: inline-block;
                margin-bottom: 10px;
            }
        `;

		// Append elements to the shadow DOM
		shadow.appendChild(style);
		shadow.appendChild(wrapper);
	}
}
customElements.define("test", Test);
