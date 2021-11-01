import {
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  View,
  Keyboard
} from 'react-native';
import React, { useLayoutEffect, useRef, useState} from 'react';
import Header from '../../../components/Header';
import Images from '../../../assets/Images';
import {Colors} from '../../../assets/colors/Colors';
import {styles} from './styles';
import ModalConfirmInput from '../../../components/ModalConfirmInput';
import ActionSheet from '@alessiocancian/react-native-actionsheet';
import {ScaleHeight} from '../../../functions/Consts';
import LoadingIndicator from '../../../components/LoadingIndicator';
import DataLocal from '../../../data/dataLocal';
import {getInfoApi, setInfoKitsApi} from '../../../network/InfoKidsService';
import DatePicker from 'react-native-date-picker';
import { useTranslation } from 'react-i18next';
import NotificationModal from '../../../components/NotificationModal';

export default function InfoKits({route}) {
  let sheet = null;
  const refLoading = useRef();
  const refModalInput = useRef();
  const refNotification = useRef();
  const [title, setTitle] = useState('');
  const [inputText, setInputText] = useState('')
  const [gender, setGender] = useState('');
  const [modalDate, setModalDate] = useState(false);
  const [name, setName] = useState('');
  const [birthdays, setBirthday] = useState('');
  const [weights, setWeight] = useState(0);
  const [heights, setHeight] = useState(0);
  const [date, setDate] = useState(new Date());
  const [check, setCheck] = useState(false);
  const [disableTob, setDisableTob] = useState(false);
  const { t } = useTranslation();

  const data = [
    {
      id: '1',
      name: t('common:nameKids'),
      textName: name,
      inputText: t('common:enterNameKids')
    },
    {
      id: '2',
      name: t('common:birthday'),
      textName: (check !== false ? `${date.getFullYear()}-${`0${date.getMonth() + 1}`.slice(
        -2,
      )}-${`0${date.getDate()}`.slice(-2)}` : birthdays),
      inputText: ''
    },
    {
      id: '3',
      name: t('common:gender'),
      textName: (gender === 'MALE' ? t('common:male') : t('common:female')),
      inputText: ''
    },
    {
      id: '4',
      name: t('common:height'),
      textName: heights + ' cm',
      isTextName: heights + '',
      inputText: t('common:enterHeight')
    },
    {
      id: '5',
      name: t('common:weight'),
      textName: weights + ' kg',
      isTextName: weights + '',
      inputText: t('common:enterWeight')
    },
  ];

  const dataGender = [
    'MALE',
    'FEMALE'
  ]

  useLayoutEffect(() => {
    getInfo();
  }, []);

  const getInfo = () => {
    getInfoApi(DataLocal.deviceId, {
      success: res => {
        setName(res.data.name);
        setBirthday(res.data.birthday);
        setGender(res.data.gender);
        setWeight(res.data.weight);
        setHeight(res.data.height);
      },
      refLoading: refLoading,
      refNotification: refNotification,
    })
  }

  const setInfo = (title, res) => {
    if (title === t('common:nameKids')) {
      if(name !== res) {
        setDisableTob(true);
      }
      setName(res.trim());
    } else if (title === t('common:height')) {
      if( heights !== res) {
        setDisableTob(true);
      }
      setHeight(parseInt(res));
    } else {
      if( weights !== res) {
        setDisableTob(true);
      }
      setWeight(parseInt(res));
    }
  }

  const handleGenderAction = (index) => {
    if (index < 2) {
      if (setGender(dataGender[index]) !== gender) {
        setDisableTob(true);
      }
      setGender(dataGender[index]);
    }
  }

  const InstallInfo = () => {
    const bd = `${date.getFullYear()}-${`0${date.getMonth() + 1}`.slice(
      -2,
    )}-${`0${date.getDate()}`.slice(-2)}`;
    let birthday = (check !== false ? bd : birthdays)
    const height = parseInt(heights);
    const weight = parseInt(weights);
    let body = {
      birthday,
      gender,
      height,
      name,
      weight
    }
    if (name === '') {
      refNotification.current.open(t('common:errorName'));
      return;
    }
    if (!checkDate()) {
      refNotification.current.open(t('common:error_birthday'));
      return;
    }
    if (parseInt(heights) > 0 && parseInt((weights)) > 0 ) {
      setInfoKitsApi(DataLocal.deviceId, body, {
        success: res => {
          setDisableTob(false);
          refNotification.current.open(t('common:success'))
        },
        refLoading: refLoading,
        refNotification: refNotification,
      })
    } else {
      refNotification.current.open(t('common:error_info'));
    }
  }

  const OnMoDal = (item) => {
    setTitle(item.item.name)
    setInputText(item.item.inputText)
    if (item.item.id === '2') {
      setModalDate(true)
    } else if (item.item.id === '3') {
      Keyboard.dismiss();
      sheet.show();
    } else {
      if (item.item.id !== '1') {
        refModalInput.current.open('', () => {
          console.log('')
        }, item.item.isTextName, true);
      } else {
        refModalInput.current.open('', () => {
          console.log('')
        }, item.item.textName, false);
      }
    }
  }

  const datePicker = () => {
    return (
      <DatePicker
        mode={'date'}
        modal
        open={modalDate}
        date={date}
        onConfirm={(time) => {
          setModalDate(false);
          setDisableTob(true);
          setDate(time);
          setCheck(true);
        }}
        onCancel={() => {
          setModalDate(false)
        }}
        title={t('common:chooseDay')}
        cancelText={t('common:cancel')}
        confirmText={t('common:member_approval')}
      />
    );
  }

  const checkDate = () => {
    const d =  new Date();
    if (date.getTime() < d.getTime()) {
     return true;
   } else {
     return false;
   }
  }

  const renderFlatlist = (itemFlatlist) => {
    return (
      <View style={{flex: 1}}>
        <View style={styles.tobMain}>
          <Text style={styles.text}> {itemFlatlist.item.name} </Text>
          <View style={styles.viewImage}>
            <Text
              style={
                [styles.text, {
                  color: 'rgba(181, 180, 180, 1)',
                  fontSize: 12
                }]}>
              {itemFlatlist.item.textName}
            </Text>
            <TouchableOpacity
              onPress={() => {
                OnMoDal(itemFlatlist)
              }}
            >
              <Image
                source={Images.icEditProfile}
                style={[styles.image, {width: 40, height: 40, borderRadius: 20}]}
                resizeMode={'contain'}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }

  return (
    <View style={{flex: 1, backgroundColor: Colors.white}}>
      <Header title={t('common:home_infoKits')}/>
      <View
        style={{
          width: '100%',
          height: '22%',
          justifyContent: 'center',
          alignItems: 'center'
        }}>
        <Image source={route.params.avatar ? {uri: route.params.avatar} : Images.icAvatar}
               style={{width: 130, height: 130, borderRadius: 100}}
               resizeMode={route.params.avatar ? 'cover' : 'stretch'}/>
      </View>
      <View style={{justifyContent: 'center', alignItems: 'center'}}>
        <FlatList
          data={data}
          renderItem={renderFlatlist}
          keyExtractor={item => item.id}
          style={{paddingTop: 15}}
        />
        <TouchableOpacity
          style={(!disableTob ? [styles.tobViewMain , {backgroundColor: 'rgba(181, 180, 180, 1)'}]: styles.tobViewMain)}
          onPress={InstallInfo} disabled={!disableTob}
        >
          <Text style={[styles.text, {color: Colors.white}]}>{t('common:save')}</Text>
        </TouchableOpacity>
      </View>
      <ModalConfirmInput
        ref={refModalInput}
        title={title}
        inputText={inputText}
        onPressYes={setInfo}
      />
      <ActionSheet
        ref={o => sheet = o}
        styles={{
          buttonBox: {width: '100%', height: ScaleHeight.big },
          buttonText: {fontSize: 18, fontWeight: '400', fontStyle: 'normal'}
        }}
        cancelButtonIndex={2}
        options={[
          t('common:male'),
          t('common:female'),
          t('common:cancel')]}
        onPress={handleGenderAction}
      />
      {datePicker()}
      <LoadingIndicator ref={refLoading}/>
      <NotificationModal ref={refNotification }/>
    </View>
  );
}
