export default function getDOMElement(HTML) {
    const tempElement = document.createElement("div");
    tempElement.innerHTML = HTML;
    return tempElement.firstElementChild;
}
