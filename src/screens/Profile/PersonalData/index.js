import {
  Image,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useLayoutEffect, useRef, useState} from 'react';
import Header from '../../../components/Header';
import Images from '../../../assets/Images';
import {Colors} from "../../../assets/colors/Colors";
import {styles} from "./styles";
import ModalConfirmInput from "../../../components/ModalConfirmInput";
import ActionSheet from '@alessiocancian/react-native-actionsheet';
import {String} from "../../../assets/strings/String";
import {
  checkCameraPermission,
  checkPhotoLibraryReadPermission,
  checkPhotoLibraryWritePermission
} from "../../../functions/permissions";
import {launchCamera, launchImageLibrary} from "react-native-image-picker";
import {ScaleHeight} from "../../../functions/Consts";
import {emailTest, hideLoading, phoneTest1, resizeImage, showAlert, showLoading} from "../../../functions/utils";
import LoadingIndicator from '../../../components/LoadingIndicator';
import {getPersonalDataApi, updatePersonalDataApi} from "../../../network/PersonalDataService";

export default function PersonalDate() {
  let sheet = null;
  let sheet1 = null;
  const refLoading = useRef();
  const refModalInput = useRef();
  const [title, setTitle] = useState('');
  const [inputText, setInputText] = useState('')
  const [gender, setGender] = useState();
  const [avatar, setAvatar] = useState();
  const [contact, setContact] = useState();
  const [email, setEmail] = useState();
  const [name, setName] = useState();
  const [phone, setPhone] = useState();
  const [check, setCheck] = useState(false);

  const dataGender = [
    'MALE',
    'FEMALE'
  ]

  useLayoutEffect(() => {
    getPersonalDataApi({
      success: res => {
        setName(res.data.name);
        setGender(res.data.gender);
        setContact(res.data.contact);
        setAvatar(res.data.avatar);
        setPhone(res.data.phone);
        setEmail(res.data.email);
      }
    });
  }, []);

  const setInfo = (title, res) => {
    const resp = res.trim();
    if (title === String.contact) {
      setContact(resp);
    } else if (title === String.email) {
      if (resp !== '') {
        setEmail(resp);
      }
    } else {
      setName(res.trim());
    }
  }

  const InstallPersonalData = () => {
    if (!emailTest(email)) {
      showAlert(String.error_email);
      return;
    }
    if (name === null || name === '') {
      showAlert(String.error_name);
      return;
    }
    if (contact.length < 10 || !phoneTest1(contact)) {
      showAlert(String.error_contact);
      return;
    }
    updatePersonalDataApi(contact, email, avatar, gender, name, {
      success: res => {
        showAlert(String.EditSuccess)
      }
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
      setGender(dataGender[index]);
    }
  }

  return (
    <View style={{flex: 1, backgroundColor: Colors.white}}>
      <Header title={String.personalData}/>
      <View style={{justifyContent: 'center', alignItems: 'center'}}>
        <View style={{paddingTop: 15}}>
          <View style={styles.tobMain}>
            <Text style={styles.text}>{String.avatar}</Text>
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
            <Text style={styles.text}>{String.account}</Text>
            <View style={styles.viewAvatar}>
              <Text
                style={
                  [styles.text, {
                    color: 'rgba(181, 180, 180, 1)',
                    fontSize: 12
                  }]}>
                {phone === null ? 'Chưa có' : phone}
              </Text>
              <View style={{width: 35}}/>
            </View>
          </View>
          <View style={styles.tobMain}>
            <Text style={styles.text}>{String.name}</Text>
            <View style={styles.viewAvatar}>
              <Text
                style={
                  [styles.text, {
                    color: 'rgba(181, 180, 180, 1)',
                    fontSize: 12
                  }]}>
                {name === null || name === '' ? 'Chưa có' : name}
              </Text>
              <TouchableOpacity
                onPress={() => {
                  OnMoDal(String.name, String.textName, name, true)
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
            <Text style={styles.text}>{String.gender}</Text>
            <View style={styles.viewAvatar}>
              <Text
                style={
                  [styles.text, {
                    color: 'rgba(181, 180, 180, 1)',
                    fontSize: 12
                  }]}>
                {gender === null ? 'Chưa có' : (gender === 'MALE' ? String.male : String.female)}
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
            <Text style={styles.text}>{String.contact}</Text>
            <View style={styles.viewAvatar}>
              <Text
                style={
                  [styles.text, {
                    color: 'rgba(181, 180, 180, 1)',
                    fontSize: 12
                  }]}>
                {contact === null ? 'Chưa có' : contact}
              </Text>
              <TouchableOpacity
                onPress={() => {
                  OnMoDal(String.contact, String.textContact, contact, false)
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
            <Text style={styles.text}>{String.email}</Text>
            <View style={styles.viewAvatar}>
              <Text
                style={
                  [styles.text, {
                    color: 'rgba(181, 180, 180, 1)',
                    fontSize: 12
                  }]}>
                {email === null || email === '' ? 'Chưa có' : email}
              </Text>
              <TouchableOpacity
                onPress={() => {
                  OnMoDal(String.email, String.textEmail, email, true)
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
        <TouchableOpacity style={styles.tobViewMain} onPress={InstallPersonalData}>
          <Text style={[styles.text, {color: Colors.white}]}>Lưu</Text>
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
        options={['Nam', 'Nữ', String.cancel]}
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
          String.selectPhotoLibrary,
          String.takePhoto,
          String.cancel,
        ]}
        cancelButtonIndex={2}
        onPress={handleImageAction}
      />
      <LoadingIndicator ref={refLoading}/>
    </View>
  );
}