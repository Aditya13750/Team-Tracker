import React, { useEffect, useState } from 'react';
import { projectAPI } from '../services/api';
import { Card, Button, Input, TextArea } from '../components/FormComponents';
import { LoadingSpinner, ErrorMessage, SuccessMessage } from '../components/StatusMessages';
import { useAuth } from '../context/AuthContext';
import { Trash2, Users, Plus } from 'lucide-react';

export const Projects = () => {
  const { user } = useAuth();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ name: '', description: '' });
  const [selectedProject, setSelectedProject] = useState(null);
  const [showMemberForm, setShowMemberForm] = useState(false);
  const [newMemberId, setNewMemberId] = useState('');

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const { data } = await projectAPI.getAll();
      setProjects(data.projects);
      setError('');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch projects');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateProject = async (e) => {
    e.preventDefault();
    if (!formData.name) {
      setError('Project name is required');
      return;
    }

    try {
      const { data } = await projectAPI.create(formData);
      setProjects([...projects, data.project]);
      setSuccess('Project created successfully!');
      setFormData({ name: '', description: '' });
      setShowForm(false);
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create project');
    }
  };

  const handleDeleteProject = async (id) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      try {
        await projectAPI.delete(id);
        setProjects(projects.filter((p) => p._id !== id));
        setSuccess('Project deleted successfully!');
        setTimeout(() => setSuccess(''), 3000);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to delete project');
      }
    }
  };

  const handleAddMember = async (e) => {
    e.preventDefault();
    if (!newMemberId) {
      setError('Member ID is required');
      return;
    }

    try {
      const { data } = await projectAPI.addMember(selectedProject._id, newMemberId);
      const updatedProjects = projects.map((p) =>
        p._id === selectedProject._id ? data.project : p
      );
      setProjects(updatedProjects);
      setSelectedProject(data.project);
      setSuccess('Member added successfully!');
      setNewMemberId('');
      setShowMemberForm(false);
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to add member');
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-800">Projects</h1>
        {user?.role === 'admin' && (
          <Button onClick={() => setShowForm(!showForm)} variant="primary">
            <Plus size={20} className="inline mr-2" />
            New Project
          </Button>
        )}
      </div>

      {error && <ErrorMessage message={error} onDismiss={() => setError('')} />}
      {success && <SuccessMessage message={success} onDismiss={() => setSuccess('')} />}

      {showForm && user?.role === 'admin' && (
        <Card>
          <h2 className="text-2xl font-bold mb-4">Create New Project</h2>
          <form onSubmit={handleCreateProject} className="space-y-4">
            <Input
              label="Project Name"
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Enter project name"
            />
            <TextArea
              label="Description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Enter project description"
              rows="4"
            />
            <div className="flex gap-4">
              <Button type="submit" variant="primary">
                Create Project
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

      {selectedProject && (
        <Card>
          <div className="flex justify-between items-start mb-4">
            <div>
              <h2 className="text-2xl font-bold text-gray-800">{selectedProject.name}</h2>
              <p className="text-gray-600">{selectedProject.description}</p>
            </div>
            <button
              onClick={() => setSelectedProject(null)}
              className="text-2xl text-gray-400 hover:text-gray-600"
            >
              ×
            </button>
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-3">
              <Users size={20} className="inline mr-2" />
              Members ({selectedProject.members?.length || 0})
            </h3>
            <div className="space-y-2">
              {selectedProject.members?.map((member) => (
                <div
                  key={member._id}
                  className="flex justify-between items-center bg-gray-100 p-3 rounded"
                >
                  <div>
                    <p className="font-semibold">{member.name}</p>
                    <p className="text-sm text-gray-600">{member.email}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {selectedProject.admin._id === user?.id && (
            <>
              {showMemberForm ? (
                <form onSubmit={handleAddMember} className="bg-blue-50 p-4 rounded mb-4">
                  <Input
                    label="Member ID"
                    type="text"
                    value={newMemberId}
                    onChange={(e) => setNewMemberId(e.target.value)}
                    placeholder="Enter member ID"
                  />
                  <div className="flex gap-4 mt-4">
                    <Button type="submit" variant="primary">
                      Add Member
                    </Button>
                    <Button
                      type="button"
                      variant="secondary"
                      onClick={() => setShowMemberForm(false)}
                    >
                      Cancel
                    </Button>
                  </div>
                </form>
              ) : (
                <Button
                  onClick={() => setShowMemberForm(true)}
                  variant="secondary"
                  className="mb-4"
                >
                  + Add Member
                </Button>
              )}
            </>
          )}
        </Card>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <Card
            key={project._id}
            className="cursor-pointer hover:shadow-lg transition-shadow"
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-xl font-bold text-gray-800">{project.name}</h3>
                <p className="text-sm text-gray-600 mt-1">{project.description}</p>
              </div>
              {project.admin._id === user?.id && (
                <button
                  onClick={() => handleDeleteProject(project._id)}
                  className="text-red-600 hover:text-red-800"
                >
                  <Trash2 size={20} />
                </button>
              )}
            </div>

            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">
                👥 {project.members?.length || 0} members
              </span>
              <span
                className={`px-3 py-1 rounded-full text-xs font-semibold ${
                  project.status === 'active'
                    ? 'bg-green-100 text-green-800'
                    : 'bg-gray-100 text-gray-800'
                }`}
              >
                {project.status}
              </span>
            </div>

            <button
              onClick={() => setSelectedProject(project)}
              className="mt-4 w-full btn btn-primary"
            >
              View Details
            </button>
          </Card>
        ))}
      </div>

      {projects.length === 0 && (
        <Card className="text-center py-12">
          <p className="text-gray-600 text-lg">No projects yet</p>
          {user?.role === 'admin' && (
            <p className="text-gray-500 text-sm mt-2">
              Click "New Project" to create your first project
            </p>
          )}
        </Card>
      )}
    </div>
  );
};
