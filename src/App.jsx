// src/App.jsx
import React from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Cine from './cine/Cine';
import { installProtection } from './protect.js';
const Navbar = React.lazy(() => import('./components/Navbar'));
const Home = React.lazy(() => import('./pages/Home'));
const Legal = React.lazy(() => import('./pages/Legal'));
const ExperienceSelector = React.lazy(() => import('./pages/experience/ExperienceSelector'));
const FirewallIntro = React.lazy(() => import('./pages/experience/firewall/FirewallIntro'));
const FirewallPlay = React.lazy(() => import('./pages/experience/firewall/FirewallPlay'));
const ContrasenaMaestraIntro = React.lazy(() => import('./pages/experience/contrasena-maestra/ContrasenaMaestraIntro'));
const ContrasenaMaestraPlay = React.lazy(() => import('./pages/experience/contrasena-maestra/ContrasenaMaestraPlay'));
const MalwareIntro = React.lazy(() => import('./pages/experience/escapa-malware/MalwareIntro'));
const MalwarePlay = React.lazy(() => import('./pages/experience/escapa-malware/MalwarePlay'));
const AsicsRunnerIntro = React.lazy(() => import('./pages/experience/asics-runner/AsicsRunnerIntro'));
const AsicsRunnerPlay = React.lazy(() => import('./pages/experience/asics-runner/AsicsRunnerPlay'));

function App() {
  const { pathname } = useLocation();
  React.useEffect(() => { installProtection(); }, []);
  const isCine = pathname === '/' || pathname.startsWith('/cine') || pathname === '/aviso-legal';
  return (
    <>
      <React.Suspense fallback={null}>
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
      </React.Suspense>
    </>
  );
}

export default App;
