import { API_URL } from "./../../constants.js";
import changeModal from "./change_modal.js";
import getToday from "../../api/getToday.js";
import { renderTasks } from "./renderTasks.js";
import "./style.css";
import { endLoading, startLoading } from "./loader.js";

let loader = document.querySelector(".loader_backdrop");
const inputTitleElement = document.querySelector("#input_title");
const inputDescriptionElement = document.querySelector("#input_description");
const inputForElement = document.querySelector("#input_for_whom");

const toggleRedBorder = (element, state) => {
    element.classList.toggle("border-red-600", state);
    element.classList.toggle("focus:border-red-600", state);
};

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
