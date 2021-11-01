import {
  Modal,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useLayoutEffect, useRef, useState} from 'react';
import DataLocal from '../../../data/dataLocal';
import Header from '../../../components/Header';
import LoadingIndicator from '../../../components/LoadingIndicator';
import {styles} from './styles';
import {Colors} from '../../../assets/colors/Colors';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {
  getLanguageApi,
  getLanguageTimeZoneApi,
  setLanguageTimeZoneApi,
} from '../../../network/LanguageTimeZoneService';
import RadioGroup from '../../../components/RadioGroup';
import {WheelPicker} from 'react-native-wheel-picker-android';
import {showAlert} from '../../../functions/utils';
import { useTranslation } from 'react-i18next';

export default function LanguageTimeZone({navigation, route}) {
  const refLoading = useRef();
  const [timeZoneSelect, setTimeZoneSelect] = useState(0);
  const [numberLangguages, setNumberLanguage] = useState();
  const [languageConfirm, setLanguageConfirm] = useState();
  const [listLangguages, setListLanguage] = useState([]);
  const [check, setCheck] = useState(false);
  const refRadioGroup = useRef();
  const { t } = useTranslation();

  useLayoutEffect(() => {
    getLanguageTimeZone();
    getLanguages();
  }, []);

  useEffect(() => {
    if (languageConfirm && listLangguages) {
      const index = listLangguages.findIndex(val => val === languageConfirm);
      setNumberLanguage(index);
    }
  }, [languageConfirm, listLangguages]);

  const  getLanguageTimeZone = () => {
    getLanguageTimeZoneApi(DataLocal.deviceId, {
      success: res => {
        setLanguageConfirm(res.data.language);
        setTimeZoneSelect(res.data.timeZone);
        refRadioGroup.current.updateView(res.data.timeZone);
      },
    });
  }

  const getLanguages = () => {
    getLanguageApi( {
      success: res => {
        setListLanguage(res.data);
      },
      refLoading: refLoading,
    });
  }

  const updateTimeZoneSelect = timeZoneSelect => {
    setTimeZoneSelect(timeZoneSelect);
  };

  const setLanguageTimeZones = () => {
    setLanguageTimeZoneApi(
      DataLocal.deviceId,
      {
        language: languageConfirm,
        timeZone: timeZoneSelect,
      },
      {
        success: res => {
          showAlert(t('common:changeLangguageAndTimezone'));
        },
        refLoading: refLoading,
      },
    );
  };

  const onCornfirm = () => {
    if (numberLangguages !== undefined) {
      setLanguageConfirm(listLangguages[numberLangguages]);
    }
    setCheck(false);
  }

  const onItemSelected = (selectedItem) => {
    setNumberLanguage(selectedItem);
  }

  const outConfirm = () => {
    setCheck(false);
  }

  return (
    <View style={[styles.container, {paddingBottom: useSafeAreaInsets().bottom}]}>
      <Header title={t('common:header_language_timezone')} />
      <View style={styles.TobView}>
       <View style={styles.mainView}>
         <TouchableOpacity
           style={styles.containerAdd}
           onPress={setLanguageTimeZones}>
           <Text style={[styles.txtAdd, {color: Colors.white}]}>{t('common:confirm')}</Text>
         </TouchableOpacity>
         <TouchableOpacity
           style={styles.containerAdd1}
           onPress={ () => {setCheck(true)}}
         >
           <Text style={[styles.txtAdd, {color: Colors.red}]}>{languageConfirm}</Text>
         </TouchableOpacity>
       </View>
     </View>
      <ScrollView
           howsHorizontalScrollIndicator={false}
           showsVerticalScrollIndicator={false}
           contentInsetAdjustmentBehavior='automatic'
           style={styles.scrollView}>
           <View style={styles.row}>
             <RadioGroup
               ref={refRadioGroup}
               checker={timeZoneSelect}
               updateTimeZoneSelect={updateTimeZoneSelect}
             />
           </View>
      </ScrollView>
      <Modal
          visible={check}
          transparent={true}
          animationType='slide'
      >
        <View style={styles.modalView}>
          <TouchableOpacity style={styles.modalViewTob} onPress={outConfirm}/>
          <View style={styles.wheelPickkerView}>
            <View style={styles.tobWheel}>
               <TouchableOpacity style={styles.confirmView}
                  onPress={onCornfirm}
               >
                    <Text style={styles.textConfirm}>{t('common:confirm')}</Text>
               </TouchableOpacity>
            </View>
            <WheelPicker
                    data={listLangguages}
                    style={styles.wheel}
                    selectedItemTextSize={20}
                    initPosition={numberLangguages}
                    selectedItem={numberLangguages}
                    selectedItemTextFontFamily={'Roboto'}
                    itemTextFontFamily={'Roboto'}
                    onItemSelected={onItemSelected}
                  />
          </View>
        </View>
      </Modal>
      <LoadingIndicator ref={refLoading} />
    </View>
  );
}

