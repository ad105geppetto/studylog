import jwt from "jsonwebtoken";

export const generateAccessToken = (payload: Object) => {
  // Access Token 생성 함수
  return jwt.sign(payload, process.env.ACCESS_SECRET, { expiresIn: "1h" });
}

export const generateRefreshToken = (payload: Object) => {
  // Refresh Token 생성 함수
  return jwt.sign(payload, process.env.REFRESH_SECRET, { expiresIn: "1d" });
}

export const isAccessTokenExpired = (accessToken: string) => {
  // Access Token 만료인지 확인하는 함수
  try {
    return jwt.verify(accessToken, process.env.ACCESS_SECRET);
  } catch (err) {
    return null;
  }
}

export const isRefreshTokenExpired = (refreshToken: string) => {
  // Refresh Token 만료인지 확인하는 함수
  try {
    return jwt.verify(refreshToken, process.env.REFRESH_SECRET);
  } catch (err) {
    return null;
  }
}
