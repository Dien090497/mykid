import {
  Keyboard,
  PermissionsAndroid,
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import React, {useRef, useState} from 'react';

import { Colors } from '../../../assets/colors/Colors';
import Header from '../../../components/Header';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import LoadingIndicator from '../../../components/LoadingIndicator';
import {String} from '../../../assets/strings/String';
import {addPhoneBookApi} from '../../../network/ContactService';
import {selectContact} from 'react-native-select-contact';
import {showAlert} from '../../../functions/utils';
import {styles} from './styles';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

export default ({navigation, route}) => {
  const [relationship, setRelationship] = useState('');
  const [phone, setPhone] = useState('');
  const refLoading = useRef();
  const removeNonNumeric = num => num.toString().replace(/[^0-9]/g, '');
  const callContacts = async () => {
    try {
      var permissionAndroid;
      //Nếu là nền tảng android thì sẽ yêu cầu cấp quyền trước
      if (Platform.OS == 'android') {
        permissionAndroid = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
        );
        if (permissionAndroid != 'granted') {
          showAlert(String.noContactPermission);
          return;
        }
      }

      try {
        var rsSelected = await selectContact();
        if (rsSelected && rsSelected.phones.length > 0) {
          setRelationship(rsSelected.name);
          setPhone(removeNonNumeric(rsSelected.phones[0].number));
        }
        //    console.log('rsSelected', rsSelected)
      } catch (e) {
        console.warn(e);
      }
    } catch (error) {
      alert(error.message);
    }
  };

  const saveContact = async () => {
    //Thực hiện lưu liên lạc
    if (!relationship.trim().length) {
      showAlert(String.enter_relationship);
      return;
    }
    if (!phone.trim().length) {
      showAlert(String.enter_phone_number);
      return;
    }
    addPhoneBookApi(
      2,
      {
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
      },
    );
  };
  return (
    <View
      style={[styles.container, {paddingBottom: useSafeAreaInsets().bottom}]}>
      <Header title={String.header_addContact} />
      <View style={styles.mainView}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View
            style={{
              flex: 1,
              paddingHorizontal: 20,
              width: '100%',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <TextInput
              underlineColorAndroid={'transparent'}
              style={{
                fontSize: 16,
                padding: 10,
                marginBottom: 10,
                height: 50,
                width: '100%',
                backgroundColor: '#efefef',
                borderRadius: 10,
                alignSelf: 'center',
              }}
              disableFullscreenUI
              value={relationship}
              placeholder={'Mối quan hệ với trẻ...'}
              onChangeText={text => setRelationship(text)}
            />

            <View
              style={{
                flexDirection: 'row',
                height: 50,
                width: '100%',
                backgroundColor: '#efefef',
                alignSelf: 'center',
                borderRadius: 10,
              }}>
              <TextInput
                underlineColorAndroid={'transparent'}
                style={{fontSize: 16, padding: 10, flex: 0.9}}
                disableFullscreenUI
                value={phone}
                placeholder={'Nhập số điện thoại...'}
                onChangeText={text => setPhone(text)}
                keyboardType={'phone-pad'}></TextInput>
              <TouchableOpacity
                style={{
                  flex: 0.1,
                  alignSelf: 'center',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
                onPress={callContacts}>
                <Icon name={'contacts'} size={24} color={'gray'} />
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
        <TouchableOpacity
          style={{
            backgroundColor: Colors.blueButton,
            width: '90%',
            alignSelf: 'center',
            borderRadius: 10,
            justifyContent: 'center',
            alignItems: 'center',
            paddingVertical: 13,
          }}
          onPress={saveContact}>
          <Text style={{color: 'white', fontSize: 16}}>Lưu</Text>
        </TouchableOpacity>
      </View>
      <LoadingIndicator ref={refLoading} />
    </View>
  );
};
