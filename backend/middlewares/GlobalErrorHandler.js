const globalErrorHandler = (err, req, res, next) => {
console.log("Error", err.message)
  return res.status(err.statusCode || 500).json({
    success: false,
    error: true,
    message: err.message || "Internal Server Error"
  });
};
export default globalErrorHandler;
