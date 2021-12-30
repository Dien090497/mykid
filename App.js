import {
  Platform,
  StatusBar,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { AlertDropHelper } from "./src/functions/AlertDropHelper";
import { Colors } from "./src/assets/colors/Colors";
import DropdownAlert from "react-native-dropdownalert";
import { Provider } from "react-redux";
import Routes from "./src/routes";
import { SafeAreaProvider } from "react-native-safe-area-context";
import redux from "./src/redux/config/redux";
import reduxStore from "./src/redux/config/redux";
import commonInfoAction from "./src/redux/actions/commonInfoAction";
import "./src/constants/IMLocalize";
import { fcmService } from "./src/FCMService";
import { localNotificationService } from "./src/LocalNotificationService";
import DataLocal from "./src/data/dataLocal";
import XmppClient from "./src/network/xmpp/XmppClient";
import Consts from "./src/functions/Consts";
import { finishVideoCallApi, rejectVideoCallApi } from "./src/network/VideoCallService";
import VideoCallModal from "./src/screens/VideoCall/VideoCallModal";
import { AppState } from "react-native";

let isNotiFirebase = false;
let dataVideoCall = null;

function setupCallKeep() {
  // const options = {
  //   android: {
  //     alertTitle: "Cấp quyền cuộc gọi cho ứng dụng",
  //     alertDescription:
  //       "Ứng dụng này cần truy cập vào tài khoản gọi điện thoại của bạn để thực hiện cuộc gọi",
  //     cancelButton: "Huỷ",
  //     okButton: "Đồng ý",
  //     imageName: "ic_launcher",
  //     additionalPermissions: [PermissionsAndroid.PERMISSIONS.READ_CONTACTS],
  //   },
  // };
  // try {
  //   RNCallKeep.setup(options);
  //   RNCallKeep.setAvailable(true); // Only used for Android, see doc above.
  // } catch (err) {
  //   console.error("initializeCallKeep error:", err.message);
  // }
}

export async function handleRemoteMessage(remoteMessage, isHeadless) {
  // dataVideoCall = remoteMessage?.data;
  isNotiFirebase = false;
  if (remoteMessage?.data?.type === "VIDEO_CALL") {
    if (remoteMessage?.data?.status === "INIT") {
      // await DataLocal.saveVideoCallInfo(dataVideoCall)
      console.log("ready...");
      console.log(remoteMessage);
      // if (remoteMessage?.data?.id) {
      //   const callUUID = remoteMessage?.data?.id;
      //   setupCallKeep();
      //   RNCallKeep.displayIncomingCall(
      //     callUUID,
      //     "Cuộc gọi đến",
      //     remoteMessage?.data.deviceName,
      //     "generic",
      //     true,
      //   );
      //   RNCallKeep.addEventListener("answerCall", ({ callUUID: uuid }) => {
      //     RNCallKeep.setCurrentCallActive(uuid);
      //     if (isHeadless) {
      //       RNCallKeep.openAppFromHeadlessMode(uuid);
      //     } else {
      //       console.log(uuid);
      //       RNCallKeep.backToForeground();
      //     }
      //   });
      //   RNCallKeep.addEventListener("endCall", ({ callUUID: uuid }) => {
      //     DataLocal.removeVideoCallInfo();
      //     if (isHeadless) {
      //       RNCallKeep.openAppFromHeadlessMode(uuid);
      //     } else {
      //       console.log(uuid);
      //       RNCallKeep.backToForeground();
      //     }
      //   });
      // }
      // Could also persist data here for later uses
    } else if (remoteMessage?.data?.status === "REJECTED" || remoteMessage?.data?.status === "ENDED") {
      isNotiFirebase = true;
      // RNCallKeep.endCall(remoteMessage?.data?.id + "");
    }
  }

}

setupCallKeep();
export default function App() {
  const [visibleCall, setVisibleCall] = useState({
    visible: false,
    server: null,
    data: [],
  });

  const routeRef = useRef();
  const appState = useRef(AppState.currentState);

  useEffect(() => {
    const subscription = AppState.addEventListener("change", nextAppState => {
      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === "active"
      ) {
      }

      appState.current = nextAppState;
      console.log(appState.current);
    });

    return () => {
      subscription.remove();
    };
  }, []);

  // fire base msg
  useEffect(() => {
    fcmService.registerAppWithFCM();
    fcmService.register(onRegister, onNotification, onOpenNotification);
    localNotificationService.configure(onOpenNotification);

    function onRegister(token) {
      console.log("[App] onRegister: ", token);
      DataLocal.tokenFirebase = token;
    }

    function onNotification(notify) {
      console.log("[App] onNotification: ", notify);
      const options = {
        soundName: (notify && notify.type === "VIDEO_CALL" && notify.status === "INIT") ? (Platform.OS === 'android' ? "love" : "love.mp3") : "default",
        playSound: true,
      };

      if (appState.current !== 'active' || (notify && (notify.type !== "VIDEO_CALL" || notify.status !== "INIT"))) {
        localNotificationService.showNotification(
          0,
          notify.title,
          notify.body,
          notify,
          options,
        );
      }
      if (notify && notify.type === "DEVICE_ACCEPTED") {
        reduxStore.store.dispatch(commonInfoAction.navigate({ navigate: Consts.ScreenIds.Tabs, deviceId: null }));
        XmppClient.updateRooms();
      } else if (notify && notify.type === "VIDEO_CALL") {
        // if (RNCallKeep.isCallActive(notify.id)) {
          if (notify?.status === "REJECTED" || notify?.status === "ENDED") {
            setVisibleCall({ visible: false, device: null, data: [] });
        //     isNotiFirebase = true;
        //     RNCallKeep.endCall(notify?.id + "");
          }
        // }
      }else if (notify && notify.type === "DEVICE_FRIEND"){
        XmppClient.updateRooms();
      }
       else if (notify && notify.type === "DEVICE_DELETED") {
        reduxStore.store.dispatch(commonInfoAction.replace({ replace: Consts.ScreenIds.AddDeviceScreen}));
      }
    }

    function onOpenNotification(notify) {
      console.log("[App] onOpenNotification: ", notify);
      if (notify && (notify.type === "LOW_BATTERY" || notify.type === "FULL_BATTERY")) {
        reduxStore.store.dispatch(commonInfoAction.navigate({ navigate: Consts.ScreenIds.Warning, deviceId: null }));
      } else if (notify && notify.type === "OUT_OF_SAFE_ZONE") {
        reduxStore.store.dispatch(commonInfoAction.navigate({
          navigate: Consts.ScreenIds.ElectronicFence,
          deviceId: null,
        }));
      } else if (notify && notify.type === "CHAT") {
        reduxStore.store.dispatch(commonInfoAction.navigate({ navigate: Consts.ScreenIds.Chat, deviceId: null }));
      } else if (notify && notify.type === "VIDEO_CALL") {
        console.log("[App] onOpenNotification: VIDEO_CALL", notify);
        isNotiFirebase = false;
        if (notify.status === "INIT") {
          // await DataLocal.saveVideoCallInfo(notify)
          setVisibleCall({
            visible: true,
            device: { deviceName: notify.deviceName },
            data: {
              id: Number(notify.id),
              status: notify.status,
              streamUrl: notify.streamUrl,
              password: notify.password === "" ? null : notify.password,
              caller: {
                accountId: Number(notify.accountId),
                relationship: notify.relationship,
                deviceName: notify.deviceName,
              },
            },
          });
        }

        // if (RNCallKeep.isCallActive(notify.id)) {
        //   if (notify?.status === "REJECTED" || notify?.status === "ENDED") {
        //     isNotiFirebase = true;
        //     RNCallKeep.endCall(notify?.id + "");
        //   }
        // }
      }
    }
    handleCallKeep();
    return () => {
      console.log("[App] unRegister");
      fcmService.unRegister();
      localNotificationService.unregister();
    };
  }, []);


  //call keep
  async function handleCallKeep() {
    // const extras = await RNCallKeep.getExtrasFromHeadlessMode();
    // const scs = await RNCallKeep.supportConnectionService();

    // console.log("supportConnectionService: ", scs);

    // RNCallKeep.addEventListener("answerCall", payload => {
    //   console.log("answerCall", payload);
    //   console.log("answerCall dataVideoCall", dataVideoCall);
    //   if (dataVideoCall) {
    //     setVisibleCall({
    //       visible: true,
    //       device: { deviceName: dataVideoCall?.deviceName },
    //       data: {
    //         id: Number(dataVideoCall?.id),
    //         status: dataVideoCall?.status,
    //         streamUrl: dataVideoCall?.streamUrl,
    //         password: dataVideoCall?.password === "" ? null : dataVideoCall?.password,
    //         caller: {
    //           accountId: Number(dataVideoCall?.accountId),
    //           relationship: dataVideoCall?.relationship,
    //           deviceName: dataVideoCall?.deviceName,
    //         },
    //       },
    //     });
    //   }
    //   RNCallKeep.backToForeground();
    // });
    // RNCallKeep.addEventListener("endCall", payload => {
    //   if (!isNotiFirebase) {
    //     if (!visibleCall.visible) {
    //       rejectVideoCallApi({}, payload.callUUID, {
    //         success: res => {
    //         },
    //       });
    //     }
    //   }
    //   console.log("endCall", payload);
    //   setVisibleCall({ visible: false, device: null, data: [] });
    //   isNotiFirebase = true;
    //   DataLocal.removeVideoCallInfo();
    // });

    // RNCallKeep.addEventListener("didDisplayIncomingCall", payload => {
    //   console.log("didDisplayIncomingCall", payload);
    // });

    // if (extras) {
    //   console.log("getExtrasFromHeadlessMode", extras);
    //   const dataCall = await DataLocal.getVideoCallInfo();
    //   const data =  JSON.parse(dataCall);
    //   if (data && data?.status === "INIT"){
    //     setVisibleCall({
    //       visible: true,
    //       device: { deviceName: data?.deviceName },
    //       data: {
    //         id: Number(data?.id),
    //         status: data?.status,
    //         streamUrl: data?.streamUrl,
    //         password: data?.password === "" ? null : data?.password,
    //         caller: {
    //           accountId: Number(data?.accountId),
    //           relationship: data?.relationship,
    //           deviceName: data?.deviceName,
    //         },
    //       },
    //     });
    //   }
    // }
  }

  return (
    <SafeAreaProvider>
      {visibleCall.visible ?
        <VideoCallModal
          visible={visibleCall.visible}
          device={visibleCall.device}
          toggleModal={() => {
            if (visibleCall?.data?.id) {
              setVisibleCall({ visible: false, device: null, data: [] });
              finishVideoCallApi({}, visibleCall?.data?.id, {
                success: res => {
                },
                failure: err => {
                }
              });
            }
          }}
          pickUp={true}
          data={visibleCall.data}
        /> :
        <Provider store={redux.store}>
          <Routes ref={routeRef} />
          <DropdownAlert
            closeInterval={15000}
            updateStatusBar={false}
            warnColor={Colors.yellow}
            defaultContainer={{
              paddingHorizontal: 8,
              paddingTop: StatusBar.currentHeight,
              flexDirection: "row",
            }}
            ref={ref => AlertDropHelper.setDropDown(ref)}
            onClose={() => AlertDropHelper.invokeOnClose()}
          />
        </Provider>}
    </SafeAreaProvider>
  );
}

