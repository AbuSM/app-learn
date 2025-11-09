import {
    initCalendar
} from './calendar';





class PageCalendar extends HTMLElement {
    connectedCallback() {

        this.innerHTML = /*html*/ `
        <ui-modal id="static-modal"></ui-modal>
        <h1 class="text-gray-500 ml-12 mt-6 text-3xl">Calendar</h1>
        <div class="calendar border border-gray-200 rounded-md m-8">
            <div class="head flex justify-between p-6">
                <div class="flex gap-2 items-center ml-6">
                    <button id="prev-month" class="w-10 h-10 rounded-md bg-white border border-gray-200 hover:bg-gray-200 cursor-pointer">&lt;</button>
                    <button id="next-month" class="w-10 h-10 rounded-md bg-white border border-gray-200 hover:bg-gray-200 cursor-pointer">&gt;</button>
                    <button class="w-auto h-10 rounded-md bg-blue-600 hover:bg-blue-700 px-3 text-white cursor-pointer">Add Event +</button>
                </div>
        
                <div class="oct flex items-center text-2xl font-semibold">
                    <h1 id="month-year"></h1>
                </div>
        
                <div class="relative bg-gray-200 rounded-md mr-5 p-1.5 flex gap-2 items-center w-[270px]">
                    <div id="slider" class="absolute  top-1 left-1 w-[80px] h-[34px] bg-white rounded-md transition-all duration-300 "></div>
                    <div id="month-btn" class="relative z-10 text-center w-[80px] cursor-pointer font-semibold">Month</div>
                    <div id="week-btn" class="relative z-10 text-center w-[80px] cursor-pointer font-semibold">Week</div>
                    <div id="day-btn" class="relative z-10 text-center w-[80px] cursor-pointer font-semibold">Day</div>
                </div>
            </div>
        
            <div id="month-view" class="border-gray-200 ">
                <div class="grid grid-cols-7 bg-gray-200 p-4 text-center font-bold text-gray-400">
                    <div>Mon</div>
                    <div>Tue</div>
                    <div>Wed</div>
                    <div>Thu</div>
                    <div>Fri</div>
                    <div>Sat</div>
                    <div>Sun</div>
                </div>
                <div data-modal-target="static-modal" data-modal-toggle="static-modal" id="days" class="grid grid-cols-7 border border-gray-200  "></div>
            </div>
        
            <div id="week-view" class="grid ">
                <div class="grid grid-cols-7 bg-gray-200 p-4 text-center font-bold text-gray-400 h-[60px]">
                    <div>Mon</div>
                    <div>Tue</div>
                    <div>Wed</div>
                    <div>Thu</div>
                    <div>Fri</div>
                    <div>Sat</div>
                    <div>Sun</div>
                </div>
                <div class="days-week border border-gray-200 grid items-center sticky h-[60px]">
                    <div class=" h-[60px] w-[100px]  ">all-day</div>
                    <div class=" h-[60px] w-[100px] "></div>
                    <div class=" h-[60px] w-[60px] "></div>
                    <div class=" h-[60px] w-[60px] "></div>
                    <div class=" h-[60px] w-[60px] "></div>
                    <div class=" h-[60px] w-[60px] "></div>
                    <div class=" h-[60px] w-[60px] "></div>
                    <div class=" h-[60px] w-[60px] "></div>
                </div>
                <div class="days-container grid-cols-7 border-t border-gray-200 h-[500px] overflow-scroll">
        
                    <!-- <div class="dni border h-[60px]  border-gray-200">1</div>
                                                                                                                                                                                                                                                                                                                                                                                                <div class="dni border h-[60px]  border-gray-200">2</div>
                                                                                                                                                                                                                                                                                                                                                                                                <div class="dni border h-[60px]  border-gray-200">3</div>
                                                                                                                                                                                                                                                                                                                                                                                                <div class="dni border h-[60px]  border-gray-200">4</div>
                                                                                                                                                                                                                                                                                                                                                                                                <div class="dni border h-[60px]  border-gray-200">5</div>
                                                                                                                                                                                                                                                                                                                                                                                                <div class="dni border h-[60px]  border-gray-200">6</div>
                                                                                                                                                                                                                                                                                                                                                                                                <div class="dni border h-[60px]  border-gray-200">7</div>
                                                                                                                                                                                                                                                                                                                                                                                                <div class="dni border h-[60px]  border-gray-200">8</div>
                                                                                                                                                                                                                                                                                                                                                                                                <div class="dni border h-[60px]  border-gray-200">9</div>
                                                                                                                                                                                                                                                                                                                                                                                                <div class="dni border h-[60px]  border-gray-200">10</div>
                                                                                                                                                                                                                                                                                                                                                                                                <div class="dni border h-[60px]  border-gray-200">11</div>
                                                                                                                                                                                                                                                                                                                                                                                                <div class="dni border h-[60px]  border-gray-200">12</div>
                                                                                                                                                                                                                                                                                                                                                                                                <div class="dni border h-[60px]  border-gray-200">13</div>
                                                                                                                                                                                                                                                                                                                                                                                                <div class="dni border h-[60px]  border-gray-200">14</div>
                                                                                                                                                                                                                                                                                                                                                                                                <div class="dni border h-[60px]  border-gray-200">15</div>
                                                                                                                                                                                                                                                                                                                                                                                                <div class="dni border h-[60px]  border-gray-200">16</div>
                                                                                                                                                                                                                                                                                                                                                                                                <div class="dni border h-[60px]  border-gray-200">17</div>
                                                                                                                                                                                                                                                                                                                                                                                                <div class="dni border h-[60px]  border-gray-200">18</div>
                                                                                                                                                                                                                                                                                                                                                                                                <div class="dni border h-[60px]  border-gray-200">19</div>
                                                                                                                                                                                                                                                                                                                                                                                                <div class="dni border h-[60px]  border-gray-200">20</div>
                                                                                                                                                                                                                                                                                                                                                                                                <div class="dni border h-[60px]  border-gray-200">21</div>
                                                                                                                                                                                                                                                                                                                                                                                                <div class="dni border h-[60px]  border-gray-200">22</div>
                                                                                                                                                                                                                                                                                                                                                                                                <div class="dni border h-[60px]  border-gray-200">23</div> -->
                </div>
            </div>
        
        
            <div id="day-view" class="hidden h-[100%]">
                <div class="grid grid-cols-7 bg-gray-200 p-4 text-center font-bold text-gray-400">
                    <div>Mon</div>
                    <div>Tue</div>
                    <div>Wed</div>
                    <div>Thu</div>
                    <div>Fri</div>
                    <div>Sat</div>
                    <div>Sun</div>
                </div>
                <div class="hours border border-gray-200 grid items-center sticky h-[60px]">
                    <div class=" h-[60px] w-[100px]  ">all-day</div>
                </div>
                <div class="days-container grid-cols-7 border-t border-gray-200 h-[500px] overflow-scroll">
                    <div class="dni border h-[60px] w-[60px] border-gray-200">1</div>
                    <div class="dni border h-[60px] w-[60px] border-gray-200">2</div>
                    <div class="dni border h-[60px] w-[60px] border-gray-200">3</div>
                    <div class="dni border h-[60px] w-[60px] border-gray-200">4</div>
                    <div class="dni border h-[60px] w-[60px] border-gray-200">5</div>
                    <div class="dni border h-[60px] w-[60px] border-gray-200">6</div>
                    <div class="dni border h-[60px] w-[60px] border-gray-200">7</div>
                    <div class="dni border h-[60px] w-[60px] border-gray-200">8</div>
                    <div class="dni border h-[60px] w-[60px] border-gray-200">9</div>
                    <div class="dni border h-[60px] w-[60px] border-gray-200">10</div>
                    <div class="dni border h-[60px] w-[60px] border-gray-200">11</div>
                    <div class="dni border h-[60px] w-[60px] border-gray-200">12</div>
                    <div class="dni border h-[60px] w-[60px] border-gray-200">13</div>
                    <div class="dni border h-[60px] w-[60px] border-gray-200">14</div>
                    <div class="dni border h-[60px] w-[60px] border-gray-200">15</div>
                    <div class="dni border h-[60px] w-[60px] border-gray-200">16</div>
                    <div class="dni border h-[60px] w-[60px] border-gray-200">17</div>
                    <div class="dni border h-[60px] w-[60px] border-gray-200">18</div>
                    <div class="dni border h-[60px] w-[60px] border-gray-200">19</div>
                    <div class="dni border h-[60px] w-[60px] border-gray-200">20</div>
                    <div class="dni border h-[60px] w-[60px] border-gray-200">21</div>
                    <div class="dni border h-[60px] w-[60px] border-gray-200">22</div>
                    <div class="dni border h-[60px] w-[60px] border-gray-200">23</div>
                </div>
                <div class="border w-[60px] h-[60px]"></div>
            </div>`

        initCalendar();
    }
}

customElements.define('page-calendar', PageCalendar)