/* Lógica de la portada cinematográfica (scroll, chip, escenas). Código imperativo aislado en root. */
/* eslint-disable */
import { createObra } from './obra.js';
export function initCine(root,{i18n,work}){
let alive=true;const _off=[];
const aw=(t,e,f,o)=>{t.addEventListener(e,f,o);_off.push(()=>t.removeEventListener(e,f,o))};
const obra=createObra(root,{i18n,work,aw});

const $=s=>root.querySelector(s),clamp=(x,a=0,b=1)=>Math.min(b,Math.max(a,x)),lerp=(a,b,t)=>a+(b-a)*t,ease=x=>x<.5?2*x*x:1-Math.pow(-2*x+2,2)/2;
const reduce=matchMedia('(prefers-reduced-motion: reduce)').matches,mob=()=>innerWidth<=760;
if(reduce)root.classList.add('calm');
/* ---------- textos ES / EN ---------- */
const T={es:{nav1:'Qué creo',cta:'Hablemos',s0lab:'Apertura',meta:'16 años · 500+ proyectos',h1:'De la idea',h2:'a la realidad',h3:'digital.',sub:'Diseño · Código · Motion · Experiencias interactivas. Convierto ideas en experiencias digitales.',scroll:'Scroll para explorar',s1lab:'Qué creo',
 nextlab:'Siguientes escenas',endh:'Fin del prototipo',endp:'Siguen: Trabajo seleccionado, Proceso, Capacidades, Trayectoria y Contacto, con este mismo lenguaje.'},
 en:{nav1:'What I create',cta:"Let's talk",s0lab:'Opening',meta:'16 years · 500+ projects',h1:'Ideas into',h2:'digital',h3:'reality.',sub:'Design · Code · Motion · Interactive experiences. I turn ideas into digital experiences.',scroll:'Scroll to explore',s1lab:'What I create',
 nextlab:'Next scenes',endh:'End of prototype',endp:'Next: Selected work, Process, Capabilities, Experience and Contact, in this same language.'}};
const B={es:[['Productos digitales','Sitios web, plataformas y aplicaciones diseñadas y construidas de punta a punta.','Jornada de Ciberseguridad 2026 · Mundo Colmena','Fig. 01','Estructura'],
 ['Mundos interactivos','Juegos, gamificación y experiencias inmersivas que la gente quiere recorrer.','Colmena Route Game · Sprint Falabella · GoGo Racing','Fig. 02','Mundo'],
 ['Desarrollo creativo','Interfaces, motion y experimentación web: el detalle que hace que algo se sienta distinto.','Stand BOOST · Video FullStaff','Fig. 03','Movimiento'],
 ['Experiencias con IA','Avatares, automatización e integración de inteligencia artificial en productos reales.','Presentador virtual con IA','Fig. 04','Red']],
 en:[['Digital products','Websites, platforms and apps designed and built end to end.','Cybersecurity Day 2026 · Mundo Colmena','Fig. 01','Structure'],
 ['Interactive worlds','Games, gamification and immersive experiences people want to explore.','Colmena Route Game · Sprint Falabella · GoGo Racing','Fig. 02','World'],
 ['Creative development','Interfaces, motion and web experimentation: the detail that makes something feel different.','BOOST booth · FullStaff video','Fig. 03','Motion'],
 ['AI experiences','Avatars, automation and AI integration in real products.','Virtual AI presenter','Fig. 04','Network']]};
let lang=(typeof localStorage!=='undefined'&&localStorage.getItem('language')==='en')?'en':'es',active=0;
const blocks=$('#blocks');
function render(){
 document.documentElement.lang=lang;
 root.querySelectorAll('[data-t]').forEach(e=>e.textContent=T[lang][e.dataset.t]);
 blocks.innerHTML=B[lang].map((b,i)=>`<div class="blk${i===active?' on':''}"><div class="row"><span class="n">0${i+1}</span><h3 class="disp">${b[0]}</h3></div><div class="d"><div><p>${b[1]}</p><small>${lang==='es'?'En el portafolio':'In the portfolio'}: <b>${b[2]}</b></small></div></div></div>`).join('');
 setFig();
 root.querySelectorAll('.lang button').forEach(b=>b.setAttribute('aria-pressed',b.dataset.l===lang));
}
function setFig(){const b=B[lang][active];$('#fl1').textContent=b[3];$('#fl2').textContent=b[4];$('#cnt').textContent='0'+(active+1)+' / 04';
 root.querySelectorAll('#idx i').forEach((e,i)=>e.classList.toggle('on',i===active));
 root.querySelectorAll('.blk').forEach((e,i)=>e.classList.toggle('on',i===active));if(reduce)drawV(3)}
root.querySelectorAll('.lang button').forEach(b=>b.onclick=()=>{lang=b.dataset.l;try{localStorage.setItem('language',lang)}catch(_e){}i18n.changeLanguage(lang);render()});
blocks.addEventListener('click',e=>{const k=[...blocks.children].indexOf(e.target.closest('.blk'));if(k>=0&&(mob()||reduce)){active=k;setFig()}});
/* ---------- chip: 4 capas con profundidad ---------- */
const layers=[...root.querySelectorAll('.ly')],tiltEl=$('#tilt'),specEl=$('#spec');
(function(){
 const A='#00D4C8',N=14,pins=[...Array(N).keys()].map(i=>62+i*(76/(N-1)));
 let sd=7;const rnd=()=>(sd=(sd*16807)%2147483647)/2147483647;
 const dv=`<defs>
 <linearGradient id="pk" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#232a34"/><stop offset=".45" stop-color="#10141a"/><stop offset="1" stop-color="#0a0c10"/></linearGradient>
 <linearGradient id="sw" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="${A}" stop-opacity="0"/><stop offset=".5" stop-color="#8ffff3" stop-opacity=".5"/><stop offset="1" stop-color="${A}" stop-opacity="0"/><animateTransform attributeName="gradientTransform" type="translate" from="-1 0" to="1 0" dur="5s" repeatCount="indefinite"/></linearGradient>
 <radialGradient id="hg"><stop offset="0" stop-color="${A}" stop-opacity=".3"/><stop offset="1" stop-color="${A}" stop-opacity="0"/></radialGradient>
 <pattern id="dots" width="6" height="6" patternUnits="userSpaceOnUse"><circle cx="1" cy="1" r=".45" fill="${A}" fill-opacity=".55"/></pattern>
 <pattern id="hatch" width="2" height="2" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><path d="M0 0V2" stroke="${A}" stroke-opacity=".5" stroke-width=".35"/></pattern>
 <radialGradient id="fade"><stop offset=".22" stop-color="#fff"/><stop offset="1" stop-color="#000"/></radialGradient>
 <mask id="fm2"><rect x="-120" y="-120" width="440" height="440" fill="url(#fade)"/></mask>
 <clipPath id="cclip"><rect x="87.5" y="87.5" width="25" height="25" rx="2.5"/></clipPath></defs>`;
 const st=(o,w=.7)=>`fill="none" stroke="${A}" stroke-opacity="${o}" stroke-width="${w}" vector-effect="non-scaling-stroke"`;
 /* L0 · placa */
 let s=dv+`<circle cx="100" cy="100" r="150" fill="url(#hg)"/><rect x="-120" y="-120" width="440" height="440" fill="url(#dots)" mask="url(#fm2)" opacity=".5"/>`;
 [66,78,92,108,126].forEach((r,i)=>{s+=`<circle cx="100" cy="100" r="${r}" ${st(.2-i*.03,.6)} stroke-dasharray="${i%2?'1 4':'12 4 2 4'}"/>`});
 [[-84,-84],[284,-84],[-84,284],[284,284]].forEach(([x,y])=>{s+=`<circle cx="${x}" cy="${y}" r="5" fill="#08090B" ${st(.5,.8).replace('fill="none"','')}/><circle cx="${x}" cy="${y}" r="8.5" ${st(.25,.6)} stroke-dasharray="2 2"/><path d="M${x-9} ${y}H${x+9}M${x} ${y-9}V${y+9}" ${st(.25,.5)}/>`});
 const ic=(x,y,w,h,ref,np)=>{let g=`<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="1.4" fill="#0b0e12" ${st(.5,.8).replace('fill="none"','')}/><circle cx="${x+2.2}" cy="${y+2.2}" r=".7" fill="${A}"/>`;
  for(let k=0;k<np;k++){const yy=y+2+k*((h-4)/Math.max(1,np-1));g+=`<path d="M${x-2.4} ${yy}H${x}M${x+w} ${yy}H${x+w+2.4}" ${st(.55,.7)}/>`}
  g+=`<text x="${x+w/2}" y="${y+h/2+1}" text-anchor="middle" class="ref">${ref}</text>`;return g};
 s+=ic(-80,26,28,20,'U2',6)+ic(-80,154,28,20,'U3',6)+ic(252,26,28,20,'U4',6)+ic(252,154,28,20,'U5',6)+ic(56,-82,34,14,'U6',5)+ic(112,-82,34,14,'U7',5)+ic(56,268,34,14,'U8',5)+ic(112,268,34,14,'U9',5);
 const caps=(x,y,n,v,ref)=>{let g='';for(let k=0;k<n;k++)g+=v?`<rect x="${x}" y="${y+k*5}" width="3.4" height="2.2" rx=".5" ${st(.5,.6)}/>`:`<rect x="${x+k*5}" y="${y}" width="2.2" height="3.4" rx=".5" ${st(.5,.6)}/>`;return g+`<text x="${x}" y="${y-2}" class="ref">${ref}</text>`};
 s+=caps(-60,60,8,1,'C1–C8')+caps(-60,106,8,1,'C9–C16')+caps(252,60,8,1,'C17–C24')+caps(252,106,8,1,'C25–C32')+caps(34,-44,8,0,'C33–C40')+caps(130,-44,8,0,'C41–C48')+caps(34,246,8,0,'C49–C56')+caps(130,246,8,0,'C57–C64');
 s+=`<rect x="-92" y="86" width="14" height="30" rx="1.5" ${st(.5,.8)}/><path d="M-92 92H-96M-92 98H-96M-92 104H-96M-92 110H-96" ${st(.5,.7)}/><text x="-85" y="84" class="ref">J1</text><rect x="268" y="90" width="10" height="20" rx="5" ${st(.55,.8)}/><text x="262" y="87" class="ref">Y1</text>`;
 for(let k=0;k<26;k++){const a=rnd()*6.283,r=118+rnd()*34,x=100+Math.cos(a)*r,y=100+Math.sin(a)*r;s+=`<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${(.8+rnd()*.9).toFixed(1)}" ${st(.45,.6)}/>`;if(k%5===0)s+=`<text x="${(x+2.6).toFixed(1)}" y="${(y+1).toFixed(1)}" class="ref">TP${k/5+1}</text>`}
 [[-52,36,-20,54,-4,90],[-52,164,-20,146,-4,112],[280,36,230,56,210,88],[280,164,230,144,210,112]].forEach(p=>{s+=`<path d="M${p[0]} ${p[1]}H${p[2]}L${p[4]} ${p[5]}" ${st(.22,1.6)}/><circle cx="${p[4]}" cy="${p[5]}" r="1.6" fill="#08090B" ${st(.6,.8).replace('fill="none"','')}/>`});
 $('#L0').innerHTML=s;
 /* L1 · pistas */
 s='';for(let q=0;q<4;q++){let g='';
  pins.forEach((x,i)=>{const xf=100+(x-100)*1.85,yA=44-(i%2)*2.2,run=Math.abs(xf-x),yE=yA-run-4-(i%4)*5,d=`M${x} 50 V${yA} L${xf} ${yA-run} V${yE}`;
   g+=`<path class="tr" d="${d}"/><path class="fl" d="${d}" style="animation-delay:-${((i*.41+q*.77)%3.2).toFixed(2)}s;animation-duration:${(2.6+((i+q)%4)*.5).toFixed(1)}s"/>`;
   g+=i%3===0?`<rect x="${xf-1.7}" y="${yE-3.4}" width="3.4" height="3.4" fill="#08090B" ${st(1,.8).replace('fill="none"','')}/>`:`<circle cx="${xf}" cy="${yE-1.3}" r="1.4" fill="#08090B" ${st(1,.8).replace('fill="none"','')}/><circle cx="${xf}" cy="${yE-1.3}" r=".45" fill="${A}"/>`});
  g+=`<g ${st(.45,.6)}><rect x="40" y="38" width="6" height="2.6" rx=".6"/><rect x="40" y="43" width="6" height="2.6" rx=".6"/><path d="M36 40.3H40M46 40.3H49M36 44.3H40M46 44.3H49M52 52L47 47"/></g>`;
  s+=`<g transform="rotate(${q*90} 100 100)">${g}</g>`}
 s+=`<rect x="46" y="46" width="108" height="108" rx="11" ${st(.28,1.3)} stroke-dasharray="16 3 3 3"/>`;$('#L1').innerHTML=s;
 /* L2 · encapsulado, die y núcleo */
 s='';for(let q=0;q<4;q++){let g='';pins.forEach(x=>{g+=`<rect x="${x-1.5}" y="50" width="3" height="6.8" rx=".5" fill="#9ffaf4" fill-opacity=".88"/>`});s+=`<g transform="rotate(${q*90} 100 100)">${g}</g>`}
 s+=`<rect x="56" y="56" width="88" height="88" rx="7" fill="url(#pk)" stroke="${A}" stroke-width="1.6" vector-effect="non-scaling-stroke"/><rect x="58.4" y="58.4" width="83.2" height="83.2" rx="5" ${st(.09,.7).replace(A,'#fff')}/>
 <path d="M60 66V60H66M134 60H140V66M60 134V140H66M134 140H140V134" ${st(.6,.8)}/>
 <circle cx="63" cy="63" r="1.5" fill="${A}"/><circle cx="137" cy="62.6" r=".9" fill="${A}"><animate attributeName="opacity" values="1;.15;1" dur="1.6s" repeatCount="indefinite"/></circle><circle cx="133" cy="62.6" r=".9" fill="#F2F2EE"><animate attributeName="opacity" values=".2;1;.2" dur="2.3s" repeatCount="indefinite"/></circle>
 <text x="100" y="62.4" text-anchor="middle" class="sk">CREATIVE ENGINEERING</text><text x="100" y="140.2" text-anchor="middle" class="sk">EST. 2010 · REV 2026</text><text transform="rotate(-90 60.4 100)" x="60.4" y="100" text-anchor="middle" class="sk">DESIGN · CODE · MOTION · AI</text><text transform="rotate(90 139.6 100)" x="139.6" y="100" text-anchor="middle" class="sk">IDEAS → DIGITAL REALITY</text>
 <rect x="67" y="67" width="66" height="66" rx="3" fill="#06080b" stroke="${A}" stroke-opacity=".75" stroke-width=".9" vector-effect="non-scaling-stroke"/><path d="M100 67V133M67 100H133" ${st(.35,.6)}/>`;
 [0,1,2,3,4,5].forEach(k=>{s+=`<rect x="69" y="${69+k*3.1}" width="${[14,9,12,7,11,8][k]}" height="1.1" fill="${A}" fill-opacity="${.35+(k%3)*.18}"/>`});
 s+=`<text x="69" y="97" class="mq">DEV</text><g ${st(.8,.6)}><rect x="116" y="69" width="15" height="9"/><circle cx="119" cy="84" r="2.2"/><rect x="123" y="82.6" width="8" height="1.2"/><rect x="116" y="88" width="15" height="1.2"/></g><text x="131" y="97" text-anchor="end" class="mq">UI/UX</text>
 <path d="M69 122 q3 -8 6 0 t6 0 t6 0 M69 127 H98" ${st(1,.7)}/><g fill="${A}"><path d="M75 118 l1.2 1.2 -1.2 1.2 -1.2 -1.2z"/><path d="M87 118 l1.2 1.2 -1.2 1.2 -1.2 -1.2z"/></g><text x="69" y="131" class="mq">MOTION</text>
 <path d="M118 108L128 112M118 108L121 120M128 112L130 126M121 120L130 126M121 120L116 128M128 112L121 120" ${st(.7,.6)}/><g fill="#06080b" ${st(1,.7).replace('fill="none"','')}><circle cx="118" cy="108" r="1.6"/><circle cx="128" cy="112" r="1.6"/><circle cx="121" cy="120" r="1.6"/><circle cx="130" cy="126" r="1.6"/><circle cx="116" cy="128" r="1.6"/></g><text x="131" y="131" text-anchor="end" class="mq">AI</text>
 <path id="scan" d="M67 70H133" ${st(.5,.7)}><animateTransform attributeName="transform" type="translate" values="0 0;0 60;0 0" dur="6s" repeatCount="indefinite"/></path>
 <rect x="84" y="84" width="32" height="32" rx="4" fill="#0d1015" stroke="${A}" stroke-width="1.4" vector-effect="non-scaling-stroke"/><rect id="cframe" x="87.5" y="87.5" width="25" height="25" rx="2.5" ${st(.5,.7)}/>`;
 /* micro-nivel dentro del núcleo (se revela al hacer zoom) */
 let m='';for(let r=0;r<14;r++){let x=88;const y=88+r*1.7;while(x<112){const w=1+Math.floor(rnd()*4)*.9;if(rnd()>.28)m+=`<rect x="${x.toFixed(1)}" y="${y.toFixed(1)}" width="${(w-.25).toFixed(1)}" height="1.25" fill="${A}" fill-opacity="${(.2+rnd()*.5).toFixed(2)}"/>`;x+=w}}
 const ht=(x,y,l,h,d)=>{if(d>3)return '';const a=h?`M${x-l} ${y}H${x+l}`:`M${x} ${y-l}V${y+l}`;let o=`<path d="${a}" ${st(.9,.5)}/>`;const nl=l/2;[-1,1].forEach(sg=>{const nx=h?x+sg*l:x,ny=h?y:y+sg*l;o+=h?`<path d="M${nx} ${ny-nl}V${ny+nl}" ${st(.9,.5)}/>`+ht(nx,ny-nl,nl*.9,true,d+1)+ht(nx,ny+nl,nl*.9,true,d+1):''});return o};
 m+=`<g>${ht(100,100,8,true,0)}</g><rect x="89" y="89" width="7" height="5.5" rx=".5" fill="url(#hatch)" ${st(.7,.4)}/><rect x="104" y="105.5" width="7" height="5.5" rx=".5" fill="url(#hatch)" ${st(.7,.4)}/><text x="89.4" y="96.6" class="mi">SRAM</text><text x="104.4" y="113.2" class="mi">ALU</text><text x="100" y="99" text-anchor="middle" class="mi" fill-opacity=".9">CLK</text><circle cx="100" cy="100" r="1" fill="#08090B" ${st(1,.5).replace('fill="none"','')}/>`;
 s+=`<g clip-path="url(#cclip)"><g id="micro" opacity="0">${m}</g></g><text id="ctext" x="100" y="102.8" text-anchor="middle" font-family="Archivo,Arial,sans-serif" font-weight="900" font-size="8" letter-spacing=".3" fill="#F2F2EE">JSCM</text>
 <circle cx="100" cy="100" r="20" ${st(.7,.8)}><animate attributeName="r" values="18;40" dur="3.4s" repeatCount="indefinite"/><animate attributeName="stroke-opacity" values=".7;0" dur="3.4s" repeatCount="indefinite"/></circle>
 <rect x="56" y="56" width="88" height="88" rx="7" fill="url(#sw)" opacity=".55" style="mix-blend-mode:screen;pointer-events:none"/>`;$('#L2').innerHTML=s;
 /* L3 · HUD flotante */
 s=`<g class="spin"><circle cx="100" cy="100" r="116" ${st(.4,.7)} stroke-dasharray="1 5"/><circle cx="100" cy="100" r="121" ${st(.5,.7)} stroke-dasharray="30 12 6 12"/></g><g class="spin r"><circle cx="100" cy="100" r="132" ${st(.28,.6)} stroke-dasharray="4 8"/></g>`;
 [['M72 -2V-5H128V-2',100,-7.4,'DEV',''],['M202 72H205V128H202',209.4,100,'UI / UX','rotate(90 209.4 100)'],['M72 202V205H128V202',100,211.4,'MOTION',''],['M-2 72H-5V128H-2',-9.4,100,'AI','rotate(-90 -9.4 100)']].forEach(h=>{s+=`<path d="${h[0]}" ${st(.6,.7)}/><text x="${h[1]}" y="${h[2]}" text-anchor="middle" class="hud"${h[4]?` transform="${h[4]}"`:''}>${h[3]}</text>`});
 s+=`<g ${st(.7,.8)}><path d="M-30 -30H-12M-30 -30V-12M230 -30H212M230 -30V-12M-30 230H-12M-30 230V212M230 230H212M230 230V212"/></g><text x="-30" y="-36" class="hud cns">SYS · ONLINE</text><text x="230" y="-36" text-anchor="end" class="hud cns">BUILD · OK</text><text x="-30" y="242" class="hud cns">RENDER · 60 FPS</text><text x="230" y="242" text-anchor="end" class="hud cns">DEPLOY · LIVE</text>`;
 $('#L3').innerHTML=s;
 if(reduce)root.querySelectorAll('.ly animate,.ly animateTransform').forEach(e=>e.remove());
})();
/* ---------- campo de partículas del hero ---------- */
const hc=$('#hc'),hx=hc.getContext('2d');let HW=0,HH=0,dpr=1,pts=[],mx=-9999,my=-9999,p0=0,vis0=true;
function sizeH(){dpr=Math.min(2,devicePixelRatio||1);HW=hc.width=hc.clientWidth*dpr;HH=hc.height=hc.clientHeight*dpr;const n=mob()?28:70;pts=[...Array(n)].map(()=>({x:Math.random()*HW,y:Math.random()*HH,vx:(Math.random()-.5)*.25*dpr,vy:(Math.random()-.5)*.25*dpr}))}
aw(window,'pointermove',e=>{const r=hc.getBoundingClientRect();mx=(e.clientX-r.left)*dpr;my=(e.clientY-r.top)*dpr},{passive:true});
function drawH(){if(!vis0)return;hx.clearRect(0,0,HW,HH);const a=1-clamp(p0*1.6),L=150*dpr;
 pts.forEach(q=>{q.x+=q.vx;q.y+=q.vy;if(q.x<0||q.x>HW)q.vx*=-1;if(q.y<0||q.y>HH)q.vy*=-1;const dx=q.x-mx,dy=q.y-my,d=Math.hypot(dx,dy);if(d<140*dpr){q.x+=dx/d*.8;q.y+=dy/d*.8}});
 for(let i=0;i<pts.length;i++){const q=pts[i];hx.fillStyle=`rgba(0,212,200,${.5*a})`;hx.fillRect(q.x,q.y,1.6*dpr,1.6*dpr);
  for(let j=i+1;j<pts.length;j++){const r=pts[j],d=Math.hypot(q.x-r.x,q.y-r.y);if(d<L){hx.strokeStyle=`rgba(0,212,200,${(1-d/L)*.16*a})`;hx.lineWidth=dpr;hx.beginPath();hx.moveTo(q.x,q.y);hx.lineTo(r.x,r.y);hx.stroke()}}}}
/* ---------- visual generativo de la escena 01 ---------- */
const vc=$('#vc'),vx=vc.getContext('2d');let VW=0,VH=0,vis1=false,modeT=0,lastMode=0;
function sizeV(){VW=vc.width=vc.clientWidth*dpr||1;VH=vc.height=vc.clientHeight*dpr||1}
const ACC='0,212,200';
function rr(x,y,w,h,r){vx.beginPath();vx.moveTo(x+r,y);vx.arcTo(x+w,y,x+w,y+h,r);vx.arcTo(x+w,y+h,x,y+h,r);vx.arcTo(x,y+h,x,y,r);vx.arcTo(x,y,x+w,y,r);vx.closePath()}
const AC=a=>`rgba(${ACC},${a})`;
function tx(s,x,y,sz,col,al){vx.font=`700 ${sz*dpr}px Archivo,Inter,sans-serif`;vx.textAlign=al||'left';vx.fillStyle=col;vx.fillText(s,x,y)}
function drawV(t){if(!vis1)return;vx.clearRect(0,0,VW,VH);if(lastMode!==active){lastMode=active;modeT=t}
 const u=dpr,W=VW,H=VH,tm=t-modeT;vx.globalAlpha=clamp(tm*2.2);vx.lineWidth=1.2*u;vx.strokeStyle=AC(1);vx.fillStyle=AC(.5);vx.textBaseline='middle';
 const es=lang==='es',R=(p,a,b)=>clamp((p-a)/(b-a));
 if(active===0){const ph=(tm%8)/8,x=W*.07,y=H*.08,w=W*.86,h=H*.84;vx.globalAlpha*=1-R(ph,.95,1);
  rr(x,y,w,h,8*u);vx.strokeStyle=AC(.6);vx.stroke();vx.beginPath();vx.moveTo(x,y+28*u);vx.lineTo(x+w,y+28*u);vx.stroke();
  [0,1,2].forEach(i=>{vx.fillStyle=AC(.35+i*.2);vx.beginPath();vx.arc(x+16*u+i*14*u,y+14*u,3.5*u,0,7);vx.fill()});
  rr(x+w*.2,y+7*u,w*.5,14*u,7*u);vx.strokeStyle=AC(.35);vx.stroke();tx('tuproyecto.com'.slice(0,Math.floor(R(ph,0,.1)*14)),x+w*.2+10*u,y+14.5*u,9,AC(.9));
  const cx=x+16*u,cw=w-32*u,top=y+40*u;
  vx.fillStyle=AC(.5);vx.globalAlpha*=1;const g=vx.globalAlpha;vx.globalAlpha=g*R(ph,.1,.18);rr(cx,top,16*u,16*u,4*u);vx.fill();[.52,.6,.68].forEach((k,i)=>vx.fillRect(cx+cw*k,top+5*u,cw*.06,5*u));vx.globalAlpha=g;
  const hy=top+34*u;[[.46,.2,.32],[.32,.28,.4]].forEach((b,i)=>{vx.fillStyle=i?AC(.55):'rgba(242,242,238,.9)';vx.fillRect(cx,hy+i*22*u,cw*b[0]*R(ph,b[1],b[2]),14*u)});
  vx.fillStyle=AC(.3);[0,1].forEach(i=>vx.fillRect(cx,hy+56*u+i*9*u,cw*(.36-i*.08)*R(ph,.34,.44),4*u));
  const bx=cx,by=hy+86*u,bw=cw*.2,bh=26*u,bp=R(ph,.4,.46);vx.globalAlpha=g*bp;rr(bx,by,bw,bh,13*u);vx.fillStyle=AC(1);vx.fill();tx(es?'HABLEMOS':'LET’S TALK',bx+bw/2,by+bh/2+1,9,'#001a19','center');vx.globalAlpha=g;
  const ik=R(ph,.3,.5),ix=cx+cw*.62,iy=top+24*u,iw=cw*.38,ih=hy+70*u-top;vx.save();vx.globalAlpha=g*ik;rr(ix,iy,iw,ih,6*u);vx.strokeStyle=AC(.55);vx.stroke();vx.clip();for(let k=-10;k<24;k++){vx.beginPath();vx.moveTo(ix+k*14*u,iy+ih);vx.lineTo(ix+k*14*u+ih*.7,iy);vx.strokeStyle=AC(.18);vx.stroke()}vx.beginPath();vx.arc(ix+iw*.5,iy+ih*.5,Math.min(iw,ih)*.22*ik,0,7);vx.strokeStyle=AC(.9);vx.stroke();vx.restore();
  const cy2=by+bh+30*u,ch=Math.max(20*u,y+h-cy2-16*u);for(let i=0;i<3;i++){const p=R(ph,.52+i*.07,.62+i*.07),cw3=(cw-24*u)/3;vx.globalAlpha=g*p;const yy=cy2+(1-p)*14*u;rr(cx+i*(cw3+12*u),yy,cw3,ch,6*u);vx.strokeStyle=AC(.5);vx.stroke();vx.fillStyle=AC(.45);vx.fillRect(cx+i*(cw3+12*u)+10*u,yy+10*u,cw3*.4,4*u);vx.fillStyle=AC(.2);vx.fillRect(cx+i*(cw3+12*u)+10*u,yy+20*u,cw3*.65,3*u)}vx.globalAlpha=g;
  const mp=R(ph,.1,.44),mx=lerp(x+w*.8,bx+bw*.55,ease(mp)),my=lerp(y+h*.2,by+bh*.55,ease(mp));if(ph>.1&&ph<.8){const cl=R(ph,.44,.5);if(cl>0&&cl<1){vx.beginPath();vx.arc(mx,my,cl*26*u,0,7);vx.strokeStyle=AC(1-cl);vx.stroke()}vx.fillStyle='#F2F2EE';vx.beginPath();vx.moveTo(mx,my);vx.lineTo(mx+11*u,my+4*u);vx.lineTo(mx+4*u,my+11*u);vx.closePath();vx.fill()}
  const dp=R(ph,.78,.86);vx.globalAlpha=g*dp;rr(x+w-118*u,y+h-34*u,104*u,22*u,11*u);vx.fillStyle=AC(.18);vx.fill();vx.strokeStyle=AC(1);vx.stroke();tx('● DEPLOY OK',x+w-66*u,y+h-22.5*u,9,AC(1),'center');tx('LIGHTHOUSE '+Math.round(R(ph,.8,.92)*100),x+w-118*u,y+h-46*u,8,AC(.8));vx.globalAlpha=g}
 else if(active===1){const gy=H*.74,v=W*.33,px=W*.26,P=1.8,s=t*v;
  vx.strokeStyle=AC(.14);for(let k=0;k<14;k++){const xx=((k*W/9-s*.25)%(W*1.5)+W*1.5)%(W*1.5)-W*.1;vx.beginPath();vx.moveTo(xx,H*.12);vx.lineTo(xx,gy);vx.stroke()}
  vx.strokeStyle=AC(.35);vx.beginPath();for(let k=0;k<=60;k++){const xx=k/60*W,yy=gy-H*.1-Math.abs(Math.sin((xx+s*.35)/W*5))*H*.14;k?vx.lineTo(xx,yy):vx.moveTo(xx,yy)}vx.stroke();
  vx.strokeStyle=AC(.9);vx.beginPath();vx.moveTo(0,gy);vx.lineTo(W,gy);vx.stroke();vx.strokeStyle=AC(.4);for(let k=0;k<24;k++){const xx=((k*W/10-s)%(W*2.4)+W*2.4)%(W*2.4)-W*.2;vx.beginPath();vx.moveTo(xx,gy+8*u);vx.lineTo(xx+W*.04,gy+8*u);vx.stroke()}
  const j=(t%P)/P,jy=Math.sin(Math.PI*clamp(j/.6))*H*.2,py=gy-9*u-jy;
  const n0=Math.floor(t/P)-1;for(let n=n0;n<n0+4;n++){const ox=px+v*(n*P+.54-t);if(ox<-W*.1||ox>W*1.1)continue;
   vx.strokeStyle=AC(.9);vx.fillStyle=AC(.25);rr(ox-14*u,gy-30*u,28*u,30*u,3*u);vx.fill();vx.stroke();
   for(let c=0;c<5;c++){const cxx=ox+(c-2)*v*.1,cyy=gy-H*.1-Math.sin(c/4*Math.PI)*H*.16-30*u;const gone=cxx<px,dd=px-cxx;if(!gone){vx.save();vx.translate(cxx,cyy);vx.rotate(.785+t*2);vx.fillStyle='#F2F2EE';vx.fillRect(-4*u,-4*u,8*u,8*u);vx.restore()}else if(dd<W*.1){const q=dd/(W*.1);vx.globalAlpha*=1-q;tx('+10',px+14*u,py-18*u-q*30*u,9,AC(1));vx.globalAlpha=clamp(tm*2.2)}}}
  vx.fillStyle=AC(.9);vx.beginPath();vx.arc(px,py,9*u,0,7);vx.fill();vx.strokeStyle=AC(.4);for(let k=1;k<4;k++){vx.beginPath();vx.arc(px-k*14*u,py+k*2*u,(4-k)*2*u,0,7);vx.stroke()}
  const sc=Math.floor(t/P)*50+Math.round(R(t%P,.3,.5)*50);tx(('SCORE '+String(sc).padStart(4,'0')),W*.07,H*.09,11,'#F2F2EE');tx('LVL 0'+(1+Math.floor(t/P/4)%9),W*.93,H*.09,11,AC(1),'right');tx('60 FPS',W*.93,H*.86,9,AC(.6),'right');tx(es?'PULSA · SALTA · JUEGA':'TAP · JUMP · PLAY',W*.07,H*.86,9,AC(.6))}
 else if(active===2){const cx=W/2,cy=H*.33,R0=Math.min(W,H)*.2;
  for(let c=0;c<3;c++){vx.strokeStyle=AC(.9-c*.3);vx.beginPath();for(let k=0;k<=160;k++){const a=k/160*Math.PI*2,r=R0*(1-c*.22)*(1+.2*Math.sin(3*a+t*(1.1+c*.3))+.1*Math.sin(5*a-t*.8+c)),x=cx+Math.cos(a)*r,y=cy+Math.sin(a)*r;k?vx.lineTo(x,y):vx.moveTo(x,y)}vx.closePath();vx.stroke()}
  vx.fillStyle='#F2F2EE';for(let k=0;k<12;k++){const a=k/12*Math.PI*2,r=R0*(1+.2*Math.sin(3*a+t*1.1)+.1*Math.sin(5*a-t*.8));vx.beginPath();vx.arc(cx+Math.cos(a)*r,cy+Math.sin(a)*r,2.4*u,0,7);vx.fill()}
  vx.strokeStyle=AC(.2);vx.beginPath();vx.moveTo(cx-R0*1.6,cy);vx.lineTo(cx+R0*1.6,cy);vx.moveTo(cx,cy-R0*1.5);vx.lineTo(cx,cy+R0*1.5);vx.stroke();
  const gx=W*.09,gy2=H*.62,gw=W*.38,gh=H*.28,p1=[.25+.2*Math.sin(t*.7),.1+.5*Math.abs(Math.sin(t*.5))],p2=[.7+.15*Math.cos(t*.6),.6+.4*Math.sin(t*.9)*.5+.4];
  vx.strokeStyle=AC(.3);rr(gx,gy2,gw,gh,4*u);vx.stroke();const B=(a,b,s)=>3*(1-s)*(1-s)*s*a+3*(1-s)*s*s*b+s*s*s;
  vx.strokeStyle=AC(1);vx.lineWidth=2*u;vx.beginPath();for(let k=0;k<=60;k++){const s=k/60,xx=gx+B(p1[0],p2[0],s)*gw,yy=gy2+gh-B(p1[1],p2[1],s)*gh;k?vx.lineTo(xx,yy):vx.moveTo(xx,yy)}vx.stroke();vx.lineWidth=1.2*u;
  vx.strokeStyle=AC(.5);[[0,0,p1],[1,1,p2]].forEach(([a,b,p])=>{vx.beginPath();vx.moveTo(gx+a*gw,gy2+gh-b*gh);vx.lineTo(gx+p[0]*gw,gy2+gh-p[1]*gh);vx.stroke();vx.fillStyle='#F2F2EE';vx.beginPath();vx.arc(gx+p[0]*gw,gy2+gh-p[1]*gh,4*u,0,7);vx.fill()});
  const tx0=W*.56,tx1=W*.92,ty=H*.76,q=(t%2.6)/2.6,e1=B(p1[1],p2[1],q);vx.strokeStyle=AC(.3);vx.beginPath();vx.moveTo(tx0,ty);vx.lineTo(tx1,ty);vx.stroke();for(let k=0;k<=8;k++){vx.beginPath();vx.moveTo(tx0+k*(tx1-tx0)/8,ty-4*u);vx.lineTo(tx0+k*(tx1-tx0)/8,ty+4*u);vx.stroke()}
  vx.fillStyle=AC(.9);rr(tx0+q*(tx1-tx0)-9*u,ty-9*u-e1*H*.08,18*u,18*u,3*u);vx.fill();tx('EASE · CUBIC-BEZIER',gx,gy2-10*u,9,AC(.7));tx('MOTION · '+(q*2.6).toFixed(2)+'s',tx0,ty+24*u,9,AC(.7));tx(es?'DETALLE · CURVA · RITMO':'DETAIL · CURVE · RHYTHM',W*.07,H*.07,9,AC(.6))}
 else{const ph=(tm%9)/9,s=es?'Crea un host virtual que reciba a los visitantes':'Create a virtual host that greets visitors',x=W*.07,w=W*.86;vx.globalAlpha*=1-R(ph,.95,1);const g=vx.globalAlpha;
  rr(x,H*.07,w,H*.12,8*u);vx.strokeStyle=AC(.6);vx.stroke();const nn=Math.floor(R(ph,0,.34)*s.length);tx('> '+s.slice(0,nn)+(ph<.4&&Math.floor(t*2)%2?'▍':''),x+14*u,H*.13,10,'#F2F2EE');
  const L=[3,5,5,3],nodes=[];L.forEach((n,li)=>{for(let i=0;i<n;i++)nodes.push({x:W*(.2+li*.2),y:H*(.25+(i+1)/(n+1)*.3),l:li})});const wave=R(ph,.34,.58)*4.2;
  nodes.forEach(a=>nodes.forEach(b=>{if(b.l===a.l+1){const on=clamp(1-Math.abs(wave-a.l-.5)*1.2);vx.strokeStyle=AC(.1+on*.55);vx.beginPath();vx.moveTo(a.x,a.y);vx.lineTo(b.x,b.y);vx.stroke()}}));
  nodes.forEach((n,i)=>{const on=clamp(1-Math.abs(wave-n.l)*1.1);vx.fillStyle='#111318';vx.strokeStyle=AC(.4+on*.6);vx.beginPath();vx.arc(n.x,n.y,(6+on*3)*u,0,7);vx.fill();vx.stroke();if(on>.3){vx.fillStyle=AC(on);vx.beginPath();vx.arc(n.x,n.y,2.4*u,0,7);vx.fill()}});
  const rp=R(ph,.58,.92),by=H*.66;vx.globalAlpha=g*clamp(rp*6);vx.strokeStyle=AC(.9);vx.beginPath();vx.arc(x+22*u,by+22*u,18*u,0,7);vx.stroke();vx.fillStyle=AC(.4);vx.beginPath();vx.arc(x+22*u,by+16*u,6*u,0,7);vx.fill();vx.beginPath();vx.arc(x+22*u,by+34*u,11*u,Math.PI,0);vx.fill();
  const nb=Math.floor(rp*30);for(let k=0;k<nb;k++){const row=Math.floor(k/10),col=k%10,ww=(18+((k*37)%34))*u*(W/700+.4);const bx=x+56*u+col*(w-60*u)/10*.98,yy=by+row*14*u+4*u;if(bx+ww>x+w)continue;vx.fillStyle=k===nb-1?'#F2F2EE':AC(.55);vx.fillRect(bx,yy,Math.min(ww,(w-60*u)/10-6*u),6*u)}
  vx.globalAlpha=g;tx(es?'RESPUESTA · '+(R(ph,.58,.92)*.8).toFixed(1)+' s':'RESPONSE · '+(R(ph,.58,.92)*.8).toFixed(1)+' s',x,H*.86,9,AC(.7));tx(es?'IA · AVATARES · AUTOMATIZACIÓN':'AI · AVATARS · AUTOMATION',x+w,H*.86,9,AC(.6),'right')}
 vx.globalAlpha=1;vx.textBaseline='alphabetic'}
/* ---------- scroll ---------- */
const s0=$('#s0'),s1=$('#s1'),chip=$('#chip'),glow=$('#glow'),l1=$('#l1'),l2=$('#l2'),l3=$('#l3'),htop=$('#htop'),hsub=$('#hsub');
function upd(){
 if(reduce){return}
 const vh=innerHeight,vw=innerWidth,r0=s0.getBoundingClientRect();p0=clamp(-r0.top/(r0.height-vh));vis0=r0.bottom>0;
 const e=ease(clamp(p0/.55)),sc=1+Math.pow(p0,2.1)*(mob()?22:19),ox=mob()?0:vw*.245,oy=mob()?-vh*.13:-vh*.03;
 chip.style.transform=`translate3d(${ox*(1-e)}px,${oy*(1-e)}px,0) scale(${sc})`;chip.style.opacity=1-clamp((p0-.9)/.1);
 const kz=clamp((p0-.4)/.34),mi=$('#micro');if(mi){mi.style.opacity=kz;mi.setAttribute('transform',`translate(100 100) scale(${lerp(.72,1,kz)}) translate(-100 -100)`);$('#ctext').style.opacity=1-clamp((p0-.36)/.18);$('#cframe').style.opacity=1-kz*.6}
 const f=clamp(p0/.4);l1.style.transform=`translate3d(${-p0*vw*.22}px,${-p0*vh*.16}px,0)`;l2.style.transform=`translate3d(${p0*vw*.12}px,0,0)`;l3.style.transform=`translate3d(${-p0*vw*.2}px,${p0*vh*.16}px,0)`;
 [l1,l2,l3].forEach(x=>x.style.opacity=1-f);htop.style.opacity=hsub.style.opacity=1-clamp(p0/.25);
 glow.style.opacity=clamp((p0-.35)/.5);
 if(mob()){const bs=[...blocks.children],ln=innerHeight*.62;let k=0;bs.forEach((b,i)=>{if(b.getBoundingClientRect().top<ln)k=i});if(k!==active){active=k;setFig()}}
 if(!mob()){const r1=s1.getBoundingClientRect(),p1=clamp(-r1.top/(r1.height-vh)),i=Math.min(3,Math.floor(p1*4));vis1=r1.top<vh&&r1.bottom>0;if(i!==active){active=i;setFig()}}
}
let tick=false;aw(window,'scroll',()=>{if(!tick){tick=true;requestAnimationFrame(()=>{tick=false;upd()})}},{passive:true});
aw(window,'resize',()=>{sizeH();sizeV();upd()});
new IntersectionObserver(en=>{vis1=en[0].isIntersecting},{threshold:0}).observe(s1);
const Z=[-80,-34,0,64],BZ=[-460,-220,0,300],PD=1500;let boot=reduce?0:1,t0b=performance.now(),tX=0,tY=0,gX=0,gY=0,flatDone=false;
aw(window,'pointermove',e=>{gX=-(e.clientY/innerHeight-.5)*13;gY=(e.clientX/innerWidth-.5)*18;specEl.style.setProperty('--sx',(e.clientX/innerWidth*100)+'%');specEl.style.setProperty('--sy',(e.clientY/innerHeight*100)+'%')},{passive:true});
function depth(now){const flat=clamp(p0/.05);if(!reduce)boot=Math.max(0,1-(now-t0b)/2200);const eb=Math.pow(boot,2.2);
 if(flat>=1){if(!flatDone){layers.forEach(l=>{l.style.transform='none';l.style.opacity=1});tiltEl.style.transform='none';flatDone=true}return}flatDone=false;
 tX+=(gX-tX)*.06;tY+=(gY-tY)*.06;
 layers.forEach((l,i)=>{const z=(Z[i]+BZ[i]*eb)*(1-flat),c=(PD-z)/PD;l.style.transform=`translateZ(${z.toFixed(1)}px) scale(${c.toFixed(4)})`;l.style.opacity=i===2?1:(1-eb*.75)});
 tiltEl.style.transform=`rotateX(${((eb*52+tX)*(1-flat)).toFixed(2)}deg) rotateY(${((tY-eb*14)*(1-flat)).toFixed(2)}deg)`;
 specEl.style.opacity=(1-flat)*(1-eb)}
function loop(now){if(!alive)return;depth(now);drawH();drawV(now/1000);requestAnimationFrame(loop)}
render();sizeH();sizeV();upd();
if(!reduce)requestAnimationFrame(loop);else{vis0=true;vis1=true;drawH();depth(0);drawV(3)}


/* ---------- escenas 02–05 ---------- */
(function(){
const U={es:{sclab:'Código → realidad',sch:'Cada línea, <em>una escena.</em>',s2lab:'Obra seleccionada',s2h:'Ideas que <em>ya existen.</em>',s3lab:'Cómo trabajo',s3h:'Del boceto al <em>lanzamiento.</em>',s4lab:'Trayectoria',s4meta:'Desde 2010',s4h:'Dieciséis años <em>construyendo.</em>',yrs:'Años de trayectoria creativa y técnica',s5lab:'Contacto',s5h:'Hablemos de tu proyecto.',s5p:'Cuéntame qué quieres lograr y te respondo con una propuesta clara. Escríbeme por WhatsApp o correo.',need:'¿Qué necesitas?',when:'¿Para cuándo?',ready:'Tu mensaje, listo',copy:'Copiar',copied:'Copiado',foot:'Diseño · Código · Motion · IA',
 cards:[['Mundo Colmena','Landing y juego educativo interactivo, con React y animación.',['Web','Juego']],['Colmena Route Game','Experiencia de carrera en 3D pensada como punto de encuentro.',['3D','Juego']],['UKCOL Vida Silvestre','Juego para pantallas touch que enseña de forma amigable.',['Touch','Educativo']],['GoGo Racing','Experiencia interactiva para concesionarios: nostalgia y tecnología.',['Interactivo','Retail']],['Host virtual con IA','Avatar generado con inteligencia artificial en una experiencia audiovisual interactiva.',['IA','Audiovisual']],['Stand BOOST™','Mentor Breast Canada · Ontario. Backwall 3D, videos de pantallas laterales y counter, diseñados desde cero.',['Cliente internacional','Diseño']]],bigs:['','','','','','+1.000 personas'],
 steps:[['Entender','Escucho la idea, el objetivo y a quién va dirigida.'],['Diseñar','Estructura, interfaz y movimiento antes de escribir código.'],['Construir','Desarrollo en React, 3D e IA, con diseño y código en un solo flujo.'],['Lanzar','Publicación, pruebas en dispositivos reales y ajustes finales.']],
 stages:[['2010','Moya Producciones','Diseñador gráfico'],['2012','Singularcom','Diseñador gráfico'],['2016','Imperia Software Solutions','CEO'],['2022','Freelance','Diseñador y desarrollador front-end'],['2024','Mentor Canada','Diseñador']],
 needs:['un sitio web o app','una demo o juego interactivo','diseño UI/UX','video o motion','alguien que lidere el equipo','integrar IA a mi producto'],needL:['Sitio web / app','Demo o juego','Diseño UI/UX','Video / Motion','Liderar equipo','Con IA'],whens:['lo antes posible','en las próximas semanas','aún lo estoy explorando'],whenL:['Urgente','Próximas semanas','Explorando'],
 msg:(n,w)=>'Hola Sebastián, vi tu portafolio. Necesito '+(n.length?n.join(', ').replace(/, ([^,]*)$/,' y $1'):'un proyecto')+(w?', '+w:'')+'.\n\nTe cuento más: '},
 en:{sclab:'Code → reality',sch:'Every line, <em>a scene.</em>',s2lab:'Selected work',s2h:'Ideas that <em>already exist.</em>',s3lab:'How I work',s3h:'From sketch to <em>launch.</em>',s4lab:'Career',s4meta:'Since 2010',s4h:'Sixteen years <em>building.</em>',yrs:'Years of creative and technical career',s5lab:'Contact',s5h:"Let's talk about your project.",s5p:"Tell me what you want to achieve and I'll reply with a clear proposal. Reach me on WhatsApp or email.",need:'What do you need?',when:'When?',ready:'Your message, ready',copy:'Copy',copied:'Copied',foot:'Design · Code · Motion · AI',
 cards:[['Mundo Colmena','Landing and interactive educational game, built with React and animation.',['Web','Game']],['Colmena Route Game','A 3D racing experience designed as a meeting point.',['3D','Game']],['UKCOL Wildlife','A game for touch screens that teaches in a friendly way.',['Touch','Educational']],['GoGo Racing','Interactive experience for dealerships: nostalgia meets technology.',['Interactive','Retail']],['AI Virtual Host','An AI-generated avatar in an interactive audiovisual experience.',['AI','Audiovisual']],['BOOST™ Stand','Mentor Breast Canada · Ontario. 3D backwall, side-screen videos and counter, designed from scratch.',['International client','Design']]],bigs:['','','','','','+1,000 people'],
 steps:[['Understand','I listen to the idea, the goal and who it is for.'],['Design','Structure, interface and motion before writing code.'],['Build','Development in React, 3D and AI, with design and code in one flow.'],['Launch','Release, testing on real devices and final tuning.']],
 stages:[['2010','Moya Producciones','Graphic designer'],['2012','Singularcom','Graphic designer'],['2016','Imperia Software Solutions','CEO'],['2022','Freelance','Front-end designer & developer'],['2024','Mentor Canada','Designer']],
 needs:['a website or app','an interactive demo or game','UI/UX design','video or motion','someone to lead the team','AI built into my product'],needL:['Website / app','Demo or game','UI/UX design','Video / Motion','Lead a team','With AI'],whens:['as soon as possible','in the coming weeks','still exploring'],whenL:['Urgent','Coming weeks','Exploring'],
 msg:(n,w)=>'Hi Sebastián, I saw your portfolio. I need '+(n.length?n.join(', ').replace(/, ([^,]*)$/,' and $1'):'a project')+(w?', '+w:'')+'.\n\nMore details: '}};
const A=['<g fill="none" stroke="#00D4C8" stroke-width="1.4" vector-effect="non-scaling-stroke">'+[...Array(20)].map((_,i)=>{const c=i%5,r=(i/5)|0,x=60+c*70+(r%2)*35,y=60+r*58;return `<path d="M${x} ${y-32}l28 16v32l-28 16l-28-16v-32z" fill="${(i*7)%5===0?'rgba(0,212,200,.35)':'none'}" stroke-opacity="${.3+(i%4)*.18}"/>`}).join('')+'</g>',
 '<g fill="none" stroke="#00D4C8" vector-effect="non-scaling-stroke" stroke-width="1.4"><path d="M200 70L20 300M200 70L120 300M200 70L280 300M200 70L380 300" stroke-opacity=".5"/>'+[88,110,142,190,260].map(y=>`<path d="M${200-(y-70)*.72} ${y}H${200+(y-70)*.72}" stroke-opacity=".25"/>`).join('')+'<path d="M200 90V300" stroke-dasharray="10 12" stroke-width="2"/></g><rect x="178" y="214" width="44" height="64" rx="8" fill="rgba(0,212,200,.3)" stroke="#00D4C8"/>',
 '<g fill="none" stroke="#00D4C8" vector-effect="non-scaling-stroke">'+[30,60,92,126,162].map((r,i)=>`<circle cx="200" cy="150" r="${r}" stroke-opacity="${.7-i*.12}"/>`).join('')+'</g><g fill="#00D4C8"><ellipse cx="200" cy="165" rx="20" ry="16"/><circle cx="168" cy="136" r="8"/><circle cx="188" cy="118" r="8"/><circle cx="212" cy="118" r="8"/><circle cx="232" cy="136" r="8"/></g>',
 '<g fill="none" stroke="#00D4C8" vector-effect="non-scaling-stroke" stroke-width="2"><path d="M70 230A140 140 0 0 1 330 230" stroke-opacity=".5"/>'+[...Array(13)].map((_,i)=>{const a=Math.PI+(i/12)*Math.PI,x1=200+Math.cos(a)*128,y1=230+Math.sin(a)*128,x2=200+Math.cos(a)*142,y2=230+Math.sin(a)*142;return `<path d="M${x1.toFixed(1)} ${y1.toFixed(1)}L${x2.toFixed(1)} ${y2.toFixed(1)}" stroke-opacity=".8"/>`}).join('')+'<path d="M200 230L282 150" stroke-width="3"/></g><circle cx="200" cy="230" r="9" fill="#00D4C8"/><g fill="rgba(0,212,200,.5)">'+[...Array(14)].map((_,i)=>`<rect x="${40+i*24}" y="266" width="12" height="12" opacity="${i%2?.2:.7}"/>`).join('')+'</g>',
 '<g fill="none" stroke="#00D4C8" vector-effect="non-scaling-stroke" stroke-width="1.6"><circle cx="200" cy="112" r="46"/><path d="M110 250C110 190 290 190 290 250"/></g><g fill="#00D4C8">'+[...Array(31)].map((_,i)=>`<rect x="${52+i*10}" y="${268-(8+Math.abs(Math.sin(i*.7))*22)}" width="5" height="${8+Math.abs(Math.sin(i*.7))*22}" opacity=".7"/>`).join('')+'</g><circle cx="186" cy="108" r="4" fill="#00D4C8"/><circle cx="214" cy="108" r="4" fill="#00D4C8"/>',
 '<g fill="rgba(0,212,200,.12)" stroke="#00D4C8" vector-effect="non-scaling-stroke" stroke-width="1.6"><path d="M90 60L310 40V190L90 200z"/><path d="M90 60L40 80V222L90 200z"/><path d="M310 40L360 62V210L310 190z"/><path d="M110 224H290V252H110z"/></g><g stroke="#00D4C8" stroke-opacity=".6" vector-effect="non-scaling-stroke">'+[...Array(5)].map((_,i)=>`<path d="M${90+i*44} ${58-i*4}V${198-i*2}"/>`).join('')+'</g><path d="M130 100h140M130 124h110M130 148h130" stroke="#00D4C8" stroke-width="3" opacity=".6"/>'];
let lang=document.documentElement.lang==='en'?'en':'es',sel=new Set(),when=null;
const $$=s=>root.querySelector(s);
function r2(){const u=U[lang];lang=document.documentElement.lang==='en'?'en':'es';const t=U[lang];
 root.querySelectorAll('[data-u]').forEach(e=>{const v=t[e.dataset.u];if(v!=null)e.innerHTML=v});
 obra.render();
 $$('#pt').innerHTML=t.steps.map((s,i)=>`<div><span class="lab"><b>0${i+1}</b></span><h4 class="disp">${s[0]}</h4><p>${s[1]}</p></div>`).join('');
 $$('#pl').querySelectorAll('.nd').forEach(n=>n.remove());t.steps.forEach((_,i)=>{const n=document.createElement('div');n.className='nd';n.style.left=(12.5+i*25)+'%';n.textContent='0'+(i+1);$$('#pl').appendChild(n)});
 $$('#st').innerHTML=t.stages.map(s=>`<li data-y="${s[0]}"><b><em>${s[0]}</em>${s[1]}</b><span>${s[2]}</span></li>`).join('');
 $$('#gn').innerHTML=t.needs.map((n,i)=>`<button class="ch" aria-pressed="${sel.has(i)}" data-i="${i}">${t.needL[i]}</button>`).join('');
 $$('#gw').innerHTML=t.whens.map((n,i)=>`<button class="ch" aria-pressed="${when===i}" data-i="${i}">${t.whenL[i]}</button>`).join('');
 msg();up()}
function msg(){const t=U[lang],m=t.msg([...sel].sort().map(i=>t.needs[i]),when!=null?t.whens[when]:null);$$('#msg').textContent=m;
 $$('#wa').href='https://wa.me/573133510006?text='+encodeURIComponent(m.trim());$$('#ml').href='mailto:sebascarreramoya@gmail.com?subject='+encodeURIComponent(lang==='es'?'Proyecto desde tu portafolio':'Project from your portfolio')+'&body='+encodeURIComponent(m)}
$$('#gn').addEventListener('click',e=>{const b=e.target.closest('.ch');if(!b)return;const i=+b.dataset.i;sel.has(i)?sel.delete(i):sel.add(i);b.setAttribute('aria-pressed',sel.has(i));msg()});
$$('#gw').addEventListener('click',e=>{const b=e.target.closest('.ch');if(!b)return;const i=+b.dataset.i;when=when===i?null:i;[...$$('#gw').children].forEach((c,k)=>c.setAttribute('aria-pressed',when===k));msg()});
aw(document,'click',e=>{const b=e.target.closest('[data-cp]');if(!b)return;const t=U[lang];const done=()=>{b.textContent=t.copied;setTimeout(()=>b.textContent=t.copy,1400)};try{navigator.clipboard.writeText(b.dataset.cp).then(done,()=>{})}catch(_){}});
root.querySelectorAll('.lang button').forEach(b=>b.addEventListener('click',()=>setTimeout(r2,0)));
const pr=el=>{const r=el.getBoundingClientRect();return clamp(-r.top/(r.height-innerHeight))};
function up(){if(reduce||mob())return;const vh=innerHeight,vw=innerWidth;
 obra.update(pr($$('#s2')));
 const p3=pr($$('#s3')),q=clamp(p3/.85);$$('#ppath').style.strokeDashoffset=1-q;const k=Math.min(4,Math.floor(q*4+.02));root.querySelectorAll('#pl .nd').forEach((n,i)=>n.classList.toggle('on',q>=(i*.25+.02)||(i===0)&&q>0));root.querySelectorAll('#pt div').forEach((d,i)=>d.classList.toggle('on',q>=i*.25-.01));$$('#c3').textContent='0'+Math.max(1,Math.min(4,Math.ceil(q*4)||1))+' / 04';
 const p4=pr($$('#s4')),y=Math.round(lerp(2010,new Date().getFullYear(),clamp(p4/.85)));$$('#yr').firstChild.nodeValue=y;root.querySelectorAll('#st li').forEach(l=>l.classList.toggle('on',y>=+l.dataset.y))}
aw(window,'scroll',()=>requestAnimationFrame(up),{passive:true});aw(window,'resize',up);
r2();
})();


(function(){
const $=s=>root.querySelector(s),clamp=(x,a=0,b=1)=>Math.min(b,Math.max(a,x)),reduceM=matchMedia('(prefers-reduced-motion: reduce)').matches,mobM=()=>innerWidth<=760;
const L={es:{c0:'// 01 · IDEA — una página que presente mi trabajo y convierta visitas en clientes',h:['De la idea','a la realidad digital.'],pp:'Diseño, código y motion.',btn:'Hablemos',c1:'/* 02 · ESTILO — del HTML plano al diseño */',c2:'/* 03 · REALIDAD — publicar en vivo */',ok:'listo en vivo'},
 en:{c0:'// 01 · IDEA — a page that showcases my work and turns visitors into clients',h:['Ideas into','digital reality.'],pp:'Design, code and motion.',btn:"Let's talk",c1:'/* 02 · STYLE — from plain HTML to design */',c2:'/* 03 · REALITY — go live */',ok:'live now'}};
function lines(l){const T=L[l];return [[T.c0,'idea'],['',''],['export default function Home() {',''],['  return (',''],['    <main className="hero">',''],['      <nav>',''],['        <Logo />',''],['        <a href="#contacto">'+T.btn+'</a>','nav'],['      </nav>',''],['      <h1>'+T.h[0]+'<br/>'+T.h[1]+'</h1>','h1'],['      <p>'+T.pp+'</p>','p'],['      <Proyectos items={obra} />','cards'],['      <button>'+T.btn+'</button>','btn'],['    </main>',''],['  )',''],['}',''],['',''],[T.c1,'file'],['.hero { background: #08090B; color: #F2F2EE; }','style'],['h1 { font: 900 8vw Archivo; color: #00D4C8; }','type'],['.card:hover { transform: translateY(-6px); }','hover'],['button { background: #00D4C8; border-radius: 999px; }','btnst'],['',''],[T.c2,''],['$ npm run build && deploy','live']]}
const RX=/(\/\/.*|\/\*.*\*\/)|("[^"]*")|(&lt;\/?[A-Za-z]+|\/?&gt;)|\b(import|export|default|function|return|from|const)\b|(#[0-9A-Fa-f]{3,6}|\d+(?:vw|px)?)/g;
const hl=s=>s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(RX,(m,c,st,tg,kw,nm)=>c?`<span class="c">${m}</span>`:st?`<span class="s">${m}</span>`:tg?`<span class="t">${m}</span>`:kw?`<span class="k">${m}</span>`:`<span class="n">${m}</span>`);
let cur=-1,lastLang='';
function setTexts(){const l=document.documentElement.lang==='en'?'en':'es',T=L[l];$('#p1').innerHTML=T.h[0]+'<br>'+T.h[1];$('#pp').textContent=T.pp;$('#pb').textContent=T.btn;$('#pa').textContent=T.btn;lastLang=l;cur=-1}
function paint(p){const l=document.documentElement.lang==='en'?'en':'es';if(l!==lastLang)setTexts();const LN=lines(l),full=LN.map(x=>x[0]).join('\n'),total=full.length,n=Math.round(p*total);
 if(n===cur)return;cur=n;let acc=0,out='',keys=[],caretLine=0,cc=0,file='Home.jsx',phase=0;
 LN.forEach((ln,i)=>{const len=ln[0].length,start=acc,end=acc+len;acc=end+1;
  if(n<start&&i>0)return;const shown=ln[0].slice(0,Math.max(0,Math.min(len,n-start)));const dn=n>=end;if(dn&&ln[1])keys.push(ln[1]);if(n>=start){caretLine=i;cc=shown.length}
  out+=`<span class="ln">${String(i+1).padStart(2,' ')}</span>${hl(shown)}${(n>=start&&n<=end)?'<span class="cnr"></span>':''}\n`;if(ln[1]==='file'&&n>=start)file='styles.css'});
 const code=$('#code');code.innerHTML=out;const lh=parseFloat(getComputedStyle(code).lineHeight)||20;code.scrollTop=Math.max(0,(caretLine+1)*lh-code.clientHeight+lh*2);
 const has=k=>keys.includes(k),pv=$('#pv');['nav','h1','p','cards','btn','style','type','hover','btnst','live'].forEach(k=>pv.classList.toggle('k-'+k,has(k)));
 const live=has('live');$('#cw').classList.toggle('live',live);$('#tbf').textContent=file;phase=live?2:(n>total*.08?1:0);
 root.querySelectorAll('#ph i').forEach((e,i)=>e.classList.toggle('on',i===phase));
 $('#cpl').textContent=['01 · '+(l==='es'?'IDEA':'IDEA'),'02 · '+(l==='es'?'CÓDIGO':'CODE'),'03 · '+(l==='es'?'REALIDAD':'REALITY')][phase];
 $('#st1').textContent=`Ln ${caretLine+1}, Col ${cc+1} · JSX`;$('#st2').innerHTML=live?`<b>✓</b> build 1.2s · ${L[l].ok}`:Math.round(p*100)+'%'}
function up(){const s=$('#sc');if(reduceM){paint(1);return}const r=s.getBoundingClientRect();paint(clamp(-r.top/(r.height-innerHeight)/.82))}
aw(window,'scroll',()=>requestAnimationFrame(up),{passive:true});aw(window,'resize',up);
root.querySelectorAll('.lang button').forEach(b=>b.addEventListener('click',()=>setTimeout(()=>{setTexts();up()},0)));
setTexts();up();
})();

return ()=>{alive=false;_off.forEach(f=>f());root.classList.remove('calm')};
}
