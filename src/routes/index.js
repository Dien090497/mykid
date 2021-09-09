import React, {useEffect} from 'react';
import {isReadyRef, navigationRef} from './RootNavigation';

import AddNewContact from '../screens/Settings/Contacts/addNew'
//tab bar
import BottomTabBar from './BottomTabBar';
import Consts from '../functions/Consts';
import Contacts from '../screens/Settings/Contacts'
import Header from '../components/Header';
//screen
import HomeMainScreen from '../screens/Home/HomeMainScreen';
import ListDeviceScreen from '../screens/VideoCall'
//auth screen
import Login from '../screens/auth/Login';
import Maps from '../screens/Maps';
import Members from "../screens/Settings/Members"
import {NavigationContainer} from '@react-navigation/native';
// import ListGame from "../screens/ListGame";
import Profile from '../screens/Profile';
import QRCodeScreen from "../screens/Profile/QRCodeScreen";
import Register from '../screens/auth/Register';
import SettingScreen from '../screens/Settings'
import SplashScreen from '../screens/Splash';
import addDeviceScreen from "../screens/Profile/addDeviceScreen";
import connectionScreen from '../screens/auth/connectionScreen';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import relationship from "../screens/Profile/relationship";

const Tab = createBottomTabNavigator();
const TabBarBottom = () => {
  return (
    <Tab.Navigator tabBar={props => <BottomTabBar {...props} />}>
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
      <Stack.Screen name={Consts.ScreenIds.connection} component={connectionScreen} />
      <Stack.Screen name={Consts.ScreenIds.addDeviceScreen} component={addDeviceScreen} />
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
        <Stack.Screen name={Consts.ScreenIds.relationship} component={relationship} />
        <Stack.Screen name={Consts.ScreenIds.QRCodeScreen} component={QRCodeScreen} />
        <Stack.Screen name={Consts.ScreenIds.Register} component={DirectRegister} />
        <Stack.Screen name={Consts.ScreenIds.Settings} component={SettingScreen} />
        <Stack.Screen name={Consts.ScreenIds.AddNewContact} component={AddNewContact} />
        <Stack.Screen name={Consts.ScreenIds.Contacts} component={Contacts} />
        <Stack.Screen name={Consts.ScreenIds.Members} component={Members} />
        <Stack.Screen name={Consts.ScreenIds.Maps} component={Maps} />
        <Stack.Screen
          name={Consts.ScreenIds.ListDevice}
          component={ListDeviceScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Routes;
