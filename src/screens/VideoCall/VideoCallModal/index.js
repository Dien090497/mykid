import {Modal, StyleSheet, Text, View} from 'react-native';
import React, {memo} from 'react';

import {Colors} from '../../../assets/colors/Colors';
import {FontSize} from '../../../functions/Consts';
import {String} from '../../../assets/strings/String';
import {TouchableOpacity} from 'react-native-gesture-handler';

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    backgroundColor: '#B3B2B3',
  },
  modalView: {
    flex: 1,
    paddingTop: '20%',
    alignSelf: 'center',
    alignItems: 'center',
  },
  txtName: {
    fontSize: FontSize.xxxtraBig,
    color: 'white',
    fontWeight: '700',
  },
  txtVideoCall: {
    color: 'white',
    fontSize: FontSize.medium,
  },
  containerFooter: {
    height: '15%',
    backgroundColor: '#494954',
    justifyContent: 'center',
    alignItems: 'center',
  },
  containerCancel: {
    backgroundColor: Colors.red,
    width: '15%',
    aspectRatio: 1,
    borderRadius: 200,
    alignItems: 'center',
    justifyContent: 'center',
  },
  txtCancel: {
    fontSize: FontSize.xxxtraBig + 5,
    color: 'white',
    fontWeight: 'bold',
  },
});

const VideoCallModal = ({visible, device, toggleModal}) => {
  return (
    <Modal visible={visible} animationType="fade" transparent={true}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.txtName} children={device.deviceName} />
          <Text children={String.video_call} style={styles.txtVideoCall} />
        </View>

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
