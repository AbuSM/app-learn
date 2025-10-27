import getDOMElement from "../../api/getDOMElement.js";

export const startLoading = () => {
    const loader = getDOMElement(`<div class="loader_backdrop">
        <span class="loader"></span>
    </div>`);
    document.body.appendChild(loader);
};
export const endLoading = () => {
    const loader = document.querySelector(".loader_backdrop");
    if (loader) loader.remove();
};
