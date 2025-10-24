class AppSidebar extends HTMLElement {
    connectedCallback() {
        this.innerHTML = /*html*/ `
        <aside class=" bg-primary-dark h-full">
            <nav>
                <ul>
                    <li>
                        <a class="nav-link" href=""> Home </a>
                    </li>
                    <li>
                        <a class="nav-link open" href="">Timer</a>
                        <ul>
                            <li><a class="nav-link" href="">Stopwatch</a></li>
                            <li><a class="nav-link" href="">Clock</a></li>
                        </ul>
                    </li>
                    <li>
                        <a class="nav-link" href="">Events</a>
                    </li>
                    <li>
                        <a class="nav-link" href="">Blog</a>
                    </li>
                </ul>
                <ul>
                    <li>
                        <a href="">
                            <button class="btn btn-sm">Sign Up</button>
                        </a>
                    </li>
                    <li>
                        <a href="./auth/login.html">
                            <button class="btn btn-sm">Login</button>
                        </a>
                    </li>
                </ul>
            </nav>
        </aside>
        `;
    }
}

customElements.define("app-sidebar", AppSidebar);