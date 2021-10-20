import { FlatList, Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useRef, useState } from "react";

import Header from "../../components/Header";
import LoadingIndicator from "../../components/LoadingIndicator";
import { String } from "../../assets/strings/String";
import { styles } from "./styles";
import Images from "../../assets/Images";
import FastImage from "react-native-fast-image";
import PreViewImage from "./PreviewImage";
import { DoSecretShoot } from "../../network/SecretPhotoShootService";
import DataLocal from "../../data/dataLocal";
import ActionSheet from "@alessiocancian/react-native-actionsheet";
import ModalConfirm from "../../components/ModalConfirm";

export default ({ navigation }) => {
  const refLoading = useRef();
  const refImage = useRef();
  const refConfirm = useRef();
  const [isSetting, setIsSetting] = useState(false);
  let sheet = null;
  const [imageMook, setImageMook] = useState([
    {
      id: 1,
      src: 'https://www.codeproject.com/KB/GDI-plus/ImageProcessing2/img.jpg?w=144',
      isChoose: false,
      date: new Date(),
    },
    {
      id: 2,
      src: 'https://images.unsplash.com/photo-1508919801845-fc2ae1bc2a28?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8aW1nfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&w=1000&q=80',
      isChoose: false,
      date: new Date(),
    },
    {
      id: 3,
      src: 'https://images.prismic.io/mystique/5d7c09b9-40e5-4254-ae1c-2c1cb59aa898_IMG3.jpg?auto=compress,format',
      isChoose: false,
      date: new Date(),
    },
    {
      id: 4,
      src: 'http://www.imgworlds.com/wp-content/uploads/2016/04/img-worlds-of-adventure-new-low.jpg',
      isChoose: false,
      date: new Date(),
    },
    {
      id: 5,
      src: 'https://res.klook.com/images/fl_lossy.progressive,q_65/c_fill,w_1295,h_720/w_80,x_15,y_15,g_south_west,l_klook_water/activities/ype8x0zkqbv239asgx9p/C%C3%B4ngVi%C3%AAnGi%E1%BA%A3iTr%C3%ADIMGWorldsofAdventure.jpg',
      isChoose: false,
      date: new Date(),
    },
    {
      id: 6,
      src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTTkfqSS3HXpmwsCw9o7Va2X5AOKe1fZ1RHyQ&usqp=CAU',
      isChoose: false,
      date: new Date(),
    },
    {
      id: 7,
      src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYI8AEKvGxJDd_v5MePWAjOC-FGTnl2C8ETw&usqp=CAU',
      isChoose: false,
      date: new Date(),
    },
    {
      id: 8,
      src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS8K8xAqYJPCg-thTg7wye3Im1-pXE0R3mkPw&usqp=CAU',
      isChoose: false,
      date: new Date(),
    },
    {
      id: 9,
      src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSwx4wK3n7yfMbrUt4OwOg4NkzpM_B9STQLag&usqp=CAU',
      isChoose: false,
      date: new Date(),
    },
    {
      id: 10,
      src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTeGxXAc_WUPBI9t7XX5Fq9Up3wNL1hZew4hA&usqp=CAU',
      isChoose: false,
      date: new Date(),
    },
    {
      id: 11,
      src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT3b44SiI8YNwuRwWiu313vZa8UIjjaEaI_cA&usqp=CAU',
      isChoose: false,
      date: new Date(),
    },
    {
      id: 12,
      src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQ4muDMMy55GhJJ3VlnjI5-dTwzeJxgDg2uQ&usqp=CAU',
      isChoose: false,
      date: new Date(),
    },
    {
      id: 13,
      src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQZc9Jx1K9dGjSl5YtTGVtkR8MaIFNtCYhJlw&usqp=CAU',
      isChoose: false,
      date: new Date(),
    },
    {
      id: 14,
      src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRaOozW9XX9wkRs4nAe0K9DMzIO_0qq54_0WQ&usqp=CAU',
      isChoose: false,
      date: new Date(),
    },
    {
      id: 15,
      src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSBNh1ud6Y-mvQSpQf1_eKurPyr8AQinTIc9Q&usqp=CAU',
      isChoose: false,
      date: new Date(),
    },
    {
      id: 16,
      src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSbJqAw1eXY_Bs2K3Ze5NDxQeRA6znQTlZykA&usqp=CAU',
      isChoose: false,
      date: new Date(),
    },
    {
      id: 17,
      src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcREDA75AfMu-DtlqZCR34T59ipm3R7azGxHUg&usqp=CAU',
      isChoose: false,
      date: new Date(),
    },
    {
      id: 18,
      src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7KpUvb7pED3OyE6MakTBxX1W1rI_rd2yqoQ&usqp=CAU',
      isChoose: false,
      date: new Date(),
    },
    {
      id: 19,
      src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS4IUo_CTu-wIhjUPXxwzPqq1rRY-lONhqTUw&usqp=CAU',
      isChoose: false,
      date: new Date(),
    },
    {
      id: 20,
      src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRwSA6W7w2EY2Z817RMFqVhrJtom2sdlccMgg&usqp=CAU',
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

  const deleteImage = () => {
    console.log(imageMook);
  };

  const shootImage = () => {
    DoSecretShoot(
      DataLocal.deviceId,{
        success: data =>{
          console.log(data)
        },
        refLoading
      }
    )
  };

  const action = () =>{
    return(
      <ActionSheet options={[String.delete,'Lưu ảnh',String.cancel]}
                   onPress={handleImageAction}
                   cancelButtonIndex={2}
                   ref={o => sheet = o}
      />
    )
  }

  const handleImageAction = async (index) => {
    switch (index){
      case 0:
        refConfirm.current.open('Ban co muon xoa?', ()=>{console.log('Xoa')})
        break;
      case 1:
        console.log('345');
        break;
    }
  }

  const renderItem = (item) => {
    return (
      <View style={styles.itemList}>
        <TouchableOpacity style={styles.imageList} onPress={()=>{touchImage(item)}} onLongPress={()=>{sheet.show(item)}}>
          <FastImage
            source={{uri:item.item.src}}
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
          style={{ width: "100%", flex:1 }}
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
      {action()}
      <PreViewImage ref={refImage}/>
      <ModalConfirm ref={refConfirm} />
      <LoadingIndicator ref={refLoading} />
    </View>
  );
};
