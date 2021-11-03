import React from "react";
import {View, Text, TouchableOpacity} from "react-native";
import Header from '../../components/Header';
import {useTranslation} from "react-i18next";
import {Colors} from "../../assets/colors/Colors";
import {styles} from "./styles";
import Consts from "../../functions/Consts";

export default function Paying({navigation}) {
  const {t} = useTranslation();
  return (
    <View style={{flex: 1, alignItems: 'center'}}>
      <Header title={t('common:payInCash')}/>
      <View style={{flex: 1, width: '90%', height: 800}}>
        <View style={styles.viewTxt}>
          <Text style={{
            color: Colors.redTitle,
            fontWeight: '700',
            fontSize: 20
          }}>{t('common:accountInfo')}</Text>
        </View>
        <View style={styles.viewItem}>
           <View style={{width: '75%', justifyContent: 'center'}}>
             <Text style={styles.txt_item}>
               {t('common:package')}
             </Text>
           </View>
          <View style={{width: '25%', justifyContent: 'center'}}>
            <Text style={styles.txt_item1}>
              {t('common:package')}
            </Text>
          </View>
        </View>
        <View style={styles.viewItem}>
          <View style={{width: '75%', justifyContent: 'center'}}>
            <Text style={styles.txt_item}>
              {t('common:deadline')}
            </Text>
          </View>
          <View style={{width: '25%', justifyContent: 'center'}}>
            <Text style={styles.txt_item1}>
              {t('common:deadline')}
            </Text>
          </View>
        </View>
        <View style={styles.viewItem}>
          <View style={{width: '75%', justifyContent: 'center'}}>
            <Text style={styles.txt_item}>
              {t('common:ori_account')}
            </Text>
          </View>
          <View style={{width: '25%', justifyContent: 'center'}}>
            <Text style={styles.txt_item1}>
              {t('common:ori_account')}
            </Text>
          </View>
        </View>
        <View style={styles.viewItem}>
          <View style={{width: '75%', justifyContent: 'center'}}>
            <Text style={styles.txt_item}>
              {t('common:free_intranet_voice')}
            </Text>
          </View>
          <View style={{width: '25%', justifyContent: 'center'}}>
            <Text style={styles.txt_item1}>
              {t('common:free_intranet_voice')}
            </Text>
          </View>
        </View>
        <View style={styles.viewItem}>
          <View style={{width: '75%', justifyContent: 'center'}}>
            <Text style={styles.txt_item}>
              {t('common:free_offline_voice')}
            </Text>
          </View>
          <View style={{width: '25%', justifyContent: 'center'}}>
            <Text style={styles.txt_item1}>
              {t('common:free_offline_voice')}
            </Text>
          </View>
        </View>
        <View style={styles.viewItem}>
          <View style={{width: '75%', justifyContent: 'center'}}>
            <Text style={styles.txt_item}>
              {t('common:free_data_traffic')}
            </Text>
          </View>
          <View style={{width: '25%', justifyContent: 'center'}}>
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
      </View>
    </View>
  );
}