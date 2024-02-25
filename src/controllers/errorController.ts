import { Request, Response } from 'express'
import { logger } from '../utils/winston'

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
