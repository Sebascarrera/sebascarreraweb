/* Escenas 04 «En acción» (showreel) y 05 «Juega» (mini juegos) + menú de navegación. Contenido propio, sin entrada de usuario. */
/* eslint-disable */
import imgFirewall from '../assets/juegos/firewall.webp';
import imgContrasena from '../assets/juegos/contrasena.webp';
import imgMalware from '../assets/juegos/malware.webp';
import imgRunner from '../assets/juegos/runner.webp';
import imgJornada from '../assets/juegos/jornada.webp';
import reel from '../assets/background-portfolio-web-4.mp4';
import { JORNADA_URL } from './work.js';

const GAMES=[
 {img:imgJornada,url:JORNADA_URL,max:12000},
 {img:imgFirewall,path:'/firewall',max:9840},
 {img:imgContrasena,path:'/contrasena-maestra',max:5120},
 {img:imgMalware,path:'/escapa-malware',max:7260},
 {img:imgRunner,path:'/asics-runner',max:2480}
];
const TX={
 es:{nav:['Qué creo','Obra','En acción','Juega','Proceso','Trayectoria','Contacto'],menu:'Menú',
  aLab:'En acción',aH:'Mi trabajo, <em>en movimiento.</em>',rec:'Showreel',
  cats:[['Desarrollo','Juegos','Retos que se juegan en el navegador'],['Entregable','Experiencias','Activaciones para eventos y marcas'],['Diseño + código','Sitios web','Plataformas y landing pages'],['Movimiento','Motion','Animación y video para piezas digitales']],
  bLab:'Juega',bH:'Pruébalo <em>tú mismo.</em>',ready:'JUGADOR 1 · LISTO',score:'PUNTOS',
  games:[['Jornada de Ciberseguridad 2026','','Una feria virtual completa: recorre tres pabellones, entra a los stands y supera seis retos interactivos sobre phishing, deepfake, ransomware, vishing y más. Se abre en una pestaña nueva; mejor con sonido.','Nuevo · Proyecto 2026','3 pabellones · 6 retos','Entrar a la experiencia'],
   ['Firewall Defender','','Controla el escudo de Cipo y bloquea cada amenaza antes de que alcance el servidor central.','Arcade en tiempo real','1 min','Jugar ahora'],
   ['Contraseña Maestra','','Crea claves imposibles de descifrar combinando símbolos, números y patrones memorables.','Lógica y memoria','1 min','Jugar ahora'],
   ['Escapa del Malware','','Resuelve acertijos y toma decisiones rápidas para salir ileso de un ataque coordinado.','Aventura narrativa','1 min','Jugar ahora'],
   ['Runner Game','Propuesta de marca','Muévete de lado a lado atrapando los tenis que caen del cielo. Suma puntos y gana descuentos.','Propuesta de cliente','25 s','Jugar demo']]},
 en:{nav:['What I create','Work','In action','Play','Process','Career','Contact'],menu:'Menu',
  aLab:'In action',aH:'My work, <em>in motion.</em>',rec:'Showreel',
  cats:[['Development','Games','Challenges played right in the browser'],['Deliverable','Experiences','Activations for events and brands'],['Design + code','Websites','Platforms and landing pages'],['Motion','Motion','Animation and video for digital pieces']],
  bLab:'Play',bH:'Try it <em>yourself.</em>',ready:'PLAYER 1 · READY',score:'SCORE',
  games:[['Cybersecurity Week 2026','','A full virtual fair: walk through three pavilions, step into the booths and beat six interactive challenges on phishing, deepfakes, ransomware, vishing and more. Opens in a new tab; best with sound.','New · 2026 project','3 pavilions · 6 challenges','Enter the experience'],
   ['Firewall Defender','','Control Cipo’s shield and block every threat before it reaches the central server.','Real-time arcade','1 min','Play now'],
   ['Master Password','','Build unbreakable passwords by combining symbols, numbers, and memorable patterns.','Logic & memory','1 min','Play now'],
   ['Escape the Malware','','Solve puzzles and make quick decisions to escape a coordinated attack.','Narrative adventure','1 min','Play now'],
   ['Runner Game','Brand proposal','Move side to side catching sneakers falling from the sky. Score points and win discounts.','Client proposal','25 s','Play demo']]}
};
export function createJuega(root,{aw,go}){
const $=s=>root.querySelector(s),$$=s=>[].slice.call(root.querySelectorAll(s)),clamp=(x,a=0,b=1)=>Math.min(b,Math.max(a,x));
const mob=()=>innerWidth<=760,reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
const A=$('#s2a'),B=$('#s2b');if(!A||!B)return{stop(){}};
let alive=true,lang=document.documentElement.lang==='en'?'en':'es';
/* ---- estructura (una sola vez) ---- */
A.innerHTML=`<div class="stage"><div class="grid"></div>
 <div class="top"><span class="lab"><b>04</b> — <span data-j="aLab"></span></span><span class="lab" id="jaN">01 / 04</span></div>
 <h2 class="sh disp" data-j="aH"></h2>
 <div class="jfr" id="jfr"><i class="jcn a"></i><i class="jcn b"></i><i class="jcn c"></i><i class="jcn d"></i>
  <div class="jh"><span class="jrec"><i></i><span data-j="rec"></span></span><span id="jaNow"></span></div>
  <video id="jvid" muted loop playsinline preload="none" aria-hidden="true"></video></div>
 <div class="jcats" id="jcats">${[0,1,2,3].map(i=>`<div class="jcat${i?'':' on'}"><em></em><b></b><span></span></div>`).join('')}</div></div>`;
B.innerHTML=`<div class="stage"><div class="grid"></div>
 <div class="top"><span class="lab"><b>05</b> — <span data-j="bLab"></span></span><span class="lab" id="jbN">01 / 0${GAMES.length}</span></div>
 <h2 class="sh disp" data-j="bH"></h2>
 <div class="jgm"><ul class="jgl" id="jgl">${GAMES.map((g,i)=>`<li${i?'':' class="on"'}><span class="jth"><img alt="" loading="lazy" src="${g.img}"></span><em>0${i+1}</em><b></b><p></p><div class="jmeta"><span class="jtag"></span><span class="jtag"></span></div><a class="jplay" ${g.url?`href="${g.url}" target="_blank" rel="noopener noreferrer"`:`href="${g.path}" data-go="${g.path}"`}></a></li>`).join('')}</ul>
  <div class="jcab" aria-hidden="true"><div class="jsc">${GAMES.map((g,i)=>`<img alt="" loading="lazy" src="${g.img}"${i?'':' class="on"'}>`).join('')}</div><div class="jbar"><span data-j="ready"></span><span id="jsco"></span></div></div></div></div>`;
const vid=$('#jvid'),fr=$('#jfr'),cats=$$('#jcats .jcat'),lis=$$('#jgl li'),imgs=$$('.jsc img'),sco=$('#jsco');
let aa=0,bb=0,score=0;
function texts(){lang=document.documentElement.lang==='en'?'en':'es';const t=TX[lang];
 root.querySelectorAll('[data-j]').forEach(e=>{const v=t[e.dataset.j];if(v!=null)e.innerHTML=v});
 $$('#jl a').forEach((a,i)=>a.textContent=t.nav[[0,1,2,3,4,5][i]]);$$('#jmenu a').forEach((a,i)=>{a.querySelector('span').textContent=t.nav[i]});
 $('#jm').setAttribute('aria-label',t.menu);
 cats.forEach((c,i)=>{const d=t.cats[i];c.querySelector('em').textContent=d[0];c.querySelector('b').textContent=d[1];c.querySelector('span').textContent=d[2]});
 lis.forEach((l,i)=>{const g=t.games[i];l.querySelector('b').innerHTML=g[0]+(g[1]?' <small class="jsub">'+g[1]+'</small>':'');l.querySelector('p').textContent=g[2];const tg=l.querySelectorAll('.jtag');tg[0].textContent=g[3];tg[1].textContent=g[4];l.querySelector('.jplay').textContent=g[5]+(GAMES[i].url?' ↗':' →')});
 $('#jaNow').textContent=t.cats[aa][1];scoreTxt()}
function scoreTxt(){sco.textContent=TX[lang].score+' '+String(score).padStart(5,'0')}
root.querySelectorAll('.lang button').forEach(b=>b.addEventListener('click',()=>setTimeout(texts,0)));
/* ---- menú ---- */
const mb=$('#jm'),menu=$('#jmenu');
const tgm=o=>{mb.setAttribute('aria-expanded',o);menu.classList.toggle('open',o)};
mb.addEventListener('click',()=>tgm(mb.getAttribute('aria-expanded')!=='true'));
$$('#jmenu a').forEach(a=>a.addEventListener('click',()=>tgm(false)));
aw(document,'keydown',e=>{if(e.key==='Escape')tgm(false)});
/* ---- navegación a los juegos sin recargar ---- */
aw(root,'click',e=>{const a=e.target.closest('a[data-go]');if(!a||e.metaKey||e.ctrlKey||e.shiftKey||e.button)return;e.preventDefault();go&&go(a.dataset.go)});
/* ---- scroll ---- */
const pr=el=>{const r=el.getBoundingClientRect();return clamp(-r.top/(r.height-innerHeight))};
const IDS=['s1','s2','s2a','s2b','s3','s4'];
let loaded=false;
function update(){const vh=innerHeight;
 let cur='';IDS.forEach(i=>{const e=root.querySelector('#'+i);if(e&&e.getBoundingClientRect().top<vh*.45)cur=i});
 $$('#jl a,#jmenu a').forEach(a=>a.classList.toggle('on',a.getAttribute('href')==='#'+cur));
 const ra=A.getBoundingClientRect();
 if(!loaded&&ra.top<vh*2.2){loaded=true;vid.src=reel}
 const showing=ra.bottom>0&&ra.top<vh;
 if(loaded&&!reduce){if(showing){if(vid.paused)vid.play().catch(()=>{})}else if(!vid.paused)vid.pause()}
 if(mob()||reduce)return;
 const pa=pr(A),g=clamp(pa/.45),e=g<.5?2*g*g:1-Math.pow(-2*g+2,2)/2;
 fr.style.width=(52+40*e)+'vw';fr.style.maxHeight=(50+2*e)+'svh';
 const i=Math.min(3,Math.floor(clamp((pa-.35)/.6)*4));if(i!==aa){aa=i;cats.forEach((c,k)=>c.classList.toggle('on',k===i));$('#jaNow').textContent=TX[lang].cats[i][1];$('#jaN').textContent='0'+(i+1)+' / 04'}
 const N=GAMES.length,pb=pr(B),j=Math.min(N-1,Math.floor(pb*N));if(j!==bb){bb=j;lis.forEach((l,k)=>l.classList.toggle('on',k===j));imgs.forEach((im,k)=>im.classList.toggle('on',k===j));$('#jbN').textContent='0'+(j+1)+' / 0'+N;score=0;scoreTxt()}
}
let tk=false;aw(window,'scroll',()=>{if(!tk){tk=true;requestAnimationFrame(()=>{tk=false;update()})}},{passive:true});aw(window,'resize',update);
let timer=0;(function loop(){if(!alive)return;if(!mob()&&!reduce&&B.getBoundingClientRect().top<innerHeight&&B.getBoundingClientRect().bottom>0){score=Math.min(score+3+((Math.random()*9)|0),GAMES[bb].max);scoreTxt()}timer=setTimeout(loop,90)})();
texts();update();
return{stop(){alive=false;clearTimeout(timer);try{vid.pause()}catch(_e){}}};
}
