// src/App.jsx
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Projects from './pages/Projects';
import Skills from './pages/Skills';
import Contact from './pages/Contact';

function App() {
  return (
      <Routes>
        <Route path="/:lang(en|es)" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="proyectos" element={<Projects />} />
          <Route path="habilidades" element={<Skills />} />
          <Route path="contacto" element={<Contact />} />
          <Route path="projects" element={<Projects />} />
          <Route path="skills" element={<Skills />} />
          <Route path="contact" element={<Contact />} />
        </Route>
        <Route path="/" element={<Navigate to="/es" replace />} />
        <Route path="/proyectos" element={<Navigate to="/es/proyectos" replace />} />
        <Route path="/habilidades" element={<Navigate to="/es/habilidades" replace />} />
        <Route path="/contacto" element={<Navigate to="/es/contacto" replace />} />
        <Route path="/projects" element={<Navigate to="/en/projects" replace />} />
        <Route path="/skills" element={<Navigate to="/en/skills" replace />} />
        <Route path="/contact" element={<Navigate to="/en/contact" replace />} />
      </Routes>
  );
}

export default App;
