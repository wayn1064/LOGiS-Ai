import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { HomePage } from '../pages/home/ui/HomePage';
import { HospitalLayout } from '../pages/hospital/ui/HospitalLayout';
import { LoginPage } from '../pages/login/ui/LoginPage';
import { ProtectedRoute } from './providers/ProtectedRoute';
import { CategoryProvider } from '../shared/lib/CategoryContext';

function App() {
  return (
    <CategoryProvider>
      <BrowserRouter>
        <Routes>
        {/* Public Route */}
        <Route path="/login" element={<LoginPage />} />

        {/* Protected Routes */}
        <Route 
          path="/" 
          element={
            <ProtectedRoute>
              <HomePage />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/hospital/:id/*" 
          element={
            <ProtectedRoute>
              <HospitalLayout />
            </ProtectedRoute>
          } 
        />
        
        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      </BrowserRouter>
    </CategoryProvider>
  );
}

export default App;
