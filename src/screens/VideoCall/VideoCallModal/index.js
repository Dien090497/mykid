import {
  Image,
  Modal,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useRef } from 'react';

import styles from './styles.js';
import JanusVideoRoomScreen from '../JanusVideoRoomScreen';
import Images from '../../../assets/Images';
import { useTranslation } from "react-i18next";

const VideoCallModal = ({visible, device, toggleModal, pickUp, data}) => {
  const refJanusVideoRoomScreen = useRef();
  const { t } = useTranslation();
  const destroyVideoCall = () => {
    // refJanusVideoRoomScreen.current.destroyVideoCall();
    toggleModal(data.id);
  };
  return (
    <Modal visible={visible} animationType="fade" transparent={true}>
      <JanusVideoRoomScreen
        ref={refJanusVideoRoomScreen}
        pickUp={pickUp}
        server={data.streamUrl}
        roomId={data.id}
        password={data.password}
        accountId={data.caller.accountId}
        relationship={data.caller.relationship}
      />
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text
            style={styles.txtName}
            children={device ? device.deviceName : ''}
          />
          <Text children={t('common:video_call')} style={styles.txtVideoCall} />
        </View>
        <View style={styles.containerFooter}>
          <TouchableOpacity
            style={styles.containerCancel}
            onPress={destroyVideoCall}>
            <Image source={Images.icCallReject} style={styles.txtCancel} />
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default VideoCallModal;
