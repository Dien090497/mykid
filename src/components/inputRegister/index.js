import React, {useEffect, useState} from "react";
import {View, TouchableOpacity, Text, TextInput, Image, Dimensions} from "react-native";
import styles from "./style";
import Images from "../../assets/Images";
import {ScaleHeight} from "../../functions/Consts";

const {width} = Dimensions.get("window");
const CustomInput = (navigation) => {
  const {
    value,
    onChangeText,
    number,
    secureTextEntry,
    placeholder,
    notification,
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
          secureTextEntry={secureTextEntry ? secureTextEntry : !secureTextEntry}
          keyboardType={checkKeyboard ? "number-pad" : "default"}
          onChangeText={(text) => onChangeText(text)}
          underlineColorAndroid={"transparent"}
          maxLength={maxLength ? 12 : 20}
          style={{
            ...styles.Sty_input,
            color: "#000000",
            width: width * 0.88,
            height: ScaleHeight.medium,
            marginLeft: 10,
          }}
          disableFullscreenUI
          value={value || ""}
        />
        {
          icon && <TouchableOpacity onPress={onChange} style={{position: 'absolute', right: 10}}>
            <Image
              style={{...styles.Sty_iconShow}}
              source={secureTextEntry ? Images.icView : Images.icPrivate}/>
          </TouchableOpacity>
        }
      </View>

    </View>
  );
};
export default CustomInput;
