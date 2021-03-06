import {dele, get, path, post, put} from './http/HttpClient';

import {safeZoneUrl} from './http/ApiUrl';

export function getListSafeZoneApi(
  deviceId,
  page,
  size,
  {success, failure, autoShowMsg = true, refLoading = null, refNotification = null} = {},
) {
  let params = {
    page,
    size,
  };
  let url = [safeZoneUrl, deviceId, 'zones'].join('/');
  return get(url, {params, success, failure, autoShowMsg, refLoading, refNotification});
}

export function createSafeZoneApi(
  deviceId,
  body,
  {success, failure, autoShowMsg = true, refLoading = null, refNotification = null} = {},
) {
  const url = [safeZoneUrl, deviceId, 'zones'].join('/');
  return post(url, {body, success, failure, autoShowMsg, refLoading, refNotification});
}

export function getSafeZoneDetailApi(
  deviceId,
  zoneId,
  {success, failure, autoShowMsg = true, refLoading = null, refNotification = null} = {},
) {
  const url = [safeZoneUrl, deviceId, 'zones', zoneId].join('/');
  return get(url, {success, failure, autoShowMsg, refLoading, refNotification});
}

export function updateSafeZoneApi(
  deviceId,
  zoneId,
  body,
  {success, failure, autoShowMsg = true, refLoading = null, refNotification = null} = {},
) {
  const url = [safeZoneUrl, deviceId, 'zones', zoneId].join('/');
  return put(url, {body, success, failure, autoShowMsg, refLoading, refNotification});
}

export function deleteSafeZoneApi(
  deviceId,
  zoneId,
  {success, failure, autoShowMsg = true, refLoading = null, refNotification = null} = {},
) {
  const url = [safeZoneUrl, deviceId, 'zones', zoneId].join('/');
  return dele(url, {success, failure, autoShowMsg, refLoading, refNotification});
}
