import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import firewallImgIntro from "../../assets/img/firewall-img-intro.png";
import passwordImgIntro from "../../assets/img/contrasena-maestra-img-intro.png";
import malwareImgIntro from "../../assets/img/malware-img-intro.png";
import asicsPortada from "../../assets/asics/portada-juego-asics.png";
import jornadaCover from "../../assets/img/jornada-ciberseguridad-2026-cover.jpg";
import "./styles/experience-base.css";
import "./styles/ExperienceSelector.css";

// Demo de la "Jornada de Ciberseguridad 2026": vive en su propio sitio (React + Redux,
// ~46 MB) para no pesar ni mezclar dependencias con este portafolio. Se abre en pestaña nueva.
const FEATURED_URL = "https://ciberseguridad.sebastiancarreramoya.com";

const GAMES = [
  {
    id: "firewall",
    path: "/firewall",
    image: firewallImgIntro,
    status: "available",
  },
  {
    id: "password",
    path: "/contrasena-maestra",
    image: passwordImgIntro,
    status: "available",
  },
  {
    id: "malware",
    path: "/escapa-malware",
    image: malwareImgIntro,
    status: "available",
  },
  {
    id: "asics",
    path: "/asics-runner",
    image: asicsPortada,
    status: "available",
  },
];

export default function ExperienceSelector() {
  const { t } = useTranslation();
  const featuredFacts = t("experience.featured.facts", { returnObjects: true });

  return (
    <section className="experience">
      <div className="experience__content">
        <span className="experience__eyebrow">{t("experience.eyebrow")}</span>
        <h1 className="experience__title">{t("experience.title")}</h1>
        <p className="experience__subtitle">{t("experience.subtitle")}</p>
      </div>

      <article className="experience-featured">
        <a
          className="experience-featured__media"
          href={FEATURED_URL}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={t("experience.featured.cta")}
        >
          <img src={jornadaCover} alt={t("experience.featured.coverAlt")} />
          <span className="experience-card__badge">{t("experience.featured.badge")}</span>
        </a>

        <div className="experience-featured__body">
          <span className="experience-featured__tag">{t("experience.featured.tag")}</span>
          <h2>{t("experience.featured.title")}</h2>
          <p>{t("experience.featured.description")}</p>
          <ul className="experience-featured__facts">
            {Array.isArray(featuredFacts) && featuredFacts.map((fact) => (
              <li key={fact}>{fact}</li>
            ))}
          </ul>
          <div className="experience-featured__actions">
            <a
              className="boton-enlace-juegos"
              href={FEATURED_URL}
              target="_blank"
              rel="noopener noreferrer"
            >
              {t("experience.featured.cta")} <span aria-hidden="true">↗</span>
            </a>
            <span className="experience-card__helper">{t("experience.featured.helper")}</span>
          </div>
        </div>
      </article>

      <div className="experience__grid">
        {GAMES.map((game) => {
          const isAvailable = game.status === "available";
          const title = t(`experience.games.${game.id}.title`);
          const description = t(`experience.games.${game.id}.description`);
          const badge = t(`experience.games.${game.id}.badge`);
          const cta = t(`experience.games.${game.id}.cta`);
          const helper = t(`experience.games.${game.id}.helper`);

          return (
            <article
              key={game.id}
              className={`experience-card${isAvailable ? "" : " is-disabled"}`}
            >
              <div className="experience-card__media" style={game.logoStyle || {}}>
                {game.image ? (
                  <img src={game.image} alt={title} loading="lazy" />
                ) : (
                  <div className="experience-card__placeholder" aria-hidden />
                )}
                {!game.logoStyle && <span className="experience-card__badge">{badge}</span>}
                {game.logoStyle && <span className="experience-card__badge" style={{ background: "#E31837", color: "#fff" }}>{badge}</span>}
              </div>

              <div className="experience-card__body">
                <h2>{title}</h2>
                <p>{description}</p>
                {/* Puntajes deshabilitados en el demo */}
              </div>

              <div className="experience-card__actions">
                {isAvailable ? (
                  <Link className="boton-enlace-juegos" to={game.path}>
                    {cta}
                  </Link>
                ) : (
                  <span className="experience-card__coming">{cta}</span>
                )}
                <span className="experience-card__helper">{helper}</span>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
