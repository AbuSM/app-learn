function o(e){const n=document.createElement("div");return n.innerHTML=e,n.firstElementChild}const t=()=>{const e=o(`<div class="loader_backdrop">
        <span class="loader"></span>
    </div>`);document.body.appendChild(e)},d=()=>{const e=document.querySelector(".loader_backdrop");e&&e.remove()};export{d as e,o as g,t as s};
