import {FlatList, Image, Text, TouchableOpacity, View, Modal, RefreshControl,ScrollView} from 'react-native';
import React, {useLayoutEffect, useRef, useState} from 'react';
import {
  acceptContactApi,
  getListDeviceApi,
  rejectContactApi,
} from '../../../network/DeviceService';
import {showAlert, showConfirmation} from '../../../functions/utils';

import {Colors} from '../../../assets/colors/Colors';
import DataLocal from '../../../data/dataLocal';
import Header from '../../../components/Header';
import Images from '../../../assets/Images';
import LoadingIndicator from '../../../components/LoadingIndicator';
import {String} from '../../../assets/strings/String';
import {styles} from './styles';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {ScaleHeight} from "../../../functions/Consts";
export default ({navigation, route}) => {
  const refLoading = useRef();
  const [allMember, setAllMember] = useState([]);
  const [admin, setAdmin] = useState();
  const [onModal, setOnModal] = useState(false)
  const [idCancel, setIdCancel] = useState();
  const [loading, setLoading] = useState(false);

  const loadMore = React.useCallback(async () => {
    setLoading(true);
    getListDevice();
    setLoading(false);
  }, []);

  useLayoutEffect(() => {
    getListDevice();
  }, []);

  const getListDevice = () => {
    getListDeviceApi(null, 0, 100, DataLocal.deviceId, '', {
      success: res => {
        const adminMem = res.data.filter(val => val.admin === true);
        if (adminMem.length > 0) {
          setAdmin(adminMem[0]);
        }
        let members = res.data.filter(val => val.admin === false);
        if (adminMem.length ===  0 || (adminMem.length > 0 && adminMem[0].accountId !== DataLocal.userInfo.id)) {
          members = members.filter(val => val.status !== 'PENDING');
        }
        setAllMember(members);
      },
      failure: error => {},
      refLoading: refLoading,
    });
  };

  const removeContact = () => {
          rejectContactApi(idCancel, {
            success: res => {
              setOnModal(false);
              showAlert(String.deleteContactSuccess, {
                close: () => {
                  getListDevice();
                },
              });
            },
            failure: error => {},
            refLoading: refLoading,
          });
  };

  const cancelContact = item => {
    rejectContactApi(item.id, {
      success: res => {
        showAlert(String.rejectContactSuccess, {
          close: () => {
            getListDevice();
          },
        });
      },
      failure: error => {},
      refLoading: refLoading,
    });
  };

  const acceptContact = item => {
    acceptContactApi(item.id, {
      success: res => {
        if (res.data && res.data.status === 'ACTIVE') {
          showAlert(String.acceptContactSuccess, {
            close: () => {
              getListDevice();
            },
          });
        }
      },
      failure: error => {},
      refLoading: refLoading,
    });
  };
  const renderItem = ({item}) => {
    return renderMemberItem(item);
  };

  const OnModal = item => {
     setOnModal(true);
     setIdCancel(item.id);
  }

  const renderMemberItem = item => {
    return (
      <TouchableOpacity
        activeOpacity={0.9}
        key={item.id}
        style={styles.itemContainer}>
        <View style={
          [styles.itemLeft, ( item.status === 'PENDING' && admin &&
          admin.accountId === DataLocal.userInfo.id  ?
          {height:ScaleHeight.xxtraBig*1.6}: {height:ScaleHeight.xxtraBig})]
        }>
         <View style={styles.containerView}>
           <View style={styles.imageView}>
             <Image style={styles.avatar} source={Images.icUser2} />
           </View>
           <View style={styles.info}>
             <View style={styles.textView}>
               <Text style={styles.username}>{item.deviceName}</Text>
               { item.accountId===DataLocal.userInfo.id? (
                 <Text style={[styles.username, {color: Colors.red}]}>me</Text>
               ): null}
             </View>
             <Text
               style={styles.otherInfoText}
               children={`${String.header_account}: ${item.email}`}
             />
             <Text style={styles.otherInfoText}>
               {String.relationship}{item.relationship}
             </Text>
           </View>
           {!item.admin && item.status === 'ACTIVE' && admin &&
            admin.accountId === DataLocal.userInfo.id ? (
             <View style={styles.rowItem2}>
               <TouchableOpacity
                 onPress={ () => OnModal(item)}>
                 <Image
                   style={styles.iconCancel}
                   source={Images.icCancelMember}
                 />
               </TouchableOpacity>
             </View>
           ):(
             <View style={styles.rowItem2}></View>
           )}
         </View>
          {item.status === 'PENDING' && admin &&
          admin.accountId === DataLocal.userInfo.id && (
            <View style={styles.rowItem}>
              <View style={styles.tob}>
                <TouchableOpacity
                  style={[styles.smallButton]}
                  onPress={() => cancelContact(item)}>
                  <Text
                    style={[styles.smallButtonText, {color: Colors.red}]}>
                    {String.member_reject}
                  </Text>
                </TouchableOpacity>
              </View>
              <View style={styles.tob}>
                <TouchableOpacity
                  style={[styles.smallButton,{backgroundColor:Colors.red}]}
                  onPress={() => acceptContact(item)}>
                  <Text style={[styles.smallButtonText, {color: Colors.white}]}>
                    {String.member_approval}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </View>
      </TouchableOpacity>
    );
  };

  const renderHeader = isAdmin => {
    return (
      <View style={styles.headerContainer}>
        { isAdmin? (
          <Image
            style={[styles.iconHeader, { tintColor:Colors.colorImageAdmin}]}
            source={ Images.icUser2 }
          />
        ):(
          <Image
            style={styles.iconHeader}
            source={ Images.icFamily }
          />
        )}
        <Text style={styles.headerText}>
          {isAdmin ? String.header_account_admin : String.header_account_member}
        </Text>
      </View>
    );
  };

  return (
    <View
      style={[styles.container, {paddingBottom: useSafeAreaInsets().bottom}]}>
      <Header title={String.header_members} />
      <View style={styles.mainView}>
        {admin && renderHeader(true)}
        {admin && renderMemberItem(admin)}
        <FlatList
          data={allMember}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          ListHeaderComponent={renderHeader()}
          stickyHeaderIndices={[0]}
          refreshControl={
            <RefreshControl
              refreshing={loading}
              onRefresh={loadMore}
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
           <TouchableOpacity style={styles.modal} onPress={ () => setOnModal(false)}>
             <View style={styles.tobModal}>
                <View style={[styles.tobView, {marginTop: ScaleHeight.small}]}>
                  <Text style={styles.textModel}>{String.removeContactConfirm}</Text>
                </View>
                <View style={[styles.tobView , {width: '86%'}]}>
                  <View style={styles.tob}>
                    <TouchableOpacity
                      style={[styles.smallButton, {backgroundColor: Colors.white}]}
                      onPress={ () => setOnModal(false)}
                    >
                      <Text
                        style={[styles.smallButtonText, {color: Colors.red}]}>
                        {String.cancel}
                      </Text>
                    </TouchableOpacity>
                  </View>
                <View style={styles.tob}>
                  <TouchableOpacity
                    style={[styles.smallButton, {backgroundColor: Colors.red}]}
                    onPress={ () => removeContact(idCancel)}
                  >
                    <Text
                      style={[styles.smallButtonText, {color: Colors.white}]}>
                      {String.confirm}
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
};
