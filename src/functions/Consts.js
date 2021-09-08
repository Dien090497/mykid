import {Dimensions, StatusBar} from 'react-native';
import Register from "../screens/auth/Register";
import addDeviceScreen from "../screens/Profile/addDeviceScreen";

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
};
