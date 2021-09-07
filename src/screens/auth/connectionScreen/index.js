import React, { useEffect, useState } from "react";
import { View, Text, Linking, TouchableOpacity, FlatList, Image } from "react-native";
import styles from "./style";
import Button from "../../../components/buttonGradient";
import { String } from "../../../assets/strings/String";
import {Colors} from "../../../assets/colors/Colors";

const connectionScreen = ({navigation}) => {
  const onclick = ()=>{
    navigation.navigate('addDeviceScreen')
  };
  return (
    <View style={styles.container}>
      <Button
        onclick={onclick}
        title={String.connection}
        color={Colors.GradientColor}
      />
    </View>
  );
};
export default connectionScreen;
