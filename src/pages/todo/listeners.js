import getToday from "../../api/getToday";
import changeModal from "./change_modal";
import { pushToServer } from "./pushServer";
import { renderTasks } from "./renderTasks";
import { tasks } from "./script";

function closeAllTaskInputs() {
    const inputs = document.querySelectorAll(".titleInputBox");
    inputs.forEach((element) => {
        element.remove();
    });

    const addTasks = document.querySelectorAll(`.addTask`);
    addTasks.forEach((element) => {
        element.style.display = "initial";
        element.addEventListener("click", handleAddTask);
    });
}
function closeListInput() {
    const inputs = document.querySelectorAll(".addListBox");
    inputs.forEach((element) => {
        element.remove();
    });
    const listButtons = document.querySelectorAll(".add-list-button");
    listButtons.forEach((element) => {
        element.style.display = "initial";
        element.addEventListener("click", handleAddList);
    });
}

function handleAddTask(event) {
    const parent = event.target.parentElement;

    closeAllTaskInputs();

    parent.innerHTML += /*html*/ `
                    <div class="titleInputBox w-fill flex flex-col gap-2 border-[var(--border-gray)] border-2 rounded-xl p-3 shadow bg-neutral-100 hover:cursor-auto transition-all">
                        <input class="titleInput w-full px-3 border-[var(--border-gray)] py-1 rounded border-2 focus:ring-0 focus:border-[var(--primary)]" type="text">
                        <button class="addButton bg-[#465fff] hover:brightness-95 hover:cursor-pointer active:brightness-90 px-3 py-1 text-white rounded">Add</button>
                    </div>
                `;

    parent.firstElementChild.style.display = "none";

    const inputTitle = parent.querySelector(".titleInput");
    const addButton = parent.querySelector(".addButton");

    inputTitle.focus();

    const listIndex = parent.firstElementChild.dataset.listIndex;

    const addTask = () => {
        tasks[listIndex].tasks.push({
            title: inputTitle.value,
            description: "",
            date: getToday(),
            completed: false,
        });
        renderTasks(tasks);
    };

    addButton.addEventListener("click", addTask);
    inputTitle.addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
            addTask();
        }
    });
}

function handleAddList(event) {
    const parent = event.target.parentElement;

    parent.innerHTML += `
                <div class="addListBox flex flex-col gap-2 w-[var(--card-width)] border-[var(--border-gray)] border-2 rounded-xl p-3 shadow bg-neutral-100 hover:cursor-auto transition-all">
                    <input class="titleInput w-full px-3 border-[var(--border-gray)] py-1 rounded border-2 focus:ring-0 focus:border-[var(--primary)]" type="text">
                    <button class="addButton bg-[#465fff] hover:brightness-95 hover:cursor-pointer active:brightness-90 px-3 py-1 text-white rounded">Add</button>
                </div>
            `;
    const addButton = parent.querySelector(".addButton");
    const titleInput = parent.querySelector(".titleInput");

    titleInput.focus();

    parent.firstElementChild.style.display = "none";

    const addList = (title) => {
        tasks.push({
            title,
            tasks: [],
        });
        renderTasks(tasks);
    };

    addButton.addEventListener("click", () => {
        addList(titleInput.value);
    });
    titleInput.addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
            console.log("hello");

            addList(titleInput.value);
        }
    });
}

export function addListeners() {
    setTimeout(() => {
        const addListBtn = document.querySelector(".add-list-button");
        addListBtn.addEventListener("click", handleAddList);

        const addTasks = document.querySelectorAll(".addTask");
        addTasks.forEach((element) => {
            element.addEventListener("click", handleAddTask);
        });

        document.body.addEventListener("click", (event) => {
            if (!event.target.closest(".titleInputBox,.addTask")) {
                closeAllTaskInputs();
            }
        });

        const completeCheckboxElements =
            document.querySelectorAll(".completeCheckbox");
        completeCheckboxElements.forEach((element) => {
            element.addEventListener("click", (event) => {
                const liElement = event.target.closest("li");
                let checkState = event.target.checked;

                const listIndex = liElement.dataset.listIndex;
                const taskIndex = liElement.dataset.taskIndex;

                tasks[listIndex].tasks[taskIndex].completed = checkState;

                liElement.querySelector(".title").style[
                    "text-decoration-line"
                ] = checkState ? "line-through" : "none";
                pushToServer(tasks);
            });
        });

        const taskElements = document.querySelectorAll(".task");
        taskElements.forEach((element) => {
            element.addEventListener("click", async (event) => {
                if (event.target.tagName != "INPUT") {
                    const parent = event.target.closest(".task");
                    const listIndex = parent.dataset.listIndex;
                    const taskIndex = parent.dataset.taskIndex;

                    const title = tasks[listIndex].tasks[taskIndex].title;
                    const description =
                        tasks[listIndex].tasks[taskIndex].description;
                    const date = tasks[listIndex].tasks[taskIndex].date;

                    const task = await changeModal(title, description, date);

                    tasks[listIndex].tasks[taskIndex] = {
                        ...this,
                        ...task,
                    };

                    renderTasks(tasks);
                }
            });
        });
    }, 0);

    document.addEventListener("keydown", (event) => {
        if (event.key == "Escape") {
            closeAllTaskInputs();
            closeListInput();
        }
    });
}
