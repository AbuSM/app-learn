import changeModal from "../todo/change_modal";
import "./styles.css";

export function initCalendar() {
  const monthBtn = document.getElementById('month-btn');
  const weekBtn = document.getElementById('week-btn');
  const dayBtn = document.getElementById('day-btn');
  const slider = document.getElementById('slider');

  const monthView = document.getElementById('month-view');
  const weekView = document.getElementById('week-view');
  const dayView = document.getElementById('day-view');
  
  const daysContainer = document.getElementById("days");
  const monthYear = document.getElementById("month-year");
  const prevMonthBtn = document.getElementById("prev-month");
  const nextMonthBtn = document.getElementById("next-month");

  const realToday = new Date(); 
  let viewDate = new Date(); 
  let weekViewDate = new Date(); 
  let dayViewDate = new Date(); 
  let currentView = 'month';

  function showView(view) {
    currentView = view;
    localStorage.setItem('calendarView', view); 
    monthView.classList.add('hidden');
    weekView.classList.add('hidden');
    dayView.classList.add('hidden');

    if (view === 'month') {
      slider.style.left = '4px';
      monthView.classList.remove('hidden');
      renderCalendar();
    } else if (view === 'week') {
      slider.style.left = 'calc(33.333% + 2px)';
      weekView.classList.remove('hidden');
      renderWeekView();
    } else if (view === 'day') {
      slider.style.left = 'calc(66.666% + 2px)';
      dayView.classList.remove('hidden');
      renderDayView();
    }
  }

  monthBtn.addEventListener('click', () => showView('month'));
  weekBtn.addEventListener('click', () => showView('week'));
  dayBtn.addEventListener('click', () => showView('day'));

  const events = {};

  function getEventColor(color) {
    const colors = {
      green: { bg: 'bg-green-50', text: 'text-green-700', border: 'border-green-500' },
      pink: { bg: 'bg-pink-50', text: 'text-pink-700', border: 'border-pink-500' },
      blue: { bg: 'bg-blue-50', text: 'text-blue-700', border: 'border-blue-500' },
      orange: { bg: 'bg-orange-50', text: 'text-orange-700', border: 'border-orange-500' },
      purple: { bg: 'bg-purple-50', text: 'text-purple-700', border: 'border-purple-500' }
    };
    return colors[color] || colors.green;
  }

  function renderCalendar() {
    const year = viewDate.getFullYear();
    const month = viewDate.getMonth();

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
      dayDiv.classList.add("border", "border-gray-100", "min-h-32", "p-2", "text-gray-300", "bg-white");
      dayDiv.textContent = prevMonthLastDay - i + 1;
      daysContainer.appendChild(dayDiv);
    }

    for (let day = 1; day <= totalDays; day++) {
      const dayDiv = document.createElement("div");
      dayDiv.classList.add("border", "border-gray-100", "min-h-32", "p-2", "cursor-pointer", "transition-colors");

      const dayNumber = document.createElement("div");
      dayNumber.classList.add("font-semibold", "mb-2", "text-sm");
      dayNumber.textContent = day;

      if (
        day === realToday.getDate() &&
        month === realToday.getMonth() &&
        year === realToday.getFullYear()
      ) {

        dayDiv.classList.add("bg-gray-200", "border-gray-300" , "rounded-[5px]" , "m-[10px]");
        dayDiv.classList.remove("border-gray-100");
        dayNumber.classList.add("text-white", "font-bold");
      } else {

        dayDiv.classList.add("bg-white", "hover:bg-gray-50");
        dayNumber.classList.add("text-gray-700");
      }

      dayDiv.appendChild(dayNumber);

      const dateKey = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
      if (events[dateKey]) {
        events[dateKey].forEach(event => {
          const eventDiv = document.createElement("div");
          const colorClass = getEventColor(event.color);
          eventDiv.classList.add(
            "text-xs", "px-2", "py-1", "mb-1", "rounded",
            colorClass.bg, colorClass.text, "border-l-4", colorClass.border,
            "truncate", "font-medium"
          );
          eventDiv.textContent = event.title;
          dayDiv.appendChild(eventDiv);
        });
      }

      dayDiv.setAttribute('data-modal-target', 'event-modal');
      dayDiv.setAttribute('data-modal-toggle', 'event-modal');

      daysContainer.appendChild(dayDiv);
    }

    const totalCells = daysContainer.children.length;
    const nextDays = 42 - totalCells;
    for (let i = 1; i <= nextDays; i++) {
      const dayDiv = document.createElement("div");
      dayDiv.classList.add("border", "border-gray-100", "min-h-32", "p-2", "text-gray-300", "bg-white");
      dayDiv.textContent = i;
      daysContainer.appendChild(dayDiv);
    }
  }

  function getWeekDates() {
    const dayOfWeek = weekViewDate.getDay(); 
    const adjustedDay = dayOfWeek === 0 ? 6 : dayOfWeek - 1;
    const monday = new Date(weekViewDate);
    monday.setDate(weekViewDate.getDate() - adjustedDay);

    const weekDates = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date(monday);
      date.setDate(monday.getDate() + i);
      weekDates.push(date);
    }
    return weekDates;
  }

  function renderWeekView() {
    const weekDates = getWeekDates();
    const weekHeader = document.getElementById('week-header');

    const days = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];
    weekHeader.innerHTML = '<div class="py-3"></div>';
    
    weekDates.forEach((date, index) => {
      const headerCell = document.createElement('div');
      headerCell.classList.add('py-3', 'border-l', 'border-gray-100');
      headerCell.textContent = `${days[index]} ${date.getMonth() + 1}/${date.getDate()}`;
      weekHeader.appendChild(headerCell);
    });

    const startDate = weekDates[0];
    const endDate = weekDates[6];
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    monthYear.textContent = `${monthNames[startDate.getMonth()]} ${startDate.getDate()} – ${endDate.getDate()}, ${startDate.getFullYear()}`;

    const weekContainer = document.getElementById('week-grid');
    if (!weekContainer) return;

    weekContainer.innerHTML = '';

    const hours = Array.from({ length: 19 }, (_, i) => i + 6); 

    hours.forEach(hour => {
      const timeSlot = document.createElement('div');
      timeSlot.classList.add('flex', 'border-b', 'border-gray-100');

      const timeLabel = document.createElement('div');
      timeLabel.classList.add('w-20', 'text-xs', 'text-gray-400', 'py-2', 'pr-2', 'text-right');
      timeLabel.textContent = hour >= 12 ? `${hour === 12 ? 12 : hour - 12}pm` : `${hour}am`;

      timeSlot.appendChild(timeLabel);

      for (let i = 0; i < 7; i++) {
        const cell = document.createElement('div');
        cell.classList.add('flex-1', 'border-l', 'border-gray-100', 'min-h-12', 'hover:bg-gray-50', 'cursor-pointer');
        
        cell.setAttribute('data-modal-target', 'event-modal');
        cell.setAttribute('data-modal-toggle', 'event-modal');
        
        timeSlot.appendChild(cell);
      }

      weekContainer.appendChild(timeSlot);
    });
  }

  function renderDayView() {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const dayName = days[dayViewDate.getDay()].toUpperCase();
    
    const dayHeader = document.getElementById('day-header');
    dayHeader.textContent = dayName;

    const monthNames = ["January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"];
    monthYear.textContent = `${monthNames[dayViewDate.getMonth()]} ${dayViewDate.getDate()}, ${dayViewDate.getFullYear()}`;

    const dayContainer = document.getElementById('day-grid');
    if (!dayContainer) return;

    dayContainer.innerHTML = '';

    const hours = Array.from({ length: 19 }, (_, i) => i + 6);

    hours.forEach(hour => {
      const timeSlot = document.createElement('div');
      timeSlot.classList.add('flex', 'border-b', 'border-gray-100');

      const timeLabel = document.createElement('div');
      timeLabel.classList.add('w-20', 'text-xs', 'text-gray-400', 'py-2', 'pr-2', 'text-right');
      timeLabel.textContent = hour >= 12 ? `${hour === 12 ? 12 : hour - 12}pm` : `${hour}am`;

      const cell = document.createElement('div');
      cell.classList.add('flex-1', 'border-l', 'border-gray-100', 'min-h-12', 'hover:bg-gray-50', 'cursor-pointer');

      cell.setAttribute('data-modal-target', 'event-modal');
      cell.setAttribute('data-modal-toggle', 'event-modal');

      timeSlot.appendChild(timeLabel);
      timeSlot.appendChild(cell);
      dayContainer.appendChild(timeSlot);
    });
  }

  prevMonthBtn.addEventListener("click", () => {
    if (currentView === 'month') {
      viewDate.setMonth(viewDate.getMonth() - 1);
    } else if (currentView === 'week') {
      weekViewDate.setDate(weekViewDate.getDate() - 7);
    } else if (currentView === 'day') {
      dayViewDate.setDate(dayViewDate.getDate() - 1); 
    }
    showView(currentView); 
  });

  nextMonthBtn.addEventListener("click", () => {
    if (currentView === 'month') {
      viewDate.setMonth(viewDate.getMonth() + 1);
    } else if (currentView === 'week') {
      weekViewDate.setDate(weekViewDate.getDate() + 7); 
    } else if (currentView === 'day') {
      dayViewDate.setDate(dayViewDate.getDate() + 1);
    }
    showView(currentView);
  });

  const savedView = localStorage.getItem('calendarView') || 'month'; 
  showView(savedView);
}

