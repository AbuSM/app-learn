import "./styles.css";

export function initCalendar() {
	const monthBtn = document.getElementById("month-btn");
	const weekBtn = document.getElementById("week-btn");
	const dayBtn = document.getElementById("day-btn");
	const slider = document.getElementById("slider");

	const monthView = document.getElementById("month-view");
	const weekView = document.getElementById("week-view");
	const dayView = document.getElementById("day-view");

	const daysContainer = document.getElementById("days");
	const monthYear = document.getElementById("month-year");
	const prevMonthBtn = document.getElementById("prev-month");
	const nextMonthBtn = document.getElementById("next-month");
	const addEventBtn = document.getElementById("add-event-btn");

	const realToday = new Date();
	let viewDate = new Date();
	let weekViewDate = new Date();
	let dayViewDate = new Date();
	let currentView = "month";

	let events = JSON.parse(localStorage.getItem("calendarEvents")) || {};

	const modal = document.createElement("ui-modal");
	modal.setAttribute("title", "Add / Edit Event");
	modal.setAttribute("ok-text", "Update changes");
	modal.setAttribute("cancel-text", "Close");
	document.body.appendChild(modal);

	function createEventForm(
		date = null,
		event = null,
		showDatePickers = true
	) {
		const dateStr = date
			? `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(
					2,
					"0"
			  )}-${String(date.getDate()).padStart(2, "0")}`
			: null;

		const eventData = event || {
			title: "",
			color: "danger",
			startDate: dateStr || new Date().toISOString().split("T")[0],
			endDate: dateStr || new Date().toISOString().split("T")[0],
		};

		const formHTML = `
			<div class="event-form-container">
				<p class="event-form-subtitle">Спланируйте свой следующий большой момент: расписание или редактирование события</p>

				<div class="form-group">
					<label for="event-title">Название события</label>
					<input
						type="text"
						id="event-title"
						placeholder="Семинар #6"
						value="${eventData.title}"
						class="form-input"
					/>
				</div>

				<div class="form-group">
					<label>Цвет события</label>
					<div class="color-selector">
						<label class="color-option">
							<input type="radio" name="color" value="danger" ${
								eventData.color === "danger" ? "checked" : ""
							} />
							<span class="color-dot danger"></span>
							<span>Красный</span>
						</label>
						<label class="color-option">
							<input type="radio" name="color" value="success" ${
								eventData.color === "success" ? "checked" : ""
							} />
							<span class="color-dot success"></span>
							<span>Зелёный</span>
						</label>
						<label class="color-option">
							<input type="radio" name="color" value="primary" ${
								eventData.color === "primary" ? "checked" : ""
							} />
							<span class="color-dot primary"></span>
							<span>Синий</span>
						</label>
						<label class="color-option">
							<input type="radio" name="color" value="warning" ${
								eventData.color === "warning" ? "checked" : ""
							} />
							<span class="color-dot warning"></span>
							<span>Жёлтый</span>
						</label>
					</div>
				</div>

				${
					showDatePickers
						? `
					<div class="form-group">
						<label for="event-start-date">Дата начала</label>
						<input
							type="date"
							id="event-start-date"
							value="${eventData.startDate}"
							class="form-input"
						/>
					</div>

					<div class="form-group">
						<label for="event-end-date">Дата окончания</label>
						<input
							type="date"
							id="event-end-date"
							value="${eventData.endDate}"
							class="form-input"
						/>
					</div>
				`
						: ""
				}
			</div>
		`;

		return formHTML;
	}

	function openEventModal(date = null, event = null, showDatePickers = true) {
		const isEditing = event !== null;
		modal.setTitle(
			isEditing
				? "Редактировать событие"
				: "Добавить / Редактировать событие"
		);
		modal.setButtonText("Добавить", "Закрыть");

		const body = modal.getBody();
		body.innerHTML = createEventForm(date, event, showDatePickers);

		modal
			.show()
			.then(() => {
				const body = modal.getBody();
				const titleInput = body.querySelector("#event-title");
				const colorInput = body.querySelector(
					'input[name="color"]:checked'
				);
				const startDateInput = body.querySelector("#event-start-date");
				const endDateInput = body.querySelector("#event-end-date");

				const eventTitle = titleInput.value.trim();

				if (!eventTitle) {
					window.showToast("Пожалуйста, введите название события", 3);
					return;
				}

				const startDate = startDateInput
					? startDateInput.value
					: date
					? `${date.getFullYear()}-${String(
							date.getMonth() + 1
					  ).padStart(2, "0")}-${String(date.getDate()).padStart(
							2,
							"0"
					  )}`
					: new Date().toISOString().split("T")[0];
				const endDate = endDateInput ? endDateInput.value : startDate;

				const eventData = {
					id: event?.id || Date.now().toString(),
					title: eventTitle,
					color: colorInput.value,
					startDate: startDate,
					endDate: endDate,
				};

				const dateKey = eventData.startDate;
				if (!events[dateKey]) {
					events[dateKey] = [];
				}

				if (isEditing) {
					const index = events[dateKey].findIndex(
						(e) => e.id === event.id
					);
					if (index !== -1) {
						events[dateKey][index] = eventData;
					}
				} else {
					events[dateKey].push(eventData);
				}

				localStorage.setItem("calendarEvents", JSON.stringify(events));
				window.showToast("Успешно!", 3);

				showView(currentView);
			})
			.catch(() => {
			});
	}

	function showView(view) {
		currentView = view;
		localStorage.setItem("calendarView", view);
		monthView.classList.add("hidden");
		weekView.classList.add("hidden");
		dayView.classList.add("hidden");

		if (view === "month") {
			slider.style.left = "4px";
			monthView.classList.remove("hidden");
			renderCalendar();
		} else if (view === "week") {
			slider.style.left = "calc(33.333% + 2px)";
			weekView.classList.remove("hidden");
			renderWeekView();
		} else if (view === "day") {
			slider.style.left = "calc(66.666% + 2px)";
			dayView.classList.remove("hidden");
			renderDayView();
		}
	}

	monthBtn.addEventListener("click", () => showView("month"));
	weekBtn.addEventListener("click", () => showView("week"));
	dayBtn.addEventListener("click", () => showView("day"));
	addEventBtn.addEventListener("click", () => openEventModal(viewDate));

	function getEventColor(color) {
		const colorMap = {
			danger: {
				bg: "bg-red-100",
				text: "text-red-700",
				border: "border-red-400",
			},
			success: {
				bg: "bg-green-100",
				text: "text-green-700",
				border: "border-green-400",
			},
			primary: {
				bg: "bg-blue-100",
				text: "text-blue-700",
				border: "border-blue-400",
			},
			warning: {
				bg: "bg-yellow-100",
				text: "text-yellow-700",
				border: "border-yellow-400",
			},
		};
		return colorMap[color] || colorMap.danger;
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
			"Январь",
			"Февраль",
			"Март",
			"Апрель",
			"Май",
			"Июнь",
			"Июль",
			"Август",
			"Сентябрь",
			"Октябрь",
			"Ноябрь",
			"Декабрь",
		];

		monthYear.textContent = `${monthNames[month]} ${year}`;
		daysContainer.innerHTML = "";

		const prevDays = startDay === 0 ? 6 : startDay - 1;
		for (let i = prevDays; i > 0; i--) {
			const dayDiv = document.createElement("div");
			dayDiv.classList.add(
				"border",
				"border-gray-100",
				"min-h-32",
				"p-2",
				"text-gray-300",
				"bg-white"
			);
			dayDiv.textContent = prevMonthLastDay - i + 1;
			daysContainer.appendChild(dayDiv);
		}

		for (let day = 1; day <= totalDays; day++) {
			const dayDiv = document.createElement("div");
			dayDiv.classList.add(
				"border",
				"border-gray-100",
				"min-h-32",
				"p-2",
				"cursor-pointer",
				"transition-colors",
				"bg-white",
				"hover:bg-gray-50"
			);

			const dayNumber = document.createElement("div");
			dayNumber.classList.add(
				"font-semibold",
				"mb-2",
				"text-sm",
				"text-gray-700"
			);
			dayNumber.textContent = day;

			if (
				day === realToday.getDate() &&
				month === realToday.getMonth() &&
				year === realToday.getFullYear()
			) {
				dayDiv.classList.add(
					"bg-gray-200",
					"border-gray-300",
					"rounded-[5px]",
					"m-[10px]"
				);
				dayDiv.classList.remove(
					"border-gray-100",
					"bg-white",
					"hover:bg-gray-50"
				);
				dayNumber.classList.add("text-white", "font-bold");
			}

			dayDiv.appendChild(dayNumber);

			const dateKey = `${year}-${String(month + 1).padStart(
				2,
				"0"
			)}-${String(day).padStart(2, "0")}`;
			if (events[dateKey]) {
				events[dateKey].forEach((event) => {
					const eventDiv = document.createElement("div");
					const colorClass = getEventColor(event.color);
					eventDiv.classList.add(
						"text-xs",
						"px-2",
						"py-1",
						"mb-1",
						"rounded",
						colorClass.bg,
						colorClass.text,
						"border-l-4",
						colorClass.border,
						"truncate",
						"font-medium",
						"cursor-pointer",
						"hover:opacity-80",
						"transition-opacity"
					);
					eventDiv.textContent = event.title;

					dayDiv.appendChild(eventDiv);
				});
			}

			dayDiv.addEventListener("click", () => {
				openEventModal(new Date(year, month, day), null, false);
			});

			daysContainer.appendChild(dayDiv);
		}

		const totalCells = daysContainer.children.length;
		const nextDays = 42 - totalCells;
		for (let i = 1; i <= nextDays; i++) {
			const dayDiv = document.createElement("div");
			dayDiv.classList.add(
				"border",
				"border-gray-100",
				"min-h-32",
				"p-2",
				"text-gray-300",
				"bg-white"
			);
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
		const weekHeader = document.getElementById("week-header");

		const days = ["ПН", "ВТ", "СР", "ЧТ", "ПТ", "СБ", "ВС"];
		weekHeader.innerHTML = '<div class="py-3"></div>';

		weekDates.forEach((date, index) => {
			const headerCell = document.createElement("div");
			headerCell.classList.add("py-3", "border-l", "border-gray-100");
			headerCell.textContent = `${days[index]} ${
				date.getMonth() + 1
			}/${date.getDate()}`;
			weekHeader.appendChild(headerCell);
		});

		const startDate = weekDates[0];
		const endDate = weekDates[6];
		const monthNames = [
			"Янв",
			"Фев",
			"Мар",
			"Апр",
			"Май",
			"Июн",
			"Июл",
			"Авг",
			"Сен",
			"Окт",
			"Ноя",
			"Дек",
		];
		monthYear.textContent = `${
			monthNames[startDate.getMonth()]
		} ${startDate.getDate()} – ${endDate.getDate()}, ${startDate.getFullYear()}`;

		const weekContainer = document.getElementById("week-grid");
		if (!weekContainer) return;

		weekContainer.innerHTML = "";

		const hours = Array.from({ length: 19 }, (_, i) => i + 6);

		hours.forEach((hour) => {
			const timeSlot = document.createElement("div");
			timeSlot.classList.add("flex", "border-b", "border-gray-100");

			const timeLabel = document.createElement("div");
			timeLabel.classList.add(
				"w-20",
				"text-xs",
				"text-gray-400",
				"py-2",
				"pr-2",
				"text-right"
			);
			timeLabel.textContent =
				hour >= 12 ? `${hour === 12 ? 12 : hour - 12}pm` : `${hour}am`;

			timeSlot.appendChild(timeLabel);

			for (let i = 0; i < 7; i++) {
				const cell = document.createElement("div");
				cell.classList.add(
					"flex-1",
					"border-l",
					"border-gray-100",
					"min-h-12",
					"hover:bg-gray-50",
					"cursor-pointer"
				);

				cell.addEventListener("click", () => {
					openEventModal(weekDates[i], null, false);
				});
				timeSlot.appendChild(cell);
			}

			weekContainer.appendChild(timeSlot);
		});
	}

	function renderDayView() {
		const days = [
			"Воскресенье",
			"Понедельник",
			"Вторник",
			"Среда",
			"Четверг",
			"Пятница",
			"Суббота",
		];
		const dayName = days[dayViewDate.getDay()].toUpperCase();

		const dayHeader = document.getElementById("day-header");
		dayHeader.textContent = dayName;

		const monthNames = [
			"Январь",
			"Февраль",
			"Март",
			"Апрель",
			"Май",
			"Июнь",
			"Июль",
			"Август",
			"Сентябрь",
			"Октябрь",
			"Ноябрь",
			"Декабрь",
		];
		monthYear.textContent = `${
			monthNames[dayViewDate.getMonth()]
		} ${dayViewDate.getDate()}, ${dayViewDate.getFullYear()}`;

		const dayContainer = document.getElementById("day-grid");
		if (!dayContainer) return;

		dayContainer.innerHTML = "";

		const hours = Array.from({ length: 19 }, (_, i) => i + 6);

		hours.forEach((hour) => {
			const timeSlot = document.createElement("div");
			timeSlot.classList.add("flex", "border-b", "border-gray-100");

			const timeLabel = document.createElement("div");
			timeLabel.classList.add(
				"w-20",
				"text-xs",
				"text-gray-400",
				"py-2",
				"pr-2",
				"text-right"
			);
			timeLabel.textContent =
				hour >= 12 ? `${hour === 12 ? 12 : hour - 12}pm` : `${hour}am`;

			const cell = document.createElement("div");
			cell.classList.add(
				"flex-1",
				"border-l",
				"border-gray-100",
				"min-h-12",
				"hover:bg-gray-50",
				"cursor-pointer"
			);


			cell.addEventListener("click", () => {
				openEventModal(dayViewDate, null, false);
			});
			timeSlot.appendChild(timeLabel);
			timeSlot.appendChild(cell);
			dayContainer.appendChild(timeSlot);
		});
	}

	prevMonthBtn.addEventListener("click", () => {
		if (currentView === "month") {
			viewDate.setMonth(viewDate.getMonth() - 1);
		} else if (currentView === "week") {
			weekViewDate.setDate(weekViewDate.getDate() - 7);
		} else if (currentView === "day") {
			dayViewDate.setDate(dayViewDate.getDate() - 1);
		}
		showView(currentView);
	});

	nextMonthBtn.addEventListener("click", () => {
		if (currentView === "month") {
			viewDate.setMonth(viewDate.getMonth() + 1);
		} else if (currentView === "week") {
			weekViewDate.setDate(weekViewDate.getDate() + 7);
		} else if (currentView === "day") {
			dayViewDate.setDate(dayViewDate.getDate() + 1);
		}
		showView(currentView);
	});

	const savedView = localStorage.getItem("calendarView") || "month";
	showView(savedView);
}
