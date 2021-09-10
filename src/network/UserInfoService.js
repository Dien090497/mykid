import {
  loginUrl,
  getCaptchaUrl, createAccountUrl, changePasswordUrl,
} from "./http/ApiUrl";
import { generateRandomId } from "../functions/utils";
import { post, get, put } from "./http/HttpClient";

export function loginService(body, autoShowMsg = true) {
  return post(loginUrl, { body, autoShowMsg });
}

export function createAccountApi(data, { success, failure, autoShowMsg = true }) {
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

  return post(createAccountUrl, { body, headers, success, failure, autoShowMsg });
}

export function getCaptchaApi({ success, failure, autoShowMsg = true } = {}) {
  return get(getCaptchaUrl, { success, failure, autoShowMsg });
}

export function changePasswordApi(currentPassword, newPassword, { success, failure, autoShowMsg = true }) {
  let body = {
    currentPassword,
    newPassword
  };
  return put(changePasswordUrl, { body, success, failure, autoShowMsg });
}
