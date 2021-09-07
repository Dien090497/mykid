import React, { useEffect, useState } from "react";
import { View, Text, Linking, TouchableOpacity, Image, ScrollView } from "react-native";
import CustomInput from "../../../components/CustomInput";
import styles from "./style";
import Images from "../../../assets/Images";

const addDeviceScreen = ({ navigation }) => {
  const [user, setUser] = useState("");
  const [nickname, setNickname] = useState("");
  const [relationship, setRelationship] = useState("Bố");
  const [iconRelationship, setIconRelationship] = useState(Images.icFather);

  const onChangeText = (text) => {
    setUser(text);
  };
  const onChangeNickname = (text) => {
    setNickname(text);
  };
  return (
    <View style={styles.contain}>
      <ScrollView>
        <View style={styles.viewImage}>
          <Image
            style={styles.Sty_Images}
            source={Images.icSmartwatch}
          />
        </View>

        <CustomInput
          placeholder={"Nhập mã thiết bị/quét"}
          value={user}
          onPress={() => navigation.navigate("QRCodeScreen")}
          onChangeText={onChangeText}
          icon={Images.icSmartwatch}
        />
        <View style={styles.Sty_information}>
          <Text style={styles.txtInformation}>Thông tin cơ bản</Text>
          <CustomInput
            placeholder={"Biệt danh thiết bị"}
            value={nickname}
            onChangeText={onChangeNickname}
            icon={Images.icUser2}
          />
        </View>
        <TouchableOpacity
          onPress={()=> navigation.navigate('relationship')}
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
      </ScrollView>
    </View>

  );
};
export default addDeviceScreen;
