interface UserType {
  id: string
  email: string
  name: string
  password: string
  confirmPassword?: string
  role: string
  createdAt?: Date
  updatedAt?: Date
}

interface UserResponse {
  id: string
  email: string
  name: string
  role: string
  createdAt?: Date
  updatedAt?: Date
}

export { UserType, UserResponse }
