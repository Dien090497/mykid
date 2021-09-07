import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  Text
} from 'react-native';
import {styles} from './styles';
import {String} from '../../assets/strings/String';
import DataLocal from '../../data/dataLocal';
import Consts from '../../functions/Consts';
import {useSelector} from 'react-redux';
import globalData from '../../data/globalData';
import {useNavigation} from '@react-navigation/core';
// import Orientation from 'react-native-orientation';
import {useIsFocused} from '@react-navigation/native';
import {appStatusBar} from '../../components/CommonUIComponents';
import {anonymousLogin} from '../../network/http/HttpClient';
import {generateRandomId} from '../../functions/utils';
import CodepushMng from '../../functions/CodepushMng';

let loginRequested = false;
let loggedIn = false;
let flag = true;

export default function SplashScreen() {
  const userInfo = useSelector(state => state.loginReducer.dataInfo);
  const isLoading = useSelector(state => state.loginReducer.isLoading);
  const loginError = Date.now().toString() + ':' + useSelector(state => state.loginReducer.error);
  const navigation = useNavigation();
  const isFocused = useIsFocused();

  const [syncFailed, setSyncFailed] = useState(false);
  const [msg, setMsg] = useState(String.splashMsg);

  const startTime = Date.now();
  let splashTimeout = null;
  const _isMounted = useRef(true);

  useEffect(() => {
    if (!__DEV__) {
      CodepushMng.updateLatestVersion(() => {
        init().then();
      }, (status) => {
        if (status.msg !== '') {
          setMsg(status.msg);
        }
      }, (progress) => {
        console.log('Codepush download progress:', progress);
      });
    } else {
      init().then();
    }

    return () => {
      loggedIn = false;
      loginRequested = false;
      flag = true;
      _isMounted.current = false;
    };
  }, []);

  useEffect(() => {
    let error = loginError.split(':')[1];
    if (error != null && error !== '') {
      if (!syncFailed) {
        setSyncFailed(true);
        navigation.replace(Consts.ScreenIds.Auth);
      }
    }
  }, [loginError]);

  const init = async () => {
    setMsg(String.splashMsg);

    let deviceId = await DataLocal.getDeviceId();
    if (!deviceId) {
      deviceId = generateRandomId();
      await DataLocal.saveDeviceId(deviceId);
    }

    const token = await getToken();
    if (token != null) {
      const info = await DataLocal.getUserInfo();
      loggedIn = true;

    } else if (!loginRequested) {
      loginRequested = true;
      anonymousLogin();
    }
  };

  const readyToContinue = () => {
    return true;
  };

  async function getToken() {
    const token = await DataLocal.getAccessToken();

    if (token === undefined || token === null || token === '') {
      return null;
    }

    return token;
  }

  const retrySync = () => {
    const success = readyToContinue();
    if (success) {
      return;
    }

    setSyncFailed(false);
    if (!loggedIn) {
      anonymousLogin();
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
