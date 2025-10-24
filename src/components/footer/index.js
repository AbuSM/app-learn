class AppFooter extends HTMLElement {
	connectedCallback() {
		const y = new Date().getFullYear();
		this.innerHTML = `<footer style="padding:16px;border-top:1px solid #e5e7eb;text-align:center;color:#6b7280">
      © ${y} Smart Dashboard
    </footer>`;
	}
}
customElements.define("app-footer", AppFooter);
