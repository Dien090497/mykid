import React from "react";
import { View } from "react-native";
import styles from "./style";
import {CameraKitCameraScreen} from 'react-native-camera-kit';
import Header from "../../../components/Header";
import { String } from "../../../assets/strings/String";

const QRCodeScreen = ({ navigation, route }) => {
  let isSuccess = false;

  const onSuccess = e => {
    if (isSuccess) return;
    isSuccess = true;
    console.log(e);
    if (route.params.onQR) {
      route.params.onQR(e);
    }
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Header title={String.header_QRCode} />
      <CameraKitCameraScreen
        showFrame={true}
        // Show/hide scan frame
        scanBarcode={true}
        // Can restrict for the QR Code only
        laserColor={'red'}
        // Color can be of your choice
        frameColor={'white'}
        // If frame is visible then frame color
        colorForScannerFrame={'black'}
        // Scanner Frame color
        onReadCode={(event) =>
          onSuccess(event.nativeEvent.codeStringValue)
        }
      />
    </View>
  );
};
export default QRCodeScreen;
