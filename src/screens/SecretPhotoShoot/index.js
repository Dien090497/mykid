import { FlatList, Image, Platform, RefreshControl, ScrollView, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";

import Header from "../../components/Header";
import LoadingIndicator from "../../components/LoadingIndicator";
import { String } from "../../assets/strings/String";
import { styles } from "./styles";
import Images from "../../assets/Images";
import FastImage from "react-native-fast-image";
import PreViewImage from "./PreviewImage";
import { DeleteImages, DoSecretShoot, GetListImage } from "../../network/SecretPhotoShootService";
import DataLocal from "../../data/dataLocal";
import ActionSheet from "@alessiocancian/react-native-actionsheet";
import ModalConfirm from "../../components/ModalConfirm";
import CameraRoll from "@react-native-community/cameraroll";
import RNFetchBlob from "react-native-fetch-blob";
import { showAlert } from "../../functions/utils";

export default ({ navigation }) => {
  const refLoading = useRef();
  const refImage = useRef();
  const refConfirm = useRef();
  const [isSetting, setIsSetting] = useState(false);
  let sheet = null;
  const [selectItem, setSelectItem] = useState(null);
  const [data, setData] = useState(null);

  useLayoutEffect(() => {
    getListImage();
  }, []);

  const getListImage = () => {
    GetListImage(DataLocal.deviceId, 0, 99, {
        success: res => {
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
    } else {
      refImage.current.openModal(data, item.index);
    }
  };

  const deleteImage = () => {
    const ids = [];
    data.map(item => {
      item.isChoose ? ids.push(item.id) : null;
    });
    refConfirm.current.open(String.textDeleteImage, () => {
      DeleteImages(DataLocal.deviceId, ids,
        {
          success: res => {
            getListImage();
            showAlert('Xóa thành công!')
          },
          refLoading,
        });
    });
  };
  console.log(data);

  const shootImage = () => {
    DoSecretShoot(
      DataLocal.deviceId, {
        success: data => {
          console.log(data);
        },
        refLoading,
      },
    );
  };

  const action = () => {
    return (
      <ActionSheet options={[String.delete, "Lưu ảnh", String.cancel]}
                   onPress={handleImageAction}
                   cancelButtonIndex={2}
                   ref={o => sheet = o}
      />
    );
  };

  const handleImageAction = async (index) => {
    switch (index) {
      case 0:
        refConfirm.current.open(String.textDeleteImage, () => {
          DeleteImages(DataLocal.deviceId, [selectItem.id],
            {
              success: res => {
                getListImage();
                showAlert('Xóa thành công!')
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
    if (Platform.OS === "ios") {
      CameraRoll.save(src)
        .then(console.log("Photo added to camera roll!"))
        .catch(err => console.log("err:", err));
    } else {
      RNFetchBlob
        .config({
          fileCache: true,
          appendExt: "jpg",
        })
        .fetch("GET", src)
        .then((res) => {
          console.log();
          CameraRoll.saveToCameraRoll(res.path())
            .then((res) => {
              console.log("save", res);
              showAlert('Lưu ảnh thành công!')
            }).catch((error) => {
            console.log("error", error);
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
                              setSelectItem(item.item);
                            }
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
          <Text style={styles.txtItemList}>{item.item.shootingTime}</Text>
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
      <Header title={String.header_secret_shoot}
              right
              rightIcon={isSetting ? Images.icConfirms : Images.icEdit}
              rightAction={chooseAndDelete}
      />
      <View style={styles.mainView}>
        <FlatList
          style={{ width: "100%", flex: 1, paddingHorizontal: 15 }}
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
        <View style={{ width: "100%", paddingHorizontal: 20 }}>
          {isSetting ?
            <TouchableOpacity style={styles.btnSubmit} onPress={deleteImage}>
              <Text style={styles.textSubmit}>{String.delete}</Text>
            </TouchableOpacity>
            :
            <TouchableOpacity style={styles.btnSubmit} onPress={shootImage}>
              <Text style={styles.textSubmit}>{String.textShoot}</Text>
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
