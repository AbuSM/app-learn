import { API_URL } from "../../constants";

export const pushToServer = (tasks) => {
    fetch(`${API_URL}/todo`, {
        method: "PATCH",
        headers: {
            Accept: "application/json",
            "X-GitHub-Api-Version": "2022-11-28",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            data: tasks,
        }),
    }).then((resp) => resp.json());
};
