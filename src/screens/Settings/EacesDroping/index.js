import React, { useRef, useState,useEffect } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import Header from '../../../components/Header';
import {styles} from './styles';
import {
  setEacesDropApi,
  getPhoneApi
} from '../../../network/EacesDropingService';
import DataLocal from '../../../data/dataLocal';
import LoadingIndicator from '../../../components/LoadingIndicator';
import { useTranslation } from 'react-i18next';
import NotificationModal from '../../../components/NotificationModal';

export  default function EacesDroping(){
  const [number,setNumber] =useState('');
  const refLoading = useRef();
  const refNotification = useRef();
  const { t } = useTranslation();
  useEffect(() => {
    getPhoneApi(DataLocal.deviceId, {
      success: res => {
        setNumber(res.data.phoneNumber)
      },
      refLoading: refLoading,
    });
  }, []);
  const checkNumber = (number)=> {
    if (number.length <= 9 || number.length >= 12) {
      refNotification.current.open(t('common:errorPhone'))
    }
    else {
      eacesDropingApi();
    }
  }
  const eacesDropingApi  = ()=>{
    const body ={
      phoneNumber: number
    }
    setEacesDropApi(DataLocal.deviceId,body,{
      success: res =>{
        refNotification.current.open(t('common:addDeviceSuccess'))
      },
      refLoading:refLoading
    })
  }
  return(
    <View style={styles.viewContainer}>
      <Header title={t('common:hender_eacesDroping')} />
       <View style={styles.viewInput}>
           <View style={styles.viewInputText}>
               <TextInput
                 scrollEnabled={true}
                 underlineColorAndroid={'transparent'}
                 style={styles.inputText}
                 value={number}
                 keyboardType={'number-pad'}
                 placeholder={t('common:header_account')}
                 placeholderTextColor='#B5B4B4'
                 disableFullscreenUI
                 onChangeText={(text => setNumber(text))}
               />
           </View>
            <TouchableOpacity style={styles.tob}
              onPress={()=>checkNumber(number)}
            >
                  <Text style={styles.text}>{t('common:confirm')}</Text>
            </TouchableOpacity>
       </View>
      <LoadingIndicator ref={refLoading} />
      <NotificationModal ref={refNotification} />
    </View>
  );
}
