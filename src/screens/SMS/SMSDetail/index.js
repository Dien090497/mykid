import React, { useLayoutEffect, useRef, useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  View,
} from 'react-native';
import {styles} from './styles';
import Header from '../../../components/Header';
import LoadingIndicator from '../../../components/LoadingIndicator';
import DataLocal from '../../../data/dataLocal';
import Consts from '../../../functions/Consts';
import { useTranslation } from 'react-i18next';
import NotificationModal from "../../../components/NotificationModal";
import { getMessagesApi } from '../../../network/SMSService';

export default function SMSDetail({navigation, route}) {
  const refLoading = useRef();
  const refNotification = useRef();
  const refScrollView = useRef();
  const [brand, setBrand] = useState();
  const [messages, setMessages] = useState([]);
  const { t } = useTranslation();

  useLayoutEffect(() => {
    if (route.params && route.params.brand) {
      setBrand(route.params.brand);
    }
  }, []);

  useLayoutEffect(() => {
    if (brand && route.params.deviceId) {
      getMessages(brand.id, route.params.deviceId);
    }
  }, [brand]);

  const getMessages = (brandId, deviceId) => {
    getMessagesApi(deviceId, brandId, {
      success: resData => {
        setMessages(resData.data);
      },
      refLoading,
      refNotification,
    });
  }

  const gotoHomeScreen = () => {
    if (DataLocal.haveSim === '0') {
      DataLocal.saveHaveSim('1').then(r =>
        navigation.navigate(Consts.ScreenIds.Tabs)
      );
    }
  }

  return (
    <KeyboardAvoidingView style={styles.contain}
      behavior={Platform.OS === 'ios' ? 'padding' : ''}>
      <Header title={(brand && brand.name) || ''}/>
      <View style={styles.container}>
        <ScrollView ref={refScrollView} style={styles.container}
          onContentSizeChange={() => refScrollView.current.scrollToEnd({animated: true})}>
          {messages && messages.map((obj, i) => (
          <View key={i}>
            { obj.isShowDate &&
              <View style={[styles.viewItem, {flexDirection: 'row', justifyContent: 'center'}]}>
                <Text style={styles.textDate}>{obj.date}</Text>
              </View>
            }
            <View style={[styles.viewItem, {flexDirection: 'row'}]}>
              <View style={styles.viewContent}>
                <View style={{flexDirection: 'row'}}>
                  <View style={[styles.viewContentDetail]}>
                    <Text style={styles.textBody}>{obj.content}</Text>
                    <Text style={styles.textTime}>{obj.reportedAt.substring(0, 19)}</Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
          ))}
        </ScrollView>
        
      </View>
      <LoadingIndicator ref={refLoading}/>
      <NotificationModal ref={refNotification} goBack={gotoHomeScreen}/>
    </KeyboardAvoidingView>
  );
}
