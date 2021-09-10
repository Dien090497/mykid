import {Alert, Dimensions, Image, StyleSheet, Text} from 'react-native';
import {
  BottomTabBar,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
//tab bar
// import BottomTabBar from './BottomTabBar';
import Consts, {FontSize} from '../functions/Consts';
import React, {useEffect} from 'react';
import {isReadyRef, navigationRef} from './RootNavigation';

import AddNewContact from '../screens/Settings/Contacts/addNew';
import {Colors} from '../assets/colors/Colors';
import Contacts from '../screens/Settings/Contacts';
//screen
import HomeMainScreen from '../screens/Home/HomeMainScreen';
import Images from '../assets/Images';
//auth screen
import Login from '../screens/auth/Login';
import Maps from '../screens/Maps';
import Members from '../screens/Settings/Members';
import {NavigationContainer} from '@react-navigation/native';
// import ListGame from "../screens/ListGame";
import Profile from '../screens/Profile';
import QRCodeScreen from '../screens/Profile/QRCodeScreen';
import Register from '../screens/auth/Register';
import SettingScreen from '../screens/Settings';
import SplashScreen from '../screens/Splash';
import {TouchableOpacity} from 'react-native-gesture-handler';
import addDeviceScreen from '../screens/Profile/addDeviceScreen';
import connectionScreen from '../screens/auth/connectionScreen';
import {createStackNavigator} from '@react-navigation/stack';
import relationship from '../screens/Profile/relationship';

const Tab = createBottomTabNavigator();

const styles = StyleSheet.create({
  bottomBar: {
    backgroundColor: Colors.white,
    paddingTop: 2,
  },
  tabLabel: {
    fontSize: FontSize.medium,
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
        <BottomTabBar {...props} style={[props.style, styles.bottomBar]}>
          {console.log(props)}
        </BottomTabBar>
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
        name={Consts.ScreenIds.connection}
        component={connectionScreen}
      />
      <Stack.Screen
        name={Consts.ScreenIds.addDeviceScreen}
        component={addDeviceScreen}
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
        <Stack.Screen
          name={Consts.ScreenIds.relationship}
          component={relationship}
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
          name={Consts.ScreenIds.AddNewContact}
          component={AddNewContact}
        />
        <Stack.Screen name={Consts.ScreenIds.Contacts} component={Contacts} />
        <Stack.Screen name={Consts.ScreenIds.Members} component={Members} />
        <Stack.Screen name={Consts.ScreenIds.Maps} component={Maps} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Routes;
