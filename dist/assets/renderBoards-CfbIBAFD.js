import{A as d}from"./constants-DSAVH9vB.js";import{s,e}from"./loader-qw66VjnQ.js";const c=async()=>{s(),await fetch(`${d}/boards`).then(o=>o.json()).then(o=>{window.boards=o,e()})};(async()=>{await c(),console.log(window.boards);const o=document.querySelector(".boards-container"),i=3;let a="";for(let n=0;n<i;n++)a+="",window.boards.forEach((t,r)=>{r%i==n&&(a+=`<ui-card
                        link="/todo/${t.id}"
                        title="${t.title}"
                        btn-text="Перейти"
                        image-link="${t.image_url}"></ui-card>
                    `)});o.innerHTML=a})();
