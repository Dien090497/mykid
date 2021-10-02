import { Image, Modal, PermissionsAndroid, Platform, ScrollView, Text, TextInput, TouchableOpacity, View, } from "react-native";
import React, { useLayoutEffect, useRef, useState } from "react";

import Button from "../../../components/buttonGradient";
import { Colors } from "../../../assets/colors/Colors";
import Consts from "../../../functions/Consts";
import CustomInput from "../../../components/CustomInput";
import Header from "../../../components/Header";
import Images from "../../../assets/Images";
import LoadingIndicator from "../../../components/LoadingIndicator";
import { String } from "../../../assets/strings/String";
import { addDeviceApi } from "../../../network/DeviceService";
import styles from "./style";
import { showAlert } from "../../../functions/utils";

const AddDeviceScreen = ({ navigation, route }) => {
  const [deviceCode, setDeviceCode] = useState("");
  const [deviceName, setDeviceName] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [submitActive, setSubmitActive] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [contentModal, setContentModal] = useState('');
  const refLoading = useRef();

  const dataMock = [
    {
      id: 1,
      name: "Bố",
      icon: Images.icFather,
      relationship: "FATHER",
    },
    {
      id: 2,
      name: "Mẹ",
      icon: Images.icMother,
      relationship: "MOTHER",
    },
    {
      id: 3,
      name: "Ông",
      icon: Images.icGrandfather,
      relationship: "GRANDFATHER",
    },
    {
      id: 4,
      name: "Bà",
      icon: Images.icGrandmother,
      relationship: "GRANDMOTHER",
    },
    {
      id: 5,
      name: "Anh",
      icon: Images.icBrother,
      relationship: "BROTHER",
    },
    {
      id: 6,
      name: "Chị",
      icon: Images.icSister,
      relationship: "SISTER",
    },
    {
      id: 7,
      name: "Khác",
      icon: Images.icOther,
      relationship: "OTHER",
    },
  ];

  useLayoutEffect(() => {
    setSubmitActive(deviceCode && deviceName);
  }, [deviceCode, deviceName]);

  useLayoutEffect(() => {
    if (route.params && route.params.isShowAlert) {
      setContentModal(String.addDeviceSuccess2)
      setShowModal(true)
    }
  }, []);

  const onQR = (qr) => {
    setDeviceCode(qr);
    console.log(qr);
  };

  const onPlaceChosen = (index) => {
    setSelectedIndex(index);
  };
  const onRelationship = () => {
    navigation.navigate(Consts.ScreenIds.Relationship, {
      selectedIndex: selectedIndex,
      data: dataMock,
      onChooseed: onPlaceChosen,
    });
  };
  const addDevice = () => {
    if (!submitActive) return;
    addDeviceApi(deviceCode, deviceName, dataMock[selectedIndex].icon, dataMock[selectedIndex].relationship, {
      success: resp => {
        if (resp.data) {
          if (resp.data.status === "PENDING") {
            setContentModal(String.addDeviceSuccess2)
            setShowModal(true)
            setDeviceCode("");
            setDeviceName("");
            setSelectedIndex(0);
          } else if (resp.data.status === "ACTIVE") {

            if (route.params && route.params.onRefresh) {
              route.params.onRefresh();
              navigation.goBack();
            } else {
              navigation.navigate(Consts.ScreenIds.Tabs);
            }
            showAlert(String.addDeviceSuccess, {
              close: () => {
                if (route.params && route.params.onRefresh) {
                  route.params.onRefresh();
                  navigation.goBack();
                } else {
                  navigation.navigate(Consts.ScreenIds.Tabs);
                }
              },
            });
          }
        }

      },
      failure: error => {
      },
      refLoading,
    }).then();
  };
  const onScan = async () => {
    try {
      var permissionAndroid;
      //Nếu là nền tảng android thì sẽ yêu cầu cấp quyền trước
      if (Platform.OS == "android") {
        permissionAndroid = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
        );
        if (permissionAndroid != "granted") {
          showAlert(String.noCameraPermission);
          return;
        }
      }

      navigation.navigate(Consts.ScreenIds.QRCodeScreen, { onQR: onQR });
    } catch (error) {
      alert(error.message);
    }
  };

  const showModalMes = () =>{
    return(
      <Modal
        animationType="slide"
        transparent={true}
        visible={showModal}>
        <View style={styles.modalContainer}>
          <View style={styles.modal}>
            <Text style={styles.titleModal}>{String.notification}</Text>
            <Text style={styles.contentModal}>{contentModal}</Text>
            <TouchableOpacity
              onPress={() =>{setShowModal(false)}}
              style={styles.btnConfirm}>
              <Text style={styles.textConfirm}>{String.confirm}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
  }

  return (
    <View style={styles.contain}>
      <Header title={String.header_addDevice} />
      <ScrollView style={{ paddingHorizontal: 30 }}>
        <View style={styles.viewImage}>
          <Image style={styles.Sty_Images} source={Images.icSmartwatch} resizeMode="contain" />
        </View>

        <View style={styles.input}>
          <Image style={styles.iconInput} source={Images.icSmartwatch3} resizeMode="center" />
          <TextInput
            value={deviceCode}
            placeholder={String.enterOrScanCode}
            placeholderTextColor="#B5B4B4"
            onChangeText={code => setDeviceCode(code)}
            style={styles.textInput} />
          <TouchableOpacity style={{ padding: "1%" }}
                            onPress={onScan}>
            <Image style={styles.iconInput} source={Images.icQRCode} resizeMode="center" />
          </TouchableOpacity>
        </View>

        <Text style={styles.txtInformation}>{String.genneralInfo}</Text>
        <View style={[styles.input,{marginBottom:20}]}>
          <Image style={styles.iconInput} source={Images.icUser2} resizeMode="center" />
          <TextInput
            placeholder={String.deviceNickname}
            onChangeText={name => setDeviceName(name)}
            placeholderTextColor="#B5B4B4"
            style={styles.textInput} />
        </View>
        <TouchableOpacity style={styles.input} onPress={() => onRelationship()}>
          <Image style={styles.iconInput} source={dataMock[selectedIndex].icon} resizeMode="center" />
          <Text style={styles.textInput}>{String.iAm}{dataMock[selectedIndex].name}{String.ofHe}</Text>
          <TouchableOpacity style={{ paddingVertical: "3%" }}>
            <Image style={styles.iconInput} source={Images.icDetail} resizeMode="center" />
          </TouchableOpacity>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={addDevice}
          style={styles.viewButton}>
          <Text style={styles.textSubmit}>{String.confirm}</Text>
        </TouchableOpacity>
      </ScrollView>
      {showModalMes()}
      <LoadingIndicator ref={refLoading} />
    </View>
  );
};
export default AddDeviceScreen;
