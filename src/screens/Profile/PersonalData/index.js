import {
  Image,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useLayoutEffect, useRef, useState} from 'react';
import Header from '../../../components/Header';
import Images from '../../../assets/Images';
import {Colors} from '../../../assets/colors/Colors';
import {styles} from './styles';
import ModalConfirmInput from '../../../components/ModalConfirmInput';
import ActionSheet from '@alessiocancian/react-native-actionsheet';
import {
  checkCameraPermission,
  checkPhotoLibraryReadPermission,
  checkPhotoLibraryWritePermission
} from '../../../functions/permissions';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {ScaleHeight} from '../../../functions/Consts';
import {emailTest, hideLoading, phoneTest1, resizeImage, showLoading} from '../../../functions/utils';
import LoadingIndicator from '../../../components/LoadingIndicator';
import {getPersonalDataApi, updatePersonalDataApi} from '../../../network/PersonalDataService';
import { useTranslation } from 'react-i18next';
import NotificationModal from '../../../components/NotificationModal';

export default function PersonalDate() {
  let sheet = null;
  let sheet1 = null;
  const refLoading = useRef();
  const refNotification = useRef();
  const refModalInput = useRef();
  const [title, setTitle] = useState('');
  const [inputText, setInputText] = useState('')
  const [gender, setGender] = useState();
  const [avatar, setAvatar] = useState();
  const [contact, setContact] = useState(null);
  const [email, setEmail] = useState();
  const [name, setName] = useState();
  const [phone, setPhone] = useState();
  const [check, setCheck] = useState(false);
  const [disableTob, setDisableTob] = useState(false);
  const {t} = useTranslation();

  const dataGender = [
    'MALE',
    'FEMALE'
  ]

  useLayoutEffect(() => {
    getPersonalDataApi({
      success: res => {
        setAvatar(res.data.avatar);
        if (res.data.phone && res.data.phone.startsWith('+84')) {
          setPhone('0' + res.data.phone.substring(3));
        }
        setName(res.data.name);
        setGender(res.data.gender);
        if (res.data.contact && res.data.contact.startsWith('+84')) {
          setContact('0' + res.data.contact.substring(3));
        }
        setEmail(res.data.email);
      },
      refNotification: refNotification,
    });
  }, []);

  const setInfo = (title, res) => {
    if (res === null) {
      return;
    }
    if (title === t('common:contact')) {
      if (contact !== res) {
        setDisableTob(true);
      }
      setContact(res);
    } else if (title === t('common:email')) {
      if (email !== res) {
        setDisableTob(true);
      }
      if (res !== '') {
        setEmail(res.trim());
      }
    } else {
      if (name !== res) {
        setDisableTob(true);
      }
      setName(res.trim());
    }
  }

  const editPhone = () => {
    if (contact[0] === '0') {
      return '+84' + contact.substring(1);
    }
    if (contact[0] === '8' && contact[1] === '4') {
      return ('+' + contact);
    }
  }

  const InstallPersonalData = () => {
    let phoneContact = null ;
    if (contact !== null) {
       phoneContact = editPhone();
    }
    if (!emailTest(email)) {
      refNotification.current.open(t('common:error_email'))
      return;
    }
    if (name === null || name === '') {
      refNotification.current.open(t('common:error_name'))
      return;
    }
    if (contact !== null && !phoneTest1(phoneContact)) {
      refNotification.current.open(t('common:error_contact'))
      return;
    }
    updatePersonalDataApi(phoneContact, email, avatar, gender, name, {
      success: res => {
        refNotification.current.open(t('common:EditSuccess'))
        setDisableTob(false);
      },
      refNotification: refNotification,
    })
  }

  const OnMoDal = (name, textName, textInput, check) => {
    setTitle(name);
    setInputText(textName);
    if (!check) {
      refModalInput.current.open('', () => {
        console.log('')
      }, textInput, true);
    } else {
      refModalInput.current.open('', () => {
        console.log('')
      }, textInput, false);
    }
  }

  const OnActionSheet = (isCheck) => {
    if (isCheck) {
      sheet.show();
    } else {
      sheet1.show();
    }
  }

  const resizeImg = (imagePickerResponse) => {
    if (imagePickerResponse.uri) {
      showLoading(refLoading);
      resizeImage(imagePickerResponse).then(uri => {
        hideLoading(refLoading);
        if (uri) {
          setAvatar(uri);
          setCheck(true);
          setDisableTob(true);
        }
      });
    }
  };

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

  const handleGenderAction = (index) => {
    if (index < 2) {
      if (setGender(dataGender[index]) !== gender) {
        setDisableTob(true);
      }
      setGender(dataGender[index]);
    }
  }
console.log(phone,contact,email)
  return (
    <View style={{flex: 1, backgroundColor: Colors.white}}>
      <Header title={t('common:personalData')}/>
      <View style={{justifyContent: 'center', alignItems: 'center'}}>
        <View style={{paddingTop: 15}}>
          <View style={styles.tobMain}>
            <Text style={styles.text}>{t('common:textAvatar')}</Text>
            <View style={styles.viewAvatar}>
              <TouchableOpacity onPress={() => {
                OnActionSheet(true)
              }}>
                <Image
                  source={check ? {uri: avatar} : avatar ? {uri: avatar} : Images.icAvatar}
                  style={[styles.image, {width: 40, height: 40, borderRadius: 20}]}
                />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.tobMain}>
            <Text style={styles.text}>{t('common:account')}</Text>
            <View style={styles.viewAvatar}>
              <Text
                style={
                  [styles.text, {
                    color: 'rgba(181, 180, 180, 1)',
                    fontSize: 12
                  }]}>
                {phone === null ? t('common:yetHave') : phone}
              </Text>
              <View style={{width: 35}}/>
            </View>
          </View>
          <View style={styles.tobMain}>
            <Text style={styles.text}>{t('common:name')}</Text>
            <View style={styles.viewAvatar}>
              <Text
                style={
                  [styles.text, {
                    color: 'rgba(181, 180, 180, 1)',
                    fontSize: 12
                  }]}>
                {name === null || name === '' ? t('common:yetHave') : name}
              </Text>
              <TouchableOpacity
                onPress={() => {
                  OnMoDal(t('common:name'), t('common:textName'), name, true)
                }}
                style={styles.tobView}
              >
                <Image
                  source={Images.icEditProfile}
                  style={styles.image}
                />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.tobMain}>
            <Text style={styles.text}>{t('common:gender')}</Text>
            <View style={styles.viewAvatar}>
              <Text
                style={
                  [styles.text, {
                    color: 'rgba(181, 180, 180, 1)',
                    fontSize: 12
                  }]}>
                {gender === null ? t('common:yetHave') : (gender === 'MALE' ? t('common:male') : t('common:female'))}
              </Text>
              <TouchableOpacity
                onPress={() => {
                  OnActionSheet(false)
                }}
                style={styles.tobView}
              >
                <Image
                  source={Images.icEditProfile}
                  style={styles.image}
                />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.tobMain}>
            <Text style={styles.text}>{t('common:contact')}</Text>
            <View style={styles.viewAvatar}>
              <Text
                style={
                  [styles.text, {
                    color: 'rgba(181, 180, 180, 1)',
                    fontSize: 12
                  }]}>
                {contact === null ? t('common:yetHave') : contact}
              </Text>
              <TouchableOpacity
                onPress={() => {
                  OnMoDal(t('common:contact'), t('common:textContact'), contact, false)
                }}
                style={styles.tobView}
              >
                <Image
                  source={Images.icEditProfile}
                  style={styles.image}
                />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.tobMain}>
            <Text style={styles.text}>{t('common:email')}</Text>
            <View style={styles.viewAvatar}>
              <Text
                style={
                  [styles.text, {
                    color: 'rgba(181, 180, 180, 1)',
                    fontSize: 12
                  }]}>
                {email === null || email === '' ? t('common:yetHave') : email}
              </Text>
              <TouchableOpacity
                onPress={() => {
                  OnMoDal(t('common:email'), t('common:textEmail'), email, true)
                }}
                style={styles.tobView}
              >
                <Image
                  source={Images.icEditProfile}
                  style={styles.image}
                />
              </TouchableOpacity>
            </View>
          </View>

        </View>
        <TouchableOpacity
          style={(!disableTob ? [styles.tobViewMain, {backgroundColor: 'rgba(181, 180, 180, 1)'}] : styles.tobViewMain)}
          onPress={InstallPersonalData} disabled={!disableTob}
        >
          <Text style={[styles.text, {color: Colors.white}]}>{t('common:save')}</Text>
        </TouchableOpacity>
      </View>
      <ModalConfirmInput
        ref={refModalInput}
        onPressYes={setInfo}
        title={title}
        inputText={inputText}
      />
      <ActionSheet
        ref={o => sheet1 = o}
        styles={{
          buttonBox: {width: '100%', height: ScaleHeight.big},
          buttonText: {fontSize: 18, fontWeight: '400', fontStyle: 'normal'}
        }}
        options={[t('common:male'),t('common:female') , t('common:cancel')]}
        cancelButtonIndex={2}
        onPress={handleGenderAction}
      />
      <ActionSheet
        ref={o => sheet = o}
        styles={{
          buttonBox: {width: '100%', height: ScaleHeight.big},
          buttonText: {fontSize: 18, fontWeight: '400', fontStyle: 'normal'}
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
      <NotificationModal ref={refNotification}/>
    </View>
  );
}
