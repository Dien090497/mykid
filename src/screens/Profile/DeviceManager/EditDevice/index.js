import {
  FlatList,
  Image, Keyboard, Modal, RefreshControl,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { styles } from "./styles";
import Header from "../../../../components/Header";
import { String } from "../../../../assets/strings/String";
import Images from "../../../../assets/Images";
import Consts, { ScaleHeight } from "../../../../functions/Consts";
import { Colors } from "../../../../assets/colors/Colors";
import LoadingIndicator from "../../../../components/LoadingIndicator";
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import ActionSheet from '@alessiocancian/react-native-actionsheet';
import {
  checkCameraPermission,
  checkPhotoLibraryReadPermission,
  checkPhotoLibraryWritePermission,
} from "../../../../functions/permissions";
import { launchCamera, launchImageLibrary } from "react-native-image-picker";
import { hideLoading, resizeImage, showLoading } from "../../../../functions/utils";


export default function EditDevice({ navigation, route }) {

  const refLoading = useRef();
  const [data, setData] = useState(null);
  let sheet = null;

  useLayoutEffect(() => {
    setData(route.params.data);
  },[]);

  const onRelationship = () => {
    navigation.navigate(Consts.ScreenIds.Relationship, { data: data, onSetRelationship: onPlaceChosen });
  };

  const onPlaceChosen = (relationship) => {
    const newData = Object.assign({}, data);
    newData.relationshipName = relationship.name;
    newData.relationship = relationship.relationship;
    newData.icon = relationship.icon;
    console.log(newData);
    setData(newData);
  };

  const handleImageAction = async (index) => {
    switch (index) {
      case 0:
        const granted = await checkPhotoLibraryReadPermission();
        if (granted) {
          launchImageLibrary({
            mediaType: 'photo',
          }, resp => {
            resizeImg(resp);
          });
        }
        break;
      case 1:
        const cameraGranted = await checkCameraPermission();
        const photosGranted = await checkPhotoLibraryWritePermission();
        if (cameraGranted && photosGranted) {
          launchCamera({
            mediaType: 'photo',
            cameraType: 'front',
            saveToPhotos: false,
          }, resp => {
            resizeImg(resp);
          });
        }
        break;
    }
  }
  const resizeImg = (imagePickerResponse) => {
    if (imagePickerResponse.uri) {
      showLoading(refLoading);
      resizeImage(imagePickerResponse).then(uri => {
        hideLoading(refLoading);
        if (uri) {
          const newData = Object.assign({}, data);
          newData.avatar = uri
          setData(newData);
        }
      });
    }
  };

  console.log(data)

  const selectPhoto = () => {
    Keyboard.dismiss();
    sheet.show();
  }

  return (
    <View style={styles.contain}>
      <Header title={String.header_editDevice} />
      <View style={{ flex: 1, marginHorizontal: 20 }}>
        <TouchableOpacity style={styles.viewAvatar} onPress={selectPhoto}>
          <Text style={styles.containText}>Hình đại diện</Text>
          <View>
            {data && <Image source={data.avatar? {uri: data.avatar}: data.icon} resizeMode="cover" style={styles.avatar} />}
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.viewContain}>
          <Text style={styles.containText}>Biệt hiệu</Text>
          {data && <Text style={styles.textNickName}>{data.deviceName}</Text>}
        </TouchableOpacity>
        <TouchableOpacity style={styles.input} onPress={onRelationship}>
          {data && <Image style={[styles.iconInput, { height: "60%" }]} source={data.icon} resizeMode="contain" />}
          {data && <Text style={{ flex: 1, color: Colors.black }}>{String.iAm}<Text
            style={{ fontFamily: "Roboto-Bold" }}>{data.relationshipName}</Text>{String.ofHe}</Text>}
          <TouchableOpacity style={{ paddingVertical: "3%" }}>
            <Image style={styles.iconInput} source={Images.icDetail} resizeMode="contain" />
          </TouchableOpacity>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>{String.confirm}</Text>
        </TouchableOpacity>
      </View>
      <LoadingIndicator ref={refLoading} />
      <ActionSheet
        ref={o => sheet = o}
        title={String.selectPhoto}
        options={[
          String.selectPhotoLibrary,
          String.takePhoto,
          String.cancel,
        ]}
        cancelButtonIndex={2}
        onPress={handleImageAction}
      />
    </View>
  );
}
