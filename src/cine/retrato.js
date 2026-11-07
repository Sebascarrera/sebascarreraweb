/* Retrato de código (sección 05): la lluvia de caracteres arma el rostro con el scroll. */
/* eslint-disable */
import { PORTRAIT_DATA } from './portraitData.js';
export function createRetrato(root,{aw}){
const cv=root.querySelector('.rtc'),sec=root.querySelector('#s4');
if(!cv||!sec)return{stop(){}};
const cx=cv.getContext('2d'),reduce=matchMedia('(prefers-reduced-motion: reduce)').matches,mob=()=>innerWidth<=760;
const clamp=(x,a=0,b=1)=>Math.min(b,Math.max(a,x));
const rnd=i=>{const x=Math.sin(i*127.1+311.7)*43758.5453;return x-Math.floor(x)};
let COLS=0,ROWS=0,LUM,MSK,EDG,DLY,CH,W=0,H=0,dpr=1,P=0,loaded=false,alive=true,vis=false;
const img=new Image();
img.onload=()=>{COLS=img.width;ROWS=img.height;const c=document.createElement('canvas');c.width=COLS;c.height=ROWS;const g=c.getContext('2d');g.drawImage(img,0,0);const d=g.getImageData(0,0,COLS,ROWS).data,n=COLS*ROWS;
 LUM=new Float32Array(n);MSK=new Float32Array(n);EDG=new Float32Array(n);DLY=new Float32Array(COLS);CH=new Uint8Array(n);
 for(let i=0;i<n;i++){LUM[i]=d[i*4]/255;MSK[i]=d[i*4+1]/255;EDG[i]=d[i*4+2]/255;CH[i]=(rnd(i)*255)|0}
 for(let x=0;x<COLS;x++)DLY[x]=rnd(x+900)*.38;
 loaded=true;size();update();draw(0)};
img.src=PORTRAIT_DATA;
const RAMP=['.',':',';','·','+','=','/','<','>','*','{','}','#','0','1','&','%','@'];
function size(){dpr=Math.min(devicePixelRatio||1,2);const r=cv.getBoundingClientRect();W=r.width;H=r.height;cv.width=Math.max(1,W*dpr);cv.height=Math.max(1,H*dpr)}
function layout(){let ph,x0,y0;
 if(mob()){const pw=W*1.0;ph=pw/(COLS*.5)*ROWS;x0=(W-pw)/2;y0=H*.14}
 else{ph=H*.97;const pw=ph/ROWS*.5*COLS;x0=Math.max(8,W*.30-pw/2);y0=(H-ph)/2+H*.015}
 const ch=ph/ROWS;return{x0,y0,cw:ch*.5,ch}}
function update(){const r=sec.getBoundingClientRect(),vh=innerHeight;vis=r.bottom>0&&r.top<vh;
 if(reduce)P=1; else if(mob())P=clamp((vh*.95-r.top)/(vh*.95+r.height*.4)); else P=clamp(-r.top/(r.height-vh));
 if(reduce)P=1}
function draw(t){if(!loaded||!W)return;cx.setTransform(dpr,0,0,dpr,0,0);cx.clearRect(0,0,W,H);
 const L=layout(),fs=Math.max(6,L.cw/.55);cx.font='700 '+fs.toFixed(1)+'px ui-monospace,SFMono-Regular,Menlo,Consolas,monospace';cx.textAlign='center';cx.textBaseline='middle';
 const prog=reduce?1:clamp(P/.82),head=prog*1.45,settle=clamp((prog-.78)/.22),flick=Math.floor(t/140);
 for(let x=0;x<COLS;x++){const hr=(head-DLY[x])*1.25*ROWS,px=L.x0+(x+.5)*L.cw;
  for(let y=0;y<ROWS;y++){const d=hr-y;if(d<0)continue;const i=y*COLS+x,m=MSK[i],py=L.y0+(y+.5)*L.ch;
   if(m>.06){const rv=clamp(d/7),base=.03+.97*Math.pow(LUM[i],2.1),I=clamp((base+EDG[i]*.5)*m)*rv;
    const k=Math.min(RAMP.length-1,Math.floor(clamp(LUM[i]*.92+EDG[i]*.35)*RAMP.length));
    const ci=reduce?k:Math.min(RAMP.length-1,Math.max(0,k+(((CH[i]+flick*(rnd(i+flick)>.93?1:0))%3)-1)));
    if(d<1.2)cx.fillStyle='rgba(220,255,252,'+clamp(.95*m)+')';
    else if(LUM[i]>.55)cx.fillStyle='rgba(150,248,240,'+(I*.98).toFixed(3)+')';
    else cx.fillStyle='rgba(0,212,200,'+(I*.9).toFixed(3)+')';
    cx.fillText(RAMP[ci],px,py)}
   if(d<16&&settle<1){let ta=1-d/16;ta=ta*ta*.5*(1-settle)*(m>.06?.5:1);if(ta>.02){cx.fillStyle='rgba(0,212,200,'+ta.toFixed(3)+')';const q=(CH[i]+flick)%RAMP.length;cx.fillText(RAMP[q>9?9+(q%9):(CH[i]%10)],px,py)}}
  }}
 if(settle>0&&!reduce){const sy=L.y0+((t/2600)%1)*ROWS*L.ch,gr=cx.createLinearGradient(0,sy-30,0,sy+30);gr.addColorStop(0,'rgba(0,212,200,0)');gr.addColorStop(.5,'rgba(0,212,200,'+(.12*settle)+')');gr.addColorStop(1,'rgba(0,212,200,0)');cx.fillStyle=gr;cx.fillRect(L.x0,sy-30,COLS*L.cw,60)}}
let tk=false;aw(window,'scroll',()=>{if(!tk){tk=true;requestAnimationFrame(()=>{tk=false;update()})}},{passive:true});
aw(window,'resize',()=>{size();update();if(reduce)draw(0)});
function loop(t){if(!alive)return;if(vis&&!reduce)draw(t);requestAnimationFrame(loop)}
requestAnimationFrame(loop);
return{stop(){alive=false}};
}
