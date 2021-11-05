import {get, dele} from './http/HttpClient';

import {roomsChatUrl, roomsUrl} from './http/ApiUrl';

export function getRoomsApi(
  {success, failure, autoShowMsg = true, refLoading = null, refNotification = null} = {},
) {
  return get(roomsUrl, {
    success,
    failure,
    autoShowMsg,
    refLoading,
    refNotification
  });
}

export function deleteHistoryApi( roomId,
  {success, failure, autoShowMsg = true, refLoading = null, refNotification = null} = {},
) {
  const url = [roomsChatUrl, roomId].join('/');
  return dele(url, {
    success,
    failure,
    autoShowMsg,
    refLoading,
    refNotification
  });
}
