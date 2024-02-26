import { NextFunction, Request, Response } from 'express'
import {
  inputUserValidation,
  loginUserValidation
} from '../validations/userValidation'
import { createUser, userLogin } from '../services/userService'
import { encrypt, compare } from '../utils/bcrypt'
import { UserResponse, UserType } from '../types/userType'
import {
  generateAccessToken,
  generateRefreshToken,
  parseJWT,
  verifyRefreshToken
} from '../utils/jwt'

export const registerUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | undefined> => {
  try {
    const { error, value } = inputUserValidation(req.body)

    if (error != null) {
      return res.status(400).json({
        error: error.details[0].message,
        message: 'register user failed',
        data: value
      })
    }

    // encrypt password
    value.password = encrypt(value.password)
    delete value.confirmPassword

    const user = await createUser(value)

    return res.status(201).json({
      error: null,
      message: 'register user successfully',
      data: user
    })
  } catch (error: Error | unknown) {
    next(
      new Error(
        'Error on src/controller/userController.ts: registerUser - ' +
          String((error as Error).message)
      )
    )
  }
}

export const loginUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | undefined> => {
  try {
    const { error, value } = loginUserValidation(req.body)

    if (error != null) {
      return res.status(400).json({
        error: error.details[0].message,
        message: 'login user failed',
        data: null
      })
    }

    const user = await userLogin(value)

    if (user === null) {
      return res.status(404).json({
        error: 'email or password wrong',
        message: 'login user failed',
        data: null
      })
    }

    if (!compare(value.password, user.password)) {
      return res.status(400).json({
        error: 'email or password wrong',
        message: 'login user failed',
        data: null
      })
    }
    const loginResponse: UserResponse = {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role
    }

    const accessToken = generateAccessToken(loginResponse)
    const refreshToken = generateRefreshToken(loginResponse)

    return res.status(200).json({
      error: null,
      message: 'login user successfully',
      data: loginResponse,
      accessToken,
      refreshToken
    })
  } catch (error: Error | unknown) {
    next(
      new Error(
        'Error on src/controller/userController.ts: loginUser - ' +
          String((error as Error).message)
      )
    )
  }
}

export const refreshToken = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | undefined> => {
  try {
    const authHeader = req.headers.authorization
    const token = authHeader?.split(' ')[1]

    if (token === undefined) {
      return res.status(401).json({
        error: 'Unauthorized',
        message: 'verification token failed',
        data: null
      })
    }

    const verifyToken = verifyRefreshToken(token)

    if (verifyToken === null) {
      return res.status(401).json({
        error: 'Invalid token',
        message: 'Refresh token failed',
        data: null
      })
    }

    const data = parseJWT(token)

    const checkUser: UserType = {
      id: data.id,
      email: data.email,
      name: data.name,
      role: data.role,
      password: 'xxxx'
    }

    const user = await userLogin(checkUser)

    if (user === null) {
      return res.status(401).json({
        error: 'Invalid token',
        message: 'Refresh token failed',
        data: null
      })
    }

    const refreshTokenResponse: UserResponse = {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role
    }

    const accessToken = generateAccessToken(refreshTokenResponse)
    const newRefreshToken = generateRefreshToken(refreshTokenResponse)

    return res.status(200).json({
      error: null,
      message: 'refresh token successfully',
      data: refreshTokenResponse,
      accessToken,
      refreshToken: newRefreshToken
    })
  } catch (error: Error | unknown) {
    next(
      new Error(
        'Error on src/controller/userController.ts: refreshToken - ' +
          String((error as Error).message)
      )
    )
  }
}
