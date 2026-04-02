import { BrowserRouter, Routes, Route } from 'react-router-dom';
import DashboardLayout from './layouts/DashboardLayout';
import FeedPage from './pages/FeedPage'; // 👈 Import it here

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<DashboardLayout />}>
          <Route path="/" element={<FeedPage />} /> 
          <Route path="/explore" element={<div className="text-white">Explore Page</div>} />
          <Route path="/chat" element={<div className="text-white">Chat Page</div>} />
          <Route path="/notifications" element={<div className="text-white">Notifications Page</div>} />
          <Route path="/profile" element={<div className="text-white">Profile Page</div>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
