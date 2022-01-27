import {post, get} from './http/HttpClient';

import {createVideoCallUrl} from './http/ApiUrl';

export function createVideoCallApi(
  body,
  {success, failure, autoShowMsg = true, refLoading = null, refNotification = null} = {},
) {
  const url = [createVideoCallUrl].join('/');
  return post(url, {body, success, failure, autoShowMsg, refLoading, refNotification});
}
export function finishVideoCallApi(
  body,
  id,
  {success, failure, autoShowMsg = true, refLoading = null, refNotification = null} = {},
) {
  const url = [createVideoCallUrl, id, 'finish'].join('/');
  return post(url, {body, success, failure, autoShowMsg, refLoading, refNotification});
}
export function rejectVideoCallApi(
  body,
  id,
  {success, failure, autoShowMsg = true, refLoading = null, refNotification = null} = {},
) {
  const url = [createVideoCallUrl, id, 'reject'].join('/');
  return post(url, {body, success, failure, autoShowMsg, refLoading, refNotification});
}

export function getInfoVideoCallApi(
  id,
  {success, failure, autoShowMsg = true, refLoading = null, refNotification = null} = {},
) {
  const url = [createVideoCallUrl, id, 'status'].join('/');
  return get(url, { success, failure, autoShowMsg, refLoading, refNotification});
}
