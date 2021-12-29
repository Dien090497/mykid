import React, { useLayoutEffect, useRef, useState } from 'react';
import {
  FlatList, RefreshControl,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
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

  const toggleChat = (obj) => {
    checkMicrophonePermission().then(microGranted => {
      if (microGranted) {
        navigation.navigate(Consts.ScreenIds.RoomChat, {roomInfo: obj});
      }
    })
  };

  const renderItemFlatList = (obj) =>{
    return(
      <View>
        <View style={styles.viewTitleRoom}>
          <Text style={styles.txtTitleRoom}>{obj.item.type === 'FAMILY' ? (obj.item.deviceName ? obj.item.deviceName : '')
            : `${t('common:talkWithFriends')} (${obj.item.roomName || '0'})`}</Text>
        </View>
        <TouchableOpacity style={styles.viewItem} onPress={() => {toggleChat(obj.item);}}>
          <View style={styles.viewImg}>
            <FastImage source={obj.item.avatar ? {uri: obj.item.avatar} : Images.icAvatar} style={styles.icAvatar} resizeMode={FastImage.resizeMode.stretch} />
          </View>
          <View style={styles.viewText}>
            <View style={styles.rowDirection}>
              <Text style={styles.txtTitle}>{obj.item.type === 'FAMILY' ? (obj.item.roomName ? obj.item.roomName : t('common:talkWithFamily'))
                : t('common:talk')}</Text>
            </View>
            <Text style={styles.txtContent}>{obj.item.lastMsg ? `[${obj.item.lastMsg.type}]` : ''}</Text>
          </View>
          <View style={styles.viewArrow}>
            <Image source={Images.icRightArrow} style={styles.icArrow}/>
          </View>
        </TouchableOpacity>
      </View>
    )
  }

  return (
    <View style={styles.contain}>
      <Header title={t('common:header_chat')} />
      <FlatList
        keyExtractor={item => item.id}
        style={{flex:1}}
        data={devices}
        refreshControl={
          <RefreshControl
            onRefresh={()=>{
              setDevices(XmppClient.lstRoom)
            }}
            refreshing={false} />
        }
        renderItem={renderItemFlatList}/>
      <LoadingIndicator ref={refLoading} />
    </View>
  );
}
