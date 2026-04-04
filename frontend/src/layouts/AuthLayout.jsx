import { Outlet } from 'react-router-dom';

function AuthLayout() {
  return (
    <div className="min-h-screen flex bg-surface">
      {/* 🚀 Left Side: Branding / Background */}
      <div className="hidden lg:flex flex-col justify-center items-center w-1/2 p-12 bg-gradient-to-br from-surface to-[#0a001a] border-r border-white/5 relative overflow-hidden">
        
        {/* Subtle Background Glow */}
        <div className="absolute top-1/4 -right-24 w-96 h-96 bg-primary/20 blur-[120px] rounded-full animate-pulse"></div>
        <div className="absolute bottom-1/4 -left-24 w-64 h-64 bg-primary-container/10 blur-[120px] rounded-full"></div>

        <div className="z-10 max-w-md">
          <div className="w-16 h-16 bg-primary/20 rounded-2xl flex items-center justify-center text-primary mb-8 border border-primary/20">
             <span className="font-black text-2xl">DC</span>
          </div>
          <h1 className="text-5xl font-black text-on-surface tracking-tighter mb-6 leading-tight">
            Connecting the <span className="text-primary italic">nodes</span> of the collective.
          </h1>
          <p className="text-on-surface-variant/60 text-lg leading-relaxed">
            Welcome back to the terminal. Access the network to share tokens of knowledge and signal your progress.
          </p>
        </div>
      </div>

      {/* 🧾 Right Side: Where the Login/Signup Forms will live */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
           <Outlet />
        </div>
      </div>
    </div>
  );
}

export default AuthLayout;
