import {
  BottomTabBar,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
//tab bar
import Consts, {FontSize} from '../functions/Consts';
import {Image, StyleSheet, Text} from 'react-native';
import React, {useEffect, useRef} from 'react';
import {isReadyRef, navigationRef} from './RootNavigation';

import AddDeviceScreen from '../screens/Profile/AddDeviceScreen';
import AddNewContact from '../screens/Settings/Contacts/addNew';
import ChangePassword from '../screens/Profile/ChangePassword';
import {Colors} from '../assets/colors/Colors';
import ConnectionScreen from '../screens/auth/ConnectionScreen';
import Contacts from '../screens/Settings/Contacts';
//screen
import HomeMainScreen from '../screens/Home/HomeMainScreen';
import Images from '../assets/Images';
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
import SettingScreen from '../screens/Settings';
import SplashScreen from '../screens/Splash';
import WS from './WebScoket';
import {createStackNavigator} from '@react-navigation/stack';
import DeviceManager from '../screens/Profile/DeviceManager';

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
      <Stack.Screen name={Consts.ScreenIds.ConnectionScreen} component={ConnectionScreen} />
      <Stack.Screen name={Consts.ScreenIds.AddDeviceScreen} component={AddDeviceScreen} />
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
        <Stack.Screen name={Consts.ScreenIds.ConnectionScreen} component={ConnectionScreen} />
        <Stack.Screen name={Consts.ScreenIds.AddDeviceScreen} component={AddDeviceScreen} />
        <Stack.Screen name={Consts.ScreenIds.DeviceManager} component={DeviceManager} />
        <Stack.Screen name={Consts.ScreenIds.Relationship} component={Relationship} />
        <Stack.Screen name={Consts.ScreenIds.QRCodeScreen} component={QRCodeScreen} />
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
      </Stack.Navigator>
      <OS />
    </NavigationContainer>
  );
};

//config and init websocket
const OS = () => {
  const ws = useRef(null);
  const onOpen = () => {
    console.log('Websocket Open!');
    if (ws.current?.send) {
      ws.current.send('Hello Mykid app'); //send example data test
    }
  };

  const onClose = () => {
    console.log('Websocket Close!');
  };

  const onError = error => {
    console.log(error, 'Websocket Error!');
  };

  const onMessage = message => {
    console.log(message, 'Websocket Message');
  };
  return (
    <WS
      ref={ws}
      url="wss://dragon.firecloud.live/ws"
      onOpen={onOpen}
      onMessage={onMessage}
      onError={onError}
      onClose={onClose}
      subProtocol={'janus-protocol'}
      reconnect // Will try to reconnect onClose
    />
  );
};

export default Routes;
