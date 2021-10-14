import React, { useEffect, useState } from "react";
import { View, TouchableOpacity, Text, TextInput, Image } from "react-native";
import styles from "./style";
import Images from "../../assets/Images";

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
    maxLength
  } = navigation;
  return (
    <View style={styles.Sty_ViewInput}>
      <View style={{width: "88%", flexDirection: "row", justifyContent: 'center', alignItems: 'center'}}>
        <TextInput
          placeholder={placeholder}
          placeholderTextColor={"#9D9D9D"}
          secureTextEntry={secureTextEntry ? secureTextEntry : false}
          keyboardType={number ? "numeric" : "default"}
          onChangeText={(text) => onChangeText(text)}
          underlineColorAndroid={"transparent"}
          maxLength={maxLength ? maxLength : 50}
          style={{
            ...styles.Sty_input,
            color: "#000000",
            width: icon ? "90%" : "100%",
            paddingVertical: !notification ? 4 : 0,
          }}
          disableFullscreenUI
          value={value || ""}
        />
        {
          icon && <TouchableOpacity onPress={onChange}>
            <Image
              style={{ ...styles.Sty_iconShow }}
              source={secureTextEntry ? Images.icView : Images.icPrivate} />
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
