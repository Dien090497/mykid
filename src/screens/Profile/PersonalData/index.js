import {
  FlatList,
  Image, Modal, RefreshControl,
  Text,
  TouchableOpacity,
  View,
  Dimensions, Keyboard
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
import {hideLoading, resizeImage, showLoading} from "../../../functions/utils";
import LoadingIndicator from '../../../components/LoadingIndicator';
import {getPersonalData} from "../../../network/PersonalDataService";

export default function PersonalDate() {
  let sheet = null;
  const refLoading = useRef();
  const refModalInput = useRef();
  const [title, setTitle] = useState('');
  const [inputText, setInputText] = useState('')
  const [gender, setGender] = useState();
  const [uri, setUri] = useState(false);
  const [avatar, setAvatar] = useState();
  const [contact, setContact] = useState();
  const [email, setEmail] = useState();
  const [name, setName] = useState();
  const [phone, setPhone] = useState();

  const data = [
    {
      id: '1',
      name: 'Hình đại diện',
      image: Images.icAvatar,
    },
    {
      id: '2',
      name: 'Tài khoản',
      textName: (phone === null ? 'Chưa có' : phone),
      image: Images.icEditProfile,
    },
    {
      id: '3',
      name: 'Họ tên',
      textName: (name === null ? 'Chưa có' : name),
      image: Images.icEditProfile,
      inputText: 'Nhập tên của bạn'
    },
    {
      id: '4',
      name: 'Giới tính',
      image: Images.icEditProfile,
      textName: (gender === null ? 'Chưa có' : (gender === 'MALE' ? String.male : String.female)),
    },
    {
      id: '5',
      name: 'Số điện thoại',
      image: Images.icEditProfile,
      textName: (contact === null ? 'Chưa có' : contact),
      inputText: 'Nhập số điện thoại'
    },
    {
      id: '6',
      name: 'Email',
      image: Images.icEditProfile,
      textName: (email === null ? 'Chưa có' : email),
      inputText: 'Nhập email'
    },

  ];

  const dataGender = [
    'Nam',
    'Nữ'
  ]

  useLayoutEffect(() => {
    getPersonalData({
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
    if (title === String.nameKids) {
      setName(res);
    } else if (title === String.height) {
      setHeight(parseInt(res));
    } else {
      setWeight(parseInt(res));
    }
  }

  const OnMoDal = (item) => {
    setTitle(item.item.name)
    setInputText(item.item.inputText)
    if (item.item.textName === 'Chưa có') {
      item.item.textName = '';
    }
    if (item.item.id === '1' || item.item.id === '4') {
      Keyboard.dismiss();
      sheet.show();
    } else {
      if (item.item.id === '5') {
        refModalInput.current.open('', () => {
          console.log('')
        }, item.item.textName, true);
      } else {
        refModalInput.current.open('', () => {
          console.log('')
        }, item.item.textName, false);
      }
    }
  }

  const resizeImg = (imagePickerResponse) => {
    if (imagePickerResponse.uri) {
      showLoading(refLoading);
      resizeImage(imagePickerResponse).then(uri => {
        hideLoading(refLoading);
        if (uri) {
          console.log(uri);
          setUri(uri);
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

  const renderFlatlist = (itemFlatlist) => {
    return (
      <View style={{flex: 1}}>
        {itemFlatlist.item.id === '1' ? (
          <View style={styles.tobMain}>
            <Text style={styles.text}> {itemFlatlist.item.name} </Text>
            <View style={{
              flexDirection: 'row',
              position: 'absolute',
              right: 10,
              justifyContent: 'center',
              alignItems: 'center'
            }}>
              <TouchableOpacity
                onPress={() => {
                  OnMoDal(itemFlatlist)
                }}
              >
                <Image
                  source={uri ? ({uri: uri}) : (itemFlatlist.item.image)}
                  style={[styles.image, {width: 40, height: 40, borderRadius: 20}]}
                />
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          <View style={styles.tobMain}>
            <Text style={styles.text}> {itemFlatlist.item.name} </Text>
            <View style={{
              flexDirection: 'row',
              position: 'absolute',
              right: 10,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
              <Text
                style={
                  [styles.text, {
                    color: 'rgba(181, 180, 180, 1)',
                    fontSize: 12
                  }]}>
                {itemFlatlist.item.textName}

              </Text>
              {itemFlatlist.item.id !== '2' ? (
                <TouchableOpacity
                  onPress={() => {
                    OnMoDal(itemFlatlist)
                  }}
                >
                  <Image
                    source={itemFlatlist.item.image}
                    style={styles.image}
                  />
                </TouchableOpacity>
              ) : (
                <View style={{width: 35}}/>
              )}
            </View>
          </View>
        )}
      </View>
    );
  }
  return (
    <View style={{flex: 1, backgroundColor: Colors.white}}>
      <Header title={'Dữ liệu cá nhân'}/>
      <View style={{justifyContent: 'center', alignItems: 'center'}}>
        <FlatList
          data={data}
          renderItem={renderFlatlist}
          keyExtractor={item => item.id}
          style={{paddingTop: 15}}
        />
        {name === null || gender === null || email === null || contact === null ? (
          <View style={[styles.tobViewMain, {
            backgroundColor: Colors.colorInputView,
            borderColor: Colors.colorInputView
          }]}>
            <Text style={[styles.text, {color: Colors.white}]}>Lưu</Text>
          </View>
        ) : (
          <TouchableOpacity style={styles.tobViewMain}>
            <Text style={[styles.text, {color: Colors.white}]}>Lưu</Text>
          </TouchableOpacity>
        )}
      </View>
      <ModalConfirmInput
        ref={refModalInput}
        title={title}
        inputText={inputText}
        onPressYes={() => refModalInput.current.close()}
      />
      {title === 'Giới tính' ? (
        <ActionSheet
          ref={o => sheet = o}
          styles={{
            buttonBox: {width: '100%', height: ScaleHeight.big * 1.2},
            buttonText: {fontSize: 18, fontWeight: '400', fontStyle: 'normal'}
          }}
          options={[...dataGender, String.cancel]}
          cancelButtonIndex={2}
          onPress={handleGenderAction}
        />
      ) : (
        <ActionSheet
          ref={o => sheet = o}
          styles={{
            buttonBox: {width: '100%', height: ScaleHeight.big * 1.2},
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
      )}
      <LoadingIndicator ref={refLoading}/>
    </View>
  );
}