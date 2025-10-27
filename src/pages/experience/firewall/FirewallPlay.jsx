import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/experience-base.css";
import "../styles/FirewallPlayRadial.css";

import bg from "../../../assets/img/bg-firewall-play-game.png";
import a1 from "../../../assets/img/amenaza1.png";
import a2 from "../../../assets/img/amenaza2.png";
import a3 from "../../../assets/img/amenaza3.png";
import a4 from "../../../assets/img/amenaza4.png";
import a5 from "../../../assets/img/amenaza5.png";
import a6 from "../../../assets/img/amenaza6.png";
import serverImg from "../../../assets/img/servidor.png";
import shieldImg from "../../../assets/img/cipo-escudo.png";

// 🔥 SIN REDUX: quitamos import { startGame, markScore, endGame, saveScore } ...

const SPRITES = [a1, a2, a3, a4, a5, a6];

const GAME_SECONDS = 60;
const MAX_LIVES = 3;
const POINTS_PER_BLOCK = 10;
const SERVER_RADIUS = 60;
const MAX_ON_STAGE = 70;

const DIFF = {
  minSpeed: 110,
  maxSpeed: 360,
  speedPow: 1.25,
  startSpawnMs: 950,
  endSpawnMs: 260,
  spawnPow: 1.15,
  extraSpawn1: 0.33,
  extraSpawn2: 0.66,
  shieldStart: 64,
  shieldEnd: 44,
};

const WAVES = {
  periodSec: 9,
  durationSec: 3,
  burstMin: 5,
  burstMax: 11,
  bonusPerTick: 2,
};

const rand = (min, max) => Math.random() * (max - min) + min;

const spawnThreat = (stage, pivot, speed, idRef) => {
  const { w, h } = stage;
  const margin = 24;

  const side = Math.floor(Math.random() * 4);
  let x;
  let y;
  if (side === 0) {
    x = rand(margin, w - margin);
    y = -margin;
  } else if (side === 1) {
    x = w + margin;
    y = rand(margin, h - margin);
  } else if (side === 2) {
    x = rand(margin, w - margin);
    y = h + margin;
  } else {
    x = -margin;
    y = rand(margin, h - margin);
  }

  const dx = pivot.x - x;
  const dy = pivot.y - y;
  const magnitude = Math.hypot(dx, dy) || 1;
  const vx = dx / magnitude;
  const vy = dy / magnitude;

  const threatSpeed = speed * (0.9 + Math.random() * 0.35);
  const sprite = SPRITES[Math.floor(Math.random() * SPRITES.length)];

  const id = idRef.current++;
  return { id, x, y, vx, vy, speed: threatSpeed, sprite };
};

export default function FirewallPlay() {
  const navigate = useNavigate();

  // === Estado local (reemplaza Redux) ===
  const [timeLeft, setTimeLeft] = useState(GAME_SECONDS);
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(MAX_LIVES);
  const [ended, setEnded] = useState(false);

  const [muted, setMuted] = useState(false);
  const [audioArmed, setAudioArmed] = useState(false);
  const sfx = useRef({
    place: null,
    block: null,
    hit: null,
    win: null,
    lose: null,
    tick: null,
  });

  const stageRef = useRef(null);
  const [stageSize, setStageSize] = useState({ w: 900, h: 520 });
  const center = useMemo(
    () => ({ x: stageSize.w / 2, y: stageSize.h / 2 }),
    [stageSize]
  );

  const [threats, setThreats] = useState([]);
  const nextId = useRef(1);

  const [shieldPos, setShieldPos] = useState(center);
  const [targetPos, setTargetPos] = useState(center);
  const shieldPosRef = useRef(shieldPos);
  const targetPosRef = useRef(targetPos);

  // centra escudo/target al cambiar tamaño
  useEffect(() => {
    setShieldPos(center);
    setTargetPos(center);
    shieldPosRef.current = center;
    targetPosRef.current = center;
  }, [center]);

  // cargar SFX
  useEffect(() => {
    const loadSfx = (name, vol = 0.6) => {
      const audio = new Audio(`/sfx/${name}.wav`);
      audio.preload = "auto";
      audio.volume = vol;
      audio.addEventListener("error", () => {
        audio.src = `/sfx/${name}.mp3`;
        audio.load();
      });
      return audio;
    };
    sfx.current.place = loadSfx("place", 0.5);
    sfx.current.block = loadSfx("block", 0.6);
    sfx.current.hit = loadSfx("hit", 0.65);
    sfx.current.win = loadSfx("win", 0.7);
    sfx.current.lose = loadSfx("lose", 0.7);
    sfx.current.tick = loadSfx("tick", 0.45);
  }, []);

  const playSfx = useCallback(
    (name) => {
      if (muted) return;
      const audio = sfx.current[name];
      if (!audio) return;
      try {
        audio.currentTime = 0;
        audio.play();
      } catch (error) {
        console.warn("SFX playback error", error);
      }
    },
    [muted]
  );

  const progress = useMemo(
    () => Math.min(1, Math.max(0, (GAME_SECONDS - timeLeft) / GAME_SECONDS)),
    [timeLeft]
  );
  const baseSpeed = useMemo(
    () =>
      DIFF.minSpeed +
      (DIFF.maxSpeed - DIFF.minSpeed) * Math.pow(progress, DIFF.speedPow),
    [progress]
  );
  const spawnMs = useMemo(() => {
    const value =
      DIFF.startSpawnMs -
      (DIFF.startSpawnMs - DIFF.endSpawnMs) * Math.pow(progress, DIFF.spawnPow);
    return Math.max(DIFF.endSpawnMs, Math.round(value));
  }, [progress]);
  const shieldRadius = useMemo(
    () => DIFF.shieldStart - (DIFF.shieldStart - DIFF.shieldEnd) * progress,
    [progress]
  );

  const elapsed = useMemo(() => GAME_SECONDS - timeLeft, [timeLeft]);
  const waveActive = useMemo(() => {
    if (elapsed <= 0) return false;
    const mod = elapsed % WAVES.periodSec;
    return mod < WAVES.durationSec;
  }, [elapsed]);
  const prevWaveRef = useRef(false);

  // burst en oleadas
  useEffect(() => {
    if (!waveActive || prevWaveRef.current) {
      prevWaveRef.current = waveActive;
      return;
    }
    const burstCount = Math.round(
      WAVES.burstMin + (WAVES.burstMax - WAVES.burstMin) * progress
    );
    setThreats((prev) => {
      const batch = Array.from({ length: burstCount }, () =>
        spawnThreat(stageSize, center, baseSpeed, nextId)
      );
      const next = [...prev, ...batch];
      return MAX_ON_STAGE ? next.slice(-MAX_ON_STAGE) : next;
    });
    playSfx("place");
    prevWaveRef.current = true;
  }, [waveActive, progress, stageSize, center, baseSpeed, playSfx]);

  // tamaño del escenario
  useEffect(() => {
    const resize = () => {
      const element = stageRef.current;
      if (!element) return;
      const rect = element.getBoundingClientRect();
      setStageSize({
        w: rect.width,
        h: rect.height,
      });
    };
    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);

  // cuenta regresiva
  useEffect(() => {
    if (ended) return;
    if (timeLeft <= 0) {
      setEnded(true);
      return;
    }
    const timeout = setTimeout(() => {
      setTimeLeft((prev) => {
        const next = prev - 1;
        if (next <= 10 && next > 0) playSfx("tick");
        return next;
      });
    }, 1000);
    return () => clearTimeout(timeout);
  }, [timeLeft, ended, playSfx]);

  // spawner continuo
  useEffect(() => {
    if (ended) return;
    const interval = setInterval(() => {
      const extraProgress =
        (progress > DIFF.extraSpawn1 ? 1 : 0) +
        (progress > DIFF.extraSpawn2 ? 1 : 0);
      const waveBonus = waveActive ? WAVES.bonusPerTick : 0;
      const count = 1 + extraProgress + waveBonus;

      setThreats((prev) => {
        const batch = Array.from({ length: count }, () =>
          spawnThreat(stageSize, center, baseSpeed, nextId)
        );
        const next = [...prev, ...batch];
        return MAX_ON_STAGE ? next.slice(-MAX_ON_STAGE) : next;
      });
    }, spawnMs);
    return () => clearInterval(interval);
  }, [spawnMs, ended, stageSize, center, baseSpeed, progress, waveActive, playSfx]);

  // bucle de animación + colisiones
  useEffect(() => {
    if (ended) return;

    let rafId;
    let last = performance.now();

    const tick = (now) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;

      // lerp del escudo hacia el target
      {
        const sp = shieldPosRef.current;
        const tp = targetPosRef.current;
        const follow = 10;
        const alpha = Math.min(1, follow * dt);
        const nx = sp.x + (tp.x - sp.x) * alpha;
        const ny = sp.y + (tp.y - sp.y) * alpha;
        if (Math.abs(nx - sp.x) > 0.1 || Math.abs(ny - sp.y) > 0.1) {
          const np = { x: nx, y: ny };
          shieldPosRef.current = np;
          setShieldPos(np);
        }
      }

      setThreats((prev) => {
        const next = [];
        let lifeLoss = 0;
        let blockedThisFrame = 0;

        for (const threat of prev) {
          const nx = threat.x + threat.vx * threat.speed * dt;
          const ny = threat.y + threat.vy * threat.speed * dt;

          // colisión con escudo
          const dsx = shieldPosRef.current.x - nx;
          const dsy = shieldPosRef.current.y - ny;
          const dShield = Math.hypot(dsx, dsy);
          if (dShield <= shieldRadius) {
            blockedThisFrame += 1;
            continue;
          }

          // colisión con servidor
          const dcx = center.x - nx;
          const dcy = center.y - ny;
          const dServer = Math.hypot(dcx, dcy);
          if (dServer <= SERVER_RADIUS) {
            lifeLoss += 1;
            continue;
          }

          next.push({ ...threat, x: nx, y: ny });
        }

        if (blockedThisFrame > 0) {
          setScore((prev) => prev + blockedThisFrame * POINTS_PER_BLOCK);
          playSfx("block");
        }
        if (lifeLoss > 0) {
          playSfx("hit");
          setLives((prev) => {
            const updated = prev - lifeLoss;
            if (updated <= 0) setEnded(true);
            return updated;
          });
        }
        return next;
      });

      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [center, ended, shieldRadius, playSfx]);

  // SFX de final (ganar/perder) — SIN REDUX
  useEffect(() => {
    // gana si se acabó el tiempo y aún quedan vidas
    if (timeLeft <= 0 && lives > 0) playSfx("win");
    // pierde si se quedó sin vidas
    if (lives <= 0 && ended) playSfx("lose");
  }, [ended, timeLeft, lives, playSfx]);

  // 👉 Eliminado: startGame("firewall") y guardados/markScore/endGame/saveScore

  const updateTargetFromEvent = (event) => {
    const rect = stageRef.current.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const clampedX = Math.max(0, Math.min(stageSize.w, x));
    const clampedY = Math.max(0, Math.min(stageSize.h, y));
    const point = { x: clampedX, y: clampedY };
    setTargetPos(point);
    targetPosRef.current = point;

    if (!audioArmed) {
      setAudioArmed(true);
      playSfx("place");
    }
  };

  const gameOver = ended || timeLeft <= 0;
  const win = timeLeft <= 0 && lives > 0;
  const lose = lives <= 0;

  const shieldDiameter = Math.round(shieldRadius * 2);

  return (
    <div className="rad-wrap">
      <div className="rad-hud">
        <div className="rad-badge">⏱ {timeLeft}s</div>
        <div className="rad-badge">❤️ {lives}/{MAX_LIVES}</div>
        <div className="rad-badge">⭐ {score} pts</div>
        {waveActive && (
          <div
            className="rad-badge"
            style={{ background: "rgba(255,80,80,.35)", borderColor: "rgba(255,120,120,.6)" }}
          >
            🌊 Oleada
          </div>
        )}
        <button
          className={`rad-mute${muted ? " is-muted" : ""}`}
          onClick={() => setMuted((state) => !state)}
          aria-pressed={muted}
          title={muted ? "Activar sonido" : "Silenciar sonido"}
        >
          {muted ? "🔇" : "🔊"}
        </button>
      </div>

      <div
        ref={stageRef}
        className="rad-stage"
        style={{ backgroundImage: `url(${bg})` }}
        onPointerMove={updateTargetFromEvent}
        onPointerDown={updateTargetFromEvent}
        onPointerEnter={updateTargetFromEvent}
      >
        <img
          src={serverImg}
          alt="Servidor"
          className="rad-server"
          style={{ left: center.x, top: center.y }}
          draggable={false}
        />

        <img
          src={shieldImg}
          alt="Escudo"
          className="rad-shield"
          style={{ left: shieldPos.x, top: shieldPos.y, width: `${shieldDiameter}px` }}
          draggable={false}
        />

        <div
          className="rad-ring rad-ring--shield"
          style={{ left: shieldPos.x, top: shieldPos.y, width: shieldDiameter, height: shieldDiameter }}
        />
        <div
          className="rad-ring rad-ring--server"
          style={{ left: center.x, top: center.y, width: SERVER_RADIUS * 2, height: SERVER_RADIUS * 2 }}
        />

        {threats.map((threat) => (
          <img
            key={threat.id}
            src={threat.sprite}
            alt="Amenaza"
            className="rad-threat"
            style={{ left: threat.x, top: threat.y }}
            draggable={false}
          />
        ))}
      </div>

      {gameOver && (
        <div className="rad-overlay">
          <div className="rad-card">
            <h2 className="rad-card-title">
              {win ? "✅ Protegiste el sistema" : lose ? "⚠️ El ataque fue exitoso" : "⏱ Tiempo agotado"}
            </h2>
            <p className="rad-card-sub">
              Puntuación: <b>{score} pts</b> • Amenazas que entraron: <b>{MAX_LIVES - lives}</b>
            </p>
            <div className="rad-card-actions">
              <button className="boton-enlace-juegos" onClick={() => window.location.reload()}>
                Reintentar
              </button>
              <button className="boton-enlace-juegos" onClick={() => navigate("/selector")}>
                Salir
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
