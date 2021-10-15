import { FlatList, Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useRef, useState } from "react";

import Header from "../../components/Header";
import LoadingIndicator from "../../components/LoadingIndicator";
import { String } from "../../assets/strings/String";
import { styles } from "./styles";
import Images from "../../assets/Images";
import FastImage from "react-native-fast-image";
import PreViewImage  from './PreviewImage'

export default ({ navigation }) => {
  const refLoading = useRef();
  const refImage = useRef();
  const [isSetting, setIsSetting] = useState(false);
  const [imageMook, setImageMook] = useState([
    {
      id: 1,
      src: Images.bgLogin,
      isChoose: false,
      date: new Date(),
    },
    {
      id: 2,
      src: Images.aAudioRight,
      isChoose: false,
      date: new Date(),
    },
    {
      id: 3,
      src: Images.icRotateLeft,
      isChoose: false,
      date: new Date(),
    },
    {
      id: 4,
      src: Images.icHeart,
      isChoose: false,
      date: new Date(),
    },
    {
      id: 5,
      src: Images.icConfirms,
      isChoose: false,
      date: new Date(),
    },
    {
      id: 6,
      src: Images.icAlarmClocks,
      isChoose: false,
      date: new Date(),
    },
    {
      id: 7,
      src: Images.bgHome,
      isChoose: false,
      date: new Date(),
    },
    {
      id: 8,
      src: Images.icCalendar,
      isChoose: false,
      date: new Date(),
    },
    {
      id: 9,
      src: Images.icRemoteStart,
      isChoose: false,
      date: new Date(),
    },
    {
      id: 10,
      src: Images.icAvatar,
      isChoose: false,
      date: new Date(),
    },
    {
      id: 11,
      src: Images.icHeart,
      isChoose: false,
      date: new Date(),
    },
    {
      id: 12,
      src: Images.icUncheck,
      isChoose: false,
      date: new Date(),
    },
    {
      id: 13,
      src: Images.icWorldFill,
      isChoose: false,
      date: new Date(),
    },
    {
      id: 14,
      src: Images.icRightArrow,
      isChoose: false,
      date: new Date(),
    },
    {
      id: 15,
      src: Images.icCheck,
      isChoose: false,
      date: new Date(),
    },
    {
      id: 16,
      src: Images.bgLogin,
      isChoose: false,
      date: new Date(),
    },
    {
      id: 17,
      src: Images.bgLogin,
      isChoose: false,
      date: new Date(),
    },
    {
      id: 18,
      src: Images.bgLogin,
      isChoose: false,
      date: new Date(),
    },
    {
      id: 19,
      src: Images.bgLogin,
      isChoose: false,
      date: new Date(),
    },
    {
      id: 20,
      src: Images.bgLogin,
      isChoose: false,
      date: new Date(),
    },
  ]);


  const touchImage = (item) => {
    if (isSetting) {
      const data = Object.assign([], imageMook);
      data[item.index].isChoose = !data[item.index].isChoose;
      setImageMook(data);
    } else {
      refImage.current.openModal(imageMook,item.index)
    }
  };

  const deleteImage = () =>{
    console.log(imageMook);
  }

  const shootImage = () =>{
    console.log('Chụpppp');
  }

  const renderItem = (item) => {
    return (
      <View style={styles.itemList}>
        <TouchableOpacity style={styles.imageList} onPress={() => {
          touchImage(item);
        }}>
          <FastImage
            source={item.item.src}
            resizeMode={FastImage.resizeMode.stretch}
            style={{ width: "100%", height: "100%" }}
          />
          {isSetting ? <FastImage
            source={item.item.isChoose ? Images.icRedConfirms : Images.icUnConfirms}
            resizeMode={FastImage.resizeMode.stretch}
            style={styles.iconCheck}
          /> : null}
        </TouchableOpacity>
        <View>
          <Text style={styles.txtItemList}>{item.item.date.toISOString()}</Text>
        </View>
      </View>
    );
  };

  return (
    <View
      style={styles.container}>
      <Header title={String.header_secret_shoot}
              right
              rightIcon={isSetting ? Images.icConfirms : Images.icEdit}
              rightAction={() => {
                setIsSetting(!isSetting);
              }}
      />
      <View style={styles.mainView}>
        <FlatList
          style={{ width: "100%" }}
          data={imageMook}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          numColumns={3}
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
      <PreViewImage ref={refImage}/>
      <LoadingIndicator ref={refLoading} />
    </View>
  );
};
