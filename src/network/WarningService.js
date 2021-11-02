import { get } from "./http/HttpClient";
import { WaringUrl } from "./http/ApiUrl";

export function getNotification (
  page,
  size,
  {success, failure, autoShowMsg = true, refLoading = null, refNotification = null} = {},
){
  let params = {
    page,
    size
  }
  return get( WaringUrl, {
    params,
    success,
    failure,
    autoShowMsg,
    refLoading,
    refNotification
  });
}
