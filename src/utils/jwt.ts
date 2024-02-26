import 'dotenv/config'
import jsonWebToken, { JwtPayload } from 'jsonwebtoken'
import { UserResponse } from '../types/userType'

const generateAccessToken = (user: UserResponse): string => {
  return jsonWebToken.sign(user, String(process.env.JWT_ACCESS_SECRET_KEY), {
    expiresIn:
      process.env.JWT_ACCESS_EXPIRES_IN != null
        ? String(process.env.JWT_ACCESS_EXPIRES_IN)
        : '1800s'
  })
}

const generateRefreshToken = (user: UserResponse): string => {
  return jsonWebToken.sign(user, String(process.env.JWT_REFRESH_SECRET_KEY), {
    expiresIn:
      process.env.JWT_REFRESH_EXPIRES_IN != null
        ? String(process.env.JWT_REFRESH_EXPIRES_IN)
        : '1800s'
  })
}

const verifyRefreshToken = (token: string): string | null | JwtPayload => {
  try {
    return jsonWebToken.verify(
      token,
      String(process.env.JWT_REFRESH_SECRET_KEY)
    )
  } catch (error) {
    return null
  }
}

const parseJWT = (token: string): UserResponse => {
  return JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString())
}

const verifyAccessToken = (token: string): string | null | JwtPayload => {
  try {
    return jsonWebToken.verify(token, String(process.env.JWT_ACCESS_SECRET_KEY))
  } catch (error) {
    return null
  }
}
export {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
  parseJWT,
  verifyAccessToken
}
