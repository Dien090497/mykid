import {dele, get, path, post} from './http/HttpClient';

import Consts from '../functions/Consts';
import {phoneBookUrl} from './http/ApiUrl';

export function getListContactPhoneApi(
  deviceId,
  {success, failure, autoShowMsg = true, refLoading = null} = {},
) {
  const url = [phoneBookUrl, deviceId].join('/');
  return get(url, {
    success,
    failure,
    autoShowMsg,
    refLoading,
  });
}

export function setSOSApi(
  deviceId,
  body,
  {success, failure, autoShowMsg = true, refLoading = null} = {},
) {
  const url = [phoneBookUrl, deviceId, 'sos'].join('/');
  return post(url, {
    body,
    success,
    failure,
    autoShowMsg,
    refLoading,
  });
}

export function deletePhoneBookApi(
  deviceId,
  body,
  {success, failure, autoShowMsg = true, refLoading = null} = {},
) {
  const url = [phoneBookUrl, deviceId].join('/');
  return dele(url, {
    body,
    success,
    failure,
    autoShowMsg,
    refLoading,
  });
}
export function addPhoneBookApi(
  deviceId,
  body,
  {success, failure, autoShowMsg = true, refLoading = null} = {},
) {
  const url = [phoneBookUrl, deviceId].join('/');
  return post(url, {
    body,
    success,
    failure,
    autoShowMsg,
    refLoading,
  });
}

export function setBlockUnknownApi(
  deviceId,
  block,
  {success, failure, autoShowMsg = true, refLoading = null} = {},
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
  });
}