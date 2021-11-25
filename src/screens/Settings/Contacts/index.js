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

export default ({navigation, route}) => {
  const refLoading = useRef();
  const refNotification = useRef();
  const refConfirm = useRef();
  const [isBlocking, setIsBlocking] = useState(false);
  const [dataContacts, setDataContacts] = useState(null);
  const [onModel, setOnMoel] = useState(false);
  const [choose, setChoose] = useState(false);
  const [phone1, setPhone1] = useState('');
  const [phone2, setPhone2] = useState('');
  const [phone3, setPhone3] = useState('');
  const [name1, setName1] = useState('');
  const [name2, setName2] = useState('');
  const [name3, setName3] = useState('');
  const [numberSOS, setNumberSOS] = useState();
  const { t } = useTranslation();

  useEffect(() => {
    getListContactPhoneApi(DataLocal.deviceId, {
      success: res => {
        if (res.data) {
          setDataContacts(res.data);
          setIsBlocking(!!res.data.blockUnknown);
        }
      },
      refLoading: refLoading,
      refNotification: refNotification,
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
        refNotification: refNotification,
      },
    );
  };

  const removeContact = item => {
    if (item.sosNumber) {
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
  const renderItem = ({item, index}) => {
    return (
      <TouchableOpacity
        activeOpacity={0.9}
        style={styles.containerItemContact}
        key={item.name}
        onPress={item.onPress}>
        <View style={styles.wrap}>
          <View>
            <Image source={Images.icOther} style={{width:30 , height: 30}} resizeMode = {'stretch'}/>
          </View>
          {/* <View style={styles.containerSOS}>
            <Text style={styles.txtSOS}>SOS</Text>
            <TouchableOpacity
              style={styles.containerChangeSOS}
              onPress={() => changeSOS(item, index)}>
              {item.sosNumber && <View style={styles.containerSelected} />}
            </TouchableOpacity>
          </View> */}
          <View style={{flex: 1}}>
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
      <TouchableOpacity
        activeOpacity={0.9}
        style={styles.containerItemContact}
        key={item.name}
        onPress={item.onPress}>
        <TouchableOpacity style={styles.wrap}  onPress={() => closeModal(item,index)}>
          <View>
            <Image source={Images.icOther} style={{width:30 , height: 30}} resizeMode = {'stretch'}/>
          </View>
          <View style={{width: '80%'}}>
            <Text style={styles.titleText}>{item.name}</Text>
            <Text style={styles.phoneText}>{item.phoneNumber}</Text>
          </View>
          <TouchableOpacity
            style={{justifyContent: 'center', alignItems: 'center', width: '10%'}}
           >
              <Image source={choose === index ? Images.ic_Choose : Images.icCan} 
                     style={styles.icon1}
                     resizeMode={'stretch'}
              />
          </TouchableOpacity>
        </TouchableOpacity>
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
      refNotification: refNotification,
    });
  };

  const isModel = (SOS) => {
    setOnMoel(true);
    setNumberSOS(SOS);
  }

  const closeModal = (item) => {
    // setChoose(index);
    console.log('item',item)
    // setOnMoel(false);
    // if(numberSOS === 'SOS1') {
    //   setPhone1(dataContacts?.phones[choose]?.phoneNumber)
    //   setName1(dataContacts?.phones[choose]?.name)
    // }
    // else if(numberSOS === 'SOS2') {
    //   setPhone2(dataContacts?.phones[choose]?.phoneNumber)
    //   setName2(dataContacts?.phones[choose]?.name)
    // }
    // else {
    //   setPhone3(dataContacts?.phones[choose]?.phoneNumber)
    //   setName3(dataContacts?.phones[choose]?.name)
    // }
  }

  return (
    <View
      style={[styles.container, {paddingBottom: useSafeAreaInsets().bottom}]}>
      <Header title={t('common:header_contacts')} />
      <View style={styles.mainView}>
        <View style={{ width: '90%', height: '40%' }}>
          <Text style={{ marginLeft: '5%',fontSize: 16, fontWeight: '500', marginVertical: '1%' }}>{t('common:listSOS')}</Text>
          <View
            activeOpacity={0.9}
            style={[styles.containerItemContact, {width: '100%', height: '25%'}]}
          >
            <View style={styles.wrap}>
              <View style={styles.containerSOS}>
                <Text style={styles.txtSOS}>SOS1</Text>
              </View>
              <View style={{ flex: 0.8 }}>
                <Text style={styles.titleText}>{name1}</Text>
                <Text style={styles.phoneText}>{phone1}</Text>
              </View>
              <TouchableOpacity
                // onPress={isModel}
                style= {{width: '8%', height: '100%', justifyContent: 'center', alignItems: 'center'}}
              >
                <Image source={Images.icDeleteMember} style={styles.icon} resizeMode={'stretch'}/>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => isModel('SOS1')}
                style= {{width: '8%', height: '100%', justifyContent: 'center', alignItems: 'center'}}
              >
                 <Image source={Images.icAddMember} style={styles.icon} resizeMode={'stretch'}/>
              </TouchableOpacity>
            </View>
          </View>
          <View
            activeOpacity={0.9}
            style={[styles.containerItemContact, {width: '100%', height: '25%'}]}
          >
            <View style={styles.wrap}>
              <View style={styles.containerSOS}>
                <Text style={styles.txtSOS}>SOS2</Text>
              </View>
              <View style={{ flex: 0.8 }}>
                <Text style={styles.titleText}>{name2}</Text>
                <Text style={styles.phoneText}>{phone2}</Text>
              </View>
              <TouchableOpacity
                // onPress={isModel}
                style= {{width: '8%', height: '100%', justifyContent: 'center', alignItems: 'center'}}
              >
                <Image source={Images.icDelete} style={styles.icon1} resizeMode={'stretch'}/>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => isModel('SOS2')}
                style= {{width: '8%', height: '100%', justifyContent: 'center', alignItems: 'center'}}
              >
                 <Image source={Images.icAddMember} style={styles.icon} resizeMode={'stretch'}/>
              </TouchableOpacity>
            </View>
          </View>
          <View
            activeOpacity={0.9}
            style={[styles.containerItemContact, {width: '100%', height: '25%'}]}
          >
            <View style={styles.wrap}>
              <View style={styles.containerSOS}>
                <Text style={styles.txtSOS}>SOS3</Text>
              </View>
              <View style={{ flex: 0.8 }}>
                <Text style={styles.titleText}>{name3}</Text>
                <Text style={styles.phoneText}>{phone3}</Text>
              </View>
              <TouchableOpacity
                style= {{width: '8%', height: '100%', justifyContent: 'center', alignItems: 'center'}}
              >
                <Image source={Images.icDelete} style={styles.icon1} resizeMode={'stretch'}/>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => isModel('SOS3')}
                style= {{width: '8%', height: '100%', justifyContent: 'center', alignItems: 'center'}}
              >
                 <Image source={Images.icAddMember} style={styles.icon} resizeMode={'stretch'}/>
              </TouchableOpacity>
            </View>
          </View>
       </View>
       <Text style={{ marginLeft: '5%',fontSize: 16, fontWeight: '500', marginVertical: '1%', marginTop: '5%' }}>{t('common:listMember')}</Text>
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
         animationType={'none'}
      >
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
          onPress={() => setOnMoel(false)}
          >
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
      <NotificationModal ref={refNotification} />
      <LoadingIndicator ref={refLoading} />
      <ModalConfirm ref={refConfirm} />
    </View>
  );
};
