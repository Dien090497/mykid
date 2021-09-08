import {
  loginUrl,
  getCaptchaUrl
} from './http/ApiUrl';
import {post, get} from './http/HttpClient';

export function loginService(body, autoShowMsg = true) {
  return post(loginUrl, {body, autoShowMsg});
}

export function getCaptchaApi({success, failure, autoShowMsg = true} = {}) {
  return get(getCaptchaUrl, {success, failure, autoShowMsg});
}