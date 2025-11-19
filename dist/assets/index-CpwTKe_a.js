import"./index-D9MEa4ZI.js";import{W as $,a as C,T as g}from"./constants-DSAVH9vB.js";async function k(e,t){return fetch(e,t).then(s=>s.json())}const i=document.getElementById("weather-area");document.getElementById("weather-result");const B=k(`${$}?lat=38.53575&lon=68.77905&units=metric&appid=${C}`);B.then(e=>{const t=Math.round(e.main.temp),s=e.weather[0].main;s==="Rain"?i.innerHTML=`🌧️<span id="weather-result">${t}</span>&#8451;`:s==="Clouds"?i.innerHTML=`☁️<span id="weather-result">${t}</span>&#8451;`:s==="Snow"?i.innerHTML=`❄️<span id="weather-result">${t}</span>&#8451;`:s==="Clear"?i.innerHTML=`☀️<span id="weather-result">${t}</span>&#8451;`:s==="Mist"||s==="Fog"?i.innerHTML=`🌫️<span id="weather-result">${t}</span>&#8451;`:s==="Thunderstorm"?i.innerHTML=`⚡<span id="weather-result">${t}</span>&#8451;`:i.innerHTML=`🌦️<span id="weather-result">${t}</span>&#8451;`});function T(e){let t=e-Math.floor(e/1e3)*1e3;return t>=100?Math.floor(t/10):t<10?"0"+String(t):t}const x=document.getElementById("stopwatch-area"),H=document.getElementById("start"),r=document.getElementById("stop"),A=document.getElementById("reset"),R=document.getElementById("save"),P=document.getElementById("track"),w=document.getElementById("dialog");let I=[],c=+(localStorage.getItem("stopwatch-time")||0),v=null,b=!1;function L(e){const t=Math.floor(e/1e3),s=Math.floor(t/60),m=t%60,u=T(e);return{minutes:String(s).padStart(2,"0"),seconds:String(m).padStart(2,"0"),millis:u}}const y=()=>{const{minutes:e,seconds:t,millis:s}=L(c);x.innerHTML=`
        <div class="minutes">${e}</div>
        <span class="time-separator">:</span>
        <div class="seconds">${t}</div>
        <span class="milliseconds">.</span>
        <div class="milliseconds">${s}</div>
    `};y();function _(){b||(b=!0,r.textContent="Pause",v=setInterval(()=>{c+=g,y()},g))}function N(){b?(clearInterval(v),v=null,b=!1,r.textContent="Stop"):r.textContent==="Stop"&&(c=0,y(),r.textContent="Pause")}function W(){clearInterval(v),v=null,b=!1,c=0,y(),r.textContent="Pause",document.getElementById("log").textContent="",I.length=0,localStorage.removeItem("stopwatch-time")}function F(){localStorage.setItem("stopwatch-time",c),j()}function j(){w.setAttribute("open",!0),setTimeout(()=>{w.removeAttribute("open")},3e3)}function D(){const{minutes:e,seconds:t,millis:s}=L(c),m=`${e}:${t}.${s}`,u=new Date().toLocaleString();I.unshift(`<div class='log_data'>
			<span class="main-element">${m}</span>
			<div class="date-element">
				<svg width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path d="M12 7V12L14.5 10.5M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
				</svg>
				<span>${u}</span>
			</div>
		</div>`);let S="";I.forEach(M=>{S+=M}),document.getElementById("log").innerHTML=S}H.addEventListener("click",()=>{_()});r.addEventListener("click",()=>{N()});A.addEventListener("click",()=>{W()});R.addEventListener("click",()=>{F()});P.addEventListener("click",()=>{D()});const l=document.getElementById("timer-start"),a=document.getElementById("timer-stop"),h=document.getElementById("timer-plus-five"),E=document.getElementById("timer-minus-five"),K=document.getElementById("timer-area"),f=document.getElementById("initial-number"),G=document.getElementsByTagName("audio")[0];let n=0,p=null,o=!1;function d(e){const t=Math.floor(e/1e3),s=Math.floor(t/60),m=t%60,u=T(e);K.innerHTML=`
        <div class="minutes">${String(s).padStart(2,"0")}</div>
        <span class="time-separator">:</span>
        <div class="seconds">${String(m).padStart(2,"0")}</div>
        <span class="milliseconds">.</span>
        <div class="milliseconds">${u}</div>
    `}d(0);f.addEventListener("input",function(e){const s=e.target.value*1e3;n=s,d(s)});l.addEventListener("click",()=>{!o&&n>0&&(o=!0,l.disabled=!0,a.textContent="Pause",a.disabled=!1,f.disabled=!0,h.disabled=!0,E.disabled=!0,p=setInterval(()=>{n-=g,n<=0?(n=0,clearInterval(p),p=null,o=!1,d(n),G.play(),l.disabled=!1,a.textContent="Stop",a.disabled=!1,f.disabled=!1,h.disabled=!1,E.disabled=!1):d(n)},g))});a.addEventListener("click",()=>{o?(clearInterval(p),p=null,o=!1,l.disabled=!1,l.textContent="Resume",a.textContent="Stop"):a.textContent==="Stop"&&(n=0,d(n),l.textContent="Start",l.disabled=!1,a.disabled=!0,f.disabled=!1,h.disabled=!1,E.disabled=!1,f.value="")});h.addEventListener("click",()=>{o||(n=Number(n)+5e3,d(n))});E.addEventListener("click",()=>{!o&&n>0&&(n=Math.max(0,Number(n)-5e3),d(n))});class O extends HTMLElement{connectedCallback(){this.innerHTML=`
        <section class="timers-section">
            <div id="stopwatch" class="timer-card">
                <div class="container">
                    <h2 class="timer-title">Stopwatch</h2>
                    <div class="area" id="stopwatch-area">
                        <div class="minutes">00</div>
                        <span class="time-separator">:</span>
                        <div class="seconds">00</div>
                        <span class="milliseconds">.</span>
                        <div class="milliseconds">00</div>
                    </div>
                    <div class="button-group">
                        <button class="btn btn-primary" id="start">Start</button>
                        <button class="btn btn-secondary" id="stop">Pause</button>
                        <button class="btn btn-secondary" id="reset">Reset</button>
                        <button class="btn btn-secondary" id="save">Save</button>
                        <button class="btn btn-secondary" id="track">Track</button>
                    </div>
                    <dialog id="dialog" class="success-dialog">
                        <form class="dialog-form" method="dialog">
                            <p>Time saved successfully!</p>
                            <button type="submit" class="btn btn-primary">OK</button>
                        </form>
                    </dialog>
                </div>
                <div class="log-container">
                    <p id="log" class="log-list"></p>
                </div>
            </div>

            <div id="timer" class="timer-card">
                <div class="container">
                    <h2 class="timer-title">Timer</h2>
                    <div class="area" id="timer-area">
                        <div class="minutes">00</div>
                        <span class="time-separator">:</span>
                        <div class="seconds">00</div>
                        <span class="milliseconds">.</span>
                        <div class="milliseconds">00</div>
                    </div>
                    <div class="input-group">
                        <label for="initial-number">Enter seconds:</label>
                        <input type="number" id="initial-number" min="0" placeholder="0" />
                    </div>
                    <div class="button-group">
                        <button class="btn btn-primary" id="timer-start">Start</button>
                        <button class="btn btn-secondary" id="timer-stop" disabled>Stop</button>
                        <button class="btn btn-secondary" id="timer-plus-five">+5 sec</button>
                        <button class="btn btn-secondary" id="timer-minus-five">−5 sec</button>
                    </div>
                </div>
            </div>

            <audio style="display: none;">
                <source src="./media/egg_timer_alrm.mp3" type="audio/mpeg" />
            </audio>
        </section>
        `,setTimeout(()=>{},0)}}customElements.define("page-timers",O);
