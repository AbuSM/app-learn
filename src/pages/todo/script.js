import getDOMElement from "../../api/getDOMElement.js";
import { API_URL, PASSWORD } from "./../../constants.js";
import alert from "./alert_custom.js";
import { hashing } from "./hashing.js";
import promptPassword from "./prompt_password.js";

const loader = document.querySelector(".loader_backdrop");
// const todoTasksElement = document.querySelector(".tasks");
// const finishedTasksElement = document.querySelector(".finished");
const taskListsElement = document.querySelector(".task-lists");
const addBtnElement = document.querySelector(".add_container .btn");
const inputTitleElement = document.querySelector("#input_title");
const inputDescriptionElement = document.querySelector("#input_description");
const inputForElement = document.querySelector("#input_for_whom");

const toggleRedBorder = (element, toggleState) => {
    element.classList.toggle("border-red-600", toggleState);
    element.classList.toggle("focus:border-red-600", toggleState);
};

let tasks = {};

const checkIsAdmin = async (func) => {
    const password = await promptPassword(`Enter Admin Password:`);

    if (!!password && hashing(password) == PASSWORD) {
        func();
    } else if (password != null) {
        alert("Incorrect password!");
    }
};

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

        const inputElements = document.querySelectorAll(`input[type="text"]`);
        inputElements.forEach((element) => {
            element.addEventListener("input", (event) => {
                toggleRedBorder(event.target, !event.target.value);
            });
        });

        const tasksElement = document.querySelectorAll(".task");
        tasksElement.forEach((element) => {
            element.addEventListener("dragstart", (event) => {
                // if (event.target.classList.)
                console.log(event.target);

                event.target.classList.toggle("selected", true);
                event.dataTransfer.setData("text", event.target.outerHTML);
            });
            element.addEventListener("dragend", (event) => {
                event.target.classList.toggle("selected", false);
            });
            const dragHandleCondition = (event, dragElement, func) => {
                event.preventDefault();
                const draggable = getDOMElement(
                    event.dataTransfer.getData("text")
                );

                const dropIndex = dragElement.dataset.index;
                const draggableIndex = draggable.dataset.index;

                if (
                    dragElement.dataset.type == draggable.dataset.type &&
                    draggableIndex != dropIndex
                ) {
                    func();
                }
            };
            element.addEventListener("dragover", (event) => {
                const dragElement = event.target.closest(".task");
                dragHandleCondition(event, dragElement, () => {
                    console.log("hello");

                    dragElement.classList.toggle("hover-drag", true);
                });
            });
            element.addEventListener("dragleave", (event) => {
                const dragElement = event.target.closest(".task");
                dragHandleCondition(event, dragElement, () => {
                    dragElement.classList.toggle("hover-drag", false);
                });
            });

            element.addEventListener("drop", (event) => {
                event.stopPropagation();
                event.preventDefault();

                const draggable = getDOMElement(
                    event.dataTransfer.getData("text")
                );

                const dragElement = event.target.closest(".task");

                const dropIndex = dragElement.dataset.index;
                const draggableIndex = draggable.dataset.index;

                if (
                    dragElement.dataset.type == draggable.dataset.type &&
                    draggableIndex != dropIndex
                ) {
                    if (dragElement.dataset.type == "todo") {
                        const temp = todoTasks[dropIndex];
                        todoTasks[dropIndex] = todoTasks[draggableIndex];
                        todoTasks[draggableIndex] = temp;
                    } else {
                        const temp = finishedTasks[dropIndex];
                        finishedTasks[dropIndex] =
                            finishedTasks[draggableIndex];
                        finishedTasks[draggableIndex] = temp;
                    }

                    renderTasks(todoTasks, finishedTasks);
                }
            });
        });

        const noneToDrag = document.querySelectorAll(`.notDrag:not(.task)`);
        noneToDrag.forEach((element) => {
            console.log(element);

            element.addEventListener("dragstart", (event) => {
                event.preventDefault();
            });
        });
    }, 0);
}

const startLoading = () => {
    loader.style.display = "flex";
};
const endLoading = () => {
    loader.style.display = "none";
};

const renderTasks = (tasks, isInitial = false) => {
    // const htmlDataTasks = todoTasks
    //     .map(
    //         (item, index) =>
    //             `<div class="task flex items-center p-3 justify-between rounded [&.selected]:opacity-[50%] [&.hover-drag]:border-[var(--primary)] border-2 transition-all" data-index="${index}" data-type="todo" draggable="true">
    //                 <div class="flex gap-3 items-center">
    //                     <img data-index="${index}" title="delete" class="notDrag delete-from-todo h-7 w-7 p-0.5 hover:bg-white/10 hover:cursor-pointer rounded active:bg-white/20" src='/assets/delete.svg'></img>
    //                     <div class="flex flex-col items-start">
    //                         <h3>${item.title}</h3>
    //                         <p class="text-sm">For: ${item.for}</p>
    //                         <p class="text-xs font-[400] text-start">${item.description}</p>
    //                     </div>
    //                 </div>
    //                 <div draggable="true" class="flex gap-2 notDrag input_name_cont">
    //                     <input class="focus:outline-none border-2 rounded focus:border-[var(--primary)] doItInput" data-index="${index}" type="text" placeholder="Name" />
    //                     <button data-index="${index}" class="btn doit">Do It</button>
    //                 </div>
    //             </div>`
    //     )
    //     .join("");

    // const htmlDataFinished = finishedTasks
    //     .map(
    //         (item, index) =>
    //             `<div class="flex items-center justify-between p-3 task rounded [&.selected]:opacity-[50%] [&.hover-drag]:border-[var(--primary)] border-2 transition-all" data-index="${index}" data-type="finished" draggable="true" title="For: ${item.for}, ${item.description}" >
    //                 <div class="flex gap-3 items-center">
    //                     <div class="notDrag flex">
    //                         <img draggable="true" data-index="${index}" title="restore" class="restore h-7 w-7 p-0.5 hover:bg-white/10 hover:cursor-pointer rounded active:bg-white/20" src='/assets/restore.svg'></img>
    //                         <img draggable="true" data-index="${index}" title="delete" class="delete-from-finished h-7 w-7 p-0.5 hover:bg-white/10 hover:cursor-pointer rounded active:bg-white/20" src='/assets/delete.svg'></img>
    //                     </div>
    //                     <h3 class="title">${item.title}</h3>
    //                 </div>
    //                 <h3>${item.complete_name}</h3>
    //             </div>`
    //     )
    //     .join("");

    // /*
    tasks = [
        {
            title: "Табрик",
            tasks: [
                {
                    title: "Hello",
                    description: "Tabrik",
                    isDone: true,
                },
                {
                    title: "Hello2",
                    description: "Tabrikiston",
                    isDone: false,
                },
            ],
        },
    ];
    // */

    let htmlDataLists = "";

    tasks.forEach((element) => {
        let htmlDataTasks = "";
        element.tasks.forEach((task) => {
            htmlDataTasks += `
                <div>${task.title}</div>
            `;
        });
        htmlDataLists += `
            <div class="flex">
                ${htmlDataTasks}
            </div>
        `;
    });

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
    }).then((resp) => resp.json());
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

    if (!inputElement.value) {
        toggleRedBorder(inputElement, true);
        return;
    }

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
            tasks = data;

            renderTasks(tasks, true);
        });
};

addBtnElement.addEventListener("click", addTask);

inputTitleElement.addEventListener("keydown", addTaskListenerForInput);
inputDescriptionElement.addEventListener("keydown", addTaskListenerForInput);
inputForElement.addEventListener("keydown", addTaskListenerForInput);

// loadInitialData();
