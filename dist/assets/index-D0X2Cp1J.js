const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/script-Bmw2EwJE.js","assets/loader-qw66VjnQ.js","assets/constants-DSAVH9vB.js","assets/script-CGRoBNzZ.css"])))=>i.map(i=>d[i]);
import{_ as o}from"./index-D9MEa4ZI.js";class e extends HTMLElement{connectedCallback(){window.boardID=this.dataset.id,this.innerHTML=`
        <div class="flex h-full overflow-auto flex-col">
            <div class="w-full px-6 py-2 flex justify-between items-center">
                <h3 class="text-2xl board-title"></h3>
                <div class="flex">
                    <history-icon data-popover-target="todo-history-popover" class="rounded hover:bg-black/10 transition hover:cursor-pointer p-1.5"></history-icon>
                    <todo-history-popover custom-id="todo-history-popover"></todo-history-popover>
                </div>
            </div>
            <div class="flex flex-col h-full">
                <div class="task-lists flex-[1_1_0] overflow-y-hidden px-6 flex items-start gap-3 py-4"></div>
            </div>
        </div>
        `,o(()=>import("./script-Bmw2EwJE.js"),__vite__mapDeps([0,1,2,3]))}}customElements.define("page-todo",e);
