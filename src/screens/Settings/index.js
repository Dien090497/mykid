import Consts, {FontSize } from '../../functions/Consts';
import {Dimensions, FlatList, Image, Text, TouchableOpacity, View} from 'react-native';
import React, { useRef } from 'react';
import {Colors} from '../../assets/colors/Colors';
import CustomIcon from '../../components/VectorIcons';
import Header from '../../components/Header';
import LoadingIndicator from '../../components/LoadingIndicator';
import {styles} from './styles';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Images from '../../assets/Images';
import SecretPhotoShoot from '../SecretPhotoShoot';
import { useTranslation } from 'react-i18next';

const {width} = Dimensions.get('window');
export default ({navigation, route}) => {
  const refLoading = useRef();
  const { t } = useTranslation();

  const dataSettings = [
    {
      key: 'Contacts',
      title: t('common:setting_contact'),
      onPress: () => {
        navigation.navigate(Consts.ScreenIds.Contacts);
      },
      icon: (
        <Image source={Images.icPhoneBook} style={{width: 24.33, height: 28.33}} resizeMode={'stretch'}/>
      ),
    },
    {
      key: 'Members',
      title: t('common:setting_member'),
      onPress: () => {
        navigation.navigate(Consts.ScreenIds.Members);
      },
      icon: (
        <Image source={Images.icUserFill} style={{width: 40, height: 40}} resizeMode={'stretch'}/>
      ),
    },
    {
      key: 'RewardPoints',
      title: t('common:header_reward_points'),
      onPress: () => {
        navigation.navigate(Consts.ScreenIds.RewardPoints);
      },
      icon: (
        <Image source={Images.icReward} style={{width: 24, height: 22}} resizeMode={'stretch'}/>
      ),
    },
    {
      key: 'DoNotDisturb',
      title: t('common:header_doNotDisturb'),
      onPress: () => {
        navigation.navigate(Consts.ScreenIds.DoNotDisturb);
      },
      icon: (
        <Image source={Images.icSoundMute} style={{width: 40, height: 40}} resizeMode={'stretch'}/>
      ),
    },
    {
      key: 'LanguageTimeZone',
      title: t('common:header_language_timezone'),
      onPress: () => {
        navigation.navigate(Consts.ScreenIds.LanguageTimeZone);
      },
      icon: (
        <Image source={Images.icWorldFill} style={{width: 30.65, height: 27.87}} resizeMode={'stretch'}/>
      ),
    },
    {
      key: 'EacesDroping',
      title: t('common:hender_eacesDroping'),
      onPress: () => {
        navigation.navigate(Consts.ScreenIds.EacesDroping);
      },
      icon: (
        <Image source={Images.icChieldFill} style={{width: 40, height: 40}} resizeMode={'stretch'}/>
      ),
    },
    {
      key: 'SecretPhotoShoot',
      title: t('common:header_secret_shoot'),
      onPress: () => {
        navigation.navigate(Consts.ScreenIds.SecretPhotoShoot);
      },
      icon: (
         <Image source={Images.icShootPhoto} style={{width: 40, height: 40}} resizeMode={'center'}/>
      ),
    },
    {
      key: 'RemoteDevices',
      title: t('common:header_remoteDevices'),
      onPress: () => {
        navigation.navigate(Consts.ScreenIds.OffDevice);
      },
      icon: (
        <Image source={Images.icSubtract} style={{width: 26, height: 26}} resizeMode={'stretch'}/>
      ),
    },
    {
      key: 'RemoteStart',
      title: t('common:header_remoteStart'),
      onPress: () => {
        navigation.navigate(Consts.ScreenIds.RestartDevice);
      },
      icon: (
        <Image source={Images.icRemoteStart} style={{width: 40, height: 40}} resizeMode={'stretch'}/>
      ),
    },
  ];
  const renderItem = ({item}) => {
    return (
      <TouchableOpacity
        activeOpacity={0.5}
        style={styles.tobMain}
        key={item.key}
        onPress={item.onPress}>
        <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
          <View style={styles.icon}>{item.icon}</View>
          <Text style={styles.titleText}>{item.title}</Text>
          <View style={{flex:0.1,position: 'absolute', right: width* 0.006}}>
            <CustomIcon
              name={'arrow-forward-ios'}
              iconFamily={'MaterialIcons'}
              size={FontSize.medium}
              color={Colors.colorImageAdmin}/>
          </View>
        </View>
      </TouchableOpacity>
    );
  };
  return (
    <View
      style={[styles.container, {paddingBottom: useSafeAreaInsets().bottom}]}>
      <Header title={t('common:header_settings')}/>
      <View style={styles.mainView}>
        <FlatList
          data={dataSettings}
          renderItem={renderItem}
          keyExtractor={item => item.key}
        />
      </View>
      <LoadingIndicator ref={refLoading}/>
    </View>
  );
};
