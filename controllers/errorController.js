module.exports = (err, req, res, next) => {
  res.status(404).json({
    status: 'failed',
    ok: false,
    message: err.message
  })
  next();
};