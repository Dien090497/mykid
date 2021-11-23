import {call, put} from 'redux-saga/effects';
import {
  hideLoading,
  saveUserDataFromToken,
  showLoading,
} from '../../functions/utils';
import {ErrorMsg} from '../../assets/strings/ErrorMsg';
import loginAction from '../actions/loginAction';
import { createTokenFirebase, loginService } from "../../network/UserInfoService";
import reduxStore from '../config/redux';
import SimpleToast from "react-native-simple-toast";
import DataLocal from "../../data/dataLocal";

function* postLoginAction(phone, password, refLoading, refNotification) {
  try {
    showLoading(refLoading);
    let params = {
      phone: phone,
      password: password,
    };
    let response = yield call(loginService, params, true, refLoading, refNotification);
    if (response.success) {
      const token = response.success.data.token;
      if (!token) {
        hideLoading(refLoading);
        SimpleToast.show(ErrorMsg.parseUserTokenFailed)
        return;
      }

      saveUserDataFromToken(token).then(userInfo => {
        reduxStore.store.dispatch(loginAction.loginSuccess(userInfo));
         createTokenFirebase(DataLocal.tokenFirebase, {
           success: resData => {
           },
          }).then();
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
    action.payload.phone,
    action.payload.password,
    action.payload.refLoading,
    action.payload.refNotification
  );
}
