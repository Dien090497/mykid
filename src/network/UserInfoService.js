import {
  loginUrl,
} from './http/ApiUrl';
import {post} from './http/HttpClient';

export function loginService(body, autoShowMsg = true) {
  return post(loginUrl, {body, autoShowMsg});
}
