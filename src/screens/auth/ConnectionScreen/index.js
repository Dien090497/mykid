import { FlatList, Image, Linking, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";

import Button from "../../../components/buttonGradient";
import {Colors} from "../../../assets/colors/Colors";
import Consts from "../../../functions/Consts";
import Header from '../../../components/Header'
import { String } from "../../../assets/strings/String";
import styles from "./style";
import Images from "../../../assets/Images";

const ConnectionScreen = ({navigation}) => {
  const onclick = ()=>{
    navigation.navigate(Consts.ScreenIds.AddDeviceScreen)
  };
  return (
    <View style={styles.contain}>
      <Header title={String.register} back={false} />
      <View style={styles.container}>
        <Text style={styles.txtRegister}>{String.registerSuccess}</Text>
        <Image source={Images.icRegister} style={styles.icon} resizeMode='stretch'/>
        <TouchableOpacity
          style={styles.btnRegister}
          onPress={onclick}>
          <Text style={styles.textRegister}>{String.connection}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default ConnectionScreen;
