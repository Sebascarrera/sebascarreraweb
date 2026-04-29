// src/App.jsx
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import ExperienceSelector from './pages/experience/ExperienceSelector';
import FirewallIntro from './pages/experience/firewall/FirewallIntro';
import FirewallPlay from './pages/experience/firewall/FirewallPlay';
import ContrasenaMaestraIntro from './pages/experience/contrasena-maestra/ContrasenaMaestraIntro';
import ContrasenaMaestraPlay from './pages/experience/contrasena-maestra/ContrasenaMaestraPlay';
import MalwareIntro from './pages/experience/escapa-malware/MalwareIntro';
import MalwarePlay from './pages/experience/escapa-malware/MalwarePlay';
import AsicsRunnerIntro from './pages/experience/asics-runner/AsicsRunnerIntro';
import AsicsRunnerPlay from './pages/experience/asics-runner/AsicsRunnerPlay';

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/"            element={<Home />} />
        <Route path="/proyectos"   element={<Navigate to="/#proyectos"   replace />} />
        <Route path="/projects"    element={<Navigate to="/#proyectos"   replace />} />
        <Route path="/habilidades" element={<Navigate to="/#habilidades" replace />} />
        <Route path="/skills"      element={<Navigate to="/#habilidades" replace />} />
        <Route path="/contacto"    element={<Navigate to="/#contacto"    replace />} />
        <Route path="/contact"     element={<Navigate to="/#contacto"    replace />} />
        <Route path="/selector"                element={<ExperienceSelector />} />
        <Route path="/firewall"                element={<FirewallIntro />} />
        <Route path="/firewall/play"           element={<FirewallPlay />} />
        <Route path="/contrasena-maestra"      element={<ContrasenaMaestraIntro />} />
        <Route path="/contrasena-maestra/play" element={<ContrasenaMaestraPlay />} />
        <Route path="/escapa-malware"          element={<MalwareIntro />} />
        <Route path="/escapa-malware/play"     element={<MalwarePlay />} />
        <Route path="/asics-runner"            element={<AsicsRunnerIntro />} />
        <Route path="/asics-runner/play"       element={<AsicsRunnerPlay />} />
      </Routes>
    </>
  );
}

export default App;
