import React, { useEffect, useState } from "react";
import { View, Text, Linking, TouchableOpacity, SafeAreaView } from "react-native";
import styles from "./style";
import QRCodeScanner from "react-native-qrcode-scanner";

const QRCodeScreen = ({ navigation }) => {

  const onSuccess = e => {
    console.log(e.data);
    Linking.openURL(e.data).catch(err =>
      console.error("An error occured", err),
    );
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <QRCodeScanner
        cameraStyle={{ height: "100%", width: "100%", alignSelf: "center", justifyContent: "center" }}
        reactivate={true}
        showMarker={true}
        onRead={onSuccess}
        // flashMode={RNCamera.Constants.FlashMode.torch}
        bottomContent={
          <View style={styles.bottomView}>
            <View style={styles.noteText}>
              <Text style={styles.buttonText}> Đặt mã QR vào hộp, n sẽ tự động quét</Text>
            </View>
            <View style={styles.bottomContent}>
              <TouchableOpacity style={styles.buttonTouchable} onPress={()=> navigation.goBack()}>
                <Text style={styles.buttonText}>Hủy</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.buttonTouchable}>
                <Text style={styles.buttonText}>Chọn mã QR từ album</Text>
              </TouchableOpacity>
            </View>
          </View>
        }
      />
    </SafeAreaView>
  );
};
export default QRCodeScreen;
