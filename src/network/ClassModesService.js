import {get, post} from './http/HttpClient';

import {classModesUrl} from './http/ApiUrl';

export function getClassModesApi(
  deviceId,
  {success, failure, autoShowMsg = true, refLoading = null} = {},
) {
  const url = [classModesUrl, deviceId].join('/');
  return get(url, {
    success,
    failure,
    autoShowMsg,
    refLoading,
  });
}

export function setClassModesApi(
  deviceId,
  body,
  {success, failure, autoShowMsg = true, refLoading = null} = {},
) {
  const url = [classModesUrl, deviceId].join('/');
  return post(url, {
    body,
    success,
    failure,
    autoShowMsg,
    refLoading,
  });
}