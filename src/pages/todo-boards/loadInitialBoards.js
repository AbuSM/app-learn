import { API_URL } from "../../constants";
import { endLoading, startLoading } from "../todo/loader";

export default async () => {
    startLoading();
    await fetch(`${API_URL}/boards`)
        .then((resp) => resp.json())
        .then((data) => {
            window.boards = data;
            endLoading();
        });
};
