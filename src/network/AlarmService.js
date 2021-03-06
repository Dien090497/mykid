import {get, post} from './http/HttpClient';

import {alarmUrl} from './http/ApiUrl';

export function getAlarmsApi(
  deviceId,
  {success, failure, autoShowMsg = true, refLoading = null, refNotification = null} = {},
) {
  const url = [alarmUrl, deviceId].join('/');
  return get(url, {
    success,
    failure,
    autoShowMsg,
    refLoading,
    refNotification
  });
}

export function setAlarmApi(
  deviceId,
  body,
  {success, failure, autoShowMsg = true, refLoading = null, refNotification = null} = {},
) {
  const url = [alarmUrl, deviceId].join('/');
  return post(url, {
    body,
    success,
    failure,
    autoShowMsg,
    refLoading,
    refNotification
  });
}
