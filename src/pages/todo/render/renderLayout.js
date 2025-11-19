import loadInitialTasks from "../loadInitialTasks";

export default async () => {
    const boardTitleElement = document.querySelector(".board-title");
    await loadInitialTasks();
    boardTitleElement.innerHTML = window.boardTitle;
};
