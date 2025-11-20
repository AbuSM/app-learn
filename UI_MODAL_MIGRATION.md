# ui-modal Component Migration Guide

## What Was Fixed

The `ui-modal` component has been completely rewritten as a **production-ready Web Component** with the following improvements:

### Before (Old Implementation)
- ❌ Depended on Flowbite JavaScript initialization
- ❌ Didn't actually open/close (just rendered HTML)
- ❌ No methods or API to control the modal
- ❌ Light theme (not matching Applearn dark theme)
- ❌ Required external id attributes
- ❌ No event handling or promise-based API
- ❌ Difficult to use anywhere in the project

### After (New Implementation)
- ✅ **Standalone Web Component** - No external dependencies
- ✅ **Fully Functional** - Actually opens, closes, and manages state
- ✅ **Promise-based API** - Use `async/await` or `.then()`
- ✅ **Dark Theme** - Built-in Applearn colors (#1c2434, #3c50e0, etc.)
- ✅ **Rich API** - show(), close(), setTitle(), setButtonText(), etc.
- ✅ **Events** - modal-open and modal-close custom events
- ✅ **Accessible** - ARIA attributes, keyboard support (ESC), auto-focus
- ✅ **Easy to Use** - Works anywhere in your project with zero setup

## New Features

### 1. Promise-based API
```javascript
const modal = document.createElement('ui-modal');
modal.setAttribute('title', 'Confirm');
modal.innerHTML = '<p>Proceed?</p>';
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

### 2. Methods
```javascript
modal.setTitle('New Title');
modal.setButtonText('Save', 'Discard');
modal.setOkButtonDisabled(true);
modal.close(true, 'ok');
```

### 3. Custom Events
```javascript
modal.addEventListener('modal-open', () => {
  console.log('Modal is now visible');
});

modal.addEventListener('modal-close', (e) => {
  console.log('Closed reason:', e.detail.reason);
});
```

### 4. Dark Theme
All colors match Applearn branding:
- Background: `#252e3b`
- Border: `#374151`
- Text: `#ffffff`
- Accent: `#3c50e0`
- Hover: `#495569`

## How to Use

### Basic Usage
```html
<ui-modal title="Dialog Title">
  <p>Your content here</p>
</ui-modal>
```

```javascript
const modal = document.querySelector('ui-modal');
await modal.show();
modal.remove();
```

### Create Dynamically
```javascript
const modal = document.createElement('ui-modal');
modal.setAttribute('title', 'Create Task');
modal.setAttribute('ok-text', 'Create');
modal.innerHTML = `
  <input type="text" placeholder="Task name">
  <textarea placeholder="Description"></textarea>
`;
document.body.appendChild(modal);

try {
  await modal.show();
  const name = modal.querySelector('input').value;
  console.log('Created:', name);
} finally {
  modal.remove();
}
```

### With Validation
```javascript
const modal = document.createElement('ui-modal');
modal.setAttribute('title', 'Username');
modal.innerHTML = '<input type="text" class="username-input">';
document.body.appendChild(modal);

const input = modal.querySelector('.username-input');

// Disable OK button until input has value
modal.setOkButtonDisabled(true);
input.addEventListener('input', (e) => {
  modal.setOkButtonDisabled(!e.target.value.trim());
});

await modal.show();
console.log('Username:', input.value);
modal.remove();
```

## Migration from Old Code

If you were using the old `change_modal.js` pattern:

### Old Way
```javascript
const modalElement = getDOMElement(/* html */);
document.body.appendChild(modalElement);
// ... 50+ lines of event listener setup ...
```

### New Way
```javascript
const modal = document.createElement('ui-modal');
modal.setAttribute('title', 'Change Task');
modal.innerHTML = /* html */;
document.body.appendChild(modal);

try {
  await modal.show();
  // Get form values from modal.querySelector()
} catch (error) {
  // User cancelled
} finally {
  modal.remove();
}
```

## Documentation

Three documentation files available:

1. **QUICK_START.md** - Quick reference with common patterns
2. **README.md** - Complete API documentation and examples
3. **examples.js** - 7 production-ready examples

Location: `src/components/ui-modal/`

## Compatibility

Works in all modern browsers:
- Chrome/Edge 67+
- Firefox 63+
- Safari 13.1+

Requires Custom Elements v1 support (available in all modern browsers).

## Zero Setup Required

The component is automatically imported and registered in `src/main.js`:

```javascript
import "./components"; // Includes ui-modal
```

Just use it anywhere:
```javascript
const modal = document.createElement('ui-modal');
```

## Examples

### Confirmation Dialog
```javascript
const confirmed = await modal.show();
if (confirmed) {
  await deleteTask();
}
```

### Form Modal
```javascript
const result = await modal.show();
const formData = {
  title: modal.querySelector('input').value,
  desc: modal.querySelector('textarea').value,
};
```

### Alert Message
```javascript
modal.setAttribute('show-footer', 'false');
modal.setAttribute('show-close-button', 'false');
modal.innerHTML = '<p>Processing...</p>';
```

### Static Backdrop
```javascript
modal.setAttribute('backdrop', 'static');
modal.setAttribute('show-close-button', 'false');
// User must click OK or Cancel button
```

## API Reference

| Method | Returns | Description |
|--------|---------|-------------|
| `show()` | Promise | Show modal (resolves on OK, rejects on cancel) |
| `close(value, reason)` | void | Close programmatically |
| `setTitle(text)` | void | Update modal title |
| `setButtonText(ok, cancel)` | void | Change button labels |
| `setOkButtonDisabled(bool)` | void | Disable/enable OK |
| `setCancelButtonDisabled(bool)` | void | Disable/enable Cancel |
| `getBody()` | HTMLElement | Get modal body for content access |
| `isModalOpen()` | boolean | Check if open |

## Attributes

| Attribute | Default | Description |
|-----------|---------|-------------|
| `title` | `""` | Modal title |
| `ok-text` | `"ОК"` | OK button label |
| `cancel-text` | `"Отмена"` | Cancel button label |
| `show-footer` | `true` | Show action buttons |
| `show-close-button` | `true` | Show X button |
| `backdrop` | `dismissible` | Set to `static` to disable close |

## Common Patterns

### Pattern 1: Delete Confirmation
```javascript
async function deleteItem(name) {
  const modal = document.createElement('ui-modal');
  modal.setAttribute('title', 'Delete?');
  modal.setAttribute('ok-text', 'Delete');
  modal.innerHTML = `<p>Delete "${name}"?</p>`;
  document.body.appendChild(modal);

  try {
    await modal.show();
    return true; // Confirmed
  } catch (error) {
    return false; // Cancelled
  } finally {
    modal.remove();
  }
}
```

### Pattern 2: Form Modal
```javascript
async function editTask(task) {
  const modal = document.createElement('ui-modal');
  modal.setAttribute('title', 'Edit Task');
  modal.innerHTML = `
    <input value="${task.title}" class="task-title">
    <textarea class="task-desc">${task.description}</textarea>
  `;
  document.body.appendChild(modal);

  try {
    await modal.show();
    return {
      title: modal.querySelector('.task-title').value,
      description: modal.querySelector('.task-desc').value,
    };
  } catch (error) {
    return null;
  } finally {
    modal.remove();
  }
}
```

### Pattern 3: Loading Modal
```javascript
async function processWithProgress() {
  const modal = document.createElement('ui-modal');
  modal.setAttribute('title', 'Processing...');
  modal.setAttribute('backdrop', 'static');
  modal.setAttribute('show-footer', 'false');
  modal.innerHTML = '<p>Loading...</p>';
  document.body.appendChild(modal);

  const promise = modal.show().catch(() => {});

  try {
    const result = await longOperation();
    modal.setTitle('Success!');
    modal.innerHTML = '<p>Done!</p>';
    await modal.show();
    return result;
  } catch (error) {
    modal.setTitle('Error');
    modal.innerHTML = `<p>Failed: ${error.message}</p>`;
    await modal.show();
    throw error;
  } finally {
    modal.remove();
  }
}
```

## Best Practices

1. **Always clean up**: `modal.remove()` after use
2. **Use try/catch**: Handle both confirmation and cancellation
3. **Auto-focus**: First input automatically gets focus
4. **Keyboard support**: ESC to close (unless backdrop="static")
5. **Click backdrop**: Click dark area to close (unless backdrop="static")
6. **Validation**: Use `setOkButtonDisabled()` for input validation
7. **Keep content simple**: Avoid complex nested layouts
8. **Use slot**: For static content in declarative usage

## Troubleshooting

**Modal doesn't show?**
- Make sure you called `modal.show()` and awaited it
- Check that modal is appended to DOM: `document.body.appendChild(modal)`

**Buttons don't work?**
- Use `await modal.show()` to wait for user response
- Check that event listeners are attached (they are automatically)

**Wrong colors?**
- Component uses CSS custom properties matching Applearn theme
- Colors are embedded, no need for external theme

**ESC doesn't close?**
- Set `backdrop="dismissible"` or remove `backdrop="static"`

---

**Updated:** November 19, 2025
**Component Version:** v2.0
**Status:** Production Ready ✓
