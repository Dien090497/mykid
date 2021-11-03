import {get, post} from './http/HttpClient';

import {HealthUrl} from './http/ApiUrl';
export function  getListWalkingTime(
  deviceId,
  {success, failure, autoShowMsg = true, refLoading = null, refNotification = null} = {},
) {

  const url = [HealthUrl, 'devices',deviceId].join('/');
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
  const url = [HealthUrl, deviceId].join('/');
  return post(url, {
    body,
    success,
    failure,
    autoShowMsg,
    refLoading,
    refNotification,
  });
}
