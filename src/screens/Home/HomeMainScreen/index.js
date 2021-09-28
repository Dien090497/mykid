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
    // showAlert(String.thisFunctionIsNotValid);
    navigation.navigate(Consts.ScreenIds.AlarmClock);
  };

  const pressDevices = () => {
    navigation.navigate(Consts.ScreenIds.DeviceManager);
  };

  const pressSettings = () => {
    navigation.navigate(Consts.ScreenIds.Settings);
  };
  const buttonProps = {activeOpacity: 0.8};
  return (
    <View style={styles.container}>
      {appStatusBar()}
      <View style={{backgroundColor: '#00FFFF', paddingTop: 30}}>
        <Image
          source={Images.icBanner}
          resizeMode={'stretch'}
          style={styles.banner}
        />
      </View>

      <View style={{flex: 1, flexDirection: 'row', flexWrap: 'wrap'}}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            {...buttonProps}
            style={[styles.button, {backgroundColor: '#4896ff'}]}
            onPress={pressMap}>
            <View style={styles.bgIcon}>
              <Image source={Images.icGps} style={styles.icon} />
            </View>
            <Text style={styles.buttonText}>{String.home_gps}</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            {...buttonProps}
            style={[styles.button, {backgroundColor: '#fb909f'}]}
            onPress={pressVideoCall}>
            <View style={styles.bgIcon}>
              <Image source={Images.icVideoCall} style={styles.icon} />
            </View>
            <Text style={styles.buttonText}>{String.home_videoCall}</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            {...buttonProps}
            style={[styles.button, {backgroundColor: '#008dff'}]}
            onPress={pressJourney}>
            <View style={styles.bgIcon}>
              <Image source={Images.icJourney} style={styles.icon} />
            </View>
            <Text style={styles.buttonText}>{String.home_journey}</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            {...buttonProps}
            style={[styles.button, {backgroundColor: '#ffc24b'}]}
            onPress={pressChat}>
            <View style={styles.bgIcon}>
              <Image source={Images.icChat} style={styles.icon} />
            </View>
            <Text style={styles.buttonText}>{String.home_chat}</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            {...buttonProps}
            style={[styles.button, {backgroundColor: '#2b64c6'}]}
            onPress={pressSafeArea}>
            <View style={styles.bgIcon}>
              <Image source={Images.icElectricFence} style={styles.icon} />
            </View>
            <Text style={styles.buttonText}>{String.home_safeArea}</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            {...buttonProps}
            style={[styles.button, {backgroundColor: '#f19204'}]}
            onPress={pressAlarm}>
            <View style={styles.bgIcon}>
              <Image source={Images.icAlarm} style={styles.icon} />
            </View>
            <Text style={styles.buttonText}>{String.home_alarm}</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            {...buttonProps}
            style={[styles.button, {backgroundColor: '#13b96a'}]}
            onPress={pressFindDevice}>
            <View style={styles.bgIcon}>
              <Image source={Images.icFindDevice} style={styles.icon} />
            </View>
            <Text style={styles.buttonText}>{String.home_findDevice}</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            {...buttonProps}
            style={[styles.button, {backgroundColor: '#e17c3f'}]}
            onPress={pressEntertainment}>
            <View style={styles.bgIcon}>
              <Image source={Images.icEntertainment} style={styles.icon} />
            </View>
            <Text style={styles.buttonText}>{String.home_entertainment}</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            {...buttonProps}
            style={[styles.button, {backgroundColor: '#3db900'}]}
            onPress={pressDevices}>
            <View style={styles.bgIcon}>
              <Image source={Images.icDevice} style={styles.icon} />
            </View>
            <Text style={styles.buttonText}>{String.home_device}</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            {...buttonProps}
            style={[styles.button, {backgroundColor: '#b16f21'}]}
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
