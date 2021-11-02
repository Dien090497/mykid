import React from "react";
import {View, TextInput, TouchableOpacity, Text} from "react-native";
import Header from '../../../components/Header';
import {useTranslation} from "react-i18next";
import {styles} from "./styles";
import {Colors} from "../../../assets/colors/Colors";

export default function Card() {
  const {t} = useTranslation();
  return (
    <View style={{flex: 1}}>
      <Header title={t('common:card')}/>
      <View style={{flex: 1, width: '90%', height: 800, alignItems: 'center', marginHorizontal: '5%'}}>
        <View style={[styles.viewTxt, {marginTop: 20}]}>
          <Text style={styles.text}>{t('common:txt_phone')}</Text>
          <Text style={[styles.text, {color: Colors.redTitle}]}>0862319100</Text>
        </View>
        <View style={[styles.viewTxt, {alignItems: 'center', justifyContent: 'flex-start'}]}>
          <Text style={styles.text}>{t('common:cardCode')}</Text>
        </View>
        <View style={styles.viewInput}>
          <TextInput
            placeholderTextColor={'rgba(181, 180, 180, 1)'}
            placeholder={t('common:importOTP')}
            maxLength={6}
            keyboardType={'number-pad'}
            style={{
              marginHorizontal: 10,
              color: Colors.black
            }}
          />
        </View>
      </View>
    </View>
  );
}