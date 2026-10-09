const express = require('express');
const AppError = require('../utils/appError');

const router = express.Router();

router.post('/login', function (req, res, next) {
  const role = req.body.role;

  if (role === 'admin') {
    return res.json({
      status: 'success',
      message: 'Logged in as Administrator',
      token: 'sustain-admin-token',
      user: { name: 'Prof. Gabriel', role: 'admin' }
    });
  }

  if (role === 'user') {
    return res.json({
      status: 'success',
      message: 'Logged in as Researcher',
      token: 'sustain-user-token',
      user: { name: 'Elena', role: 'user' }
    });
  }

  next(new AppError('Invalid login role specified. Use "user" or "admin".', 400));
});

module.exports = router;
