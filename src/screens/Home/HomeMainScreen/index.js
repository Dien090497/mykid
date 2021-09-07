import React, {useState, useLayoutEffect, useRef} from 'react';
import {
  View,
  SafeAreaView,
} from 'react-native';
import {styles} from './styles';
import HomeCarousel from '../../../components/Home/HomeCarousel';
import {useNavigation} from '@react-navigation/native';
import {appStatusBar} from '../../../components/CommonUIComponents';
import LoadingIndicator from '../../../components/LoadingIndicator';

export default function HomeMainScreen() {
  const navigation = useNavigation();

  const refLoading = useRef();

  useLayoutEffect(() => {
  }, []);

  const renderHeader = () => {
    return (
      <HomeCarousel data={[]}/>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {appStatusBar()}
      <View style={styles.header}>
        <View style={{width: '95%', flexDirection: 'row'}}>
        </View>
      </View>
      <View style={styles.tabView}>
      </View>
      <LoadingIndicator ref={refLoading}/>
    </SafeAreaView>
  );
}
