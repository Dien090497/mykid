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
import DataLocal from '../../data/dataLocal';

export default function SplashScreen() {
  const navigation = useNavigation();

  const [syncFailed, setSyncFailed] = useState(false);
  const [msg, setMsg] = useState(String.splashMsg);

  useEffect(() => {
    loadFromData().then();
  }, []);

  const loadFromData = async () => {
    await DataLocal.loadFromData();
    if (DataLocal.accessToken) {
      navigation.replace(Consts.ScreenIds.Tabs);
    } else {
      navigation.replace(Consts.ScreenIds.Auth);
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
