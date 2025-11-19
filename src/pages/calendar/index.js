import { initCalendar } from "./calendar";

class PageCalendar extends HTMLElement {
	connectedCallback() {
		this.innerHTML = /*html*/ `
        <h1 class="text-gray-700 ml-12 mt-6 text-3xl font-semibold">Calendar</h1>
        <div class="calendar bg-white border border-gray-200 rounded-lg m-8 shadow-sm">
            <div class="head flex justify-between p-6 border-b border-gray-100">
                <div class="flex gap-2 items-center">
                    <button id="prev-month" class="w-10 h-10 rounded-md bg-white border border-gray-200 hover:bg-gray-100 cursor-pointer flex items-center justify-center text-gray-600 font-medium transition-colors">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
                        </svg>
                    </button>
                    <button id="next-month" class="w-10 h-10 rounded-md bg-white border border-gray-200 hover:bg-gray-100 cursor-pointer flex items-center justify-center text-gray-600 font-medium transition-colors">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                        </svg>
                    </button>
                    <button id="add-event-btn" class="h-10 rounded-md bg-blue-600 hover:bg-blue-700 px-4 text-white cursor-pointer font-medium transition-colors text-sm">Add Event +</button>
                </div>

                <div class="flex items-center text-2xl font-semibold text-gray-800">
                    <h1 id="month-year"></h1>
                </div>

                <div class="relative bg-gray-100 rounded-lg p-1 flex gap-1 items-center w-fit">
                    <div id="slider" class="absolute top-1 left-1 w-[calc(33.333%-4px)] h-[34px] bg-white rounded-md transition-all duration-300 shadow-sm"></div>
                    <div id="month-btn" class="relative z-10 text-center px-4 cursor-pointer font-medium text-sm text-gray-600 hover:text-gray-900 transition-colors py-2">month</div>
                    <div id="week-btn" class="relative z-10 text-center px-4 cursor-pointer font-medium text-sm text-gray-600 hover:text-gray-900 transition-colors py-2">week</div>
                    <div id="day-btn" class="relative z-10 text-center px-4 cursor-pointer font-medium text-sm text-gray-600 hover:text-gray-900 transition-colors py-2">day</div>
                </div>
            </div>

            <div id="month-view">
                <div class="grid grid-cols-7 bg-gray-50 text-center font-medium text-gray-400 text-xs uppercase tracking-wide">
                    <div class="py-3 border-b border-r border-gray-100">Mon</div>
                    <div class="py-3 border-b border-r border-gray-100">Tue</div>
                    <div class="py-3 border-b border-r border-gray-100">Wed</div>
                    <div class="py-3 border-b border-r border-gray-100">Thu</div>
                    <div class="py-3 border-b border-r border-gray-100">Fri</div>
                    <div class="py-3 border-b border-r border-gray-100">Sat</div>
                    <div class="py-3 border-b border-gray-100">Sun</div>
                </div>
                <div id="days" class="grid grid-cols-7"></div>
            </div>

            <div id="week-view" class="hidden">
                <div id="week-header" class="grid grid-cols-8 bg-gray-50 text-center font-medium text-gray-400 text-xs uppercase tracking-wide border-b border-gray-100">
                </div>
                <div class="bg-white">
                    <div class="flex border-b border-gray-100">
                        <div class="w-20 text-xs text-gray-400 py-2 pr-2 text-right">all-day</div>
                        <div class="flex-1 grid grid-cols-7 border-l border-gray-100">
                            <div class="border-r border-gray-100"></div>
                            <div class="border-r border-gray-100"></div>
                            <div class="border-r border-gray-100"></div>
                            <div class="border-r border-gray-100"></div>
                            <div class="border-r border-gray-100"></div>
                            <div class="border-r border-gray-100"></div>
                            <div class="border-r border-gray-100"></div>
                        </div>
                    </div>
                    <div id="week-grid" class="overflow-y-auto max-h-[600px]"></div>
                </div>
            </div>

            <div id="day-view" class="hidden">
                <div id="day-header" class="bg-gray-50 text-gray-400 text-xs uppercase tracking-wide border-b border-gray-100 py-3 px-4 font-medium"></div>
                <div class="bg-white">
                    <div class="flex border-b border-gray-100">
                        <div class="w-20 text-xs text-gray-400 py-2 pr-2 text-right">all-day</div>
                        <div class="flex-1 border-l border-gray-100"></div>
                    </div>
                    <div id="day-grid" class="overflow-y-auto max-h-[600px]"></div>
                </div>
            </div>
        </div>
        `;

		initCalendar();
	}
}

customElements.define("page-calendar", PageCalendar);
