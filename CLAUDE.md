# CLAUDE.md - Project Documentation

## Project Overview
**t-stopwatch** (now branded as **Applearn**) is a learning platform focused on building educational tools with complex functionality using Vanilla JavaScript. The project features a modern dark-themed interface with Russian localization, designed for Technohub students to practice advanced JavaScript concepts.

## Tech Stack
- **Build Tool**: Vite 6.3.6
- **Styling**: Tailwind CSS 4.1.14 + Flowbite 3.1.2
- **JavaScript Framework**: Alpine.js 3.15.0 with Persist plugin
- **Routing**: Navigo 8.11.1
- **Icons**: Heroicons (via custom ui-icon component)
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
- **NEW**: Reusable UI Icon component with 100+ Heroicons
- Modern UI with Tailwind CSS and Flowbite

## Recent Updates (October 27, 2025)

### NEW: UI Icon Component System

A comprehensive icon component system has been created to standardize icon usage across the application.

#### Features
- ✅ **100+ Heroicons** - Popular icons from Heroicons library
- ✅ **Web Component** - Custom `<ui-icon>` element
- ✅ **Easy to Use** - Simple HTML syntax: `<ui-icon name="home"></ui-icon>`
- ✅ **Customizable** - Control size, color, stroke via attributes
- ✅ **Type Support** - Outline (default) and Solid variants
- ✅ **Fallback System** - Defaults to "home" icon if not found
- ✅ **Reactive** - Updates when attributes change
- ✅ **Lightweight** - No external dependencies, ~15KB total

#### Component Structure
```
src/components/ui-icon/
├── index.js       # Web Component definition
├── icons.js       # 100+ Heroicon SVG paths
└── README.md      # Complete documentation
```

#### Usage Examples
```html
<!-- Basic usage -->
<ui-icon name="home"></ui-icon>

<!-- With size -->
<ui-icon name="user" size="6"></ui-icon>

<!-- With color -->
<ui-icon name="heart" stroke="red"></ui-icon>

<!-- Solid variant -->
<ui-icon name="star-solid"></ui-icon>
```

#### Available Icon Categories
- **Navigation** - home, menu, arrows, chevrons
- **User & Profile** - user, user-group, login, logout
- **Time** - clock, calendar
- **Documents** - document, clipboard, book
- **Tasks** - check, check-circle, clipboard-check
- **Communication** - mail, chat, bell
- **Media** - photo, video, play, pause, stop
- **Settings** - cog, adjustments, pencil, trash
- **Info** - information-circle, question-mark-circle, star
- **Shopping** - shopping-cart, credit-card
- **Search** - search, eye, zoom
- **Files** - download, upload, cloud-upload
- **Social** - share, link
- **Location** - location-marker, map, globe
- **Charts** - chart-bar, chart-pie, trending-up
- And many more...

#### Integration with Sidebar
The sidebar can now be refactored to use `<ui-icon>` instead of inline SVGs:

**Before:**
```html
<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="..."/>
</svg>
```

**After:**
```html
<ui-icon name="home" size="5"></ui-icon>
```

#### Recommended Next Steps
1. Refactor sidebar to use `<ui-icon>` component
2. Replace all inline SVGs throughout the app
3. Use consistent icon naming across features
4. Add new icons to `icons.js` as needed

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
- ✅ **Icons**: Using ui-icon component for all menu items (cleaner code)
- ✅ **Refactored**: Replaced all inline SVGs with reusable ui-icon component

#### Technical Implementation
- **Fixed Positioning**: Sidebar fixed at 280px width
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
3. ✅ Icon component system (Completed with ui-icon)
4. User authentication system (Authorization/Registration)
5. Day counter feature (clock counting days)
6. Achievement tracking system
7. Course progress tracking
8. Event calendar functionality
9. Refactor sidebar to use ui-icon component

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
│   │   ├── ui-icon/       # NEW: Reusable icon component
│   │   │   ├── index.js   # Component definition
│   │   │   ├── icons.js   # 100+ Heroicons
│   │   │   └── README.md  # Component docs
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

## Component Documentation

### UI Icon Component

**Location**: `src/components/ui-icon/`

**Attributes**:
| Attribute | Type | Default | Description |
|-----------|------|---------|-------------|
| `name` | string | `"home"` | Icon name |
| `size` | string | `"5"` | Tailwind size (w-5 h-5) |
| `stroke` | string | `"currentColor"` | Stroke color |
| `fill` | string | `"none"` | Fill color |
| `stroke-width` | string | `"2"` | Stroke width |

**JavaScript API**:
```javascript
import UiIcon from './components/ui-icon/index.js';

// Check if icon exists
UiIcon.hasIcon('home'); // true

// Get all available icons
UiIcon.getAvailableIcons(); // Array of icon names
```

**Full Documentation**: See `src/components/ui-icon/README.md`

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

## Design Philosophy
- **Dark Theme First**: Professional dark interface (#1c2434)
- **Russian Localization**: Primary language for target audience
- **Learning Focus**: Educational platform aesthetic
- **Clean Hierarchy**: Clear visual separation of menu levels
- **Minimal UI**: No unnecessary elements, removed auth buttons
- **Badge System**: Quick visual feedback for content counts
- **Reusable Components**: Standardized UI elements (ui-icon)

## Notes for Claude AI Assistant
- Project now branded as "Applearn" with Russian interface
- **NEW**: Use `<ui-icon>` component for all icons throughout the app
- Sidebar uses Web Components (Custom Elements) pattern
- All menu items in Russian - maintain localization
- Focus on maintaining clean, educational code
- Badge system uses `#3C50E0` blue with white text
- Active states use `#2a3142` background
- Dropdowns default to expanded (visible) state for main sections
- Fixed sidebar width is 280px (not 288px as previously noted)
- Use Alpine.js for state management and Navigo for routing
- All styling uses Tailwind CSS utility classes
- Icon component supports 100+ Heroicons with easy customization

## Contributing
This is a learning project for Technohub students. All contributions should:
- Prioritize code clarity and educational value
- Maintain Russian localization
- Follow the established dark theme color palette
- Keep the Applearn brand identity consistent
- Use `<ui-icon>` component instead of inline SVGs

## Browser Support
- Modern browsers with ES6+ support
- CSS Grid and Flexbox support required
- Custom Elements v1 support required
- SVG support for icons and logo

## Changelog

### Version 2.1 - October 27, 2025
- ✅ Created comprehensive ui-icon component system
- ✅ Added 100+ Heroicons to icons.js
- ✅ Implemented Web Component for icons with reactive attributes
- ✅ Created detailed component documentation
- ✅ Fixed sidebar width to 280px (corrected from 288px)
- ✅ Refactored sidebar to use ui-icon component instead of inline SVGs

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
*New ui-icon component system added*  
*Sidebar redesigned with Applearn brand and Russian interface*  
*"Grow Your Mind. Every Day."*
