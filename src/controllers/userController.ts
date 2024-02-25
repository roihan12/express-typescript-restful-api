import { NextFunction, Request, Response } from 'express'
import { inputUserValidation } from '../validations/userValidation'
import { createUser } from '../services/userService'
import { encrypt } from '../utils/bcrypt'

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
