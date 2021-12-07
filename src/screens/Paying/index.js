import React, {useLayoutEffect, useRef, useState} from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import Header from '../../components/Header';
import {useTranslation} from "react-i18next";
import {Colors} from "../../assets/colors/Colors";
import {styles} from "./styles";
import Consts , {FontSize} from "../../functions/Consts";
import {getInfoApi} from '../../network/PaymentService';
import DataLocal from "../../data/dataLocal";
import NotificationModal from "../../components/NotificationModal";

export default function Paying({navigation}) {
  const {t} = useTranslation();
  const refNotification = useRef();
  const [phone, setPhone] = useState();
  const [packet, setPacket] = useState();
  const [expiredDate, setExpiredDate] = useState();
  const [oriAccount, setOriAccount] = useState();
  const [freeIntranet, setFreeIntranet] = useState();
  const [freeOffline, setFreeOffline] = useState();
  const [freeData, setFreeData] = useState();
  useLayoutEffect(() => {
    getInfo();
  },[]);

  const getInfo = () => {
    getInfoApi(DataLocal.deviceId, {
      success: res => {
        setPacket(res.data.productCode);
        setExpiredDate(res.data.expiredDate.slice(0,10));
        setOriAccount(res.data.mainBalance);
        setFreeIntranet(res.data.onNetBalance);
        setFreeOffline(res.data.offNetBalance);
        setFreeData(res.data.dataBalance);
        if (res.data.devicePhone && res.data.devicePhone.startsWith('+84')) {
          setPhone('0' + res.data.devicePhone.substring(3));
        }
      },
      refNotification
    })
  }

  const refreshInfo = () => {
    getInfo();
  }

  const gotoHomeScreen = () => {
    if (DataLocal.haveSim === '0') {
      DataLocal.saveHaveSim('1').then(r =>
        navigation.navigate(Consts.ScreenIds.Tabs)
      );
    }
  }

  return (
    <View style={styles.body}>
      <Header title={t('common:payInCash')}/>
      <ScrollView style={styles.viewMain}>
        <View style={styles.viewTxt}>
          <Text style={{
            color: Colors.redTitle,
            fontWeight: '700',
            fontSize: FontSize.xtraBig
          }}>{t('common:accountInfo')}</Text>
        </View>
        <View style={styles.viewItem}>
           <View style={{width: '60%', justifyContent: 'center'}}>
             <Text style={styles.txt_item}>
               {t('common:package')}
             </Text>
           </View>
          <View style={{width: '40%', justifyContent: 'center'}}>
            <Text style={styles.txt_item1}>
              {packet}
            </Text>
          </View>
        </View>
        <View style={styles.viewItem}>
          <View style={{width: '60%', justifyContent: 'center'}}>
            <Text style={styles.txt_item}>
              {t('common:deadline')}
            </Text>
          </View>
          <View style={{width: '40%', justifyContent: 'center'}}>
            <Text style={styles.txt_item1}>
              {expiredDate}
            </Text>
          </View>
        </View>
        <View style={styles.viewItem}>
          <View style={{width: '60%', justifyContent: 'center'}}>
            <Text style={styles.txt_item}>
              {t('common:ori_account')}
            </Text>
          </View>
          <View style={{width: '40%', justifyContent: 'center'}}>
            <Text style={styles.txt_item1}>
              {oriAccount}
            </Text>
          </View>
        </View>
        <View style={styles.viewItem}>
          <View style={{width: '60%', justifyContent: 'center'}}>
            <Text style={styles.txt_item}>
              {t('common:free_intranet_voice')}
            </Text>
          </View>
          <View style={{width: '40%', justifyContent: 'center'}}>
            <Text style={styles.txt_item1}>
              {freeIntranet}
            </Text>
          </View>
        </View>
        <View style={styles.viewItem}>
          <View style={{width: '60%', justifyContent: 'center'}}>
            <Text style={styles.txt_item}>
              {t('common:free_offline_voice')}
            </Text>
          </View>
          <View style={{width: '40%', justifyContent: 'center'}}>
            <Text style={styles.txt_item1}>
              {freeOffline}
            </Text>
          </View>
        </View>
        <View style={styles.viewItem}>
          <View style={{width: '60%', justifyContent: 'center'}}>
            <Text style={styles.txt_item}>
              {t('common:free_data_traffic')}
            </Text>
          </View>
          <View style={{width: '40%', justifyContent: 'center'}}>
            <Text style={styles.txt_item1}>
              {freeData}
            </Text>
          </View>
        </View>
        <TouchableOpacity
          style={styles.viewTob}
          onPress={() => navigation.navigate(Consts.ScreenIds.Card, {phone: phone, refresh: refreshInfo})}
        >
          <Text style={styles.txtTob}>{t('common:more_money')}</Text>
        </TouchableOpacity>
      </ScrollView>
      <NotificationModal
        ref={refNotification}
        goBack={gotoHomeScreen}
      />
    </View>
  );
}
