import React, { useLayoutEffect, useRef, useState } from 'react';
import {
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {styles} from './styles';
import Header from '../../components/Header';
import LoadingIndicator from '../../components/LoadingIndicator';
import { Image } from 'react-native';
import Images from '../../assets/Images';
import Consts from '../../functions/Consts';
import { checkMicrophonePermission } from '../../functions/permissions';
import FastImage from 'react-native-fast-image';
import XmppClient from '../../network/xmpp/XmppClient';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import DataLocal from "../../data/dataLocal";

export default function Chat({navigation}) {
  const refLoading = useRef();
  const [devices, setDevices] = useState([]);
  const chatReducer = useSelector(state => state.chatReducer);
  const { t } = useTranslation();

  useLayoutEffect(() => {
    setDevices(XmppClient.lstRoom);
  }, []);

  useLayoutEffect(() => {
    if (chatReducer.dataInfo) {
      setDevices(XmppClient.lstRoom);
    }
  }, [chatReducer]);

  const toggleChat = (obj, i) => {
    checkMicrophonePermission().then(microGranted => {
      if (microGranted) {
        navigation.navigate(Consts.ScreenIds.RoomChat, {roomInfo: obj});
      }
    })
  };

  return (
    <View style={styles.contain}>
      <Header title={t('common:header_chat')} />
      <ScrollView style={styles.container}>
        {devices && devices.map((obj, i) => (
          <View key={i}>
            <View style={styles.viewTitleRoom}>
              <Text style={styles.txtTitleRoom}>{obj.deviceName ? obj.deviceName : ''}</Text>
            </View>
            <TouchableOpacity style={styles.viewItem} onPress={() => {toggleChat(obj, i);}}>
              <View style={styles.viewImg}>
                <FastImage source={obj.avatar ? {uri: obj.avatar} : Images.icAvatar} style={styles.icAvatar} resizeMode={FastImage.resizeMode.stretch} />
              </View>
              <View style={styles.viewText}>
                <View style={styles.rowDirection}>
                  <Text style={styles.txtTitle}>{obj.roomName ? obj.roomName : t('common:talkWithFamily')}</Text>
                </View>
                <Text style={styles.txtContent}>{obj.lastMsg ? `[${obj.lastMsg.type}]` : ''}</Text>
              </View>
              <View style={styles.viewArrow}>
                <Image source={Images.icRightArrow} style={styles.icArrow}/>
              </View>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
      <LoadingIndicator ref={refLoading} />
    </View>
  );
}
