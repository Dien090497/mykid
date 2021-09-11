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
import {hideLoading, showLoading} from '../../../functions/utils';

import {Colors} from '../../../assets/colors/Colors';
import CustomIcon from '../../../components/VectorIcons';
import Header from '../../../components/Header';
import LoadingIndicator from '../../../components/LoadingIndicator';
import {String} from '../../../assets/strings/String';
import {styles} from './styles';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

export default ({navigation, route}) => {
  const refLoading = useRef();
  const [isBlocking, setIsBlocking] = useState(false);
  const [dataContacts, setDataContacts] = useState([
    {
      key: 'Dad',
      name: 'Bố',
      phone: '012335236',
      selected: true,
    },
    {
      key: 'Mom',
      name: 'Mẹ',
      phone: '01233523',
      selected: false,
    },
  ]);

  const changeSOS = item => {
    //call API changeSOS
    showLoading(refLoading);
    dataContacts.map(contact => {
      if (contact.key == item.key) {
        contact.selected = true;
      } else {
        contact.selected = false;
      }
    });
    setDataContacts([...dataContacts]);

    //demo show loading when change default sos
    setTimeout(() => {
      hideLoading(refLoading);
    }, 300);
  };

  const removeContact = item => {
    //call remove Contact
  };
  const renderItem = ({item}) => {
    return (
      <TouchableOpacity
        activeOpacity={0.9}
        style={{
          backgroundColor: Colors.grayInput,
          borderRadius: 10,
          marginVertical: 2,
          padding: 15,
          marginHorizontal: 10,
        }}
        key={item.key}
        onPress={item.onPress}>
        <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
          <View
            style={{flex: 0.2, justifyContent: 'center', alignItems: 'center'}}>
            <Text style={{fontSize: FontSize.xtraSmall, color: 'red'}}>
              SOS
            </Text>
            <TouchableOpacity
              style={{
                borderWidth: 1,
                borderColor: Colors.gray,
                width: FontSize.medium,
                height: FontSize.medium,
                borderRadius: FontSize.medium / 2,
                justifyContent: 'center',
                alignItems: 'center',
              }}
              onPress={() => changeSOS(item)}>
              {item.selected && (
                <View
                  style={{
                    backgroundColor: 'red',
                    width: FontSize.small,
                    height: FontSize.small,
                    borderRadius: FontSize.small / 2,
                  }}></View>
              )}
            </TouchableOpacity>
          </View>
          <View style={{flex: 0.8}}>
            <Text style={styles.titleText}>{item.name}</Text>
            <Text style={styles.phoneText}>{item.phone}</Text>
          </View>
          <TouchableOpacity
            style={{
              borderWidth: 1,
              paddingHorizontal: 20,
              paddingVertical: 5,
              borderRadius: 20,
              borderColor: Colors.grayColorKeyBoard,
              backgroundColor: Colors.grayBackground,
            }}
            onPress={() => removeContact(item)}>
            <Text style={{fontSize: FontSize.small, color: 'red'}}>Xoá</Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    );
  };
  const pressAddNew = () => {
    navigation.navigate(Consts.ScreenIds.AddNewContact);
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
          data={dataContacts}
          renderItem={renderItem}
          keyExtractor={item => item.key}
        />
        <View
          style={{
            padding: 10,
            flexDirection: 'row',
            width: '90%',
            alignSelf: 'center',
            borderRadius: 10,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text
            style={{flex: 0.8, textAlign: 'left', fontSize: FontSize.small}}>
            Chặn số từ người lạ
          </Text>
          <View
            style={{flex: 0.2, alignItems: 'center', justifyContent: 'center'}}>
            <Switch
              trackColor={{false: Colors.blueTitle, true: '#81b0ff'}}
              // thumbColor={isBlocking ? "#f5dd4b" : "#f4f3f4"}
              ios_backgroundColor="#3e3e3e"
              onValueChange={toggleSwitch}
              value={isBlocking}
            />
          </View>
        </View>
        <TouchableOpacity
          style={{
            backgroundColor: '#2fc886',
            width: '90%',
            alignSelf: 'center',
            borderRadius: 10,
            justifyContent: 'center',
            alignItems: 'center',
            paddingVertical: 15,
          }}
          onPress={pressAddNew}>
          <Text style={{color: 'white', fontSize: FontSize.medium}}>
            Thêm số mới
          </Text>
        </TouchableOpacity>
      </View>

      <LoadingIndicator ref={refLoading} />
    </View>
  );
};
