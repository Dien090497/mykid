import React, { useLayoutEffect, useRef, useState} from 'react';
import {
  Text,
  TouchableOpacity,
  View,
  FlatList,
  RefreshControl,
  Image, Modal
} from 'react-native'
import Header from '../../../components/Header';
import {getListDeviceApi} from '../../../network/DeviceService';
import Images from '../../../assets/Images';
import {Colors} from '../../../assets/colors/Colors';
import LoadingIndicator from '../../../components/LoadingIndicator';
import Consts, {ScaleHeight} from '../../../functions/Consts';
import {styles} from './styles';
import { useTranslation } from 'react-i18next';
import NotificationModal from "../../../components/NotificationModal";
import XmppClient from '../../../network/xmpp/XmppClient';
import { deleteHistoryApi } from '../../../network/ChatService';

export default function DeleteMessage({navigation, route}) {
  const refLoading = useRef();
  const refNotification = useRef();
  const [listMember, setListMember] = useState([]);
  const [loading, setLoading] = useState(false);
  const [onModal, setOnModal] = useState(false);
  const [roomInfo, setRoomInfo] = useState(route.params.roomInfo);
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
    {
      name: t('common:delete'),
      icon: Images.icDeleteMessage,
      relationship: 'DELETE'
    },
  ];

  useLayoutEffect(() => {
    setRoomInfo(route.params.roomInfo);
  }, []);

  useLayoutEffect(() => {
    getListDevice();
  }, [roomInfo]);

  const refesh = React.useCallback(async () => {
    setLoading(true);
    getListDevice();
    setLoading(false);
  }, []);

  const getListDevice = () => {
    getListDeviceApi(null, 0, 100, roomInfo.deviceId, 'ACTIVE', {
      success: res => {
        setListMember(res.data);
      },
      failure: error => {
      },
      refLoading: refLoading,
      refNotification: refNotification
    });
  };

  const deleteHistory = () => {
    deleteHistoryApi(roomInfo.id, {
      success: res => {
      },
      failure: error => {
      },
      refLoading: refLoading,
      refNotification: refNotification
    });
  };

  const refeshDelete = () => {
    getListDevice();
  }

  const gotoMember = () => {
    navigation.navigate(Consts.ScreenIds.Members, {Delete: refeshDelete});
  }

  const onDeleteHistory = () => {
    deleteHistory();
    XmppClient.cleanCurrentHistory();
    navigation.navigate(Consts.ScreenIds.Chat);
  }

  const renderFlatlist = (itemFlatlist) => {
    const relationship = dataMock.filter(val => val.relationship === itemFlatlist.item.relationship);
    const icon = relationship.length > 0 ? relationship[0].icon :
      (itemFlatlist.item.relationship === 'OTHER' ? dataMock[6].icon : dataMock[7].icon);
    for (let i = 0; i < dataMock.length; i++) {
      if (itemFlatlist.item.relationship === dataMock[i].relationship && itemFlatlist.item.relationship !== 'OTHER') {
        itemFlatlist.item.relationshipName = dataMock[i].name;
      }
    }
    return (
      <View style={styles.itemView}>
        <View>
          {itemFlatlist.item.relationship !== 'DELETE' ?
            (
              <View style={{alignItems: 'center'}}>
                <Image style={styles.icon} source={icon} resizeMode={'stretch'}/>
                <Text style={styles.textItem}>{itemFlatlist.item.relationshipName}</Text>
              </View>
            ) : (
              <TouchableOpacity style={{alignItems: 'center'}} onPress={gotoMember}>
                <Image style={styles.icon} source={icon} resizeMode={'stretch'}/>
                <Text style={styles.textItem}>{itemFlatlist.item.relationshipName}</Text>
              </TouchableOpacity>
            )}
        </View>
      </View>
    );
  };

  return (
    <View style={styles.containerView}>
      <Header title={`${t('common:familyGroupInformation')} (${roomInfo ? roomInfo.deviceName : ''})`}/>
      <View style={styles.flatListContainer}>
        <FlatList
          data={[...listMember, {relationship: 'DELETE'}]}
          keyExtractor={item => item.id}
          renderItem={renderFlatlist}
          style={styles.flatlistView}
          numColumns={4}
          refreshControl={
            <RefreshControl
              refreshing={loading}
              onRefresh={refesh}
            />
          }
        />
      </View>
      <TouchableOpacity
        style={styles.tobDelete}
        onPress={() => setOnModal(true)}
      >
        <Text style={styles.textDelete}>{t('common:deleteMessage')}</Text>
      </TouchableOpacity>
      <Modal
        visible={onModal}
        transparent={true}
        animationType={'none'}
      >
        <View style={styles.itemLeft}>
          <TouchableOpacity style={styles.modal} onPress={() => setOnModal(false)}>
            <View style={styles.tobModal}>
              <View style={[styles.tobView, {marginTop: ScaleHeight.small}]}>
                <Text style={styles.textModel}>{t('common:arleftDeleteMessage')}</Text>
              </View>
              <View style={[styles.tobView, {width: '86%'}]}>
                <View style={styles.tob}>
                  <TouchableOpacity
                    style={[styles.smallButton, {backgroundColor: Colors.white}]}
                    onPress={() => {
                      setOnModal(false);
                    }}
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
                    onPress={() => {
                      onDeleteHistory();
                    }}
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
      <LoadingIndicator ref={refLoading}/>
      <NotificationModal ref={refNotification}/>
    </View>
  );
}
