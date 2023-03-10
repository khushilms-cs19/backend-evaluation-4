const axios = require('axios');

const validateToken = async (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    res.status(401).json({ message: 'Token not found' });
  } else {
    try {
      const decoded = await axios({
        method: 'post',
        url: `http://${process.env.AUTH_URL}:${process.env.AUTH_PORT}/auth/validate`,
        data: {
          token,
        },
      });
      req.user = decoded;
      next();
    } catch (err) {
      res.status(401).json({ message: 'Token is invalid' });
    }
  }
};

module.exports = validateToken;