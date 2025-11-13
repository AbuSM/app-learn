import "../ui-icon/index.js";

class UICommentElement extends HTMLElement {
    connectedCallback() {
        const username = this.getAttribute("username");
        const message = this.getAttribute("message");

        this.innerHTML = /*html*/ `
        <div class="flex flex-col gap-2 rounded p-2 bg-gray-50"> 
            <div class="text-sm font-bold">
                ${username}
            </div>
            <div>
                ${message}
            </div>
            <div class="flex items-center justify-end mr-5">
                <div class="flex gap-2">
                    <thumbs-up-icon></thumbs-up-icon>
                    <thumbs-down-icon></thumbs-down-icon>
                    <reply-icon></reply-icon>
                </div>
            </div>
        </div>
        `;
    }
}

customElements.define("ui-comment", UICommentElement);
