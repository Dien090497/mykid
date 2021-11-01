import {dele, get, path, post} from './http/HttpClient';

import {phoneBookUrl} from './http/ApiUrl';

export function getListContactPhoneApi(
  deviceId,
  {success, failure, autoShowMsg = true, refLoading = null, refNotification = null} = {},
) {
  const url = [phoneBookUrl, deviceId].join('/');
  return get(url, {
    success,
    failure,
    autoShowMsg,
    refLoading,
    refNotification,
  });
}

export function setSOSApi(
  deviceId,
  body,
  {success, failure, autoShowMsg = true, refLoading = null, refNotification = null} = {},
) {
  const url = [phoneBookUrl, deviceId, 'sos'].join('/');
  return post(url, {
    body,
    success,
    failure,
    autoShowMsg,
    refLoading,
    refNotification
  });
}

export function deletePhoneBookApi(
  deviceId,
  body,
  {success, failure, autoShowMsg = true, refLoading = null, refNotification = null} = {},
) {
  const url = [phoneBookUrl, deviceId].join('/');
  return dele(url, {
    body,
    success,
    failure,
    autoShowMsg,
    refLoading,
    refNotification
  });
}
export function addPhoneBookApi(
  deviceId,
  body,
  {success, failure, autoShowMsg = true, refLoading = null, refNotification = null} = {},
) {
  const url = [phoneBookUrl, deviceId].join('/');
  return post(url, {
    body,
    success,
    failure,
    autoShowMsg,
    refLoading,
    refNotification
  });
}

export function setBlockUnknownApi(
  deviceId,
  block,
  {success, failure, autoShowMsg = true, refLoading = null, refNotification = null} = {},
) {
  let body = {
    block
  };
  const url = [phoneBookUrl, deviceId, 'block-unknown'].join('/');
  return post(url, {
    body,
    success,
    failure,
    autoShowMsg,
    refLoading,
    refNotification
  });
}
