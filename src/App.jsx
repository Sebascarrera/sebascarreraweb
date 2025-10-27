// src/App.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Projects from './pages/Projects';
import Skills from './pages/Skills';
import Contact from './pages/Contact';
import ExperienceSelector from './pages/experience/ExperienceSelector';
import FirewallIntro from './pages/experience/firewall/FirewallIntro';
import FirewallPlay from './pages/experience/firewall/FirewallPlay';
import ContrasenaMaestraIntro from "./pages/experience/contrasena-maestra/ContrasenaMaestraIntro";
import ContrasenaMaestraPlay from "./pages/experience/contrasena-maestra/ContrasenaMaestraPlay";
import MalwareIntro from "./pages/experience/escapa-malware/MalwareIntro";
import MalwarePlay from "./pages/experience/escapa-malware/MalwarePlay";


function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/proyectos" element={<Projects />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/habilidades" element={<Skills />} />
        <Route path="/skills" element={<Skills />} />
        <Route path="/contacto" element={<Contact />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/selector" element={<ExperienceSelector />} />
        <Route path="/firewall" element={<FirewallIntro />} />
        <Route path="/firewall/play" element={<FirewallPlay />} />
        <Route path="/contrasena-maestra" element={<ContrasenaMaestraIntro />} />
        <Route path="/contrasena-maestra/play" element={<ContrasenaMaestraPlay />} />
        <Route path="/escapa-malware" element={<MalwareIntro />} />
        <Route path="/escapa-malware/play" element={<MalwarePlay />} />

      </Routes>
    </>
  );
}

export default App;
