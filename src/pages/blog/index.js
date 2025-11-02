class PageBlog extends HTMLElement {
	connectedCallback() {
		this.innerHTML = /* html */ `
            <h1>Blog</h1>
            <ui-card title="Hello" description="caption"></ui-card>
            <ui-card title="Hello" description="caption" direction="horizontal"></ui-card>
        `;
	}
}

customElements.define("page-blog", PageBlog);
