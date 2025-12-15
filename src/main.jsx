import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router, Routes, Route, BrowserRouter } from 'react-router-dom';
import './index.css'

import { Login } from './common/authentication/login';
import { ProtectedRoute } from './common/authentication/protectedroute';

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



function App() {  
  return (
    <Router>
      <Routes>
        <Route path="/login?" element={<Login />} />
        

        <Route path="/patient/dashboard/" element={<ProtectedRoute allowedRoles={['ptnt']}><PatientDashboard /></ProtectedRoute>} />

        <Route path="/common/prescriptioninfo/:prescriptionid" element={<ProtectedRoute><PrescriptionInfo /></ProtectedRoute>} />
        <Route path="/common/purchaseinfo/:prescriptionid" element={<ProtectedRoute><PurchaseInfo /></ProtectedRoute>} />
        <Route path="/common/payments/:purchaseid" element={<ProtectedRoute><Payments /></ProtectedRoute>} />
      
        <Route path="/doctor/dashboard/" element={<ProtectedRoute><DoctorDashboard /></ProtectedRoute>} />
        <Route path="/doctor/createnewprescription/:patientid" element={<ProtectedRoute><CreateNewPrescription /></ProtectedRoute>} />
        <Route path="/doctor/prescriptionlist/:patientid" element={<ProtectedRoute><ViewPrescriptions /></ProtectedRoute>} />

        <Route path="/pharmacist/dashboard" element={<ProtectedRoute><PharmacistDashboard /></ProtectedRoute>} />
        <Route path="/pharmacist/viewprescriptions/:patientid" element={<ProtectedRoute><PharmacistViewPrescriptions /></ProtectedRoute>} />
        <Route path="/pharmacist/prescriptioninfo/:patientid/:prescriptionid" element={<ProtectedRoute><EditPrescriptionItems /></ProtectedRoute>} />
      </Routes>
    </Router>
  )
}

createRoot(document.getElementById('root')).render(
  <App />
)
