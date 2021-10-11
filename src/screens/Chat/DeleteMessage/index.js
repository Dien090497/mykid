import React, {useEffect, useLayoutEffect, useRef, useState} from 'react';
import {
  Text,
  TouchableOpacity,
  View,
  FlatList,
  RefreshControl,
  Image, Modal
} from 'react-native'
import {String} from "../../../assets/strings/String";
import Header from "../../../components/Header";
import {getListDeviceApi} from "../../../network/DeviceService";
import DataLocal from "../../../data/dataLocal";
import Images from "../../../assets/Images";
import {Colors} from "../../../assets/colors/Colors";
import LoadingIndicator from "../../../components/LoadingIndicator";
import Consts, {ScaleHeight} from "../../../functions/Consts";
import {styles} from "./styles";

export default function DeleteMessage({navigation}) {
  const refLoading = useRef();
  const [listMember, setListMember] = useState([]);
  const [loading, setLoading] = useState(false);
  const [onModal, setOnModal] = useState(false);

  const dataMock = [
    {
      icon: Images.icFather,
      relationship: 'FATHER'
    },
    {
      icon: Images.icMother,
      relationship: 'MOTHER'
    },
    {
      icon: Images.icGrandfather,
      relationship: 'GRANDFATHER'
    },
    {
      icon: Images.icGrandmother,
      relationship: 'GRANDMOTHER'
    },
    {
      icon: Images.icBrother,
      relationship: 'BROTHER'
    },
    {
      icon: Images.icSister,
      relationship: 'SISTER'
    },
    {
      icon: Images.icOther,
      relationship: 'OTHER'
    },
    {
      icon: Images.icDeleteMessage,
      relationship: 'DELETE'
    },
  ];

  useLayoutEffect(() => {
    getListDevice();
  }, []);

  const refesh = React.useCallback(async () => {
    setLoading(true);
    getListDevice();
    setLoading(false);
  }, []);

  const getListDevice = () => {
    getListDeviceApi(null, 0, 100, DataLocal.deviceId, 'ACTIVE', {
      success: res => {
          setListMember(res.data);
        },
      failure: error => {
      },
      refLoading: refLoading,
    });
  };

  const refeshDelete = () => {
    getListDevice();
  }

  const gotoMember = () => {
    navigation.navigate(Consts.ScreenIds.Members, {Delete : refeshDelete});
  }

  const renderFlatlist = (itemFlatlist) => {
    const relationship = dataMock.filter(val => val.relationship === itemFlatlist.item.relationship);
    const icon = relationship.length > 0 ? relationship[0].icon :
      (itemFlatlist.item.relationship === 'OTHER' ? dataMock[6].icon : dataMock[7].icon);
    return (
      <View style = {styles.itemView}>
          <View>
            {itemFlatlist.item.relationship !== 'DELETE' ?
              (
                <View>
                  <Image style = {styles.icon} source={icon} resizeMode = {"stretch"}/>
                  <Text style = {styles.textItem}>{itemFlatlist.item.relationship}</Text>
                </View>
              ):(
                <TouchableOpacity onPress={gotoMember}>
                  <Image style = {styles.icon} source={icon} resizeMode = {"stretch"}/>
                  <Text style = {styles.textItem}>{itemFlatlist.item.relationship}</Text>
                </TouchableOpacity>
              )}
          </View>
      </View>
    );
  };

  return (
    <View style = {styles.containerView}>
      <Header title = {'Thông tin nhóm gia đình'}/>
      <View style = {styles.flatListContainer}>
        <FlatList
          data = {[...listMember, {relationship: 'DELETE'}]}
          keyExtractor={item => item.id}
          renderItem = {renderFlatlist}
          style = {styles.flatlistView}
          numColumns = {4}
          refreshControl = {
            <RefreshControl
              refreshing = {loading}
              onRefresh = {refesh}
            />
          }
        />
      </View>
      <TouchableOpacity
        style = {styles.tobDelete}
        onPress = { () => setOnModal(true)}
      >
        <Text style = {styles.textDelete}>{String.deleteMessage}</Text>
      </TouchableOpacity>
      <Modal
        visible = {onModal}
        transparent = {true}
        animationType = {'none'}
      >
        <View style = {styles.itemLeft}>
          <TouchableOpacity style = {styles.modal} onPress = { () => setOnModal(false)}>
            <View style = {styles.tobModal}>
              <View style = {[styles.tobView, {marginTop: ScaleHeight.small}]}>
                <Text style = {styles.textModel}>{String.arleftDeleteMessage}</Text>
              </View>
              <View style = {[styles.tobView , {width: '86%'}]}>
                <View style = {styles.tob}>
                  <TouchableOpacity
                    style = {[styles.smallButton, {backgroundColor: Colors.white}]}
                    onPress = { () => setOnModal(false)}
                  >
                    <Text
                      style = {[styles.smallButtonText, {color: Colors.red}]}>
                      {String.cancel}
                    </Text>
                  </TouchableOpacity>
                </View>
                <View style = {styles.TobOpacity}>
                  <TouchableOpacity
                    style = {[styles.smallButton, {backgroundColor: Colors.red}]}
                    onPress = { () => navigation.navigate(Consts.ScreenIds.Chat)}
                  >
                    <Text
                      style = {[styles.smallButtonText, {color: Colors.white}]}>
                      {String.confirm}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        </View>
      </Modal>
      <LoadingIndicator ref = {refLoading}/>
    </View>
  );
}