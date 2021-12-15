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
import { ActionSheetCustom } from '@alessiocancian/react-native-actionsheet';
import {ScaleHeight} from '../../../functions/Consts';
import LoadingIndicator from '../../../components/LoadingIndicator';
import DataLocal from '../../../data/dataLocal';
import {getInfoApi, setInfoKitsApi} from '../../../network/InfoKidsService';
import { useTranslation } from 'react-i18next';
import NotificationModal from '../../../components/NotificationModal';
import DatePickerModal from "../../../components/DatePickerModal";
import {
  checkCameraPermission,
  checkPhotoLibraryReadPermission,
  checkPhotoLibraryWritePermission
} from "../../../functions/permissions";
import {launchCamera, launchImageLibrary} from "react-native-image-picker";
import {hideLoading, resizeImage, showLoading} from "../../../functions/utils";

export default function InfoKits({route}) {
  let sheet = null;
  let sheet1 = null;
  const refLoading = useRef();
  const refModalInput = useRef();
  const refNotification = useRef();
  const refDatepicker = useRef();
  const [title, setTitle] = useState('');
  const [inputText, setInputText] = useState('')
  const [avatar, setAvatar] = useState(null);
  const [gender, setGender] = useState('');
  const [name, setName] = useState('');
  const [birthdays, setBirthday] = useState('');
  const [weights, setWeight] = useState(0);
  const [heights, setHeight] = useState(0);
  const [phone, setPhone] = useState();
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
    {
      id: '6',
      name: t('common:phoneKids'),
      textName: (phone && phone.startsWith('+84') && '0' + phone.substring(3)),
    },
    {
      id: '7',
      name: t('common:save')
    }
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
        setAvatar(res.data.avatar);
        setName(res.data.name);
        setBirthday(res.data.birthday);
        setGender(res.data.gender);
        setWeight(res.data.weight);
        setHeight(res.data.height);
        setPhone(res.data.isdn);
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
      if (parseInt(res) > 200) {
        refNotification.current.open(t('common:errorHeight'));
        return;
      }
      setHeight(parseInt(res));
    } else {
      if( weights !== res) {
        setDisableTob(true);
      }
      if (parseInt(res) > 100) {
        refNotification.current.open(t('common:errorWeight'));
        return;
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
      avatar,
      birthday,
      gender,
      height,
      name,
      weight,
      phone
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
      refDatepicker.current.openModal(date,(config)=>{
        setDisableTob(true);
        setDate(config);
        setCheck(true);
      })
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

  const checkDate = () => {
    const d =  new Date();
    if (date.getTime() < d.getTime()) {
     return true;
   } else {
     return false;
   }
  }

  const OnActionSheet = () => {
      sheet1.show();
  }

  const handleImageAction = async (index) => {
    switch (index) {
      case 0:
        const granted = await checkPhotoLibraryReadPermission();
        if (granted) {
          launchImageLibrary({
            mediaType: 'photo',
          }, resp => {
            resizeImg(resp);
          });
        }
        break;
      case 1:
        const cameraGranted = await checkCameraPermission();
        const photosGranted = await checkPhotoLibraryWritePermission();
        if (cameraGranted && photosGranted) {
          launchCamera({
            mediaType: 'photo',
            cameraType: 'front',
            saveToPhotos: false,
          }, resp => {
            resizeImg(resp);
          });
        }
        break;
    }
  }
  const resizeImg = (imagePickerResponse) => {
    if (imagePickerResponse.uri) {
      showLoading(refLoading);
      resizeImage(imagePickerResponse).then(uri => {
        hideLoading(refLoading);
        if (uri) {
          setAvatar(uri);
          setDisableTob(true);
        }
      });
    }
  };

  const renderFlatlist = (itemFlatlist) => {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        {itemFlatlist.item.id !== '7' ? (
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
                { itemFlatlist.item.id !== '6'? (
                  <TouchableOpacity
                    onPress={() => {
                      OnMoDal(itemFlatlist)
                    }}
                  >
                    <Image
                      source={Images.icEditProfile}
                      style={styles.image}
                      resizeMode={'contain'}
                    />
                  </TouchableOpacity>
                ): (
                  <View style={styles.view}/>
                )}
              </View>
            </View>
        ):(
          <TouchableOpacity
            style={(!disableTob ? [styles.tobViewMain , {backgroundColor: 'rgba(181, 180, 180, 1)'}]: styles.tobViewMain)}
            onPress={InstallInfo} disabled={!disableTob}
          >
            <Text style={[styles.text, {color: Colors.white}]}>{t('common:save')}</Text>
          </TouchableOpacity>
        )}
      </View>
    );
  }

  return (
    <View style={styles.viewContainer}>
      <Header title={t('common:home_infoKits')} />
     <View style={styles.viewMain}>
       <TouchableOpacity
         style={{
           width: '60%',
           height: '100%',
           justifyContent: 'center',
           alignItems: 'center',
         }}
         onPress={OnActionSheet}
       >
         <Image source={avatar ? { uri: avatar } : Images.icAvatar}
                style={styles.imageAvatar}
                resizeMode={avatar ? 'cover' : 'stretch'} />
         <View style={{ flexDirection: 'row', marginTop: '4%', alignItems: 'center', justifyContent: 'center' }}>
           <Image source={Images.icShootPhoto} style={styles.image1} />
           <Text style={styles.txtAvatar}>{t('common:changeAvatar')}</Text>
         </View>
       </TouchableOpacity>
     </View>
      <View style={{ justifyContent: 'center', alignItems: 'center', height: '75%', marginTop: -10 }}>
        <FlatList
          data={data}
          renderItem={renderFlatlist}
          keyExtractor={item => item.id}
          style={{paddingVertical: 15}}
        />
      </View>
      <ModalConfirmInput
        ref={refModalInput}
        title={title}
        inputText={inputText}
        onPressYes={setInfo}
      />
      <ActionSheetCustom
        ref={o => sheet = o}
        styles={{
          buttonBox: {width: '100%', height: ScaleHeight.big },
          buttonText: styles.txtAction
        }}
        cancelButtonIndex={2}
        options={[
          <Text style={[styles.txtAction, {color: Colors.grayTextColor}]}>{t('common:male')}</Text>,
          <Text style={[styles.txtAction, {color: Colors.grayTextColor}]}>{t('common:female')}</Text>,
          <Text style={[styles.txtAction, {color: Colors.grayTextColor}]}>{t('common:cancel')}</Text>,
        ]}
        onPress={handleGenderAction}
      />
      <ActionSheetCustom
        ref={o => sheet1 = o}
        styles={{
          buttonBox: {width: '100%', height: ScaleHeight.big},
          buttonText: styles.txtAction
        }}
        options={[
          t('common:selectPhotoLibrary'),
          t('common:takePhoto'),
          t('common:cancel'),
        ]}
        cancelButtonIndex={2}
        onPress={handleImageAction}
      />
      <LoadingIndicator ref={refLoading}/>
      <DatePickerModal ref={refDatepicker}/>
      <NotificationModal ref={refNotification }/>
    </View>
  );
}
