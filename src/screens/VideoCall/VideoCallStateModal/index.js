import {Modal, Image, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';

import {String} from '../../../assets/strings/String';
import styles from './styles.js';
import Images from '../../../assets/Images';
import {Colors} from '../../../assets/colors/Colors';

const VideoCallStateModal = ({
  connectionState,
  visible,
  deviceName,
  item,
  toggleModal,
  createVideoCall,
}) => {
  const destroyVideoCall = () => {
    toggleModal({connectionState: connectionState, roomId: item.id});
  };
  const call = item => {
    createVideoCall(item);
  };
  return (
    <Modal visible={visible} animationType="fade" transparent={true}>
      <View
        style={[
          styles.centeredView,
          {
            backgroundColor:
              connectionState === 'INIT'
                ? Colors.backgroundVideoCall
                : Colors.backgroundVideoCallError,
          },
        ]}>
        <View style={styles.modalView}>
          <Text
            style={styles.txtName}
            children={deviceName ? deviceName : ''}
          />
          <Text
            children={
              connectionState === 'INIT'
                ? String.requestVideoCall
                : String.call_busy
            }
            style={styles.txtVideoCall}
          />
        </View>
        <View
          style={[
            styles.containerFooter,
            {
              backgroundColor:
                connectionState === 'INIT'
                  ? Colors.backgroundVideoCall
                  : Colors.backgroundVideoCallError,
            },
          ]}>
          <TouchableOpacity
            style={styles.containerCancel}
            onPress={destroyVideoCall}>
            <Image
              source={
                connectionState === 'INIT'
                  ? Images.icCallReject
                  : Images.icCallCancel
              }
              style={styles.icPhone}
            />
            <Text
              children={
                connectionState === 'INIT' ? String.reject : String.cancel
              }
              style={styles.txtVideoCall}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.containerCancel} onPress={call(item)}>
            <Image source={Images.icCall} style={styles.icPhone} />
            <Text
              children={
                connectionState === 'INIT'
                  ? String.acceptVideocall
                  : String.call_back
              }
              style={styles.txtVideoCall}
            />
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default VideoCallStateModal;
