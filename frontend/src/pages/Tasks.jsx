import React, { useEffect, useState } from 'react';
import { taskAPI, projectAPI, authAPI } from '../services/api';
import { Card, Button, Input, Select, TextArea } from '../components/FormComponents';
import { LoadingSpinner, ErrorMessage, SuccessMessage } from '../components/StatusMessages';
import { useAuth } from '../context/AuthContext';
import { Trash2, Plus } from 'lucide-react';

export const Tasks = () => {
  const { user } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [projects, setProjects] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [filter, setFilter] = useState({ status: '', projectId: '' });
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    projectId: '',
    assignedTo: '',
    priority: 'medium',
    dueDate: '',
  });

  useEffect(() => {
    fetchData();
  }, [filter]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [tasksData, projectsData, usersData] = await Promise.all([
        taskAPI.getAll(filter),
        projectAPI.getAll(),
        authAPI.getAllUsers(),
      ]);
      setTasks(tasksData.data.tasks);
      setProjects(projectsData.data.projects);
      setUsers(usersData.data.users);
      setError('');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch data');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateTask = async (e) => {
    e.preventDefault();
    if (!formData.title || !formData.projectId || !formData.assignedTo) {
      setError('Title, project, and assignee are required');
      return;
    }

    try {
      const { data } = await taskAPI.create(formData);
      setTasks([data.task, ...tasks]);
      setSuccess('Task created successfully!');
      setFormData({
        title: '',
        description: '',
        projectId: '',
        assignedTo: '',
        priority: 'medium',
        dueDate: '',
      });
      setShowForm(false);
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create task');
    }
  };

  const handleUpdateTaskStatus = async (taskId, newStatus) => {
    try {
      const { data } = await taskAPI.update(taskId, { status: newStatus });
      setTasks(tasks.map((t) => (t._id === taskId ? data.task : t)));
      setSuccess('Task updated successfully!');
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update task');
    }
  };

  const handleDeleteTask = async (id) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      try {
        await taskAPI.delete(id);
        setTasks(tasks.filter((t) => t._id !== id));
        setSuccess('Task deleted successfully!');
        setTimeout(() => setSuccess(''), 3000);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to delete task');
      }
    }
  };

  if (loading) return <LoadingSpinner />;

  const tasksByStatus = {
    todo: tasks.filter((t) => t.status === 'todo'),
    'in-progress': tasks.filter((t) => t.status === 'in-progress'),
    done: tasks.filter((t) => t.status === 'done'),
  };

  const TaskCard = ({ task }) => (
    <Card className="mb-3">
      <div className="flex justify-between items-start mb-2">
        <div className="flex-1">
          <h4 className="font-semibold text-gray-800">{task.title}</h4>
          <p className="text-sm text-gray-600">{task.description}</p>
        </div>
        {task.createdBy._id === user?.id && (
          <button
            onClick={() => handleDeleteTask(task._id)}
            className="text-red-600 hover:text-red-800"
          >
            <Trash2 size={18} />
          </button>
        )}
      </div>

      <div className="flex flex-wrap gap-2 mb-3">
        <span
          className={`px-2 py-1 text-xs rounded ${
            task.priority === 'high'
              ? 'bg-red-100 text-red-800'
              : task.priority === 'medium'
              ? 'bg-yellow-100 text-yellow-800'
              : 'bg-green-100 text-green-800'
          }`}
        >
          {task.priority}
        </span>
        <span className="text-xs text-gray-600 bg-gray-100 px-2 py-1 rounded">
          {task.project?.name}
        </span>
      </div>

      <div className="flex justify-between items-center text-sm">
        <span className="text-gray-600">👤 {task.assignedTo?.name}</span>
        {task.dueDate && (
          <span className="text-gray-600">
            📅 {new Date(task.dueDate).toLocaleDateString()}
          </span>
        )}
      </div>

      {task.status !== 'done' && (
        <div className="mt-3 flex gap-2">
          {task.status === 'todo' && (
            <Button
              size="sm"
              variant="secondary"
              onClick={() => handleUpdateTaskStatus(task._id, 'in-progress')}
              className="text-xs"
            >
              Start
            </Button>
          )}
          {task.status === 'in-progress' && (
            <Button
              size="sm"
              variant="secondary"
              onClick={() => handleUpdateTaskStatus(task._id, 'done')}
              className="text-xs"
            >
              Complete
            </Button>
          )}
        </div>
      )}
    </Card>
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-800">Tasks</h1>
        {user?.role === 'admin' && (
          <Button onClick={() => setShowForm(!showForm)} variant="primary">
            <Plus size={20} className="inline mr-2" />
            New Task
          </Button>
        )}
      </div>

      {error && <ErrorMessage message={error} onDismiss={() => setError('')} />}
      {success && <SuccessMessage message={success} onDismiss={() => setSuccess('')} />}

      {showForm && user?.role === 'admin' && (
        <Card>
          <h2 className="text-2xl font-bold mb-4">Create New Task</h2>
          <form onSubmit={handleCreateTask} className="space-y-4">
            <Input
              label="Task Title"
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="Enter task title"
            />
            <TextArea
              label="Description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Enter task description"
              rows="3"
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Select
                label="Project"
                value={formData.projectId}
                onChange={(e) => setFormData({ ...formData, projectId: e.target.value })}
                options={projects.map((p) => ({ label: p.name, value: p._id }))}
              />
              <Select
                label="Assign To"
                value={formData.assignedTo}
                onChange={(e) => setFormData({ ...formData, assignedTo: e.target.value })}
                options={users.map((u) => ({ label: u.name, value: u.id }))}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Select
                label="Priority"
                value={formData.priority}
                onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                options={[
                  { label: 'Low', value: 'low' },
                  { label: 'Medium', value: 'medium' },
                  { label: 'High', value: 'high' },
                ]}
              />
              <Input
                label="Due Date"
                type="date"
                value={formData.dueDate}
                onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
              />
            </div>
            <div className="flex gap-4">
              <Button type="submit" variant="primary">
                Create Task
              </Button>
              <Button
                type="button"
                variant="secondary"
                onClick={() => setShowForm(false)}
              >
                Cancel
              </Button>
            </div>
          </form>
        </Card>
      )}

      <Card>
        <h2 className="text-xl font-bold mb-4">Filters</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Select
            label="Status"
            value={filter.status}
            onChange={(e) => setFilter({ ...filter, status: e.target.value })}
            options={[
              { label: 'All', value: '' },
              { label: 'Todo', value: 'todo' },
              { label: 'In Progress', value: 'in-progress' },
              { label: 'Done', value: 'done' },
            ]}
          />
          <Select
            label="Project"
            value={filter.projectId}
            onChange={(e) => setFilter({ ...filter, projectId: e.target.value })}
            options={[{ label: 'All', value: '' }, ...projects.map((p) => ({ label: p.name, value: p._id }))]}
          />
        </div>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Todo Column */}
        <div>
          <h2 className="text-lg font-bold text-gray-800 mb-4">
            📝 Todo ({tasksByStatus.todo.length})
          </h2>
          {tasksByStatus.todo.map((task) => (
            <TaskCard key={task._id} task={task} />
          ))}
          {tasksByStatus.todo.length === 0 && (
            <Card className="text-center text-gray-500">No tasks</Card>
          )}
        </div>

        {/* In Progress Column */}
        <div>
          <h2 className="text-lg font-bold text-gray-800 mb-4">
            ⚙️ In Progress ({tasksByStatus['in-progress'].length})
          </h2>
          {tasksByStatus['in-progress'].map((task) => (
            <TaskCard key={task._id} task={task} />
          ))}
          {tasksByStatus['in-progress'].length === 0 && (
            <Card className="text-center text-gray-500">No tasks</Card>
          )}
        </div>

        {/* Done Column */}
        <div>
          <h2 className="text-lg font-bold text-gray-800 mb-4">
            ✅ Done ({tasksByStatus.done.length})
          </h2>
          {tasksByStatus.done.map((task) => (
            <TaskCard key={task._id} task={task} />
          ))}
          {tasksByStatus.done.length === 0 && (
            <Card className="text-center text-gray-500">No tasks</Card>
          )}
        </div>
      </div>
    </div>
  );
};
