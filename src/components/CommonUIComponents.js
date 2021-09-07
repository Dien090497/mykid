import React from 'react';
import {Platform, StatusBar, Text, View} from 'react-native';

export function appStatusBar() {
  return (
    <StatusBar animated={true} barStyle={Platform.OS === 'ios' ? 'dark-content' : 'light-content'}/>
  );
}

export function noInternetView() {
  return (
    <View
      style={{width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center'}}
    >
      <View style={{padding: 10, borderRadius: 8, backgroundColor: 'rgba(46, 49, 49, 0.5)'}}>
        <Text style={{
          textAlign: 'center',
          color: 'white',
          marginBottom: 5,
        }}>{'Kết nối mạng không ổn định.\nVui lòng kiểm tra lại.'}</Text>
        {/* <ActivityIndicator size={'small'} color={'white'}/> */}
      </View>
    </View>
  );
}
