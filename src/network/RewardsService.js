import {get, post} from './http/HttpClient';

import {rewardsUrl} from './http/ApiUrl';

export function getRewardsApi(
  deviceId,
  {success, failure, autoShowMsg = true, refLoading = null} = {},
) {
  const url = [rewardsUrl, deviceId].join('/');
  return get(url, {
    success,
    failure,
    autoShowMsg,
    refLoading,
  });
}

export function setRewardsApi(
  deviceId,
  body,
  {success, failure, autoShowMsg = true, refLoading = null} = {},
)
{
  const url = [rewardsUrl, deviceId].join('/');
  return post(url, {
    body,
    success,
    failure,
    autoShowMsg,
    refLoading,
  });
}
