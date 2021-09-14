import Consts, {FontSize, ScaleHeight} from '../../../functions/Consts';
import {
  FlatList,
  Image,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {
  deletePhoneBookApi,
  getListContactPhoneApi,
  setSOSApi,
} from '../../../network/ContactService';
import {
  hideLoading,
  showConfirmation,
  showLoading,
} from '../../../functions/utils';

import {Colors} from '../../../assets/colors/Colors';
import CustomIcon from '../../../components/VectorIcons';
import DataLocal from '../../../data/dataLocal';
import Header from '../../../components/Header';
import Images from '../../../assets/Images';
import LoadingIndicator from '../../../components/LoadingIndicator';
import {String} from '../../../assets/strings/String';
import {styles} from './styles';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

export default ({navigation, route}) => {
  const refLoading = useRef();
  const [isBlocking, setIsBlocking] = useState(false);
  const [dataContacts, setDataContacts] = useState(null);

  useEffect(() => {
    getListContactPhoneApi(DataLocal.deviceId, {
      success: res => {
        setDataContacts(res.data);
      },
    });
  }, []);

  const changeSOS = (item, index) => {
    //call API changeSOS
    setSOSApi(
      DataLocal.deviceId,
      {
        phoneNumber: item.phoneNumber,
      },
      {
        success: res => {
          setDataContacts(res.data);
        },
        refLoading: refLoading,
      },
    );
  };

  const removeContact = item => {
    //call remove Contact
    showConfirmation(String.removeContactConfirm, {
      acceptStr: String.member_approval,
      cancelStr: String.back,
      response: () => {
        deletePhoneBookApi(
          DataLocal.deviceId,
          {
            phoneNumber: item.phoneNumber,
          },
          {
            success: res => {
              setDataContacts(res.data);
            },
            refLoading: refLoading,
          },
        );
      },
    });
  };
  const renderItem = ({item, index}) => {
    return (
      <TouchableOpacity
        activeOpacity={0.9}
        style={styles.containerItemContact}
        key={item.key}
        onPress={item.onPress}>
        <View style={styles.wrap}>
          <View style={styles.containerSOS}>
            <Text style={styles.txtSOS}>SOS</Text>
            <TouchableOpacity
              style={styles.containerChangeSOS}
              onPress={() => changeSOS(item, index)}>
              {item.sosNumber && <View style={styles.containerSelected} />}
            </TouchableOpacity>
          </View>
          <View style={{flex: 0.8}}>
            <Text style={styles.titleText}>{item.name}</Text>
            <Text style={styles.phoneText}>{item.phoneNumber}</Text>
          </View>
          {!item.sosNumber && (
            <TouchableOpacity
              style={styles.containerRemove}
              onPress={() => removeContact(item)}>
              <Text style={styles.txtRemove}>Xoá</Text>
            </TouchableOpacity>
          )}
        </View>
      </TouchableOpacity>
    );
  };
  const pressAddNew = () => {
    navigation.navigate(Consts.ScreenIds.AddNewContact, {
      onGoBack: data => setDataContacts(data),
    });
  };

  const toggleSwitch = () => {
    setIsBlocking(!isBlocking);
  };

  return (
    <View
      style={[styles.container, {paddingBottom: useSafeAreaInsets().bottom}]}>
      <Header title={String.header_contacts} />
      <View style={styles.mainView}>
        <FlatList
          data={dataContacts?.phones || []}
          style={styles.wrapContainer}
          contentContainerStyle={
            !dataContacts?.phones?.length && styles.wrapContainer
          }
          renderItem={renderItem}
          keyExtractor={item => item.key}
          ListEmptyComponent={
            <View style={styles.containerEmpty}>
              <Image
                source={Images.icEmptyContact}
                style={styles.emptyContact}
                resizeMode="contain"
              />
              <Text style={styles.txtEmpty} children={String.empty_contact} />
            </View>
          }
        />
        <View style={styles.containerViewBottom}>
          <Text style={styles.txtBlockContact}>Chặn số từ người lạ</Text>
          <View style={styles.containerSwitch}>
            <Switch
              trackColor={{false: Colors.blueTitle, true: '#81b0ff'}}
              // thumbColor={isBlocking ? "#f5dd4b" : "#f4f3f4"}
              ios_backgroundColor="#3e3e3e"
              onValueChange={toggleSwitch}
              value={dataContacts?.blockUnknown}
            />
          </View>
        </View>
        <TouchableOpacity style={styles.containerAdd} onPress={pressAddNew}>
          <Text style={styles.txtAdd}>Thêm số mới</Text>
        </TouchableOpacity>
      </View>

      <LoadingIndicator ref={refLoading} />
    </View>
  );
};
