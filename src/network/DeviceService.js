import {dele, get, path, post} from './http/HttpClient';
import {listDeviceUrl, locationDeviceUrl} from './http/ApiUrl';

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
  {success, failure, autoShowMsg = true, refLoading = null} = {},
) {
  let params = {
    accountId: accountId || '',
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
  deviceCode,
  deviceName,
  icon,
  relationship,
  {success, failure, autoShowMsg = true, refLoading = null} = {},
) {
  let body = {
    deviceCode,
    deviceName,
    icon,
    relationship,
  };
  return post(listDeviceUrl, {body, success, failure, autoShowMsg, refLoading});
}

export function getLocationDeviceApi(
  deviceId,
  {success, failure, autoShowMsg = true, refLoading = null} = {},
) {
  return get(`${locationDeviceUrl}/${deviceId}`, {
    params: null,
    success,
    failure,
    autoShowMsg,
    refLoading,
  });
}

export function acceptContactApi( id, {success, failure, autoShowMsg = true, refLoading = null}) {
  const url = [listDeviceUrl, id].join('/');
  return path(url, {success, failure, autoShowMsg, refLoading});
}

export function rejectContactApi( id, {success, failure, autoShowMsg = true, refLoading = null}) {
  const url = [listDeviceUrl, id].join('/');
  return dele(url, {success, failure, autoShowMsg, refLoading});
}
