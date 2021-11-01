import {get, post} from './http/HttpClient';

import {eacesDropUrl} from './http/ApiUrl';
export function getPhoneApi(
  deviceId,
  {success, failure, autoShowMsg = true, refLoading = null, refNotification = null} = {},
) {
  const url = [eacesDropUrl, deviceId].join('/');
  return get(url, {
    success,
    failure,
    autoShowMsg,
    refLoading,
    refNotification,
  });
}

export function setEacesDropApi(
  deviceId,
  body,
  {success, failure, autoShowMsg = true, refLoading = null, refNotification = null} = {},
)
{
  const url = [eacesDropUrl, deviceId].join('/');
  return post(url, {
    body,
    success,
    failure,
    autoShowMsg,
    refLoading,
    refNotification,
  });
}
