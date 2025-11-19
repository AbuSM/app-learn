import { pushToServer } from "../pushServer.js";
import { endLoading } from "../loader.js";
import {
    initGlobalHandlers,
    initDocumentListeners,
} from "../listeners/listeners.js";
import { controller } from "../script.js";
import renderHistory from "./renderHistory.js";

export function addEventToHistory(title, icon = "history-edit-icon") {
    window.taskHistory.push({ title, icon });
    if (window.taskHistory.length > 100) {
        window.taskHistory.splice(0, 1);
    }
    localStorage.setItem("taskHistory", JSON.stringify(window.taskHistory));
    renderHistory();
}

export const renderTasks = (tasks, isInitial = false) => {
    let htmlDataLists = "";
    const taskListsElement = document.querySelector(".task-lists");

    tasks.forEach((element, listIndex) => {
        let htmlDataTasks = "";

        element.tasks.forEach((task, taskIndex) => {
            const dateBadge = `<date-badge date="${task.date}" completed="${task.completed}"></date-badge>`;
            htmlDataTasks += /*html*/ `
        <li 
          draggable="true" 
          data-list-index="${listIndex}" 
          data-task-index="${taskIndex}" 
          class="hover:cursor-pointer gap-2 transition-all [&.draggable]:opacity-50 [&.droppable]:border-[var(--primary)] task border-2 flex items-center justify-between border-[var(--border-gray)] p-3 shadow rounded-xl" 
          ondragstart="window.onDragStart(event)" 
          ondragend="window.onDragEnd(event)" 
          ondragenter="window.onTaskDragEnter(event)" 
          ondragleave="window.onTaskDragLeave(event)" 
          ondragover="window.onTaskDragOver(event)" 
          ondrop="window.onTaskDrop(event)" 
          onclick="window.onTaskClick(event)"
        >
          <div class="flex flex-col gap-2 items-start">
            <div class="title ${task.completed ? "line-through" : ""}">${
                task.title
            }</div>
            ${task.date ? dateBadge : ""}
          </div>
          <div>
            <input
              ${task.completed ? "checked" : ""} 
              class="hover:cursor-pointer completeCheckbox focus:ring-0" 
              type="checkbox" 
              onclick="window.onCompleteCheckboxClick(event)"
            >
          </div>
        </li>
      `;
        });

        htmlDataLists += /*html*/ `
      <ul
        draggable="true"    
        data-list-index="${listIndex}" 
        class="list max-h-full w-[250px] [&.draggable]:opacity-50 gap-2 transition-all [&.droppable]:border-[var(--primary)] bg-white flex min-w-[var(--card-width)] flex-col shadow border-2 border-[var(--border-gray)] rounded-xl p-3" 
        ondragstart="window.onListDragStart(event)" 
        ondragend="window.onListDragEnd(event)"
      >
        <li 
          class="listHeading hover:cursor-pointer h-[50px] -m-3 p-3 -mb-2 pb-2 flex justify-between items-center" 
          ondragenter="window.onListHeadingDragEnter(event)" 
          ondragleave="window.onListHeadingDragLeave(event)" 
          ondragover="window.onListHeadingDragOver(event)" 
          ondrop="window.onListHeadingDrop(event)" 
        >
          <h3 onclick="window.onListHeadingClick(event)" class="w-full ml-2 text-xl font-bold">${element.title}</h3>
          <div class="menuBox hover:cursor-pointer relative transition-all p-[4px]">
            <ellipsis-icon 
              class="menuIcon flex transition-all active:scale-80" 
              onclick="window.onMenuIconClick(event)"
            ></ellipsis-icon>
          </div>
        </li>
        <ul onscroll="window.onTaskListScroll(event)" ondragover="window.onTaskListDragOver(event)" ondragleave="window.onTaskListDragLeave(event)" class="flex scrollbar-none overflow-auto flex-col gap-2">
            ${htmlDataTasks}
            <li>    
              <button 
                data-list-index="${listIndex}" 
                class="addTask flex gap-1.5 items-center w-full border-2 border-[var(--border-gray)] rounded-xl px-3 py-1 shadow bg-neutral-100 hover:cursor-pointer hover:bg-neutral-200 transition-all" 
                onclick="window.onAddTaskClick(event)"
              >
                 <add-task-icon></add-task-icon>Добавить задачу
              </button>
            </li>
        </ul>
      </ul>
    `;
    });

    htmlDataLists += /*html*/ `
    <div class="add_list">
      <button 
        class="add-list-button flex gap-1.5 items-center border-[var(--border-gray)] w-[var(--card-width)] border-2 rounded-xl px-3 py-1 shadow bg-neutral-100 hover:cursor-pointer hover:bg-neutral-200 transition-all" 
        onclick="window.onAddListClick(event)"
      >
         <add-task-icon></add-task-icon>Добавить список
      </button>
    </div>
  `;

    function addScrollTopToLists() {
        const listElements = document.querySelectorAll(".list ul");
        for (let index = 0; index < tasks.length; index++) {
            if (tasks[index].scrollTop) {
                listElements[index].scrollTop = tasks[index].scrollTop;
            }
        }
    }

    (() => {
        controller.controller.abort();
        controller.controller = new AbortController();
        taskListsElement.innerHTML = htmlDataLists;
        initGlobalHandlers();
        initDocumentListeners();
        addScrollTopToLists();
        endLoading();
    })();

    if (isInitial) {
        return;
    }

    pushToServer(tasks);
};
