import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router, Routes, Route, BrowserRouter } from 'react-router-dom';
import './index.css'

import { Login } from './common/login';

//Common
import { PrescriptionInfo } from './common/prescriptioninfo'
import { PurchaseInfo } from './common/purchaseinfo';
import { Payments } from './common/payments';
import { ViewPrescriptions } from './doctor/viewprescriptions';

// Patient UI
import { PatientDashboard } from './patient/dashboard';

//Doctor UI
import { DoctorDashboard } from './doctor/dashboard';
import { CreateNewPrescription } from './doctor/createnewprescription';
import { PharmacistDashboard } from './pharmacist/dashboard';
import { PharmacistViewPrescriptions } from './pharmacist/viewprescriptions';
import { EditPrescriptionItems } from './pharmacist/editprescriptionitem';

import { AdminDashboard } from './admin/dashboard';
function App() {  
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />

        <Route path="/patient/dashboard" element={<PatientDashboard />} />

        <Route path="/common/prescriptioninfo/:prescriptionid" element={<PrescriptionInfo />} />
        <Route path="/common/purchaseinfo/:prescriptionid" element={<PurchaseInfo />} />
        <Route path="/common/payments/:purchaseid" element={<Payments />} />
        <Route path="/common/prescriptionlist/:doctorid?/:patientid" element={<ViewPrescriptions />} />
      
        <Route path="/doctor/dashboard" element={<DoctorDashboard />} />
        <Route path="/doctor/createnewprescription" element={<CreateNewPrescription />} />

        <Route path="/pharmacist/dashboard" element={<PharmacistDashboard />} />
        <Route path="/pharmacist/viewprescriptions" element={<PharmacistViewPrescriptions />} />
        <Route path="/pharmacist/viewprescriptions/prescriptioninfo" element={<EditPrescriptionItems />} />
        
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
      </Routes>
    </Router>
  );
}

createRoot(document.getElementById('root')).render(
  <App />
)
