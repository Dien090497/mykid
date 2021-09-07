import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import styles from "./style";

const customButton = ({ title, onChange}) => {
  return (
    <TouchableOpacity
      onPress={onChange}
      style={styles.btnButton}>
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
};
export default customButton;
