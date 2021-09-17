import {Modal, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {memo, useRef} from 'react';

import {String} from '../../../assets/strings/String';
import styles from './styles.js';
import JanusVideoRoomScreen from '../JanusVideoRoomScreen';
import {navigationRef} from '../../../routes/RootNavigation';

const VideoCallModal = ({visible, device, toggleModal, server, roomId}) => {
  const refJanusVideoRoomScreen = useRef();
  const destroyVideoCall = () => {
    refJanusVideoRoomScreen.current.destroyVideoCall();
    toggleModal();
  };
  return (
    <Modal visible={visible} animationType="fade" transparent={true}>
      <JanusVideoRoomScreen
        ref={refJanusVideoRoomScreen}
        server={server}
        roomId={roomId}
      />
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text
            style={styles.txtName}
            children={device ? device.deviceName : ''}
          />
          <Text children={String.video_call} style={styles.txtVideoCall} />
        </View>
        <View style={styles.containerFooter}>
          <TouchableOpacity
            style={styles.containerCancel}
            onPress={destroyVideoCall}>
            <Text children="X" style={styles.txtCancel} />
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default VideoCallModal;
