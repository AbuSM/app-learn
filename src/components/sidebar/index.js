import "../ui-icon/index.js";

class AppSidebar extends HTMLElement {
    connectedCallback() {
        this.innerHTML = /*html*/ `
        <aside class="fixed left-0 top-0 z-50 flex h-screen w-[280px] flex-col overflow-y-hidden bg-[#1c2434] duration-300 ease-linear">
            <!-- SIDEBAR HEADER -->
            <div class="flex flex-col items-center justify-center gap-2 p-2 border-b border-gray-700">
                <a href="/">
                    <img src="/assets/logo.svg" />
                </a>
            </div>
        
            <!-- SIDEBAR MENU -->
            <div class="no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear">
                <nav class="mt-2 p-2">
                    <!-- MENU Header -->
                    <h3 class="font-semibold text-gray-500 uppercase tracking-wider">MENU</h3>
        
                    <ul class="flex flex-col gap-1.5 mt-2"> <!-- Главная (Main) with Dropdown -->
                        <li> <a href="#" class="nav-link" onclick="event.preventDefault(); this.nextElementSibling.classList.toggle('hidden'); this.querySelector('.arrow-icon').classList.toggle('rotate-x-180')"> <ui-icon name="menu"></ui-icon> Главная <ui-icon name="chevron-up" class="arrow-icon absolute right-4 top-1/2 transition-transform duration-300 -translate-1/2"></ui-icon> </a>
                            <ul class="flex flex-col gap-1 my-2">
                                <li> <a href="/achievements" class="submenu-link"> <ui-icon name="trophy"></ui-icon> Мои достижения </a> </li>
                                <li> <a href="/blog" class="submenu-link"> <ui-icon name="document-text"></ui-icon> Блог </a> </li>
                                <li> <a href="/events" class="submenu-link"> <ui-icon name="calendar"></ui-icon> События </a> </li>
                                <li> <a href="/calendar" class="submenu-link"> <ui-icon name="calendar"></ui-icon> Календарь </a> </li>
                            </ul>
                        </li>
                        <li>
                            <a href="/todo" class="nav-link">
                                <ui-icon name="clipboard-list"></ui-icon> Задачи
                            </a>
                        </li> <!-- Задачи (Tasks) -->
                        <li>
                            <a href="/about" class="nav-link">
                                <ui-icon name="information-circle"></ui-icon> О проекте
                            </a>
                        </li> <!-- Курсы (Courses) with Dropdown -->
                        <li>
                            <a href="#" class="nav-link" onclick="event.preventDefault(); this.nextElementSibling.classList.toggle('hidden'); this.querySelector('.arrow-icon').classList.toggle('rotate-x-180')">
                                <ui-icon name="book-open"></ui-icon> Курсы <ui-icon name="chevron-up" class="arrow-icon absolute right-4 top-1/2 -translate-y-1/2 transition-transform duration-300"></ui-icon>
                            </a>
                            <ul class="mt-2 flex flex-col gap-1">
                                <li> <a href="/my-courses" class="submenu-link"> <ui-icon name="book"></ui-icon> Мои курсы <span class="inline-flex items-center justify-center rounded-md bg-[#3C50E0] px-2 py-0.5 font-medium text-white">2</span> </a> </li>
                                <li> <a href="/all-courses" class="submenu-link"> <ui-icon name="academic-cap"></ui-icon> Все курсы <span class="inline-flex items-center justify-center rounded-md bg-[#3C50E0] px-2 py-0.5 font-medium text-white">10</span> </a> </li>
                            </ul>
                        </li> <!-- Таймеры (Timers) -->
                        <li> <a href="/timers" class="nav-link"> <ui-icon name="clock"></ui-icon> Таймеры </a> </li> <!-- Профиль (Profile) -->
                        <li> <a href="/profile" class="nav-link"> <ui-icon name="user-circle"></ui-icon> Профиль </a> </li>
                    </ul>
        
                </nav>
            </div>
        </aside>
        `;
    }
}

customElements.define("app-sidebar", AppSidebar);
