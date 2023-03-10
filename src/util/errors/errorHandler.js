const HttpError = require('./httpError');
const handleError = (err, res) => {
  console.log(err);
  if (err instanceof HttpError) {
    res.status(err.status).json({
      message: err.message,
    });
  } else {
    res.status(500).json({
      message: 'Internal Server Error',
    });
  }
};

module.exports = {
  handleError,
};