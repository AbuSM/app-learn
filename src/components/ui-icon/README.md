# UI Icon Component

A flexible Web Component for displaying Heroicons in your application.

## Features

- ✅ **100+ Popular Icons** from Heroicons
- ✅ **Easy to Use** - Simple HTML syntax
- ✅ **Customizable** - Control size, color, stroke
- ✅ **Lightweight** - No external dependencies
- ✅ **Type Support** - Outline and Solid variants
- ✅ **Fallback** - Defaults to "home" icon if not found
- ✅ **Reactive** - Updates when attributes change

## Installation

Import in your main.js or component file:

```javascript
import './components/ui-icon/index.js';
```

## Basic Usage

```html
<!-- Simple icon -->
<ui-icon name="home"></ui-icon>

<!-- With custom size -->
<ui-icon name="user" size="6"></ui-icon>

<!-- With custom color -->
<ui-icon name="heart" stroke="red"></ui-icon>

<!-- Solid variant -->
<ui-icon name="star-solid"></ui-icon>

<!-- Multiple customizations -->
<ui-icon name="clock" size="8" stroke="#3C50E0" stroke-width="3"></ui-icon>
```

## Attributes

| Attribute | Type | Default | Description |
|-----------|------|---------|-------------|
| `name` | string | `"home"` | Icon name from available icons |
| `size` | string | `"5"` | Tailwind size class (w-{size} h-{size}) |
| `stroke` | string | `"currentColor"` | Stroke color (CSS color value) |
| `fill` | string | `"none"` | Fill color (CSS color value) |
| `stroke-width` | string | `"2"` | Stroke width |
| `class` | string | `""` | Additional CSS classes |

## Available Icons

### Navigation & Menu
- `home`, `menu`, `menu-alt-1`, `menu-alt-2`, `menu-alt-3`
- `x`, `chevron-down`, `chevron-up`, `chevron-left`, `chevron-right`
- `arrow-left`, `arrow-right`, `arrow-up`, `arrow-down`

### User & Profile
- `user`, `user-group`, `user-circle`, `user-add`
- `login`, `logout`

### Time & Calendar
- `clock`, `calendar`, `calendar-days`

### Documents & Content
- `document`, `document-text`, `clipboard`, `clipboard-list`
- `book`, `book-open`, `newspaper`

### Tasks & Productivity
- `check`, `check-circle`, `x-circle`, `clipboard-check`

### Communication
- `mail`, `chat`, `bell`

### Media & Files
- `photo`, `video-camera`, `play`, `pause`, `stop`, `music-note`

### Settings & Tools
- `cog`, `adjustments`, `pencil`, `trash`

### Info & Status
- `information-circle`, `exclamation`, `question-mark-circle`
- `light-bulb`, `star`, `heart`, `fire`

### Shopping & Commerce
- `shopping-cart`, `credit-card`, `currency-dollar`

### Search & View
- `search`, `eye`, `eye-off`, `zoom-in`, `zoom-out`

### Download & Upload
- `download`, `upload`, `cloud-download`, `cloud-upload`

### Social & Share
- `share`, `link`

### Location & Map
- `location-marker`, `map`, `globe`

### Charts & Analytics
- `chart-bar`, `chart-pie`, `trending-up`, `trending-down`

### Solid Variants (Filled)
- `home-solid`, `star-solid`, `heart-solid`

## Examples

### In Sidebar Navigation

```html
<li>
    <a href="/dashboard">
        <ui-icon name="home" size="5"></ui-icon>
        Dashboard
    </a>
</li>

<li>
    <a href="/profile">
        <ui-icon name="user" size="5"></ui-icon>
        Profile
    </a>
</li>
```

### In Buttons

```html
<button>
    <ui-icon name="download" size="4"></ui-icon>
    Download
</button>

<button>
    <ui-icon name="trash" size="4" stroke="red"></ui-icon>
    Delete
</button>
```

### With Custom Styling

```html
<!-- Blue icon -->
<ui-icon name="bell" stroke="#3C50E0" size="6"></ui-icon>

<!-- Large green checkmark -->
<ui-icon name="check-circle" stroke="green" size="10" stroke-width="3"></ui-icon>

<!-- Solid filled star -->
<ui-icon name="star-solid" size="6"></ui-icon>
```

### In Your Sidebar

Replace inline SVGs in your sidebar with `ui-icon`:

**Before:**
```html
<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7..."/>
</svg>
```

**After:**
```html
<ui-icon name="home" size="5"></ui-icon>
```

## JavaScript API

### Check if icon exists

```javascript
import UiIcon from './components/ui-icon/index.js';

if (UiIcon.hasIcon('home')) {
    console.log('Home icon exists!');
}
```

### Get all available icons

```javascript
import UiIcon from './components/ui-icon/index.js';

const icons = UiIcon.getAvailableIcons();
console.log('Available icons:', icons);
```

### Programmatic usage

```javascript
// Create icon element
const icon = document.createElement('ui-icon');
icon.setAttribute('name', 'user');
icon.setAttribute('size', '6');
document.body.appendChild(icon);

// Update icon dynamically
icon.setAttribute('name', 'star');
icon.setAttribute('stroke', 'gold');
```

## Size Reference

Tailwind size classes:
- `size="3"` = 12px (w-3 h-3)
- `size="4"` = 16px (w-4 h-4)
- `size="5"` = 20px (w-5 h-5) - **Default**
- `size="6"` = 24px (w-6 h-6)
- `size="8"` = 32px (w-8 h-8)
- `size="10"` = 40px (w-10 h-10)
- `size="12"` = 48px (w-12 h-12)

## Adding New Icons

To add a new icon:

1. Open `src/components/ui-icon/icons.js`
2. Add your icon path to the `ICONS` object:

```javascript
export const ICONS = {
    // ... existing icons
    'my-custom-icon': '<path d="..."/>',
};
```

3. Use it in your HTML:

```html
<ui-icon name="my-custom-icon"></ui-icon>
```

## Browser Support

- Chrome/Edge 67+
- Firefox 63+
- Safari 10.1+
- All browsers with Custom Elements v1 support

## Performance

- **Lightweight**: ~15KB for all icons
- **No external requests**: Icons are inline
- **Tree-shakeable**: Only load what you use
- **Fast rendering**: Native Web Components

## Troubleshooting

**Icon not showing?**
- Check console for warnings
- Verify icon name is correct
- Check that component is imported

**Icon wrong color?**
- Use `stroke` attribute for outline icons
- Use `fill` for solid icons
- Check parent element color inheritance

**Icon wrong size?**
- Verify Tailwind CSS is loaded
- Check size attribute value
- Check parent container constraints

## Credits

Icons from [Heroicons](https://heroicons.com/) by Tailwind Labs
