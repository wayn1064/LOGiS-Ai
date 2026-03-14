import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LoginPage from './pages/Auth/LoginPage'
import AdminDashboard from './pages/Dashboard/AdminDashboard'
// Supply
import SupplyLayout from './features/supply/SupplyLayout'
import SupplyDashboard from './features/supply/pages/Dashboard/SupplyDashboard'
import SupplyInventory from './features/supply/pages/Inventory/SupplyInventory'
import SupplyOrders from './features/supply/pages/Orders/SupplyOrders'
import SupplySterilization from './features/supply/pages/Sterilization/SupplySterilization'
import SupplyCleaning from './features/supply/pages/Cleaning/SupplyCleaning'
import SupplyAs from './features/supply/pages/As/SupplyAs'
import SupplyVendors from './features/supply/pages/Vendors/SupplyVendors'
import SupplySettings from './features/supply/pages/Settings/SupplySettings'
// Director
import DirectorLayout from './features/director/DirectorLayout'
import DirectorDashboard from './features/director/pages/Dashboard/DirectorDashboard'
import DirectorSettings from './features/director/pages/Settings/DirectorSettings'
// Management
import ManagementLayout from './features/management/ManagementLayout'
import ManagementDashboard from './features/management/pages/Dashboard/ManagementDashboard'
import ManagementSettings from './features/management/pages/Settings/ManagementSettings'
// Clinic
import ClinicLayout from './features/clinic/ClinicLayout'
import ClinicDashboard from './features/clinic/pages/Dashboard/ClinicDashboard'
import ClinicSettings from './features/clinic/pages/Settings/ClinicSettings'
// Desk
import DeskLayout from './features/desk/DeskLayout'
import DeskDashboard from './features/desk/pages/Dashboard/DeskDashboard'
import DeskSettings from './features/desk/pages/Settings/DeskSettings'
// Lab
import LabLayout from './features/lab/LabLayout'
import LabDashboard from './features/lab/pages/Dashboard/LabDashboard'
import LabSettings from './features/lab/pages/Settings/LabSettings'
// Consulting
import ConsultingLayout from './features/consulting/ConsultingLayout'
import ConsultingDashboard from './features/consulting/pages/Dashboard/ConsultingDashboard'
import ConsultingSettings from './features/consulting/pages/Settings/ConsultingSettings'
// MyOffice
import MyofficeLayout from './features/myoffice/MyofficeLayout'
import MyofficeDashboard from './features/myoffice/pages/Dashboard/MyofficeDashboard'
import MyofficeSettings from './features/myoffice/pages/Settings/MyofficeSettings'

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    const auth = localStorage.getItem('isAuthenticated')
    if (auth === 'true') {
      setIsAuthenticated(true)
    }
  }, [])

  if (!isAuthenticated) {
    return <LoginPage onLoginSuccess={() => setIsAuthenticated(true)} />
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AdminDashboard />} />
        
        {/* 공급실 (Supply) FSD 라우터 연결 */}
        <Route path="/supply" element={<SupplyLayout />}>
          <Route index element={<SupplyDashboard />} />
          <Route path="inventory" element={<SupplyInventory />} />
          <Route path="orders" element={<SupplyOrders />} />
          <Route path="sterilization" element={<SupplySterilization />} />
          <Route path="cleaning" element={<SupplyCleaning />} />
          <Route path="as" element={<SupplyAs />} />
          <Route path="vendors" element={<SupplyVendors />} />
          <Route path="settings" element={<SupplySettings />} />
        </Route>

        <Route path="/director" element={<DirectorLayout />}>
          <Route index element={<DirectorDashboard />} />
          <Route path="settings" element={<DirectorSettings />} />
        </Route>
        
        <Route path="/management" element={<ManagementLayout />}>
          <Route index element={<ManagementDashboard />} />
          <Route path="settings" element={<ManagementSettings />} />
        </Route>

        <Route path="/clinic" element={<ClinicLayout />}>
          <Route index element={<ClinicDashboard />} />
          <Route path="settings" element={<ClinicSettings />} />
        </Route>

        <Route path="/desk" element={<DeskLayout />}>
          <Route index element={<DeskDashboard />} />
          <Route path="settings" element={<DeskSettings />} />
        </Route>

        <Route path="/lab" element={<LabLayout />}>
          <Route index element={<LabDashboard />} />
          <Route path="settings" element={<LabSettings />} />
        </Route>

        <Route path="/consulting" element={<ConsultingLayout />}>
          <Route index element={<ConsultingDashboard />} />
          <Route path="settings" element={<ConsultingSettings />} />
        </Route>

        <Route path="/myoffice" element={<MyofficeLayout />}>
          <Route index element={<MyofficeDashboard />} />
          <Route path="settings" element={<MyofficeSettings />} />
        </Route>

      </Routes>
    </BrowserRouter>
  )
}

export default App
