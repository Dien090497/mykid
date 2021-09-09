import {Dimensions, StatusBar} from 'react-native';
import Register from "../screens/auth/Register";
import addDeviceScreen from "../screens/Profile/addDeviceScreen";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height -
  (((StatusBar.currentHeight || 0) > 24 && ((StatusBar.currentHeight || 0) != 30 || Dimensions.get('screen').height- Dimensions.get('window').height >48)) ? 0 : StatusBar.currentHeight);
const screenWidth = Dimensions.get('screen').width;
const screenHeight = Dimensions.get('screen').height;
const textSizeApp = 14;
const maxThumbnailSize = 600;
const maxNicknameLength = 20;
const maxSloganLength = 200;
const vipBoundSizeBig = 170;
const minSplashTime = 4; // seconds

// anonymous
const anonymousAccount = 'Anonymous@Account.com';
const anonymousPassword = 'AnonymousAccount';

// screen
const ScreenIds = {
  Splash: 'Splash',
  Tabs: 'Tabs',
  Auth: 'Auth',
  Profile: 'Profile',
  ChangePassword: 'ChangePassword',
  HomeMainScreen: 'HomeMainScreen',

  // Auth
  Login: 'Login',
  ForgotPassword: 'ForgotPassword',
  Register: 'Register',
  PasswordRetrieval: 'PasswordRetrieval',
  connection: 'connectionScreen',
  addDeviceScreen: 'addDeviceScreen',
  relationship: 'relationship',
  QRCodeScreen: 'QRCodeScreen',

  //Settings
  Settings: 'Settings',
  Contacts: 'Contacts',
  AddNewContact: 'AddNewContact',
  Members: 'Members',

  //Maps
  Maps: 'Maps'
};
const heights = {};
for (let index = 0; index < 100; index++) {
  heights['h'+ index] = RFPercentage(index);
  heights['h'+ index + '_25'] = RFPercentage(index+0.25);  
  heights['h'+ index + '_5'] = RFPercentage(index+0.5);  
  heights['h'+ index + '_75'] = RFPercentage(index+0.75);  
}

const FontSize = {
  xxtraSmall: heights.h1_25,
  xtraSmall: heights.h1_5,
  small: heights.h1_75,
  medium: heights.h2,
  big: heights.h2_25,
  xtraBig: heights.h2_5,
  xxtraBig: heights.h2_75,
  xxxtraBig: heights.h3_25,
}

const ScaleHeight = {
  xxtraSmall: heights.h2,
  xtraSmall: heights.h3,
  small: heights.h4,
  medium: heights.h6,
  big: heights.h8,
  xtraBig: heights.h10,
  xxtraBig: heights.h13,
  xxxtraBig: heights.h15,
}

export {FontSize, ScaleHeight}

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
};
