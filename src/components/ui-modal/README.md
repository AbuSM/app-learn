# ui-modal Component

A fully-functional Web Component modal dialog built with vanilla JavaScript. Works standalone with no external dependencies (except the Applearn dark theme).

## Features

✅ **True Web Component** - HTML Custom Element that works anywhere
✅ **Dark Theme** - Built-in Applearn dark theme with customizable colors
✅ **Promise-based API** - Use async/await or `.then()`
✅ **Event Emitters** - Custom events for open/close
✅ **Fully Accessible** - ARIA attributes, keyboard support (ESC), focus management
✅ **Responsive** - Max 90vw/90vh with proper scrolling
✅ **Smooth Animations** - Scale + fade transitions
✅ **Zero Dependencies** - No Flowbite or Alpine.js required

## Installation

The component is already imported in your main app. Just use it in any HTML file or component.

## Usage

### 1. Basic Usage (Declarative)

Place the modal in your HTML with slot content:

```html
<ui-modal title="Confirm Action">
  <p>Are you sure you want to delete this item?</p>
</ui-modal>
```

Show it with JavaScript:

```javascript
const modal = document.querySelector('ui-modal');

modal.show()
  .then(() => {
    console.log('User clicked OK');
    // Perform action
  })
  .catch((err) => {
    console.log('User cancelled:', err.message);
  });
```

### 2. Programmatic Usage (Create & Show)

```javascript
// Create modal dynamically
const modal = document.createElement('ui-modal');
modal.setAttribute('title', 'Enter Your Name');
modal.innerHTML = '<input type="text" id="name-input" placeholder="Your name">';

document.body.appendChild(modal);

// Show and handle response
const result = await modal.show();
const nameInput = modal.querySelector('#name-input');
console.log('User entered:', nameInput.value);
```

### 3. With Custom Button Text

```html
<ui-modal
  title="Delete Confirmation"
  ok-text="Delete"
  cancel-text="Keep It"
>
  <p>This action cannot be undone.</p>
</ui-modal>
```

### 4. Modal Without Footer

```html
<ui-modal
  title="Loading..."
  show-footer="false"
  show-close-button="false"
>
  <div style="text-align: center;">
    <p>Processing your request...</p>
  </div>
</ui-modal>
```

### 5. Static Backdrop (Can't Click to Close)

```html
<ui-modal
  title="Important Notice"
  backdrop="static"
  show-close-button="false"
>
  <p>Please confirm to continue.</p>
</ui-modal>
```

### 6. Form Modal

```html
<ui-modal title="Create New Task" ok-text="Create">
  <form>
    <div style="margin-bottom: 1rem;">
      <label style="display: block; margin-bottom: 0.5rem;">Task Title</label>
      <input type="text" id="task-title" placeholder="Enter task title" style="width: 100%; padding: 0.5rem; border-radius: 4px; border: 1px solid #374151; background: #1c2434; color: white;">
    </div>
    <div>
      <label style="display: block; margin-bottom: 0.5rem;">Description</label>
      <textarea id="task-desc" placeholder="Task description" rows="4" style="width: 100%; padding: 0.5rem; border-radius: 4px; border: 1px solid #374151; background: #1c2434; color: white;"></textarea>
    </div>
  </form>
</ui-modal>
```

Then get the values:

```javascript
const modal = document.querySelector('ui-modal');

const result = await modal.show();
if (result) {
  const title = modal.querySelector('#task-title').value;
  const desc = modal.querySelector('#task-desc').value;
  console.log('Task:', { title, desc });
}
```

## API

### Attributes

| Attribute | Type | Default | Description |
|-----------|------|---------|-------------|
| `title` | string | `""` | Modal title text |
| `ok-text` | string | `"ОК"` | Text for OK button |
| `cancel-text` | string | `"Отмена"` | Text for Cancel button |
| `show-footer` | boolean | `true` | Show/hide action buttons |
| `show-close-button` | boolean | `true` | Show/hide close (X) button |
| `backdrop` | string | `"dismissible"` | `"static"` to prevent backdrop click close |

### Methods

#### `show()`
Shows the modal and returns a Promise.

```javascript
const modal = document.querySelector('ui-modal');

try {
  await modal.show();
  // User clicked OK
} catch (error) {
  // User clicked Cancel, close button, ESC, or backdrop
  console.log(error.message); // 'Modal closed: cancel'
}
```

**Returns:** `Promise` that resolves with `true` on OK, rejects on cancel

#### `close(value, reason)`
Closes the modal programmatically.

```javascript
const modal = document.querySelector('ui-modal');

// Close from code
modal.close(true, 'ok');

// The promise will resolve/reject based on the value
```

**Parameters:**
- `value` (any) - Value to resolve/reject with
- `reason` (string) - One of: `'ok'`, `'cancel'`, `'close'`, `'backdrop'`, `'escape'`

#### `setTitle(title)`
Update modal title dynamically.

```javascript
modal.setTitle('New Title');
```

#### `setButtonText(okText, cancelText)`
Change button labels after creation.

```javascript
modal.setButtonText('Confirm', 'Decline');
```

#### `isModalOpen()`
Check if modal is currently visible.

```javascript
if (modal.isModalOpen()) {
  console.log('Modal is open');
}
```

#### `getBody()`
Get the modal body element (where slot content is).

```javascript
const body = modal.getBody();
body.innerHTML = '<p>New content</p>';
```

#### `setOkButtonDisabled(disabled)`
Disable/enable the OK button.

```javascript
modal.setOkButtonDisabled(true); // Disable OK button
modal.setOkButtonDisabled(false); // Enable OK button
```

#### `setCancelButtonDisabled(disabled)`
Disable/enable the Cancel button.

```javascript
modal.setCancelButtonDisabled(true);
```

### Events

#### `modal-open`
Fired when modal becomes visible.

```javascript
modal.addEventListener('modal-open', () => {
  console.log('Modal opened');
  // Auto-focus first input, analytics, etc.
});
```

#### `modal-close`
Fired when modal closes.

```javascript
modal.addEventListener('modal-close', (event) => {
  console.log('Close reason:', event.detail.reason); // 'ok', 'cancel', 'escape', etc.
  console.log('Value:', event.detail.value); // Whatever was passed to close()
});
```

## Examples

### Example 1: Confirmation Dialog

```javascript
async function deleteTask(taskId) {
  const modal = document.createElement('ui-modal');
  modal.setAttribute('title', 'Delete Task?');
  modal.innerHTML = `
    <p>Are you sure you want to delete this task?</p>
    <p style="color: #9ca3af; font-size: 0.875rem;">This action cannot be undone.</p>
  `;
  modal.setButtonText('Delete', 'Cancel');

  document.body.appendChild(modal);

  try {
    await modal.show();
    // Confirmed - delete the task
    await deleteTaskAPI(taskId);
    showToast('Task deleted successfully', 'success');
  } catch (error) {
    // Cancelled
    showToast('Deletion cancelled');
  } finally {
    modal.remove();
  }
}

// Usage
deleteTask(123);
```

### Example 2: Form Modal with Validation

```javascript
async function editTask(task) {
  const modal = document.createElement('ui-modal');
  modal.setAttribute('title', 'Edit Task');
  modal.innerHTML = `
    <div>
      <label style="display: block; margin-bottom: 0.5rem; color: #9ca3af;">Title</label>
      <input
        type="text"
        class="task-title"
        value="${task.title}"
        style="width: 100%; padding: 0.5rem; border: 1px solid #374151; background: #1c2434; color: white; border-radius: 4px;"
      >
    </div>
  `;

  document.body.appendChild(modal);

  // Disable OK button until input has value
  const titleInput = modal.querySelector('.task-title');
  modal.setOkButtonDisabled(!titleInput.value);

  titleInput.addEventListener('input', (e) => {
    modal.setOkButtonDisabled(!e.target.value.trim());
  });

  try {
    await modal.show();
    const newTitle = titleInput.value.trim();
    if (newTitle) {
      await updateTaskAPI(task.id, { title: newTitle });
      showToast('Task updated');
    }
  } catch (error) {
    showToast('Edit cancelled');
  } finally {
    modal.remove();
  }
}
```

### Example 3: Modal in Component

```javascript
class TaskEditor extends HTMLElement {
  async editTask(task) {
    // Get or create modal
    let modal = this.querySelector('ui-modal');
    if (!modal) {
      modal = document.createElement('ui-modal');
      modal.setAttribute('title', 'Edit Task');
      this.appendChild(modal);
    }

    // Set content
    const titleInput = document.createElement('input');
    titleInput.type = 'text';
    titleInput.value = task.title;
    modal.getBody().innerHTML = '';
    modal.getBody().appendChild(titleInput);

    try {
      await modal.show();
      // Handle success
      console.log('New title:', titleInput.value);
    } catch (error) {
      // Handle cancellation
      console.log('Edit cancelled');
    }
  }
}
```

## Styling

### Custom Colors

Override the CSS custom properties:

```css
ui-modal {
  --modal-bg: #1a1f2e;           /* Background color */
  --modal-border: #2d3748;       /* Border color */
  --modal-text: #ffffff;         /* Text color */
  --modal-text-secondary: #a0aec0; /* Secondary text */
  --modal-accent: #4299e1;       /* Button accent color */
  --modal-hover: #2d3748;        /* Hover state background */
}
```

### Style Modal Content

```html
<ui-modal title="Styled Content">
  <div style="
    background: rgba(255, 255, 255, 0.05);
    padding: 1rem;
    border-radius: 4px;
    margin-bottom: 1rem;
  ">
    <p>Your content with custom styles</p>
  </div>
</ui-modal>
```

## Migration from Old Modal

### Old way (change_modal.js pattern):

```javascript
// Old: Manual DOM manipulation
const modalElement = getDOMElement(/* html string */);
document.body.appendChild(modalElement);
// ... lots of event listener setup ...
```

### New way (ui-modal component):

```javascript
// New: Simple and clean
const modal = document.createElement('ui-modal');
modal.setAttribute('title', 'Dialog Title');
modal.innerHTML = /* html */;
document.body.appendChild(modal);

const result = await modal.show();
modal.remove();
```

## Browser Support

- Chrome/Edge 67+
- Firefox 63+
- Safari 13.1+
- All modern browsers with Custom Elements v1 support

## Accessibility

- ✅ ARIA attributes (`role="dialog"`, `aria-modal="true"`, `aria-labelledby`)
- ✅ Keyboard support (ESC to close)
- ✅ Focus management (auto-focus first interactive element)
- ✅ Proper semantic HTML
- ✅ Screen reader friendly

## Tips & Best Practices

1. **Always clean up:** Remove modal from DOM after closing
   ```javascript
   modal.remove(); // Important!
   ```

2. **Use for important actions:** Better for confirmations, forms, critical messages
   ```javascript
   // Good use cases:
   - Confirm before delete
   - Important form input
   - Critical alerts

   // Bad use cases:
   - Simple notifications (use toast instead)
   - Passive messages
   ```

3. **Keep modal content simple:** Avoid too much content to maintain UX
   ```javascript
   // Good: Clear, focused content
   modal.innerHTML = '<p>Delete this item?</p>';

   // Bad: Too much content
   modal.innerHTML = '<!-- 50 lines of HTML -->';
   ```

4. **Handle errors properly:**
   ```javascript
   try {
     await modal.show();
   } catch (error) {
     console.log('Modal closed:', error.message);
   }
   ```

5. **Use for forms:** Perfect for edit dialogs
   ```javascript
   const input = modal.querySelector('input');
   input.focus(); // Auto-focus happens, but you can do it too
   ```

---

**Last updated:** November 19, 2025
**Component:** ui-modal v2.0 (Web Component)
**Status:** Production ready
