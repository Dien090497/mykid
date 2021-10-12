import { FlatList, Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useRef, useState } from "react";

import {showAlert} from "../../functions/utils";
import Header from "../../components/Header";
import LoadingIndicator from "../../components/LoadingIndicator";
import { String } from "../../assets/strings/String";
import { styles } from "./styles";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import DataLocal from '../../data/dataLocal';

export default ({ navigation }) => {
  const refLoading = useRef();

  return (
    <View
      style={[styles.container, { paddingBottom: useSafeAreaInsets().bottom }]}>
      <Header title={String.header_secret_shoot} />
      <View style={styles.mainView}>
        <FlatList/>
        <View>
          <TouchableOpacity>
            <Text>{String.textShot}</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text>{String.delete}</Text>
          </TouchableOpacity>
        </View>
      </View>
      <LoadingIndicator ref={refLoading} />
    </View>
  );
};
