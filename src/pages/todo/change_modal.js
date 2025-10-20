import getDOMElement from "../../api/getDOMElement";

export default function changeModal(title, description, date) {
    return new Promise((resolve) => {
        const modalElement = getDOMElement(`
                    <div class="loader_backdrop">
                        <div class="flex flex-col rounded bg-white p-5">
                            <h2 class="text-2xl font-bold">Edit Card</h2>
                            <div class="mt-5 flex gap-3 items-start flex-wrap">
                                <input placeholder="Title" class="title min-w-0 w-full px-3 border-[var(--border-gray)] py-1 rounded border-2 focus:ring-0 focus:border-[var(--primary)]" type="text" value="${title}">
                                <textarea placeholder="Description" class="description min-w-0 w-full px-3 border-[var(--border-gray)] py-1 rounded border-2 focus:ring-0 focus:border-[var(--primary)]">${description}</textarea>
                                <input type="date" class="date min-w-0 w-full px-3 border-[var(--border-gray)] py-1 rounded border-2 focus:ring-0 focus:border-[var(--primary)]" value="${date}">
                            </div>
                            <div class="flex justify-end gap-2 mt-3">
                                <button class="cancelBtn px-3 py-1.5 border-2 border-[var(--border-gray)] rounded-lg hover:cursor-pointer hover:brightness-80 active:brightness-70">Cancel</button>
                                <button class="saveBtn px-3 py-1.5 bg-[var(--primary)] text-white rounded-lg hover:cursor-pointer  hover:brightness-[90%] active:brightness-95">Save</button>
                            </div>
                        </div>
                    </div>
                `);

        document.body.appendChild(modalElement);

        const titleInput = modalElement.querySelector(".title");
        const descriptionInput = modalElement.querySelector(".description");
        const dateInput = modalElement.querySelector(".date");

        const cancelBtn = modalElement.querySelector(".cancelBtn");
        const saveBtn = modalElement.querySelector(".saveBtn");

        const onCancel = () => {
            resolve({ title, date, description });
            modalElement.remove();
        };
        const onSave = () => {
            resolve({
                title: titleInput.value,
                description: descriptionInput.value,
                date: dateInput.value,
            });
            modalElement.remove();
        };

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
    });
}
