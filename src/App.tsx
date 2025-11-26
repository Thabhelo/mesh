import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Platform from './pages/Platform';
import About from './pages/About';
import Contact from './pages/Contact';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';
import SignIn from './pages/SignIn';
import Onboarding from './pages/Onboarding';

// EMS Dashboard Pages
import EMSDashboard from './pages/dashboard/EMSDashboard';
import EMSCalls from './pages/dashboard/EMSCalls';
import EMSAnalytics from './pages/dashboard/EMSAnalytics';
import EMSMessages from './pages/dashboard/EMSMessages';
import EMSHospitals from './pages/dashboard/EMSHospitals';
import EMSUnits from './pages/dashboard/EMSUnits';

function App() {
  return (
    <Router>
      <Routes>
        {/* Marketing Pages */}
        <Route path="/" element={<Home />} />
        <Route path="/platform" element={<Platform />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/onboarding" element={<Onboarding />} />

        {/* EMS Dashboard */}
        <Route path="/dashboard/ems" element={<EMSDashboard />} />
        <Route path="/dashboard/ems/calls" element={<EMSCalls />} />
        <Route path="/dashboard/ems/analytics" element={<EMSAnalytics />} />
        <Route path="/dashboard/ems/messages" element={<EMSMessages />} />
        <Route path="/dashboard/ems/hospitals" element={<EMSHospitals />} />
        <Route path="/dashboard/ems/units" element={<EMSUnits />} />
      </Routes>
    </Router>
  );
}

export default App;
