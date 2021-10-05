import React, { useLayoutEffect, useRef, useState } from 'react';
import {
  KeyboardAvoidingView,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {styles} from './styles';
import Header from '../../../components/Header';
import {String} from '../../../assets/strings/String';
import LoadingIndicator from '../../../components/LoadingIndicator';
import DataLocal from '../../../data/dataLocal';
import { Image } from 'react-native';
import Images from '../../../assets/Images';
import Consts from '../../../functions/Consts';
import { getListDeviceApi } from '../../../network/DeviceService';
import { Modal } from 'react-native';
import KeyboardComponent from '../../../components/KeyboardComponent';

export default function RoomChat({navigation}) {
  const refLoading = useRef();
  const [isRecord, setIsRecord] = useState(true);
  const [devices, setDevices] = useState();
  const [text, setText] = useState();
  const [modalVisible, setModalVisible] = useState(true);

  useLayoutEffect(() => {
    getListDevice();
  }, []);

  const openModal = () => {
    setModalVisible(true);
  };

  const hideModal = () => {
    setModalVisible(false);
  };

  const getListDevice = async () => {
    getListDeviceApi(DataLocal.userInfo.id, Consts.pageDefault, 100, '', '', {
      success: resData => {
        setDevices(resData.data);
      },
      refLoading,
    });
  };

  const toggleChat = (obj, i) => {
  };

  const toggleRecord = (state) => {
    setIsRecord(false);
    setModalVisible(true);
  };

  const sendMessage = () => {
    setMessageText('');
    props.closeKeyBoard();
  };

  return (
    <KeyboardAvoidingView style={styles.contain}
      behavior={Platform.OS === "ios" ? "padding" : ""}>
      <Header title={'Server TQ nhóm gia đình (3)'}/>
      <View style={styles.container}>
        <ScrollView style={styles.container}>
          {devices && devices.map((obj, i) => (
            <View key={i} style={[styles.viewItem, i % 2 === 0 ? {flexDirection: 'row'} : {flexDirection: 'row-reverse'}]}>
              <View style={styles.viewImg}>
                <Image source={Images.icAvatar} style={styles.icAvatar}/>
              </View>
              <View style={styles.viewContent}>
                {i % 2 === 0 && <Text style={styles.txtTitle}>{obj.deviceName}</Text>}
                <View style={styles.viewContentDetail}></View>
              </View>
            </View>
          ))}
          {devices && devices.map((obj, i) => (
            <View key={i} style={[styles.viewItem, i % 2 === 0 ? {flexDirection: 'row'} : {flexDirection: 'row-reverse'}]}>
              <View style={styles.viewImg}>
                <Image source={Images.icAvatar} style={styles.icAvatar}/>
              </View>
              <View style={styles.viewContent}>
                {i % 2 === 0 && <Text style={styles.txtTitle}>{obj.deviceName}</Text>}
                <View style={styles.viewContentDetail}></View>
              </View>
            </View>
          ))}
        </ScrollView>
        <View style={styles.viewBottom}>
          <TouchableOpacity style={styles.viewImg} onPress={() => {toggleRecord(!isRecord)}}>
            <Image source={isRecord ? Images.icKeyboard: Images.icRecord} style={isRecord ? styles.icKeyboard : styles.icRecord}/>
          </TouchableOpacity>
          <View style={styles.viewContent}>
            {isRecord ?
            <TouchableOpacity style={styles.toInput}>
              <Text style={styles.txtInput}>{'Giữ và nói'}</Text>
            </TouchableOpacity>
            :
            <View style={styles.toInput}>
              <TextInput
                numberOfLines={1}
                maxLength={20}
                autoCompleteType={'off'}
                importantForAutofill={'off'}
                autoCorrect={false}
                underlineColorAndroid={'transparent'}
                style={styles.textInput}
                disableFullscreenUI
                value={text}
                placeholder={'...'}
                onChangeText={txt => setText(txt)}
              />
              {/* <Modal animationType="fade" transparent={true} visible={modalVisible}>
                <TouchableOpacity style={styles.modal} onPress={hideModal}>
                  <TouchableOpacity style={styles.containerModal}>
                    <KeyboardComponent sendMessage={sendMessage} closeKeyBoard={hideModal}/>
                  </TouchableOpacity>
                </TouchableOpacity>
              </Modal> */}
            </View>
            }
          </View>
          <TouchableOpacity style={styles.viewImg}>
            <Image source={Images.icCamera} style={styles.icCamera}/>
          </TouchableOpacity>
        </View>
      </View>
      <LoadingIndicator ref={refLoading} />
    </KeyboardAvoidingView>
  );
}
