
const isAdmin = (req, res, next) => {
  // req.user is set by auth middleware
  if (req.user.role !== 'admin') {
    const err = new Error('Access denied: Admins only');
    err.statusCode = 403;
    return next(err);
  }
  next();
};

module.exports = isAdmin;