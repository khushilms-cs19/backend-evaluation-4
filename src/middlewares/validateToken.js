const axios = require('axios');

const validateToken = async (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    res.status(401).json({ message: 'Token not found' });
  } else {
    const decoded = await axios({
      method: 'post',
      url: 'http://localhost:5000/auth/validate',
      data: {
        token,
      },
    });
    req.user = decoded;
    next();
  }
};

module.exports = validateToken;