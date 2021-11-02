import {
  FlatList,
  Image, Modal, RefreshControl,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useLayoutEffect, useRef, useState } from 'react';
import { styles } from './styles';
import Header from "../../components/Header";
import { useTranslation } from 'react-i18next';
import NotificationModal from "../../components/NotificationModal";

export default function DeviceManager({navigation}) {
  const { t } = useTranslation();
  return (
    <View style={styles.contain}>
      <Header title={t('common:header_warning')}
      />
      <Text>123</Text>
    </View>
  );
}
