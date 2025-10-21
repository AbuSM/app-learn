import { API_URL } from "./../../constants.js";
import { renderTasks } from "./renderTasks.js";
import "./style.css";
import { startLoading } from "./loader.js";

export let tasks = [];

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
