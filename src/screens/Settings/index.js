import Consts, {ScaleHeight} from '../../functions/Consts';
import {FlatList, Image, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';

import {Colors} from '../../assets/colors/Colors';
import CustomIcon from '../../components/VectorIcons';
import Header from '../../components/Header';
import LoadingIndicator from '../../components/LoadingIndicator';
import {String} from '../../assets/strings/String';
import {styles} from './styles';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

export default ({navigation, route}) => {
  const refLoading = useRef();

  const dataSettings = [
    {
      key: 'Contacts',
      title: String.setting_contact,
      onPress: () => {
        navigation.navigate(Consts.ScreenIds.Contacts);
      },
      icon: (
        <CustomIcon
          name={'contacts'}
          iconFamily={'MaterialIcons'}
          size={ScaleHeight.small}
          color={'#15d4a1'}
        />
      ),
    },
    {
      key: 'Members',
      title: String.setting_member,
      onPress: () => {
        navigation.navigate(Consts.ScreenIds.Members);
      },
      icon: (
        <CustomIcon
          name={'people-alt'}
          iconFamily={'MaterialIcons'}
          size={ScaleHeight.small}
          color={'#15d4a1'}
        />
      ),
    },
    {
      key: 'DeviceManager',
      title: String.header_connectDevice,
      onPress: () => {
        navigation.navigate(Consts.ScreenIds.DeviceManager);
      },
      icon: (
        <CustomIcon
          name={'people-alt'}
          iconFamily={'MaterialIcons'}
          size={ScaleHeight.small}
          color={'#15d4a1'}
        />
      ),
    },
    {
      key: 'RewardPoints',
      title: String.header_reward_points,
      onPress: () => {
        navigation.navigate(Consts.ScreenIds.RewardPoints);
      },
      icon: (
        <CustomIcon
          name={'people-alt'}
          iconFamily={'MaterialIcons'}
          size={ScaleHeight.small}
          color={'#15d4a1'}
        />
      ),
    },
    {
      key: 'DoNotDisturb',
      title: String.header_doNotDisturb,
      onPress: () => {
        navigation.navigate(Consts.ScreenIds.DoNotDisturb);
      },
      icon: (
        <CustomIcon
          name={'people-alt'}
          iconFamily={'MaterialIcons'}
          size={ScaleHeight.small}
          color={'#15d4a1'}
        />
      ),
    },
    {
      key: 'LanguageTimeZone',
      title: String.header_language_timezone,
      onPress: () => {
        navigation.navigate(Consts.ScreenIds.LanguageTimeZone);
      },
      icon: (
        <CustomIcon
          name={'people-alt'}
          iconFamily={'MaterialIcons'}
          size={ScaleHeight.small}
          color={'#15d4a1'}
        />
      ),
    },
    {
      key: 'EacesDroping',
      title: String.hender_eacesDroping,
      onPress: () => {
        navigation.navigate(Consts.ScreenIds.EacesDroping);
      },
      icon: (
        <CustomIcon
          name={'people-alt'}
          iconFamily={'MaterialIcons'}
          size={ScaleHeight.small}
          color={'#15d4a1'}
        />
      ),
    },
  ];
  const renderItem = ({item}) => {
    return (
      <TouchableOpacity
        activeOpacity={0.5}
        style={{
          backgroundColor: 'white',
          borderRadius: 5,
          marginVertical: 2,
          padding: 12,
        }}
        key={item.key}
        onPress={item.onPress}>
        <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
          <View style={{flex: 0.1}}>{item.icon}</View>
          <Text style={styles.titleText}>{item.title}</Text>
          <View style={{flex: 0.1, flexDirection: 'row-reverse'}}>
            <CustomIcon
              name={'arrow-forward-ios'}
              iconFamily={'MaterialIcons'}
              size={24}
              color={Colors.gray}
            />
          </View>
        </View>
      </TouchableOpacity>
    );
  };
  return (
    <View
      style={[styles.container, {paddingBottom: useSafeAreaInsets().bottom}]}>
      <Header title={String.header_settings} />
      <View style={styles.mainView}>
        <FlatList
          data={dataSettings}
          renderItem={renderItem}
          keyExtractor={item => item.key}
        />
      </View>
      <LoadingIndicator ref={refLoading} />
    </View>
  );
};
