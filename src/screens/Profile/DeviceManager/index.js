import {
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useLayoutEffect, useRef, useState } from 'react';

import Consts from '../../../functions/Consts';
import DataLocal from '../../../data/dataLocal';
import Header from '../../../components/Header';
import Images from '../../../assets/Images';
import LoadingIndicator from '../../../components/LoadingIndicator';
import {String} from '../../../assets/strings/String';
import { getListDeviceApi } from '../../../network/DeviceService';
import {styles} from './styles';

export default function DeviceManager({navigation}) {
  const [selectedIndex, setSelectedIndex] = useState(DataLocal.deviceIndex);
  const [devices, setDevices] = useState([]);
  const refLoading = useRef();

  const dataMock = [
    {
      id: 1,
      name: 'Bố',
      icon: Images.icFather,
      relationship: 'FATHER'
    },
    {
      id: 2,
      name: 'Mẹ',
      icon: Images.icMother,
      relationship: 'MOTHER'
    },
    {
      id: 3,
      name: 'Ông',
      icon: Images.icGrandfather,
      relationship: 'GRANDFATHER'
    },
    {
      id: 4,
      name: 'Bà',
      icon: Images.icGrandmother,
      relationship: 'GRANDMOTHER'
    },
    {
      id: 5,
      name: 'Anh',
      icon: Images.icBrother,
      relationship: 'BROTHER'
    },
    {
      id: 6,
      name: 'Chị',
      icon: Images.icSister,
      relationship: 'SISTER'
    },
    {
      id: 7,
      name: 'Khác',
      icon: Images.icOther,
      relationship: 'OTHER'
    },
  ];

  useLayoutEffect(() => {
    getListDevice();
  }, []);

  const getListDevice = async () => {
    getListDeviceApi(DataLocal.userInfo.id, Consts.pageDefault, 100, '', {
      success: resData => {
        setDevices(resData.data);
      },
      refLoading,
    });
  };
  const handleAddDevice = () => {
    navigation.navigate(Consts.ScreenIds.AddDeviceScreen, {onRefresh: getListDevice})
  };

  const handleChange = async (index) => {
    setSelectedIndex(index);
    await DataLocal.saveDeviceIndex(index);
    await DataLocal.saveDeviceId(devices[index].deviceId);
  };

  const renderItem  = ({item, index}) => {
    const relationship = dataMock.filter(val => val.relationship === item.relationship);
    const icon = relationship.length > 0 ? relationship[0].icon : dataMock[6].icon;
    return (
      <View style={styles.rowSettings}>
        <Image source={icon} resizeMode={'contain'} style={styles.iconSetting}/>
        <Text style={styles.textSettings}>{item.deviceName}</Text>
        {selectedIndex !== index ?
        <TouchableOpacity onPress={() => {handleChange(index)}} style={styles.btnChange}>
          <Text style={styles.textChange}>{String.change}</Text>
        </TouchableOpacity>
        :
        <View style={styles.viewCurrent}>
          <Text style={styles.textCheck}>{'✔️'}</Text>
        </View>
        }
      </View>
    );
  }

  return (
    <View style={styles.contain}>
      <Header title={String.header_deviceManager} />
      <View style={styles.container}>
        <TouchableOpacity style={styles.rowPlus} onPress={handleAddDevice}>
          <Text style={styles.txtPlus}>+</Text>
          <Text style={styles.textPlus}>{String.header_addDevice}</Text>
        </TouchableOpacity>

        <FlatList
          data={devices}
          renderItem={renderItem}
          keyExtractor={(_, index) => index.toString()}
        />
      </View>
      <LoadingIndicator ref={refLoading} />
    </View>
  );
}
