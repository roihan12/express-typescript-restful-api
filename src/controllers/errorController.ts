import { NextFunction, Request, Response } from 'express'
import { logger } from '../utils/winston'
import { parseJWT, verifyAccessToken } from '../utils/jwt'
import { UserResponse } from '../types/userType'

export interface UserRequest extends Request {
  user?: UserResponse
}

export const errorHandling = (
  err: Error,
  req: Request,
  res: Response
): void => {
  console.log(err)
  const message = err.message.split(' - ')[1]
  logger.error(err)
  res.status(500).json({
    error: message,
    message: 'Internal Server Error',
    data: null
  })
}

export const notFound = (req: Request, res: Response): void => {
  res.status(404).json({
    error: 'Not Found',
    message: 'Not found',
    data: null
  })
}

export const authenticated = (
  req: UserRequest,
  res: Response,
  next: NextFunction
): Response | void => {
  const authHeader = req.headers.authorization
  const token = authHeader?.split(' ')[1]

  if (token === undefined) {
    return res.status(401).json({
      error: 'Unauthorized',
      message: 'Please login first',
      data: null
    })
  }

  const verifyUser = verifyAccessToken(String(token))

  if (verifyUser === null) {
    return res.status(401).json({
      error: 'Unauthorized',
      message: 'Invalid token',
      data: null
    })
  }

  const user = parseJWT(String(token))
  req.user = user

  next()
}
