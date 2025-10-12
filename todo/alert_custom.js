export default function alert(message) {
    const backdrop = document.createElement("div");
    backdrop.className = "loader_backdrop";

    backdrop.innerHTML = `
            <div class="stop_propagation">
                <div class="bg-white p-3 rounded">
                    <h3 class="text-neutral-700">${message}</h3>
                    <div class="justify-end pr-3 pt-2 flex gap-2">
                        <button class="ok_btn bg-[var(--primary)] rounded p-1 hover:brightness-95 active:brightness-90 hover:cursor-pointer">OK</button>
                    </div>
                </div>
            </div>
        `;

    document.body.appendChild(backdrop);

    const okBtn = document.querySelector(`.ok_btn`);

    const onOk = () => {
        backdrop.outerHTML = "";
    };

    okBtn.addEventListener("click", onOk);

    document.body.addEventListener("keydown", (event) => {
        if (event.key == "Escape" || event.key == 'Enter') {
            onOk();
        }
    });

    backdrop.addEventListener("click", () => {
        onOk();
    });
    document
        .querySelector(".stop_propagation")
        .addEventListener("click", (event) => {
            event.stopPropagation();
        });
}
