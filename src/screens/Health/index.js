import {
  Dimensions,
  FlatList,
  Image, Modal, RefreshControl, ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useLayoutEffect, useRef, useState } from "react";
import Header from "../../components/Header";
import { Colors } from "../../assets/colors/Colors";
import { styles } from "./styles";
import Images from "../../assets/Images";


export default function Health({ navigation }) {

  return (
    <View style={styles.body}>
      <Header title={"sức khỏe"} />
      <View style={{flexDirection:'row', justifyContent:'center', width: '100%'}}>
        <View style={styles.viewCount}>
          <Image source={Images.icTransport} style={styles.icon} resizeMode={'stretch'}/>
          <Text>123</Text>
          <Text>m</Text>
        </View>
        <View style={styles.viewCount}>
          <Image source={Images.icTransport} style={styles.icon} resizeMode={'stretch'}/>
          <Text>123</Text>
          <Text>m</Text>
        </View>
        <View style={styles.viewCount}>
          <Image source={Images.icTransport} style={styles.icon} resizeMode={'stretch'}/>
          <Text>123</Text>
          <Text>m</Text>
        </View>
      </View>
    </View>
  );
}
