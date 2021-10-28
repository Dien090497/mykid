import React from 'react';
import {
  View,
  Image,
  Text,
  TouchableOpacity, FlatList, Dimensions,
} from 'react-native';
import {styles} from './styles';
import Header from '../../components/Header';
import Images from '../../assets/Images';
import {String} from '../../assets/strings/String';
import Consts, {FontSize} from '../../functions/Consts';
import DataLocal from '../../data/dataLocal';
import CustomIcon from '../../components/VectorIcons';
import {Colors} from '../../assets/colors/Colors';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import XmppClient from '../../network/xmpp/XmppClient';
import WebSocketVideoCall from '../../network/socket/WebSocketVideoCall';
import WebSocketSafeZone from '../../network/socket/WebSocketSafeZone';
import { useTranslation } from "react-i18next";

const {width,height} = Dimensions.get('window');
export default function Profile({navigation}) {
  const { t } = useTranslation();

  const dataProfile = [
    {
      key: 'Personal',
      title: t('common:personalData'),
      onPress: () => {
        navigation.navigate(Consts.ScreenIds.PersonalData)
      },
      icon: (
        <Image source={Images.icPersonal} style={{width: 40, height: 40}}/>
      ),
    },
    {
      key: 'DevicesManager',
      title: t('common:header_deviceManager'),
      onPress: () => {
        navigation.navigate(Consts.ScreenIds.DeviceManager);
      },
      icon: (
        <Image source={Images.icDevices} style={{width: 40, height: 40}}/>
      ),
    },
    {
      key: 'ChangePassWord',
      title: t('common:changePassword'),
      onPress: () => {
        navigation.navigate(Consts.ScreenIds.ChangePassword);
      },
      icon: (
        <Image source={Images.icChangePass} style={{width: 40, height: 40}}/>
      ),
    },
    {
      key: 'LogOut',
      title: t('common:logout'),
      onPress: () => {
        handleLogout();
      },
      icon: (
        <Image source={Images.icLogout} style={{width: 40, height: 40}}/>
      ),
    },

  ];

  const handleLogout = async () => {
    await DataLocal.removeAll();
    await XmppClient.disconnectXmppServer();
    WebSocketSafeZone.disconnect();
    WebSocketVideoCall.disconnect();
    navigation.replace(Consts.ScreenIds.Login);
  };

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
      <Header title={t('common:account')}/>
      <View style={styles.mainView}>
        <FlatList
          data={dataProfile}
          renderItem={renderItem}
          keyExtractor={item => item.key}
        />
      </View>
    </View>
  );
}
