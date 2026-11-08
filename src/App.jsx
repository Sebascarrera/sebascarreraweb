// src/App.jsx
import React from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Cine from './cine/Cine';
import Legal from './pages/Legal';
import { installProtection } from './protect.js';
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
  const { pathname } = useLocation();
  React.useEffect(() => { installProtection(); }, []);
  const isCine = pathname === '/' || pathname.startsWith('/cine') || pathname === '/aviso-legal';
  return (
    <>
      {!isCine && <Navbar />}
      <Routes>
        <Route path="/"            element={<Cine />} />
        <Route path="/cine"        element={<Navigate to="/" replace />} />
        <Route path="/clasico"     element={<Home />} />
        <Route path="/aviso-legal" element={<Legal />} />
        <Route path="/proyectos"   element={<Navigate to="/#s2"   replace />} />
        <Route path="/projects"    element={<Navigate to="/#s2"   replace />} />
        <Route path="/habilidades" element={<Navigate to="/#s1" replace />} />
        <Route path="/skills"      element={<Navigate to="/#s1" replace />} />
        <Route path="/contacto"    element={<Navigate to="/#fin"    replace />} />
        <Route path="/contact"     element={<Navigate to="/#fin"    replace />} />
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
