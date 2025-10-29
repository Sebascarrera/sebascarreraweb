import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import imgWhatsapp from '../assets/img/whatsapp-icon.svg';
import imgEmail from '../assets/img/email-icon.svg';
import '../styles/contact.css';

function Contact() {
  const { t } = useTranslation();
  const email = 'sebascarreramoya@gmail.com';
  const whatsapp = '+57 3133510006';
  const whatsappLink = 'https://wa.me/573133510006'; // E.164 sin espacios ni signos

  useEffect(() => {
    const revealElements = document.querySelectorAll('.reveal');
    const revealOnScroll = () => {
      const windowHeight = window.innerHeight;
      revealElements.forEach(el => {
        const top = el.getBoundingClientRect().top;
        if (top < windowHeight - 100) el.classList.add('active');
      });
    };
    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll();
    return () => window.removeEventListener('scroll', revealOnScroll);
  }, []);

  return (
    <section className="contact-section">
      <div className="contact-form reveal">
        <h2>{t('contact.title')}</h2>
        <p>{t('contact.description')}</p>

        <div className="contact-details">
          <a
            className="contact-link email-link"
            href={`mailto:${email}`}
            aria-label="Enviar correo electrónico"
          >
            <img
              src={imgEmail}
              alt=""
              className="contact-icon"
              aria-hidden="true"
            />
            <span>{t('contact.details.email', { email })}</span>
          </a>


          <a
            className="contact-link whatsapp-link"
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Abrir chat de WhatsApp"
          >
            <img
              src={imgWhatsapp}
              alt=""
              className="contact-icon"
              aria-hidden="true"
            />
            <span>{t('contact.details.whatsapp', { number: whatsapp })}</span>
          </a>
        </div>

        {/*<form>
          <input type="text" placeholder={t('contact.form.name')} />
          <input type="email" placeholder={t('contact.form.email')} />
          <textarea placeholder={t('contact.form.message')} rows="4"></textarea>
          <button type="submit">{t('contact.form.send')}</button>
        </form>*/}
      </div>
    </section>
  );
}

export default Contact;
