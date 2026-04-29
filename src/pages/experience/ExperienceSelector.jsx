import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import firewallImgIntro from "../../assets/img/firewall-img-intro.png";
import passwordImgIntro from "../../assets/img/contrasena-maestra-img-intro.png";
import malwareImgIntro from "../../assets/img/malware-img-intro.png";
import asicsPortada from "../../assets/asics/portada-juego-asics.png";
import "./styles/experience-base.css";
import "./styles/ExperienceSelector.css";

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

  return (
    <section className="experience">
      <div className="experience__content">
        <span className="experience__eyebrow">{t("experience.eyebrow")}</span>
        <h1 className="experience__title">{t("experience.title")}</h1>
        <p className="experience__subtitle">{t("experience.subtitle")}</p>
      </div>

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
