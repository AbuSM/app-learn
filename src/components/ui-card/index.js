class UICard extends HTMLElement {
    connectedCallback() {
        const title = this.getAttribute("title");
        const description = this.getAttribute("description") || "";
        const btnText = this.getAttribute("btn-text") || "Read more";
        const onBtnClick = this.getAttribute("onBtnClick");
        const direction = this.getAttribute("direction") || "vertical";
        const link = this.getAttribute("link") || "#";
        const imageLink = this.getAttribute("image-link") || "";

        if (direction === "vertical") {
            this.innerHTML = /*html */ `
                <div class="max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm">
                    <a href="${link}">
                        <img class="rounded-t-lg" src="${imageLink}" alt="" />
                    </a>
                    <div class="p-5">
                        <a href="${link}">
                            <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900">${title}</h5>
                        </a>
                        <p class="mb-3 font-normal text-gray-700">${description}</p>
                        <a href="${link}" class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300" click="${onBtnClick}">
                            ${btnText}
                            <svg class="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                            </svg>
                        </a>
                    </div>
                </div>
            `;
        } else if (direction === "horizontal") {
            this.innerHTML = "<h2>Test</h2>";
        }
    }
}
customElements.define("ui-card", UICard);
