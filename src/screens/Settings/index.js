import Consts, {FontSize} from '../../functions/Consts';
import {Dimensions, Image, Text, TouchableOpacity, View} from 'react-native';
import React, {useRef} from 'react';
import {Colors} from '../../assets/colors/Colors';
import CustomIcon from '../../components/VectorIcons';
import Header from '../../components/Header';
import LoadingIndicator from '../../components/LoadingIndicator';
import {styles} from './styles';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Images from '../../assets/Images';
import NotificationModal from '../../components/NotificationModal';
import {useTranslation} from 'react-i18next';
import DataLocal from "../../data/dataLocal";
import {disconnectClockApi} from "../../network/DeviceService";
import ModalConfirm from "../../components/ModalConfirm";

const {width} = Dimensions.get('window');
export default ({navigation, route}) => {
  const refLoading = useRef();
  const {t} = useTranslation();
  const refNotification = useRef();
  const refModalConfirm = useRef();

  const onModal = () => {
    refModalConfirm.current.open(t('common:alertDisconnectClock'), () => {console.log('')})
  }

  const disconnectClock = () => {
    disconnectClockApi(DataLocal.deviceId, {
      success: res => {
        refNotification.current.open(t('common:submitSuccess'))
      },
      refNotification,
      refLoading
    });
  }

  return (
    <View
      style={[styles.container, {paddingBottom: useSafeAreaInsets().bottom}]}>
      <Header title={t('common:header_settings')}/>
      <View style={styles.mainView}>
        <TouchableOpacity
          activeOpacity={0.5}
          style={styles.tobMain}
          onPress={ () => {
            if (DataLocal.haveSim === '0') {
            return refNotification.current.open(t('errorMsg:kwa4067'));
          }
            navigation.navigate(Consts.ScreenIds.Contacts);
          }}>
          <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
            <Image source={Images.icPhoneBook} style={{width: 40, height: 40}} resizeMode={'stretch'}/>
            <Text style={styles.titleText}>{t('common:setting_contact')}</Text>
            <View style={{flex: 0.1, position: 'absolute', right: width * 0.006}}>
              <CustomIcon
                name={'arrow-forward-ios'}
                iconFamily={'MaterialIcons'}
                size={FontSize.medium}
                color={Colors.colorImageAdmin}/>
            </View>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.5}
          style={styles.tobMain}
          onPress={ () => {
            if (DataLocal.haveSim === '0') {
              return refNotification.current.open(t('errorMsg:kwa4067'));
            }
            navigation.navigate(Consts.ScreenIds.Members);
          }}>
          <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
            <Image source={Images.icUserFill} style={{width: 40, height: 40}} resizeMode={'stretch'}/>
            <Text style={styles.titleText}>{t('common:setting_member')}</Text>
            <View style={{flex: 0.1, position: 'absolute', right: width * 0.006}}>
              <CustomIcon
                name={'arrow-forward-ios'}
                iconFamily={'MaterialIcons'}
                size={FontSize.medium}
                color={Colors.colorImageAdmin}/>
            </View>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.5}
          style={styles.tobMain}
          onPress={ () => {
            if (DataLocal.haveSim === '0') {
              return refNotification.current.open(t('errorMsg:kwa4067'));
            }
            navigation.navigate(Consts.ScreenIds.DoNotDisturb);
          }}>
          <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
            <Image source={Images.icDoNotDisturb} style={{width: 40, height: 40}} resizeMode={'stretch'}/>
            <Text style={styles.titleText}>{t('common:header_doNotDisturb')}</Text>
            <View style={{flex: 0.1, position: 'absolute', right: width * 0.006}}>
              <CustomIcon
                name={'arrow-forward-ios'}
                iconFamily={'MaterialIcons'}
                size={FontSize.medium}
                color={Colors.colorImageAdmin}/>
            </View>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.5}
          style={styles.tobMain}
          onPress={ () => {
            if (DataLocal.haveSim === '0') {
              return refNotification.current.open(t('errorMsg:kwa4067'));
            }
            navigation.navigate(Consts.ScreenIds.LanguageTimeZone);
          }}>
          <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
            <Image source={Images.icWorldFill} style={{width: 40, height: 40}} resizeMode={'stretch'}/>
            <Text style={styles.titleText}>{t('common:header_language_timezone')}</Text>
            <View style={{flex: 0.1, position: 'absolute', right: width * 0.006}}>
              <CustomIcon
                name={'arrow-forward-ios'}
                iconFamily={'MaterialIcons'}
                size={FontSize.medium}
                color={Colors.colorImageAdmin}/>
            </View>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.5}
          style={styles.tobMain}
          onPress={ () => {
            if (DataLocal.haveSim === '0') {
              return refNotification.current.open(t('errorMsg:kwa4067'));
            }
            navigation.navigate(Consts.ScreenIds.SoundSettings);
          }}>
          <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
            <Image source={Images.icSoundSetting} style={{width: 40, height: 40}} resizeMode={'stretch'}/>
            <Text style={styles.titleText}>{t('common:header_soundSettings')}</Text>
            <View style={{flex: 0.1, position: 'absolute', right: width * 0.006}}>
              <CustomIcon
                name={'arrow-forward-ios'}
                iconFamily={'MaterialIcons'}
                size={FontSize.medium}
                color={Colors.colorImageAdmin}/>
            </View>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.5}
          style={styles.tobMain}
          onPress={ () => {
            if (DataLocal.haveSim === '0') {
              return refNotification.current.open(t('errorMsg:kwa4067'));
            }
            navigation.navigate(Consts.ScreenIds.OffDevice);
          }}>
          <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
            <Image source={Images.icSubtract} style={{width: 40, height: 40}} resizeMode={'stretch'}/>
            <Text style={styles.titleText}>{t('common:header_remoteDevices')}</Text>
            <View style={{flex: 0.1, position: 'absolute', right: width * 0.006}}>
              <CustomIcon
                name={'arrow-forward-ios'}
                iconFamily={'MaterialIcons'}
                size={FontSize.medium}
                color={Colors.colorImageAdmin}/>
            </View>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.5}
          style={styles.tobMain}
          onPress={ () => {
            if (DataLocal.haveSim === '0') {
              return refNotification.current.open(t('errorMsg:kwa4067'));
            }
            navigation.navigate(Consts.ScreenIds.RestartDevice);
          }}>
          <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
            <Image source={Images.icRemoteStart} style={{width: 40, height: 40}} resizeMode={'stretch'}/>
            <Text style={styles.titleText}>{t('common:header_remoteStart')}</Text>
            <View style={{flex: 0.1, position: 'absolute', right: width * 0.006}}>
              <CustomIcon
                name={'arrow-forward-ios'}
                iconFamily={'MaterialIcons'}
                size={FontSize.medium}
                color={Colors.colorImageAdmin}/>
            </View>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.5}
          style={styles.tobMain}
          onPress={ () => {
            if (DataLocal.haveSim === '0') {
              return refNotification.current.open(t('errorMsg:kwa4067'));
            }
            navigation.navigate(Consts.ScreenIds.InstallPosition);
          }}>
          <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
            <Image source={Images.icInstallPosition} style={{width: 40, height: 40}} resizeMode={'stretch'}/>
            <Text style={styles.titleText}>{t('common:header_installPosition')}</Text>
            <View style={{flex: 0.1, position: 'absolute', right: width * 0.006}}>
              <CustomIcon
                name={'arrow-forward-ios'}
                iconFamily={'MaterialIcons'}
                size={FontSize.medium}
                color={Colors.colorImageAdmin}/>
            </View>
          </View>
        </TouchableOpacity>
        {route.params.isAdmin &&
           <TouchableOpacity style={styles.tob} onPress={onModal}>
              <Text style={styles.txtTob}>{t('common:header_disconnectClock')}</Text>
           </TouchableOpacity>
        }
      </View>
      <ModalConfirm ref={refModalConfirm} onPressYes={disconnectClock}/>
      <LoadingIndicator ref={refLoading}/>
      <NotificationModal ref={refNotification}/>
    </View>
  );
};
