import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  Text
} from 'react-native';
import {styles} from './styles';
import {String} from '../../assets/strings/String';
import Consts from '../../functions/Consts';
import {useNavigation} from '@react-navigation/core';
import {appStatusBar} from '../../components/CommonUIComponents';

let loginRequested = false;
let loggedIn = false;
let flag = true;

export default function SplashScreen() {
  const navigation = useNavigation();

  const [syncFailed, setSyncFailed] = useState(false);
  const [msg, setMsg] = useState(String.splashMsg);

  const startTime = Date.now();
  let splashTimeout = null;
  const _isMounted = useRef(true);

  useEffect(() => {
    navigation.replace(Consts.ScreenIds.Auth);
  }, []);

  const retrySync = () => {
    const success = readyToContinue();
    if (success) {
      return;
    }

    setSyncFailed(false);
    if (!loggedIn) {
      // anonymousLogin();
    }
  };

  return (
    <View style={{flex: 1, width: '100%'}}>
      {appStatusBar()}
      <View style={styles.container}>
      </View>
      <View style={styles.bottomContainer}>
        {!syncFailed && <Text style={{color: 'grey', padding: 10}}>{msg}</Text>}
        {
          syncFailed &&
          <Text style={{padding: 10}} onPress={retrySync}>{String.resync}</Text>
        }
        {/* {isLoading && <ActivityIndicator style={{marginTop: 20}} animating={true}/>} */}
      </View>
    </View>
  );
}
