import { FlatList, Image, Linking, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";

import Button from "../../../components/buttonGradient";
import {Colors} from "../../../assets/colors/Colors";
import Consts from "../../../functions/Consts";
import Header from '../../../components/Header'
import { String } from "../../../assets/strings/String";
import styles from "./style";

const ConnectionScreen = ({navigation}) => {
  const onclick = ()=>{
    navigation.navigate(Consts.ScreenIds.AddDeviceScreen)
  };
  return (
    <View style={styles.contain}>
      <Header title={String.header_connectDevice} />
      <View style={styles.container}>
        <Text style={styles.txtRegister}>{String.registerSuccess}</Text>
        <Button
          onclick={onclick}
          title={String.connection}
          color={Colors.GradientColor}
        />
      </View>
    </View>
  );
};
export default ConnectionScreen;
