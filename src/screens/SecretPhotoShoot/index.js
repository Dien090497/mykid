import { FlatList, Platform, RefreshControl, Text, TouchableOpacity, View } from 'react-native';
import React, { useLayoutEffect, useRef, useState } from 'react';

import Header from '../../components/Header';
import LoadingIndicator from '../../components/LoadingIndicator';
import { styles } from './styles';
import Images from '../../assets/Images';
import FastImage from 'react-native-fast-image';
import PreViewImage from './PreviewImage';
import { DeleteImages, DoSecretShoot, GetListImage } from '../../network/SecretPhotoShootService';
import DataLocal from '../../data/dataLocal';
import ActionSheet from '@alessiocancian/react-native-actionsheet';
import ModalConfirm from '../../components/ModalConfirm';
import CameraRoll from '@react-native-community/cameraroll';
import RNFetchBlob from 'react-native-fetch-blob';
import SimpleToast from 'react-native-simple-toast';
import Moment from 'moment';
import { Colors } from '../../assets/colors/Colors';
import { useTranslation } from 'react-i18next';

export default ({ navigation }) => {
  const refLoading = useRef();
  const refImage = useRef();
  const refConfirm = useRef();
  const [isSetting, setIsSetting] = useState(false);
  let sheet = null;
  const [selectItem, setSelectItem] = useState(null);
  const [data, setData] = useState([]);
  const [enable, setEnable] = useState(false)
  const { t } = useTranslation();

  useLayoutEffect(() => {
    getListImage();
  }, []);

  const getListImage = () => {
    GetListImage(DataLocal.deviceId, 0, 99, {
        success: res => {
          if (res.data.length === data.length){
            SimpleToast.show(t('common:txtNotHaveNewPicture'));
            return;
          }
          res.data.map(item => {
            item.isChoose = false;
          });
          setData(res.data);
        },
        refLoading,
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
            getListImage();
          },
          refLoading,
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
      },
    );
  };

  const action = () => {
    return (
      <ActionSheet options={[t('common:delete'), t('common:savePicture'), t('common:cancel')]}
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
                getListImage();
              },
              refLoading,
            });
        });
        break;
      case 1:
        saveImage(selectItem.url);
        break;
    }
  };

  const saveImage = (src) => {
    if (Platform.OS === 'ios') {
      CameraRoll.save(src)
        .then(console.log('Photo added to camera roll!'))
        .catch(err => console.log('err:', err));
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
              console.log('save', res);
            }).catch((error) => {
            console.log('error', error);
          });

        });
    }
  };

  const renderItem = (item) => {
    return (
      <View style={styles.itemList}>
        <TouchableOpacity style={styles.imageList}
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
          <FastImage
            source={{ uri: item.item.url }}
            resizeMode={FastImage.resizeMode.stretch}
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
          refreshControl={
            <RefreshControl
              onRefresh={getListImage}
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
    </View>
  );
};
