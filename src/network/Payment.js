import {checkAccount} from "./http/ApiUrl";
import {get} from "./http/HttpClient";

export function getInfoApi (
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