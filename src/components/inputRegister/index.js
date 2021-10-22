import React, {useEffect, useState} from "react";
import {View, TouchableOpacity, Text, TextInput, Image, Dimensions} from "react-native";
import styles from "./style";
import Images from "../../assets/Images";

const {width} = Dimensions.get("window");
const CustomInput = (navigation) => {
  const {
    value,
    onChangeText,
    number,
    secureTextEntry,
    placeholder,
    notification,
    txtnotification,
    icon,
    onChange,
    maxLength,
    checkKeyboard
  } = navigation;
  return (
    <View style={styles.Sty_ViewInput}>
      <View style={{width: "100%", flexDirection: "row", justifyContent: 'center', alignItems: 'center'}}>
        <TextInput
          placeholder={placeholder}
          placeholderTextColor={"#9D9D9D"}
          secureTextEntry={secureTextEntry ? secureTextEntry : false}
          keyboardType={checkKeyboard ? "number-pad" : "default"}
          onChangeText={(text) => onChangeText(text)}
          underlineColorAndroid={"transparent"}
          maxLength={maxLength ? 11 : 50}
          style={{
            ...styles.Sty_input,
            color: "#000000",
            width: icon ? width * 0.89 - 25 : width * 0.89,
            paddingVertical: !notification ? 4 : 0,
          }}
          disableFullscreenUI
          value={value || ""}
        />
        {
          icon && <TouchableOpacity onPress={onChange}>
            <Image
              style={{...styles.Sty_iconShow}}
              source={secureTextEntry ? Images.icView : Images.icPrivate}/>
          </TouchableOpacity>
        }
      </View>
      {
        notification &&
        <Text style={styles.txtNotification}>{txtnotification}</Text>
      }

    </View>
  );
};
export default CustomInput;
