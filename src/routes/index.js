import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { navigationRef, isReadyRef } from './RootNavigation';

//screen
import HomeMainScreen from '../screens/Home/HomeMainScreen';
// import ListGame from "../screens/ListGame";
import Profile from '../screens/Profile';
//auth screen
import Login from '../screens/auth/Login';
import Register from '../screens/auth/Register';
//tab bar
import BottomTabBar from './BottomTabBar';
import SplashScreen from '../screens/Splash';
import Consts from '../functions/Consts';
import SettingScreen from '../screens/Settings'
import AddNewContact from '../screens/Settings/Contacts/addNew'
import Contacts from '../screens/Settings/Contacts'


const Tab = createBottomTabNavigator();
const TabBarBottom = () => {
  return (
    <Tab.Navigator tabBar={(props) => <BottomTabBar {...props} />}>
      <Tab.Screen name={Consts.ScreenIds.HomeMainScreen} component={HomeMainScreen} />
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
      isReadyRef.current = false
    };
  })
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
        <Stack.Screen name={Consts.ScreenIds.Register} component={DirectRegister} />
        <Stack.Screen name={Consts.ScreenIds.Settings} component={SettingScreen} />
        <Stack.Screen name={Consts.ScreenIds.AddNewContact} component={AddNewContact} />
        <Stack.Screen name={Consts.ScreenIds.Contacts} component={Contacts} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Routes;
