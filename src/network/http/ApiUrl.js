import AppConfig from '../../data/AppConfig';

export const appConfig = AppConfig.dev;

//////////////////////////////////////////////////////
export const hostUrl = 'https://' + appConfig.rootDomain;
export const appUrl = hostUrl + '/kwapp-core/v1';
export const streamUrl = hostUrl + '/kwstream-core/v1';
export const wsUrl = 'wss://mykid.ttc.software/kwstream-core/v1/ws';
export const wsSafeZoneUrl = 'wss://mykid.ttc.software/kwapp-core/v1/ws';
export const wsCheckSim = 'wss://mykid.ttc.software/kwapp-core/v1/ws';
export const wsCheckLocation = 'wss://mykid.ttc.software/kwapp-core/v1/ws';
export const wssXmppUrl = 'wss://' + appConfig.xmppServer + '/ws';

// Account
export const loginUrl = appUrl + '/auth/login';
export const logoutUrl = appUrl + '/auth/logout';
export const forgotPasswordUrl = appUrl + '/auth/password';
export const createAccountUrl = appUrl + '/accounts';
export const changePasswordUrl = appUrl + '/accounts/password';
export const refreshTokenUrl = appUrl + '/auth/refresh';
export const getCaptchaUrl = appUrl + '/captcha';
export const listDeviceUrl = appUrl + '/account-devices';
export const locationDeviceUrl = appUrl + '/locations';
export const phoneBookUrl = appUrl + '/phone-books';
export const safeZoneUrl = appUrl + '/safe-zones';
export const deleteDeviceUrl = appUrl + '/account-devices/devices';

// Alarm
export const alarmUrl = appUrl + '/alarms';

//tokenfirebase
export const createTokenFirebaseUrl = appUrl + '/app-tokens';

// Class mode
export const classModesUrl = appUrl + '/class-modes';


// LanguageTimeZone
export const languageTimeZoneUrl = appUrl + '/language-timezones';
export const languageUrl = appUrl+'/language-timezones/languages';
// Sound
export const soundModesUrl = appUrl + '/sound-modes';

// Watch
export const watchsUrl = appUrl + '/watchs';

// User info
export const accountDetailUrl = appUrl + '/accounts';
//EacesDrop
export const eacesDropUrl = appUrl + '/monitors';
// Videocall
export const createVideoCallUrl = streamUrl + '/video-calls';

// Rewards
export const rewardsUrl = appUrl + '/rewards';

// Device
export const  deviceUrl = appUrl + '/commands';
// Rooms
export const roomsUrl = appUrl + '/rooms';
export const roomsChatUrl = appUrl + '/rooms/chat';

//PhotoShoot
export const PhotoShootUrl = appUrl + '/commands';
export const ListPhotoUrl = appUrl + '/sneak_captures';

//InfoKids
export const InfoKids = appUrl + '/kids'

//Auth
export const getOTP = appUrl + '/otps/registration';
export const getOtpReset = appUrl + '/otps/password-resetting';
export const getVerificationOtp = appUrl + '/otps/verification/password-resetting';
export const UpdatePassword = appUrl +'/accounts/reset-password';

//Personal
export const PersonalDataUrl = appUrl + '/accounts/info';

// Warning
export const WaringUrl = appUrl + '/notifications';

// Health
export const HealthUrl = appUrl + '/walking-time-modes';
export const TrackingUrl = appUrl + '/walking-time-tracking';
export const TargetsUrl = appUrl + '/targets';
export const radioUrl = appUrl + '/walking-time-modes/devices'

//Payment
export const checkAccount = appUrl + '/sims';

// SMS
export const smsUrl = appUrl + '/sms-messages';

// InstallPosition
export const positionModelURL = appUrl + '/position-configs';

//DisconnectClock
export const disconnectUrl = appUrl + '/devices';

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
    newUrl = newUrl.split(`{${k}}`).join(obj[k]);
  }

  return newUrl;
}
