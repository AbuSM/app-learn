import { API_URL } from "../../constants";
import { endLoading, startLoading } from "./loader";

export default async () => {
    startLoading();
    await fetch(`${API_URL}/board/${window.boardID}`)
        .then((resp) => resp.json())
        .then((data) => {
            window.tasks = data.lists;
            window.boardTitle = data.title;
            endLoading();
        });
};
