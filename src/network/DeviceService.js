import {dele, get, path, post} from './http/HttpClient';
import {alarmUrl, deleteDeviceUrl, deviceUrl, listDeviceUrl, locationDeviceUrl} from './http/ApiUrl';
import Consts from '../functions/Consts';

export function getListDeviceConnected(payload) {
  const url = `${listDeviceUrl}?accountId=${payload?.accountId || ''}&page=${
    payload?.page || Consts.pageDefault
  }&status=ACTIVE&size=${payload?.size || Consts.maxSizeInPage}`;
  return get(url);
}

export function getListDeviceApi(
  accountId,
  page,
  size,
  deviceId,
  status,
  {success, failure, autoShowMsg = true, refLoading = null} = {},
) {
  let params = {
    accountId: accountId || '',
    status: status || '',
    page,
    size,
    deviceId: deviceId || '',
    sort: 'createdAt:ASC',
  };
  return get(listDeviceUrl, {
    params,
    success,
    failure,
    autoShowMsg,
    refLoading,
  });
}

export function addDeviceApi(
  imeiCode,
  deviceName,
  icon,
  relationship,
  relationshipName,
  {success, failure, autoShowMsg = true, refLoading = null} = {},
) {
  let body = {
    imeiCode,
    deviceName,
    icon,
    relationship,
    relationshipName,
  };
  return post(listDeviceUrl, {body, success, failure, autoShowMsg, refLoading});
}

export function getLocationDeviceApi(
  deviceId,
  {success, failure, autoShowMsg = true, refLoading = null} = {},
) {
  const url = [locationDeviceUrl, deviceId].join('/');
  return get(url, {
    params: null,
    success,
    failure,
    autoShowMsg,
    refLoading,
  });
}

export function acceptContactApi(
  id,
  {success, failure, autoShowMsg = true, refLoading = null},
) {
  const url = [listDeviceUrl, id].join('/');
  return path(url, {success, failure, autoShowMsg, refLoading});
}

export function rejectContactApi(
  id,
  {success, failure, autoShowMsg = true, refLoading = null},
) {
  const url = [listDeviceUrl, id].join('/');
  return dele(url, {success, failure, autoShowMsg, refLoading});
}

export function getJourneyApi(
  deviceId,
  fromDate,
  toDate,
  page,
  size,
  {success, failure, autoShowMsg = true, refLoading = null},
) {
  let params = {
    fromDate,
    toDate,
    page,
    size,
  };
  const url = [locationDeviceUrl, deviceId, 'histories'].join('/');
  return get(url, {
    params,
    success,
    failure,
    autoShowMsg,
    refLoading,
  });
}
export function deleteDevicesApi (
  deviceId,
  {success, failure, autoShowMsg = true, refLoading = null},
) {
  const url = [deleteDeviceUrl, deviceId].join('/');
  return dele(url, {
    autoShowMsg,
    success,
    failure,
    refLoading
  })
}
export function offDeviceApi (
  deviceId,
  {success, failure, autoShowMsg = true, refLoading = null} = {},
) {
  const url = [deviceUrl, deviceId, 'power-off'].join('/');
  return post(url, {
    success,
    failure,
    autoShowMsg,
    refLoading,
  });
}
export function restartDeviceApi (
  deviceId,
  {success, failure, autoShowMsg = true, refLoading = null} = {},
) {
  const url = [deviceUrl, deviceId, 'restart'].join('/');
  return post(url, {
    success,
    failure,
    autoShowMsg,
    refLoading,
  });
}
