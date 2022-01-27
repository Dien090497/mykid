import {
  // PermissionsAndroid,
  Platform,
  StatusBar,
} from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import { AlertDropHelper } from './src/functions/AlertDropHelper';
import { Colors } from './src/assets/colors/Colors';
import DropdownAlert from 'react-native-dropdownalert';
import { Provider } from 'react-redux';
import Routes from './src/routes';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import redux from './src/redux/config/redux';
import reduxStore from './src/redux/config/redux';
import commonInfoAction from './src/redux/actions/commonInfoAction';
import './src/constants/IMLocalize';
import { fcmService } from './src/FCMService';
import { localNotificationService } from './src/LocalNotificationService';
import DataLocal from './src/data/dataLocal';
import XmppClient from './src/network/xmpp/XmppClient';
import Consts from './src/functions/Consts';
import { finishVideoCallApi, getInfoVideoCallApi, rejectVideoCallApi } from "./src/network/VideoCallService";
import VideoCallModal from './src/screens/VideoCall/VideoCallModal';
import { AppState } from 'react-native';
// import RNCallKeep from 'react-native-callkeep';
// import RNExitApp from 'react-native-exit-app';
// import RNVoipCall, { RNVoipPushKit } from 'react-native-voip-call';


// let isNotiFirebase = false;
// let dataVideoCall = null;

// function setupCallKeep() {
//   try {
//     if (Platform.OS === 'android') {
//       const options = {
//         android: {
//           alertTitle: 'Cấp quyền cuộc gọi cho ứng dụng',
//           alertDescription:
//             'Ứng dụng này cần truy cập vào tài khoản gọi điện thoại của bạn để thực hiện cuộc gọi',
//           cancelButton: 'Huỷ',
//           okButton: 'Đồng ý',
//           imageName: 'ic_launcher',
//           additionalPermissions: [PermissionsAndroid.PERMISSIONS.READ_CONTACTS],
//         },
//       };
//       RNCallKeep.setup(options);
//       RNCallKeep.setAvailable(true);
//     }
//   } catch (err) {
//     console.error('initializeCallKeep error:', err.message);
//   }
// }

export async function handleRemoteMessage(remoteMessage, isHeadless) {
   const dataVideoCall = remoteMessage?.data;
//   isNotiFirebase = false;
//   if (remoteMessage?.data?.type === 'VIDEO_CALL') {
    if (remoteMessage?.data?.status === 'INIT') {
      DataLocal.saveVideoCallInfo(dataVideoCall).then(r => {
        console.log('DataLocal save info Video call')
      })
//       if (remoteMessage?.data?.id) {
//         const callUUID = remoteMessage?.data?.id;
//         if (Platform.OS === 'android') {
//           setupCallKeep();
//           RNCallKeep.displayIncomingCall(
//             callUUID,
//             'My - Kid',
//             remoteMessage?.data.deviceName,
//             'generic',
//             true,
//           );
//           RNCallKeep.addEventListener('answerCall', ({ callUUID: uuid }) => {
//             RNCallKeep.setCurrentCallActive(uuid);
//             if (isHeadless) {
//               RNCallKeep.openAppFromHeadlessMode(uuid);
//             } else {
//               console.log(uuid);
//               RNCallKeep.backToForeground();
//             }
//           });
//           RNCallKeep.addEventListener('endCall', ({ callUUID: uuid }) => {
//             DataLocal.removeVideoCallInfo();
//             finishVideoCallApi({}, remoteMessage?.data?.id, {
//               success: res => {
//               },
//               failure: err => {
//               }
//             });
//           });
//         }
//       }
//       // Could also persist data here for later uses
    } else if (remoteMessage?.data?.status === 'REJECTED' || remoteMessage?.data?.status === 'ENDED') {
      DataLocal.removeVideoCallInfo().then(r => {
        console.log('DataLocal remove info Video call')
      });
//       isNotiFirebase = true;
//       if (Platform.OS === 'android') {
//         RNCallKeep.endCall(remoteMessage?.data?.id + '');
//       }
    }
//   }
}

export default function App() {
  const [visibleCall, setVisibleCall] = useState({
    visible: false,
    server: null,
    data: [],
  });

  const routeRef = useRef();
  const appState = useRef(AppState.currentState);

  useEffect(()=>{
    DataLocal.getVideoCallInfo().then( dataCall => {
      if (!dataCall) return;
      DataLocal.removeVideoCallInfo().then();
      const data =  JSON.parse(dataCall);
      if (data && data?.status === 'INIT' && !visibleCall.visible){
        setVisibleCall({
          visible: true,
          device: { deviceName: data?.deviceName },
          data: {
            id: Number(data?.id),
            status: data?.status,
            streamUrl: data?.streamUrl,
            password: data?.password === '' ? null : data?.password,
            caller: {
              accountId: Number(data?.accountId),
              relationship: data?.relationship,
              deviceName: data?.deviceName,
            },
          },
        });
      }
    });
  },[])

  // const rnVoipCallListners = async () => {
  //   RNVoipCall.onCallAnswer(data => {
  //     DataLocal.getVideoCallInfo().then( dataCall => {
  //       DataLocal.removeVideoCallInfo().then();
  //       const data =  JSON.parse(dataCall);
  //       if (data && data?.status === 'INIT'){
  //         setVisibleCall({
  //           visible: true,
  //           device: { deviceName: data?.deviceName },
  //           data: {
  //             id: Number(data?.id),
  //             status: data?.status,
  //             streamUrl: data?.streamUrl,
  //             password: data?.password === '' ? null : data?.password,
  //             caller: {
  //               accountId: Number(data?.accountId),
  //               relationship: data?.relationship,
  //               deviceName: data?.deviceName,
  //             },
  //           },
  //         });
  //       }
  //       RNVoipCall.endAllCalls();
  //     });
  //   });

  //   RNVoipCall.onEndCall(data=> {
  //     console.log('call endede',data);
  //     RNVoipCall.endCall(data?.callerId);
  //     DataLocal.getVideoCallInfo().then( dataCall => {
  //       DataLocal.removeVideoCallInfo().then();
  //       const data =  JSON.parse(dataCall);
  //       if (data && data?.status === 'INIT'){
  //         finishVideoCallApi({}, data?.id, {
  //           success: res => {
  //           },
  //           failure: err => {
  //           }
  //         });
  //       }
  //     });
  //   })
  // }

  // const iosPushKit = () => {
  //   //For Push Kit
  //   RNVoipPushKit.requestPermissions();              // --- optional, you can use another library to request permissions
  //   //Ios PushKit device token Listner
  //   RNVoipPushKit.getPushKitDeviceToken((res) => {
  //     if(res.platform === 'ios'){
  //     }
  //   });
  //   //On Remote Push notification Recived in Forground
  //   RNVoipPushKit.RemotePushKitNotificationReceived((notification)=>{
  //   });
  // }

  // const callKit = () => {
  //   let options = {
  //     appName:'initializeCall', // Required
  //     imageName:  'logo',  //string (optional) in ios Resource Folder
  //     ringtoneSound : '', //string (optional) If provided, it will be played when incoming calls received
  //     includesCallsInRecents: false, // boolean (optional) If provided, calls will be shown in the recent calls
  //     supportsVideo : true //boolean (optional) If provided, whether or not the application supports video calling (Default: true)
  //   }
  //   // Initlize Call Kit IOS is Required
  //   RNVoipCall.initializeCall(options).then(()=>{
  //     //Success Call Back
  //   }).catch(e=>console.log(e));
  // }

  useEffect(() => {
    const subscription = AppState.addEventListener('change', nextAppState => {
      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === 'active'
      ) {
      }

      appState.current = nextAppState;
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
      console.log('[App] onRegister: ', token);
      DataLocal.tokenFirebase = token;
    }

    function onNotification(notify) {
      console.log('[App] onNotification: ', notify);
      const options = {
        soundName: (notify && notify.type === 'VIDEO_CALL' && notify.status === 'INIT') ? (Platform.OS === 'android' ? 'reng' : 'reng.mp3') : 'default',
        playSound: true,
      };

      if (appState.current !== 'active' || (notify && (notify.type !== 'VIDEO_CALL' || notify.status !== 'INIT'))) {
        localNotificationService.showNotification(
          0,
          notify.title,
          notify.body,
          notify,
          options,
        );
      }
      if (notify && notify.type === 'DEVICE_ACCEPTED') {
        reduxStore.store.dispatch(commonInfoAction.navigate({ navigate: Consts.ScreenIds.Tabs, deviceId: null }));
        XmppClient.updateRooms();
      } else if (notify && notify.type === 'VIDEO_CALL') {
        let reduxID = reduxStore.store.getState().commonInfoReducer.isInComing;
        if (reduxID === null) { reduxID = '' }
        else reduxID = reduxID + ''
        if (notify.status === 'INIT') {
          // INCOMING_CALL
          if (reduxID === ''){
            reduxStore.store.dispatch(commonInfoAction.isInComing({isInComing: notify.id }));
              // reduxStore.store.dispatch(commonInfoAction.isInComing({isInComing: notify.id }));
              setVisibleCall({
                visible: true,
                device: { deviceName: notify.deviceName },
                data: {
                  id: Number(notify.id),
                  status: notify.status,
                  streamUrl: notify.streamUrl,
                  password: notify.password === '' ? null : notify.password,
                  caller: {
                    accountId: Number(notify.accountId),
                    relationship: notify.relationship,
                    deviceName: notify.deviceName,
                  },
                },
              });
          } else if ( notify.id === reduxID ) {
          } else if (reduxID !== '' && notify.id !== reduxID ) {
            rejectVideoCallApi({}, notify.id)
          }
        } else if (notify.status === 'REJECTED') {
          // REJECTED_CALL
          if ( reduxID === notify.id || reduxID === '' ){
            setVisibleCall({ visible: false, device: null, data: [] });
            reduxStore.store.dispatch(commonInfoAction.isInComing({isInComing: null }));
          } else {
          }
        } else if (notify.status === 'ENDED') {
          // ENDED_CALL
          if ( reduxID === notify.id || reduxID === '' ){
            reduxStore.store.dispatch(commonInfoAction.isInComing({isInComing: null }));
            setVisibleCall({ visible: false, device: null, data: [] });
          } else {
          }
        }
        // if (Platform.OS === 'android') {
        // //   if (RNCallKeep.isCallActive(notify.id)) {
        // //     if (notify?.status === 'REJECTED' || notify?.status === 'ENDED') {
        // //       setVisibleCall({ visible: false, device: null, data: [] });
        // //       isNotiFirebase = true;

        // //       RNCallKeep.endCall(notify?.id + '');
        // //       finishVideoCallApi({}, notify?.id, {
        // //         success: res => {
        // //         },
        // //         failure: err => {
        // //         },
        // //       });
        // //       DataLocal.removeVideoCallInfo().then(r => {
        // //         RNExitApp.exitApp();
        // //       });
        // //     }
        // //   }
        // // } else {
        // //   DataLocal.removeVideoCallInfo().then(r => {
        // //     RNExitApp.exitApp();
        // //   });
        // // }
        //   const reduxID = reduxStore.store.getState().commonInfoReducer.isInComing.toString();

        //   if (notify.status === 'INIT') {
        //     // INCOMING_CALL
        //     if (reduxID === null){
        //       reduxStore.store.dispatch(commonInfoAction.isInComing({isInComing: notify.id }));
        //     }else if ( notify.id === reduxID ){

        //     }else if (reduxID !== null && notify.id !== reduxID ){
        //       rejectVideoCallApi({}, notify.id)
        //     }
        //   } else if (notify.status === 'REJECTED') {
        //     // REJECTED_CALL
        //     if ( reduxID === notify.id){
        //       setVisibleCall({ visible: false, device: null, data: [] });
        //       reduxStore.store.dispatch(commonInfoAction.isInComing({isInComing: null }));
        //     }else if (reduxID === null ){
        //       setVisibleCall({ visible: false, device: null, data: [] });
        //       reduxStore.store.dispatch(commonInfoAction.isInComing({isInComing: null }));
        //     } else {

        //     }
        //   } else if (notify.status === 'ENDED') {
        //     // ENDED_CALL
        //     if ( reduxID === notify.id){
        //       setVisibleCall({ visible: false, device: null, data: [] });
        //       reduxStore.store.dispatch(commonInfoAction.isInComing({isInComing: null }));
        //     }else if (reduxID === null ){
        //       reduxStore.store.dispatch(commonInfoAction.isInComing({isInComing: null }));
        //       setVisibleCall({ visible: false, device: null, data: [] });
        //     } else {

        //     }
        //   }
        // } else {
        //   if (notify.status === 'INIT' && visibleCall.visible) {
        //     rejectVideoCallApi({}, notify.id)
        //   } else if (notify.status === 'REJECTED' || notify.status === 'ENDED') {
        //     setVisibleCall({ visible: false, device: null, data: [] });
        //   }
        // }
      }else if (notify && notify.type === 'DEVICE_FRIEND'){
        XmppClient.updateRooms();
      }
      else if (notify && notify.type === 'DEVICE_DELETED') {
        reduxStore.store.dispatch(commonInfoAction.replace({ replace: Consts.ScreenIds.AddDeviceScreen}));
      }
    }

    function onOpenNotification(notify) {
      console.log('[App] onOpenNotification: ', notify);
      if (notify && (notify.type === 'LOW_BATTERY' || notify.type === 'FULL_BATTERY')) {
        reduxStore.store.dispatch(commonInfoAction.navigate({ navigate: Consts.ScreenIds.Warning, deviceId: null }));
      } else if (notify && notify.type === 'OUT_OF_SAFE_ZONE') {
        reduxStore.store.dispatch(commonInfoAction.navigate({
          navigate: Consts.ScreenIds.ElectronicFence,
          deviceId: null,
        }));
      } else if (notify && notify.type === 'CHAT') {
        reduxStore.store.dispatch(commonInfoAction.navigate({ navigate: Consts.ScreenIds.Chat, deviceId: null }));
      } else if (notify && notify.type === 'VIDEO_CALL') {
        console.log('[App] onOpenNotification: VIDEO_CALL', notify);
        // isNotiFirebase = false;
        if (notify.status === 'INIT') {
          getInfoVideoCallApi(notify.id,{
            success: res=>{
              if (res.data === 'INIT'){
                if (visibleCall.visible){

                } else {
                  // DataLocal.saveVideoCallInfo(notify).then(() => {
                  // reduxStore.store.dispatch(commonInfoAction.isInComing({isInComing: notify.id }));
                  setVisibleCall({
                    visible: true,
                    device: { deviceName: notify.deviceName },
                    data: {
                      id: Number(notify.id),
                      status: notify.status,
                      streamUrl: notify.streamUrl,
                      password: notify.password === '' ? null : notify.password,
                      caller: {
                        accountId: Number(notify.accountId),
                        relationship: notify.relationship,
                        deviceName: notify.deviceName,
                      },
                    },
                  });
                }
              }
            },
            failure: err =>{
            },
          })
        }
      }
    }
    return () => {
      console.log('[App] unRegister');
      fcmService.unRegister();
      localNotificationService.unregister();
    };
  }, []);

  // useEffect(()=>{
  //   if (Platform.OS === 'ios') return;
  //   RNCallKeep.removeEventListener('endCall');
  //   RNCallKeep.addEventListener('endCall',()=>{
  //     DataLocal.removeVideoCallInfo();
  //   })
  //   handleCallKeep().then(r => {
  //     RNCallKeep.endAllCalls()
  //   })
  // })

  //call keep
  // async function handleCallKeep() {
  //   const dataCall = await DataLocal.getVideoCallInfo();
  //   const data =  JSON.parse(dataCall);
  //   if (data && data?.status === 'INIT'){
  //     setVisibleCall({
  //       visible: true,
  //       device: { deviceName: data?.deviceName },
  //       data: {
  //         id: Number(data?.id),
  //         status: data?.status,
  //         streamUrl: data?.streamUrl,
  //         password: data?.password === '' ? null : data?.password,
  //         caller: {
  //           accountId: Number(data?.accountId),
  //           relationship: data?.relationship,
  //           deviceName: data?.deviceName,
  //         },
  //       },
  //     });
  //   }
  // }

  return (
    <SafeAreaProvider>
      {visibleCall.visible ?
        <VideoCallModal
          visible={visibleCall.visible}
          device={visibleCall.device}
          toggleModal={() => {
            if (visibleCall?.data?.id) {
              setVisibleCall({ visible: false, device: null, data: [] });
              reduxStore.store.dispatch(commonInfoAction.isInComing({isInComing: null }));
              finishVideoCallApi({}, visibleCall?.data?.id, {
                success: res => {
                },
                failure: err => {
                }
              }).then(r => {
                // DataLocal.removeVideoCallInfo().then(r => {
                //   RNExitApp.exitApp();
                // });
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
              flexDirection: 'row',
            }}
            ref={ref => AlertDropHelper.setDropDown(ref)}
            onClose={() => AlertDropHelper.invokeOnClose()}
          />
        </Provider>}
    </SafeAreaProvider>
  );
}

