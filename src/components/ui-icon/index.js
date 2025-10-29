import { ICONS } from "./icons.js";

/**
 * UI Icon Web Component
 * A flexible icon component using Heroicons
 *
 * @example
 * <ui-icon name="home"></ui-icon>
 * <ui-icon name="user" size="6"></ui-icon>
 * <ui-icon name="star-solid" stroke="blue" size="8"></ui-icon>
 */
class UiIcon extends HTMLElement {
	connectedCallback() {
		this.render();
	}

	static get observedAttributes() {
		return ["name", "size", "stroke", "fill"];
	}

	attributeChangedCallback(name, oldValue, newValue) {
		if (oldValue !== newValue) {
			this.render();
		}
	}

	render() {
		// Get attributes
		const name = this.getAttribute("name") || "home";
		const size = this.getAttribute("size") || "4";
		const stroke = this.getAttribute("stroke") || "currentColor";
		const fill = this.getAttribute("fill") || "none";
		const strokeWidth = this.getAttribute("stroke-width") || "2";
		const className = this.getAttribute("class") || "";

		// Get icon path from icons.js
		const iconPath = ICONS[name];

		// If icon not found, use home as fallback and log warning
		if (!iconPath) {
			console.warn(
				`Icon "${name}" not found. Using "home" as fallback. Available icons:`,
				Object.keys(ICONS)
			);
		}

		const finalIconPath = iconPath || ICONS.home;

		// Determine if it's a solid icon (filled)
		const isSolid = name.endsWith("-solid");
		const finalFill = isSolid ? "currentColor" : fill;
		const finalStroke = isSolid ? "none" : stroke;

		// Render the SVG
		this.innerHTML = `
            <svg 
                class="w-${size} h-${size} ${className}" 
                fill="${finalFill}" 
                stroke="${finalStroke}" 
                stroke-width="${strokeWidth}"
                viewBox="0 0 24 24" 
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
            >
                ${finalIconPath}
            </svg>
        `;
	}

	/**
	 * Get list of all available icons
	 */
	static getAvailableIcons() {
		return Object.keys(ICONS);
	}

	/**
	 * Check if an icon exists
	 */
	static hasIcon(name) {
		return name in ICONS;
	}
}

// Define the custom element
customElements.define("ui-icon", UiIcon);

export default UiIcon;
