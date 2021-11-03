import {Dimensions, StatusBar} from 'react-native';
import {RFPercentage} from 'react-native-responsive-fontsize';

const windowWidth = Dimensions.get('window').width;
const windowHeight =
  Dimensions.get('window').height -
  ((StatusBar.currentHeight || 0) > 24 &&
  ((StatusBar.currentHeight || 0) != 30 ||
    Dimensions.get('screen').height - Dimensions.get('window').height > 48)
    ? 0
    : StatusBar.currentHeight);
const screenWidth = Dimensions.get('screen').width;
const screenHeight = Dimensions.get('screen').height;
const textSizeApp = 14;
const maxThumbnailSize = 600;
const maxNicknameLength = 20;
const maxSloganLength = 200;
const vipBoundSizeBig = 170;
const minSplashTime = 4; // seconds
const maxSizeInPage = 36;
const pageDefault = 0;

// anonymous
const anonymousAccount = 'Anonymous@Account.com';
const anonymousPassword = 'AnonymousAccount';

// screen
const ScreenIds = {
  Splash: 'Splash',
  Tabs: 'Tabs',
  Auth: 'Auth',
  Profile: 'Profile',
  PersonalData: 'PersonalData',
  ChangePassword: 'ChangePassword',
  HomeMainScreen: 'HomeMainScreen',
  DeviceManager: 'DeviceManager',
  EditDevice: 'EditDevice',
  FindDevice: 'FindDevice',
  SoundSettings: 'SoundSettings',
  AlarmClock: 'AlarmClock',
  AlarmSetting: 'AlarmSetting',
  EacesDroping: 'EacesDroping',
  RewardPoints: 'RewardPoints',
  LanguageTimeZone: 'LanguageTimeZone',
  DoNotDisturb: 'DoNotDisturb',
  DisturbSetting: 'DisturbSetting',
  Chat: 'Chat',
  RoomChat: 'RoomChat',
  DeleteMessage: 'DeleteMessage',
  OffDevice: 'Offdevice',
  RestartDevice: 'RestartDevice',
  SecretPhotoShoot: 'SecretPhotoShoot',
  Warning: 'Warning',
  Health: 'Health',
  DetailHealth: 'DetailHealth',
  Paying: 'Paying',

  // Auth
  Login: 'Login',
  ForgotPassword: 'ForgotPassword',
  Register: 'Register',
  PasswordRetrieval: 'PasswordRetrieval',
  ConnectionScreen: 'ConnectionScreen',
  AddDeviceScreen: 'AddDeviceScreen',
  Relationship: 'Relationship',
  QRCodeScreen: 'QRCodeScreen',
  OTP: 'OTP',
  UpdatePassword: 'UpdatePassword',

  //Settings
  Settings: 'Settings',
  Contacts: 'Contacts',
  AddNewContact: 'AddNewContact',
  Members: 'Members',
  InfoKits: 'InfoKits',

  //Maps
  Maps: 'Maps',

  //Paying
  Card: 'Card',

  //VideoCall
  ListDevice: 'ListDevice',
  ElectronicFence: 'ElectronicFence',
  JourneyHistory: 'JourneyHistory',
};
const heights = {};
for (let index = 0; index < 100; index++) {
  heights['h' + index] = RFPercentage(index);
  heights['h' + index + '_25'] = RFPercentage(index + 0.25);
  heights['h' + index + '_5'] = RFPercentage(index + 0.5);
  heights['h' + index + '_75'] = RFPercentage(index + 0.75);
}

const FontSize = {
  xxtraSmall: heights.h1_5,
  xtraSmall: heights.h1_75,
  small: heights.h2,
  medium: heights.h2_25,
  big: heights.h2_5,
  xtraBig: heights.h2_75,
  xxtraBig: heights.h3,
  xxxtraBig: heights.h3_5,
};

const ScaleHeight = {
  xxtraSmall: heights.h2,
  xtraSmall: heights.h3,
  small: heights.h4,
  medium: heights.h6,
  big: heights.h8,
  xtraBig: heights.h10,
  xxtraBig: heights.h13,
  xxxtraBig: heights.h15,
};

const dropdownAlertType = {
  WARNING: 'warn',
  SUCCESS: 'success',
  INFO: 'info',
  ERROR: 'error',
};

export {FontSize, ScaleHeight};

export default {
  windowWidth,
  windowHeight,
  screenWidth,
  screenHeight,
  textSizeApp,
  anonymousAccount,
  anonymousPassword,
  ScreenIds,
  maxThumbnailSize,
  maxNicknameLength,
  maxSloganLength,
  vipBoundSizeBig,
  minSplashTime,
  heights,
  maxSizeInPage,
  pageDefault,
  dropdownAlertType,
};
