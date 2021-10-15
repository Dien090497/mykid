import {post} from './http/HttpClient';

import Consts from '../functions/Consts';
import {  PhotoShootUrl } from "./http/ApiUrl";

export function DoSecretShoot(
  deviceId,
  {success, failure, autoShowMsg = true, refLoading = null} = {},
) {
  const url = [PhotoShootUrl,deviceId,'remote-capture'].join('/');
  return post(url, { success, failure, autoShowMsg, refLoading});
}
