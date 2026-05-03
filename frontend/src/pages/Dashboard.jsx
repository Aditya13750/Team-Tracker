import React, { useEffect, useState } from 'react';
import { taskAPI } from '../services/api';
import { Card, Button } from '../components/FormComponents';
import { LoadingSpinner, ErrorMessage } from '../components/StatusMessages';
import { useAuth } from '../context/AuthContext';
import { BarChart3, CheckCircle, AlertCircle, Clock } from 'lucide-react';

export const Dashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    totalTasks: 0,
    completedTasks: 0,
    overdueTasks: 0,
    inProgressTasks: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      setLoading(true);
      const { data } = await taskAPI.getAll();
      const tasks = data.tasks;

      const now = new Date();
      const completed = tasks.filter((t) => t.status === 'done').length;
      const inProgress = tasks.filter((t) => t.status === 'in-progress').length;
      const overdue = tasks.filter(
        (t) => t.dueDate && new Date(t.dueDate) < now && t.status !== 'done'
      ).length;

      setStats({
        totalTasks: tasks.length,
        completedTasks: completed,
        inProgressTasks: inProgress,
        overdueTasks: overdue,
      });
      setError('');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch stats');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <LoadingSpinner />;

  const StatCard = ({ icon: Icon, label, value, color }) => (
    <Card className={`text-center border-l-4 ${color}`}>
      <div className="flex items-center justify-center mb-2">
        <Icon size={32} className={color.split('-')[1] && `text-${color.split('-')[1]}`} />
      </div>
      <p className="text-gray-600 text-sm">{label}</p>
      <p className="text-3xl font-bold text-gray-800">{value}</p>
    </Card>
  );

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold text-gray-800">
          Welcome back, {user?.name}! 👋
        </h1>
        <p className="text-gray-600 mt-2">Here's your task overview</p>
      </div>

      {error && <ErrorMessage message={error} />}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          icon={BarChart3}
          label="Total Tasks"
          value={stats.totalTasks}
          color="border-blue-500"
        />
        <StatCard
          icon={Clock}
          label="In Progress"
          value={stats.inProgressTasks}
          color="border-yellow-500"
        />
        <StatCard
          icon={CheckCircle}
          label="Completed"
          value={stats.completedTasks}
          color="border-green-500"
        />
        <StatCard
          icon={AlertCircle}
          label="Overdue"
          value={stats.overdueTasks}
          color="border-red-500"
        />
      </div>

      <Card>
        <h2 className="text-2xl font-bold mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <a href="/projects" className="btn btn-primary text-center">
            📁 View Projects
          </a>
          <a href="/tasks" className="btn btn-secondary text-center">
            📋 View All Tasks
          </a>
          <a href="/tasks" className="btn btn-primary text-center">
            ➕ Create Task
          </a>
        </div>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <h3 className="text-lg font-semibold mb-2">📊 Task Distribution</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span>Todo</span>
              <span className="font-bold">{stats.totalTasks - stats.completedTasks - stats.inProgressTasks}</span>
            </div>
            <div className="flex justify-between">
              <span>In Progress</span>
              <span className="font-bold">{stats.inProgressTasks}</span>
            </div>
            <div className="flex justify-between">
              <span>Done</span>
              <span className="font-bold">{stats.completedTasks}</span>
            </div>
          </div>
        </Card>

        <Card>
          <h3 className="text-lg font-semibold mb-2">⚠️ Alerts</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span>Overdue Tasks</span>
              <span className="font-bold text-red-600">{stats.overdueTasks}</span>
            </div>
            <div className="text-gray-600">
              {stats.overdueTasks === 0
                ? '✅ No overdue tasks!'
                : '⏰ Please check overdue tasks'}
            </div>
          </div>
        </Card>

        <Card>
          <h3 className="text-lg font-semibold mb-2">🎯 Progress</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between mb-2">
              <span>Completion Rate</span>
              <span className="font-bold">
                {stats.totalTasks > 0
                  ? `${Math.round((stats.completedTasks / stats.totalTasks) * 100)}%`
                  : '0%'}
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-green-500 h-2 rounded-full transition-all"
                style={{
                  width:
                    stats.totalTasks > 0
                      ? `${(stats.completedTasks / stats.totalTasks) * 100}%`
                      : '0%',
                }}
              ></div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};
