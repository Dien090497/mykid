import React from "react";
import { SafeAreaView } from "react-native";
import styles from "./style";
import {CameraScreen} from 'react-native-camera-kit';

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
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <CameraScreen
        showFrame={true}
        // Show/hide scan frame
        scanBarcode={true}
        // Can restrict for the QR Code only
        laserColor={'blue'}
        // Color can be of your choice
        frameColor={'yellow'}
        // If frame is visible then frame color
        colorForScannerFrame={'black'}
        // Scanner Frame color
        onReadCode={(event) =>
          onSuccess(event.nativeEvent.codeStringValue)
        }
      />
    </SafeAreaView>
  );
};
export default QRCodeScreen;
