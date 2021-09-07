import {call, put} from 'redux-saga/effects';
import {loginService} from '../../network/UserInfoService';
import {hideLoading, saveUserDataFromToken, showAlert, showLoading} from '../../functions/utils';
import {ErrorMsg} from '../../assets/strings/ErrorMsg';
import reduxStore from '../config/redux';
import loginAction from '../actions/loginAction';

function* postLoginAction(username, password, refLoading) {
  try {
    showLoading(refLoading);
    let phoneFormat = username;
    if (username && username !== '') {
      if (username[0] === '0') {
        phoneFormat = username.replace('0', '+84');
      }
    }
    let params = {
      phone_number: phoneFormat,
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
        reduxStore.store.dispatch(loginAction.loginSuccess({userInfo}));
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
  yield call(postLoginAction, action.payload.username, action.payload.password, action.payload.refLoading);
}
