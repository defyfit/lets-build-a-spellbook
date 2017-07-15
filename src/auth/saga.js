import { takeLatest, call, put } from 'redux-saga/effects'
import { actionTypes, getAuthUserFail, getAuthUserSuccess } from './actions'

import AuthService from './service'
import client from '../client'

function * fetchUserProfile (action) {
  try {
    const result = yield call(client.query, {
      query: AuthService.getLoggedInUser
    })
    yield put(getAuthUserSuccess(result.data.user))
  } catch (e) {
    yield put(getAuthUserFail(e.message))
  }
}

function * authSaga () {
  yield takeLatest(actionTypes.GET_AUTH_USER, fetchUserProfile)
}

export default authSaga
