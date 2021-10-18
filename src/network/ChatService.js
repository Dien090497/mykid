import {get} from './http/HttpClient';

import {roomsUrl} from './http/ApiUrl';

export function getRoomsApi(
  {success, failure, autoShowMsg = true, refLoading = null} = {},
) {
  return get(roomsUrl, {
    success,
    failure,
    autoShowMsg,
    refLoading,
  });
}