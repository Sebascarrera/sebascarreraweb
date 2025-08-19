import React, { useEffect } from 'react';
import '../styles/contact.css';

function Contact() {
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
       <h2>Contacto</h2>
       <p>¿Tienes un proyecto en mente o simplemente quieres saludar? ¡Escríbeme!</p>
       <form>
         <input type="text" placeholder="Tu nombre" />
         <input type="email" placeholder="Tu correo electrónico" />
         <textarea placeholder="Tu mensaje..." rows="4"></textarea>
         <button type="submit">Enviar mensaje</button>
       </form>
     </div>
    </section>
  );
}

export default Contact;
