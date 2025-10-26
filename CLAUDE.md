# CLAUDE.md - Project Documentation

## Project Overview
**t-stopwatch** (now branded as **Applearn**) is a learning platform focused on building educational tools with complex functionality using Vanilla JavaScript. The project features a modern dark-themed interface with Russian localization, designed for Technohub students to practice advanced JavaScript concepts.

## Tech Stack
- **Build Tool**: Vite 6.3.6
- **Styling**: Tailwind CSS 4.1.14 + Flowbite 3.1.2
- **JavaScript Framework**: Alpine.js 3.15.0 with Persist plugin
- **Routing**: Navigo 8.11.1
- **Language**: Vanilla JavaScript
- **UI Language**: Russian (Русский)

## Current Features
- Stopwatch functionality
- Timer functionality
- Modern dark-themed sidebar with Russian interface
- Responsive navigation with collapsible dropdown menus
- Course management with badge counters
- Profile management
- Task management system
- Modern UI with Tailwind CSS and Flowbite

## Recent Updates (October 27, 2025)

### Major Sidebar Redesign - "Applearn" Theme

The sidebar has been completely redesigned to match the Applearn brand with Russian localization:

#### Brand Identity
- **Logo**: Custom Applearn SVG logo integrated
- **Tagline**: "Grow Your Mind. Every Day."
- **Color Scheme**: 
  - Primary background: `#1c2434`
  - Active/Hover: `#2a3142` and `#333a48`
  - Accent blue: `#3C50E0`
  - Text: White with gray-400 for secondary items

#### Menu Structure (Russian Interface)
1. **Главная (Main)** - Collapsible dropdown with:
   - Мои достижения (My Achievements)
   - Блог (Blog) - *Active state*
   - События (Events)
   - Календарь (Calendar)

2. **Задачи (Tasks)** - Task management

3. **О проекте (About)** - Project information

4. **Курсы (Courses)** - Collapsible dropdown with badges:
   - Мои курсы (My Courses) - Badge: 2
   - Все курсы (All Courses) - Badge: 10

5. **Таймеры (Timers)** - Timer and stopwatch tools

6. **Профиль (Profile)** - User profile

#### Key Changes from Previous Version
- ✅ **Removed**: Sign Up and Login buttons
- ✅ **Added**: Custom Applearn logo with tagline
- ✅ **Localized**: All menu items now in Russian
- ✅ **Enhanced**: Badge counters for course sections
- ✅ **Improved**: Two-level navigation with collapsible sections
- ✅ **Styled**: Active states for current page (Блог shown as active)
- ✅ **Icons**: SVG icons for all menu items with proper spacing

#### Technical Implementation
- **Fixed Positioning**: Sidebar fixed at 288px width (w-72)
- **Collapsible Menus**: JavaScript-driven dropdown functionality
- **Badge System**: Blue badges showing counts (e.g., 2 courses, 10 total)
- **Active States**: Background color `#2a3142` for active menu items
- **Hover Effects**: Smooth transitions with `#333a48` hover state
- **Border Separators**: Gray-700 border under logo section

### Styling Updates
- Updated `styles.css` with enhanced sidebar styling
- Added badge-specific styling
- Implemented submenu border indicators
- Adjusted font sizes for better hierarchy:
  - Menu items: 15px
  - Section headers: 11px (uppercase, tracked)
  - Submenus: 13px
- Fixed logo sizing (max-width: 140px)
- Added proper line-height for readability

## Known Issues (Bug Fixes Needed)
1. **Stopwatch**: Minutes display incorrectly when seconds exceed 60
2. **Stopwatch**: Stop button changes to pause at 0 milliseconds
3. **Timer**: Start button doesn't work on second and subsequent attempts
4. **Layout**: Mobile responsiveness needs improvement for both components

## Planned Features
1. ✅ Navigation menu implementation (Completed with Russian dark theme)
2. ✅ Tab interface for switching between sections (Implemented in sidebar)
3. User authentication system (Authorization/Registration)
4. Day counter feature (clock counting days)
5. Achievement tracking system
6. Course progress tracking
7. Event calendar functionality

## Development

### Installation
```bash
npm install
```

### Development Server
```bash
npm run dev
```

### Build for Production
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

## Project Structure
```
t-stopwatch/
├── src/
│   ├── components/
│   │   ├── sidebar/       # Applearn-branded Russian sidebar
│   │   ├── header/
│   │   └── footer/
│   ├── pages/
│   │   ├── timers/        # Stopwatch and timer functionality
│   │   ├── events/        # Events management
│   │   └── todo/          # Task management
│   ├── shell/             # AppShell component
│   └── styles.css         # Global styles with Applearn theme
├── assets/                # Static assets
├── media/                 # Media files
├── index.html             # Entry HTML file
└── vite.config.mjs        # Vite configuration
```

## Sidebar Implementation Details

### Menu Items (Russian)
| English | Russian | Icon | Type |
|---------|---------|------|------|
| Main | Главная | Menu bars | Dropdown |
| My Achievements | Мои достижения | - | Sub-item |
| Blog | Блог | - | Sub-item (Active) |
| Events | События | - | Sub-item |
| Calendar | Календарь | - | Sub-item |
| Tasks | Задачи | Clipboard | Single |
| About | О проекте | Info circle | Single |
| Courses | Курсы | Book | Dropdown |
| My Courses | Мои курсы | - | Sub-item (Badge: 2) |
| All Courses | Все курсы | - | Sub-item (Badge: 10) |
| Timers | Таймеры | Clock | Single |
| Profile | Профиль | User | Single |

### Color Palette
```css
Background: #1c2434
Active/Selected: #2a3142
Hover: #333a48
Accent Blue: #3C50E0
Border: #374151 (gray-700)
Text Primary: #FFFFFF (white)
Text Secondary: #9CA3AF (gray-400)
Text Label: #6B7280 (gray-500)
```

### Features
- **Responsive Design**: Collapses on mobile with toggle button
- **Dropdown Support**: Главная and Курсы sections expand/collapse
- **Badge Counters**: Blue badges show numeric counts
- **Icon Integration**: SVG icons for all primary menu items
- **Active States**: Visual feedback for current page
- **Professional Typography**: Uppercase section headers with tracking
- **Smooth Animations**: 300ms transitions on all interactions

### JavaScript Interaction
Dropdown menus use inline `onclick` handlers:
```javascript
onclick="event.preventDefault(); 
         this.nextElementSibling.classList.toggle('hidden'); 
         this.querySelector('.arrow-icon').classList.toggle('rotate-180')"
```

### SVG Logo Implementation
The Applearn logo is embedded as inline SVG with pattern fill:
- Dimensions: 185x61 viewport
- Uses base64 encoded image pattern
- Scales responsively (max-width: 140px)

## Design Philosophy
- **Dark Theme First**: Professional dark interface (#1c2434)
- **Russian Localization**: Primary language for target audience
- **Learning Focus**: Educational platform aesthetic
- **Clean Hierarchy**: Clear visual separation of menu levels
- **Minimal UI**: No unnecessary elements, removed auth buttons
- **Badge System**: Quick visual feedback for content counts

## Notes for Claude AI Assistant
- Project now branded as "Applearn" with Russian interface
- Sidebar uses Web Components (Custom Elements) pattern
- All menu items in Russian - maintain localization
- Focus on maintaining clean, educational code
- Badge system uses `#3C50E0` blue with white text
- Active states use `#2a3142` background
- Dropdowns default to expanded (visible) state for main sections
- Pay attention to time calculations for timer/stopwatch features
- Fixed sidebar requires 288px left margin on main content
- Use Alpine.js for state management and Navigo for routing
- All styling uses Tailwind CSS utility classes

## Contributing
This is a learning project for Technohub students. All contributions should:
- Prioritize code clarity and educational value
- Maintain Russian localization
- Follow the established dark theme color palette
- Keep the Applearn brand identity consistent

## Browser Support
- Modern browsers with ES6+ support
- CSS Grid and Flexbox support required
- Custom Elements v1 support required
- SVG support for icons and logo

## Changelog

### Version 2.0 - October 27, 2025
- ✅ Rebranded to "Applearn" with custom logo
- ✅ Complete Russian localization of sidebar
- ✅ Removed Sign Up/Login buttons
- ✅ Added badge system for course counts
- ✅ Implemented two-level navigation structure
- ✅ Added active state styling
- ✅ Enhanced typography and spacing
- ✅ Improved color consistency

### Version 1.0 - October 27, 2025
- ✅ Initial TailAdmin-inspired sidebar
- ✅ Dark theme implementation
- ✅ Basic navigation structure

---
*Last updated: October 27, 2025*  
*Sidebar redesigned with Applearn brand and Russian interface*  
*"Grow Your Mind. Every Day."*
