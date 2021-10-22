import React, { useLayoutEffect, useRef, useState } from 'react';
import {
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {styles} from './styles';
import Header from '../../components/Header';
import {String} from '../../assets/strings/String';
import LoadingIndicator from '../../components/LoadingIndicator';
import { Image } from 'react-native';
import Images from '../../assets/Images';
import Consts from '../../functions/Consts';
import { checkMicrophonePermission } from '../../functions/permissions';
import FastImage from 'react-native-fast-image';
import XmppClient from '../../network/xmpp/XmppClient';

export default function Chat({navigation}) {
  const refLoading = useRef();
  const [devices, setDevices] = useState([]);

  useLayoutEffect(() => {
    setDevices(XmppClient.lstRoom);
  }, []);

  const toggleChat = (obj, i) => {
    checkMicrophonePermission().then(microGranted => {
      if (microGranted) {
        navigation.navigate(Consts.ScreenIds.RoomChat, {roomInfo: obj});
      }
    })
  };

  return (
    <View style={styles.contain}>
      <Header title={String.header_chat} />
      <View style={styles.container}>
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
                  <Text style={styles.txtTitle}>{obj.roomName ? obj.roomName : String.talkWithFamily}</Text>
                </View>
                <Text style={styles.txtContent}>{obj.lastMsg ? `[${obj.lastMsg.type}]` : ''}</Text>
              </View>
              <View style={styles.viewArrow}>
                <Image source={Images.icRightArrow} style={styles.icArrow}/>
              </View>
            </TouchableOpacity>
          </View>
        ))}
      </View>
      <LoadingIndicator ref={refLoading} />
    </View>
  );
}
