const express = require('express');
const { protect, requireAdmin } = require('../middleware/authMiddleware');
const AppError = require('../utils/appError');

const router = express.Router();

// Simulated In-Memory Database
let initiatives = [
  { id: 1, title: 'Solar Canopy Expansion', priority: 'High', status: 'Active' },
  { id: 2, title: 'Campus Composting Loop', priority: 'Medium', status: 'In Review' }
];

// TODO: Use router.route('/') with METHOD CHAINING
// Chain .get() -> protected, returns all initiatives
// Chain .post() -> protected, validates body title & priority, creates & returns new initiative (201)
router.route('/')
  .get(protect, function (req, res) {
    res.json({ status: 'success', count: initiatives.length, data: initiatives });
  })
  .post(protect, function (req, res, next) {
    const title = req.body.title;
    const priority = req.body.priority;

    if (!title || !priority) {
      return next(new AppError('Title and priority are required', 400));
    }

    const item = {
      id: initiatives.length + 1,
      title: title,
      priority: priority,
      status: 'Active'
    };

    initiatives.push(item);
    res.status(201).json({ status: 'success', data: item });
  });

// TODO: Use router.route('/:id') with METHOD CHAINING
// Chain .get() -> protected, returns single initiative or 404
// Chain .delete() -> protected + requireAdmin, deletes initiative by ID or 404
router.route('/:id')
  .get(protect, function (req, res, next) {
    const id = Number(req.params.id);
    let found = null;

    for (let i = 0; i < initiatives.length; i++) {
      if (initiatives[i].id === id) {
        found = initiatives[i];
      }
    }

    if (!found) {
      return next(new AppError('Initiative not found', 404));
    }

    res.json({ status: 'success', data: found });
  })
  .delete(protect, requireAdmin, function (req, res, next) {
    const id = Number(req.params.id);
    let found = null;

    for (let i = 0; i < initiatives.length; i++) {
      if (initiatives[i].id === id) {
        found = initiatives[i];
      }
    }

    if (!found) {
      return next(new AppError('Initiative not found', 404));
    }

    let left = [];
    for (let i = 0; i < initiatives.length; i++) {
      if (initiatives[i].id !== id) {
        left.push(initiatives[i]);
      }
    }
    initiatives = left;

    res.json({ status: 'success', message: 'Initiative deleted' });
  });

module.exports = router;
