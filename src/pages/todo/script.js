import { API_URL, PASSWORD } from "./../../constants.js";
import alert from "./alert_custom.js";
import dateIcon from "./dateIcon.js";
import { hashing } from "./hashing.js";
import promptPassword from "./prompt_password.js";
import changeModal from "./change_modal.js";
import getDOMElement from "../../api/getDOMElement.js";
import getToday from "../../api/getToday.js";

let loader = document.querySelector(".loader_backdrop");
const taskListsElement = document.querySelector(".task-lists");
const addBtnElement = document.querySelector(".add_container .btn");
const inputTitleElement = document.querySelector("#input_title");
const inputDescriptionElement = document.querySelector("#input_description");
const inputForElement = document.querySelector("#input_for_whom");

const toggleRedBorder = (element, state) => {
    element.classList.toggle("border-red-600", state);
    element.classList.toggle("focus:border-red-600", state);
};

const pushToServer = (tasks) => {
    fetch(`${API_URL}/todo`, {
        method: "PATCH",
        headers: {
            Accept: "application/json",
            "X-GitHub-Api-Version": "2022-11-28",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            data: tasks,
        }),
    }).then((resp) => resp.json());
};

let tasks = [];

const handleAddTask = (event) => {
    const parent = event.target.parentElement;

    closeAllInputs();

    parent.innerHTML += `
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
};

function closeAllInputs() {
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

function addListeners() {
    setTimeout(() => {
        const addListBtn = document.querySelector(".add-list-button");
        addListBtn.addEventListener("click", (event) => {
            const parent = event.target.parentElement;

            parent.innerHTML += `
                <div class="flex flex-col gap-2 w-[var(--card-width)] border-[var(--border-gray)] border-2 rounded-xl p-3 shadow bg-neutral-100 hover:cursor-auto transition-all">
                    <input class="titleInput w-full px-3 border-[var(--border-gray)] py-1 rounded border-2 focus:ring-0 focus:border-[var(--primary)]" type="text">
                    <button class="addButton bg-[#465fff] hover:brightness-95 hover:cursor-pointer active:brightness-90 px-3 py-1 text-white rounded">Add</button>
                </div>
            `;
            const addButton = parent.querySelector(".addButton");
            const titleInput = parent.querySelector(".titleInput");

            titleInput.focus();

            parent.firstElementChild.hidden = true;

            addButton.addEventListener("click", () => {
                handleAddList(titleInput.value);
            });
            titleInput.addEventListener("keydown", (event) => {
                if (event.key === "Enter") {
                    handleAddList(titleInput.value);
                }
            });
        });

        const addTasks = document.querySelectorAll(".addTask");
        addTasks.forEach((element) => {
            element.addEventListener("click", handleAddTask);
        });

        document.body.addEventListener("click", (event) => {
            if (!event.target.closest(".titleInputBox,.addTask")) {
                closeAllInputs();
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
                if (event.target.tagName == "LI") {
                    const listIndex = event.target.dataset.listIndex;
                    const taskIndex = event.target.dataset.taskIndex;

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
}

const startLoading = () => {
    loader = getDOMElement(`<div class="loader_backdrop">
        <span class="loader"></span>
    </div>`);
    document.body.appendChild(loader);
};
const endLoading = () => {
    loader.remove();
};

const renderTasks = (tasks, isInitial = false) => {
    let htmlDataLists = "";

    tasks.forEach((element, listIndex) => {
        let htmlDataTasks = "";
        element.tasks.forEach((task, taskIndex) => {
            htmlDataTasks += `
                <li data-list-index="${listIndex}" data-task-index="${taskIndex}" class="task border-2 flex items-center justify-between border-[var(--border-gray)] p-3 shadow rounded-xl">
                    <div class="flex flex-col gap-2 items-start">
                        <div class="title ${
                            task.completed && "line-through"
                        }" >${task.title}</div>
                        <div class="flex text-sm items-center gap-1">
                        ${dateIcon}
                        <div class="text-[var(--gray)]">${task.date}</div>
                        </div>
                    </div>
                    <div><input ${
                        task.completed && "checked"
                    } class="hover:cursor-pointer completeCheckbox focus:ring-0" type="checkbox" name="" id=""></div>
                </li>
            `;
        });
        htmlDataLists += `
            <ul class="bg-white flex min-w-[var(--card-width)] flex-col gap-2 shadow border-2 border-[var(--border-gray)] rounded-xl p-3">
                <li>
                    <h3 class="ml-2 text-xl font-bold">${element.title}</h3>
                </li>
                ${htmlDataTasks}
                <li>
                    <button
                    data-list-index="${listIndex}"
                    class="addTask w-full border-2 border-[var(--border-gray)] rounded-xl px-3 py-1 shadow bg-neutral-100 hover:cursor-pointer hover:bg-neutral-200 transition-all">
                        + Add New
                    </button>
                </li>
            </ul>
        `;
    });

    htmlDataLists += `
            <div class="add_list">
                <button class="add-list-button border-[var(--border-gray)] w-[var(--card-width)] border-2 rounded-xl px-3 py-1 shadow bg-neutral-100 hover:cursor-pointer hover:bg-neutral-200 transition-all">+ Add another list</button>
            </div>`;

    const render = () => {
        taskListsElement.innerHTML = htmlDataLists;

        endLoading();
        addListeners();
    };

    if (isInitial) {
        render();
        return;
    }

    render();

    pushToServer(tasks);
};

const addTask = () => {
    const title = inputTitleElement.value;
    const description = inputDescriptionElement.value;
    const forWhom = inputForElement.value;
    let isValid = true;

    if (!title) {
        toggleRedBorder(inputTitleElement, true);
        isValid = false;
    }
    if (!description) {
        toggleRedBorder(inputDescriptionElement, true);
        isValid = false;
    }
    if (!forWhom) {
        toggleRedBorder(inputForElement, true);
        isValid = false;
    }

    if (!isValid) {
        return;
    }

    todoTasks = [{ title, description, for: forWhom }, ...todoTasks];

    renderTasks(todoTasks, finishedTasks);
    inputTitleElement.value = "";
    inputDescriptionElement.value = "";
    inputForElement.value = "";
};

function handleAddList(title) {
    tasks.push({
        title,
        tasks: [],
    });
    renderTasks(tasks);
}

const loadInitialData = () => {
    startLoading();
    fetch(`${API_URL}/todo`)
        .then((resp) => resp.json())
        .then((data) => {
            tasks = data;

            renderTasks(tasks, true);
        });
};

loadInitialData();
// changeModal("dnasj", "10.12.08", "ndkjanskj");
