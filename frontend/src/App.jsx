import { BrowserRouter, Routes, Route } from 'react-router-dom';
import DashboardLayout from './layouts/DashboardLayout';
import AuthLayout from './layouts/AuthLayout'; // 👈 1. Import it
import FeedPage from './pages/FeedPage';
import LoginPage from './pages/LoginPage';   // 👈 2. Import it
import ProtectedRoute from './components/ProtectedRoute';
import SignupPage from './pages/SignupPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        
        {/* 🔐 AUTH Group */}
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} /> 
        </Route>

        {/* 🗺️ DASHBOARD Group */}
        <Route element={<ProtectedRoute />}>
           <Route element={<DashboardLayout />}>
             <Route path="/" element={<FeedPage />} />
             {/* ... all your other dashboard pages ... */}
           </Route>
        </Route>

      </Routes>
    </BrowserRouter>
  );
}
export default App;