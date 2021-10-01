import {get, post} from './http/HttpClient';

import { eacesDropUrl} from './http/ApiUrl';

export function setEacesDropApi(
  deviceId,
  body,
  {success, failure, autoShowMsg = true, refLoading = null} = {},
)
{
  const url = [eacesDropUrl, deviceId].join('/');
  return post(url, {
    body,
    success,
    failure,
    autoShowMsg,
    refLoading,
  });
}