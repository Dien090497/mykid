import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import React, { useLayoutEffect, useState } from "react";

import Button from "../../../components/buttonGradient";
import { Colors } from "../../../assets/colors/Colors";
import Consts from "../../../functions/Consts";
import CustomInput from "../../../components/CustomInput";
import Header from "../../../components/Header";
import Images from "../../../assets/Images";
import { String } from '../../../assets/strings/String';
import styles from "./style";

const AddDeviceScreen = ({ navigation }) => {
  const [user, setUser] = useState("");
  const [nickname, setNickname] = useState("");
  const [relationship, setRelationship] = useState("Bố");
  const [iconRelationship, setIconRelationship] = useState(Images.icFather);
  const [submitActive, setSubmitActive] = useState(false);

  useLayoutEffect(() => {
    if (user && nickname) {
      setSubmitActive(true)
    }
  }, [user, nickname]);

  const onChangeText = (text) => {
    setUser(text);
  };
  const onChangeNickname = (text) => {
    setNickname(text);
  };
  const addDevice = () => {
    if (!submitActive) return;
    navigation.navigate(Consts.ScreenIds.Tabs);
  };
  return (
    <View style={styles.contain}>
      <Header title={String.header_addDevice} />
      <ScrollView style={{paddingHorizontal: 10}}>
        <View style={styles.viewImage}>
          <Image
            style={styles.Sty_Images}
            source={Images.icSmartwatch}
          />
        </View>

        <CustomInput
          placeholder={"Nhập mã thiết bị/quét"}
          value={user}
          onPress={() => navigation.navigate(Consts.ScreenIds.QRCodeScreen)}
          onChangeText={onChangeText}
          icon={Images.icSmartwatch}
        />
        <View style={styles.Sty_information}>
          <Text style={styles.txtInformation}>{String.genneralInfo}</Text>
          <CustomInput
            placeholder={"Biệt danh thiết bị"}
            value={nickname}
            onChangeText={onChangeNickname}
            icon={Images.icUser2}
          />
        </View>
        <TouchableOpacity
          onPress={()=> navigation.navigate(Consts.ScreenIds.Relationship)}
          style={styles.Sty_select}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Image
            style={styles.Sty_iconUser}
            source={iconRelationship}
          />
            <Text style={styles.txtRelationship}>Tôi là <Text style={{color: '#000000',fontSize: 16, fontWeight:'bold'}}>{relationship}</Text> của anh ấy</Text>
          </View>
          <Image
            style={[{...styles.Sty_icon, right:0 }]}
            source={Images.icon_arrow_up}
          />
        </TouchableOpacity>

        <View style={styles.viewButton}>
          <Button
            activeOpacity={submitActive ? 0 : 1}
            onclick={addDevice}
            title={String.registrationConfirmation}
            color={submitActive ? Colors.GradientColor : Colors.GradientColorGray}
          />
        </View>
      </ScrollView>
    </View>

  );
};
export default AddDeviceScreen;
