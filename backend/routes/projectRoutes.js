const express = require('express');
const {
  createProject,
  getProjects,
  getProject,
  addMember,
  updateProject,
  deleteProject,
} = require('../controllers/projectController');
const { protect } = require('../middleware/authMiddleware');
const { authorize } = require('../middleware/roleMiddleware');

const router = express.Router();

// Protect all routes
router.use(protect);

// Public routes (logged-in users)
router.get('/', getProjects);
router.get('/:id', getProject);

// Admin only routes
router.post('/', authorize('admin'), createProject);
router.patch('/:id', authorize('admin'), updateProject);
router.delete('/:id', authorize('admin'), deleteProject);
router.post('/:id/add-member', authorize('admin'), addMember);

module.exports = router;
