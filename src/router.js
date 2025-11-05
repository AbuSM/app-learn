// /src/router.js
import Navigo from "navigo";

const router = new Navigo("/", { hash: true });

const outlet = () => document.querySelector("app-outlet");

function mount(tagName) {
	const host = outlet();
	const el = document.createElement(tagName);
	host.replaceChildren(el);
	// re-initialize Alpine on newly added subtree
	if (window.Alpine) window.Alpine.initTree(host);
}

router
	.on("/timers", async () => {
		await import("./pages/timers/index.js"); // defines <page-timers>
		mount("page-timers");
	})
	.on("/todo", async () => {
		await import("./pages/todo/index.js"); // defines <page-todo>
		mount("page-todo");
	})
	.on("/calendar", async () => {
		await import("./pages/calendar/index.js");
		mount("page-calendar");
	})
	.on("/blog", async () => {
		await import("./pages/blog/index.js");
		mount("page-blog");
	})
	// .notFound(async () => {
	// 	await import("./pages/not-found.js"); // defines <page-404>
	// 	mount("page-404");
	// })
	.resolve();

window.$router = router;
