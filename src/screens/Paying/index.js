import React, {useLayoutEffect, useRef} from "react";
import {View, Text, TouchableOpacity} from "react-native";
import Header from '../../components/Header';
import {useTranslation} from "react-i18next";
import {Colors} from "../../assets/colors/Colors";
import {styles} from "./styles";
import Consts from "../../functions/Consts";
import {getInfoApi} from '../../network/Payment';
import DataLocal from "../../data/dataLocal";
import NotificationModal from "../../components/NotificationModal";

export default function Paying({navigation}) {
  const {t} = useTranslation();
  const refNotification = useRef();
  useLayoutEffect(() => {
    getInfo();
  },[]);

  const getInfo = () => {
    getInfoApi(DataLocal.deviceId, {
      success: res => {
        console.log('Data----', res.data.meta.code);
      },
      failure: error => {
        const code = error.split(' ');
        console.log(code[code.length -1 ])

        // navigation.navigate(Consts.ScreenIds.HomeMainScreen)
      },
      refNotification
    })
  }
  return (
    <View style={{flex: 1, alignItems: 'center', marginBottom: 20}}>
      <Header title={t('common:payInCash')}/>
      <View style={styles.viewMain}>
        <View style={styles.viewTxt}>
          <Text style={{
            color: Colors.redTitle,
            fontWeight: '700',
            fontSize: 20
          }}>{t('common:accountInfo')}</Text>
        </View>
        <View style={styles.viewItem}>
           <View style={{width: '70%', justifyContent: 'center'}}>
             <Text style={styles.txt_item}>
               {t('common:package')}
             </Text>
           </View>
          <View style={{width: '30%', justifyContent: 'center'}}>
            <Text style={styles.txt_item1}>
              {t('common:package')}
            </Text>
          </View>
        </View>
        <View style={styles.viewItem}>
          <View style={{width: '70%', justifyContent: 'center'}}>
            <Text style={styles.txt_item}>
              {t('common:deadline')}
            </Text>
          </View>
          <View style={{width: '30%', justifyContent: 'center'}}>
            <Text style={styles.txt_item1}>
              {t('common:deadline')}
            </Text>
          </View>
        </View>
        <View style={styles.viewItem}>
          <View style={{width: '70%', justifyContent: 'center'}}>
            <Text style={styles.txt_item}>
              {t('common:ori_account')}
            </Text>
          </View>
          <View style={{width: '30%', justifyContent: 'center'}}>
            <Text style={styles.txt_item1}>
              {t('common:ori_account')}
            </Text>
          </View>
        </View>
        <View style={styles.viewItem}>
          <View style={{width: '70%', justifyContent: 'center'}}>
            <Text style={styles.txt_item}>
              {t('common:free_intranet_voice')}
            </Text>
          </View>
          <View style={{width: '30%', justifyContent: 'center'}}>
            <Text style={styles.txt_item1}>
              {t('common:free_intranet_voice')}
            </Text>
          </View>
        </View>
        <View style={styles.viewItem}>
          <View style={{width: '70%', justifyContent: 'center'}}>
            <Text style={styles.txt_item}>
              {t('common:free_offline_voice')}
            </Text>
          </View>
          <View style={{width: '30%', justifyContent: 'center'}}>
            <Text style={styles.txt_item1}>
              {t('common:free_offline_voice')}
            </Text>
          </View>
        </View>
        <View style={styles.viewItem}>
          <View style={{width: '70%', justifyContent: 'center'}}>
            <Text style={styles.txt_item}>
              {t('common:free_data_traffic')}
            </Text>
          </View>
          <View style={{width: '30%', justifyContent: 'center'}}>
            <Text style={styles.txt_item1}>
              {t('common:free_data_traffic')}
            </Text>
          </View>
        </View>
        <TouchableOpacity
          style={styles.viewTob}
          onPress={() => navigation.navigate(Consts.ScreenIds.Card)}
        >
          <Text style={styles.txtTob}>{t('common:more_money')}</Text>
        </TouchableOpacity>
        <NotificationModal ref={refNotification}/>
      </View>
    </View>
  );
}