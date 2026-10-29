export default function errorHandler(err, req, res, next) {
    // 1. Afficher l'erreur complète dans le terminal
  console.error('========== ERROR DEBUG ==========');
  console.error('Method:', req.method);
  console.error('URL:', req.originalUrl);
  console.error('Name:', err.name);
  console.error('Message:', err.message);
  console.error('Stack:', err.stack);
  console.error('Status:', err.statusCode || err.status);
  console.error('Code:', err.code);
  console.error('=================================');
  const status  = err.status || 500;
  const code    = err.code   || "INTERNAL_ERROR";
  const message = status === 500 ? "An unexpected error occurred." : err.message;
  res.status(status).json({ error: { code, message } });
}
