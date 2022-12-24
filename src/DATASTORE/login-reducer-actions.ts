import { FC } from 'react'
import { LoginActions } from './login-reducer-action-types'

export const createUserAction = (): LoginActions => LoginActions.CREATE_USER
export const deletUserAction = (): LoginActions => LoginActions.DELETE_USER
