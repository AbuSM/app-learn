import { renderTasks } from "./render/renderTasks.js";
import "./style.css";
import "../../assets/index.js";
import renderHistory from "./render/renderHistory.js";
import loadInitialTasks from "./loadInitialTasks.js";
import renderLayout from "./render/renderLayout.js";

console.log(window.todo);
console.log(window.todoID);

// export let tasks = window.todo[window.todoID];
export let tasks = [];
export let dragData = { current: {} };
export let taskData = { lastAdded: undefined };
export let controller = { controller: new AbortController() };
window.taskHistory = JSON.parse(
    !!localStorage.getItem("taskHistory")
        ? localStorage.getItem("taskHistory")
        : "[]"
);

(async () => {
    console.log("tasks: ", tasks);

    await renderLayout();
    tasks = window.tasks;
    renderHistory();
    renderTasks(tasks);
})();

// (async () => {
//     await changeModal({ title: "njdkjas", description: "das", date: "" });
// })();
