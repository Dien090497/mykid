import {Image, ScrollView, Text, TouchableOpacity, View} from 'react-native';
import React, {useLayoutEffect, useRef, useState} from 'react';

import Button from '../../../components/buttonGradient';
import {Colors} from '../../../assets/colors/Colors';
import Consts from '../../../functions/Consts';
import CustomInput from '../../../components/CustomInput';
import Header from '../../../components/Header';
import Images from '../../../assets/Images';
import LoadingIndicator from '../../../components/LoadingIndicator';
import {String} from '../../../assets/strings/String';
import {addDeviceApi} from '../../../network/DeviceService';
import styles from "./style";
import { showAlert } from '../../../functions/utils';

const AddDeviceScreen = ({navigation, route}) => {
  const [deviceCode, setDeviceCode] = useState('');
  const [deviceName, setDeviceName] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [submitActive, setSubmitActive] = useState(false);
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
      id: 4,
      name: 'Ông',
      icon: Images.icGrandfather,
      relationship: 'GRANDFATHER'
    },
    {
      id: 5,
      name: 'Bà',
      icon: Images.icGrandmother,
      relationship: 'GRANDMOTHER'
    },
    {
      id: 6,
      name: 'Anh',
      icon: Images.icBrother,
      relationship: 'BROTHER'
    },
    {
      id: 7,
      name: 'Chị',
      icon: Images.icSister,
      relationship: 'SISTER'
    },
    {
      id: 8,
      name: 'Khác',
      icon: Images.icOther,
      relationship: 'OTHER'
    },
  ];

  useLayoutEffect(() => {
    setSubmitActive(deviceCode && deviceName);
  }, [deviceCode, deviceName]);

  useLayoutEffect(() => {
    if (route.params && route.params.isShowAlert) {
      showAlert(String.addDeviceSuccess2);
    }
  }, []);

  const onQR = (qr) => {
    setDeviceCode(qr);
    console.log(qr);
  };

  const onPlaceChosen = (index) => {
    setSelectedIndex(index);
  };
  const onRelationship = () => {
    navigation.navigate(Consts.ScreenIds.Relationship, {
      selectedIndex: selectedIndex,
      data: dataMock,
      onChooseed: onPlaceChosen
    });
  };
  const addDevice = () => {
    if (!submitActive) return;
    addDeviceApi(deviceCode, deviceName, dataMock[selectedIndex].icon, dataMock[selectedIndex].relationship, {
      success: resp => {
        if (resp.data) {
          if (resp.data.status === 'PENDING') {
            showAlert(String.addDeviceSuccess2, {
              close: () => {
                setDeviceCode('');
                setDeviceName('');
                setSelectedIndex(0);
              },
            });
          } else if (resp.data.status === 'ACTIVE') {
            showAlert(String.addDeviceSuccess, {
              close: () => {
                if (route.params && route.params.onRefresh) {
                  route.params.onRefresh();
                  navigation.goBack();
                } else {
                  navigation.navigate(Consts.ScreenIds.Tabs);
                }
              },
            });
          }
        }
        
      },
      failure: error => {
      },
      refLoading,
    }).then();
  };
  
  return (
    <View style={styles.contain}>
      <Header title={String.header_addDevice} />
      <ScrollView style={{paddingHorizontal: 10}}>
        <View style={styles.viewImage}>
          <Image style={styles.Sty_Images} source={Images.icSmartwatch} />
        </View>

        <CustomInput
          placeholder={String.enterOrScanCode}
          value={deviceCode}
          onPress={() => navigation.navigate(Consts.ScreenIds.QRCodeScreen, {onQR: onQR})}
          onChangeText={code => setDeviceCode(code)}
          icon={Images.icSmartwatch}
        />
        <View style={styles.Sty_information}>
          <Text style={styles.txtInformation}>{String.genneralInfo}</Text>
          <CustomInput
            placeholder={String.deviceNickname}
            value={deviceName}
            onChangeText={name => setDeviceName(name)}
            icon={Images.icUser2}
          />
        </View>
        <TouchableOpacity
          onPress={() => onRelationship()}
          style={styles.Sty_select}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Image style={styles.Sty_iconUser} source={dataMock[selectedIndex].icon} />
            <Text style={styles.txtRelationship}>
              {String.iAm}
              <Text
                style={{color: '#000000', fontSize: 16, fontWeight: 'bold'}}>
                {dataMock[selectedIndex].name}
              </Text>{String.ofHe}
            </Text>
          </View>
          <Image
            style={[{...styles.Sty_icon, right: 0}]}
            source={Images.icon_arrow_up}
          />
        </TouchableOpacity>

        <View style={styles.viewButton}>
          <Button
            activeOpacity={submitActive ? 0 : 1}
            onclick={addDevice}
            title={String.ok}
            color={
              submitActive ? Colors.GradientColor : Colors.GradientColorGray
            }
          />
        </View>
      </ScrollView>
      <LoadingIndicator ref={refLoading} />
    </View>
  );
};
export default AddDeviceScreen;
