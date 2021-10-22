import {
  loginUrl,
  getCaptchaUrl, createAccountUrl, changePasswordUrl, soundModesUrl, watchsUrl, getOTP, accountDetailUrl,
} from "./http/ApiUrl";
import { generateRandomId } from "../functions/utils";
import { post, get, put } from "./http/HttpClient";

export function loginService(body, autoShowMsg = true, refLoading = null) {
  return post(loginUrl, { body, autoShowMsg, refLoading });
}

export function createAccountApi(data, { success, failure, autoShowMsg = true, refLoading = null }) {
  let body = {
    email: data.email,
    password: data.password,
  };
  const headers = {
    "Accept": "application/json",
    "Content-type": "application/json",
    "request-id": generateRandomId(5).toLowerCase(),
    "X-Captcha-Answer":  parseInt(data.answer),
    "X-Captcha-Id":  data.captchaId,
  };

  return post(createAccountUrl, { body, headers, success, failure, autoShowMsg, refLoading });
}

export function getCaptchaApi({ success, failure, autoShowMsg = true, refLoading = null } = {}) {
  return get(getCaptchaUrl, { success, failure, autoShowMsg, refLoading });
}

export function changePasswordApi(currentPassword, newPassword, { success, failure, autoShowMsg = true, refLoading = null }) {
  let body = {
    currentPassword,
    newPassword
  };
  return put(changePasswordUrl, { body, success, failure, autoShowMsg, refLoading });
}

export function getSoundModesApi(deviceId, { success, failure, autoShowMsg = true, refLoading = null } = {}) {
  const url = [soundModesUrl, deviceId].join('/');
  return get(url, { success, failure, autoShowMsg, refLoading });
}

export function setSoundModesApi(deviceId, mode, { success, failure, autoShowMsg = true, refLoading = null } = {}) {
  const url = [soundModesUrl, deviceId].join('/');

  const body = { mode };
  return post(url, { body, success, failure, autoShowMsg, refLoading });
}

export function findWatchsApi(deviceId, { success, failure, autoShowMsg = true, refLoading = null } = {}) {
  const url = [watchsUrl, deviceId, 'find'].join('/');
  return get(url, { success, failure, autoShowMsg, refLoading });
}

export function getOtpApi(
  phone, { success, failure, autoShowMsg = true, refLoading = null } = {}) {
  let body = {
    phone
  }
  return post(getOTP, { body, autoShowMsg, success, failure, refLoading });
}

export function createAndLogin(data, { success, failure, autoShowMsg = true, refLoading = null }) {
  let body = {
    phone: data.phone,
    password: data.password,
  };
  const headers = {
    "Accept": "application/json",
    "Content-type": "application/json",
    "X-OTP-Code":  data.otp,
  };
  console.log(headers)

  return post(accountDetailUrl, { body, headers, success, failure, autoShowMsg, refLoading });
}
