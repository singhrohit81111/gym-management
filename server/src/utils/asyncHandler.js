const asyncHandler = (funcHanlder) => (req, res, next) =>
  Promise.resolve(funcHanlder(req, res, next)).catch((err) => next(err));

module.exports = asyncHandler;
