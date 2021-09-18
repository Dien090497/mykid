import {Alert, Image, StyleSheet, Text} from 'react-native';
import {
  BottomTabBar,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
//tab bar
import Consts, {FontSize} from '../functions/Consts';
import React, {useEffect, useRef} from 'react';
import {appConfig, wsUrl} from '../network/http/ApiUrl';
import {isReadyRef, navigationRef} from './RootNavigation';

import AddDeviceScreen from '../screens/Profile/AddDeviceScreen';
import AddNewContact from '../screens/Settings/Contacts/addNew';
import AppConfig from '../data/AppConfig';
import ChangePassword from '../screens/Profile/ChangePassword';
import {Colors} from '../assets/colors/Colors';
import ConnectionScreen from '../screens/auth/ConnectionScreen';
import Contacts from '../screens/Settings/Contacts';
import DataLocal from '../data/dataLocal';
import DeviceManager from '../screens/Profile/DeviceManager';
import FindDevice from '../screens/Profile/FindDevice';
//screen
import HomeMainScreen from '../screens/Home/HomeMainScreen';
import Images from '../assets/Images';
import JourneyHistory from '../screens/Maps/Journey';
import ListDeviceScreen from '../screens/VideoCall';
//auth screen
import Login from '../screens/auth/Login';
import Maps from '../screens/Maps';
import Members from '../screens/Settings/Members';
import {NavigationContainer} from '@react-navigation/native';
import {Platform} from 'react-native';
import Profile from '../screens/Profile';
import QRCodeScreen from '../screens/Profile/QRCodeScreen';
import Register from '../screens/auth/Register';
import Relationship from '../screens/Profile/Relationship';
import SafeZone from '../screens/Maps/SafeZone';
import SettingScreen from '../screens/Settings';
import SoundSettings from '../screens/Profile/SoundSettings';
import SplashScreen from '../screens/Splash';
import StompWS from 'react-native-stomp-websocket';
import WS from './WebScoket';
import {createStackNavigator} from '@react-navigation/stack';
import {useSelector} from 'react-redux';
import { showAlert } from '../functions/utils';
import reduxStore from '../redux/config/redux';
import videoCallAction from '../redux/actions/videoCallAction';

const Tab = createBottomTabNavigator();

const styles = StyleSheet.create({
  bottomBar: {
    backgroundColor: Colors.white,
    paddingTop: 2,
  },
  tabLabel: {
    fontSize: FontSize.medium,
  },
  bottomHeightAndroid: {
    height: 60,
  },
});

const TabBarIcon = {
  [Consts.ScreenIds.HomeMainScreen]: Images.icHomeOn,
  [Consts.ScreenIds.Profile]: Images.icProfileOn,
};

const TabBarName = {
  [Consts.ScreenIds.HomeMainScreen]: 'HOME',
  [Consts.ScreenIds.Profile]: 'MY',
};

const renderTabBarIcon = (focused, route) => {
  const sizeIcon = focused ? 25 : 20;
  const tintColor = focused ? Colors.blueTitle : Colors.gray;
  return (
    <Image
      source={TabBarIcon[route.name]}
      style={{
        width: sizeIcon,
        height: sizeIcon,
        tintColor: tintColor,
      }}
      resizeMode="contain"
    />
  );
};

const renderTabBarLabel = (focused, route) => {
  const styleLabel = {
    color: focused ? Colors.blueTitle : Colors.gray,
    fontWeight: focused ? 'bold' : 'normal',
  };
  return (
    <Text
      children={TabBarName[route.name]}
      style={[styles.tabLabel, styleLabel]}
    />
  );
};
const TabBarBottom = () => {
  return (
    <Tab.Navigator
      tabBar={props => (
        <BottomTabBar
          {...props}
          style={[
            props.style,
            styles.bottomBar,
            Platform.OS === 'android' && styles.bottomHeightAndroid,
          ]}
        />
      )}
      tabBarOptions={{
        keyboardHidesTabBar: false,
      }}
      screenOptions={({route}) => ({
        tabBarIcon: ({focused}) => renderTabBarIcon(focused, route),
        tabBarLabel: ({focused}) => renderTabBarLabel(focused, route),
      })}>
      <Tab.Screen
        name={Consts.ScreenIds.HomeMainScreen}
        component={HomeMainScreen}
      />
      {/* <Tab.Screen name={Consts.ScreenIds.Support} component={Discover} /> */}
      <Tab.Screen name={Consts.ScreenIds.Profile} component={Profile} />
    </Tab.Navigator>
  );
};

const StackAuth = createStackNavigator();
const Auth = () => {
  return (
    <StackAuth.Navigator
      initialRouteName="Login"
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name={Consts.ScreenIds.Login} component={Login} />
      <Stack.Screen name={Consts.ScreenIds.Register} component={Register} />
      <Stack.Screen
        name={Consts.ScreenIds.ConnectionScreen}
        component={ConnectionScreen}
      />
      <Stack.Screen
        name={Consts.ScreenIds.AddDeviceScreen}
        component={AddDeviceScreen}
      />
    </StackAuth.Navigator>
  );
};

const StackRegister = createStackNavigator();
const DirectRegister = () => {
  return (
    <StackRegister.Navigator
      initialRouteName={Consts.ScreenIds.Register}
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name={Consts.ScreenIds.Register} component={Register} />
    </StackRegister.Navigator>
  );
};

const Stack = createStackNavigator();
const Routes = () => {
  useEffect(() => {
    return () => {
      isReadyRef.current = false;
    };
  });

  return (
    <NavigationContainer
      ref={navigationRef}
      onReady={() => {
        isReadyRef.current = true;
      }}>
      <Stack.Navigator
        initialRouteName="Splash"
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name={Consts.ScreenIds.Splash} component={SplashScreen} />
        <Stack.Screen name={Consts.ScreenIds.Tabs} component={TabBarBottom} />
        <Stack.Screen name={Consts.ScreenIds.Auth} component={Auth} />
        <Stack.Screen name={Consts.ScreenIds.Login} component={Login} />
        <Stack.Screen
          name={Consts.ScreenIds.ConnectionScreen}
          component={ConnectionScreen}
        />
        <Stack.Screen
          name={Consts.ScreenIds.AddDeviceScreen}
          component={AddDeviceScreen}
        />
        <Stack.Screen
          name={Consts.ScreenIds.DeviceManager}
          component={DeviceManager}
        />
        <Stack.Screen
          name={Consts.ScreenIds.FindDevice}
          component={FindDevice}
        />
        <Stack.Screen
          name={Consts.ScreenIds.SoundSettings}
          component={SoundSettings}
        />
        <Stack.Screen
          name={Consts.ScreenIds.Relationship}
          component={Relationship}
        />
        <Stack.Screen
          name={Consts.ScreenIds.QRCodeScreen}
          component={QRCodeScreen}
        />
        <Stack.Screen
          name={Consts.ScreenIds.Register}
          component={DirectRegister}
        />
        <Stack.Screen
          name={Consts.ScreenIds.Settings}
          component={SettingScreen}
        />
        <Stack.Screen
          name={Consts.ScreenIds.ChangePassword}
          component={ChangePassword}
        />
        <Stack.Screen
          name={Consts.ScreenIds.AddNewContact}
          component={AddNewContact}
        />
        <Stack.Screen name={Consts.ScreenIds.Contacts} component={Contacts} />
        <Stack.Screen name={Consts.ScreenIds.Members} component={Members} />
        <Stack.Screen name={Consts.ScreenIds.Maps} component={Maps} />
        <Stack.Screen
          name={Consts.ScreenIds.ListDevice}
          component={ListDeviceScreen}
        />
        <Stack.Screen
          name={Consts.ScreenIds.ElectronicFence}
          component={SafeZone}
        />
        <Stack.Screen
          name={Consts.ScreenIds.JourneyHistory}
          component={JourneyHistory}
        />
      </Stack.Navigator>
      <OS />
      {/* <WebsocketStomp /> */}
    </NavigationContainer>
  );
};

//config and init websocket
const OS = () => {
  const ws = useRef(null);
  const onOpen = async () => {
    console.log('Websocket Open!');
    if (ws.current?.send) {
      let command = "CONNECT\n" +
                "id:11111\n" +
                "accept-version:1.2\n" +
                "host:mykid.ttc.software\n" +
                "authorization:Bearer " + DataLocal.accessToken + "\n" +
                "content-length:0\n" +
                "\n\0";
      // let command = `CONNECT
      //               id:111
      //               accept-version:1.2
      //               host:${appConfig.rootDomain}
      //               authorization:Bearer ${DataLocal.accessToken}
      //               content-length:0\n\n\0`;
      await ws.current.send(command, true);

      // command = `SUBSCRIBE
      //           id:1111
      //           destination:/user/queue/video-calls
      //           content-length:0\n\n\0`;
        command = "SUBSCRIBE\n" +
                "id:111111\n" +
                "destination:/user/queue/video-calls\n" +
                "content-length:0\n" +
                "\n\0";
      await ws.current.send(command, true);
      

    }
  };

  const onClose = () => {
    console.log('Websocket Close!');
  };

  const onError = error => {
    console.log(JSON.stringify(error));
    console.log(error, 'Websocket Error!');
  };

  const onMessage = message => {
    if (message.data) {
      const split = message.data.split('\n');
      //['MESSAGE', 'event:INCOMING_CALL', 'destination:/user/queue/video-calls', 'content-type:application/json', 'subscription:111111', 'message-id:50952199-de98-32f6-b671-087214694a64-17', 'content-length:423', '', '{"id":213,"key":"ea0b71e8-6d4a-4093-95d5-d33316b6c…829Z","updatedAt":"2021-09-18T02:38:20.033829Z"}\x00']
      if (split[0] === 'MESSAGE' && split.length > 4 && split[2] === 'destination:/user/queue/video-calls') {
        const data = split.filter(val => val.includes('{'));
        if (data.length > 0) {
          if (split[1] === 'event:INCOMING_CALL') {
            // INCOMING_CALL
            reduxStore.store.dispatch(videoCallAction.incomingCall(data[0]));
          }
          else if (split[1] === 'event:REJECTED_CALL') {
            // REJECTED_CALL
            reduxStore.store.dispatch(videoCallAction.rejectedCall(data[0]));
          }
          else if (split[1] === 'event:ENDED_CALL') {
            // ENDED_CALL
            reduxStore.store.dispatch(videoCallAction.endedCall(data[0]));
          }
        }
        navigationRef.current?.navigate(Consts.ScreenIds.ListDevice);

      }
      console.log(message, 'Websocket Message');
    }
  };
  return (
    <WS
      ref={ws}
      url={wsUrl}
      onOpen={onOpen}
      onMessage={onMessage}
      onError={onError}
      onClose={onClose}
      reconnect={true} // Will try to reconnect onClose
    />
  );
};

const WebsocketStomp = ({}) => {
  const token = DataLocal.accessToken;
  const headers = {
    Authorization: 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpZCI6MSwiZXhwIjoxNjM1MTE1MzQ5LCJpYXQiOjE2MzE1MTUzNDksImVtYWlsIjoiaHlodW5nQGdtYWlsLmNvbSIsImp0aSI6IjkzZGExY2M4LThhODktNDZlNS04NTM4LThhYWMyMDE3YWYzZiJ9.F5z-iS_5pNGhmCaWL830jYiH5ZYPt4s3gcqm9PHxWP25fgSLTdJ303vajTfQlyB2Rn7lo7sD0Vaafe5vbfqKEF_wVlu4OkTpLa8--YVFZdkSEQoUmImaQrDZr2Zd5alEAx534KGV5Xku1SmVTG8DmBWwTVrXKO5nvbk73rzGupHN89ZyoAvh9u_tiu6bM8jvh7G1aurWkyeIo61toRf-W1bPTiV0HcszvyzZzLbunBFcTy015Le7tfGD1wfwn7iGrSXC5ZGLrfc9VlH3I5q_1d9vljUGM3m6uFG4lkIQsBGXwXv6ycCAFfXD7IWIcJGBdkPXyei-fEtVopbpAZ403tgjrlB0ilRXQRSfg6GXUmCU8i1B1SGrywPKNkC2neHvWtv6pH01QAIC0fQhSL-sx91tVteIXPK4CO99-mXI9XmR_-JH4sATG_KqHNkRmTOINHciilhpMMoL2YsCWqJiFPCGqFGZkZpgCelwwu_vJo6-gxE978E0pPZEKi2PytTXa8uPYxR65GPrtQgg2qsdHNYnSKeDe6rgKKc5vfmyrjlWPqgUWhxnjO9PMnxCzbLLr0NGXWQ38zT993Ehx3OfqipvYA7xrf9Nm3CyXdOhSh87GYSxSx8PZsSXINAtq8bmah8XcRt7Sp1YIc2mNOm05tB0zJEJrx7ltViCmJZpQ6M',
  };
  console.log('token', token, headers);

  const client = StompWS.client(wsUrl);
  client.debug = text => console.log(text);
  client.connect(
    headers,
    () => {
      client.subscribe(`/user/queue/video-calls`, data => {
        var message = JSON.parse(data);
        Alert(JSON.stringify(data));
        console.log('subscribe topic device out safezone');
      },
      headers);
      console.log('connect success');
    },
    function (e) {
      console.log('connect error', e);
    },
  );
  return null;
};

export default Routes;
