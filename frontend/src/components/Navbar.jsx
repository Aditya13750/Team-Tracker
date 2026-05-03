import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LogOut, Menu, X } from 'lucide-react';
import { useState } from 'react';

export const Navbar = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-blue-600 text-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <Link to="/" className="text-2xl font-bold">
            🎯 TeamTrack
          </Link>

          {isAuthenticated ? (
            <>
              <div className="hidden md:flex items-center gap-6">
                <Link to="/dashboard" className="hover:bg-blue-700 px-3 py-2 rounded">
                  Dashboard
                </Link>
                <Link to="/projects" className="hover:bg-blue-700 px-3 py-2 rounded">
                  Projects
                </Link>
                <Link to="/tasks" className="hover:bg-blue-700 px-3 py-2 rounded">
                  Tasks
                </Link>
                <span className="text-sm bg-blue-700 px-3 py-2 rounded">
                  {user?.name} ({user?.role})
                </span>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 bg-red-600 hover:bg-red-700 px-3 py-2 rounded"
                >
                  <LogOut size={18} />
                  Logout
                </button>
              </div>

              {/* Mobile menu */}
              <button
                className="md:hidden"
                onClick={() => setIsOpen(!isOpen)}
              >
                {isOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </>
          ) : (
            <div className="flex gap-4">
              <Link to="/login" className="btn btn-secondary">
                Login
              </Link>
              <Link to="/signup" className="btn btn-primary">
                Sign Up
              </Link>
            </div>
          )}
        </div>

        {/* Mobile menu items */}
        {isOpen && isAuthenticated && (
          <div className="md:hidden pb-4 space-y-2">
            <Link
              to="/dashboard"
              className="block hover:bg-blue-700 px-3 py-2 rounded"
            >
              Dashboard
            </Link>
            <Link
              to="/projects"
              className="block hover:bg-blue-700 px-3 py-2 rounded"
            >
              Projects
            </Link>
            <Link
              to="/tasks"
              className="block hover:bg-blue-700 px-3 py-2 rounded"
            >
              Tasks
            </Link>
            <button
              onClick={handleLogout}
              className="w-full text-left bg-red-600 hover:bg-red-700 px-3 py-2 rounded"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};
