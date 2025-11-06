import { API_URL } from "./../../constants.js";
import { renderTasks } from "./render/renderTasks.js";
import "./style.css";
import { startLoading } from "./loader.js";
import "../../assets/index.js";

export let tasks = [];
export let dragData = { current: {} };
export let taskData = { lastAdded: undefined };
export let controller = { controller: new AbortController() };
window.taskHistory = JSON.parse(
    !!localStorage.getItem("taskHistory") ? localStorage.getItem("taskHistory") : "[]"
);

export const loadInitialData = () => {
    startLoading();
    fetch(`${API_URL}/todo`)
        .then((resp) => resp.json())
        .then((data) => {
            tasks = data;
            renderTasks(tasks, true);
        });
};

loadInitialData();
