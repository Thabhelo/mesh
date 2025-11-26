import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Platform from './pages/Platform';
import About from './pages/About';
import Contact from './pages/Contact';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';
import SignIn from './pages/SignIn';
import Onboarding from './pages/Onboarding';

// Dashboard Pages
import FireDashboard from './pages/dashboard/FireDashboard';
import PoliceDashboard from './pages/dashboard/PoliceDashboard';
import EMSDashboard from './pages/dashboard/EMSDashboard';
import DispatchDashboard from './pages/dashboard/DispatchDashboard';
import AdminDashboard from './pages/dashboard/AdminDashboard';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/platform" element={<Platform />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/onboarding" element={<Onboarding />} />

        <Route path="/dashboard/fire" element={<FireDashboard />} />
        <Route path="/dashboard/police" element={<PoliceDashboard />} />
        <Route path="/dashboard/ems" element={<EMSDashboard />} />
        <Route path="/dashboard/dispatch" element={<DispatchDashboard />} />
        <Route path="/dashboard/admin" element={<AdminDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
