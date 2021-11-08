import React, {useRef, useState} from "react";
import {View, TextInput, TouchableOpacity, Text} from "react-native";
import Header from '../../../components/Header';
import {useTranslation} from "react-i18next";
import {styles} from "./styles";
import {Colors} from "../../../assets/colors/Colors";
import NotificationModal from "../../../components/NotificationModal";
import DataLocal from "../../../data/dataLocal";
import {onClickPayment} from '../../../network/PaymentService';
import Consts, {ScaleHeight} from "../../../functions/Consts";

export default function Card({navigation,route}) {
  const {t} = useTranslation();
  const refNotification = useRef();
  const [card, setCard] = useState('');

  const onchangeCard = (text) => {
     setCard(text.replace(/[^0-9]/g, ''));
  }

  const moreCard = () => {
    if (card === '') {
      refNotification.current.open(t('common:error_card'));
      return;
    }
    if (card.length < 15) {
      refNotification.current.open(t('common:error_card1'));
      return;
    }

    onClickPayment(DataLocal.deviceId, card , {
        success: res => {
          refNotification.current.open(t('common:successPayment'), () => {
            if (route.params && route.params.refresh) {
              route.params.refresh();
            }
            navigation.navigate(Consts.ScreenIds.Paying);
          })
        }
    });
  }

   return (
    <View style={{flex: 1, backgroundColor: Colors.white}}>
      <Header title={t('common:card')}/>
      <View style={{flex: 1, width: '90%', height: 800, alignItems: 'center', marginHorizontal: '5%'}}>
        <View style={[styles.viewTxt, {marginTop: 20}]}>
          <Text style={styles.text}>{t('common:txt_phone')}</Text>
          <Text style={[styles.text, {color: Colors.redTitle}]}>{route.params.phone}</Text>
        </View>
        <View style={[styles.viewTxt, {alignItems: 'center', justifyContent: 'flex-start'}]}>
          <Text style={styles.text}>{t('common:cardCode')}</Text>
        </View>
        <View style={styles.viewInput}>
          <TextInput
            placeholderTextColor={'rgba(181, 180, 180, 1)'}
            placeholder={t('common:importCard')}
            maxLength={15}
            keyboardType={'number-pad'}
            style={{
              marginHorizontal: 10,
              color: Colors.black,
              width: '100%',
              height: '100%',
              fontSize:  ScaleHeight.medium * 1.2/4
            }}
            onChangeText={(text) => onchangeCard(text)}
          />
        </View>
        <TouchableOpacity style={styles.viewTob} onPress={moreCard}>
          <Text style={styles.txtTob}>{t('common:more_card')}</Text>
        </TouchableOpacity>
        <View style = {styles.viewContent}>
           <Text style={styles.txtContent}>{t('common:txtContent')}</Text>
        </View>
        <NotificationModal ref = {refNotification}/>
      </View>
    </View>
  );
}