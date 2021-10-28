import Consts from '../../../functions/Consts';
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
  setBlockUnknownApi,
  setSOSApi,
} from '../../../network/ContactService';
import {showAlert, showConfirmation} from '../../../functions/utils';
import {Colors} from '../../../assets/colors/Colors';
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
        if (res.data) {
          setDataContacts(res.data);
          setIsBlocking(!!res.data.blockUnknown);
        }
      },
      refLoading: refLoading,
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
    if (item.sosNumber) {
      showAlert(String.message_remove_contact_sos);
      return;
    }

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
        key={item.name}
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
          <TouchableOpacity
            style={styles.containerRemove}
            onPress={() => removeContact(item)}>
            <Text style={styles.txtRemove}>{String.delete}</Text>
          </TouchableOpacity>
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
    setBlockUnknownApi(DataLocal.deviceId, !isBlocking, {
      success: res => {
        setIsBlocking(!isBlocking);
      },
      refLoading: refLoading,
    });
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
          keyExtractor={item => item.name}
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
          <Text style={styles.txtBlockContact}>{String.blockOther}</Text>
          <View style={styles.containerSwitch}>
            <Switch
              trackColor={{false: Colors.gray, true: '#81b0ff'}}
              ios_backgroundColor="#3e3e3e"
              onValueChange={toggleSwitch}
              value={isBlocking}
            />
          </View>
        </View>
        <TouchableOpacity style={styles.containerAdd} onPress={pressAddNew}>
          <Text style={styles.txtAdd}>{String.addPhone}</Text>
        </TouchableOpacity>
      </View>

      <LoadingIndicator ref={refLoading} />
    </View>
  );
};
