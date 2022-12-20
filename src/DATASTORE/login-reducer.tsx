import { useReducer } from 'react'
import { User, UsersArray, UserInitArray, UserType } from './data-types/user-data-types'
export type ActionTypes = { type: string; payload: UserType }
export const UserDataReducer = (state = UserInitArray, action: ActionTypes) => {
  const { type, payload } = action
  switch (type) {
    case 'create': {
      return [...state, payload]
    }
    case 'delete': {
      return payload
    }
    default: {
      return state
    }
  }
}
