import React, {useEffect, useState, useRef} from 'react';
import {
  View,
  ScrollView,
  SafeAreaView,
  Image,
  TouchableOpacity,
  Text,
  TextInput as NativeTextInput,
} from 'react-native';
import {styles} from './styles';
import Images from '../../assets/Images';
import {String} from '../../assets/strings/String';
import { showAlert} from '../../functions/utils';
import {useIsFocused} from '@react-navigation/native';

export default function Profile({navigation}) {
  const isFocused = useIsFocused();
  const refScroll = useRef()

  useEffect(() => {
    if (!isFocused) {
      return;
    }
    refScroll.current?.scrollTo({
      y: 0,
      animated: true,
    });
    refreshUserInfo();
  }, [isFocused]);

  const refreshUserInfo = () => {
  };

  const handleSettings = () => {
    showAlert(String.thisFunctionIsNotValid);
  };

  const handleUserLevel = () => {
    showAlert(String.thisFunctionIsNotValid);
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
      </View>
      <ScrollView ref={refScroll} style={styles.scrollView}>
        
        <TouchableOpacity onPress={handleUserLevel} style={styles.rowSettings}>
          <Image source={Images.icProfileLevel} resizeMode={'contain'} style={styles.iconSetting}/>
          <Text style={styles.textSettings}>{'String.level'}</Text>
          <Image source={Images.icProfileDetail} resizeMode={'contain'} style={styles.iconDetail}/>
        </TouchableOpacity>
       
        <TouchableOpacity onPress={handleSettings} style={styles.rowSettings}>
          <Image source={Images.icProfileSettings} resizeMode={'contain'}
                 style={styles.iconSetting}/>
          <Text style={styles.textSettings}>{'String.settings'}</Text>
          <Image source={Images.icProfileDetail} resizeMode={'contain'} style={styles.iconDetail}/>
        </TouchableOpacity>
        <View style={{height: 30}}/>
      </ScrollView>
    </SafeAreaView>
  );
}
