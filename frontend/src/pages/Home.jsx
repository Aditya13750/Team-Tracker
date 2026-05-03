import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Card, Button } from '../components/FormComponents';

export const Home = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 to-blue-800">
      <div className="container mx-auto px-4 py-20">
        <div className="text-center text-white space-y-6">
          <h1 className="text-6xl font-bold">TeamTrack</h1>
          <p className="text-2xl text-blue-100">
            Manage your team's tasks efficiently and collaboratively
          </p>

          {isAuthenticated ? (
            <div className="flex justify-center gap-4 mt-8">
              <Link to="/dashboard" className="btn btn-primary">
                📊 Go to Dashboard
              </Link>
              <Link to="/projects" className="btn btn-secondary">
                📁 View Projects
              </Link>
            </div>
          ) : (
            <div className="flex justify-center gap-4 mt-8">
              <Link to="/login" className="btn btn-secondary">
                🔓 Login
              </Link>
              <Link to="/signup" className="btn btn-primary">
                ✍️ Sign Up
              </Link>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-20">
          <div className="bg-white rounded-lg shadow-lg p-8 text-center">
            <div className="text-4xl mb-4">📊</div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Dashboard</h3>
            <p className="text-gray-600">
              Get a quick overview of your tasks, projects, and team performance
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-8 text-center">
            <div className="text-4xl mb-4">👥</div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Team Collaboration</h3>
            <p className="text-gray-600">
              Manage projects and assign tasks to team members with ease
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-8 text-center">
            <div className="text-4xl mb-4">✅</div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Task Management</h3>
            <p className="text-gray-600">
              Track task progress with our intuitive kanban-style board
            </p>
          </div>
        </div>

        <div className="mt-20 text-center text-white">
          <h2 className="text-3xl font-bold mb-8">Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white bg-opacity-10 rounded-lg p-6">
              <h4 className="text-xl font-semibold mb-2">🔐 Secure Authentication</h4>
              <p>JWT-based authentication with bcrypt password hashing</p>
            </div>
            <div className="bg-white bg-opacity-10 rounded-lg p-6">
              <h4 className="text-xl font-semibold mb-2">📋 Role-Based Access</h4>
              <p>Admin and Member roles with granular permissions</p>
            </div>
            <div className="bg-white bg-opacity-10 rounded-lg p-6">
              <h4 className="text-xl font-semibold mb-2">📱 Responsive Design</h4>
              <p>Works perfectly on desktop, tablet, and mobile devices</p>
            </div>
            <div className="bg-white bg-opacity-10 rounded-lg p-6">
              <h4 className="text-xl font-semibold mb-2">🎨 Beautiful UI</h4>
              <p>Modern and clean interface built with Tailwind CSS</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
