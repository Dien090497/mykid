import {
  PermissionsAndroid,
  StatusBar, View,
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
import RNCallKeep from "react-native-callkeep";
import XmppClient from "./src/network/xmpp/XmppClient";
import Consts from "./src/functions/Consts";
import { finishVideoCallApi, rejectVideoCallApi } from "./src/network/VideoCallService";
import videoCallAction from "./src/redux/actions/videoCallAction";
import VideoCallModal from "./src/screens/VideoCall/VideoCallModal";

let isNotiFirebase = false;
let dataVideoCall = null;

function setupCallKeep() {
  const options = {
    android: {
      alertTitle: "Permissions Required",
      alertDescription:
        "This application needs to access your phone calling accounts to make calls",
      cancelButton: "Cancel",
      okButton: "ok",
      imageName: "ic_launcher",
      additionalPermissions: [PermissionsAndroid.PERMISSIONS.READ_CONTACTS],
    },
  };
  try {
    RNCallKeep.setup(options);
    RNCallKeep.setAvailable(true); // Only used for Android, see doc above.
  } catch (err) {
    console.error("initializeCallKeep error:", err.message);
  }
}

export function handleRemoteMessage(remoteMessage, isHeadless) {
  dataVideoCall = remoteMessage?.data;
  isNotiFirebase = false;
  if (remoteMessage?.data?.type === "VIDEO_CALL") {
    if(!RNCallKeep.checkIfBusy()){
      if (remoteMessage?.data?.status === "INIT") {
        console.log("ready...");
        console.log(remoteMessage);
        if (remoteMessage?.data?.id) {
          const callUUID = remoteMessage?.data?.id;
          setupCallKeep();
          RNCallKeep.displayIncomingCall(
            callUUID,
            "Cuộc gọi đến",
            remoteMessage?.data.deviceName,
            "generic",
            true,
          );
          RNCallKeep.addEventListener("answerCall", ({ callUUID: uuid }) => {
            RNCallKeep.setCurrentCallActive(uuid);
            if (isHeadless) {
              RNCallKeep.openAppFromHeadlessMode(uuid);
            } else {
              console.log(uuid);
              RNCallKeep.backToForeground();
            }
          });
          RNCallKeep.addEventListener("endCall", ({ callUUID: uuid }) => {
            RNCallKeep.setCurrentCallActive(uuid);
            if (isHeadless) {
              RNCallKeep.openAppFromHeadlessMode(uuid);
            } else {
              console.log(uuid);
              RNCallKeep.backToForeground();
            }
          });
        }
        // Could also persist data here for later uses
      } else if (remoteMessage?.data?.status === "REJECTED" || remoteMessage?.data?.status === "ENDED") {
        isNotiFirebase = true;
        RNCallKeep.endCall(remoteMessage?.data?.id+"");
      }
    }else {
      RNCallKeep.rejectCall(remoteMessage?.data?.id+"")
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
  // fire base msg
  useEffect(() => {
    fcmService.registerAppWithFCM();
    fcmService.register(onRegister, onNotification, onOpenNotification);
    localNotificationService.configure(onOpenNotification);

    function onRegister(token) {
      console.log("[App] onRegister: ", token);
      DataLocal.tokenFirebase = token;
      // DataLocal.saveTokenFirebase(token);
    }

    function onNotification(notify) {
      console.log("[App] onNotification: ", notify);
      const options = {
        soundName: "default",
        playSound: true,
      };
      localNotificationService.showNotification(
        0,
        notify.title,
        notify.body,
        notify,
        options,
      );
      if (notify && notify.type === "DEVICE_ACCEPTED") {
        XmppClient.updateRooms();
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
        // routeRef.current.roadToMsgFromNotify(notify);
      } else if (notify && notify.type === "VIDEO_CALL") {
        console.log("[App] onOpenNotification: VIDEO_CALL", notify);
        if(!RNCallKeep.checkIfBusy()) {
          if (notify?.status === "REJECTED" || notify?.status === "ENDED") {
            isNotiFirebase = true;
            RNCallKeep.endCall(notify?.id + "");
          }
        }
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
    const extras = await RNCallKeep.getExtrasFromHeadlessMode();

    if (extras) {
      console.log("getExtrasFromHeadlessMode", extras);
    }

    const scs = await RNCallKeep.supportConnectionService();

    console.log("supportConnectionService: ", scs);

    RNCallKeep.addEventListener("answerCall", payload => {
      console.log("answerCall", payload);
      console.log("answerCall dataVideoCall", dataVideoCall);
      reduxStore.store.dispatch(commonInfoAction.navigate({
        navigate: Consts.ScreenIds.ElectronicFence,
        deviceId: null,
      }));
      if (dataVideoCall) {
        setVisibleCall({
          visible: true,
          device: { deviceName: dataVideoCall?.deviceName },
          data: {
            id: Number(dataVideoCall?.id),
            status: dataVideoCall?.status,
            streamUrl: dataVideoCall?.streamUrl,
            password: dataVideoCall?.password === ""? null :dataVideoCall?.password,
            caller: {
              accountId:  Number(dataVideoCall?.accountId),
              relationship: dataVideoCall?.relationship,
              deviceName: dataVideoCall?.deviceName,
            },
          },
        });
      }
      RNCallKeep.backToForeground();
    });
    RNCallKeep.addEventListener("endCall", payload => {
      if (!isNotiFirebase) {
        if (!visibleCall.visible){
          rejectVideoCallApi({}, payload.callUUID, {
            success: res => {
            },
          });
        }
      }
      console.log("endCall", payload);
    });

    RNCallKeep.addEventListener("didDisplayIncomingCall", payload => {
      console.log("didDisplayIncomingCall", payload);
    });
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
            });
          }
        }}
        pickUp={true}
        data={visibleCall.data}
      /> :

        <Provider store={redux.store}>
          <Routes ref={routeRef}/>
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

