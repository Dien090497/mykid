import {
  FlatList,
  Image, Modal, RefreshControl,
  Text,
  TouchableOpacity,
  View,
  Dimensions, Keyboard
} from 'react-native';
import React, {useRef, useState} from 'react';
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

export default function PersonalDate() {
  let sheet = null;
  const refLoading = useRef();
  const refModalInput = useRef();
  const [title, setTitle] = useState('');
  const [inputText, setInputText] = useState('')
  const [gender, setGender] = useState('Nam');
  const [uri, setUri] = useState(false);
  const data = [
    {
      id: '1',
      name: 'Hình đại diện',
      image: Images.icAvatar,
    },
    {
      id: '2',
      name: 'Tài khoản',
      image: Images.icEditProfile,
      relationship: 'ACBD',
    },
    {
      id: '3',
      name: 'Họ tên',
      image: Images.icEditProfile,
      relationship: 'Duy handsome',
      inputText: 'Nhập tên của bạn'
    },
    {
      id: '4',
      name: 'Giới tính',
      image: Images.icEditProfile,
      relationship: 'nam',
    },
    {
      id: '5',
      name: 'Số điện thoại',
      image: Images.icEditProfile,
      relationship: '0000000000',
      inputText: 'Nhập số điện thoại'
    },
    {
      id: '6',
      name: 'Email',
      image: Images.icEditProfile,
      relationship: 'bxd@gmail.com',
      inputText: 'Nhập email'
    },

  ];

  const dataGender = [
    'Nam',
    'Nữ'
  ]

  const OnMoDal = (item) => {
    setTitle(item.item.name);
    setInputText(item.item.inputText);
    if (item.item.id === '1' || item.item.id === '4') {
      Keyboard.dismiss();
      sheet.show();    }
    else {
      refModalInput.current.open();
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
               onPress={() => {OnMoDal(itemFlatlist)}}
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
                {itemFlatlist.item.id === '4' ? gender : itemFlatlist.item.relationship
                }
              </Text>
              {itemFlatlist.item.id !== '2' ? (
                <TouchableOpacity
                  onPress={() => {OnMoDal(itemFlatlist)}}
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
        <TouchableOpacity style={styles.tobViewMain}>
          <Text style={[styles.text, {color: Colors.white}]}>Lưu</Text>
        </TouchableOpacity>
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
            buttonBox: {width: '100%', height: ScaleHeight.big* 1.2},
            buttonText: {fontSize: 18, fontWeight: '400', fontStyle: 'normal'}
          }}
          options={[...dataGender, String.cancel]}
          onPress={handleGenderAction}
        />
      ) : (
        <ActionSheet
          ref={o => sheet = o}
          styles={{
            buttonBox: {width: '100%', height: ScaleHeight.big* 1.2},
            buttonText: {fontSize: 18, fontWeight: '400', fontStyle: 'normal'}
          }}
          options={[
            String.selectPhotoLibrary,
            String.takePhoto,
            String.cancel,
          ]}
          onPress={handleImageAction}
        />
      )}
      <LoadingIndicator ref={refLoading}/>
    </View>
  );
}