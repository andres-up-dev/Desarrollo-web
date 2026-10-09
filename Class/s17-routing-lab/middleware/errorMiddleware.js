function errorMiddleware(err, req, res, next) {
  let code = err.statusCode || 500;
  res.status(code).json({
    status: 'fail',
    message: err.message
  });
}

module.exports = { errorMiddleware };
