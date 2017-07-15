import { actionTypes } from './actions'

const token = localStorage.getItem('token')

const initialState = {
  justSignedUp: false,
  loading: false,
  loginError: null,
  profile: null,
  signUpError: null,
  token: (token) ? token : null
}

export function reducer (state = initialState, action) {
  switch (action.type) {
    case actionTypes.LOGIN:
      return {
        ...initialState,
        loading: true
      }

    case actionTypes.LOGIN_FAIL:
      return {
        ...initialState,
        loginError: action.payload
      }

    case actionTypes.LOGIN_SUCCESS:
      localStorage.setItem('token', action.payload)
      return {
        ...initialState,
        token: action.payload
      }

    case actionTypes.GET_AUTH_USER_SUCCESS:
      return {
        ...state,
        profile: action.payload
      }

    case actionTypes.LOGOUT:
      localStorage.removeItem('token')
      window.location.reload()
      return initialState

    case actionTypes.SIGN_UP:
      return {
        ...initialState,
        loading: true
      }

    case actionTypes.SIGN_UP_FAIL:
      return {
        ...initialState,
        signUpError: action.payload
      }

    case actionTypes.SIGN_UP_SUCCESS:
      return {
        ...initialState,
        justSignedUp: true
      }

    default:
      return state
  }
}
