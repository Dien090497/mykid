import {get, post} from './http/HttpClient';
import {InfoKids} from "./http/ApiUrl";

export function getInfoApi (
  deviceId,
  {success, failure, autoShowMsg = true, refLoading = null} = {},
) {
  const url = [InfoKids, deviceId].join('/');
  return get(url, {
    success,
    failure,
    autoShowMsg,
    refLoading,
  });
}

export function setInfoKitsApi (
  deviceId,
  body,
  {success, failure, autoShowMsg = true, refLoading = null} = {},
) {
  const url = [InfoKids, deviceId].join('/');
  return post(url, {
    body,
    success,
    failure,
    autoShowMsg,
    refLoading,
  });
}