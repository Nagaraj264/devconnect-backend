import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import RightSidebar from '../components/RightSidebar'; 

function DashboardLayout() {
  return (
    <div className="flex min-h-screen bg-surface selection:bg-primary/20 selection:text-primary">
      {/* 🚀 Our Sidebar stays fixed on every page */}
      <Sidebar />

      {/* 📦 This is where we render the current page */}
      <main className="flex-1 overflow-y-auto">
        <div className="max-w-[700px] mx-auto px-6 py-8">
            <Outlet /> 
        </div>
      </main>

      {/* 🔍 Optional: A "Right Sidebar" (Explore/Trends) could go here later */}
      <RightSidebar /> 
    </div>
  );
}

export default DashboardLayout;
