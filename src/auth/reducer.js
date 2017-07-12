import { actionTypes } from './actions'

const token = localStorage.getItem('token')

export const initialState = {
  error: null,
  loggingIn: false,
  token: (token) ? token : null
}

export function reducer (state = initialState, action) {
  switch (action.type) {
    case actionTypes.LOGIN:
      return {
        error: null,
        loggingIn: true,
        token: null
      }

    case actionTypes.LOGIN_SUCCESS:
      localStorage.setItem('token', action.payload.token)
      return {
        error: null,
        loggingIn: false,
        token: action.payload.token
      }

    case actionTypes.LOGIN_ERROR:
      return {
        error: action.payload,
        loggingIn: false,
        token: null
      }

    case actionTypes.LOGOUT:
      localStorage.removeItem('token')
      window.location.reload()
      return state

    default:
      return state
  }
}
