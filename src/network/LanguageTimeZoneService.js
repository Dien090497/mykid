import {get, post} from './http/HttpClient';

import {languageTimeZoneUrl,languageUrl} from './http/ApiUrl';

export function getLanguageTimeZoneApi(
  deviceId,
  {success, failure, autoShowMsg = true, refLoading = null} = {},
) {
  const url = [languageTimeZoneUrl, deviceId].join('/');
  return get(url, {
    success,
    failure,
    autoShowMsg,
    refLoading,
  });
}

export function getLanguageApi(
  {success, failure, autoShowMsg = true, refLoading = null} = {},
) {
  const url = languageUrl;
  return get(url, {
    success,
    failure,
    autoShowMsg,
    refLoading,
  });
}

export function setLanguageTimeZoneApi(
  deviceId,
  body,
  {success, failure, autoShowMsg = true, refLoading = null} = {},
) {
  const url = [languageTimeZoneUrl, deviceId].join('/');
  return post(url, {
    body,
    success,
    failure,
    autoShowMsg,
    refLoading,
  });
}
