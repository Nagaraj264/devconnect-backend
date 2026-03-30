export const errorHandler = (err, req, res, next) => {
  console.error("🔥 Error:", err);
  const statusCode = err.statusCode || 500;
  
  res.status(statusCode).json({
    message: err.message || "Something went wrong on the server",
    // Only show the full error stack in development mode for security
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
    errors: err.errors || []
  });
};