import "../ui-icon/index.js";

class AppHeader extends HTMLElement {
	connectedCallback() {
		this.innerHTML = /*html*/ `
        <header class="flex items-center justify-between px-6 py-4 bg-white border-b border-gray-200">
            <button id="sidebar-toggle" class="inline-flex items-center justify-center rounded-md p-2 text-gray-600 hover:bg-gray-100 transition-colors cursor-pointer">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
                </svg>
            </button>
            <div id="weather-area" class="flex items-center gap-2">
                <div id="weather-spinner" class="inline-block">
                    <svg class="animate-spin h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                </div>
                <span id="weather-result" class="text-gray-700 font-medium">--&#8451;</span>
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
