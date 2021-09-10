import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  Image,
  TouchableOpacity,
  Text,
} from 'react-native';

import {styles} from './styles';
import Images from '../../../assets/Images';
import {Colors} from '../../../assets/colors/Colors';
import {String} from '../../../assets/strings/String';
import Consts from '../../../functions/Consts';
import globalData from '../../../data/globalData';
import {useIsFocused} from '@react-navigation/native';
import LoadingIndicator from '../../../components/LoadingIndicator';
import {
  showConfirmation,
} from '../../../functions/utils';
import Header from "../../../components/Header";
import {useSafeAreaInsets} from "react-native-safe-area-context";
import {anonymousLogin} from '../../../network/http/HttpClient';
import DataLocal from '../../../data/dataLocal';
import { useSelector } from 'react-redux';

let requestedLogout = false

export default ({navigation, route}) => {
  const [userInfo, setUserInfo] = useState({});
  const loggedInUserInfo = useSelector((state) => state.loginReducer.dataInfo);
  const isFocused = useIsFocused();
  const refLoading = useRef();

  // useEffect(() => {
  //   if (!isFocused) {
  //     return;
  //   }
  // }, [isFocused]);

  // useEffect(() => {
  //   if (requestedLogout) {
  //     navigation.navigate(Consts.ScreenIds.Profile);
  //     return () => {
  //       requestedLogout = false;
  //     }
  //   }
  // }, [loggedInUserInfo])

  const handleChangePassword = () => {
    navigation.navigate(Consts.ScreenIds.ChangePassword, {
      userData: userInfo,
    });
  };
  const handleAboutUs = () => {
    navigation.navigate(Consts.ScreenIds.AboutUs);
  };

  const logout = () => {
    showConfirmation(String.logoutConfirmation, {
      response: async accept => {
        if (!accept) {
          return;
        }

        // await DataLocal.removeAll();
        // anonymousLogin(refLoading);
        // requestedLogout = true;
      },
    });
  };

  return (
    <View style={[styles.container, {paddingBottom: useSafeAreaInsets().bottom}]}>
      <Header title={String.settings}/>
      <View style={styles.mainView}>
        <TouchableOpacity onPress={handleChangePassword} style={styles.rowSettings}>
          <View style={[styles.rowItem, {marginTop: '5%'}]}>
            <Text style={styles.textItem}>{String.changePassword}</Text>
            <Image source={Images.icProfileDetail} resizeMode={'contain'}
                   style={styles.iconDetail}/>
          </View>
        </TouchableOpacity>
        <TouchableOpacity  onPress={handleAboutUs} 
          style={[styles.rowItem, {borderBottomColor: Colors.white}, {marginTop: '5%'}]}>
          <Text style={styles.textItem}>{String.aboutUs}</Text>
          <Image source={Images.icProfileDetail} resizeMode={'contain'} style={styles.iconDetail}/>
        </TouchableOpacity>
        <TouchableOpacity onPress={logout}>
          <View style={styles.logout}>
            <Text style={styles.textLogout}>{String.logout}</Text>
          </View>
        </TouchableOpacity>
      </View>
      <LoadingIndicator ref={refLoading}/>
    </View>
  );
};
