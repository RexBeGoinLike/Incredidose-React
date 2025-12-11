import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router, Routes, Route, BrowserRouter } from 'react-router-dom';
import './index.css'

import { Login } from './common/login';

//Common
import { PrescriptionInfo } from './common/prescriptioninfo'
import { PurchaseInfo } from './common/purchaseinfo';
import { Payments } from './common/payments';

// Patient UI
import { PatientDashboard } from './patient/dashboard';

function App() {  
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/patient/dashboard" element={<PatientDashboard />} />
        <Route path="/common/prescriptioninfo/:prescriptionid" element={<PrescriptionInfo />} />
        <Route path="/common/purchases/:prescriptionid" element={<PurchaseInfo />} />
        <Route path="/common/payments/:purchaseid" element={<Payments />} />
      </Routes>
    </Router>
  );
}

createRoot(document.getElementById('root')).render(
  <App />
)
