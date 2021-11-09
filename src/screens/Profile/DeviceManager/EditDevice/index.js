import {
  Image, Keyboard,
  Text, TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { styles } from './styles';
import Header from '../../../../components/Header';
import Images from '../../../../assets/Images';
import Consts from '../../../../functions/Consts';
import { Colors } from '../../../../assets/colors/Colors';
import LoadingIndicator from '../../../../components/LoadingIndicator';
import React, { useLayoutEffect, useRef, useState } from 'react';
import ActionSheet from '@alessiocancian/react-native-actionsheet';
import ModalConfirm from '../../../../components/ModalConfirm';
import {
  checkCameraPermission,
  checkPhotoLibraryReadPermission,
  checkPhotoLibraryWritePermission,
} from '../../../../functions/permissions';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { hideLoading, resizeImage, showLoading } from '../../../../functions/utils';
import {editDeviceApi} from '../../../../network/DeviceService';
import { useTranslation } from 'react-i18next';
import DataLocal from '../../../../data/dataLocal';
import NotificationModal from "../../../../components/NotificationModal";

export default function EditDevice({ navigation, route }) {

  const refLoading = useRef();
  const refConfirm = useRef();
  const refNotification = useRef();
  const [data, setData] = useState(null);
  const [avatar, setAvatar] = useState(null);
  const { t } = useTranslation();
  let sheet = null;

  useLayoutEffect(() => {
    setData(route.params.data);
  },[]);

  console.log(data)

  const onRelationship = () => {
    navigation.navigate(Consts.ScreenIds.Relationship, { data: data, onSetRelationship: onPlaceChosen });
  };

  const onPlaceChosen = (relationship) => {
    const newData = Object.assign({}, data);
    newData.relationshipName = relationship.name;
    newData.relationship = relationship.relationship;
    newData.icon = relationship.icon;
    setData(newData);
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

  const selectPhoto = () => {
    Keyboard.dismiss();
    sheet.show();
  }

  const deleteConfirm = () => {
    const result = Object.assign({},data);
    if (result.relationship !== 'OTHER'){
      result.relationshipName = null;
    }
    editDeviceApi(
      result.id,
      result.deviceName,
      result.icon,
      result.relationship,
      result.relationshipName,
      avatar,
      {success: res =>{
          route.params.onRefresh()
          navigation.goBack();
        }
        ,refLoading,
        refNotification,
      }
    )
  };

  const setDeviceName = (text) =>{
    const result = Object.assign({},data)
    result.deviceName = text;
    setData(result)
  }


  return (
    <View style={styles.contain}>
      <Header title={t('common:header_editDevice')} />
      <View style={{ flex: 1, marginHorizontal: 20 }}>
        <TouchableOpacity style={styles.viewAvatar} onPress={selectPhoto}>
          <Text style={styles.containText}>{t('common:textAvatar')}</Text>
          <View>
            {data &&
            <Image source={avatar? {uri:avatar} : data.avatar ? { uri: data.avatar } : data.icon} resizeMode='cover' style={styles.avatar} />}
          </View>
        </TouchableOpacity>
        <View style={styles.viewContain}>
          <Text style={styles.containText}>{t('common:textDeviceNane')}</Text>
          {data && <TextInput style={styles.textNickName}
                              onChangeText={(text)=>{setDeviceName(text)}}
                              maxLength={10}
                              value={data.deviceName} />}
        </View>
        <TouchableOpacity style={styles.input} onPress={onRelationship}>
          {data && <Image style={[styles.iconInput, { height: '60%' }]} source={data.icon} resizeMode='contain' />}
          {data &&
          <Text style={{ flex: 1, color: Colors.black }}>{t('common:iAm')}
            <Text style={{ fontFamily: 'Roboto-Bold' }}>
              {DataLocal.language === 'vi' ? data.relationshipName : t('common:ofHe') + ' '}
            </Text>
            {DataLocal.language === 'vi' ? t('common:ofHe') + ' ' : data.relationshipName}
          </Text>}
          <TouchableOpacity style={{ paddingVertical: '3%' }}>
            <Image style={styles.iconInput} source={Images.icDetail} resizeMode='contain' />
          </TouchableOpacity>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => {deleteConfirm()}}>
          <Text style={styles.buttonText}>{t('common:confirm')}</Text>
        </TouchableOpacity>
      </View>
      <LoadingIndicator ref={refLoading} />
      <ModalConfirm ref={refConfirm} />
      <NotificationModal ref={refNotification} />
      <ActionSheet
        ref={o => sheet = o}
        title={t('common:selectPhoto')}
        options={[
          t('common:selectPhotoLibrary'),
          t('common:takePhoto'),
          t('common:cancel'),
        ]}
        cancelButtonIndex={2}
        onPress={handleImageAction}
      />
    </View>
  );
}
