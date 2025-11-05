// `<span class="bg-blue-100 text-blue-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-blue-900 dark:text-blue-300">Default</span>`;
// `<div class="flex text-sm items-center gap-1">
//               <date-icon></date-icon>
//               <div class="text-[var(--gray)]">${task.date}</div>
// </div>`;

import getToday from "../../api/getToday";

const getDaysDifferent = (day1, day2) => {
    const dayMilliseconds1 = new Date(day1);
    const dayMilliseconds2 = new Date(day2);

    const diff = dayMilliseconds1 - dayMilliseconds2;

    return diff / (1000 * 60 * 60 * 24);
};

const getFormattedDate = (date) => {
    const months = {
        "01": "Янв",
        "02": "Февр",
        "03": "Март",
        "04": "Апр",
        "05": "Май",
        "06": "Июнь",
        "07": "Июль",
        "08": "Авг",
        "09": "Сент",
        10: "Окт",
        11: "Нояб",
        12: "Дек",
    };

    const month = date.split("-")[1];
    const day = date.split("-")[2];
    const year = date.split("-")[0];

    return `${day} ${months[month]}. ${year}`;
};

class DateBadge extends HTMLElement {
    connectedCallback() {
        const date = this.getAttribute("date");
        const completed = this.getAttribute("completed");
        const today = getToday();

        const dayDiff = getDaysDifferent(date, today);

        const formattedDate = getFormattedDate(date);

        this.innerHTML = "";
        if (!!date) {
            if (completed == "true") {
                this.innerHTML = `<span class="bg-green-100 text-green-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full">${formattedDate}</span>`;
            } else if (dayDiff <= 0) {
                this.innerHTML = `<span class="bg-red-100 text-red-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full">${formattedDate}</span>`;
            } else if (dayDiff >= 3) {
                this.innerHTML = `<span class="bg-blue-100 text-blue-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full">${formattedDate}</span>`;
            } else {
                this.innerHTML = `<span class="bg-yellow-100 text-yellow-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full">${formattedDate}</span>`;
            }
        }
    }
}
customElements.define("date-badge", DateBadge);
