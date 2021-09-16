import {Modal, StyleSheet, Text, View} from 'react-native';
import React, {memo} from 'react';

import {String} from '../../../assets/strings/String';
import {TouchableOpacity} from 'react-native-gesture-handler';
import styles from './styles.js';
import JanusVideoRoomScreen from '../JanusVideoRoomScreen';

const VideoCallModal = ({visible, device, toggleModal}) => {
  return (
    <Modal visible={visible} animationType="fade" transparent={true}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.txtName} children={device.deviceName} />
          <Text children={String.video_call} style={styles.txtVideoCall} />
        </View>
        <JanusVideoRoomScreen />
        <View style={styles.containerFooter}>
          <TouchableOpacity
            style={styles.containerCancel}
            onPress={toggleModal}>
            <Text children="X" style={styles.txtCancel} />
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default VideoCallModal;
