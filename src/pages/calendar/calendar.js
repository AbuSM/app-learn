import changeModal from "../todo/change_modal";

export function initCalendar() {
const monthBtn = document.getElementById('month-btn');
  const weekBtn = document.getElementById('week-btn');
  const dayBtn = document.getElementById('day-btn');
  const slider = document.getElementById('slider');

  const monthView = document.getElementById('month-view');
  const weekView = document.getElementById('week-view');
  const dayView = document.getElementById('day-view');

  function showView(view) {
    monthView.classList.add('hidden');
    weekView.classList.add('hidden');
    dayView.classList.add('hidden');

    if (view === 'month') {
      slider.style.left = '4px';
      monthView.classList.remove('hidden');
    } else if (view === 'week') {
      slider.style.left = '94px';
      weekView.classList.remove('hidden');
    } else if (view === 'day') {
      slider.style.left = '184px';
      dayView.classList.remove('hidden');
    }

    localStorage.setItem('calendarView', view);
  }

  monthBtn.addEventListener('click', () => showView('month'));
  weekBtn.addEventListener('click', () => showView('week'));
  dayBtn.addEventListener('click', () => showView('day'));

  const savedView = localStorage.getItem('calendarView') || 'month';
  showView(savedView);

const daysContainer = document.getElementById("days");
const monthYear = document.getElementById("month-year");
const prevMonthBtn = document.getElementById("prev-month");
const nextMonthBtn = document.getElementById("next-month");

let date = new Date();

function renderCalendar() {
  const year = date.getFullYear();
  const month = date.getMonth();

  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);

  const startDay = firstDay.getDay(); 
  const totalDays = lastDay.getDate();
  const prevMonthLastDay = new Date(year, month, 0).getDate();

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  monthYear.textContent = `${monthNames[month]} ${year}`;
  daysContainer.innerHTML = "";

  const prevDays = startDay === 0 ? 6 : startDay - 1;
  for (let i = prevDays; i > 0; i--) {
    const dayDiv = document.createElement("div");
    dayDiv.classList.add("border", "border-gray-200", "min-h-32", "p-2", "text-gray-400");
    dayDiv.textContent = prevMonthLastDay - i + 1;
    daysContainer.appendChild(dayDiv);
  }

  const today = new Date();

  for (let day = 1; day <= totalDays; day++) {
    const dayDiv = document.createElement("div");
    dayDiv.classList.add("border", "border-gray-200", "min-h-32", "p-2");

    if (
      day === today.getDate() &&
      month === today.getMonth() &&
      year === today.getFullYear()
    ) {
      dayDiv.classList.add("bg-gray-200", "text-black", "font-semibold", "rounded-md" ,"m-2");
    }

    dayDiv.textContent = day;
    daysContainer.appendChild(dayDiv);

    dayDiv.addEventListener('click',  async () => {
    dayDiv.classList.add('bg-gray-400', 'm-2'); 

    setTimeout(() => {
      dayDiv.classList.remove('bg-gray-400' ); 
    }, 200);
  });

  }

  const totalCells = daysContainer.children.length;
  const nextDays = 42 - totalCells;
  for (let i = 1; i <= nextDays; i++) {
    const dayDiv = document.createElement("div");
    dayDiv.classList.add("border", "border-gray-200", "min-h-32", "p-2", "text-gray-400");
    dayDiv.textContent = i;
    daysContainer.appendChild(dayDiv);

    
  }
}


prevMonthBtn.addEventListener("click", () => {
  date.setMonth(date.getMonth() - 1);
  renderCalendar();
});

nextMonthBtn.addEventListener("click", () => {
  date.setMonth(date.getMonth() + 1);
  renderCalendar();
});

renderCalendar();



}