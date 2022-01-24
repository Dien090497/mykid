/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App, {handleRemoteMessage} from './App';
import {name as appName} from './app.json';
import messaging from '@react-native-firebase/messaging';

messaging().setBackgroundMessageHandler(async remoteMessage => {
  // await DataLocal.removeVideoCallInfo();
  console.log('Message handled in the background!', remoteMessage);
  handleRemoteMessage(remoteMessage, true);
});

AppRegistry.registerComponent(appName, () => App);
