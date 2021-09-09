import {call, put} from 'redux-saga/effects';
import {
  hideLoading,
  saveUserDataFromToken,
  showAlert,
  showLoading,
} from '../../functions/utils';

import Consts from '../../functions/Consts';
import {ErrorMsg} from '../../assets/strings/ErrorMsg';
import loginAction from '../actions/loginAction';
import {loginService} from '../../network/UserInfoService';
import reduxStore from '../config/redux';

function* postLoginAction(email, password, refLoading) {
  try {
    showLoading(refLoading);
    let params = {
      email: email,
      password: password,
    };
    let response = yield call(loginService, params);
    if (response.success) {
      const token = response.success.data.token;
      if (!token) {
        hideLoading(refLoading);
        showAlert(ErrorMsg.parseUserTokenFailed);
        return;
      }
      saveUserDataFromToken(token).then(token => {
        reduxStore.store.dispatch(loginAction.loginSuccess({isLoggedIn: true , token: token}));
      });
    } else {
      yield put({type: 'LOGIN_FAILURE', payload: response.failure});
    }
    hideLoading(refLoading);
  } catch (err) {
    hideLoading(refLoading);
    yield put({type: 'LOGIN_FAILURE', err});
  }
}

export default function* (action) {
  yield call(
    postLoginAction,
    action.payload.email,
    action.payload.password,
    action.payload.refLoading,
  );
}
