// --- Alpine ---
import Alpine from "alpinejs";
import persist from "@alpinejs/persist";

// --- Global styles & UI libs ---
import "flowbite"; // Flowbite JS (tooltips, modals, etc.)
import "./styles.css"; // Your global CSS file
import "./pages/todo/style.css"

// --- App logic ---
// import "./stores.js";
import "./router.js";
import "./components";
import "./shell/AppShell.js";

const globalToast = document.getElementById("global-toast");

function showToast(caption, delay) {
	console.log(111);
	setTimeout(() => {
		globalToast.style.display = "block";
		globalToast.style.opacity = 1;
		globalToast.style.pointerEvents = "unset";
		globalToast.querySelector("div[data-id]").innerHTML = caption;
		setTimeout(() => {
			globalToast.style.display = "none";
		}, delay * 1000);
	}, 500);
}

window.showToast = showToast;

// --- Alpine init ---
Alpine.plugin(persist);
window.Alpine = Alpine;
Alpine.start();
