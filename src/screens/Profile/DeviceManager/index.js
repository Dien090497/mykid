import {
  FlatList,
  Image, Modal, RefreshControl,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useLayoutEffect, useRef, useState } from 'react';

import Consts, {ScaleHeight} from '../../../functions/Consts';
import DataLocal from '../../../data/dataLocal';
import Header from '../../../components/Header';
import Images from '../../../assets/Images';
import LoadingIndicator from '../../../components/LoadingIndicator';
import {deleteDevicesApi, getListDeviceApi} from '../../../network/DeviceService';
import {styles} from './styles';
import {Colors} from '../../../assets/colors/Colors';
import reduxStore from '../../../redux/config/redux'
import commonInfoAction from '../../../redux/actions/commonInfoAction';
import { useTranslation } from 'react-i18next';

export default function DeviceManager({navigation}) {
  const [selectedIndex, setSelectedIndex] = useState(DataLocal.deviceIndex);
  const [checkDelete, setCheckDelete] = useState(false);
  const [devices, setDevices] = useState([])
  const [onModal, setOnModal] = useState(false);
  const [idCancel, setIdCancel] = useState();
  const [loading, setLoading] = useState(false);
  const [nameDevices, setNameDevices] = useState();
  const refLoading = useRef();
  const { t } = useTranslation();

  const dataMock = [
    {
      name: t('common:dad'),
      icon: Images.icFather,
      relationship: 'FATHER'
    },
    {
      name: t('common:mom'),
      icon: Images.icMother,
      relationship: 'MOTHER'
    },
    {
      name: t('common:grandfather'),
      icon: Images.icGrandfather,
      relationship: 'GRANDFATHER'
    },
    {
      name: t('common:grandma'),
      icon: Images.icGrandmother,
      relationship: 'GRANDMOTHER'
    },
    {
      name: t('common:brother'),
      icon: Images.icBrother,
      relationship: 'BROTHER'
    },
    {
      name: t('common:sister'),
      icon: Images.icSister,
      relationship: 'SISTER'
    },
    {
      name: t('common:other'),
      icon: Images.icOther,
      relationship: 'OTHER'
    },
  ];

  useLayoutEffect(() => {
    getListDevice();
    setCheckDelete(true)
  }, []);

  const refesh = React.useCallback(async () => {
    getListDevice();
  }, []);

  const getListDevice = async () => {
    getListDeviceApi(DataLocal.userInfo.id, Consts.pageDefault, 100, '', 'ACTIVE', {
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
    reduxStore.store.dispatch(commonInfoAction.selectDevice(index));
    await DataLocal.saveDeviceIndex(index);
    await DataLocal.saveDeviceId(devices[index].deviceId);
  };

  const checkDeleteDevices = () => {
    setCheckDelete(!checkDelete);
  }

  const showModal = (item) => {
    setOnModal(true);
    setIdCancel(item.deviceId);
    setNameDevices(item.deviceName)
  }

  const deleteDevices = idCancel => {
    setOnModal(false);
    deleteDevicesApi(idCancel, {
      success: res => {
        getListDevice();
        console.log('deleteDevices ', res)
      },
      refLoading
    });
  }

  const editDevice = (item)=>{
    navigation.navigate(Consts.ScreenIds.EditDevice, {data: item ,onRefresh: getListDevice})
  }

  const renderItem  = ({item, index}) => {
    console.log(item)
    const relationship = dataMock.filter(val => val.relationship === item.relationship);
    const icon = relationship.length > 0 ? relationship[0].icon : dataMock[6].icon;
    relationship[0].name ? item.relationshipName = relationship[0].name: null;
    item.icon = icon;
    if (checkDelete) {
      return (
        <View style={styles.rowSettings}>
          <TouchableOpacity style={{flexDirection: 'row'}} onPress={()=>{editDevice(item)}}>
            <View style={{width:40,height:40,borderRadius:20}}>
              <Image source={item.avatar ? {uri:item.avatar} : item.icon} resizeMode={item.avatar? 'cover' : 'stretch'} style={styles.iconSetting}/>
            </View>
            <View style={{flexDirection: 'column', justifyContent: 'center'}}>
              <Text style={styles.textSettings}>{item.deviceName}</Text>
              <Text style={[styles.textSettings, {color: Colors.grayTextTitleColor, fontSize: 12}]}>{item.deviceCode}</Text>
            </View>
          </TouchableOpacity>
          {selectedIndex !== index ?
            <TouchableOpacity onPress={() => {handleChange(index)}} style={styles.btnChange}>
              <Text style={styles.textCheck}>{t('common:change')}</Text>
            </TouchableOpacity>
            :
            <View style={styles.viewCurrent}>
              <Image source={Images.icChoose} style={{width: 12, height: 16}}/>
            </View>
          }
        </View>
      );
    }
    else {
      return (
        <View style={styles.rowSettings}>
          <Image source={icon} resizeMode={'contain'} style={styles.iconSetting}/>
          <View style={{flexDirection: 'column', justifyContent: 'center'}}>
            <Text style={styles.textSettings}>{item.deviceName}</Text>
            <Text style={[styles.textSettings, {color: Colors.grayTextTitleColor, fontSize: 12}]}>{item.deviceCode}</Text>
          </View>
             <TouchableOpacity  style={styles.btnDelete} onPress={ () => showModal(item)}>
               <Text style={[styles.textChange, {color: Colors.redTitle}]}>Xóa</Text>
             </TouchableOpacity>
        </View>
      );
    }
  }

  return (
    <View style={styles.contain}>
      {checkDelete ? (
        <Header title={t('common:header_deviceManager')} right rightIcon={Images.icDelete} rightAction={checkDeleteDevices}/>
      ):(
        <Header title={t('common:header_deviceManager')} right rightIcon={Images.icConfirms} rightAction={checkDeleteDevices}/>
      )}
      <View style={styles.container}>
        <TouchableOpacity style={styles.rowPlus} onPress={handleAddDevice}>
          <Text style={styles.textPlus}>{'+ '}{t('common:header_addDevice')}</Text>
        </TouchableOpacity>

        <FlatList
          data={devices}
          renderItem={renderItem}
          keyExtractor={(_, index) => index.toString()}
          refreshControl={
            <RefreshControl
              refreshing={loading}
              onRefresh={refesh}
            />
          }
        />
      </View>
      <Modal
        visible={onModal}
        transparent={true}
        animationType={'none'}
      >
        <View style={styles.itemLeft}>
          <TouchableOpacity style={styles.modal} onPress={() => setOnModal(false)}>
            <View style={styles.tobModal}>
              <View style={[styles.tobView, {marginTop: ScaleHeight.small}]}>
                <Text style={styles.textModel}>{t('common:arleftDeleteDevices1')}{nameDevices}{t('common:arleftDeleteDevices2')}</Text>
              </View>
              <View style={[styles.tobView, {width: '86%'}]}>
                <View style={styles.tob}>
                  <TouchableOpacity
                    style={[styles.smallButton, {backgroundColor: Colors.white}]}
                    onPress={() => setOnModal(false)}
                  >
                    <Text
                      style={[styles.smallButtonText, {color: Colors.red}]}>
                      {t('common:cancel')}
                    </Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.TobOpacity}>
                  <TouchableOpacity
                    style={[styles.smallButton, {backgroundColor: Colors.red}]}
                    onPress={ () => deleteDevices(idCancel)}
                  >
                    <Text
                      style={[styles.smallButtonText, {color: Colors.white}]}>
                      {t('common:confirm')}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        </View>
      </Modal>
      <LoadingIndicator ref={refLoading} />
    </View>
  );
}
