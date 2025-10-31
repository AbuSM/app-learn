import { pushToServer } from "../pushServer.js";
import { endLoading } from "../loader.js";
import { addListeners } from "../listeners/listeners.js";
import { controller } from "../script.js";

export const renderTasks = (tasks, isInitial = false) => {
    let htmlDataLists = "";

    const taskListsElement = document.querySelector(".task-lists");

    tasks.forEach((element, listIndex) => {
        let htmlDataTasks = "";
        element.tasks.forEach((task, taskIndex) => {
            htmlDataTasks += /*html*/ `
                <li draggable="true" data-list-index="${listIndex}" data-task-index="${taskIndex}" class="hover:cursor-pointer transition-all [&.draggable]:opacity-50 [&.droppable]:border-[var(--primary)] task border-2 flex items-center justify-between border-[var(--border-gray)] p-3 shadow rounded-xl">
                    <div class="flex flex-col gap-2 items-start">
                        <div class="title ${
                            task.completed && "line-through"
                        }" >${task.title}</div>
                        <div class="flex text-sm items-center gap-1">
                            <date-icon></date-icon>
                            <div class="text-[var(--gray)]">${task.date}</div>
                        </div>
                    </div>
                    <div><input ${
                        task.completed && "checked"
                    } class="hover:cursor-pointer completeCheckbox focus:ring-0" type="checkbox" name="" id=""></div>
                </li>
                `;
        });
        htmlDataLists += /*html*/ `
            <ul draggable="true" data-list-index="${listIndex}" class="list [&.draggable]:opacity-50 gap-2 transition-all [&.droppable]:border-[var(--primary)] bg-white flex min-w-[var(--card-width)] flex-col shadow border-2 border-[var(--border-gray)] rounded-xl p-3">
                <li class="listHeading hover:cursor-pointer h-[50px] -m-3 p-3 -mb-2 pb-2 flex justify-between items-center">
                    <h3 class="ml-2 text-xl font-bold">${element.title}</h3>
                    <div class="menuBox hover:cursor-pointer relative transition-all p-[4px]"><ellipsis-icon class="menuIcon flex transition-all active:scale-80"></ellipsis-icon></div>
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

    htmlDataLists += /*html*/ `
            <div class="add_list">
                <button class="add-list-button border-[var(--border-gray)] w-[var(--card-width)] border-2 rounded-xl px-3 py-1 shadow bg-neutral-100 hover:cursor-pointer hover:bg-neutral-200 transition-all">+ Add another list</button>
            </div>`;

    (() => {
        taskListsElement.innerHTML = htmlDataLists;

        controller.controller.abort();

        addListeners();
        endLoading();
    })();

    if (isInitial) {
        return;
    }

    pushToServer(tasks);
};
