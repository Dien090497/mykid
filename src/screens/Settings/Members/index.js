import {FlatList, Image, Text, TouchableOpacity, View} from 'react-native';
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

export default ({navigation, route}) => {
  const refLoading = useRef();
  const [allMember, setAllMember] = useState([]);
  const [admin, setAdmin] = useState();

  const dataMock = [
    {
      icon: Images.icFather,
      relationship: 'FATHER',
    },
    {
      icon: Images.icMother,
      relationship: 'MOTHER',
    },
    {
      icon: Images.icGrandfather,
      relationship: 'GRANDFATHER',
    },
    {
      icon: Images.icGrandmother,
      relationship: 'GRANDMOTHER',
    },
    {
      icon: Images.icBrother,
      relationship: 'BROTHER',
    },
    {
      icon: Images.icSister,
      relationship: 'SISTER',
    },
    {
      icon: Images.icOther,
      relationship: 'OTHER',
    },
  ];

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
        if (adminMem.length ===  0 || (adminMem.length > 0 && adminMem.accountId !== DataLocal.userInfo.id)) {
          members = members.filter(val => val.status !== 'PENDING');
        }
        setAllMember(members);
      },
      failure: error => {},
      refLoading: refLoading,
    });
  };

  const removeContact = item => {
    showConfirmation(String.removeContactConfirm, {
      response: accept => {
        if (accept) {
          rejectContactApi(item.id, {
            success: res => {
              showAlert(String.deleteContactSuccess, {
                close: () => {
                  getListDevice();
                },
              });
            },
            failure: error => {},
            refLoading: refLoading,
          });
        }
      },
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
  const pressRefresh = () => {
    //Call API Refresh
    getListDevice();
  };

  const renderMemberItem = item => {
    const relationship = dataMock.filter(
      val => val.relationship === item.relationship,
    );
    const icon =
      relationship.length > 0 ? relationship[0].icon : dataMock[6].icon;
    return (
      <TouchableOpacity
        activeOpacity={0.9}
        key={item.id}
        style={styles.itemContainer}>
        <View style={styles.itemLeft}>
          <Image style={styles.avatar} source={icon} />
          <View style={styles.info}>
            <Text style={styles.username}>{item.deviceName}</Text>
            <Text
              style={styles.otherInfoText}
              children={`${String.header_account}: ${item.email}`}
            />
            <Text style={styles.otherInfoText}>
              {String.relationship}{item.relationship}
            </Text>
            {item.status === 'PENDING' &&
              admin.accountId === DataLocal.userInfo.id && (
                <View style={styles.rowItem}>
                  <TouchableOpacity
                    style={[styles.smallButton, {marginRight: 10}]}
                    onPress={() => cancelContact(item)}>
                    <Text
                      style={[styles.smallButtonText, {color: Colors.orange}]}>
                      {String.member_reject}
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.smallButton}
                    onPress={() => acceptContact(item)}>
                    <Text style={[styles.smallButtonText, {color: 'green'}]}>
                      {String.member_approval}
                    </Text>
                  </TouchableOpacity>
                </View>
              )}
            {!item.admin &&
              item.status === 'ACTIVE' &&
              admin.accountId === DataLocal.userInfo.id && (
                <View style={styles.rowItem2}>
                  <TouchableOpacity
                    style={styles.smallButton}
                    onPress={() => removeContact(item)}>
                    <Text style={[styles.smallButtonText, {color: Colors.red}]}>
                      {String.member_remove}
                    </Text>
                  </TouchableOpacity>
                </View>
              )}
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const renderHeader = isAdmin => {
    return (
      <View style={styles.headerContainer}>
        <Image
          style={styles.iconHeader}
          source={isAdmin ? Images.icAdmin : Images.icTwoUsers}
        />
        <Text style={styles.headerText}>
          {isAdmin ? 'Administrator' : 'Family Members'}
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
        />
        {admin && admin.accountId === DataLocal.userInfo.id &&
          <TouchableOpacity style={styles.button} onPress={pressRefresh}>
            <Text style={styles.buttonText}>{String.member_refresh}</Text>
          </TouchableOpacity>
        }
      </View>
      <LoadingIndicator ref={refLoading} />
    </View>
  );
};
