import React, {useEffect, useState} from "react";
import {View, TouchableOpacity, Text, TextInput, Image} from "react-native";
import styles from "./style";
import Images from "../../assets/Images";
import {Colors} from "../../assets/colors/Colors";

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
    show
  } = navigation;
  return (
    <View style={styles.Sty_ViewInput}>
      <View style={{width: "88%", flexDirection: "row", justifyContent: 'center', alignItems: 'center'}}>
        <TextInput
          placeholder={placeholder}
          placeholderTextColor={Colors.grayTextTitleColor}
          secureTextEntry={secureTextEntry ? secureTextEntry : false}
          keyboardType={number ? "numeric" : "default"}
          onChangeText={(text) => onChangeText(text)}
          underlineColorAndroid={"transparent"}
          maxLength={maxLength ? maxLength : 50}
          style={{
            ...styles.Sty_input,
            color: "#000000",
            paddingVertical: !notification ? 4 : 0,
          }}
          disableFullscreenUI
          value={value || ""}
        />
        {
          icon && show !== false ?
            (
              <TouchableOpacity onPress={onChange} style={{justifyContent: 'flex-end', position: 'absolute', right: -10}}>
              <Image
                style={{...styles.Sty_iconShow}}
                source={Images.icView}
              />
            </TouchableOpacity>
            ) : null
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
