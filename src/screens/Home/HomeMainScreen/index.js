import React, { useState, useLayoutEffect, useRef } from 'react';
import {
  View,
  SafeAreaView,
  Text,
  TouchableOpacity,
  Image
} from 'react-native';
import { styles } from './styles';
import HomeCarousel from '../../../components/Home/HomeCarousel';
import { useNavigation } from '@react-navigation/native';
import { appStatusBar } from '../../../components/CommonUIComponents';
import LoadingIndicator from '../../../components/LoadingIndicator';
import Images from '../../../assets/Images';
import Consts from '../../../functions/Consts';

export default function HomeMainScreen() {
  const navigation = useNavigation();

  const refLoading = useRef();

  useLayoutEffect(() => {
  }, []);

  const renderHeader = () => {
    return (
      <HomeCarousel data={[]} />
    );
  };

  const pressVoiceMess = () => {
    //navigation.navigate(Consts.ScreenIds.Register);
  }

  const pressVideoCall = () => {
    //navigation.navigate();
  }

  const pressJourney = () => {
   //navigation.navigate();
  }

  const pressMap = () => {
    navigation.navigate(Consts.ScreenIds.Maps);
  }

  const pressSafeArea = () => {
    //navigation.navigate();
  }

  const pressRewards = () => {
   //navigation.navigate();
  }

  const pressAlarm = () => {
    //navigation.navigate();
  }

  const pressWarning = () => {
    //navigation.navigate();
  }

  const pressEquipments = () => {
    //navigation.navigate();
  }

  const pressSettings = () => {
    navigation.navigate(Consts.ScreenIds.Settings);
  }
  const buttonProps = { activeOpacity: 0.8 }
  return (
    <SafeAreaView style={styles.container}>
      {appStatusBar()}
      <View style={[styles.header, { backgroundColor: '#05e5f5' }]}>
      </View>
      <View style={{ flex: 1, flexDirection: 'row', flexWrap: 'wrap' }}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            {...buttonProps}
            style={[styles.button, { backgroundColor: '#4896ff' }]}
            onPress={pressVoiceMess}
          >
            <View style={styles.bgIcon}><Image source={Images.icHomeOff}
              style={styles.icon} /></View>
            <Text style={styles.buttonText}>TIN NHẮN THOẠI</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            {...buttonProps}
            style={[styles.button, { backgroundColor: '#fb909f' }]}
            onPress={pressVideoCall}
          >
            <View style={styles.bgIcon}><Image source={Images.icHomeOff}
              style={styles.icon} /></View>
            <Text style={styles.buttonText}>VIDEO CALL</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            {...buttonProps}
            style={[styles.button, { backgroundColor: '#008dff' }]}
            onPress={pressJourney}
          >
            <View style={styles.bgIcon}><Image source={Images.icHomeOff}
              style={styles.icon} /></View>
            <Text style={styles.buttonText}>HÀNH TRÌNH</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            {...buttonProps}
            style={[styles.button, { backgroundColor: '#ffc24b' }]}
            onPress={pressMap}
          >
            <View style={styles.bgIcon}><Image source={Images.icHomeOff}
              style={styles.icon} /></View>
            <Text style={styles.buttonText}>BẢN ĐỒ</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            {...buttonProps}
            style={[styles.button, { backgroundColor: '#2b64c6' }]}
            onPress={pressSafeArea}
          >
            <View style={styles.bgIcon}><Image source={Images.icHomeOff}
              style={styles.icon} /></View>
            <Text style={styles.buttonText}>KHU VỰC AN TOÀN</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            {...buttonProps}
            style={[styles.button, { backgroundColor: '#f19204' }]}
            onPress={pressRewards}
          >
            <View style={styles.bgIcon}><Image source={Images.icHomeOff}
              style={styles.icon} /></View>
            <Text style={styles.buttonText}>PHẦN THƯỞNG</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            {...buttonProps}
            style={[styles.button, { backgroundColor: '#13b96a' }]}
            onPress={pressAlarm}
          >
            <View style={styles.bgIcon}><Image source={Images.icHomeOff}
              style={styles.icon} /></View>
            <Text style={styles.buttonText}>BÁO THỨC</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            {...buttonProps}
            style={[styles.button, { backgroundColor: '#e17c3f' }]}
            onPress={pressWarning}
          >
            <View style={styles.bgIcon}><Image source={Images.icHomeOff}
              style={styles.icon} /></View>
            <Text style={styles.buttonText}>CẢNH BÁO</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            {...buttonProps}
            style={[styles.button, { backgroundColor: '#3db900' }]}
            onPress={pressEquipments}
          >
            <View style={styles.bgIcon}><Image source={Images.icHomeOff}
              style={styles.icon} /></View>
            <Text style={styles.buttonText}>THIẾT BỊ</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            {...buttonProps}
            style={[styles.button, { backgroundColor: '#b16f21' }]}
            onPress={pressSettings}
          >
            <View style={styles.bgIcon}><Image source={Images.icHomeOff}
              style={styles.icon} /></View>
            <Text style={styles.buttonText}>THIẾT LẬP</Text>
          </TouchableOpacity>
        </View>
      </View>
      <LoadingIndicator ref={refLoading} />
    </SafeAreaView>
  );
}
