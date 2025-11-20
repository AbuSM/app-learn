import "../ui-icon/index.js";

class AppHeader extends HTMLElement {
	connectedCallback() {
		this.innerHTML = /*html*/ `
        <header class="flex items-center justify-between px-6 py-2 bg-white border-b border-gray-200">
            <button id="sidebar-toggle" class="inline-flex items-center justify-center rounded-md p-2 text-gray-600 hover:bg-gray-100 transition-colors cursor-pointer">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
                </svg>
            </button>
            <div id="weather-area">
                ☀️<span id="weather-result">14</span>&#8451;
            </div>
        </header>
        `;

		const toggleBtn = this.querySelector("#sidebar-toggle");
		toggleBtn.addEventListener("click", () => {
			const sidebar = document.querySelector("app-sidebar");
			sidebar.classList.toggle("sidebar-hidden");
		});
	}
}
customElements.define("app-header", AppHeader);
