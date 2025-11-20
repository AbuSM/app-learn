/**
 * ui-modal Component - Usage Examples
 *
 * These examples show various ways to use the ui-modal component
 * throughout your application.
 */

// ============================================================================
// Example 1: Simple Confirmation Dialog
// ============================================================================

export async function confirmDelete(itemName) {
  const modal = document.createElement('ui-modal');
  modal.setAttribute('title', 'Confirm Delete');
  modal.setAttribute('ok-text', 'Delete');
  modal.setAttribute('cancel-text', 'Cancel');
  modal.innerHTML = `
    <p>Are you sure you want to delete <strong>${itemName}</strong>?</p>
    <p style="color: #9ca3af; font-size: 0.875rem; margin-top: 0.5rem;">
      This action cannot be undone.
    </p>
  `;

  document.body.appendChild(modal);

  try {
    await modal.show();
    // User confirmed
    console.log(`Deleting ${itemName}...`);
    return true;
  } catch (error) {
    // User cancelled
    console.log('Delete cancelled');
    return false;
  } finally {
    modal.remove();
  }
}

// Usage:
// const shouldDelete = await confirmDelete('Task #123');
// if (shouldDelete) {
//   await deleteTaskFromServer();
// }


// ============================================================================
// Example 2: Form Modal with Validation
// ============================================================================

export async function createNewTask() {
  const modal = document.createElement('ui-modal');
  modal.setAttribute('title', 'Create New Task');
  modal.setAttribute('ok-text', 'Create');
  modal.setAttribute('cancel-text', 'Cancel');
  modal.innerHTML = `
    <form style="display: flex; flex-direction: column; gap: 1rem;">
      <div>
        <label style="display: block; margin-bottom: 0.5rem; color: #9ca3af; font-size: 0.875rem;">
          Task Title *
        </label>
        <input
          type="text"
          class="task-title-input"
          placeholder="Enter task title"
          style="
            width: 100%;
            padding: 0.625rem 0.75rem;
            border: 1px solid #374151;
            border-radius: 4px;
            background: #1c2434;
            color: white;
            font-size: 0.875rem;
          "
          required
        >
      </div>

      <div>
        <label style="display: block; margin-bottom: 0.5rem; color: #9ca3af; font-size: 0.875rem;">
          Description
        </label>
        <textarea
          class="task-desc-input"
          placeholder="Enter task description (optional)"
          rows="4"
          style="
            width: 100%;
            padding: 0.625rem 0.75rem;
            border: 1px solid #374151;
            border-radius: 4px;
            background: #1c2434;
            color: white;
            font-size: 0.875rem;
            resize: vertical;
          "
        ></textarea>
      </div>

      <div>
        <label style="display: block; margin-bottom: 0.5rem; color: #9ca3af; font-size: 0.875rem;">
          Due Date
        </label>
        <input
          type="date"
          class="task-date-input"
          style="
            width: 100%;
            padding: 0.625rem 0.75rem;
            border: 1px solid #374151;
            border-radius: 4px;
            background: #1c2434;
            color: white;
          "
        >
      </div>
    </form>
  `;

  document.body.appendChild(modal);

  const titleInput = modal.querySelector('.task-title-input');
  const descInput = modal.querySelector('.task-desc-input');
  const dateInput = modal.querySelector('.task-date-input');

  // Validation: Disable OK button if title is empty
  const updateOkButton = () => {
    modal.setOkButtonDisabled(!titleInput.value.trim());
  };

  updateOkButton();
  titleInput.addEventListener('input', updateOkButton);
  titleInput.focus();

  try {
    await modal.show();

    // User confirmed
    return {
      title: titleInput.value.trim(),
      description: descInput.value.trim(),
      dueDate: dateInput.value,
    };
  } catch (error) {
    // User cancelled
    return null;
  } finally {
    modal.remove();
  }
}

// Usage:
// const taskData = await createNewTask();
// if (taskData) {
//   console.log('New task:', taskData);
//   await createTaskOnServer(taskData);
// }


// ============================================================================
// Example 3: Conditional Modal (Different Content Based on State)
// ============================================================================

export async function editTask(task) {
  const modal = document.createElement('ui-modal');
  modal.setAttribute('title', `Edit: ${task.title}`);
  modal.setAttribute('ok-text', 'Save Changes');
  modal.setAttribute('cancel-text', 'Discard');

  // Build form with current task data
  modal.innerHTML = `
    <form style="display: flex; flex-direction: column; gap: 1rem;">
      <div>
        <label style="display: block; margin-bottom: 0.5rem; color: #9ca3af; font-size: 0.875rem;">
          Title
        </label>
        <input
          type="text"
          class="edit-title"
          value="${escapeHtml(task.title)}"
          style="
            width: 100%;
            padding: 0.625rem 0.75rem;
            border: 1px solid #374151;
            border-radius: 4px;
            background: #1c2434;
            color: white;
          "
        >
      </div>

      <div>
        <label style="display: block; margin-bottom: 0.5rem; color: #9ca3af; font-size: 0.875rem;">
          Description
        </label>
        <textarea
          class="edit-description"
          rows="4"
          style="
            width: 100%;
            padding: 0.625rem 0.75rem;
            border: 1px solid #374151;
            border-radius: 4px;
            background: #1c2434;
            color: white;
          "
        >${escapeHtml(task.description || '')}</textarea>
      </div>

      <div>
        <label style="display: block; margin-bottom: 0.5rem; color: #9ca3af; font-size: 0.875rem;">
          Status
        </label>
        <select
          class="edit-status"
          style="
            width: 100%;
            padding: 0.625rem 0.75rem;
            border: 1px solid #374151;
            border-radius: 4px;
            background: #1c2434;
            color: white;
          "
        >
          <option value="pending" ${task.status === 'pending' ? 'selected' : ''}>Pending</option>
          <option value="in-progress" ${task.status === 'in-progress' ? 'selected' : ''}>In Progress</option>
          <option value="completed" ${task.status === 'completed' ? 'selected' : ''}>Completed</option>
        </select>
      </div>
    </form>
  `;

  document.body.appendChild(modal);

  const titleInput = modal.querySelector('.edit-title');
  titleInput.focus();

  try {
    await modal.show();

    // Return updated task
    return {
      ...task,
      title: modal.querySelector('.edit-title').value,
      description: modal.querySelector('.edit-description').value,
      status: modal.querySelector('.edit-status').value,
    };
  } catch (error) {
    return null; // No changes
  } finally {
    modal.remove();
  }
}

// Helper function to escape HTML special characters
function escapeHtml(text) {
  const map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;',
  };
  return text.replace(/[&<>"']/g, (m) => map[m]);
}

// Usage:
// const updatedTask = await editTask(currentTask);
// if (updatedTask) {
//   await updateTaskOnServer(updatedTask);
// }


// ============================================================================
// Example 4: Modal with Dynamic Content
// ============================================================================

export async function showUserDetails(userId) {
  const modal = document.createElement('ui-modal');
  modal.setAttribute('title', 'Loading...');
  modal.setAttribute('show-footer', 'false');
  modal.innerHTML = '<p style="text-align: center; color: #9ca3af;">Loading user details...</p>';

  document.body.appendChild(modal);

  try {
    // Simulate API call
    const user = await fetchUserDetails(userId);

    // Update modal with loaded data
    modal.setTitle(`User: ${user.name}`);
    modal.setAttribute('show-footer', 'true');
    modal.innerHTML = `
      <div style="display: flex; flex-direction: column; gap: 1rem;">
        <div style="padding: 1rem; background: rgba(255, 255, 255, 0.05); border-radius: 4px;">
          <p style="margin: 0 0 0.5rem 0; color: #9ca3af; font-size: 0.875rem;">Name</p>
          <p style="margin: 0; font-weight: 500;">${escapeHtml(user.name)}</p>
        </div>

        <div style="padding: 1rem; background: rgba(255, 255, 255, 0.05); border-radius: 4px;">
          <p style="margin: 0 0 0.5rem 0; color: #9ca3af; font-size: 0.875rem;">Email</p>
          <p style="margin: 0; font-weight: 500;">${escapeHtml(user.email)}</p>
        </div>

        <div style="padding: 1rem; background: rgba(255, 255, 255, 0.05); border-radius: 4px;">
          <p style="margin: 0 0 0.5rem 0; color: #9ca3af; font-size: 0.875rem;">Joined</p>
          <p style="margin: 0; font-weight: 500;">${new Date(user.createdAt).toLocaleDateString()}</p>
        </div>
      </div>
    `;

    await modal.show();
  } catch (error) {
    modal.setTitle('Error');
    modal.innerHTML = `<p style="color: #ef4444;">Failed to load user details: ${error.message}</p>`;
    await modal.show();
  } finally {
    modal.remove();
  }
}

// Mock function
async function fetchUserDetails(userId) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        id: userId,
        name: 'John Doe',
        email: 'john@example.com',
        createdAt: new Date('2024-01-15'),
      });
    }, 1000);
  });
}


// ============================================================================
// Example 5: Alert / Information Modal
// ============================================================================

export async function showAlert(title, message, buttonText = 'OK') {
  const modal = document.createElement('ui-modal');
  modal.setAttribute('title', title);
  modal.setAttribute('ok-text', buttonText);
  modal.setAttribute('show-footer', 'true');
  modal.setAttribute('show-close-button', 'false');
  modal.setAttribute('cancel-text', '');
  modal.innerHTML = `<p>${escapeHtml(message)}</p>`;

  document.body.appendChild(modal);

  try {
    await modal.show();
  } finally {
    modal.remove();
  }
}

// Usage:
// await showAlert('Success', 'Task created successfully!');


// ============================================================================
// Example 6: Modal with Loading State
// ============================================================================

export async function performAsyncAction() {
  const modal = document.createElement('ui-modal');
  modal.setAttribute('title', 'Processing...');
  modal.setAttribute('backdrop', 'static');
  modal.setAttribute('show-close-button', 'false');
  modal.setAttribute('show-footer', 'false');
  modal.innerHTML = `
    <div style="text-align: center; padding: 2rem;">
      <div style="
        display: inline-block;
        width: 40px;
        height: 40px;
        border: 4px solid #374151;
        border-top: 4px solid #3c50e0;
        border-radius: 50%;
        animation: spin 1s linear infinite;
      "></div>
      <p style="margin-top: 1rem; color: #9ca3af;">Please wait...</p>
    </div>

    <style>
      @keyframes spin {
        to { transform: rotate(360deg); }
      }
    </style>
  `;

  document.body.appendChild(modal);

  // Show modal
  const showPromise = modal.show().catch(() => {}); // Ignore close attempts

  try {
    // Do async work
    const result = await performExpensiveOperation();

    // Update modal with success
    modal.setAttribute('show-footer', 'true');
    modal.setAttribute('show-close-button', 'true');
    modal.setTitle('Success!');
    modal.innerHTML = `
      <p style="color: #10b981;">✓ Operation completed successfully!</p>
      <p style="color: #9ca3af; font-size: 0.875rem;">Result: ${result}</p>
    `;

    await modal.show();
    return result;
  } catch (error) {
    // Update modal with error
    modal.setAttribute('show-footer', 'true');
    modal.setAttribute('show-close-button', 'true');
    modal.setTitle('Error');
    modal.innerHTML = `<p style="color: #ef4444;">✗ ${error.message}</p>`;
    await modal.show();
    throw error;
  } finally {
    modal.remove();
  }
}

// Mock function
async function performExpensiveOperation() {
  return new Promise((resolve) => {
    setTimeout(() => resolve('Data processed'), 3000);
  });
}


// ============================================================================
// Example 7: Using in a Component Class
// ============================================================================

export class TaskManager {
  constructor() {
    this.modal = null;
  }

  /**
   * Get or create the modal
   */
  getModal() {
    if (!this.modal) {
      this.modal = document.createElement('ui-modal');
      document.body.appendChild(this.modal);
    }
    return this.modal;
  }

  /**
   * Show task confirmation dialog
   */
  async confirmTaskAction(action, taskName) {
    const modal = this.getModal();
    modal.setAttribute('title', `${action} Task`);
    modal.setAttribute('ok-text', action);
    modal.innerHTML = `<p>Are you sure you want to ${action.toLowerCase()} "${escapeHtml(taskName)}"?</p>`;

    try {
      await modal.show();
      return true;
    } catch (error) {
      return false;
    }
  }

  /**
   * Get custom task data
   */
  async getTaskData(initialData = null) {
    const modal = this.getModal();
    modal.setAttribute('title', initialData ? 'Edit Task' : 'New Task');
    modal.setAttribute('ok-text', 'Save');
    modal.innerHTML = `
      <form style="display: flex; flex-direction: column; gap: 1rem;">
        <input type="text" class="task-title" value="${initialData?.title || ''}" placeholder="Task title" style="padding: 0.5rem; border: 1px solid #374151; background: #1c2434; color: white; border-radius: 4px;">
        <textarea class="task-desc" placeholder="Description" rows="4" style="padding: 0.5rem; border: 1px solid #374151; background: #1c2434; color: white; border-radius: 4px;">${initialData?.description || ''}</textarea>
      </form>
    `;

    try {
      await modal.show();
      return {
        title: modal.querySelector('.task-title').value,
        description: modal.querySelector('.task-desc').value,
      };
    } catch (error) {
      return null;
    }
  }

  /**
   * Clean up
   */
  destroy() {
    if (this.modal) {
      this.modal.remove();
      this.modal = null;
    }
  }
}

// Usage:
// const taskManager = new TaskManager();
// const confirmed = await taskManager.confirmTaskAction('Delete', 'My Task');
// const taskData = await taskManager.getTaskData();
// taskManager.destroy();
