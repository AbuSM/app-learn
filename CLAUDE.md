# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**t-stopwatch** (branded as **Applearn**) is an educational learning platform for Technohub students to practice advanced JavaScript. It features a modern dark-themed interface with Russian localization and includes stopwatch, timer, task management (Kanban boards), and calendar functionality.

## Tech Stack & Commands

### Development Commands
```bash
npm install              # Install dependencies
npm run dev              # Start dev server (http://0.0.0.0:5173)
npm run build            # Create production bundle (→ dist/)
npm run preview          # Preview production build locally
```

**No test suite is configured.** The project is primarily for learning vanilla JavaScript.

### Core Dependencies
- **Vite 6.4.0** - Build tool and dev server
- **Tailwind CSS 4.1.14** - Utility-first styling
- **Flowbite 3.1.2** - Pre-built Tailwind components
- **Alpine.js 3.15.0** - Reactive framework (minimal usage)
- **Navigo 8.11.1** - Hash-based SPA routing
- **Custom ui-icon component** - 100+ Heroicons with Web Components

## High-Level Architecture

### SPA with Web Components

The application is a **Single Page Application (SPA)** built with **vanilla JavaScript Web Components** (custom HTML elements). It uses hash-based routing and lazy-loads pages on demand.

**Root component structure:**
```
<app-shell>                    # Root layout wrapper
  ├─ <app-sidebar>            # Fixed 280px navigation (Russian menu)
  ├─ <app-header>             # Fixed 65px weather header
  ├─ <main>
  │  └─ <app-outlet>          # Dynamic page content (router outlet)
  ├─ <app-footer>
  └─ <ui-toast>               # Global notification system
```

### Routing System

**File:** `src/router.js` (Navigo 8.11.1)

Current routes:
- `/timers` → Stopwatch & Timer page (`page-timers`)
- `/todo` → Board selection view (`page-todo-boards`)
- `/todo/:id` → Individual board with Kanban tasks (`page-todo`)
- `/calendar` → Month/week/day calendar (`page-calendar`)

Routes are lazy-loaded via dynamic imports and mounted to the `<app-outlet>` element.

### Component Architecture

Two types of components:

**1. Layout Components** (`src/components/`)
- `shell/AppShell.js` - Root container
- `sidebar/index.js` - Russian navigation menu (280px fixed width)
- `header/index.js` - Weather display
- `footer/index.js` - Footer

**2. Reusable UI Components** (`src/components/`)
- `ui-icon/` - 100+ Heroicons via Web Component
- `ui-card/` - Card with image, title, description
- `ui-modal/` - Fully-functional modal Web Component (no external dependencies)
- `ui-toast/` - Global toast notifications
- `ui-toggle/` - Checkbox toggle
- `date-badge/` - Smart date display with color coding
- `comment/` - Comment display with reactions
- `todo-history-popover/` - Activity history in popover

All components extend `HTMLElement` and use the Custom Elements API.

### Page Structure

**Timers page** (`src/pages/timers/`)
- Stopwatch with millisecond precision
- Timer with +5/-5 second buttons
- OpenWeatherMap API integration for weather display
- Audio alert on timer completion
- Known bugs: minutes overflow, start button issues (see KNOWN_ISSUES below)

**Todo/Kanban system** (`src/pages/todo-boards/` + `src/pages/todo/`)
- Board selection view with card grid
- Individual board with drag-and-drop task management
- Architecture:
  - `index.js` - Main component & page mount logic
  - `script.js` - Module-level state management
  - `loadInitialTasks.js` - Fetch board data from API
  - `pushServer.js` - PATCH updates back to API
  - `listeners/listeners.js` - Drag-drop and event handlers
  - `render/` - HTML generation for tasks, layout, history
  - `change_modal.js` - Task edit dialog
- Features: drag-drop between lists, auto-scroll on drag, activity history, task creation/editing/deletion
- Data stored in window globals (see STATE_MANAGEMENT below)

**Calendar page** (`src/pages/calendar/`)
- Month/week/day view selector
- Event creation and display
- Date navigation

### State Management Pattern

The application uses **module-level state** and **window globals** (not ideal but educational).

**Todo page example** (`src/pages/todo/script.js`):
```javascript
export let tasks = [];                       // Main data: [{ list_id, tasks: [...] }]
export let dragData = { current: {} };       // Current drag state
export let taskData = { lastAdded: undefined };  // Last action
export let controller = { controller: new AbortController() };
```

**Window globals** (set by script.js):
- `window.boardID` - Current board ID
- `window.boardTitle` - Board name
- `window.tasks` - Task data (synced from above)
- `window.taskHistory` - Activity log (JSON from localStorage)
- `window.boards` - Available boards list
- `window.$router` - Navigo router instance
- `window.showToast()` - Global toast function

**Storage:**
- `localStorage` - Task history (last 100 items as JSON string)
- No database (all synced via API to `https://todo-back-fastapi.onrender.com`)

### API Integration

**HTTP utility** (`src/http.js`):
```javascript
export async function fetcher(URL, options) {
    return fetch(URL, options).then((res) => res.json());
}
```

**Backend endpoints:**
- Base URL: `https://todo-back-fastapi.onrender.com` (in `src/constants.js`)
- `GET /boards` - Fetch all boards
- `GET /board/{id}` - Fetch single board with tasks
- `PATCH /board/` - Update board state

**Weather API:**
- OpenWeatherMap API
- Endpoint: `/data/2.5/weather?lat=38.53575&lon=68.77905&units=metric`
- API key: Hardcoded in `src/components/header/index.js` (educational only)

### Styling Approach

**Tailwind CSS 4.1.14** + **Flowbite 3.1.2** for UI components.

**Theme colors** (Applearn branding):
```css
#1c2434      /* Sidebar background (primary-dark) */
#2a3142      /* Active menu state */
#333a48      /* Hover state */
#3C50E0      /* Accent blue (badges, highlights) */
#374151      /* Border (gray-700) */
#FFFFFF      /* Text primary */
#9CA3AF      /* Text secondary (gray-400) */
```

**Styling locations:**
- Global: `src/styles.css` (layout grid, variables, resets)
- Page-specific: Component CSS files (e.g., `src/pages/todo/style.css`)
- Inline utilities: Tailwind classes in HTML templates

### Configuration Files

**Vite config** (`vite.config.mjs`):
- Tailwind CSS plugin integration
- Dev server host: `0.0.0.0` (network accessible)

**Constants** (`src/constants.js`):
- `TIMER_RANGE = 50` - Max timer duration
- `WEATHER_API_URL`, `WEATHER_API_KEY`
- `API_URL = "https://todo-back-fastapi.onrender.com"`
- `AUTOSCROLL_HEIGHT = 50` - Drag-drop auto-scroll zone
- `AUTOSCROLL_SPEED = 5` - Pixels per scroll tick

## Code Patterns & Best Practices

### Web Components Pattern

All UI elements are Custom Elements extending `HTMLElement`:

```javascript
class CustomElement extends HTMLElement {
    connectedCallback() {
        // Called when element added to DOM
        this.innerHTML = /* html */ `...`;
        this.setupEventListeners();
    }

    attributeChangedCallback(name, oldValue, newValue) {
        // Called when observed attribute changes
    }

    static get observedAttributes() {
        return ['attr1', 'attr2'];
    }
}

customElements.define('custom-element', CustomElement);
```

**Usage:** Create the element and Vite/browser will automatically initialize it.

### Event Handling in Web Components

Prefer event listeners over inline handlers. For todo page (educational example of working system):

```javascript
// Attach listeners to parent
document.addEventListener('click', (e) => {
    if (e.target.matches('[data-action="complete"]')) {
        // Handle click
    }
});

// Or use onclick attributes (legacy but works):
// <button onclick="window.onTaskClick(event)">
// window.onTaskClick = (event) => { ... }
```

### Data Rendering Pattern

Components generate HTML as strings and mount to DOM:

```javascript
// Generate HTML
let html = tasks.map(task => `
    <div data-task-id="${task.id}">
        <h3>${task.title}</h3>
    </div>
`).join('');

// Mount to DOM
container.innerHTML = html;

// Re-attach event listeners (important!)
attachEventListeners();
```

This is not ideal but works for educational purposes. For large apps, consider a virtual DOM library or re-architecture with Alpine.js.

### Icon Usage

**Old way (inline SVG):**
```html
<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="..."/>
</svg>
```

**New way (use ui-icon component):**
```html
<ui-icon name="home" size="5"></ui-icon>
<ui-icon name="star-solid" stroke="blue" size="8"></ui-icon>
```

**Available icon names:** Check `src/components/ui-icon/icons.js` for 100+ icons. Use `-solid` suffix for solid variant.

### Modal Usage

Use `<ui-modal>` for dialogs, confirmations, and forms. The component is fully functional with no external dependencies.

**Quick example:**
```javascript
const modal = document.createElement('ui-modal');
modal.setAttribute('title', 'Confirm Action');
modal.innerHTML = '<p>Are you sure?</p>';
document.body.appendChild(modal);

try {
  await modal.show();
  console.log('User confirmed');
} catch (error) {
  console.log('User cancelled');
} finally {
  modal.remove();
}
```

**Key methods:**
- `show()` - Show modal, returns Promise (resolves on OK, rejects on cancel)
- `close(value, reason)` - Close programmatically
- `setTitle(text)` - Update title
- `setButtonText(okText, cancelText)` - Change button labels
- `setOkButtonDisabled(true/false)` - Disable/enable OK button
- `getBody()` - Get modal body element for content access

**Key attributes:**
- `title` - Modal title
- `ok-text` - OK button label (default: "ОК")
- `cancel-text` - Cancel button label (default: "Отмена")
- `show-footer` - Show/hide action buttons (default: true)
- `show-close-button` - Show/hide close (X) button (default: true)
- `backdrop` - Set to `"static"` to prevent closing via backdrop click or ESC

**Features:**
- ✅ Dark theme matching Applearn colors
- ✅ Keyboard support (ESC to close)
- ✅ Click backdrop to close
- ✅ Auto-focus first interactive element
- ✅ Smooth animations
- ✅ Custom events (`modal-open`, `modal-close`)
- ✅ Promise-based API for async/await

**Full documentation:** See `src/components/ui-modal/README.md` and `src/components/ui-modal/QUICK_START.md`

### Drag-and-Drop Implementation (Todo page)

The todo page implements custom drag-and-drop:

```javascript
// In listeners/listeners.js
window.onDragStart = (event) => {
    dragData.current = { listIndex, taskIndex };
    event.dataTransfer.effectAllowed = 'move';
};

window.onTaskDrop = (event) => {
    event.preventDefault();
    const { listIndex, taskIndex } = dragData.current;
    // Update tasks array
    // Re-render UI
    // Sync to server
};

// In HTML:
// <div draggable="true" ondragstart="window.onDragStart(event)">
// <div ondrop="window.onTaskDrop(event)" ondragover="event.preventDefault()">
```

Auto-scroll is implemented via interval that fires while dragging near edges.

## Directory Structure Summary

```
src/
├── main.js                   # Entry point (Alpine + router setup)
├── router.js                 # Navigo routing
├── styles.css                # Global styles
├── constants.js              # API URLs, config
├── http.js                   # Fetch wrapper
├── utils.js                  # Helper functions
├── shell/AppShell.js         # Root layout
├── components/               # Reusable UI
│   ├── sidebar/              # Navigation (Russian)
│   ├── header/               # Weather
│   ├── footer/
│   ├── ui-icon/              # Icon system
│   ├── ui-card/
│   ├── ui-modal/
│   ├── ui-toast/
│   └── ...
├── pages/                    # Route pages (lazy-loaded)
│   ├── timers/               # Stopwatch & timer
│   ├── todo-boards/          # Board selection
│   ├── todo/                 # Board + Kanban
│   │   ├── script.js         # State & init
│   │   ├── listeners/
│   │   └── render/
│   ├── calendar/
│   └── ...
└── api/                      # API utilities
    ├── weather-api.js
    └── getToday.js
```

## Known Issues & Limitations

### Bugs (from project documentation)
1. **Stopwatch minutes display incorrectly** when seconds exceed 60
2. **Stop button changes to pause at 0 milliseconds** on stopwatch
3. **Timer start button fails** on 2nd and subsequent attempts
4. **Mobile responsiveness** needs improvement for timers and todo

### Technical Debt
- Heavy use of `window` globals for state (should be centralized)
- Inline event handlers on HTML elements (maintenance issue)
- DOM re-renders via `innerHTML` destroy and recreate elements (no virtual DOM)
- Limited error handling in API calls (no retry logic, user feedback)
- No input validation or sanitization
- Weather API key hardcoded (should be environment variable)
- No TypeScript (educational but limits catching bugs early)

## Performance & Optimization

**Current optimizations:**
- Lazy-loaded pages (only load when route visited)
- Tailwind CSS purges unused styles on build
- No external JS libraries except essential ones

**Potential improvements:**
- Implement virtual DOM or use Alpine.js more extensively
- Cache API responses (weather, boards)
- Debounce drag-drop event handlers
- Use Service Worker for offline support
- Minimize re-renders by checking data changes

## Testing & Quality

No test suite is currently configured. To add:

```bash
# Example: Install Vitest (lightweight for vanilla JS)
npm install -D vitest

# Create test file: src/utils.test.js
# Run: npx vitest
```

## Localization

All UI text is in **Russian** (Русский):

**Sidebar menu items:**
- Главная (Main) → Мои достижения, Блог, События, Календарь
- Задачи (Tasks)
- О проекте (About)
- Курсы (Courses) → Мои курсы (2), Все курсы (10)
- Таймеры (Timers)
- Профиль (Profile)

When adding features, maintain Russian localization for consistency.

## Development Workflow

### Adding a New Page

1. Create page folder: `src/pages/my-page/`
2. Create component: `src/pages/my-page/index.js`
3. Define class extending `HTMLElement` and call `customElements.define()`
4. Add route in `src/router.js`:
   ```javascript
   router.on("/my-page", async () => {
       await import("./pages/my-page/index.js");
       mount("my-page");
   });
   ```
5. Add link in sidebar (`src/components/sidebar/index.js`)

### Adding a New Component

1. Create: `src/components/my-component/index.js`
2. Export class extending `HTMLElement`
3. Define in `customElements.define('my-component', MyComponent)`
4. Use in templates: `<my-component prop="value"></my-component>`

### Styling a Component

- Use **Tailwind classes** for styling (preferred)
- Add component-scoped CSS in `src/components/component-name/style.css` if needed
- Reference Flowbite docs for pre-built components: https://flowbite.com

### API Integration

```javascript
import { fetcher } from '../http.js';
import { API_URL } from '../constants.js';

// GET request
const data = await fetcher(`${API_URL}/endpoint`);

// POST request
await fetcher(`${API_URL}/endpoint`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ key: 'value' })
});
```

## Important Notes

- **Vanilla JavaScript focus:** This is a learning project. Avoid adding heavy frameworks.
- **Web Components standard:** Use Custom Elements API for modularity.
- **Russian localization:** Maintain Russian UI text throughout.
- **Dark Applearn theme:** Use color palette from above. Primary background: `#1c2434`.
- **Reusable components:** Extract common patterns into ui-* components.
- **No secrets in code:** Weather API key and backend URL should be in environment variables (currently hardcoded for educational purposes).

---

*Last updated: November 19, 2025*
*Applearn platform for educational JavaScript learning*
*"Grow Your Mind. Every Day."*
