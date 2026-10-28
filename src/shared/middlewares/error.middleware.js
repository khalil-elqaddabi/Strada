function errorHandler(err, req, res, next) {
  const status  = err.status || 500;
  const code    = err.code   || "INTERNAL_ERROR";
  const message = status === 500 ? "An unexpected error occurred." : err.message;
  res.status(status).json({ error: { code, message } });
}

module.exports = errorHandler;
