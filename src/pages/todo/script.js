import { API_URL } from "./../../constants.js";
import { renderTasks } from "./renderTasks.js";
import "./style.css";
import { startLoading } from "./loader.js";
import "./deleteIcon.js";

export let tasks = [];
export let dragData = {current: {}};

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
