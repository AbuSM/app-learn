import"./script-Bmw2EwJE.js";import"./loader-qw66VjnQ.js";import"./constants-DSAVH9vB.js";function U(){const B=document.getElementById("month-btn"),H=document.getElementById("week-btn"),F=document.getElementById("day-btn"),C=document.getElementById("slider"),M=document.getElementById("month-view"),T=document.getElementById("week-view"),V=document.getElementById("day-view"),D=document.getElementById("days"),$=document.getElementById("month-year"),N=document.getElementById("prev-month"),Y=document.getElementById("next-month"),j=document.getElementById("add-event-btn"),S=new Date;let x=new Date,f=new Date,v=new Date,y="month",p=JSON.parse(localStorage.getItem("calendarEvents"))||{};const b=document.createElement("ui-modal");b.setAttribute("title","Add / Edit Event"),b.setAttribute("ok-text","Update changes"),b.setAttribute("cancel-text","Close"),document.body.appendChild(b);function A(e=null,t=null,i=!0){const o=e?`${e.getFullYear()}-${String(e.getMonth()+1).padStart(2,"0")}-${String(e.getDate()).padStart(2,"0")}`:null,r=t||{title:"",color:"danger",startDate:o||new Date().toISOString().split("T")[0],endDate:o||new Date().toISOString().split("T")[0]};return`
			<div class="event-form-container">
				<p class="event-form-subtitle">Спланируйте свой следующий большой момент: расписание или редактирование события</p>

				<div class="form-group">
					<label for="event-title">Название события</label>
					<input
						type="text"
						id="event-title"
						placeholder="Семинар #6"
						value="${r.title}"
						class="form-input"
					/>
				</div>

				<div class="form-group">
					<label>Цвет события</label>
					<div class="color-selector">
						<label class="color-option">
							<input type="radio" name="color" value="danger" ${r.color==="danger"?"checked":""} />
							<span class="color-dot danger"></span>
							<span>Красный</span>
						</label>
						<label class="color-option">
							<input type="radio" name="color" value="success" ${r.color==="success"?"checked":""} />
							<span class="color-dot success"></span>
							<span>Зелёный</span>
						</label>
						<label class="color-option">
							<input type="radio" name="color" value="primary" ${r.color==="primary"?"checked":""} />
							<span class="color-dot primary"></span>
							<span>Синий</span>
						</label>
						<label class="color-option">
							<input type="radio" name="color" value="warning" ${r.color==="warning"?"checked":""} />
							<span class="color-dot warning"></span>
							<span>Жёлтый</span>
						</label>
					</div>
				</div>

				${i?`
					<div class="form-group">
						<label for="event-start-date">Дата начала</label>
						<input
							type="date"
							id="event-start-date"
							value="${r.startDate}"
							class="form-input"
						/>
					</div>

					<div class="form-group">
						<label for="event-end-date">Дата окончания</label>
						<input
							type="date"
							id="event-end-date"
							value="${r.endDate}"
							class="form-input"
						/>
					</div>
				`:""}
			</div>
		`}function L(e=null,t=null,i=!0){const o=t!==null;b.setTitle(o?"Редактировать событие":"Добавить / Редактировать событие"),b.setButtonText("Добавить","Закрыть");const r=b.getBody();r.innerHTML=A(e,t,i),b.show().then(()=>{const l=b.getBody(),c=l.querySelector("#event-title"),m=l.querySelector('input[name="color"]:checked'),a=l.querySelector("#event-start-date"),s=l.querySelector("#event-end-date"),g=c.value.trim();if(!g){window.showToast("Пожалуйста, введите название события",3);return}const n=a?a.value:e?`${e.getFullYear()}-${String(e.getMonth()+1).padStart(2,"0")}-${String(e.getDate()).padStart(2,"0")}`:new Date().toISOString().split("T")[0],d=s?s.value:n,u={id:(t==null?void 0:t.id)||Date.now().toString(),title:g,color:m.value,startDate:n,endDate:d},h=u.startDate;if(p[h]||(p[h]=[]),o){const E=p[h].findIndex(k=>k.id===t.id);E!==-1&&(p[h][E]=u)}else p[h].push(u);localStorage.setItem("calendarEvents",JSON.stringify(p)),window.showToast("Успешно!",3),w(y)}).catch(()=>{})}function w(e){y=e,localStorage.setItem("calendarView",e),M.classList.add("hidden"),T.classList.add("hidden"),V.classList.add("hidden"),e==="month"?(C.style.left="4px",M.classList.remove("hidden"),q()):e==="week"?(C.style.left="calc(33.333% + 2px)",T.classList.remove("hidden"),W()):e==="day"&&(C.style.left="calc(66.666% + 2px)",V.classList.remove("hidden"),J())}B.addEventListener("click",()=>w("month")),H.addEventListener("click",()=>w("week")),F.addEventListener("click",()=>w("day")),j.addEventListener("click",()=>L(x));function O(e){const t={danger:{bg:"bg-red-100",text:"text-red-700",border:"border-red-400"},success:{bg:"bg-green-100",text:"text-green-700",border:"border-green-400"},primary:{bg:"bg-blue-100",text:"text-blue-700",border:"border-blue-400"},warning:{bg:"bg-yellow-100",text:"text-yellow-700",border:"border-yellow-400"}};return t[e]||t.danger}function q(){const e=x.getFullYear(),t=x.getMonth(),i=new Date(e,t,1),o=new Date(e,t+1,0),r=i.getDay(),l=o.getDate(),c=new Date(e,t,0).getDate(),m=["Январь","Февраль","Март","Апрель","Май","Июнь","Июль","Август","Сентябрь","Октябрь","Ноябрь","Декабрь"];$.textContent=`${m[t]} ${e}`,D.innerHTML="";const a=r===0?6:r-1;for(let n=a;n>0;n--){const d=document.createElement("div");d.classList.add("border","border-gray-100","min-h-32","p-2","text-gray-300","bg-white"),d.textContent=c-n+1,D.appendChild(d)}for(let n=1;n<=l;n++){const d=document.createElement("div");d.classList.add("border","border-gray-100","min-h-32","p-2","cursor-pointer","transition-colors","bg-white","hover:bg-gray-50");const u=document.createElement("div");u.classList.add("font-semibold","mb-2","text-sm","text-gray-700"),u.textContent=n,n===S.getDate()&&t===S.getMonth()&&e===S.getFullYear()&&(d.classList.add("bg-gray-200","border-gray-300","rounded-[5px]","m-[10px]"),d.classList.remove("border-gray-100","bg-white","hover:bg-gray-50"),u.classList.add("text-white","font-bold")),d.appendChild(u);const h=`${e}-${String(t+1).padStart(2,"0")}-${String(n).padStart(2,"0")}`;p[h]&&p[h].forEach(E=>{const k=document.createElement("div"),I=O(E.color);k.classList.add("text-xs","px-2","py-1","mb-1","rounded",I.bg,I.text,"border-l-4",I.border,"truncate","font-medium","cursor-pointer","hover:opacity-80","transition-opacity"),k.textContent=E.title,d.appendChild(k)}),d.addEventListener("click",()=>{L(new Date(e,t,n),null,!1)}),D.appendChild(d)}const g=42-D.children.length;for(let n=1;n<=g;n++){const d=document.createElement("div");d.classList.add("border","border-gray-100","min-h-32","p-2","text-gray-300","bg-white"),d.textContent=n,D.appendChild(d)}}function z(){const e=f.getDay(),t=e===0?6:e-1,i=new Date(f);i.setDate(f.getDate()-t);const o=[];for(let r=0;r<7;r++){const l=new Date(i);l.setDate(i.getDate()+r),o.push(l)}return o}function W(){const e=z(),t=document.getElementById("week-header"),i=["ПН","ВТ","СР","ЧТ","ПТ","СБ","ВС"];t.innerHTML='<div class="py-3"></div>',e.forEach((a,s)=>{const g=document.createElement("div");g.classList.add("py-3","border-l","border-gray-100"),g.textContent=`${i[s]} ${a.getMonth()+1}/${a.getDate()}`,t.appendChild(g)});const o=e[0],r=e[6],l=["Янв","Фев","Мар","Апр","Май","Июн","Июл","Авг","Сен","Окт","Ноя","Дек"];$.textContent=`${l[o.getMonth()]} ${o.getDate()} – ${r.getDate()}, ${o.getFullYear()}`;const c=document.getElementById("week-grid");if(!c)return;c.innerHTML="",Array.from({length:19},(a,s)=>s+6).forEach(a=>{const s=document.createElement("div");s.classList.add("flex","border-b","border-gray-100");const g=document.createElement("div");g.classList.add("w-20","text-xs","text-gray-400","py-2","pr-2","text-right"),g.textContent=a>=12?`${a===12?12:a-12}pm`:`${a}am`,s.appendChild(g);for(let n=0;n<7;n++){const d=document.createElement("div");d.classList.add("flex-1","border-l","border-gray-100","min-h-12","hover:bg-gray-50","cursor-pointer"),d.addEventListener("click",()=>{L(e[n],null,!1)}),s.appendChild(d)}c.appendChild(s)})}function J(){const t=["Воскресенье","Понедельник","Вторник","Среда","Четверг","Пятница","Суббота"][v.getDay()].toUpperCase(),i=document.getElementById("day-header");i.textContent=t;const o=["Январь","Февраль","Март","Апрель","Май","Июнь","Июль","Август","Сентябрь","Октябрь","Ноябрь","Декабрь"];$.textContent=`${o[v.getMonth()]} ${v.getDate()}, ${v.getFullYear()}`;const r=document.getElementById("day-grid");if(!r)return;r.innerHTML="",Array.from({length:19},(c,m)=>m+6).forEach(c=>{const m=document.createElement("div");m.classList.add("flex","border-b","border-gray-100");const a=document.createElement("div");a.classList.add("w-20","text-xs","text-gray-400","py-2","pr-2","text-right"),a.textContent=c>=12?`${c===12?12:c-12}pm`:`${c}am`;const s=document.createElement("div");s.classList.add("flex-1","border-l","border-gray-100","min-h-12","hover:bg-gray-50","cursor-pointer"),s.addEventListener("click",()=>{L(v,null,!1)}),m.appendChild(a),m.appendChild(s),r.appendChild(m)})}N.addEventListener("click",()=>{y==="month"?x.setMonth(x.getMonth()-1):y==="week"?f.setDate(f.getDate()-7):y==="day"&&v.setDate(v.getDate()-1),w(y)}),Y.addEventListener("click",()=>{y==="month"?x.setMonth(x.getMonth()+1):y==="week"?f.setDate(f.getDate()+7):y==="day"&&v.setDate(v.getDate()+1),w(y)});const K=localStorage.getItem("calendarView")||"month";w(K)}class _ extends HTMLElement{connectedCallback(){this.innerHTML=`
        <h1 class="text-gray-700 ml-12 mt-6 text-3xl font-semibold">Календарь</h1>
        <div class="calendar bg-white border border-gray-200 rounded-lg m-8 shadow-sm">
            <div class="head flex justify-between p-6 border-b border-gray-100">
                <div class="flex gap-2 items-center">
                    <button id="prev-month" class="w-10 h-10 rounded-md bg-white border border-gray-200 hover:bg-gray-100 cursor-pointer flex items-center justify-center text-gray-600 font-medium transition-colors">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
                        </svg>
                    </button>
                    <button id="next-month" class="w-10 h-10 rounded-md bg-white border border-gray-200 hover:bg-gray-100 cursor-pointer flex items-center justify-center text-gray-600 font-medium transition-colors">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                        </svg>
                    </button>
                    <button id="add-event-btn" class="h-10 rounded-md bg-blue-600 hover:bg-blue-700 px-4 text-white cursor-pointer font-medium transition-colors text-sm">Добавить событие +</button>
                </div>
        
                <div class="flex items-center text-2xl font-semibold text-gray-800">
                    <h1 id="month-year"></h1>
                </div>
        
                <div class="relative bg-gray-100 rounded-lg p-1 flex gap-1 items-center w-fit">
                    <div id="slider" class="absolute top-1 left-1 w-[calc(33.333%-4px)] h-[34px] bg-white rounded-md transition-all duration-300 shadow-sm"></div>
                    <div id="month-btn" class="relative z-10 text-center px-4 cursor-pointer font-medium text-sm text-gray-600 hover:text-gray-900 transition-colors py-2">месяц</div>
                    <div id="week-btn" class="relative z-10 text-center px-4 cursor-pointer font-medium text-sm text-gray-600 hover:text-gray-900 transition-colors py-2">неделя</div>
                    <div id="day-btn" class="relative z-10 text-center px-4 cursor-pointer font-medium text-sm text-gray-600 hover:text-gray-900 transition-colors py-2">день</div>
                </div>
            </div>
        
            <div id="month-view">
                <div class="grid grid-cols-7 bg-gray-50 text-center font-medium text-gray-400 text-xs uppercase tracking-wide">
                    <div class="py-3 border-b border-r border-gray-100">Пн</div>
                    <div class="py-3 border-b border-r border-gray-100">Вт</div>
                    <div class="py-3 border-b border-r border-gray-100">Ср</div>
                    <div class="py-3 border-b border-r border-gray-100">Чт</div>
                    <div class="py-3 border-b border-r border-gray-100">Пт</div>
                    <div class="py-3 border-b border-r border-gray-100">Сб</div>
                    <div class="py-3 border-b border-gray-100">Вс</div>
                </div>
                <div id="days" class="grid grid-cols-7"></div>
            </div>
        
            <div id="week-view" class="hidden">
                <div id="week-header" class="grid grid-cols-8 bg-gray-50 text-center font-medium text-gray-400 text-xs uppercase tracking-wide border-b border-gray-100">
                </div>
                <div class="bg-white">
                    <div class="flex border-b border-gray-100">
                        <div class="w-20 text-xs text-gray-400 py-2 pr-2 text-right">all-day</div>
                        <div class="flex-1 grid grid-cols-7 border-l border-gray-100">
                            <div class="border-r border-gray-100"></div>
                            <div class="border-r border-gray-100"></div>
                            <div class="border-r border-gray-100"></div>
                            <div class="border-r border-gray-100"></div>
                            <div class="border-r border-gray-100"></div>
                            <div class="border-r border-gray-100"></div>
                            <div class="border-r border-gray-100"></div>
                        </div>
                    </div>
                    <div id="week-grid" class="overflow-y-auto max-h-[600px]"></div>
                </div>
            </div>
        
            <div id="day-view" class="hidden">
                <div id="day-header" class="bg-gray-50 text-gray-400 text-xs uppercase tracking-wide border-b border-gray-100 py-3 px-4 font-medium"></div>
                <div class="bg-white">
                    <div class="flex border-b border-gray-100">
                        <div class="w-20 text-xs text-gray-400 py-2 pr-2 text-right">all-day</div>
                        <div class="flex-1 border-l border-gray-100"></div>
                    </div>
                    <div id="day-grid" class="overflow-y-auto max-h-[600px]"></div>
                </div>
            </div>
        </div>
        `,U()}}customElements.define("page-calendar",_);
