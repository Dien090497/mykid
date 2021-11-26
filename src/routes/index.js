import {Image, StyleSheet, Text} from 'react-native';
import {
  BottomTabBar,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
//tab bar
import Consts, {FontSize, ScaleHeight} from '../functions/Consts';
import {Platform} from 'react-native';
import React, { forwardRef, useEffect, useImperativeHandle, useRef } from "react";
import {isReadyRef, navigationRef} from './RootNavigation';

import AddDeviceScreen from '../screens/Profile/AddDeviceScreen';
import AddNewContact from '../screens/Settings/Contacts/AddNew';
import ChangePassword from '../screens/Profile/ChangePassword';
import {Colors} from '../assets/colors/Colors';
import ConnectionScreen from '../screens/auth/ConnectionScreen';
import Contacts from '../screens/Settings/Contacts';
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
import Profile from '../screens/Profile';
import QRCodeScreen from '../screens/Profile/QRCodeScreen';
import Register from '../screens/auth/Register';
import OTP from '../screens/auth/Register/OTP'
import Relationship from '../screens/Profile/Relationship';
import SafeZone from '../screens/Maps/SafeZone';
import SettingScreen from '../screens/Settings';
import RewardPoints from '../screens/RewardPoints';
import SecretPhotoShoot from '../screens/SecretPhotoShoot';
import Chat from '../screens/Chat';
import RoomChat from '../screens/Chat/RoomChat';
import DeleteMessage from '../screens/Chat/DeleteMessage';
import SoundSettings from '../screens/Profile/SoundSettings';
import AlarmClock from '../screens/Profile/AlarmClock';
import EacesDroping from '../screens/Settings/EacesDroping';
import DoNotDisturb from '../screens/Profile/DoNotDisturb';
import DisturbSetting from '../screens/Profile/DoNotDisturb/DisturbSetting';
import AlarmSetting from '../screens/Profile/AlarmClock/AlarmSetting';
import SplashScreen from '../screens/Splash';
import PersonalData from '../screens/Profile/PersonalData';
import Warning from '../screens/Warning'
import Health from '../screens/Health'
import DetailHealth from '../screens/Health/DetailHealth'
import SMS from '../screens/SMS'
import SMSDetail from '../screens/SMS/SMSDetail'

import {createStackNavigator} from '@react-navigation/stack';
import LanguageTimeZone from '../screens/Profile/LanguageTimeZone';
import OffDevice from '../screens/Settings/OffDevice';
import InstallPosition from '../screens/Settings/InstallPosition';
import StartDevice from '../screens/Settings/RestartDevice';
import EditDevice from '../screens/Profile/DeviceManager/EditDevice'
import InfoKits from '../screens/Home/InfoKids';
import ForgotPassword from '../screens/auth/ForgotPassword';
import UpdatePassword from '../screens/auth/ForgotPassword/UpdatePassword';
import Paying from "../screens/Paying";
import Card from "../screens/Paying/Card";
import {useTranslation} from 'react-i18next';
import DataLocal from "../data/dataLocal";

const Tab = createBottomTabNavigator();

const styles = StyleSheet.create({
  bottomBar: {
    height: ScaleHeight.xxtraBig,
    backgroundColor: Colors.white,
    paddingTop: 2,
  },
  tabLabel: {
    fontSize: FontSize.small,
    marginBottom: ScaleHeight.medium * 1.3 - ((ScaleHeight.small - 15) * 3)
  },
  bottomHeightAndroid: {
    height: ScaleHeight.xxtraBig * 0.8,
  },
});

const TabBarIcon = {
  [Consts.ScreenIds.HomeMainScreen]: Images.icHomeOn,
  [Consts.ScreenIds.Profile]: Images.icProfileOn,
};

const renderTabBarIcon = (focused, route) => {
  const sizeIcon = focused ? ScaleHeight.xtraSmall : ScaleHeight.xtraSmall - 3;
  const tintColor = focused ? Colors.red : Colors.gray;
  return (
    <Image
      source={TabBarIcon[route.name]}
      style={{
        width: sizeIcon,
        height: sizeIcon,
        tintColor: tintColor,
      }}
      resizeMode='contain'
    />
  );
};

const renderTabBarLabel = (focused, route) => {
  const {t} = useTranslation();
  const styleLabel = {
    color: focused ? Colors.red : Colors.gray,
    fontWeight: focused ? 'bold' : 'normal',
  };
  const TabBarName = {
    [Consts.ScreenIds.HomeMainScreen]: t('common:home'),
    [Consts.ScreenIds.Profile]: t('common:profile'),
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
      <Tab.Screen name={Consts.ScreenIds.Profile} component={Profile}/>
    </Tab.Navigator>
  );
};

const StackAuth = createStackNavigator();
const Auth = () => {
  return (
    <StackAuth.Navigator
      initialRouteName='Login'
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name={Consts.ScreenIds.Login} component={Login} />
      <Stack.Screen name={Consts.ScreenIds.Register} component={Register} />
      <Stack.Screen name={Consts.ScreenIds.ForgotPassword} component={ForgotPassword} />
      <Stack.Screen name={Consts.ScreenIds.ConnectionScreen} component={ConnectionScreen} />
      <Stack.Screen name={Consts.ScreenIds.AddDeviceScreen} component={AddDeviceScreen} />
      <Stack.Screen name={Consts.ScreenIds.UpdatePassword} component={UpdatePassword} />
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
      <Stack.Screen name={Consts.ScreenIds.Register} component={Register}/>
    </StackRegister.Navigator>
  );
};

const DirectForgot = () => {
  return (
    <StackRegister.Navigator
      initialRouteName={Consts.ScreenIds.ForgotPassword}
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name={Consts.ScreenIds.ForgotPassword} component={ForgotPassword}/>
    </StackRegister.Navigator>
  );
};

const Stack = createStackNavigator();
function Routes ({},ref){
  useEffect(() => {
    return () => {
      isReadyRef.current = false;
    };
  });
  useImperativeHandle(ref, () => ({
    roadToMsgFromNotify: (notify) => {
      if (DataLocal.accessToken != null){
        // navigationRef.navigate(Consts.ScreenIds.RoomChat);
      }
    }
  }));
  return (
    <NavigationContainer
      ref={navigationRef}
      onReady={() => {
        isReadyRef.current = true;
      }}>
      <Stack.Navigator
        initialRouteName='Splash'
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
          name={Consts.ScreenIds.PersonalData}
          component={PersonalData}
        />
        <Stack.Screen
          name={Consts.ScreenIds.DeviceManager}
          component={DeviceManager}
        />
        <Stack.Screen
          name={Consts.ScreenIds.EditDevice}
          component={EditDevice}
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
          name={Consts.ScreenIds.AlarmClock}
          component={AlarmClock}
        />
        <Stack.Screen
          name={Consts.ScreenIds.EacesDroping}
          component={EacesDroping}
        />
        <Stack.Screen
          name={Consts.ScreenIds.LanguageTimeZone}
          component={LanguageTimeZone}
        />
        <Stack.Screen
          name={Consts.ScreenIds.OffDevice}
          component={OffDevice}
        />
        <Stack.Screen
          name={Consts.ScreenIds.RestartDevice}
          component={StartDevice}
        />
        <Stack.Screen
          name={Consts.ScreenIds.DoNotDisturb}
          component={DoNotDisturb}
        />
         <Stack.Screen
          name={Consts.ScreenIds.InstallPosition}
          component={InstallPosition}
        />
        <Stack.Screen
          name={Consts.ScreenIds.DisturbSetting}
          component={DisturbSetting}
        />
        <Stack.Screen
          name={Consts.ScreenIds.AlarmSetting}
          component={AlarmSetting}
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
          name={Consts.ScreenIds.ForgotPassword}
          component={DirectForgot}
        />
        <Stack.Screen
          name={Consts.ScreenIds.OTP}
          component={OTP}
        />
        <Stack.Screen
          name={Consts.ScreenIds.UpdatePassword}
          component={UpdatePassword}
        />
        <Stack.Screen
          name={Consts.ScreenIds.Settings}
          component={SettingScreen}
        />
        <Stack.Screen
          name={Consts.ScreenIds.RewardPoints}
          component={RewardPoints}
        />
        <Stack.Screen
          name={Consts.ScreenIds.ChangePassword}
          component={ChangePassword}
        />
        <Stack.Screen
          name={Consts.ScreenIds.AddNewContact}
          component={AddNewContact}
        />
        <Stack.Screen
          name={Consts.ScreenIds.Chat}
          component={Chat}
        />
        <Stack.Screen
          name={Consts.ScreenIds.SMS}
          component={SMS}
        />
        <Stack.Screen
          name={Consts.ScreenIds.SMSDetail}
          component={SMSDetail}
        />
        <Stack.Screen
          name={Consts.ScreenIds.RoomChat}
          component={RoomChat}
        />
        <Stack.Screen
          name={Consts.ScreenIds.DeleteMessage}
          component={DeleteMessage}
        />
        <Stack.Screen
          name={Consts.ScreenIds.SecretPhotoShoot}
          component={SecretPhotoShoot}
        />
        <Stack.Screen
          name={Consts.ScreenIds.InfoKits}
          component={InfoKits}
        />
        <Stack.Screen
          name={Consts.ScreenIds.Warning}
          component={Warning}
        />
        <Stack.Screen
          name={Consts.ScreenIds.Health}
          component={Health}
        />
        <Stack.Screen
          name={Consts.ScreenIds.DetailHealth}
          component={DetailHealth}
        />
        <Stack.Screen
          name={Consts.ScreenIds.Paying}
          component={Paying}
        />
        <Stack.Screen
          name={Consts.ScreenIds.Card}
          component={Card}
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
    </NavigationContainer>
  );
};
export default forwardRef(Routes);
