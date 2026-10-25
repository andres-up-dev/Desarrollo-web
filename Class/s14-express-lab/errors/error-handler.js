export class WeatherError extends Error {
  constructor(message, statusCode = 500) {
    super(message);
    this.statusCode = statusCode;
  }
}

export function errorMiddleware(err, req, res, next) {
  const code = err.statusCode || 500;
  res.status(code).json({ error: err.message || 'Unknown error' });
}
