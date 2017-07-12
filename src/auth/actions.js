/*
  Actions within this folder are specific to the 'auth' feature.

  Remember an action in redux is essentially something that happens
  within our application.

  The following examples show what might be the beginning of an
  action set for an authentication module
 */

export const actionTypes = {
  /*
    You've probably wondered or are wondering "why three actions
    just for logging in"?

    Redux works off of actions. So essentially when we dispatch the
    official "LOGIN" action a reducer will have a chance to change
    anything that it might need to. In our case it changes the
    "loading" property in the auth state to true.

    The other two actions are essentially the result of what we
    got back from the server. If the server returned us a successful
    message with data we can dispatch the LOGIN_SUCCESS action so
    that our reducer knows what to change appropriately. If we
    receive an error from the server we can dispatch the LOGIN_ERROR
    action for the same reason.
   */
  LOGIN: '[Auth] Login',
  LOGIN_SUCCESS: '[Auth] Login Success',
  LOGIN_ERROR: '[Auth] Login Error',

  LOGOUT: '[Auth] Logout]',

  SET_PROFILE: '[Auth] Set Profile',

  SIGN_UP: '[Auth] Register',
  SIGN_UP_SUCCESS: '[Auth] Register Success',
  SIGN_UP_ERROR: '[Auth] Register Error'
}

/*
  All of the below functions are called Action Creators.

  They're simple functions that return the appropriate action
  (type and payload) so that there's only one location that has
  to worry about the action syntax. In other words by using
  these you are potentially saving yourself some repetition and
  weird bugs down the road.
 */
export function login () {
  return {
    type: actionTypes.LOGIN
  }
}

export function loginSuccess (signinUserData) {
  return {
    type: actionTypes.LOGIN_SUCCESS,
    payload: signinUserData
  }
}

export function loginError (message) {
  return {
    type: actionTypes.LOGIN_ERROR,
    payload: message
  }
}

export function logout () {
  return {
    type: actionTypes.LOGOUT
  }
}

export function setProfile (profileData) {
  return {
    type: actionTypes.SET_PROFILE,
    payload: profileData
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

export function signUpError (message) {
  return {
    type: actionTypes.SIGN_UP_ERROR,
    payload: message
  }
}
