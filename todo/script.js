import { API_URL } from "./../constants.js";

const loader = document.querySelector(".loader_backdrop");
const todoTasksElement = document.querySelector(".tasks");
const finishedTasksElement = document.querySelector(".finished");
const addBtnElement = document.querySelector(".add_container .btn");
const inputTitleElement = document.querySelector("#input_title");
const inputDescriptionElement = document.querySelector("#input_description");
const inputForElement = document.querySelector("#input_for_whom");

let todoTasks = [],
    finishedTasks = [];

function addListeners() {
    setTimeout(() => {
        const doitBtnElements = document.querySelectorAll(".doit");
        doitBtnElements.forEach((element) => {
            element.addEventListener("click", handleDoIt);
        });

        const doitInputElements = document.querySelectorAll(".doItInput");
        doitInputElements.forEach((element) => {
            element.addEventListener("keydown", (event) => {
                if (event.key == "Enter") {
                    handleDoIt(event);
                }
            });
        });

        const restoreButtonElements = document.querySelectorAll(".restore");
        restoreButtonElements.forEach((element) => {
            element.addEventListener("click", handleRestore);
        });

        const deleteFinishedElements = document.querySelectorAll(
            ".delete-from-finished"
        );
        deleteFinishedElements.forEach((element) => {
            element.addEventListener("click", handleDeleteFinished);
        });

        const deleteTodoElements =
            document.querySelectorAll(".delete-from-todo");
        deleteTodoElements.forEach((element) => {
            element.addEventListener("click", handleDeleteTodo);
        });
    }, 0);
}

const startLoading = () => {
    loader.style.display = "flex";
};
const endLoading = () => {
    loader.style.display = "none";
};

const renderTasks = (todoTasks, finishedTasks, isInitial = false) => {
    const htmlDataTasks = todoTasks
        .map(
            (item, index) =>
                `<div title="For: ${item.for}, ${item.description}" class="container">
                    <div class="flex gap-3 items-center">
                        <img data-index="${index}" title="delete" class="delete-from-todo h-6 w-6 p-0.5 hover:bg-white/10 hover:cursor-pointer rounded active:bg-white/20" src='/assets/delete.svg'></img>
                        <h3>${item.title}</h3>
                    </div>
                    <div class="input_name_cont">
                        <input data-index="${index}" type="text" placeholder="Name" class="doItInput" />
                        <button data-index="${index}" class="btn doit">Do It</button>
                    </div>
                </div>`
        )
        .join("");

    const htmlDataFinished = finishedTasks
        .map(
            (item, index) =>
                `<div title="For: ${item.for}, ${item.description}" class="container">
                    <div class="flex gap-3 items-center">
                        <div class="flex">
                            <img data-index="${index}" title="restore" class="restore h-6 w-6 p-0.5 hover:bg-white/10 hover:cursor-pointer rounded active:bg-white/20" src='/assets/restore.svg'></img>
                            <img data-index="${index}" title="delete" class="delete-from-finished h-6 w-6 p-0.5 hover:bg-white/10 hover:cursor-pointer rounded active:bg-white/20" src='/assets/delete.svg'></img>
                        </div>
                        <h3 class="title">${item.title}</h3>
                    </div>
                    <h3>${item.complete_name}</h3>
                </div>`
        )
        .join("");

    const render = () => {
        todoTasksElement.innerHTML = htmlDataTasks;
        finishedTasksElement.innerHTML = htmlDataFinished;
        endLoading();
        addListeners();
    };

    if (isInitial) {
        render();
        return;
    }

    startLoading();

    fetch(`${API_URL}/todo`, {
        method: "PATCH",
        headers: {
            Accept: "application/json",
            "X-GitHub-Api-Version": "2022-11-28",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            data: { todoTasks, finishedTasks },
        }),
    })
        .then((resp) => resp.json())
        .then((data) => {
            render();
        });
};

const addTask = () => {
    const title = inputTitleElement.value;
    const description = inputDescriptionElement.value;
    const forWhom = inputForElement.value;
    todoTasks = [{ title, description, for: forWhom }, ...todoTasks];

    renderTasks(todoTasks, finishedTasks);
    inputTitleElement.value = "";
    inputDescriptionElement.value = "";
    inputForElement.value = "";
};

const addTaskListenerForInput = (event) => {
    if (event.key == "Enter") {
        addTask();
    }
};

const handleDoIt = (event) => {
    const index = +event.target.dataset.index;

    const inputElement = document.querySelector(
        `.doItInput[data-index="${index}"]`
    );
    const completeElement = {
        title: todoTasks[index].title,
        description: todoTasks[index].description,
        for: todoTasks[index].for,
        complete_name: inputElement.value,
    };
    todoTasks.splice(index, 1);
    finishedTasks = [completeElement, ...finishedTasks];

    renderTasks(todoTasks, finishedTasks);
};

const handleRestore = (event) => {
    const index = event.target.dataset.index;
    const task = finishedTasks.splice(index, 1)[0];

    todoTasks = [task, ...todoTasks];

    renderTasks(todoTasks, finishedTasks);
};

const handleDeleteFinished = (event) => {
    const index = event.target.dataset.index;
    finishedTasks.splice(index, 1);
    renderTasks(todoTasks, finishedTasks);
};

const handleDeleteTodo = (event) => {
    const index = event.target.dataset.index;
    todoTasks.splice(index, 1);
    renderTasks(todoTasks, finishedTasks);
};

const loadInitialData = () => {
    startLoading();

    fetch(`${API_URL}/todo`)
        .then((resp) => resp.json())
        .then((data) => {
            todoTasks = data.todoTasks;
            finishedTasks = data.finishedTasks;

            renderTasks(todoTasks, finishedTasks, true);
        });
};

addBtnElement.addEventListener("click", addTask);

inputTitleElement.addEventListener("keydown", addTaskListenerForInput);
inputDescriptionElement.addEventListener("keydown", addTaskListenerForInput);
inputForElement.addEventListener("keydown", addTaskListenerForInput);

loadInitialData();
