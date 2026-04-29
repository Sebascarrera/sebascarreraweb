import { useNavigate } from "react-router-dom";
import asicsLogo from "../../../assets/asics/portada-juego-asics.png";
import "../styles/experience-base.css";
import "./asics-runner.css";

const FEATURES = [
  { color: "#003DA5", label: "👟 Atrapa tenis ASICS" },
  { color: "#E31837", label: "⏱️ 25 segundos" },
  { color: "#003DA5", label: "🏆 Suma puntos y gana" },
  { color: "#E31837", label: "📱 Inclina el celular" },
];

export default function AsicsRunnerIntro() {
  const navigate = useNavigate();

  return (
    <div className="ar-wrap">
      <div className="ar-grid">
        <div className="ar-left">
          <div className="ar-hero">
            <img className="ar-logo" src={asicsLogo} alt="ASICS" />
            <div className="ar-hero-glow" />
          </div>
        </div>

        <div className="ar-right">
          <span className="ar-eyebrow">Demo jugable</span>
          <h1 className="ar-title">ASICS Runner</h1>
          <p className="ar-sub">
            Muévete de lado a lado atrapando los tenis ASICS que caen del cielo.
            Entre más atrapes, más puntos acumulas para participar y ganar entradas o descuentos exclusivos.
          </p>

          <div className="ar-badges">
            {FEATURES.map((f) => (
              <span key={f.label} className="ar-badge" style={{ borderColor: f.color }}>
                <span className="ar-badge-dot" style={{ background: f.color }} />
                {f.label}
              </span>
            ))}
          </div>

          <div className="ar-actions">
            <button onClick={() => navigate("/asics-runner/play")} className="ar-btn ar-btn--primary">
              JUGAR DEMO
            </button>
            <button onClick={() => navigate("/selector")} className="ar-btn ar-btn--sec">
              VOLVER
            </button>
          </div>

          <p className="ar-hint">
            Inclina el celular para correr · Arrastra con el dedo · Usa las flechas del teclado
          </p>
        </div>
      </div>
    </div>
  );
}
