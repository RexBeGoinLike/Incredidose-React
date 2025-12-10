import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router, Routes, Route, BrowserRouter } from 'react-router-dom';
import './index.css'

import { Login } from './common/login';

//Common
import { PrescriptionInfo } from './common/prescriptioninfo'
// Patient UI
import { PatientDashboard } from './patient/dashboard';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/patient/dashboard" element={<PatientDashboard />} />
        <Route path="/common/prescriptioninfo/:prescriptionid" element={<PrescriptionInfo />} />
      </Routes>
    </Router>
  );
}

createRoot(document.getElementById('root')).render(
  <App />
)
