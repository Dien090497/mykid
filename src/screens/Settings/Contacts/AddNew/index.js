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
} from "react-native";
import React, {useRef, useState} from 'react';

import { Colors } from '../../../../assets/colors/Colors';
import DataLocal from '../../../../data/dataLocal';
import Header from '../../../../components/Header';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import LoadingIndicator from '../../../../components/LoadingIndicator';
import {String} from '../../../../assets/strings/String';
import {addPhoneBookApi} from '../../../../network/ContactService';
import {selectContact} from 'react-native-select-contact';
import {showAlert} from '../../../../functions/utils';
import {styles} from './styles';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Images from "../../../../assets/Images";

export default ({navigation, route}) => {
  const [relationship, setRelationship] = useState('');
  const [phone, setPhone] = useState('');
  const refLoading = useRef();
  const removeNonNumeric = num => num.toString().replace(/[^0-9]/g, '');
  const callContacts = async () => {
    try {
      var permissionAndroid;
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
      } catch (e) {
        console.warn(e);
      }
    } catch (error) {
      alert(error.message);
    }
  };

  const saveContact = async () => {
    if (!relationship.trim().length) {
      showAlert(String.enter_relationship);
      return;
    }
    if (!phone.trim().length) {
      showAlert(String.enter_phone_number);
      return;
    }
    addPhoneBookApi(
      DataLocal.deviceId,
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
            style={styles.mainContent}>
            <View style={styles.viewTextInput}>
              <TextInput
                underlineColorAndroid={'transparent'}
                style={styles.textInput}
                disableFullscreenUI
                value={relationship}
                placeholder={'Mối quan hệ với trẻ'}
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
                placeholder={'Nhập số điện thoại'}
                onChangeText={text => setPhone(text)}
                keyboardType={'phone-pad'}
                placeholderTextColor={Colors.grayTextTitleColor}/>
              <TouchableOpacity
                onPress={callContacts}>
                <Image source={Images.icNodeBook} style={styles.iconNodeBook} resizeMode={'stretch'}/>
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              style={styles.btnSubmit}
              onPress={saveContact}>
              <Text style={styles.txtSubmit}>{String.save}</Text>
            </TouchableOpacity>
          </View>
        </TouchableWithoutFeedback>
      </View>
      <LoadingIndicator ref={refLoading} />
    </View>
  );
};
