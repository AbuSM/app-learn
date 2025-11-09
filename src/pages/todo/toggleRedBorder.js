export const toggleRedBorder = (element, state) => {
    element.classList.toggle("!border-red-600", state);
    element.classList.toggle("!focus:border-red-600", state);
};
