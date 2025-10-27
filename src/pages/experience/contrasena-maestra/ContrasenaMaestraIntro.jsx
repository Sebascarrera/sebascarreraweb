import { useNavigate } from "react-router-dom";
import contrasenaImgIntro from "../../../assets/img/contrasena-maestra-img-intro.png";
import "../styles/contrasena-maestra-intro.css";

export default function ContrasenaMaestraIntro() {
  const navigate = useNavigate();

  return (
    <div className="cm-wrap">
      <div className="cm-grid">
        {/* Izquierda: imagen / logo */}
        <div className="cm-left">
          <div className="cm-hero">
            <img
              className="cm-hero-img"
              src={contrasenaImgIntro}
              alt="Contraseña Maestra"
            />
            <div className="cm-hero-glow" />
          </div>
        </div>

        {/* Derecha: título, explicación, badges y CTA */}
        <div className="cm-right">
          <h1 className="cm-title">🔐 Contraseña Maestra</h1>
          <p className="cm-sub">
            Evalúa contraseñas y elige las más seguras. Tienes 1 minuto.
            Si aceptas 3 contraseñas débiles o dejas pasar patrones inseguros,
            pierdes la partida.
          </p>

          <div className="cm-badges">
            <Badge color="#3a86ff">🔤 MAYÚS/minús</Badge>
            <Badge color="#ffbe0b">#️⃣ NÚMEROS</Badge>
            <Badge color="#06d6a0">🔣 SÍMBOLOS</Badge>
            <Badge color="#e85d04">📏 12+ CARACTERES</Badge>
          </div>

          <div className="cm-cta">
            <div className="cm-actions">
              <button
                onClick={() => navigate("/contrasena-maestra/play")}
                className="boton-enlace-juegos cm-btn"
              >
                JUGAR
              </button>

              <button
                onClick={() => navigate("/selector")}
                className="boton-enlace-juegos cm-btn cm-btn--sec"
                type="button"
              >
                VOLVER AL INICIO
              </button>
            </div>

            <p className="cm-hint">
              Rechaza contraseñas débiles (fechas, nombres, secuencias como
              “123456”). Favorece las largas y variadas. ¡Apunta a 12+ caracteres!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Badge({ color, children }) {
  return (
    <span className="cm-badge" style={{ borderColor: color }}>
      <span className="cm-badge-dot" style={{ background: color }} />
      {children}
    </span>
  );
}
