import React, {useRef} from 'react';
import {
  View,
  Image,
  Text,
  TouchableOpacity, FlatList, Dimensions,
} from 'react-native';
import {styles} from './styles';
import Header from '../../components/Header';
import Images from '../../assets/Images';
import Consts, {FontSize} from '../../functions/Consts';
import DataLocal from '../../data/dataLocal';
import CustomIcon from '../../components/VectorIcons';
import {Colors} from '../../assets/colors/Colors';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import XmppClient from '../../network/xmpp/XmppClient';
import WebSocketVideoCall from '../../network/socket/WebSocketVideoCall';
import WebSocketSafeZone from '../../network/socket/WebSocketSafeZone';
import { useTranslation } from "react-i18next";
import {logoutService} from '../../network/UserInfoService'
import LoadingIndicator from "../../components/LoadingIndicator";
import NotificationModal from "../../components/NotificationModal";
import ModalConfirm from "../../components/ModalConfirm";
import reduxStore from "../../redux/config/redux";
import loginAction, {logout} from "../../redux/actions/loginAction";

const {width} = Dimensions.get('window');
export default function Profile({navigation}) {
  const { t } = useTranslation();
  const refModel = useRef();
  const refLoading = useRef();
  const refNotification = useRef();

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
        onModal();
      },
      icon: (
        <Image source={Images.icLogout} style={{width: 40, height: 40}}/>
      ),
    },

  ];

  const handleLogout = () => {
    logoutService({
      success: res => {
        reduxStore.store.dispatch(loginAction.logout(true));
        DataLocal.removeAll();
        XmppClient.disconnectXmppServer();
        WebSocketSafeZone.disconnect();
        WebSocketVideoCall.disconnect();
        navigation.replace(Consts.ScreenIds.Login);
      },
      refLoading,
      refNotification
    })
  };

  const onModal = () => {
    refModel.current.open(t('common:alertLogout'), handleLogout);
}


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
      <ModalConfirm ref={refModel} />
      <LoadingIndicator ref={refLoading} />
      <NotificationModal ref={refNotification} />
    </View>
  );
}
