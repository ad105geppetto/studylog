const jwt = require("jsonwebtoken");


export const generateAccessToken = (payload) => {
  return jwt.sign(payload, process.env.ACCESS_SECRET, { expiresIn: "1h" });
}
export const generateRefreshToken = (payload) => {
  return jwt.sign(payload, process.env.REFRESH_SECRET, { expiresIn: "1d" });
}
export const isAccessTokenExpired = (accessToken) => {
  try {
    return jwt.verify(accessToken, process.env.ACCESS_SECRET);
  } catch (err) {
    return null;
  }
}
export const isRefreshTokenExpired = (refreshToken) => {
  try {
    return jwt.verify(refreshToken, process.env.REFRESH_SECRET);
  } catch (err) {
    return null;
  }
}
