# ui-modal Quick Start

Use the `<ui-modal>` Web Component for dialogs, confirmations, and forms.

## 1 Minute Example

```javascript
// Create modal
const modal = document.createElement('ui-modal');
modal.setAttribute('title', 'Confirm Action');
modal.innerHTML = '<p>Are you sure?</p>';
document.body.appendChild(modal);

// Show and get result
const confirmed = await modal.show();
if (confirmed) {
  console.log('User clicked OK');
} else {
  console.log('User clicked Cancel');
}

// Clean up
modal.remove();
```

## Common Patterns

### Confirmation Dialog
```javascript
const modal = document.createElement('ui-modal');
modal.setAttribute('title', 'Delete Item?');
modal.setAttribute('ok-text', 'Delete');
modal.innerHTML = '<p>This cannot be undone.</p>';
document.body.appendChild(modal);

try {
  await modal.show();
  // Delete confirmed
} catch (error) {
  // Cancelled
} finally {
  modal.remove();
}
```

### Form Modal
```javascript
const modal = document.createElement('ui-modal');
modal.setAttribute('title', 'Create Task');
modal.innerHTML = `
  <input type="text" class="form-input" placeholder="Title">
`;
document.body.appendChild(modal);

await modal.show();
const title = modal.querySelector('.form-input').value;
modal.remove();
```

### Simple Alert
```javascript
const modal = document.createElement('ui-modal');
modal.setAttribute('title', 'Success');
modal.setAttribute('ok-text', 'OK');
modal.setAttribute('show-close-button', 'false');
modal.innerHTML = '<p>Task created!</p>';
document.body.appendChild(modal);

await modal.show();
modal.remove();
```

## Attributes

```html
<ui-modal
  title="Dialog Title"
  ok-text="Confirm"
  cancel-text="Cancel"
  show-footer="true"
  show-close-button="true"
  backdrop="dismissible"
>
  <p>Your content here</p>
</ui-modal>
```

## Methods

| Method | Usage |
|--------|-------|
| `show()` | Show modal, returns Promise |
| `close(value, reason)` | Close modal programmatically |
| `setTitle(text)` | Update title |
| `setButtonText(ok, cancel)` | Change button labels |
| `setOkButtonDisabled(true/false)` | Disable OK button |
| `getBody()` | Get modal body element |
| `isModalOpen()` | Check if open |

## Events

```javascript
modal.addEventListener('modal-open', () => {
  console.log('Modal opened');
});

modal.addEventListener('modal-close', (e) => {
  console.log('Closed:', e.detail.reason); // 'ok', 'cancel', 'escape'
});
```

## With Validation

```javascript
const modal = document.createElement('ui-modal');
modal.setAttribute('title', 'New Task');
modal.innerHTML = '<input type="text" class="title-input">';
document.body.appendChild(modal);

const input = modal.querySelector('.title-input');
modal.setOkButtonDisabled(true);

input.addEventListener('input', (e) => {
  modal.setOkButtonDisabled(!e.target.value.trim());
});

try {
  await modal.show();
  console.log('Title:', input.value);
} finally {
  modal.remove();
}
```

## Tips

✅ **Always remove the modal:** `modal.remove()`
✅ **Auto-focus:** First input/button gets focus automatically
✅ **ESC to close:** Press ESC to close (unless `backdrop="static"`)
✅ **Click backdrop to close:** Click dark area (unless `backdrop="static"`)
✅ **Promise-based:** Use `await` or `.then()`

## Full Docs

See `README.md` for complete API documentation and advanced examples.
