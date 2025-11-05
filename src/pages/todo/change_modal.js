import getDOMElement from "../../api/getDOMElement";
import { toggleRedBorder } from "./toggleRedBorder";

export default function changeModal(task) {
    return new Promise((resolve) => {
        const modalElement = getDOMElement(/*html*/ `
                    <div class="loader_backdrop">
                        <div class="stop_propagation lg:w-[800px] md:w-[600px] sm:w-[400px] w-[250px]">
                            <div class="flex flex-col rounded bg-white p-5">
                                <div class="flex justify-between">
                                    <h2 class="text-2xl font-bold">Edit Card</h2>
                                    <button class="deleteBtn px-3 py-1.5 bg-red-500 text-white rounded-lg hover:cursor-pointer hover:brightness-90 active:brightness-95">Delete</button>
                                </div>
                                <div class="mt-5 flex gap-3 items-start flex-wrap">
                                    <div class="flex w-full gap-2 flex-wrap">
                                        <input placeholder="Title" class="title flex-3 min-w-0 w-full px-3 border-[var(--border-gray)] py-1 rounded border-2 focus:ring-0 focus:border-[var(--primary)]" type="text" value="${task.title}">
                                        <input type="date" class="date min-w-[200px] flex-1 w-full px-3 border-[var(--border-gray)] py-1 rounded border-2 focus:ring-0 focus:border-[var(--primary)]" value="${task.date}">
                                    </div>
                                    <textarea rows="5" placeholder="Description" class="description min-w-0 w-full px-3 border-[var(--border-gray)] py-1 rounded border-2 focus:ring-0 focus:border-[var(--primary)]">${task.description}</textarea>
                                </div>
                                <div class="flex justify-end gap-2 mt-3">
                                    <button class="cancelBtn px-3 py-1.5 border-2 border-[var(--border-gray)] rounded-lg hover:cursor-pointer hover:brightness-80 active:brightness-70">Cancel</button>
                                    <button class="saveBtn px-3 py-1.5 bg-[var(--primary)] text-white rounded-lg hover:cursor-pointer  hover:brightness-[90%] active:brightness-95">Save</button>
                                </div>
                            </div>
                        </div>
                    </div>
                `);

        document.body.appendChild(modalElement);

        const titleInput = modalElement.querySelector(".title");
        const descriptionInput = modalElement.querySelector(".description");
        const dateInput = modalElement.querySelector(".date");

        titleInput.focus();
        titleInput.setSelectionRange(
            titleInput.value.length,
            titleInput.value.length
        );
        titleInput.addEventListener("input", (event) => {
            toggleRedBorder(event.target, !event.target.value.length);
        });

        const cancelBtn = modalElement.querySelector(".cancelBtn");
        const saveBtn = modalElement.querySelector(".saveBtn");
        const deleteBtn = modalElement.querySelector(".deleteBtn");

        const onCancel = () => {
            resolve(task);
            modalElement.remove();
        };
        const onSave = () => {
            if (!!titleInput.value.length) {
                resolve({
                    ...task,
                    title: titleInput.value,
                    description: descriptionInput.value,
                    date: dateInput.value,
                });
                modalElement.remove();
            } else {
                toggleRedBorder(titleInput, true);
            }
        };
        const onDelete = () => {
            resolve({
                isDelete: true,
            });
            modalElement.remove();
        };

        deleteBtn.addEventListener("click", () => {
            onDelete();
        });

        cancelBtn.addEventListener("click", () => {
            onCancel();
        });
        saveBtn.addEventListener("click", () => {
            onSave();
        });

        const inputElements = modalElement.querySelectorAll("input,textarea");
        inputElements.forEach((element) => {
            element.addEventListener("keydown", (event) => {
                if (event.key == "Enter") {
                    onSave();
                }
            });
        });
        document.addEventListener("keydown", (event) => {
            if (event.key == "Escape") {
                onCancel();
            }
        });

        modalElement.addEventListener("click", () => {
            onCancel();
        });
        document
            .querySelector(".stop_propagation")
            .addEventListener("click", (event) => {
                event.stopPropagation();
            });
    });
}
