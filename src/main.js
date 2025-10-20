// --- Alpine ---
import Alpine from "alpinejs";
import persist from "@alpinejs/persist";

// --- Global styles & UI libs ---
import "flowbite"; // Flowbite JS (tooltips, modals, etc.)
import "./styles.css"; // Your global CSS file

// --- App logic ---
// import "./stores.js";
import "./router.js";
import "./shell/AppShell.js";

// --- Alpine init ---
Alpine.plugin(persist);
window.Alpine = Alpine;
Alpine.start();
