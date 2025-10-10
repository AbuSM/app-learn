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
            element.addEventListener("click", doIt);
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
            <h3>${item.title}</h3>
            <div class="input_name_cont">
            <input type="text" placeholder="Name" id="" />
            <button data-index="${index}" class="btn doit">Do It</button>
            </div>
        </div>`
        )
        .join("");

    const htmlDataFinished = finishedTasks
        .map(
            (item) =>
                `<div title="${item.description}" class="container">
            <h3 class="title">${item.title}</h3>
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
    setTimeout(() => {
        render();
    }, 300);
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

addBtnElement.addEventListener("click", addTask);

inputTitleElement.addEventListener("keydown", addTaskListenerForInput);
inputDescriptionElement.addEventListener("keydown", addTaskListenerForInput);
inputForElement.addEventListener("keydown", addTaskListenerForInput);

const doIt = (event) => {
    const index = +event.target.dataset.index;
    const completeElement = {
        title: todoTasks[index].title,
        description: todoTasks[index].description,
        complete_name: event.target.previousElementSibling.value,
    };
    todoTasks.splice(index, 1);
    finishedTasks = [completeElement, ...finishedTasks];

    renderTasks(todoTasks, finishedTasks);
};

const loadInitialData = () => {
    todoTasks = [
        {
            title: "Hello",
            description: "Dont to this",
            for: "muhammad",
        },
        {
            title: "Hello",
            description: "Dont to this",
            for: "muhammad",
        },
        {
            title: "Hello",
            description: "Dont to this",
            for: "muhammad",
        },
    ];
    finishedTasks = [
        {
            title: "Hello",
            description: "Dont to this",
            complete_name: "muhammad",
        },
        {
            title: "Hello",
            description: "Dont to this",
            complete_name: "muhammad",
        },
        {
            title: "Hello",
            description: "Dont to this",
            complete_name: "muhammad",
        },
    ];

    renderTasks(todoTasks, finishedTasks, true);
};

loadInitialData();
