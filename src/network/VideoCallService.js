import {post} from './http/HttpClient';

import Consts from '../functions/Consts';
import {createVideoCalllUrl} from './http/ApiUrl';

export function createVideoCalllApi(
  body,
  {success, failure, autoShowMsg = true, refLoading = null} = {},
) {
  const url = [createVideoCalllUrl].join('/');
  return post(url, {body, success, failure, autoShowMsg, refLoading});
}
export function finishVideoCalllApi(
  body,
  id,
  {success, failure, autoShowMsg = true, refLoading = null} = {},
) {
  const url = [createVideoCalllUrl, id, 'finish'].join('/');
  return post(url, {body, success, failure, autoShowMsg, refLoading});
}
