import React, { useLayoutEffect, useRef, useState } from 'react';
import {
  FlatList,
  Modal, RefreshControl,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {styles} from './styles';
import Header from '../../components/Header';
import LoadingIndicator from '../../components/LoadingIndicator';
import { Image } from 'react-native';
import Images from '../../assets/Images';
import Consts, {ScaleHeight} from '../../functions/Consts';
import { useTranslation } from 'react-i18next';
import DataLocal from '../../data/dataLocal';
import NotificationModal from '../../components/NotificationModal';
import { getListDeviceApi, getFriendsList, deleteFriend } from '../../network/DeviceService';
import {Colors} from "../../assets/colors/Colors";
import ModalConfirm from "../../components/ModalConfirm";

export default function FriendsList({navigation}) {
  const refLoading = useRef();
  const refNotification = useRef();
  const refModalConfirm = useRef();
  const [showModal, setShowModal] = useState(false);
  const [devices, setDevices] = useState([]);
  const [friendsList, setFriendsList] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(DataLocal.deviceIndex);
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation();
  const [room, setRoom] = useState();

  useLayoutEffect(() => {
    getListDevice();
  }, []);

  useLayoutEffect(() => {
    if (devices && devices.length > 0) {
      friendsListItem();
    }
  }, [devices, selectedIndex]);

  const loadMore = React.useCallback(async () => {
    setLoading(true);
    getListDevice();
    setLoading(false);
  }, []);

  const handleChange = async (index) => {
    setSelectedIndex(index);
    setShowModal(false);
    friendsListItem();
  };
  const friendsListItem = () => {
    getFriendsList(devices[selectedIndex].deviceId, {
      success: res => {
        setFriendsList(res.data)
      }
    });
  }

  const getListDevice = () => {
    getListDeviceApi(DataLocal.userInfo.id, 0, 100, '', 'ACTIVE', {
      success: res => {
        setDevices(res.data);
      },
      refLoading,
      refNotification,
    });
  };

  const gotoHomeScreen = () => {
    if (DataLocal.haveSim === '0') {
      navigation.navigate(Consts.ScreenIds.Tabs);
    }
  }

  const renderItemModal = ({item, index}) => {
    return (
      <TouchableOpacity
        activeOpacity={0.9}
        style={selectedIndex === index ? [styles.containerItemContact, {backgroundColor: Colors.grayButton}] : styles.containerItemContact}
        key={item.name}
        onPress={() => handleChange(index)}
      >
        <View style={styles.wrap}>
          <View style={{justifyContent: 'center', alignItems: 'center', width: '20%'}}>
            <Image source={item.avatar ? {uri: item.avatar} : Images.icOther} style={{width: ScaleHeight.medium , height: ScaleHeight.medium, borderRadius:  ScaleHeight.medium / 2}} resizeMode = {'cover'}/>
          </View>
          <View style={{width: '80%', paddingHorizontal: 10}}>
            <Text style={selectedIndex === index ? [styles.textModalShow, {color: Colors.gray}] : styles.textModalShow }>
              {item.deviceName}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const onModal = item => {
    setRoom(item.item.roomId)
    refModalConfirm.current.open(t('common:alertDelete'), () => {console.log('')});
  }

  const deleteFriendItem = () => {
    deleteFriend(devices[selectedIndex].deviceId, room, {
      success: res => {
        refNotification.current.open(t('common:success'));
      }
    })
  }

  const renderFriendsList = (item) => {
    return(
      <View style={styles.itemContainer}>
          <View style={styles.containerView}>
            <View style={styles.imageView}>
              <Image style={styles.avatarItem} source={item.item.avatar ? {uri: item.item.avatar} : Images.icAvatar } />
            </View>
            <View style={styles.info}>
              <View style={styles.textView}>
                <Text style={styles.otherInfoText}>{'Device code: '}{item.item.deviceCode}</Text>
              </View>
              <Text
                style={styles.otherInfoText}
                children={`${t('common:contact')}: ${ item.item.phone && item.item.phone.startsWith('+84') ? '0' + item.item.phone.substring(3) : ''}`}
              />
            </View>
            <View style={styles.rowItem2}>
              <TouchableOpacity
                onPress={ () => onModal(item)}>
                <Image
                  style={styles.iconCancel}
                  source={Images.icCancelMember}
                />
              </TouchableOpacity>
            </View>
          </View>
      </View>
    );
  }

  return (
    <View style={styles.contain}>
      <Header title={t('common:header_friend')} />
      <View style={styles.modal}>
        <TouchableOpacity style={styles.modalSelect}>
          <View style={{alignItems: 'center', justifyContent: 'center', width: '10%'}}>
            <Image source={Images.icShow} style={styles.iconShowModal} resizeMode='contain'/>
          </View>
          <View onStartShouldSetResponder={() => {
            setShowModal(true)
          }}
          >
            <Text style={styles.textModalShow}>{devices && devices[selectedIndex] && devices[selectedIndex].deviceName}</Text>
          </View>
          <View>
            <Image
              source={devices && devices[selectedIndex] && devices[selectedIndex].avatar ? {uri: devices[selectedIndex].avatar} : Images.icOther}
              style={styles.avatar} resizeMode='cover'/>
          </View>
        </TouchableOpacity>
      </View>
      <View style={styles.contain}>
        <FlatList
          data={friendsList}
          renderItem={renderFriendsList}
          keyExtractor={item => item.deviceCode}
          refreshControl={
            <RefreshControl
              refreshing={loading}
              onRefresh={loadMore}
            />
          }
        />
      </View>
      <Modal
        visible={showModal}
        transparent={true}
        animationType={'none'}>
        <TouchableOpacity
          style={styles.tobModal}
          onPress={() => setShowModal(false)}>
          <View style={styles.viewModal}>
            <View style={{ alignItems: 'center' }}>
              <Text style={styles.textItem}>{t('common:listDevice')}</Text>
            </View>
            <FlatList
              data={devices}
              style={[styles.wrapContainer, {backgroundColor: 'white', width: '100%', marginBottom: '5%'}]}
              renderItem={renderItemModal}
              keyExtractor={item => item.name}
            />
          </View>
        </TouchableOpacity>
      </Modal>
      <ModalConfirm
        ref={refModalConfirm}
        onPressYes={deleteFriendItem}
      />
      <LoadingIndicator ref={refLoading} />
      <NotificationModal ref={refNotification} goBack={gotoHomeScreen}/>
    </View>
  );
}
