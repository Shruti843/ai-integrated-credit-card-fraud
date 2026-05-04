import React, { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShieldCheck, Activity, PlusCircle, LogOut, User } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
  const location = useLocation();
  const { user, logout } = useContext(AuthContext);

  const navLinks = [
    { path: '/', label: 'New Transaction', icon: <PlusCircle size={18} /> },
    { path: '/dashboard', label: 'Dashboard', icon: <Activity size={18} /> },
  ];

  return (
    <nav className="sticky top-0 z-50 glass-panel border-x-0 border-t-0 rounded-none mb-8 px-6 py-4">
      <div className="container mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 text-xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
          <ShieldCheck className="text-indigo-400" size={28} />
          <span>FraudGuard</span>
        </Link>
        
        {user ? (
          <div className="flex items-center gap-6">
            <div className="flex gap-2">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.path;
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                      isActive 
                        ? 'bg-indigo-500/20 text-indigo-300' 
                        : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                    }`}
                  >
                    {link.icon}
                    {link.label}
                  </Link>
                );
              })}
            </div>
            
            <div className="h-8 w-px bg-slate-700"></div>
            
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-sm text-slate-300">
                <div className="bg-indigo-500/20 p-1.5 rounded-full">
                  <User size={16} className="text-indigo-400" />
                </div>
                <span className="font-medium">{user.username}</span>
              </div>
              <button 
                onClick={logout}
                className="flex items-center gap-2 text-sm text-slate-400 hover:text-rose-400 transition-colors"
              >
                <LogOut size={16} />
                Logout
              </button>
            </div>
          </div>
        ) : (
          <div className="flex gap-4">
            <Link to="/login" className="px-4 py-2 text-slate-300 hover:text-white transition-colors">Login</Link>
            <Link to="/register" className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg transition-colors">Register</Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
