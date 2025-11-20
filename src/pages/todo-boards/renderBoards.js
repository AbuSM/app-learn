import loadInitialBoards from "./loadInitialBoards";

(async () => {
  await loadInitialBoards();

  console.log(window.boards);

  const boardsContainer = document.querySelector(".boards-container");

  const BOARDS_ROW_COUNT = 3;
  let boards = [...Array(BOARDS_ROW_COUNT)].map(() => []);
  let boardsContainerHTML = "";

  for (let row = 0; row < BOARDS_ROW_COUNT; row++) {
    window.boards.forEach((element, index) => {
      if (index % BOARDS_ROW_COUNT == row) {
        boards[row % BOARDS_ROW_COUNT].push(`<ui-card
              link="/todo/${element.id}"
              title="${element.title}"
              btn-text="Перейти"
              image-link="${element.image_url}"></ui-card>
          `);
      }
    });
  }

  for (let index = 0; index < BOARDS_ROW_COUNT; index++) {
    let tmpBoardColumn = ``;
    for (let i = 0; i < boards[index].length; i++) {
      tmpBoardColumn += boards[index][i];
    }
    boardsContainerHTML += `
      <div class="flex flex-col gap-4">
        ${tmpBoardColumn}
      </div>
    `
  }

  boardsContainer.innerHTML = boardsContainerHTML;
})();
