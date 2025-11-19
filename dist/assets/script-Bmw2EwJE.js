import{s as X,e as D,g as E}from"./loader-qw66VjnQ.js";import{A as B,b as A,c as Z,d as F}from"./constants-DSAVH9vB.js";const Q=async()=>{X(),await fetch(`${B}/board/${window.boardID}`).then(e=>e.json()).then(e=>{window.tasks=e.lists,window.boardTitle=e.title,D()})},$=e=>{fetch(`${B}/board/`,{method:"PATCH",headers:{Accept:"application/json","X-GitHub-Api-Version":"2022-11-28","Content-Type":"application/json"},body:JSON.stringify({data:e,id:window.boardID})}).then(t=>t.json())},u=(e,t)=>{e.classList.toggle("!border-red-600",t),e.classList.toggle("!focus:border-red-600",t)};function q(e){const t=document.querySelector(`ul[data-list-index="${e}"] ul`);t.scrollTo({top:t.scrollHeight})}function C(){window.currentAutoScrollInterval&&(clearInterval(window.currentAutoScrollInterval),window.currentAutoScrollInterval=null)}function S(e,t){window.currentAutoScrollInterval||(window.currentAutoScrollInterval=setInterval(()=>{e.scrollTop+=Z*(t=="up"?-1:1)},F))}function W(e){const t=e.target.closest("ul"),n=t.closest(".list").dataset.listIndex;s[n].scrollTop=t.scrollTop}function ee(){C()}function te(e){e.preventDefault();const t=e.clientY,n=e.target.closest("ul"),o=n.getBoundingClientRect();t-o.top<=A?S(n,"up"):o.bottom-t<=A?S(n,"down"):C()}function ne(e){e.target.classList.add("draggable");const t=e.target.dataset.listIndex,n=e.target.dataset.taskIndex;v.current={listIndex:t,taskIndex:n}}function oe(e){e.target.classList.remove("draggable"),C()}function se(e){const t=e.target.dataset.listIndex,n=e.target.dataset.taskIndex,o=v.current;!(t==o.listIndex&&n==o.taskIndex)&&e.target.tagName=="LI"&&!o.isList&&e.target.classList.add("droppable")}function ie(e){e.target.tagName=="LI"&&e.target.classList.remove("droppable")}function le(e){e.preventDefault()}function re(e){if(e.preventDefault(),e.target.tagName=="LI"){const t=e.target.dataset.listIndex,n=e.target.dataset.taskIndex,o=v.current;if(!o.isList){const l=s[t].tasks[n];s[t].tasks[n]=s[o.listIndex].tasks[o.taskIndex],s[o.listIndex].tasks[o.taskIndex]=l,p(s)}}}function ae(e){const t=v.current,n=e.target.closest(".list");n.dataset.listIndex!=t.listIndex&&n.classList.add("droppable")}function de(e){e.target.closest(".list").classList.remove("droppable")}function ce(e){e.preventDefault();const t=v.current,n=e.target.closest(".list");n.dataset.listIndex!=t.listIndex&&n.classList.add("droppable")}function ue(e){e.preventDefault();const t=e.target.closest(".list").dataset.listIndex,n=v.current;if(t!=n.listIndex){if(n.isList){const o=s[t];s[t]=s[n.listIndex],s[n.listIndex]=o}else{const o=s[n.listIndex].tasks[n.taskIndex];s[n.listIndex].tasks.splice(n.taskIndex,1),s[t].tasks=[o,...s[t].tasks]}p(s)}}function pe(e){if(e.target.tagName=="UL"){e.target.classList.add("draggable");const t=e.target.dataset.listIndex;v.current={listIndex:t,isList:!0}}}function we(e){e.target.classList.remove("draggable")}function ge(e){const t=e.target.closest("li");let n=e.target.checked;const o=t.dataset.listIndex,l=t.dataset.taskIndex;s[o].tasks[l].completed=n,p(s),h(`Вы пометили как "${n?"":"не "}сделано" задачу: ${s[o].tasks[l].title}`,`history-${n?"complete":"x"}-icon`)}async function me(e){if(e.target.tagName!="INPUT"){const t=e.target.closest(".task"),n=t.dataset.listIndex,o=t.dataset.taskIndex,l=await _e(s[n].tasks[o],n,o);l.isDelete?(h(`Вы удалили задачу: "${s[n].tasks[o].title}"`,"history-delete-icon"),s[n].tasks.splice(o,1)):(s[n].tasks[o].title!=l.title&&h(`Вы изменили заголовок задачи: "${s[n].tasks[o].title}" на "${l.title}"`,"history-edit-icon"),s[n].tasks[o]=l),p(s)}}function j(e){const t=e.target.closest(".list"),n=t.dataset.listIndex;t.firstElementChild.style.display="none";const o=s[n].title,l=E(`<li class="inputBox relative h-[50px] -m-3 p-3 -mb-2 pb-2 flex justify-between items-center">
                            <input value="${o}" type="text" class="min-w-0 w-full rounded-sm border-2 border-[var(--border-gray)] focus-within:ring-0 focus:ring-0 focus-within:border-[var(--primary)] focus:border-[var(--primary)] text-xl px-2 py-1 font-bold" oninput="window.onTitleInputChange(event)" onkeydown="window.onTitleInputKeydown(event)" />
                        </li>`);t.prepend(l);const r=l.querySelector("input");window.currentListIndex=n,window.currentInputBox=l,r.focus(),r.setSelectionRange(r.value.length,r.value.length)}function he(e){u(e.target,!e.target.value.length)}function ve(e){if(e.key=="Enter"){const t=e.target;t.value.length?(h(`Вы изменили название списка "${s[window.currentListIndex].title}" на "${t.value}"`,"history-edit-icon"),s[window.currentListIndex].title=t.value,p(s)):u(t,!0)}else e.key=="Escape"&&(window.currentInputBox.remove(),p(s))}function fe(e){e.stopPropagation();const t=e.target.parentElement;if(t.children.length>1)t.lastElementChild.remove();else{document.querySelectorAll(".listMenu").forEach(r=>{r.remove()}),e.target.closest(".list").dataset.listIndex;const l=E(`
                        <ul class="animate-appear listMenu z-10 hover:cursor-pointer absolute w-[100px] flex flex-col bg-white p-1 border-2 border-[var(--border-gray)] rounded-sm">
                            <li class="editBtn hover:text-black/70 hover:cursor-pointer transition-all"><button class="hover:cursor-pointer" onclick="window.onEditListClick(event)">Edit</button></li>
                            <li class="removeBtn hover:text-black/70 hover:cursor-pointer transition-all"><button class="hover:cursor-pointer" onclick="window.onRemoveListClick(event)">Remove</button></li>
                        </ul>
                        `);t.appendChild(l)}}function ke(e){const n=e.target.closest(".list").querySelector(".listHeading");j({target:n})}function xe(e){const n=e.target.closest(".list").dataset.listIndex;h(`Вы удалили список "${s[n].title}"`,"history-delete-icon"),s.splice(n,1),p(s)}function O(e){const t=e.target.parentElement,n=e.target.dataset.listIndex;if(document.querySelectorAll(".titleInputBox").forEach(d=>{d.remove()}),document.querySelectorAll(".addTask").forEach(d=>{d.style.display="flex"}),!t)return;t.innerHTML+=`
                    <div class="titleInputBox w-fill flex flex-col gap-2 border-[var(--border-gray)] border-2 rounded-xl p-3 shadow bg-neutral-100 hover:cursor-auto transition-all">
                        <input class="titleInput w-full px-3 border-[var(--border-gray)] py-1 rounded border-2 focus:ring-0 focus:border-[var(--primary)]" type="text" oninput="window.onTaskInputChange(event)" onkeydown="window.onTaskInputKeydown(event)">
                        <button class="addButton bg-[#465fff] hover:brightness-95 hover:cursor-pointer active:brightness-90 px-3 py-1 text-white rounded" onclick="window.onAddTaskButtonClick(event)">Добавить</button>
                    </div>
                `,q(n),t.firstElementChild.style.display="none";const r=t.querySelector(".titleInput");window.currentTaskListIndex=n,r.focus()}function be(e){u(e.target,!e.target.value.length)}function ye(e){e.key==="Enter"&&z(e)}function z(e){const t=e.target.parentElement.querySelector(".titleInput"),n=window.currentTaskListIndex;if(t.value.length){const o=t.value,l={title:o,description:"",date:"",completed:!1,comments:[{username:"Kayumov Muhammad",message:`Создана задача ${o}`}]};s[n].tasks.push(l),I.lastAdded={listIndex:n},h(`Вы добавили задачу "${l.title}"`,"history-add-icon"),p(s),q(n)}else u(t,!0)}function Le(e){const t=e.target.parentElement;document.querySelectorAll(".addListBox").forEach(r=>{r.remove()}),document.querySelectorAll(".add-list-button").forEach(r=>{r.style.display="initial"}),t.innerHTML+=`
                <div class="addListBox flex flex-col gap-2 w-[var(--card-width)] border-[var(--border-gray)] border-2 rounded-xl p-3 shadow bg-neutral-100 hover:cursor-auto transition-all">
                    <input class="titleInput w-full px-3 border-[var(--border-gray)] py-1 rounded border-2 focus:ring-0 focus:border-[var(--primary)]" type="text" oninput="window.onListInputChange(event)" onkeydown="window.onListInputKeydown(event)">
                    <button class="addButton bg-[#465fff] hover:brightness-95 hover:cursor-pointer active:brightness-90 px-3 py-1 text-white rounded" onclick="window.onAddListButtonClick(event)">Добавить</button>
                </div>
            `;const l=t.querySelector(".titleInput");t.firstElementChild.style.display="none",l.focus()}function Ie(e){u(e.target,!e.target.value.length)}function Te(e){e.key==="Enter"&&K(e)}function K(e){const t=e.target.parentElement.querySelector(".titleInput");t.value.length?(s.push({title:t.value,tasks:[]}),h(`Вы добавили список "${t.value}"`,"history-add-icon"),p(s)):u(t,!0)}function y(e){if(e.target.closest(".titleInputBox,.addTask")||(document.querySelectorAll(".titleInputBox").forEach(o=>{o.remove()}),document.querySelectorAll(".addTask").forEach(o=>{o.style.display="flex"})),!e.target.closest(".inputBox,.listHeading")&&window.currentInputBox&&window.currentInputBox.parentElement){const n=window.currentInputBox.parentElement.querySelector(".listHeading");n.style.display="flex",window.currentInputBox.remove()}e.target.closest(".menuBox")||document.querySelectorAll(".listMenu").forEach(n=>{n.remove()})}function L(e){if(e.key=="Escape"&&(document.querySelectorAll(".titleInputBox").forEach(r=>{r.remove()}),document.querySelectorAll(".addTask").forEach(r=>{r.style.display="flex"}),document.querySelectorAll(".addListBox").forEach(r=>{r.remove()}),document.querySelectorAll(".add-list-button").forEach(r=>{r.style.display="flex"}),document.activeElement.closest(".addMembersContainer")?window.removeMemberMenu&&window.removeMemberMenu():window.onCancel&&window.onCancel()),e.key=="Enter"&&I.lastAdded&&e.target.tagName=="BODY"){const t=I.lastAdded,n=document.querySelector(`ul[data-list-index="${t.listIndex}"] .addTask`);n&&O({target:n})}}function Ee(){window.onDragStart=ne,window.onDragEnd=oe,window.onTaskDragEnter=se,window.onTaskDragLeave=ie,window.onTaskDragOver=le,window.onTaskDrop=re,window.onListHeadingDragEnter=ae,window.onListHeadingDragLeave=de,window.onListHeadingDragOver=ce,window.onListHeadingDrop=ue,window.onListDragStart=pe,window.onListDragEnd=we,window.onCompleteCheckboxClick=ge,window.onTaskClick=me,window.onListHeadingClick=j,window.onTitleInputChange=he,window.onTitleInputKeydown=ve,window.onMenuIconClick=fe,window.onEditListClick=ke,window.onRemoveListClick=xe,window.onAddTaskClick=O,window.onTaskInputChange=be,window.onTaskInputKeydown=ye,window.onAddTaskButtonClick=z,window.onAddListClick=Le,window.onListInputChange=Ie,window.onListInputKeydown=Te,window.onAddListButtonClick=K,window.onBodyClick=y,window.onBodyKeydown=L,window.onTaskListDragOver=te,window.onTaskListDragLeave=ee,window.onTaskListScroll=W}function Ce(){const e=T.controller.signal;document.body.removeEventListener("click",y),document.body.addEventListener("click",y,{signal:e}),document.body.removeEventListener("keydown",L),document.body.addEventListener("keydown",L,{signal:e})}function R(){document.querySelector("todo-history-popover").update()}function h(e,t="history-edit-icon"){window.taskHistory.push({title:e,icon:t}),window.taskHistory.length>100&&window.taskHistory.splice(0,1),localStorage.setItem("taskHistory",JSON.stringify(window.taskHistory)),R()}const p=(e,t=!1)=>{let n="";const o=document.querySelector(".task-lists");e.forEach((r,d)=>{let f="";r.tasks.forEach((w,k)=>{const x=`<date-badge date="${w.date}" completed="${w.completed}"></date-badge>`;f+=`
        <li 
          draggable="true" 
          data-list-index="${d}" 
          data-task-index="${k}" 
          class="hover:cursor-pointer gap-2 transition-all [&.draggable]:opacity-50 [&.droppable]:border-[var(--primary)] task border-2 flex items-center justify-between border-[var(--border-gray)] p-3 shadow rounded-xl" 
          ondragstart="window.onDragStart(event)" 
          ondragend="window.onDragEnd(event)" 
          ondragenter="window.onTaskDragEnter(event)" 
          ondragleave="window.onTaskDragLeave(event)" 
          ondragover="window.onTaskDragOver(event)" 
          ondrop="window.onTaskDrop(event)" 
          onclick="window.onTaskClick(event)"
        >
          <div class="flex flex-col gap-2 items-start">
            <div class="title ${w.completed?"line-through":""}">${w.title}</div>
            ${w.date?x:""}
          </div>
          <div>
            <input
              ${w.completed?"checked":""} 
              class="hover:cursor-pointer completeCheckbox focus:ring-0" 
              type="checkbox" 
              onclick="window.onCompleteCheckboxClick(event)"
            >
          </div>
        </li>
      `}),n+=`
      <ul
        draggable="true"    
        data-list-index="${d}" 
        class="list max-h-full w-[250px] [&.draggable]:opacity-50 gap-2 transition-all [&.droppable]:border-[var(--primary)] bg-white flex min-w-[var(--card-width)] flex-col shadow border-2 border-[var(--border-gray)] rounded-xl p-3" 
        ondragstart="window.onListDragStart(event)" 
        ondragend="window.onListDragEnd(event)"
      >
        <li 
          class="listHeading hover:cursor-pointer h-[50px] -m-3 p-3 -mb-2 pb-2 flex justify-between items-center" 
          ondragenter="window.onListHeadingDragEnter(event)" 
          ondragleave="window.onListHeadingDragLeave(event)" 
          ondragover="window.onListHeadingDragOver(event)" 
          ondrop="window.onListHeadingDrop(event)" 
        >
          <h3 onclick="window.onListHeadingClick(event)" class="w-full ml-2 text-xl font-bold">${r.title}</h3>
          <div class="menuBox hover:cursor-pointer relative transition-all p-[4px]">
            <ellipsis-icon 
              class="menuIcon flex transition-all active:scale-80" 
              onclick="window.onMenuIconClick(event)"
            ></ellipsis-icon>
          </div>
        </li>
        <ul onscroll="window.onTaskListScroll(event)" ondragover="window.onTaskListDragOver(event)" ondragleave="window.onTaskListDragLeave(event)" class="flex scrollbar-none overflow-auto flex-col gap-2">
            ${f}
            <li>    
              <button 
                data-list-index="${d}" 
                class="addTask flex gap-1.5 items-center w-full border-2 border-[var(--border-gray)] rounded-xl px-3 py-1 shadow bg-neutral-100 hover:cursor-pointer hover:bg-neutral-200 transition-all" 
                onclick="window.onAddTaskClick(event)"
              >
                 <add-task-icon></add-task-icon>Добавить задачу
              </button>
            </li>
        </ul>
      </ul>
    `}),n+=`
    <div class="add_list">
      <button 
        class="add-list-button flex gap-1.5 items-center border-[var(--border-gray)] w-[var(--card-width)] border-2 rounded-xl px-3 py-1 shadow bg-neutral-100 hover:cursor-pointer hover:bg-neutral-200 transition-all" 
        onclick="window.onAddListClick(event)"
      >
         <add-task-icon></add-task-icon>Добавить список
      </button>
    </div>
  `;function l(){const r=document.querySelectorAll(".list ul");for(let d=0;d<e.length;d++)e[d].scrollTop&&(r[d].scrollTop=e[d].scrollTop)}T.controller.abort(),T.controller=new AbortController,o.innerHTML=n,Ee(),Ce(),l(),D(),!t&&$(e)};class Me extends HTMLElement{connectedCallback(){this.getAttribute("class"),this.innerHTML=`
        <svg class="text-[var(--gray)] w-4 h-4" xmlns="http://www.w3.org/2000/svg" width="24"
            height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
            stroke-linecap="round" stroke-linejoin="round"
            class="lucide lucide-calendar-icon lucide-calendar">
            <path d="M8 2v4" />
            <path d="M16 2v4" />
            <rect width="18" height="18" x="3" y="4" rx="2" />
            <path d="M3 10h18" />
        </svg>
        `}}customElements.define("date-icon",Me);let He=class extends HTMLElement{connectedCallback(){this.getAttribute("class"),this.innerHTML=`
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-trash-icon lucide-trash"><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"/><path d="M3 6h18"/><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
        `}};customElements.define("delete-icon",He);class Ae extends HTMLElement{connectedCallback(){this.getAttribute("class"),this.innerHTML=`
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-ellipsis-icon lucide-ellipsis"><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/><circle cx="5" cy="12" r="1"/></svg>
        `}}customElements.define("ellipsis-icon",Ae);class Se extends HTMLElement{connectedCallback(){this.getAttribute("class"),this.innerHTML='<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-history-icon lucide-history"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/><path d="M12 7v5l4 2"/></svg>'}}customElements.define("history-icon",Se);class De extends HTMLElement{connectedCallback(){const t=this.getAttribute("size");this.getAttribute("class"),this.innerHTML=`
        <svg xmlns="http://www.w3.org/2000/svg" width="${t}" height="${t}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-circle-x-icon lucide-circle-x"><circle cx="12" cy="12" r="10"/><path d="m15 9-6 6"/><path d="m9 9 6 6"/></svg>`}}customElements.define("history-x-icon",De);class Be extends HTMLElement{connectedCallback(){const t=this.getAttribute("size");this.getAttribute("class"),this.innerHTML=`
        <svg xmlns="http://www.w3.org/2000/svg" width="${t}" height="${t}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-circle-check-icon lucide-circle-check"><circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/></svg>`}}customElements.define("history-complete-icon",Be);class $e extends HTMLElement{connectedCallback(){const t=this.getAttribute("size");this.getAttribute("class"),this.innerHTML=`
        <svg xmlns="http://www.w3.org/2000/svg" width="${t}" height="${t}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-square-pen-icon lucide-square-pen"><path d="M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.375 2.625a1 1 0 0 1 3 3l-9.013 9.014a2 2 0 0 1-.853.505l-2.873.84a.5.5 0 0 1-.62-.62l.84-2.873a2 2 0 0 1 .506-.852z"/></svg>`}}customElements.define("history-edit-icon",$e);class qe extends HTMLElement{connectedCallback(){const t=this.getAttribute("size");this.getAttribute("class"),this.innerHTML=`
        <svg xmlns="http://www.w3.org/2000/svg" width="${t}" height="${t}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-delete-icon lucide-delete"><path d="M10 5a2 2 0 0 0-1.344.519l-6.328 5.74a1 1 0 0 0 0 1.481l6.328 5.741A2 2 0 0 0 10 19h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2z"/><path d="m12 9 6 6"/><path d="m18 9-6 6"/></svg>`}}customElements.define("history-delete-icon",qe);class je extends HTMLElement{connectedCallback(){const t=this.getAttribute("size");this.getAttribute("class"),this.innerHTML=`
        <svg xmlns="http://www.w3.org/2000/svg" width="${t}" height="${t}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-circle-plus-icon lucide-circle-plus"><circle cx="12" cy="12" r="10"/><path d="M8 12h8"/><path d="M12 8v8"/></svg>`}}customElements.define("history-add-icon",je);class Oe extends HTMLElement{connectedCallback(){this.getAttribute("class"),this.innerHTML=`
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-user-round-plus-icon lucide-user-round-plus"><path d="M2 21a8 8 0 0 1 13.292-6"/><circle cx="10" cy="8" r="5"/><path d="M19 16v6"/><path d="M22 19h-6"/></svg>
        `}}customElements.define("user-plus-icon",Oe);class ze extends HTMLElement{connectedCallback(){this.getAttribute("class"),this.innerHTML=`
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-plus-icon lucide-plus"><path d="M5 12h14"/><path d="M12 5v14"/></svg>
        `}}customElements.define("add-task-icon",ze);class Ke extends HTMLElement{connectedCallback(){this.getAttribute("class"),this.innerHTML=`
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-thumbs-down-icon lucide-thumbs-down"><path d="M17 14V2"/><path d="M9 18.12 10 14H4.17a2 2 0 0 1-1.92-2.56l2.33-8A2 2 0 0 1 6.5 2H20a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-2.76a2 2 0 0 0-1.79 1.11L12 22a3.13 3.13 0 0 1-3-3.88Z"/></svg>
        `}}customElements.define("thumbs-down-icon",Ke);class Re extends HTMLElement{connectedCallback(){this.getAttribute("class"),this.innerHTML=`
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-thumbs-up-icon lucide-thumbs-up"><path d="M7 10v12"/><path d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2a3.13 3.13 0 0 1 3 3.88Z"/></svg>`}}customElements.define("thumbs-up-icon",Re);class Ne extends HTMLElement{connectedCallback(){this.getAttribute("class"),this.innerHTML=`
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-reply-icon lucide-reply"><path d="M20 18v-2a4 4 0 0 0-4-4H4"/><path d="m9 17-5-5 5-5"/></svg>
        `}}customElements.define("reply-icon",Ne);const Pe=async()=>{const e=document.querySelector(".board-title");await Q(),e.innerHTML=window.boardTitle};console.log(window.todo);console.log(window.todoID);let s=[],v={current:{}},I={lastAdded:void 0},T={controller:new AbortController};window.taskHistory=JSON.parse(localStorage.getItem("taskHistory")?localStorage.getItem("taskHistory"):"[]");(async()=>(console.log("tasks: ",s),await Pe(),s=window.tasks,R(),p(s)))();function _e(e,t,n){return new Promise(o=>{let l=e.members||[],r=e.comments||[];const d=()=>{let i="";for(let a in l){const m=l[a];i+=`<li data-index="${a}" onclick="window.onMemberClick(event)" class="px-2 py-1.5 rounded [user-select:none] hover:bg-black/10 hover:cursor-pointer active:bg-black/15 transition">
                    ${m.username}
                </li>`}return l.length==0&&(i+=`
                    <li class="text-sm px-2 py-1.5">Нет добавленных участников</li>
                `),i},f=()=>{document.querySelectorAll(".membersMenu").forEach(a=>{a.remove()})};window.removeMemberMenu=f;const w=i=>{setTimeout(()=>{l.push(i),document.querySelector(".membersList").innerHTML=d()},0)},k=i=>{setTimeout(()=>{l.splice(i,1),document.querySelector(".membersList").innerHTML=d()},0)},x=i=>{const a=+i.target.dataset.index;k(a)};window.onMemberClick=x;const N=i=>{const a=c.querySelector(".addMembersContainer");a.children.length<2&&(a.innerHTML+=`
                    <div class="membersMenu z-100 w-[250px] absolute top-[110%] p-3 left-0 bg-white rounded border-gray">
                        <h3 class="flex flex-col items-center">Участники</h3>
                        <input oninput="window.onElementInput(event)" onkeydown="window.onMemberInputKeyDown(event)" class="name-search text-sm mt-3" type="text" placeholder="Искать участников">
                        <ul class="membersList flex flex-col mt-2 gap-1">
                            ${d()}
                        </ul>
                    </div>
                `,a.querySelector(".name-search").focus())};window.onAddMembersClick=N;const P=i=>{i.key=="Enter"&&(i.target.value?(w({username:i.target.value}),i.target.value=""):u(i.target,!0))};window.onMemberInputKeyDown=P;const _=i=>{u(i.target,!i.target.value)};window.onElementInput=_;const M=()=>{let i="";for(let m of r)i+=`
                    <li>
                        <ui-comment username="${m.username}" message="${m.message}"></ui-comment>
                    </li>
                `;const a=document.querySelector(".comments");a.innerHTML=i},U=i=>{const a=document.querySelector(".comment-input"),m=a.value;m?(r=[{message:m,username:"Kayumov Muhammad"},...r],s[t].tasks[n].comments=r,$(s),a.value="",M()):u(a,!0)};window.onPublishComment=U;const c=E(`
                     <div class="loader_backdrop">
                        <div class="stop_propagation lg:w-[800px] md:w-[600px] sm:w-[400px] w-[250px] ">
                            <div class="flex items-center justify-center overflow-y-auto overflow-x-hidden z-50 w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
                                <div class="relative p-4 w-full max-h-full">
                                    <div class="relative bg-white rounded-lg shadow-sm">
                                        <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t border-gray-200">
                                            <h3 class="text-xl font-semibold text-gray-900">
                                                Изменить задачу
                                            </h3>
                                            <button type="button" class="cancelBtn hover:cursor-pointer text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center" data-modal-hide="default-modal">
                                                <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                                                </svg>
                                                <span class="sr-only">Close modal</span>
                                            </button>
                                        </div>
                                        <div class="flex">
                                            <div class="change-form p-4 md:p-5 space-y-4 flex-4">
                                                <div class="flex w-full gap-2 flex-wrap">
                                                    <input placeholder="Заголовок" class="title flex-3" type="text" value="${e.title}">
                                                </div>
                                                <div class="flex gap-2 flex-wrap">
                                                    <input type="date" class="date flex-1 min-w-[200px]" value="${e.date}">
                                                    <div class="addMembersContainer relative">
                                                        <button onclick="window.onAddMembersClick(event)" class="addMembersBtn input_style flex-1 flex items-center gap-1 active:brightness-70 hover:brightness-80 hover:cursor-pointer w-full transition-all">
                                                            <user-plus-icon class="inline-block"></user-plus-icon>Участники
                                                        </button>
                                                    </div>
                                                </div>
                                                <textarea rows="8" placeholder="Описание" class="description min-w-0 w-full">${e.description}</textarea>
                                            </div>
                                            <div class="p-4 !pl-0 md:p-5 flex flex-col gap-2 flex-3">
                                                <h4>Коментарии и активности</h4>
                                                <div class="relative">
                                                    <textarea oninput="window.onElementInput(event)" placeholder="Написать коментарий" class="w-full comment-input"></textarea>
                                                    <button onclick="window.onPublishComment(event)" class="bg-[var(--primary)] px-3 py-1.5 text-white rounded text-sm hover:cursor-pointer mt-1.5 hover:brightness-90 active:brightness-80 transition">Отправить</button>
                                                </div>
                                                <ul class="comments flex-[1_1_0] overflow-auto flex flex-col gap-2">
                                                </ul>
                                            </div>
                                        </div>
                                        <div class="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b">
                                            <button data-modal-hide="default-modal" type="button" class="saveBtn hover:cursor-pointer text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Сохранить</button>
                                            <button data-modal-hide="default-modal" type="button" class="cancelBtn hover:cursor-pointer py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100">Отмена</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
            `);document.body.appendChild(c);const g=c.querySelector(".title"),V=c.querySelector(".description"),G=c.querySelector(".date");M(),g.focus(),g.setSelectionRange(g.value.length,g.value.length),g.addEventListener("input",i=>{u(i.target,!i.target.value.length)});const J=c.querySelectorAll(".cancelBtn"),Y=c.querySelector(".saveBtn"),b=()=>{o(e),c.remove(),window.onCancel=void 0};window.onCancel=b;const H=()=>{g.value.length?(o({...e,title:g.value,description:V.value,date:G.value,members:l,comments:r}),c.remove()):u(g,!0)};J.forEach(i=>{i.addEventListener("click",()=>{b()})}),Y.addEventListener("click",()=>{H()}),c.querySelectorAll(".change-form input,.change-form textarea").forEach(i=>{i.addEventListener("keydown",a=>{a.key=="Enter"&&H()})}),c.addEventListener("click",()=>{b()}),document.querySelector(".stop_propagation").addEventListener("click",i=>{i.target.closest(".addMembersContainer,.addMembersBtn")||f(),i.stopPropagation()})})}export{T as controller,v as dragData,I as taskData,s as tasks};
