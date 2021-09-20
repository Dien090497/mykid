import React from "react";
import { View, Text, TouchableOpacity, SafeAreaView } from "react-native";
import styles from "./style";
import QRCodeScanner from "react-native-qrcode-scanner";
import { String } from "../../../assets/strings/String";

const QRCodeScreen = ({ navigation, route }) => {
  let isSuccess = false;
  
  const onSuccess = e => {
    if (isSuccess) return;
    isSuccess = true;
    if (route.params.onQR) {
      route.params.onQR(e.data);
    }
    navigation.goBack();
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <QRCodeScanner
        cameraStyle={{ height: "100%", width: "100%", alignSelf: "center", justifyContent: "center" }}
        reactivate={true}
        showMarker={true}
        onRead={onSuccess}
        bottomContent={
          <View style={styles.bottomView}>
            <View style={styles.noteText}>
              <Text style={styles.buttonText}>{String.qrNote}</Text>
            </View>
            <View style={styles.bottomContent}>
              <TouchableOpacity style={styles.buttonTouchable} onPress={()=> navigation.goBack()}>
                <Text style={styles.buttonText}>{String.cancel}</Text>
              </TouchableOpacity>
            </View>
          </View>
        }
      />
    </SafeAreaView>
  );
};
export default QRCodeScreen;
