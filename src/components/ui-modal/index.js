class UiModal extends HTMLElement {
	constructor() {
		super();
		this.attachShadow({ mode: 'open' });
		this.isOpen = false;
		this.resolvePromise = null;
		this.rejectPromise = null;
	}

	connectedCallback() {
		this.render();
		this.setupEventListeners();
	}

	attributeChangedCallback(name, oldValue, newValue) {
		if (name === 'title' && this.isConnected) {
			const titleElement = this.shadowRoot.querySelector('.modal-title');
			if (titleElement) {
				titleElement.textContent = newValue || '';
			}
		}
	}

	static get observedAttributes() {
		return ['title'];
	}

	render() {
		const title = this.getAttribute('title') || '';
		const okText = this.getAttribute('ok-text') || 'ОК';
		const cancelText = this.getAttribute('cancel-text') || 'Отмена';
		const showFooter = this.getAttribute('show-footer') !== 'false';
		const showCloseButton = this.getAttribute('show-close-button') !== 'false';

		this.shadowRoot.innerHTML = /*html*/ `
			<style>
				:host {
					--modal-bg: #ffffff;
					--modal-border: #e5e7eb;
					--modal-text: #1f2937;
					--modal-text-secondary: #6b7280;
					--modal-accent: #3c50e0;
					--modal-hover: #f3f4f6;
				}

				.modal-backdrop {
					position: fixed;
					top: 0;
					left: 0;
					right: 0;
					bottom: 0;
					background-color: rgba(0, 0, 0, 0.6);
					display: flex;
					align-items: center;
					justify-content: center;
					z-index: 9999;
					opacity: 0;
					pointer-events: none;
					transition: opacity 0.2s ease-in-out;
				}

				:host(.modal-open) .modal-backdrop {
					opacity: 1;
					pointer-events: auto;
				}

				.modal-container {
					background-color: var(--modal-bg);
					border-radius: 8px;
					box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.3);
					max-width: 90vw;
					max-height: 90vh;
					overflow-y: auto;
					transform: scale(0.95);
					transition: transform 0.2s ease-in-out;
					color: var(--modal-text);
					border: 1px solid var(--modal-border);
					display: flex;
					flex-direction: column;
				}

				:host(.modal-open) .modal-container {
					transform: scale(1);
				}

				.modal-header {
					display: flex;
					align-items: center;
					justify-content: space-between;
					padding: 1.25rem;
					border-bottom: 1px solid var(--modal-border);
					flex-shrink: 0;
				}

				.modal-title {
					margin: 0;
					font-size: 1.25rem;
					font-weight: 600;
					color: var(--modal-text);
				}

				.modal-close-btn {
					background: none;
					border: none;
					color: var(--modal-text-secondary);
					cursor: pointer;
					padding: 0;
					display: flex;
					align-items: center;
					justify-content: center;
					width: 2rem;
					height: 2rem;
					border-radius: 4px;
					transition: all 0.15s ease-in-out;
					flex-shrink: 0;
				}

				.modal-close-btn:hover {
					background-color: var(--modal-hover);
					color: var(--modal-text);
				}

				.modal-close-btn:active {
					transform: scale(0.95);
				}

				.modal-body {
					padding: 1.25rem;
					flex: 1;
					overflow-y: auto;
				}

				.modal-footer {
					display: flex;
					align-items: center;
					gap: 1rem;
					padding: 1.25rem;
					border-top: 1px solid var(--modal-border);
					flex-shrink: 0;
					justify-content: flex-end;
				}

				.modal-btn {
					padding: 0.625rem 1.25rem;
					border-radius: 4px;
					font-size: 0.875rem;
					font-weight: 500;
					border: none;
					cursor: pointer;
					transition: all 0.15s ease-in-out;
					white-space: nowrap;
				}

				.modal-btn-ok {
					background-color: var(--modal-accent);
					color: white;
				}

				.modal-btn-ok:hover {
					background-color: #2e3ec0;
					filter: brightness(1.05);
				}

				.modal-btn-ok:active {
					transform: scale(0.98);
				}

				.modal-btn-cancel {
					background-color: transparent;
					color: var(--modal-text);
					border: 1px solid var(--modal-border);
				}

				.modal-btn-cancel:hover {
					background-color: var(--modal-hover);
					color: var(--modal-text);
				}

				.modal-btn-cancel:active {
					transform: scale(0.98);
				}

				.modal-btn:disabled {
					opacity: 0.5;
					cursor: not-allowed;
				}

				/* Scrollbar styling */
				.modal-container::-webkit-scrollbar {
					width: 8px;
				}

				.modal-container::-webkit-scrollbar-track {
					background: transparent;
				}

				.modal-container::-webkit-scrollbar-thumb {
					background: var(--modal-hover);
					border-radius: 4px;
				}

				.modal-container::-webkit-scrollbar-thumb:hover {
					background: #5a6577;
				}
			</style>

			<div class="modal-backdrop" role="presentation">
				<div class="modal-container" role="dialog" aria-modal="true" aria-labelledby="modal-title">
					<!-- Modal header -->
					<div class="modal-header">
						<h3 class="modal-title" id="modal-title">${title}</h3>
						${
							showCloseButton
								? `<button type="button" class="modal-close-btn" aria-label="Close modal">
									<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
									</svg>
								</button>`
								: ''
						}
					</div>

					<!-- Modal body -->
					<div class="modal-body">
						<slot></slot>
					</div>

					<!-- Modal footer -->
					${
						showFooter
							? `<div class="modal-footer">
								<button type="button" class="modal-btn modal-btn-ok">${okText}</button>
								<button type="button" class="modal-btn modal-btn-cancel">${cancelText}</button>
							</div>`
							: ''
					}
				</div>
			</div>
		`;
	}

	setupEventListeners() {
		const closeBtn = this.shadowRoot.querySelector('.modal-close-btn');
		const okBtn = this.shadowRoot.querySelector('.modal-btn-ok');
		const cancelBtn = this.shadowRoot.querySelector('.modal-btn-cancel');
		const backdrop = this.shadowRoot.querySelector('.modal-backdrop');

		if (closeBtn) {
			closeBtn.addEventListener('click', () => this.close(null, 'close'));
		}

		if (okBtn) {
			okBtn.addEventListener('click', () => this.close(true, 'ok'));
		}

		if (cancelBtn) {
			cancelBtn.addEventListener('click', () => this.close(false, 'cancel'));
		}

		if (backdrop) {
			backdrop.addEventListener('click', (e) => {
				if (e.target === backdrop && this.getAttribute('backdrop') !== 'static') {
					this.close(null, 'backdrop');
				}
			});
		}

		// ESC key to close
		this.escapeKeyHandler = (e) => {
			if (e.key === 'Escape' && this.isOpen && this.getAttribute('backdrop') !== 'static') {
				this.close(null, 'escape');
			}
		};
	}

	/**
	 * Show the modal
	 * @returns {Promise} Resolves when user confirms, rejects when cancelled
	 */
	show() {
		return new Promise((resolve, reject) => {
			this.resolvePromise = resolve;
			this.rejectPromise = reject;
			this.isOpen = true;
			this.classList.add('modal-open');
			document.addEventListener('keydown', this.escapeKeyHandler);

			// Dispatch custom open event
			this.dispatchEvent(new CustomEvent('modal-open', { bubbles: true }));

			// Focus first interactive element
			setTimeout(() => {
				const focusElement =
					this.shadowRoot.querySelector('.modal-btn-ok') ||
					this.querySelector('input') ||
					this.querySelector('button');
				if (focusElement) {
					focusElement.focus();
				}
			}, 50);
		});
	}

	/**
	 * Close the modal
	 * @param {*} value - Value to resolve/reject with
	 * @param {string} reason - Reason for closing (ok, cancel, close, backdrop, escape)
	 */
	close(value, reason = 'close') {
		this.isOpen = false;
		this.classList.remove('modal-open');
		document.removeEventListener('keydown', this.escapeKeyHandler);

		// Dispatch custom close event
		this.dispatchEvent(
			new CustomEvent('modal-close', {
				detail: { value, reason },
				bubbles: true,
			})
		);

		// Resolve/reject promise
		if (reason === 'ok' || value === true) {
			if (this.resolvePromise) {
				this.resolvePromise(value);
			}
		} else {
			if (this.rejectPromise) {
				this.rejectPromise(new Error(`Modal closed: ${reason}`));
			}
		}

		this.resolvePromise = null;
		this.rejectPromise = null;
	}

	/**
	 * Update modal title
	 * @param {string} title - New title text
	 */
	setTitle(title) {
		this.setAttribute('title', title);
	}

	/**
	 * Check if modal is currently open
	 * @returns {boolean}
	 */
	isModalOpen() {
		return this.isOpen;
	}

	/**
	 * Get the modal body element for adding content
	 * @returns {HTMLElement}
	 */
	getBody() {
		// Return a wrapper that allows setting innerHTML on the slot content
		return {
			innerHTML: '',
			set innerHTML(content) {
				// Clear existing slotted content
				while (this.element.firstChild) {
					this.element.removeChild(this.element.firstChild);
				}
				// Create a temporary container and parse the content
				const temp = document.createElement('div');
				temp.innerHTML = content;
				// Move all children to the modal element (which feeds into the slot)
				while (temp.firstChild) {
					this.element.appendChild(temp.firstChild);
				}
			},
			get innerHTML() {
				return this.element.innerHTML;
			},
			querySelector: (selector) => {
				return this.element.querySelector(selector);
			},
			element: this
		};
	}

	/**
	 * Disable/enable OK button
	 * @param {boolean} disabled
	 */
	setOkButtonDisabled(disabled) {
		const okBtn = this.shadowRoot.querySelector('.modal-btn-ok');
		if (okBtn) {
			okBtn.disabled = disabled;
		}
	}

	/**
	 * Disable/enable Cancel button
	 * @param {boolean} disabled
	 */
	setCancelButtonDisabled(disabled) {
		const cancelBtn = this.shadowRoot.querySelector('.modal-btn-cancel');
		if (cancelBtn) {
			cancelBtn.disabled = disabled;
		}
	}

	/**
	 * Set custom button text
	 * @param {string} okText - OK button text
	 * @param {string} cancelText - Cancel button text
	 */
	setButtonText(okText, cancelText) {
		const okBtn = this.shadowRoot.querySelector('.modal-btn-ok');
		const cancelBtn = this.shadowRoot.querySelector('.modal-btn-cancel');

		if (okBtn) okBtn.textContent = okText;
		if (cancelBtn) cancelBtn.textContent = cancelText;
	}
}

customElements.define('ui-modal', UiModal);

export default UiModal;
