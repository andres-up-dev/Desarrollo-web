const AppError = require('../utils/appError');

// TODO: Implement 'protect' middleware
// 1. Extract 'authorization' header from req.headers
// 2. Check if header exists and starts with 'Bearer '
// 3. Extract token string
// 4. Validate token:
//    - If token === 'sustain-user-token', attach req.user = { id: 101, name: 'Elena', role: 'user' }
//    - If token === 'sustain-admin-token', attach req.user = { id: 999, name: 'Prof. Gabriel', role: 'admin' }
//    - Otherwise, pass next(new AppError('Unauthorized: Invalid or missing token', 401))
function protect(req, res, next) {
  const header = req.headers.authorization;

  if (!header || !header.startsWith('Bearer ')) {
    return next(new AppError('Unauthorized: Invalid or missing token', 401));
  }

  const token = header.split(' ')[1];

  if (token === 'sustain-user-token') {
    req.user = { id: 101, name: 'Elena', role: 'user' };
    return next();
  }

  if (token === 'sustain-admin-token') {
    req.user = { id: 999, name: 'Prof. Gabriel', role: 'admin' };
    return next();
  }

  return next(new AppError('Unauthorized: Invalid or missing token', 401));
}

// TODO: Implement 'requireAdmin' middleware
// 1. Verify if req.user exists and req.user.role === 'admin'
// 2. If true, call next()
// 3. Otherwise, pass next(new AppError('Forbidden: Admin privilege required for this action', 403))
function requireAdmin(req, res, next) {
  if (req.user && req.user.role === 'admin') {
    return next();
  }

  return next(new AppError('Forbidden: Admin privilege required for this action', 403));
}

module.exports = { protect, requireAdmin };
