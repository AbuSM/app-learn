import getDOMElement from "../../api/getDOMElement";
import getToday from "../../api/getToday";
import changeModal from "./change_modal";
import { pushToServer } from "./pushServer";
import { renderTasks } from "./renderTasks";
import { dragData, taskData, tasks } from "./script";
import { toggleRedBorder } from "./toggleRedBorder";

function addDraggable(taskElements, tasks, listHeadingElements, listElements) {
    taskElements.forEach((element) => {
        element.addEventListener("dragstart", (event) => {
            event.target.classList.add("draggable");
            const listIndex = event.target.dataset.listIndex;
            const taskIndex = event.target.dataset.taskIndex;
            dragData.current = { listIndex, taskIndex };
        });
        element.addEventListener("dragend", (event) => {
            event.target.classList.remove("draggable");
        });
        element.addEventListener("dragenter", (event) => {
            const listIndex = event.target.dataset.listIndex;
            const taskIndex = event.target.dataset.taskIndex;

            const target = dragData.current;

            if (
                !(
                    listIndex == target.listIndex &&
                    taskIndex == target.taskIndex
                ) &&
                event.target.tagName == "LI" &&
                !target.isList
            ) {
                event.target.classList.add("droppable");
            }
        });
        element.addEventListener("dragleave", (event) => {
            if (event.target.tagName == "LI") {
                event.target.classList.remove("droppable");
            }
        });

        element.addEventListener("dragover", (event) => {
            event.preventDefault();
        });
        element.addEventListener("drop", (event) => {
            event.preventDefault();
            if (event.target.tagName == "LI") {
                const listIndex = event.target.dataset.listIndex;
                const taskIndex = event.target.dataset.taskIndex;
                const target = dragData.current;

                if (!target.isList) {
                    const temp = tasks[listIndex].tasks[taskIndex];
                    tasks[listIndex].tasks[taskIndex] =
                        tasks[target.listIndex].tasks[target.taskIndex];
                    tasks[target.listIndex].tasks[target.taskIndex] = temp;

                    renderTasks(tasks);
                }
            }
        });
    });

    listHeadingElements.forEach((element) => {
        element.addEventListener("dragenter", (event) => {
            const target = dragData.current;
            const parent = event.target.closest(".list");
            if (parent.dataset.listIndex != target.listIndex) {
                parent.classList.add("droppable");
            }
        });
        element.addEventListener("dragleave", (event) => {
            const parent = event.target.closest(".list");
            parent.classList.remove("droppable");
        });
        element.addEventListener("dragover", (event) => {
            event.preventDefault();
            const target = dragData.current;
            const parent = event.target.closest(".list");
            if (parent.dataset.listIndex != target.listIndex) {
                parent.classList.add("droppable");
            }
        });
        element.addEventListener("drop", (event) => {
            event.preventDefault();

            const listIndex = event.target.closest(".list").dataset.listIndex;
            const target = dragData.current;

            if (listIndex != target.listIndex) {
                if (target.isList) {
                    const temp = tasks[listIndex];
                    tasks[listIndex] = tasks[target.listIndex];
                    tasks[target.listIndex] = temp;
                } else {
                    const task =
                        tasks[target.listIndex].tasks[target.taskIndex];
                    tasks[target.listIndex].tasks.splice(target.taskIndex, 1);
                    tasks[listIndex].tasks = [task, ...tasks[listIndex].tasks];
                }
                renderTasks(tasks);
            }
        });
    });

    listElements.forEach((element) => {
        element.addEventListener("dragstart", (event) => {
            if (event.target.tagName == "UL") {
                event.target.classList.add("draggable");
                const listIndex = event.target.dataset.listIndex;
                dragData.current = { listIndex, isList: true };
            }
        });
        element.addEventListener("dragend", (event) => {
            event.target.classList.remove("draggable");
        });
    });
}

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

function handleAddTask(element) {
    const parent = element.parentElement;

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
    inputTitle.addEventListener("input", (event) => {
        toggleRedBorder(event.target, !event.target.value.length);
    });

    const listIndex = parent.firstElementChild.dataset.listIndex;

    const addTask = () => {
        if (!!inputTitle.value.length) {
            const task = {
                title: inputTitle.value,
                description: "",
                date: getToday(),
                completed: false,
            };
            tasks[listIndex].tasks.push(task);
            taskData.lastAdded = { listIndex };
            renderTasks(tasks);
        } else {
            toggleRedBorder(inputTitle, true);
        }
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
    titleInput.addEventListener("input", (event) => {
        toggleRedBorder(event.target, !event.target.value.length);
    });

    parent.firstElementChild.style.display = "none";

    const addList = (title) => {
        if (!!titleInput.value.length) {
            tasks.push({
                title,
                tasks: [],
            });
            renderTasks(tasks);
        } else {
            toggleRedBorder(titleInput, true);
        }
    };

    addButton.addEventListener("click", () => {
        addList(titleInput.value);
    });
    titleInput.addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
            addList(titleInput.value);
        }
    });
}

const activeEditableListTitle = (event) => {
    const parent = event.target.closest(".list");
    const listIndex = parent.dataset.listIndex;
    parent.firstElementChild.style.display = "none";
    const title = tasks[listIndex].title;

    const inputBox =
        getDOMElement(/*html*/ `<li class="inputBox relative h-[50px] -m-3 p-3 -mb-2 pb-2 flex justify-between items-center">
                            <input value="${title}" type="text" class="min-w-0 rounded-sm border-2 border-[var(--border-gray)] focus-within:ring-0 focus:ring-0 focus-within:border-[var(--primary)] focus:border-[var(--primary)] text-xl px-2 py-1 font-bold" value="hello" />
                        </li>`);
    parent.prepend(inputBox);

    const titleInput = inputBox.querySelector("input");

    titleInput.focus();
    titleInput.setSelectionRange(
        titleInput.value.length,
        titleInput.value.length
    );
    titleInput.addEventListener("input", (event) => {
        toggleRedBorder(event.target, !event.target.value.length);
    });

    titleInput.addEventListener("keydown", (event) => {
        if (event.key == "Enter") {
            if (!!titleInput.value.length) {
                tasks[listIndex].title = titleInput.value;
                renderTasks(tasks);
            } else {
                toggleRedBorder(titleInput, true);
            }
        } else if (event.key == "Escape") {
            inputBox.remove();
            parent.firstElementChild.style.display = "flex";
        }
    });
};

const removeAllListMenus = () => {
    const menuElements = document.querySelectorAll(".listMenu");
    menuElements.forEach((element) => {
        element.remove();
    });
};

export function addListeners() {
    setTimeout(() => {
        const addListBtn = document.querySelector(".add-list-button");
        addListBtn.addEventListener("click", handleAddList);

        const addTasks = document.querySelectorAll(".addTask");
        addTasks.forEach((element) => {
            element.addEventListener("click", (event) => {
                handleAddTask(event.target);
            });
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

                    const task = await changeModal(
                        tasks[listIndex].tasks[taskIndex]
                    );

                    if (task.isDelete) {
                        tasks[listIndex].tasks.splice(taskIndex, 1);
                    } else {
                        tasks[listIndex].tasks[taskIndex] = task;
                    }

                    renderTasks(tasks);
                }
            });
        });

        const listHeadingElements = document.querySelectorAll(".listHeading");
        const listElements = document.querySelectorAll(".list");

        listHeadingElements.forEach((element) => {
            element.addEventListener("click", activeEditableListTitle);
        });

        addDraggable(taskElements, tasks, listHeadingElements, listElements);

        document.addEventListener("keydown", (event) => {
            if (event.key == "Escape") {
                closeAllTaskInputs();
                closeListInput();
            }
        });

        const editIcons = document.querySelectorAll(".editIcon");
        editIcons.forEach((element) => {
            element.addEventListener("click", (event) => {
                const parentElement = event.target.parentElement;
                if (parentElement.children.length > 1) {
                    parentElement.lastElementChild.remove();
                } else {
                    removeAllListMenus();
                    const menuElement = getDOMElement(/* html */ `
                        <ul class="animate-appear listMenu z-10 hover:cursor-pointer absolute w-[100px] flex flex-col bg-white p-1 border-2 border-[var(--border-gray)] rounded-sm">
                            <li class="editBtn hover:text-black/70 hover:cursor-pointer transition-all"><button class="hover:cursor-pointer">Edit</button></li>
                            <li class="removeBtn hover:text-black/70 hover:cursor-pointer transition-all"><button class="hover:cursor-pointer">Remove</button></li>
                        </ul>
                        `);
                    parentElement.appendChild(menuElement);
                    const editBtn = menuElement.querySelector(".editBtn");
                    const removeBtn = menuElement.querySelector(".removeBtn");

                    editBtn.addEventListener("click", activeEditableListTitle);
                    removeBtn.addEventListener("click", (event) => {
                        const listElement = event.target.closest(".list");
                        const listIndex = listElement.dataset.listIndex;
                        tasks.splice(listIndex, 1);
                        renderTasks(tasks);
                    });
                }
            });
        });
        document.body.addEventListener("click", (event) => {
            if (!event.target.closest(".menuBox")) {
                removeAllListMenus();
            }
        });
        document.body.addEventListener("keydown", (event) => {
            if (event.key == "Enter") {
                if (!!taskData.lastAdded) {
                    if (document.activeElement.tagName == "BODY") {
                        const lastAddedTask = taskData.lastAdded;
                        const addButtonElement = document.querySelector(
                            `ul[data-list-index="${lastAddedTask.listIndex}"] .addTask`
                        );
                        handleAddTask(addButtonElement);
                        console.log(addButtonElement);
                    }
                }
            }
        });
    }, 0);
}
