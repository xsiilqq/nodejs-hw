export const notFoundHandler = (req, res) => {
  void req;

  res.status(404).json({
    message: 'Route not found',
  });
};
