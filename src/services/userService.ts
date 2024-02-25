import { UserResponse, UserType } from '../types/userType'
import prisma from '../utils/client'

export const createUser = async (payload: UserType): Promise<UserResponse> => {
  const data = await prisma.user.create({
    data: {
      ...payload
    },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      createdAt: true
    }
  })

  return data
}
