import { useNavigate } from "react-router-dom";
import firewallImgIntro from "../../../assets/img/firewall-img-intro.png";
import "../styles/experience-base.css";
import "../styles/FirewallIntro.css";

const TAGS = [
  { color: "#e85d04", label: "🦠 VIRUS" },
  { color: "#3a86ff", label: "🐴 TROYANO" },
  { color: "#ffbe0b", label: "🎣 PHISHING" },
  { color: "#e63946", label: "💣 RANSOMWARE" },
];

export default function FirewallIntro() {
  const navigate = useNavigate();

  return (
    <div className="fi-wrap">
      <div className="fi-grid">
        <div className="fi-left">
          <div className="fi-hero">
            <img className="fi-hero-img" src={firewallImgIntro} alt="Firewall Defender" />
            <div className="fi-hero-glow" />
          </div>
        </div>

        <div className="fi-right">
          <h1 className="fi-title">🔥 Firewall Defender</h1>
          <p className="fi-sub">
            Defiende el servidor central bloqueando amenazas digitales: virus, troyanos, phishing y ransomware.
            Tienes 1 minuto. Si 3 amenazas llegan al servidor, pierdes.
          </p>

          <div className="fi-badges">
            {TAGS.map((tag) => (
              <Badge key={tag.label} color={tag.color}>
                {tag.label}
              </Badge>
            ))}
          </div>

          <div className="fi-cta">
            <div className="fi-actions">
              <button
                onClick={() => navigate("/firewall/play")}
                className="boton-enlace-juegos fi-btn"
              >
                JUGAR
              </button>

              <button
                onClick={() => navigate("/selector")}
                className="boton-enlace-juegos fi-btn fi-btn--sec"
                type="button"
              >
                VOLVER AL INICIO
              </button>
            </div>

            <p className="fi-hint">
              Cipo es tu firewall móvil. Arrástralo por el campo y corta el paso a cada amenaza antes de que llegue al servidor.
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}

function Badge({ color, children }) {
  return (
    <span className="fi-badge" style={{ borderColor: color }}>
      <span className="fi-badge-dot" style={{ background: color }} />
      {children}
    </span>
  );
}