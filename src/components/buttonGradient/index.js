import { FlatList, Image, Linking, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";

import LinearGradient from "react-native-linear-gradient";
import styles from "./style";

const buttonGradient = ({ title, color, onclick, Sty_btn, txtColor, activeOpacity, containerStyle}) => {
  return (
    <TouchableOpacity style={[styles.btnGradient, containerStyle]} onPress={onclick} activeOpacity={activeOpacity ? activeOpacity : 0}>
      <LinearGradient
        start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}
        colors={color?color:["#4c669f", "#3b5998", "#192f6a"]}
        style={{...styles.linearGradient, ...Sty_btn}}>
        <Text style={{...styles.buttonText, color: txtColor?txtColor : "#fff"}}>
          {title}
        </Text>
      </LinearGradient>
    </TouchableOpacity>
  );
};
export default buttonGradient;
