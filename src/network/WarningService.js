import { get } from "./http/HttpClient";
import { WaringUrl } from "./http/ApiUrl";

export function getNotification (
  params,
  {success, failure, autoShowMsg = true, refLoading = null, refNotification = null} = {},
){
  return get( WaringUrl , {
    params,
    success,
    failure,
    autoShowMsg,
    refLoading,
    refNotification
  });
}
