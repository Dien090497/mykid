import {
  StatusBar,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import {AlertDropHelper} from './src/functions/AlertDropHelper';
import {Colors} from './src/assets/colors/Colors';
import DropdownAlert from 'react-native-dropdownalert';
import {Provider} from 'react-redux';
import Routes from './src/routes';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import redux from './src/redux/config/redux';
import './src/constants/IMLocalize';
import {fcmService} from './src/FCMService'
import {localNotificationService} from './src/LocalNotificationService'
import DataLocal from "./src/data/dataLocal";
import uuid from 'uuid';
import RNCallKeep from 'react-native-callkeep';
import XmppClient from "./src/network/xmpp/XmppClient";
export default function App() {
  const routeRef = useRef();
  // Initialise RNCallKeep
  const setup = () => {
    const options = {
      ios: {
        appName: 'ReactNativeMykid',
        imageName: 'sim_icon',
        supportsVideo: true,
        maximumCallGroups: '1',
        maximumCallsPerCallGroup: '1'
      },
      android: {
        alertTitle: 'Permissions Required',
        alertDescription:
          'This application needs to access your phone calling accounts to make calls',
        cancelButton: 'Cancel',
        okButton: 'ok',
        imageName: 'sim_icon',
        foregroundService: {
          channelId: 'com.mykid',
          channelName: 'Foreground service for my app',
          notificationTitle: 'My app is running on background',
          notificationIcon: 'Path to the resource icon of the notification',
        },
      }
    };

    try {
      RNCallKeep.setup(options);
      RNCallKeep.setAvailable(true); // Only used for Android, see doc above.
    } catch (err) {
      console.error('initializeCallKeep error:', err.message);
    }
  }

  // Use startCall to ask the system to start a call - Initiate an outgoing call from this point
  const startCall = ({ id,handle, localizedCallerName }) => {
    // Your normal start call action
    RNCallKeep.startCall(id, handle, localizedCallerName);
  };

  const reportEndCallWithUUID = (callUUID, reason) => {
    RNCallKeep.reportEndCallWithUUID(callUUID, reason);
  }

  // Event Listener Callbacks

  const didReceiveStartCallAction = (data) => {
    let { handle, callUUID, name } = data;
    // Get this event after the system decides you can start a call
    // You can now start a call from within your app
  };

  const onAnswerCallAction = (data) => {
    let { callUUID } = data;
    // Called when the user answers an incoming call
  };

  const onEndCallAction = (data) => {
    let { callUUID } = data;
    RNCallKeep.endCall(data.id);

    this.currentCallId = null;
  };

  // Currently iOS only
  const onIncomingCallDisplayed = (data) => {
    let { error } = data;
    // You will get this event after RNCallKeep finishes showing incoming call UI
    // You can check if there was an error while displaying
    RNCallKeep.displayIncomingCall(data.id, data.relationship, data.relationship, 'generic', true, null);

  };

  const onToggleMute = (data) => {
    let { muted, callUUID } = data;
    // Called when the system or user mutes a call
  };

  const onToggleHold = (data) => {
    let { hold, callUUID } = data;
    // Called when the system or user holds a call
  };

  const onDTMFAction = (data) => {
    let { digits, callUUID } = data;
    // Called when the system or user performs a DTMF action
  };

  const audioSessionActivated = (data) => {
    // you might want to do following things when receiving this event:
    // - Start playing ringback if it is an outgoing call
  };

  function initCallKeep() {
    RNCallKeep.addEventListener('didReceiveStartCallAction', didReceiveStartCallAction);
    RNCallKeep.addEventListener('answerCall', onAnswerCallAction);
    RNCallKeep.addEventListener('endCall', onEndCallAction);
    RNCallKeep.addEventListener('didDisplayIncomingCall', onIncomingCallDisplayed);
    RNCallKeep.addEventListener('didPerformSetMutedCallAction', onToggleMute);
    RNCallKeep.addEventListener('didToggleHoldCallAction', onToggleHold);
    RNCallKeep.addEventListener('didPerformDTMFAction',onDTMFAction);
    RNCallKeep.addEventListener('didActivateAudioSession', audioSessionActivated);
    setup();
  }

  // fire base msg
  useEffect(() => {
    fcmService.registerAppWithFCM()
    fcmService.register(onRegister, onNotification, onOpenNotification)
    localNotificationService.configure(onOpenNotification)

    function onRegister(token) {
      console.log("[App] onRegister: ", token)
      DataLocal.tokenFirebase = token;
      // DataLocal.saveTokenFirebase(token);
    }

    function onNotification(notify) {
      console.log("[App] onNotification: ", notify)
      const options = {
        soundName: 'default',
        playSound: true,
      }
      localNotificationService.showNotification(
        0,
        notify.title,
        notify.body,
        notify,
        options
      )
      if (notify && notify.type === 'DEVICE_ACCEPTED') {
        XmppClient.updateRooms();
      }
    }

    function onOpenNotification(notify) {
      console.log("[App] onOpenNotification: ", notify)
      if (notify && notify.type === 'CHAT'){
        routeRef.current.roadToMsgFromNotify(notify);
      }else if(notify && notify.type === 'VIDEO_CALL'){
        console.log("[App] onOpenNotification: VIDEO_CALL", notify)
        // startCall(notify.id,notify.relationship,notify.relationship);
        onIncomingCallDisplayed(notify);
      }
    }

    initCallKeep();
    return () => {
      console.log("[App] unRegister")
      fcmService.unRegister()
      localNotificationService.unregister()
    }

  }, [])

  return (
    <SafeAreaProvider>
        <Provider store={redux.store}>
         <Routes ref = {routeRef}/>
         <DropdownAlert
            closeInterval={15000}
            updateStatusBar={false}
            warnColor={Colors.yellow}
            defaultContainer={{
              paddingHorizontal: 8,
              paddingTop: StatusBar.currentHeight,
              flexDirection: 'row',
            }}
            ref={ref => AlertDropHelper.setDropDown(ref)}
            onClose={() => AlertDropHelper.invokeOnClose()}
          />
        </Provider>
      </SafeAreaProvider>
    );
}

