import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';

import Header from '../../components/Header';
import LoadingIndicator from '../../components/LoadingIndicator';
import Images from '../../assets/Images';
import { styles } from './styles';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { setRewardsApi, getRewardsApi } from '../../network/RewardsService.js';
import DataLocal from '../../data/dataLocal';
import { useTranslation } from 'react-i18next';
import NotificationModal from '../../components/NotificationModal';
import Consts from "../../functions/Consts";

export default ({ navigation }) => {
  const [point, setPoint] = useState(0);
  const refLoading = useRef();
  const refNotification = useRef();
  const { t } = useTranslation();

  useEffect(() => {
    getRewardsApi(DataLocal.deviceId,{
      success: resData => {
        setPoint(resData.data.heart);
      },
      refLoading,
      refNotification,
    })
  },[]);

  const addPoint = () => {
    point < 99 ? setPoint(point + 1) : null;
  };
  const minusPoint = () => {
    point > 0 ? setPoint(point - 1) : null;
  };
  const rewardsPoints = () => {
    const heart = {
      heart: point
    }
    setRewardsApi(DataLocal.deviceId,heart,{
      success: resData => {
        refNotification.current.open(t('common:sendRewards'))
      },
      refLoading,
      refNotification,
    })
  };

  const gotoHomeScreen = () => {
    if (DataLocal.haveSim === '0') {
      DataLocal.saveHaveSim('1').then(r =>
        navigation.navigate(Consts.ScreenIds.Tabs)
      );
    }
  }

  return (
    <View
      style={[styles.container, { paddingBottom: useSafeAreaInsets().bottom }]}>
      <Header title={t('common:header_reward_points')} />
      <View style={styles.scroll}>
        <View style={styles.mainView}>
          <View style={styles.imgHeart}>
            <Image source={Images.icHeart} style={[styles.iconHeart]} />
          </View>
          <Text style={styles.text}>{t('common:rewardPoints_text')}</Text>
          <View style={styles.viewPoint}>
            <TouchableOpacity
              onPress={minusPoint}
              style={styles.btn}>
              <Image source={Images.icMinus} style={styles.iconBtn} />
            </TouchableOpacity>
            <Text style={styles.textPoint}>{point}</Text>
            <TouchableOpacity
              style={styles.btn}
              onPress={addPoint}>
              <Image source={Images.icAdd} style={styles.iconBtn} />
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            onPress={rewardsPoints}
            style={styles.btnSubmit}>
            <Text style={styles.textSubmit}>{t('common:confirm')}</Text>
          </TouchableOpacity>
        </View>
      </View>
      <LoadingIndicator ref={refLoading} />
      <NotificationModal ref={refNotification} goBack={gotoHomeScreen}/>
    </View>
  );
};
