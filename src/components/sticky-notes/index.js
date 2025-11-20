class StickyNotes extends HTMLElement {
	constructor() {
		super();
		this.attachShadow({ mode: "open" });
		this.notes = JSON.parse(localStorage.getItem("stickyNotes")) || [];
		this.colors = [
			"#FFF9C4",
			"#FFCCBC",
			"#C8E6C9",
			"#B3E5FC",
			"#F8BBD0",
			"#E1BEE7",
			"#FFE0B2",
			"#D1C4E9",
			"#FFECB3",
			"#C5CAE9",
		];
	}

	connectedCallback() {
		this.render();
		this.setupEventListeners();
	}

	render() {
		this.shadowRoot.innerHTML = `
			<style>
				:host {
					--sticky-note-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
					--sticky-note-shadow-hover: 0 8px 12px rgba(0, 0, 0, 0.2);
				}

				.sticky-notes-container {
					position: fixed;
					bottom: 20px;
					right: 20px;
					z-index: 1000;
					display: flex;
					flex-direction: column;
					gap: 10px;
					pointer-events: none;
				}

				.sticky-note {
					width: 200px;
					height: 200px;
					padding: 15px;
					border-radius: 4px;
					box-shadow: var(--sticky-note-shadow);
					font-family: 'Comic Sans MS', cursive, sans-serif;
					font-size: 14px;
					resize: none;
					border: none;
					outline: none;
					position: relative;
					pointer-events: auto;
					display: flex;
					flex-direction: column;
					transition: all 0.2s ease;
					transform: rotate(-1deg);
				}

				.sticky-note:hover {
					box-shadow: var(--sticky-note-shadow-hover);
					transform: rotate(0deg) scale(1.02);
				}

				.sticky-note-content {
					flex: 1;
					resize: none;
					border: none;
					outline: none;
					background: transparent;
					font-family: 'Comic Sans MS', cursive, sans-serif;
					font-size: 14px;
					padding: 0;
					color: rgba(0, 0, 0, 0.7);
				}

				.sticky-note-content::placeholder {
					color: rgba(0, 0, 0, 0.3);
				}

				.sticky-note-footer {
					display: flex;
					justify-content: space-between;
					align-items: center;
					padding-top: 10px;
					border-top: 1px solid rgba(0, 0, 0, 0.1);
					gap: 5px;
				}

				.sticky-note-delete {
					background: rgba(0, 0, 0, 0.2);
					border: none;
					padding: 4px 8px;
					border-radius: 2px;
					cursor: pointer;
					font-size: 12px;
					color: rgba(0, 0, 0, 0.6);
					transition: all 0.2s ease;
					pointer-events: auto;
				}

				.sticky-note-delete:hover {
					background: rgba(0, 0, 0, 0.3);
					color: rgba(0, 0, 0, 0.9);
				}

				.sticky-note-timestamp {
					font-size: 11px;
					color: rgba(0, 0, 0, 0.4);
					flex: 1;
				}

				@media (max-width: 768px) {
					.sticky-notes-container {
						bottom: 10px;
						right: 10px;
					}

					.sticky-note {
						width: 160px;
						height: 160px;
						font-size: 12px;
					}

					.sticky-note-content {
						font-size: 12px;
					}
				}
			</style>

			<div class="sticky-notes-container" id="notesContainer"></div>
		`;

		this.renderNotes();
	}

	renderNotes() {
		const container = this.shadowRoot.getElementById("notesContainer");
		container.innerHTML = "";

		this.notes.forEach((note, index) => {
			const noteEl = document.createElement("div");
			noteEl.className = "sticky-note";
			noteEl.style.backgroundColor = note.color;

			const textarea = document.createElement("textarea");
			textarea.className = "sticky-note-content";
			textarea.value = note.content;
			textarea.placeholder = "Write a note...";
			textarea.addEventListener("input", (e) => {
				this.notes[index].content = e.target.value;
				this.saveNotes();
			});

			const footer = document.createElement("div");
			footer.className = "sticky-note-footer";

			const timestamp = document.createElement("span");
			timestamp.className = "sticky-note-timestamp";
			timestamp.textContent = new Date(note.createdAt).toLocaleDateString();

			const deleteBtn = document.createElement("button");
			deleteBtn.className = "sticky-note-delete";
			deleteBtn.textContent = "Delete";
			deleteBtn.addEventListener("click", () => {
				this.notes.splice(index, 1);
				this.saveNotes();
				this.renderNotes();
			});

			footer.appendChild(timestamp);
			footer.appendChild(deleteBtn);

			noteEl.appendChild(textarea);
			noteEl.appendChild(footer);
			container.appendChild(noteEl);
		});
	}

	setupEventListeners() {
		window.addEventListener("addSticky", () => {
			if (this.notes.length < 10) {
				const newNote = {
					id: Date.now(),
					content: "",
					color: this.colors[this.notes.length % this.colors.length],
					createdAt: new Date().toISOString(),
				};
				this.notes.push(newNote);
				this.saveNotes();
				this.renderNotes();
			}
		});
	}

	saveNotes() {
		localStorage.setItem("stickyNotes", JSON.stringify(this.notes));
	}
}

customElements.define("sticky-notes", StickyNotes);
