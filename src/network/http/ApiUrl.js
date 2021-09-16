import AppConfig from '../../data/AppConfig';

export const appConfig = AppConfig.dev;

//////////////////////////////////////////////////////
export const hostUrl = 'https://' + appConfig.rootDomain;
export const appUrl = hostUrl + '/kwapp-core/v1';
export const wsUrl = 'https://mykid.ttc.software/kwstream-core/v1/streams/ws'

// Account
export const loginUrl = appUrl + '/auth/login';
export const forgotPasswordUrl = appUrl + '/auth/password';
export const createAccountUrl = appUrl + '/accounts';
export const changePasswordUrl = appUrl + '/accounts/password';
export const refreshTokenUrl = appUrl + '/auth/refresh';
export const getCaptchaUrl = appUrl + '/captcha';
export const listDeviceUrl = appUrl + '/account-devices'
export const locationDeviceUrl = appUrl + '/locations'
export const phoneBookUrl = appUrl + '/phone-books'
export const safeZoneUrl = appUrl + '/safe-zones'

// Sound
export const soundModesUrl = appUrl + '/sound-modes'

// Watch
export const watchsUrl = appUrl + '/watchs'

// User info
export const accountDetailUrl = appUrl + '/accounts';

/// url: string, obj: object
export function assignUrlParams(url, obj) {
  if (!obj) {
    return url;
  }

  const keys = Object.keys(obj);
  if (keys.length === 0) {
    return url;
  }

  let newUrl = url;
  for (let i = 0; i < keys.length; i++) {
    const k = keys[i];
    // newUrl = newUrl.replace(`{${k}}`, obj[k]);
    newUrl = newUrl.split(`{${k}}`).join(obj[k]);
  }

  return newUrl;
}
