import {post} from './http/HttpClient';

import Consts from '../functions/Consts';
import {createVideoCalllUrl} from './http/ApiUrl';

export function DoSecretShoot(
  deviceId,
  {success, failure, autoShowMsg = true, refLoading = null} = {},
) {
  const url = [createVideoCalllUrl,deviceId,'remote-capture'].join('/');
  return post(url, { success, failure, autoShowMsg, refLoading});
}
