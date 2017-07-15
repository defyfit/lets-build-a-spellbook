export const actionTypes = {
  GET_AUTH_USER: '[Auth] Get Auth User',
  GET_AUTH_USER_SUCCESS: '[Auth] Get Auth User Success',
  GET_AUTH_USER_FAIL: '[Auth] Get Auth User Failed',

  LOGIN: '[Auth] Login Auth',
  LOGIN_SUCCESS: '[Auth] Login Success',
  LOGIN_FAIL: '[Auth] Login Fail',

  LOGOUT: '[Auth] Logout',

  SIGN_UP: '[Auth] SignUp',
  SIGN_UP_SUCCESS: '[Auth] SignUp Success',
  SIGN_UP_FAIL: '[Auth] SignUp Fail'


}

export function login () {
  return {
    type: actionTypes.LOGIN
  }
}

export function logout () {
  return {
    type: actionTypes.LOGOUT
  }
}

export function loginSuccess (token) {
  return {
    type: actionTypes.LOGIN_SUCCESS,
    payload: token
  }
}

export function getAuthUser () {
  return {
    type: actionTypes.GET_AUTH_USER
  }
}

export function getAuthUserFail (msg) {
  return {
    type: actionTypes.GET_AUTH_USER_FAIL,
    payload: msg
  }
}

export function getAuthUserSuccess (profile) {
  return {
    type: actionTypes.GET_AUTH_USER_SUCCESS,
    payload: profile
  }
}

export function loginFail (message) {
  return {
    type: actionTypes.LOGIN_FAIL,
    payload: message
  }
}

export function signUp () {
  return {
    type: actionTypes.SIGN_UP
  }
}

export function signUpSuccess () {
  return {
    type: actionTypes.SIGN_UP_SUCCESS
  }
}

export function signUpFail (message) {
  return {
    type: actionTypes.SIGN_UP_FAIL,
    payload: message
  }
}
