const jwt = require("jsonwebtoken");

export default {
  generateAccessToken: (payload) => {
    return jwt.sign(payload, process.env.ACCESS_SECRET, { expiresIn: "10s" });
  },
  isAccessTokenExpired: (accessToken) => {
    try {
      return jwt.verify(accessToken, process.env.ACCESS_SECRET);
    } catch (err) {
      return null;
    }
  },
  isRefreshTokenExpired: (refreshToken) => {
    try {
      return jwt.verify(refreshToken, process.env.REFRESH_SECRET);
    } catch (err) {
      return null;
    }
  }
}