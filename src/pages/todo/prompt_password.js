export default function promptPassword(title) {
    return new Promise((resolve) => {
        const backdrop = document.createElement("div");
        backdrop.className = "prompt loader_backdrop";

        backdrop.innerHTML = `
            <div class="stop_propagation">
                <div class="bg-white p-3 rounded">
                    <h3 class="text-neutral-700">${title}</h3>
                    <input type="password" autofocus></input>
                    <div class="justify-end pr-3 pt-2 flex gap-2">
                        <button class="cancel_btn bg-[var(--primary)] rounded p-1 hover:brightness-95 active:brightness-90 hover:cursor-pointer">Cancel</button>
                        <button class="ok_btn bg-[var(--primary)] rounded p-1 hover:brightness-95 active:brightness-90 hover:cursor-pointer">OK</button>
                    </div>
                </div>
            </div>
        `;

        document.body.appendChild(backdrop);
        const passwordInput = document.querySelector(`input[type="password"]`);
        const okBtn = document.querySelector(`.ok_btn`);
        const cancelBtn = document.querySelector(`.cancel_btn`);

        passwordInput.focus();
        const onOk = () => {
            backdrop.outerHTML = "";
            resolve(passwordInput.value);
        };
        const onCancel = () => {
            backdrop.outerHTML = "";
            resolve(null);
        };

        passwordInput.addEventListener("keydown", (event) => {
            if (event.key == "Enter") {
                onOk();
            }
        });
        okBtn.addEventListener("click", onOk);
        cancelBtn.addEventListener("click", onCancel);

        document.body.addEventListener("keydown", (event) => {
            if (event.key == "Escape") {
                onCancel();
            }
        });

        backdrop.addEventListener("click", () => {
            onCancel();
        });
        document
            .querySelector(".stop_propagation")
            .addEventListener("click", (event) => {
                event.stopPropagation();
            });
    });
}
