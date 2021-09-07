import React, { useEffect, useState } from "react";
import { View, Text, Linking, TouchableOpacity, FlatList, Image } from "react-native";
import styles from "./style";
import LinearGradient from "react-native-linear-gradient";

const buttonGradient = ({ title, color, onclick, Sty_btn, txtColor}) => {
  return (
    <TouchableOpacity style={styles.btnGradient} onPress={onclick}>
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
