import React, { useEffect, useState } from "react";
import { View, TouchableOpacity, Text, TextInput, Image } from "react-native";
import styles from "./style";
import Images from "../../assets/Images";

const CustomInput = ({title, value, onChangeText, number, secureTextEntry, onPress, icon, placeholder, Sty_input}) => {
  return (
    <View style={{...styles.Sty_ViewInput, ...Sty_input}}>
      {icon &&  <Image
        style={styles.Sty_icon}
        source={icon} />
      }
      {
        title && <Text>{title}</Text>
      }
      <TextInput
        placeholder={placeholder}
        placeholderTextColor={"#9D9D9D"}
        secureTextEntry={secureTextEntry ? secureTextEntry : false}
        keyboardType={number ? "numeric" : "default"}
        onChangeText={(text) => onChangeText(text)}
        underlineColorAndroid={"transparent"}
        style={{ ...styles.Sty_input, color: "#000000" }}
        disableFullscreenUI
        value={value || ""}
      />
      {
        onPress &&
        <TouchableOpacity
          onPress={onPress}
        >
          <Image
            style={styles.Sty_icon}
            source={Images.materialIcons} />
        </TouchableOpacity>}
    </View>
  );
};
export default CustomInput;
