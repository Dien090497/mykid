import {get} from './http/HttpClient';

import {smsUrl} from './http/ApiUrl';

export function getBrandsApi( deviceId,
  {success, failure, autoShowMsg = true, refLoading = null, refNotification = null} = {},
) {
  let url = [smsUrl, deviceId, 'brands'].join('/');
  return get(url, {
    success,
    failure,
    autoShowMsg,
    refLoading,
    refNotification
  });
}

export function getMessagesApi( deviceId, brandId,
  {success, failure, autoShowMsg = true, refLoading = null, refNotification = null} = {},
) {
  let params = {
    brandId
  };
  let url = [smsUrl, deviceId].join('/');
  return get(url, {
    params,
    success,
    failure,
    autoShowMsg,
    refLoading,
    refNotification
  });
}
