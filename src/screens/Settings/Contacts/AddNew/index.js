import {
  Image,
  Keyboard,
  PermissionsAndroid,
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import React, { useRef, useState } from 'react';

import { Colors } from '../../../../assets/colors/Colors';
import DataLocal from '../../../../data/dataLocal';
import Header from '../../../../components/Header';
import LoadingIndicator from '../../../../components/LoadingIndicator';
import { addPhoneBookApi } from '../../../../network/ContactService';
import { selectContact } from 'react-native-select-contact';
import { styles } from './styles';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Images from '../../../../assets/Images';
import { useTranslation } from 'react-i18next';
import { ActionSheetCustom } from '@alessiocancian/react-native-actionsheet';
import NotificationModal from '../../../../components/NotificationModal';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { hideLoading, phoneTest2, resizeImage, showLoading } from '../../../../functions/utils';
import { ScaleHeight } from '../../../../functions/Consts';
import {
  checkCameraPermission,
  checkPhotoLibraryReadPermission,
  checkPhotoLibraryWritePermission,
} from '../../../../functions/permissions';

export default ({ navigation, route }) => {
  let sheet1 = null;
  const [relationship, setRelationship] = useState('');
  const [phone, setPhone] = useState('');
  const [avatar, setAvatar] = useState(null);
  const { t } = useTranslation();
  const refLoading = useRef();
  const refNotification = useRef();
  const removeNonNumeric = num => num.toString().replace(/[^0-9]/g, '');
  const callContacts = async () => {
    try {
      let permissionAndroid;
      if (Platform.OS == 'android') {
        permissionAndroid = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
        );
        if (permissionAndroid != 'granted') {
          refNotification.current.open(t('common:noContactPermission'));
          return;
        }
      }

      try {
        var rsSelected = await selectContact();
        if (rsSelected && rsSelected.phones.length > 0) {
          setRelationship(rsSelected.name);
          setPhone(removeNonNumeric(rsSelected.phones[0].number));
        }
      } catch (e) {
        console.warn(e);
      }
    } catch (error) {
      alert(error.message);
    }
  };

  const saveContact = async () => {
    if (!phoneTest2(phone)) {
      return refNotification.current.open(t('common:error_phone'));
    }
    if (!relationship.trim().length) {
      return refNotification.current.open(t('common:enter_relationship'));
    }
    if (!phone.trim().length) {
      return refNotification.current.open(t('common:enter_phone_number'));
    }
    addPhoneBookApi(
      DataLocal.deviceId,
      {
        file: avatar,
        name: relationship,
        phoneNumber: removeNonNumeric(phone),
      },
      {
        success: res => {
          if (route.params.onGoBack) {
            route.params.onGoBack(res.data);
            navigation.goBack();
          }
        },
        refLoading: refLoading,
        refNotification: refNotification,
      },
    );
  };

  const OnActionSheet = () => {
    sheet1.show();
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
  };
  const resizeImg = (imagePickerResponse) => {
    if (imagePickerResponse.uri) {
      showLoading(refLoading);
      resizeImage(imagePickerResponse).then(uri => {
        hideLoading(refLoading);
        if (uri) {
          setAvatar(uri);
        }
      });
    }
  };

  return (
    <View
      style={[styles.container, { paddingBottom: useSafeAreaInsets().bottom }]}>
      <Header title={t('common:header_addContact')} />
      <View style={styles.mainView}>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <TouchableOpacity style={{ alignItems:'center'}} onPress={OnActionSheet}>
            <Image source={avatar ? { uri: avatar } : Images.icAvatar}
                   style={styles.imageAvatar}
                   resizeMode={avatar ? 'cover' : 'stretch'} />
            <View style={{ flexDirection: 'row', marginTop: '4%', alignItems: 'center', justifyContent: 'center' }}>
              <Image source={Images.icShootPhoto} style={styles.icon} resizeMode={'stretch'} />
              <Text style={styles.txtAvatar}>{t('common:changeAvatar')}</Text>
            </View>
          </TouchableOpacity>
        </View>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View
            style={styles.mainContent}>
            <View style={styles.viewTextInput}>
              <TextInput
                underlineColorAndroid={'transparent'}
                style={styles.textInput}
                disableFullscreenUI
                value={relationship}
                placeholder={t('common:enter_relationship')}
                onChangeText={text => setRelationship(text)}
                placeholderTextColor={Colors.grayTextTitleColor}
              />
            </View>
            <View
              style={styles.viewTextInput}>
              <TextInput
                underlineColorAndroid={'transparent'}
                style={styles.textInput}
                disableFullscreenUI
                value={phone}
                placeholder={t('common:textContact')}
                onChangeText={text => setPhone(text)}
                keyboardType={'phone-pad'}
                placeholderTextColor={Colors.grayTextTitleColor} />
              <TouchableOpacity
                onPress={callContacts}>
                <Image source={Images.icNodeBook} style={styles.iconNodeBook} resizeMode={'stretch'} />
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              style={styles.btnSubmit}
              onPress={saveContact}>
              <Text style={styles.txtSubmit}>{t('common:save')}</Text>
            </TouchableOpacity>
          </View>
        </TouchableWithoutFeedback>
      </View>
      <ActionSheetCustom
        ref={o => sheet1 = o}
        styles={{
          buttonBox: { width: '100%', height: ScaleHeight.big },
          buttonText: styles.txtAction,
        }}
        options={[
          t('common:selectPhotoLibrary'),
          t('common:takePhoto'),
          t('common:cancel'),
        ]}
        cancelButtonIndex={2}
        onPress={handleImageAction}
      />
      <LoadingIndicator ref={refLoading} />
      <NotificationModal ref={refNotification} />
    </View>
  );
};
