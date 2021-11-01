import { get, post,dele } from "./http/HttpClient";

import { ListPhotoUrl, PhotoShootUrl } from "./http/ApiUrl";

export function DoSecretShoot(
  deviceId,
  {success, failure, autoShowMsg = true, refLoading = null, refNotification = null} = {},
) {
  const url = [PhotoShootUrl,deviceId,'remote-capture'].join('/');
  return post(url, { success, failure, autoShowMsg, refLoading, refNotification});
}

export function GetListImage (
  deviceId,
  page,
  size,
  {success, failure, autoShowMsg = true, refLoading = null, refNotification = null} = {},
){
  let params = {
    page,
    size
  }
  let url = [ListPhotoUrl, deviceId].join('/');
  return get(url, {
    params,
    success,
    failure,
    autoShowMsg,
    refLoading,
    refNotification
  });
}

export function DeleteImages (
  deviceId,
  ids,
  {success, failure, autoShowMsg = true, refLoading = null, refNotification = null} = {},
){
  let url = [ListPhotoUrl, deviceId].join('/') + '?ids=' + ids.join(',');
  return dele(url, {
    // params,
    success,
    failure,
    autoShowMsg,
    refLoading,
    refNotification
  });
}
