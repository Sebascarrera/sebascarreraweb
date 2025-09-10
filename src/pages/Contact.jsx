import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import '../styles/contact.css';

function Contact() {
  const { t } = useTranslation();
  const email = 'sebascarreraweb@gmail.com';
  const whatsapp = '+57 3133510006';

  useEffect(() => {
    const revealElements = document.querySelectorAll('.reveal');
    const revealOnScroll = () => {
      const windowHeight = window.innerHeight;
      revealElements.forEach(el => {
        const top = el.getBoundingClientRect().top;
        if (top < windowHeight - 100) {
          el.classList.add('active');
        }
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
          <a href={`mailto:${email}`}>{t('contact.details.email', { email })}</a>
          <a href={`https://wa.me/573133510006`} target="_blank" rel="noopener noreferrer">
            {t('contact.details.whatsapp', { number: whatsapp })}
          </a>
        </div>
        <form>
          <input type="text" placeholder={t('contact.form.name')} />
          <input type="email" placeholder={t('contact.form.email')} />
          <textarea placeholder={t('contact.form.message')} rows="4"></textarea>
          <button type="submit">{t('contact.form.send')}</button>
        </form>
      </div>
    </section>
  );
}

export default Contact;
