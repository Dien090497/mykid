import { FlatList, Image, Platform, RefreshControl, Text, TouchableOpacity, View } from "react-native";
import React, { useLayoutEffect, useRef, useState } from 'react';

import Header from '../../components/Header';
import LoadingIndicator from '../../components/LoadingIndicator';
import { styles } from './styles';
import Images from '../../assets/Images';
import FastImage from 'react-native-fast-image';
import PreViewImage from './PreviewImage';
import { DeleteImages, DoSecretShoot, GetListImage } from '../../network/SecretPhotoShootService';
import DataLocal from '../../data/dataLocal';
import { ActionSheetCustom } from '@alessiocancian/react-native-actionsheet';
import ModalConfirm from '../../components/ModalConfirm';
import CameraRoll from '@react-native-community/cameraroll';
import RNFetchBlob from 'react-native-fetch-blob';
import SimpleToast from 'react-native-simple-toast';
import Moment from 'moment';
import { Colors } from '../../assets/colors/Colors';
import { useTranslation } from 'react-i18next';
import NotificationModal from "../../components/NotificationModal";
import { checkPhotoLibraryWritePermission } from "../../functions/permissions";
import Consts from "../../functions/Consts";
let page = 0;
const sizePage = 30;

export default ({ navigation }) => {
  const refLoading = useRef();
  const refImage = useRef();
  const refConfirm = useRef();
  const refNotification = useRef();
  const [isSetting, setIsSetting] = useState(false);
  let sheet = null;
  const [selectItem, setSelectItem] = useState(null);
  const [data, setData] = useState([]);
  const [enable, setEnable] = useState(false)
  const { t } = useTranslation();

  useLayoutEffect(() => {
    getListImage();
    return () =>{
      page = 0;
    }
  }, []);

  const getListImage = () => {
    GetListImage(DataLocal.deviceId, 0, 30, {
        success: res => {
          if (res.data === data){
            SimpleToast.show(t('common:txtNotHaveNewPicture'));
            return;
          }
          res.data.map(item => {
            item.isChoose = false;
          });
          setData(res.data);
        },
        refLoading,
        refNotification,
      },
    );
  };


  const touchImage = (item) => {
    if (isSetting) {
      const images = Object.assign([], data);
      data[item.index].isChoose = !data[item.index].isChoose;
      setData(images);
      for (let dataKey in data) {
        if (data[dataKey].isChoose === true) {
          setEnable(true);
          return;
        }
        setEnable(false);
      }
    } else {
      refImage.current.openModal(data, item.index,t('common:txtModalPicture'));
    }
  };

  const deleteImage = () => {
    if (!enable) return;
    const ids = [];
    data.map(item => {
      item.isChoose ? ids.push(item.id) : null;
    });
    refConfirm.current.open(t('common:textDeleteImage'), () => {
      DeleteImages(DataLocal.deviceId, ids,
        {
          success: res => {
            page = 0;
            getListImage();
          },
          refLoading,
          refNotification,
        });
    });
  };

  const shootImage = () => {
    DoSecretShoot(
      DataLocal.deviceId, {
        success: data => {
          SimpleToast.show(t('common:txtWaitNewPicture'));
        },
        failure: fail =>{
          SimpleToast.show(t('common:fail'));
        },
        refLoading,
        refNotification,
      },
    );
  };

  const action = () => {
    return (
      <ActionSheetCustom options={[
        <Text style={{fontSize: 18, fontFamily: 'Roboto', color: Colors.grayTextColor}}>{t('common:delete')}</Text>,
        <Text style={{fontSize: 18, fontFamily: 'Roboto', color: Colors.grayTextColor}}>{t('common:savePicture')}</Text>,
        <Text style={{fontSize: 18, fontFamily: 'Roboto', color: Colors.colorMain}}>{t('common:cancel')}</Text>,
      ]}
                   onPress={handleImageAction}
                   cancelButtonIndex={2}
                   ref={o => sheet = o}
      />
    );
  };

  const handleImageAction = async (index) => {
    switch (index) {
      case 0:
        refConfirm.current.open(t('common:textDeleteImage'), () => {
          DeleteImages(DataLocal.deviceId, [selectItem.id],
            {
              success: res => {
                page = 0;
                getListImage();
              },
              refLoading,
              refNotification,
            });
        });
        break;
      case 1:
        const photosGranted = await checkPhotoLibraryWritePermission();
        if (photosGranted){
          saveImage(selectItem.url);
        }
        break;
    }
  };

  const saveImage = (src) => {
    if (Platform.OS === 'ios') {
      CameraRoll.save(src)
        .then(res =>{
          SimpleToast.show(t('common:savePictureSuccess'))
        })
        .catch(err => {
          SimpleToast.show(t('common:savePictureFail'))
          console.log('err:', err)
        });
    } else {
      RNFetchBlob
        .config({
          fileCache: true,
          appendExt: 'jpg',
        })
        .fetch('GET', src)
        .then((res) => {
          CameraRoll.saveToCameraRoll(res.path())
            .then((res) => {
              SimpleToast.show(t('common:savePictureSuccess'))
            }).catch((error) => {
            SimpleToast.show(t('common:savePictureFail'))
            console.log('err:', error)
          });

        });
    }
  };

  const renderItem = (item) => {
    return (
      <View style={styles.itemList}>
        <TouchableOpacity style={styles.imageList}
                          activeOpacity={1}
                          onPress={() => {
                            touchImage(item);
                          }}
                          onLongPress={() => {
                            if (!isSetting){
                              sheet.show();
                            }
                          }}
                          onPressIn={()=>{
                            setSelectItem(item.item);
                          }}>
          <Image
            source={{ uri: item.item.url }}
            resizeMode={'stretch'}
            style={styles.imageItem}
          />
          {isSetting ? <FastImage
            source={item.item.isChoose ? Images.icRedConfirms : Images.icUnConfirms}
            resizeMode={FastImage.resizeMode.stretch}
            style={styles.iconCheck}
          /> : null}
        </TouchableOpacity>
        <View>
          <Text style={styles.txtItemList}>{item.item.shootingTime? Moment(item.item.shootingTime).format('HH:mm DD-MM-yyyy Z') : ''}</Text>
        </View>
      </View>
    );
  };

  const chooseAndDelete = () => {
    const listImage = Object.assign([], data);
    listImage.map(item => {
      item.isChoose = false;
    });
    setIsSetting(!isSetting);
  };

  const loadMore = () =>{
    page++;
    GetListImage(DataLocal.deviceId, page, sizePage, {
        success: res => {
          res.data.map(item => {
            item.isChoose = false;
          });
          const newData = Object.assign([], data)
          setData(newData.concat(res.data));
        },
        refLoading,
        refNotification,
      },
    );
  }

  const gotoHomeScreen = () => {
    if (DataLocal.haveSim === '0') {
      DataLocal.saveHaveSim('1').then(r =>
        navigation.navigate(Consts.ScreenIds.Tabs)
      );
    }
  }

  return (
    <View
      style={styles.container}>
      <Header title={t('common:header_secret_shoot')}
              right
              rightIcon={isSetting ? Images.icConfirms : Images.icEdit}
              rightAction={chooseAndDelete}
      />
      <View style={styles.mainView}>
        <FlatList
          style={{ width: '100%', flex: 1, paddingHorizontal: 15 }}
          data={data}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          numColumns={3}
          onEndReached={() =>{loadMore()}}
          refreshControl={
            <RefreshControl
              onRefresh={() =>{
                page = 0;
                getListImage();
              }
              }
              refreshing={false} />
          }
        />
        <View style={{ width: '100%', paddingHorizontal: 20 }}>
          {isSetting ?
            <TouchableOpacity style={[styles.btnSubmit, enable ? null: {backgroundColor: Colors.transparent, borderColor: Colors.colorMain, borderWidth:1}]} onPress={deleteImage}>
              <Text style={[styles.textSubmit, enable ? {} : {color: Colors.colorMain}]}>{t('common:delete')}</Text>
            </TouchableOpacity>
            :
            <TouchableOpacity style={styles.btnSubmit} onPress={shootImage}>
              <Text style={styles.textSubmit}>{t('common:textShoot')}</Text>
            </TouchableOpacity>}
        </View>
      </View>
      {action()}
      <PreViewImage ref={refImage} />
      <ModalConfirm ref={refConfirm} />
      <LoadingIndicator ref={refLoading} />
      <NotificationModal ref={refNotification} goBack={gotoHomeScreen}/>
    </View>
  );
};
