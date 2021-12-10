import Consts from '../../../functions/Consts';
import {
  FlatList,
  Image,
  Switch,
  Text,
  TouchableOpacity,
  View,
  Modal
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {
  deletePhoneBookApi,
  getListContactPhoneApi,
  setBlockUnknownApi,
  setSOSApi,
} from '../../../network/ContactService';
import {Colors} from '../../../assets/colors/Colors';
import DataLocal from '../../../data/dataLocal';
import Header from '../../../components/Header';
import Images from '../../../assets/Images';
import LoadingIndicator from '../../../components/LoadingIndicator';
import {styles} from './styles';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next';
import NotificationModal from '../../../components/NotificationModal';
import ModalConfirm from '../../../components/ModalConfirm';
import SimpleToast from 'react-native-simple-toast';

export default ({navigation, route}) => {
  const refLoading = useRef();
  const refNotification = useRef();
  const refConfirm = useRef();
  const [isBlocking, setIsBlocking] = useState(false);
  const [dataContacts, setDataContacts] = useState(null);
  const [onModel, setOnModel] = useState(false);
  const [listSOS, setListSOS] = useState([])
  const [indexSOS, setIndexSOS] = useState(null)
  const { t } = useTranslation();

  useEffect(() => {
    getListContactPhoneApi(DataLocal.deviceId, {
      success: res => {
        refreshData(res.data)
      },
      refLoading: refLoading,
      refNotification: refNotification,
    });
  }, []);

  const refreshData = (data) => {
    if (data) {
      const sos = [{},{},{}];
      data.phones.map(obj=>{
        obj.choose = false;
        if (!!obj.sosIndex){
          sos[obj.sosIndex-1] = obj
        }
      })
      setDataContacts(data);
      setListSOS(sos);
      setIsBlocking(!!data.blockUnknown);
    }
  }

  const changeSOS = (item, index) => {
    const newListConcat = Object.assign({},dataContacts);
    newListConcat.phones[index].choose = true;
    setDataContacts(newListConcat);
    setSOSApi(
      DataLocal.deviceId,
      {
        index: indexSOS + 1,
        phoneNumber: item.phoneNumber,
      },
      {
        success: res => {
          refreshData(res.data)
        },
        refLoading: refLoading,
        refNotification: refNotification,
      },
    ).then(r => setOnModel(false));
  };

  const removeContact = item => {
    if (item.sosIndex) {
      refNotification.current.open(t('common:message_remove_contact_sos'))
      return;
    }
    refConfirm.current.open(t('common:removeContactConfirm'),() => {
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
          refNotification: refNotification,
        },
      );
    });
  };

  const pressAddNew = () => {
    navigation.navigate(Consts.ScreenIds.AddNewContact, {
      onGoBack: data => refreshData(data),
    });
  };

  const toggleSwitch = () => {
    setBlockUnknownApi(DataLocal.deviceId, !isBlocking, {
      success: res => {
        setIsBlocking(!isBlocking);
      },
      refLoading: refLoading,
      refNotification: refNotification,
    });
  };

  const addSOS = (index) => {
    if (listSOS[index].sosIndex) return;
    setIndexSOS(index)
    setOnModel(true);
  }

  const removeSOS = (index) => {
    if (!listSOS[index].sosIndex) return ;
    const newListSOS = Object.assign([],listSOS);
    const listCheck = newListSOS.filter(value => value.sosIndex)
    if (listCheck.length <= 1 ) return refNotification.current.open(t('common:canNotDeleteSOS'));
    setSOSApi(
      DataLocal.deviceId,
      {
        phoneNumber: listSOS[index].phoneNumber,
      },
      {
        success: res => {
          refreshData(res.data)
          SimpleToast.show(t('common:success'))
        },
        refLoading: refLoading,
        refNotification: refNotification,
      },
    );
  }

  const renderItem = ({item}) => {
    return (
      <TouchableOpacity
        activeOpacity={0.9}
        style={styles.containerItemContact}
        key={item.name}
        onPress={item.onPress}>
        <View style={styles.wrap}>
          <View>
            <Image source={item.url ? {uri: item.url}: Images.icOther} style={{width:40 , height: 40, borderRadius: 2000}} resizeMode = {'cover'}/>
          </View>
          <View style={{flex: 1, paddingHorizontal: 10}}>
            <Text style={styles.titleText}>{item.name}</Text>
            <Text style={styles.phoneText}>{item.phoneNumber}</Text>
          </View>
          <TouchableOpacity
            style={[styles.containerRemove, {width: '15%', justifyContent: 'center', alignItems: 'center'}]}
            onPress={() => removeContact(item)}>
            <Image source={Images.icDelete} style={styles.icon1} resizeMode={'stretch'}/>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    );
  };

  const renderItemModal = ({item, index}) => {
    return (
      !item.sosIndex ?
        <TouchableOpacity
          activeOpacity={0.9}
          style={styles.containerItemContact}
          key={item.name}
          onPress={() => changeSOS(item,index)}>
          <View style={styles.wrap}>
            <View>
              <Image source={Images.icOther} style={{width:40 , height: 40}} resizeMode = {'stretch'}/>
            </View>
            <View style={{width: '80%', paddingHorizontal: 10}}>
              <Text style={styles.titleText}>{item.name}</Text>
              <Text style={styles.phoneText}>{item.phoneNumber}</Text>
            </View>
            <View
              style={{justifyContent: 'center', alignItems: 'center', width: '10%'}}>
              <Image source={item.choose ? Images.ic_Choose : Images.icCan}
                     style={styles.icon1}
                     resizeMode={'stretch'} />
            </View>
          </View>
        </TouchableOpacity> : null
    );
  };

  const gotoHomeScreen = () => {
    if (DataLocal.haveSim === '0') {
        navigation.navigate(Consts.ScreenIds.Tabs)
    }
  }

  return (
    <View
      style={[styles.container, {paddingBottom: useSafeAreaInsets().bottom}]}>
      <Header title={t('common:header_contacts')} />
      <View style={styles.mainView}>
        <View style={{ width: '90%', height: '40%' }}>
          <Text style={styles.txtHeader}>{t('common:listSOS')}</Text>
          {listSOS.length>0 && listSOS.map((obj,i)=>{
            return(
              <View
                key={i}
                activeOpacity={0.9}
                style={[styles.containerItemContact, {width: '100%', height: '25%'}]}>
                <View style={styles.wrap}>
                  <View style={styles.containerSOS}>
                    <Text style={styles.txtSOS}>{'SOS'+(i+1)}</Text>
                  </View>
                  {obj.name && obj.phoneNumber ? <View style={{ flex: 0.8, paddingHorizontal: 10 }}>
                    <Text style={styles.titleText}>{obj.name}</Text>
                    <Text style={styles.phoneText}>{obj.phoneNumber}</Text>
                  </View> :
                    <View style={{ flex: 0.8, paddingHorizontal: 10 }}>
                      <Text style={styles.txtNull}>{t('common:empty')}</Text>
                    </View>}
                  <TouchableOpacity
                    onPress={()=>{removeSOS(i)}}
                    style= {{width: '15%', height: '100%', justifyContent: 'center', alignItems: 'center'}}>
                      <Image source={Images.icDeleteMember} style={styles.icon} resizeMode={'stretch'}/>
                  </TouchableOpacity>
                  <TouchableOpacity
                    activeOpacity={1}
                    onPress={() => addSOS(i)}
                    style= {{width: '15%', height: '100%', justifyContent: 'center', alignItems: 'center'}}>
                    <Image source={Images.icAddMember} style={[styles.icon,obj.sosIndex ? {tintColor: Colors.grayTxt} : null]} resizeMode={'stretch'}/>
                  </TouchableOpacity>
                </View>
              </View>
            )
          })}
       </View>
       <Text style={[styles.txtHeader, { marginLeft: '5%', marginVertical: '1%', marginTop: '5%' }]}>{t('common:listMember')}</Text>
        <FlatList
          data={dataContacts?.phones || []}
          style={styles.wrapContainer}
          contentContainerStyle={!dataContacts?.phones?.length && styles.wrapContainer}
          renderItem={renderItem}
          keyExtractor={item => item.name}
          ListEmptyComponent={
            <View style={styles.containerEmpty}>
              <Image
                source={Images.icEmptyContact}
                style={styles.emptyContact}
                resizeMode='contain'
              />
              <Text style={styles.txtEmpty} children={t('common:empty_contact')} />
            </View>
          }
        />
        <View style={styles.containerViewBottom}>
          <Text style={styles.txtBlockContact}>{t('common:blockOther')}</Text>
          <View style={styles.containerSwitch}>
            <Switch
              trackColor={{false: Colors.gray, true: Colors.colorMain}}
              thumbColor={'#f4f3f4'}
              ios_backgroundColor='#3e3e3e'
              onValueChange={toggleSwitch}
              value={isBlocking}
            />
          </View>
        </View>
        <TouchableOpacity style={styles.containerAdd} onPress={pressAddNew}>
          <Text style={styles.txtAdd}>{t('common:addPhone')}</Text>
        </TouchableOpacity>
      </View>
      <Modal
         visible={onModel}
         transparent={true}
         animationType={'none'}>
         <TouchableOpacity
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(0, 0, 0, 0.3)',
            width: '100%',
            height: '100%',
            flexDirection: 'column'
          }}
          onPress={() => setOnModel(false)}>
          <View style={styles.viewModal}>
            <View style={{ alignItems: 'center' }}>
              <Text style={styles.textItem}>{t('common:chooseSOS')}</Text>
            </View>
            <FlatList
              data={dataContacts?.phones || []}
              style={[styles.wrapContainer, {backgroundColor: 'white', width: '100%', marginBottom: '5%'}]}
              contentContainerStyle={
                !dataContacts?.phones?.length && styles.wrapContainer
              }
              renderItem={renderItemModal}
              keyExtractor={item => item.name}
        />
          </View>
         </TouchableOpacity>
      </Modal>
      <NotificationModal ref={refNotification} goBack={gotoHomeScreen}/>
      <LoadingIndicator ref={refLoading} />
      <ModalConfirm ref={refConfirm} />
    </View>
  );
};
