import loadInitialBoards from "./loadInitialBoards";

(async () => {
    await loadInitialBoards();

    console.log(window.boards);

    const boardsContainer = document.querySelector(".boards-container");

    const BOARDS_ROW_COUNT = 3;
    let boardsContainerHTML = "";

    for (let row = 0; row < BOARDS_ROW_COUNT; row++) {
        boardsContainerHTML += "";
        window.boards.forEach((element, index) => {
            if (index % BOARDS_ROW_COUNT == row) {
                boardsContainerHTML += /*html*/ `<ui-card
                        link="/todo/${element.id}"
                        title="${element.title}"
                        btn-text="Перейти"
                        image-link="${element.image_url}"></ui-card>
                    `;
            }
        });
    }

    boardsContainer.innerHTML = boardsContainerHTML;
})();
