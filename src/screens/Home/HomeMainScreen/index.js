import { Image, StatusBar, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";

import { Menu, MenuItem, MenuDivider } from "react-native-material-menu";
import Consts, { ScaleHeight } from "../../../functions/Consts";
import Images from "../../../assets/Images";
import LoadingIndicator from "../../../components/LoadingIndicator";
import { String } from "../../../assets/strings/String";
import { styles } from "./styles";
import { useNavigation } from "@react-navigation/native";
import { showAlert } from "../../../functions/utils";
import { deleteDevicesApi, getListDeviceApi } from "../../../network/DeviceService";
import DataLocal from "../../../data/dataLocal";
import reduxStore from "../../../redux/config/redux";
import { useSelector } from "react-redux";
import commonInfoAction from "../../../redux/actions/commonInfoAction";


export default function HomeMainScreen() {
  const navigation = useNavigation();
  const commonInfoReducer = useSelector(state => state.commonInfoReducer);
  const refLoading = useRef();
  const [showMenu, setShowMenu] = useState(false);
  const [devices, setDevices] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(DataLocal.deviceIndex);

  useLayoutEffect(() => {
    getListDeviceApi(DataLocal.userInfo.id, Consts.pageDefault, 100, "", "ACTIVE", {
      success: resData => {
        setDevices(resData.data);
      },
      refLoading,
    });
  }, []);

  useLayoutEffect(() => {
    if (commonInfoReducer.selectDevice === null || commonInfoReducer.selectDevice === undefined) {
      return;
    }
    setSelectedIndex(commonInfoReducer.selectDevice);
    reduxStore.store.dispatch(commonInfoAction.reset());
  }, [commonInfoReducer]);

  const pressMap = () => {
    navigation.navigate(Consts.ScreenIds.Maps);
  };

  const pressChat = () => {
    navigation.navigate(Consts.ScreenIds.Chat);
  };

  const pressVideoCall = () => {
    navigation.navigate(Consts.ScreenIds.ListDevice);
  };

  const pressJourney = () => {
    navigation.navigate(Consts.ScreenIds.JourneyHistory);
  };

  const pressSafeArea = () => {
    navigation.navigate(Consts.ScreenIds.ElectronicFence);
  };

  const pressAlarm = () => {
    navigation.navigate(Consts.ScreenIds.SoundSettings);
  };

  const pressFindDevice = () => {
    navigation.navigate(Consts.ScreenIds.FindDevice);
  };

  const pressEntertainment = () => {
    showAlert(String.thisFunctionIsNotValid);
  };

  const pressAlarmClock = () => {
    navigation.navigate(Consts.ScreenIds.AlarmClock);
  };

  const pressSettings = () => {
    navigation.navigate(Consts.ScreenIds.Settings);
  };
  const buttonProps = { activeOpacity: 0.8 };

  const handleChange = async (index) => {
    setSelectedIndex(index);
    await DataLocal.saveDeviceIndex(index);
    await DataLocal.saveDeviceId(devices[index].deviceId)
    navigation.navigate(Consts.ScreenIds.InforKits);
  };

  return (
    <View style={styles.container}>
      <StatusBar translucent backgroundColor="transparent" />
      <View style={styles.statusBar}>
        <Image
          source={Images.bgHome}
          resizeMode={"stretch"}
          style={styles.banner}
        />
        <Text style={styles.txtTitle}>V-KID PRO</Text>
        <View style={styles.menu}>
          <Menu
            style={{ borderRadius: 15 }}
            visible={showMenu}
            anchor={<TouchableOpacity style={styles.menuSelect} onPress={() => setShowMenu(true)}>
              <Image source={Images.icShow} style={styles.iconShowMenu} resizeMode="stretch" />
              <Text style={styles.textMenuShow}>{devices && devices[selectedIndex].deviceName}</Text>
              <Image
                source={devices && devices[selectedIndex].avatar ? { uri: devices[selectedIndex].avatar } : Images.icOther}
                style={styles.avatar} resizeMode="stretch" />
            </TouchableOpacity>}
            onRequestClose={() => {
              setShowMenu(false);
            }}
          >
            {devices && devices.map((obj, i) => {
              return (
                <View style={{ paddingHorizontal: 10 }}>
                  <View style={styles.viewMenuDrop} onStartShouldSetResponder={() => {
                    handleChange(i);
                  }}>
                    <Text style={styles.textMenuDrop}>{obj.deviceName}</Text>
                    <Image source={obj.avatar ? { uri: obj.avatar } : Images.icOther} style={styles.avatar}
                           resizeMode="stretch" />
                  </View>
                  <MenuDivider />
                </View>
              );
            })}
          </Menu>
        </View>
      </View>

      <View style={styles.body}>
        <View style={[{ minHeight: "39%", width: "50%" }]}>
          <View style={[styles.buttonContainerL, { width: "100%" }]}>
            <TouchableOpacity
              {...buttonProps}
              style={styles.button}
              onPress={pressMap}>
              <View style={styles.bgIcon}>
                <Image source={Images.icMap} style={styles.icon} />
              </View>
              <Text style={styles.buttonText}>{String.home_gps}</Text>
            </TouchableOpacity>
          </View>
          <View style={[styles.buttonContainerL, { width: "100%" }]}>
            <TouchableOpacity
              {...buttonProps}
              style={styles.button}
              onPress={pressJourney}>
              <View style={styles.bgIcon}>
                <Image source={Images.icJourney} style={styles.icon} />
              </View>
              <Text style={styles.buttonText}>{String.home_journey}</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={[styles.buttonContainerR, { minHeight: "39%" }]}>
          <TouchableOpacity
            {...buttonProps}
            style={styles.button}
            onPress={pressVideoCall}>
            <View style={styles.bgIcon}>
              <Image source={Images.icVideoCall} style={styles.icon} />
            </View>
            <Text style={styles.buttonText}>{String.home_videoCall}</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.buttonContainerL}>
          <TouchableOpacity
            {...buttonProps}
            style={styles.button}
            onPress={pressSafeArea}>
            <View style={styles.bgIcon}>
              <Image source={Images.icSafeZone} style={styles.icon} />
            </View>
            <Text style={styles.buttonText}>{String.home_safeArea}</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.buttonContainerR}>
          <TouchableOpacity
            {...buttonProps}
            style={styles.button}
            onPress={pressAlarm}>
            <View style={styles.bgIcon}>
              <Image source={Images.icSoundSetting} style={styles.icon} />
            </View>
            <Text style={styles.buttonText}>{String.home_alarm}</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.buttonContainerL}>
          <TouchableOpacity
            {...buttonProps}
            style={styles.button}
            onPress={pressAlarmClock}>
            <View style={styles.bgIcon}>
              <Image source={Images.icAlarm} style={styles.icon} />
            </View>
            <Text style={styles.buttonText}>{String.home_alarmClock}</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.buttonContainerR}>
          <TouchableOpacity
            {...buttonProps}
            style={styles.button}
            onPress={pressChat}>
            <View style={styles.bgIcon}>
              <Image source={Images.icChat} style={styles.icon} />
            </View>
            <Text style={styles.buttonText}>{String.home_chat}</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.buttonContainerL}>
          <TouchableOpacity
            {...buttonProps}
            style={styles.button}
            onPress={pressFindDevice}>
            <View style={styles.bgIcon}>
              <Image source={Images.icFindDevice} style={styles.icon} />
            </View>
            <Text style={styles.buttonText}>{String.home_findDevice}</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.buttonContainerR}>
          <TouchableOpacity
            {...buttonProps}
            style={styles.button}
            onPress={pressSettings}>
            <View style={styles.bgIcon}>
              <Image source={Images.icSetting} style={styles.icon} />
            </View>
            <Text style={styles.buttonText}>{String.home_setting}</Text>
          </TouchableOpacity>
        </View>
      </View>
      <LoadingIndicator ref={refLoading} />
    </View>
  );
}
