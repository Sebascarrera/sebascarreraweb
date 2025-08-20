import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import '../styles/contact.css';

function Contact() {
  const { t } = useTranslation();

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
      <div className="contact-form">
        <h2>{t('contact.title')}</h2>
        <p>{t('contact.description')}</p>
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
