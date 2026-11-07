// Marcado estático de la portada cinematográfica (contenido propio, sin entrada de usuario).
export default `<nav>
 <a class="brand" href="#top" aria-label="Sebastián Carrera Moya"><i>JSCM</i><span class="lab" style="color:var(--fg)">Sebastián Carrera Moya</span></a>
 <div class="nr"><a class="l" href="#s1" data-t="nav1"></a><div class="lang" role="group" aria-label="Idioma"><button data-l="es" aria-pressed="true">ES</button><button data-l="en" aria-pressed="false">EN</button></div><a class="cta" href="#fin" data-t="cta"></a></div>
</nav>

<main id="top">
<section class="s0" id="s0" aria-label="Opening">
 <div class="stage">
  <div class="grid"></div><canvas id="hc"></canvas><div class="glow" id="glow"></div>
  <div class="chipp" aria-hidden="true"><div class="chipw" id="chip"><div class="tilt" id="tilt"><svg class="ly" id="L0" viewBox="-100 -100 400 400"></svg><svg class="ly" id="L1" viewBox="-100 -100 400 400"></svg><svg class="ly" id="L2" viewBox="-100 -100 400 400"></svg><svg class="ly" id="L3" viewBox="-100 -100 400 400"></svg></div><div class="spec" id="spec"></div></div></div>
  <div class="hero-top" id="htop"><span class="lab"><b>00</b> — <span data-t="s0lab"></span></span><span class="lab" data-t="meta"></span></div>
  <h1 class="hero-h disp" id="hh"><span id="l1" data-t="h1"></span><span id="l2" data-t="h2"></span><span id="l3" class="o" data-t="h3"></span></h1>
  <div class="hero-sub" id="hsub"><p data-t="sub"></p><div class="scr"><span class="lab" data-t="scroll"></span><i></i></div></div>
 </div>
</section>

<section class="s1" id="s1" aria-label="What I create">
 <div class="stage">
  <div class="grid"></div>
  <div class="top"><span class="lab"><b>01</b> — <span data-t="s1lab"></span></span><span class="lab" id="cnt"></span></div>
  <div class="idx" id="idx"><i></i><i></i><i></i><i></i></div>
  <div class="wrap">
   <div id="blocks"></div>
   <div class="fig"><canvas id="vc"></canvas><div class="cap"><span class="lab" id="fl1"></span><span class="lab" id="fl2"></span></div></div>
  </div>
 </div>
</section>

<section class="sx" id="sc" aria-label="Code to reality"><div class="stage"><div class="grid"></div>
 <div class="top"><span class="lab"><b>02</b> — <span data-u="sclab"></span></span><span class="lab" id="cpl"></span></div>
 <h2 class="sh disp" data-u="sch"></h2>
 <div class="cw" id="cw"><div class="ed"><div class="edh"><span class="tb" id="tbf">Home.jsx</span><div class="ph" id="ph"><i>IDEA</i><i>CODE</i><i>LIVE</i></div></div><pre id="code" aria-label="Code being typed"></pre><div class="term"><span id="st1"></span><span id="st2"></span></div></div>
 <div class="pvw"><div class="pv" id="pv" aria-hidden="true"><div class="pvb"><i></i><i></i><i></i><span>tuproyecto.com</span></div><div class="pbd"><div class="pn"><span class="lg"></span><a id="pa">Hablemos</a></div><h3 class="p1" id="p1"></h3><p class="pp" id="pp"></p><div class="pc"><div></div><div></div><div></div></div><span class="pb" id="pb">Hablemos</span><i class="cur"></i><span class="lv">● EN VIVO</span></div></div></div></div>
</div></section>
<section class="sx" id="s2" aria-label="Selected work"><div class="stage"><div class="grid"></div>
 <div class="top"><span class="lab"><b>03</b> — <span data-u="s2lab"></span></span><span class="lab" id="c2"></span></div>
 <h2 class="sh disp" data-u="s2h"></h2>
 <div class="trk" id="trk"></div><div class="bar"><i id="bar"></i></div></div></section>
<section class="sx" id="s3" aria-label="Process"><div class="stage"><div class="grid"></div>
 <div class="top"><span class="lab"><b>04</b> — <span data-u="s3lab"></span></span><span class="lab" id="c3"></span></div>
 <h2 class="sh disp" data-u="s3h"></h2>
 <div class="pr"><div class="pl" id="pl"><svg viewBox="0 0 1000 90" preserveAspectRatio="none" aria-hidden="true"><path d="M0 45H1000" stroke="rgba(255,255,255,.14)" stroke-width="1.5" vector-effect="non-scaling-stroke" fill="none"/><path id="ppath" d="M0 45H1000" stroke="#00D4C8" stroke-width="2.5" vector-effect="non-scaling-stroke" fill="none" pathLength="1" stroke-dasharray="1" stroke-dashoffset="1"/></svg></div><div class="pt" id="pt"></div></div></div></section>
<section class="sx" id="s4" aria-label="Career"><div class="stage"><div class="grid"></div><canvas class="rtc" aria-hidden="true"></canvas>
 <div class="top"><span class="lab"><b>05</b> — <span data-u="s4lab"></span></span><span class="lab" data-u="s4meta"></span></div>
 <h2 class="sh disp" data-u="s4h" style="font-size:clamp(28px,min(4.6vw,7svh),80px)"></h2>
 <div class="tl"><div class="yr disp" id="yr">2010<small data-u="yrs"></small></div><ol class="st" id="st"></ol></div></div></section>
<section class="end" id="fin">
 <span class="lab"><b>06</b> — <span data-u="s5lab"></span></span>
 <h2 class="disp" data-u="s5h"></h2>
 <p data-u="s5p"></p>
 <div class="cnb"><div class="cnp"><span class="lab" data-u="need"></span><div class="chs" id="gn"></div><span class="lab" data-u="when"></span><div class="chs" id="gw"></div></div>
 <div class="cnp"><span class="lab"><b data-u="ready"></b></span><div class="msg" id="msg"></div><div class="bt"><a class="pri" id="wa" href="https://wa.me/573133510006" target="_blank" rel="noopener">WhatsApp</a><a id="ml" href="mailto:sebascarreramoya@gmail.com">Email</a></div>
 <div class="cp"><span>+57 313 351 0006 <button data-cp="+573133510006" data-u="copy"></button></span><span>sebascarreramoya@gmail.com <button data-cp="sebascarreramoya@gmail.com" data-u="copy"></button></span></div></div></div>
 <div class="ft"><span class="lab">© 2026 Sebastián Carrera Moya</span><span class="lab" data-u="foot"></span></div>
</section>

</main>

`;
