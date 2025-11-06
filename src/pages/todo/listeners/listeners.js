import getDOMElement from "../../../api/getDOMElement";
import getToday from "../../../api/getToday";
import {
    AUTOSCROLL_HEIGHT,
    AUTOSCROLL_INTERVAL,
    AUTOSCROLL_SPEED,
} from "../../../constants";
import changeModal from "../change_modal";
import { pushToServer } from "../pushServer";
import { addEventToHistory, renderTasks } from "../render/renderTasks";
import { controller, dragData, taskData, tasks } from "../script";
import { toggleRedBorder } from "../toggleRedBorder";

function scrollToDown(listIndex) {
    const ulElement = document.querySelector(
        `ul[data-list-index="${listIndex}"] ul`
    );
    ulElement.scrollTo({ top: ulElement.scrollHeight });
}

function stopAutoScroll() {
    if (window.currentAutoScrollInterval) {
        clearInterval(window.currentAutoScrollInterval);
        window.currentAutoScrollInterval = null;
    }
}

function startAutoScroll(element, direction) {
    if (window.currentAutoScrollInterval) {
        return;
    }
    window.currentAutoScrollInterval = setInterval(() => {
        element.scrollTop += AUTOSCROLL_SPEED * (direction == "up" ? -1 : 1);
    }, AUTOSCROLL_INTERVAL);
}

function onTaskListScroll(event) {
    const element = event.target.closest("ul");
    const listIndex = element.closest(".list").dataset.listIndex;

    tasks[listIndex].scrollTop = element.scrollTop;
}

function onTaskListDragLeave() {
    stopAutoScroll();
}
function onTaskListDragOver(event) {
    event.preventDefault();

    const mouseY = event.clientY;
    const element = event.target.closest("ul");
    const elementRect = element.getBoundingClientRect();
    // window.currentAutoScrollInterval = null;

    if (mouseY - elementRect.top <= AUTOSCROLL_HEIGHT) {
        startAutoScroll(element, "up");
    } else if (elementRect.bottom - mouseY <= AUTOSCROLL_HEIGHT) {
        startAutoScroll(element, "down");
    } else {
        stopAutoScroll();
    }
}

export function onDragStart(event) {
    event.target.classList.add("draggable");
    const listIndex = event.target.dataset.listIndex;
    const taskIndex = event.target.dataset.taskIndex;
    dragData.current = { listIndex, taskIndex };
}

export function onDragEnd(event) {
    event.target.classList.remove("draggable");
    stopAutoScroll();
}

export function onTaskDragEnter(event) {
    const listIndex = event.target.dataset.listIndex;
    const taskIndex = event.target.dataset.taskIndex;
    const target = dragData.current;

    if (
        !(listIndex == target.listIndex && taskIndex == target.taskIndex) &&
        event.target.tagName == "LI" &&
        !target.isList
    ) {
        event.target.classList.add("droppable");
    }
}

export function onTaskDragLeave(event) {
    if (event.target.tagName == "LI") {
        event.target.classList.remove("droppable");
    }
}

export function onTaskDragOver(event) {
    event.preventDefault();
}

export function onTaskDrop(event) {
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
}

export function onListHeadingDragEnter(event) {
    const target = dragData.current;
    const parent = event.target.closest(".list");
    if (parent.dataset.listIndex != target.listIndex) {
        parent.classList.add("droppable");
    }
}

export function onListHeadingDragLeave(event) {
    const parent = event.target.closest(".list");
    parent.classList.remove("droppable");
}

export function onListHeadingDragOver(event) {
    event.preventDefault();
    const target = dragData.current;
    const parent = event.target.closest(".list");
    if (parent.dataset.listIndex != target.listIndex) {
        parent.classList.add("droppable");
    }
}

export function onListHeadingDrop(event) {
    event.preventDefault();

    const listIndex = event.target.closest(".list").dataset.listIndex;
    const target = dragData.current;

    if (listIndex != target.listIndex) {
        if (target.isList) {
            const temp = tasks[listIndex];
            tasks[listIndex] = tasks[target.listIndex];
            tasks[target.listIndex] = temp;
        } else {
            const task = tasks[target.listIndex].tasks[target.taskIndex];
            tasks[target.listIndex].tasks.splice(target.taskIndex, 1);
            tasks[listIndex].tasks = [task, ...tasks[listIndex].tasks];
        }
        renderTasks(tasks);
    }
}

export function onListDragStart(event) {
    if (event.target.tagName == "UL") {
        event.target.classList.add("draggable");
        const listIndex = event.target.dataset.listIndex;
        dragData.current = { listIndex, isList: true };
    }
}

export function onListDragEnd(event) {
    event.target.classList.remove("draggable");
}

export function onCompleteCheckboxClick(event) {
    const liElement = event.target.closest("li");
    let checkState = event.target.checked;

    const listIndex = liElement.dataset.listIndex;
    const taskIndex = liElement.dataset.taskIndex;

    tasks[listIndex].tasks[taskIndex].completed = checkState;

    renderTasks(tasks);
    addEventToHistory(
        `Вы пометили как "${checkState ? "" : "не "}сделано" задачу: ${
            tasks[listIndex].tasks[taskIndex].title
        }`
    );
}

export async function onTaskClick(event) {
    if (event.target.tagName != "INPUT") {
        const parent = event.target.closest(".task");
        const listIndex = parent.dataset.listIndex;
        const taskIndex = parent.dataset.taskIndex;

        const task = await changeModal(tasks[listIndex].tasks[taskIndex]);

        if (task.isDelete) {
            addEventToHistory(
                `Вы удалили задачу: "${tasks[listIndex].tasks[taskIndex].title}"`
            );
            tasks[listIndex].tasks.splice(taskIndex, 1);
        } else {
            if (tasks[listIndex].tasks[taskIndex].title != task.title) {
                addEventToHistory(
                    `Вы изменили заголовок задачи: "${tasks[listIndex].tasks[taskIndex].title}" на "${task.title}"`
                );
            }
            tasks[listIndex].tasks[taskIndex] = task;
        }

        renderTasks(tasks);
    }
}

export function onListHeadingClick(event) {
    const parent = event.target.closest(".list");
    const listIndex = parent.dataset.listIndex;
    parent.firstElementChild.style.display = "none";
    const title = tasks[listIndex].title;

    const inputBox =
        getDOMElement(/*html*/ `<li class="inputBox relative h-[50px] -m-3 p-3 -mb-2 pb-2 flex justify-between items-center">
                            <input value="${title}" type="text" class="min-w-0 w-full rounded-sm border-2 border-[var(--border-gray)] focus-within:ring-0 focus:ring-0 focus-within:border-[var(--primary)] focus:border-[var(--primary)] text-xl px-2 py-1 font-bold" oninput="window.onTitleInputChange(event)" onkeydown="window.onTitleInputKeydown(event)" />
                        </li>`);
    parent.prepend(inputBox);

    const titleInput = inputBox.querySelector("input");

    window.currentListIndex = listIndex;
    window.currentInputBox = inputBox;

    titleInput.focus();
    titleInput.setSelectionRange(
        titleInput.value.length,
        titleInput.value.length
    );
}

export function onTitleInputChange(event) {
    toggleRedBorder(event.target, !event.target.value.length);
}

export function onTitleInputKeydown(event) {
    if (event.key == "Enter") {
        const titleInput = event.target;
        if (!!titleInput.value.length) {
            tasks[window.currentListIndex].title = titleInput.value;
            renderTasks(tasks);
        } else {
            toggleRedBorder(titleInput, true);
        }
    } else if (event.key == "Escape") {
        window.currentInputBox.remove();
        renderTasks(tasks);
    }
}

export function onMenuIconClick(event) {
    event.stopPropagation();
    const parentElement = event.target.parentElement;
    if (parentElement.children.length > 1) {
        parentElement.lastElementChild.remove();
    } else {
        const menuElements = document.querySelectorAll(".listMenu");
        menuElements.forEach((element) => {
            element.remove();
        });

        const listElement = event.target.closest(".list");
        const listIndex = listElement.dataset.listIndex;

        const menuElement = getDOMElement(/* html */ `
                        <ul class="animate-appear listMenu z-10 hover:cursor-pointer absolute w-[100px] flex flex-col bg-white p-1 border-2 border-[var(--border-gray)] rounded-sm">
                            <li class="editBtn hover:text-black/70 hover:cursor-pointer transition-all"><button class="hover:cursor-pointer" onclick="window.onEditListClick(event)">Edit</button></li>
                            <li class="removeBtn hover:text-black/70 hover:cursor-pointer transition-all"><button class="hover:cursor-pointer" onclick="window.onRemoveListClick(event)">Remove</button></li>
                        </ul>
                        `);
        parentElement.appendChild(menuElement);
    }
}

export function onEditListClick(event) {
    const listElement = event.target.closest(".list");
    const listHeading = listElement.querySelector(".listHeading");
    onListHeadingClick({ target: listHeading });
}

export function onRemoveListClick(event) {
    const listElement = event.target.closest(".list");
    const listIndex = listElement.dataset.listIndex;
    addEventToHistory(`Вы удалили список "${tasks[listIndex].title}"`);
    tasks.splice(listIndex, 1);
    renderTasks(tasks);
}

export function onAddTaskClick(event) {
    const parent = event.target.parentElement;
    const listIndex = event.target.dataset.listIndex;

    const inputs = document.querySelectorAll(".titleInputBox");
    inputs.forEach((element) => {
        element.remove();
    });

    const addTasks = document.querySelectorAll(`.addTask`);
    addTasks.forEach((element) => {
        element.style.display = "initial";
    });

    if (!parent) {
        return;
    }

    parent.innerHTML += /*html*/ `
                    <div class="titleInputBox w-fill flex flex-col gap-2 border-[var(--border-gray)] border-2 rounded-xl p-3 shadow bg-neutral-100 hover:cursor-auto transition-all">
                        <input class="titleInput w-full px-3 border-[var(--border-gray)] py-1 rounded border-2 focus:ring-0 focus:border-[var(--primary)]" type="text" oninput="window.onTaskInputChange(event)" onkeydown="window.onTaskInputKeydown(event)">
                        <button class="addButton bg-[#465fff] hover:brightness-95 hover:cursor-pointer active:brightness-90 px-3 py-1 text-white rounded" onclick="window.onAddTaskButtonClick(event)">Add</button>
                    </div>
                `;

    scrollToDown(listIndex);

    parent.firstElementChild.style.display = "none";

    const inputTitle = parent.querySelector(".titleInput");
    window.currentTaskListIndex = listIndex;

    inputTitle.focus();
}

export function onTaskInputChange(event) {
    toggleRedBorder(event.target, !event.target.value.length);
}

export function onTaskInputKeydown(event) {
    if (event.key === "Enter") {
        onAddTaskButtonClick(event);
    }
}

export function onAddTaskButtonClick(event) {
    const inputTitle = event.target.parentElement.querySelector(".titleInput");
    const listIndex = window.currentTaskListIndex;

    if (!!inputTitle.value.length) {
        const task = {
            title: inputTitle.value,
            description: "",
            date: "",
            completed: false,
        };

        tasks[listIndex].tasks.push(task);
        taskData.lastAdded = { listIndex };
        addEventToHistory(`Вы добавили задачу "${task.title}"`);
        renderTasks(tasks);
        scrollToDown(listIndex);
    } else {
        toggleRedBorder(inputTitle, true);
    }
}

export function onAddListClick(event) {
    const parent = event.target.parentElement;

    const inputs = document.querySelectorAll(".addListBox");
    inputs.forEach((element) => {
        element.remove();
    });

    const listButtons = document.querySelectorAll(".add-list-button");
    listButtons.forEach((element) => {
        element.style.display = "initial";
    });

    parent.innerHTML += `
                <div class="addListBox flex flex-col gap-2 w-[var(--card-width)] border-[var(--border-gray)] border-2 rounded-xl p-3 shadow bg-neutral-100 hover:cursor-auto transition-all">
                    <input class="titleInput w-full px-3 border-[var(--border-gray)] py-1 rounded border-2 focus:ring-0 focus:border-[var(--primary)]" type="text" oninput="window.onListInputChange(event)" onkeydown="window.onListInputKeydown(event)">
                    <button class="addButton bg-[#465fff] hover:brightness-95 hover:cursor-pointer active:brightness-90 px-3 py-1 text-white rounded" onclick="window.onAddListButtonClick(event)">Add</button>
                </div>
            `;

    const titleInput = parent.querySelector(".titleInput");
    parent.firstElementChild.style.display = "none";
    titleInput.focus();
}

export function onListInputChange(event) {
    toggleRedBorder(event.target, !event.target.value.length);
}

export function onListInputKeydown(event) {
    if (event.key === "Enter") {
        // const titleInput = event.target;

        // if (!!titleInput.value.length) {
        //     tasks.push({
        //         title: titleInput.value,
        //         tasks: [],
        //     });
        //     renderTasks(tasks);
        // } else {
        //     toggleRedBorder(titleInput, true);
        // }
        onAddListButtonClick(event);
    }
}

export function onAddListButtonClick(event) {
    const titleInput = event.target.parentElement.querySelector(".titleInput");

    if (!!titleInput.value.length) {
        tasks.push({
            title: titleInput.value,
            tasks: [],
        });
        addEventToHistory(`Вы добавили список "${titleInput.value}"`);
        renderTasks(tasks);
    } else {
        toggleRedBorder(titleInput, true);
    }
}

export function onBodyClick(event) {
    if (!event.target.closest(".titleInputBox,.addTask")) {
        const inputs = document.querySelectorAll(".titleInputBox");
        inputs.forEach((element) => {
            element.remove();
        });

        const addTasks = document.querySelectorAll(`.addTask`);
        addTasks.forEach((element) => {
            element.style.display = "initial";
        });
    }

    if (!event.target.closest(".inputBox,.listHeading")) {
        if (
            !!window.currentInputBox &&
            !!window.currentInputBox.parentElement
        ) {
            const parent = window.currentInputBox.parentElement;
            const listHeadingElement = parent.querySelector(".listHeading");
            listHeadingElement.style.display = "flex";

            window.currentInputBox.remove();
        }
    }

    if (!event.target.closest(".menuBox")) {
        const menuElements = document.querySelectorAll(".listMenu");
        menuElements.forEach((element) => {
            element.remove();
        });
    }
}

export function onBodyKeydown(event) {
    if (event.key == "Escape") {
        const inputs = document.querySelectorAll(".titleInputBox");
        inputs.forEach((element) => {
            element.remove();
        });

        const addTasks = document.querySelectorAll(`.addTask`);
        addTasks.forEach((element) => {
            element.style.display = "initial";
        });

        const listInputs = document.querySelectorAll(".addListBox");
        listInputs.forEach((element) => {
            element.remove();
        });

        const listButtons = document.querySelectorAll(".add-list-button");
        listButtons.forEach((element) => {
            element.style.display = "initial";
        });
    }

    if (event.key == "Enter") {
        if (!!taskData.lastAdded) {
            if (event.target.tagName == "BODY") {
                const lastAddedTask = taskData.lastAdded;
                const addButtonElement = document.querySelector(
                    `ul[data-list-index="${lastAddedTask.listIndex}"] .addTask`
                );
                if (addButtonElement) {
                    onAddTaskClick({ target: addButtonElement });
                }
            }
        }
    }
}

export function initGlobalHandlers() {
    window.onDragStart = onDragStart;
    window.onDragEnd = onDragEnd;
    window.onTaskDragEnter = onTaskDragEnter;
    window.onTaskDragLeave = onTaskDragLeave;
    window.onTaskDragOver = onTaskDragOver;
    window.onTaskDrop = onTaskDrop;
    window.onListHeadingDragEnter = onListHeadingDragEnter;
    window.onListHeadingDragLeave = onListHeadingDragLeave;
    window.onListHeadingDragOver = onListHeadingDragOver;
    window.onListHeadingDrop = onListHeadingDrop;
    window.onListDragStart = onListDragStart;
    window.onListDragEnd = onListDragEnd;
    window.onCompleteCheckboxClick = onCompleteCheckboxClick;
    window.onTaskClick = onTaskClick;
    window.onListHeadingClick = onListHeadingClick;
    window.onTitleInputChange = onTitleInputChange;
    window.onTitleInputKeydown = onTitleInputKeydown;
    window.onMenuIconClick = onMenuIconClick;
    window.onEditListClick = onEditListClick;
    window.onRemoveListClick = onRemoveListClick;
    window.onAddTaskClick = onAddTaskClick;
    window.onTaskInputChange = onTaskInputChange;
    window.onTaskInputKeydown = onTaskInputKeydown;
    window.onAddTaskButtonClick = onAddTaskButtonClick;
    window.onAddListClick = onAddListClick;
    window.onListInputChange = onListInputChange;
    window.onListInputKeydown = onListInputKeydown;
    window.onAddListButtonClick = onAddListButtonClick;
    window.onBodyClick = onBodyClick;
    window.onBodyKeydown = onBodyKeydown;
    window.onTaskListDragOver = onTaskListDragOver;
    window.onTaskListDragLeave = onTaskListDragLeave;
    window.onTaskListScroll = onTaskListScroll;
}

export function initDocumentListeners() {
    const signal = controller.controller.signal;

    document.body.removeEventListener("click", onBodyClick);
    document.body.addEventListener("click", onBodyClick, { signal });

    document.body.removeEventListener("keydown", onBodyKeydown);
    document.body.addEventListener("keydown", onBodyKeydown, { signal });
}
