import React, { useEffect, useState } from "react";
import { View, Text, Linking, TouchableOpacity, FlatList, Image } from "react-native";
import styles from "./style";
import Button from "../../../components/buttonGradient";
import { String } from "../../../assets/strings/String";
import {Colors} from "../../../assets/colors/Colors";
import Consts from "../../../functions/Consts";

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
