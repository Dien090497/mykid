import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {styles} from './styles';
import {useSafeArea} from 'react-native-safe-area-context';
import {String} from '../../assets/strings/String';
import {useNavigation, useNavigationState} from '@react-navigation/native';
import Consts from '../../functions/Consts';
import Icons from '../../components/VectorIcons'
import { Colors } from '../../assets/colors/Colors';
// import Orientation from 'react-native-orientation';

export default Header = (props) => {
  const insets = useSafeArea();
  const navigation = useNavigation();
  const { dangerouslyGetState } = useNavigation();
  const { index, routes } = dangerouslyGetState()


  const handleGoBack = () => {
    if (index > 0 && routes[index - 1].name === Consts.ScreenIds.Browser) {
      // Orientation.lockToLandscape();
    }
    navigation.goBack();
  };

  return (
    <View style={[styles.container, {marginTop: insets.top}]}>
      <Text style={styles.title}>{props.title !== undefined ? props.title : String.bangSepHang}</Text>
      <TouchableOpacity style={styles.back} onPress={handleGoBack}>
        <Icons name={'arrow-back'} iconFamily={'MaterialIcons'} size={28} color={Colors.white} />
      </TouchableOpacity>
    </View>
  );
};