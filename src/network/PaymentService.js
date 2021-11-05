import {checkAccount} from "./http/ApiUrl";
import {get, post} from "./http/HttpClient";

export function getInfoApi(
  deviceId,
  {success, failure, autoShowMsg = true, refLoading = null, refNotification = null} = {},
) {
  const url = [checkAccount, deviceId + '/info'].join('/');
  return get(url, {
    success,
    failure,
    autoShowMsg,
    refLoading,
    refNotification,
  });
}

export function onClickPayment (
  deviceId,
  cardCode,
  {success, failure, autoShowMsg = true, refLoading = null, refNotification = null} = {},
) {
  let body = {
    cardCode
  }
  const url = [checkAccount, deviceId + '/top-up'].join('/');
  return post(url, {
    body,
    success,
    failure,
    autoShowMsg,
    refLoading,
    refNotification
  });
}