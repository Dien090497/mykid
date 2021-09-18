import {Modal, Image, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';

import {String} from '../../../assets/strings/String';
import styles from './styles.js';
import Images from '../../../assets/Images';

const VideoCallStateModal = ({visible, deviceName, toggleModal}) => {
  const destroyVideoCall = () => {
    toggleModal();
  };
  return (
    <Modal visible={visible} animationType="fade" transparent={true}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text
            style={styles.txtName}
            children={deviceName ? deviceName : ''}
          />
          <Text children={String.call_busy} style={styles.txtVideoCall} />
        </View>
        <View style={styles.containerFooter}>
          <TouchableOpacity
            style={styles.containerCancel}
            onPress={destroyVideoCall}>
            <Image source={Images.icCallCancel} style={styles.icPhone} />
            <Text children={String.cancel} style={styles.txtVideoCall} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.containerCancel}
            onPress={destroyVideoCall}>
            <Image source={Images.icCall} style={styles.icPhone} />
            <Text children={String.call_back} style={styles.txtVideoCall} />
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default VideoCallStateModal;
