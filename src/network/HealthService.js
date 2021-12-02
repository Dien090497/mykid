import { get, post, put } from "./http/HttpClient";

import { HealthUrl, TargetsUrl, TrackingUrl, radioUrl } from "./http/ApiUrl";
export function  getListWalkingTime(
  deviceId,
  {success, failure, autoShowMsg = true, refLoading = null, refNotification = null} = {},
) {

  const url = [HealthUrl, 'devices',deviceId].join('/');
  return get(url, {
    success,
    failure,
    autoShowMsg,
    refLoading,
    refNotification,
  });
}

export function createWalkingMode(
  body,
  {success, failure, autoShowMsg = true, refLoading = null, refNotification = null} = {},
)
{
  return post(HealthUrl, {
    body,
    success,
    failure,
    autoShowMsg,
    refLoading,
    refNotification,
  });
}

export function updateWalkingMode(
  id,
  body,
  {success, failure, autoShowMsg = true, refLoading = null, refNotification = null} = {},
)
{
  const url = [HealthUrl,id].join('/');
  return put(url, {
    body,
    success,
    failure,
    autoShowMsg,
    refLoading,
    refNotification,
  });
}

export function updateActiveWalkingMode(
  id,
  body,
  {success, failure, autoShowMsg = true, refLoading = null, refNotification = null} = {},
)
{
  const url = [HealthUrl,id].join('/');
  return put(url, {
    body,
    success,
    failure,
    autoShowMsg,
    refLoading,
    refNotification,
  });
}

export function walkingTimeTracking(
  params,
  {success, failure, autoShowMsg = true, refLoading = null, refNotification = null} = {},
)
{
  return get(TrackingUrl, {
    params,
    success,
    failure,
    autoShowMsg,
    refLoading,
    refNotification,
  });
}

export function getTarget(
  deviceId,
  {success, failure, autoShowMsg = true, refLoading = null, refNotification = null} = {},
)
{
  const url = [TargetsUrl,deviceId].join('/');
  return get(url, {
    success,
    failure,
    autoShowMsg,
    refLoading,
    refNotification,
  });
}

export function createTarget(
  body,
  {success, failure, autoShowMsg = true, refLoading = null, refNotification = null} = {},
)
{
  return post(TargetsUrl, {
    body,
    success,
    failure,
    autoShowMsg,
    refLoading,
    refNotification,
  });
}
export function setRadioApi(
  deviceId,
  active,
  {success, failure, autoShowMsg = true, refLoading = null, refNotification = null} = {},
)
{
  let body= {
    active
  }
  const url = [radioUrl, deviceId].join('/');
  return put(url, {
    body,
    success,
    failure,
    autoShowMsg,
    refLoading,
    refNotification,
  });
}
