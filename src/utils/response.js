const response = (res, status, message,) => {
  res.status(status).json({
    error: false,
    message: message,
  });
};

export { response };
