module.exports.checkAdminRole = (req, res, next) => {
  try {
    const { role } = req.user;
    if (role === 'admin') {
      return next();
    }

    return res.status(403).json({
      message: 'Unauthorized, role:' + role,
    });
  } catch (e) {
    return next(e);
  }
};
