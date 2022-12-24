import { useReducer } from 'react'
import { User, UsersArray, UserInitArray, UserType } from './data-types/user-data-types'
import { LoginActions } from './login-reducer-action-types'
export type UserDataActionTypes = {
  type: string
  payload: UserType
}
export const UserDataReducer = (state = UserInitArray, action: UserDataActionTypes) => {
  const { type, payload } = action
  switch (type) {
    case LoginActions.CREATE_USER: {
      const newUserId = state[state.length - 1].id + 1
      const newUser = { ...payload, id: newUserId }
      return [...state, newUser]
    }
    case LoginActions.DELETE_USER: {
      const newState = state.filter((user) => user.id !== payload.id)
      return newState
    }
    default: {
      return state
    }
  }
}
