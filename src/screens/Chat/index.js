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
import DataLocal from '../../data/dataLocal';
import { Image } from 'react-native';
import Images from '../../assets/Images';
import Consts from '../../functions/Consts';
import { checkMicrophonePermission } from '../../functions/permissions';
import { getRoomsApi } from '../../network/ChatService';

export default function Chat({navigation}) {
  const refLoading = useRef();
  const [devices, setDevices] = useState([]);

  useLayoutEffect(() => {
    getRooms();
  }, []);

  const getRooms = async () => {
    getRoomsApi({
      success: resData => {
        setDevices(resData.data);
      },
      refLoading,
    });
  };

  const toggleChat = (obj, i) => {
    checkMicrophonePermission().then(microGranted => {
      if (microGranted) {
        navigation.navigate(Consts.ScreenIds.RoomChat);
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
                <Image source={Images.icAvatar} style={styles.icAvatar}/>
              </View>
              <View style={styles.viewText}>
                <View style={styles.rowDirection}>
                  <Text style={styles.txtTitle}>{obj.roomName ? obj.roomName : String.talkWithFamily}</Text>
                </View>
                <Text style={styles.txtContent}>{obj.updatedAt ? obj.updatedAt : ''}</Text>
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
