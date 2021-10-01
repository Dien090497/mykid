import {Image, Text, TouchableOpacity, View} from 'react-native';
import React, {useLayoutEffect, useRef} from 'react';

import Consts from '../../../functions/Consts';
import Images from '../../../assets/Images';
import LoadingIndicator from '../../../components/LoadingIndicator';
import {String} from '../../../assets/strings/String';
import {appStatusBar} from '../../../components/CommonUIComponents';
import {styles} from './styles';
import {useNavigation} from '@react-navigation/native';
import { showAlert } from '../../../functions/utils';

export default function HomeMainScreen() {
  const navigation = useNavigation();

  const refLoading = useRef();

  useLayoutEffect(() => {}, []);

  const pressMap = () => {
    navigation.navigate(Consts.ScreenIds.Maps);
  };

  const pressChat = () => {
    showAlert(String.thisFunctionIsNotValid);
  };

  const pressVideoCall = () => {
    navigation.navigate(Consts.ScreenIds.ListDevice);
  };

  const pressJourney = () => {
    navigation.navigate(Consts.ScreenIds.JourneyHistory);
  };

  const pressSafeArea = () => {
    navigation.navigate(Consts.ScreenIds.ElectronicFence);
  };

  const pressAlarm = () => {
    navigation.navigate(Consts.ScreenIds.SoundSettings);
  };

  const pressFindDevice = () => {
    navigation.navigate(Consts.ScreenIds.FindDevice);
  };

  const pressEntertainment = () => {
    showAlert(String.thisFunctionIsNotValid);
  };

  const pressAlarmClock = () => {
    navigation.navigate(Consts.ScreenIds.AlarmClock);
  };

  const pressSettings = () => {
    navigation.navigate(Consts.ScreenIds.Settings);
  };
  const buttonProps = {activeOpacity: 0.8};
  return (
    <View style={styles.container}>
      {appStatusBar()}
      <View style={styles.statusBar}>
        <Image
          source={Images.bgHome}
          resizeMode={'stretch'}
          style={styles.banner}
        />
        <Text style={styles.txtTitle}>V-KID PRO</Text>
      </View>

      <View style={styles.body}>
        <View style={[{minHeight: '39%', width: '50%'}]}>
          <View style={[styles.buttonContainerL, {width: '100%'}]}>
            <TouchableOpacity
              {...buttonProps}
              style={styles.button}
              onPress={pressMap}>
              <View style={styles.bgIcon}>
                <Image source={Images.icMap} style={styles.icon} />
              </View>
              <Text style={styles.buttonText}>{String.home_gps}</Text>
            </TouchableOpacity>
          </View>
          <View style={[styles.buttonContainerL, {width: '100%'}]}>
            <TouchableOpacity
              {...buttonProps}
              style={styles.button}
              onPress={pressJourney}>
              <View style={styles.bgIcon}>
                <Image source={Images.icJourney} style={styles.icon} />
              </View>
              <Text style={styles.buttonText}>{String.home_journey}</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={[styles.buttonContainerR, {minHeight: '39%'}]}>
          <TouchableOpacity
            {...buttonProps}
            style={styles.button}
            onPress={pressVideoCall}>
            <View style={styles.bgIcon}>
              <Image source={Images.icVideoCall} style={styles.icon} />
            </View>
            <Text style={styles.buttonText}>{String.home_videoCall}</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.buttonContainerL}>
          <TouchableOpacity
            {...buttonProps}
            style={styles.button}
            onPress={pressSafeArea}>
            <View style={styles.bgIcon}>
              <Image source={Images.icSafeZone} style={styles.icon} />
            </View>
            <Text style={styles.buttonText}>{String.home_safeArea}</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.buttonContainerR}>
          <TouchableOpacity
            {...buttonProps}
            style={styles.button}
            onPress={pressAlarm}>
            <View style={styles.bgIcon}>
              <Image source={Images.icSoundSetting} style={styles.icon} />
            </View>
            <Text style={styles.buttonText}>{String.home_alarm}</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.buttonContainerL}>
          <TouchableOpacity
            {...buttonProps}
            style={styles.button}
            onPress={pressAlarmClock}>
            <View style={styles.bgIcon}>
              <Image source={Images.icAlarm} style={styles.icon} />
            </View>
            <Text style={styles.buttonText}>{String.home_alarmClock}</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.buttonContainerR}>
          <TouchableOpacity
            {...buttonProps}
            style={styles.button}
            onPress={pressChat}>
            <View style={styles.bgIcon}>
              <Image source={Images.icChat} style={styles.icon} />
            </View>
            <Text style={styles.buttonText}>{String.home_chat}</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.buttonContainerL}>
          <TouchableOpacity
            {...buttonProps}
            style={styles.button}
            onPress={pressFindDevice}>
            <View style={styles.bgIcon}>
              <Image source={Images.icFindDevice} style={styles.icon} />
            </View>
            <Text style={styles.buttonText}>{String.home_findDevice}</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.buttonContainerR}>
          <TouchableOpacity
            {...buttonProps}
            style={styles.button}
            onPress={pressSettings}>
            <View style={styles.bgIcon}>
              <Image source={Images.icSetting} style={styles.icon} />
            </View>
            <Text style={styles.buttonText}>{String.home_setting}</Text>
          </TouchableOpacity>
        </View>
      </View>
      <LoadingIndicator ref={refLoading} />
    </View>
  );
}
