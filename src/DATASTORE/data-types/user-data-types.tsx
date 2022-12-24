export type UserType = {
  id: number
  name: string
  email: string
  personalID: number
  isValid: boolean
}

export const User: UserType = {
  id: 0,
  name: '',
  email: '',
  personalID: 0,
  isValid: false,
}

export type UsersArray = UserType[]

export const UserInitArray: UserType[] = [User]
