import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {navigationRef, isReadyRef} from './RootNavigation';

//screen
import HomeMainScreen from '../screens/Home/HomeMainScreen';
// import ListGame from "../screens/ListGame";
import Profile from '../screens/Profile';
//auth screen
import Login from '../screens/auth/Login';
import Register from '../screens/auth/Register';
import connectionScreen from '../screens/auth/connectionScreen';
//tab bar
import BottomTabBar from './BottomTabBar';
import SplashScreen from '../screens/Splash';
import Consts from '../functions/Consts';
import addDeviceScreen from "../screens/Profile/addDeviceScreen";
import relationship from "../screens/Profile/relationship";
import QRCodeScreen from "../screens/Profile/QRCodeScreen";

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
        <Stack.Screen
          name={Consts.ScreenIds.Register}
          component={DirectRegister}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Routes;
