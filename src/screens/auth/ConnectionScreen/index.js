import { Image, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';

import Consts from '../../../functions/Consts';
import Header from '../../../components/Header'
import styles from './style';
import Images from '../../../assets/Images';
import { useTranslation } from 'react-i18next';

const ConnectionScreen = ({navigation}) => {
  const { t } = useTranslation();
  const onclick = ()=>{
    navigation.navigate(Consts.ScreenIds.AddDeviceScreen)
  };
  return (
    <View style={styles.contain}>
      <Header title={t('common:register')} />
      <View style={styles.container}>
        <Text style={styles.txtRegister}>{t('common:registerSuccess')}</Text>
        <Image source={Images.icRegister} style={styles.icon} resizeMode='stretch'/>
        <TouchableOpacity
          style={styles.btnRegister}
          onPress={onclick}>
          <Text style={styles.textRegister}>{t('common:header_connectDevice')}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default ConnectionScreen;
