// src/main.jsx
import React from 'react';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n.js';
import App from './App.jsx';
import './index.css';
import { LanguageProvider } from './context/LanguageContext.jsx';

function scrollReveal() {
  const reveals = document.querySelectorAll('.reveal');
  for (let i = 0; i < reveals.length; i++) {
    const windowHeight = window.innerHeight;
    const elementTop = reveals[i].getBoundingClientRect().top;
    const revealPoint = 100;

    if (elementTop < windowHeight - revealPoint) {
      reveals[i].classList.add('active');
    }
  }
}
window.addEventListener('scroll', scrollReveal);
window.addEventListener('DOMContentLoaded', scrollReveal);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    </BrowserRouter>
  </StrictMode>
);
