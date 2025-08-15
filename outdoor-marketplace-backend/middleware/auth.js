// middleware/auth.js
module.exports = (req, res, next) => {
  // For testing, just pass through
  // TODO: Add real JWT verification later
  req.userId = 'test-user-id';
  next();
};