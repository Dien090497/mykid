import {
  Dimensions,
  FlatList,
  Image, Modal, RefreshControl, ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useLayoutEffect, useRef, useState } from "react";
import { BarChart } from "react-native-chart-kit";
import Header from "../../../components/Header";
import { Colors } from "../../../assets/colors/Colors";


export default function Health({ navigation }) {

  const data = {
    labels: ["January", "February", "March", "April", "May", "June", "123"],
    datasets: [
      {
        data: [50, 20, 2, 86, 71, 20, 10000],
      },
    ],
  };

  return (
    <View>
      <Header title={"sức khỏe"} />
      <View style={{alignItems: 'center', backgroundColor: Colors.white}}>
        <BarChart
          width={Dimensions.get("window").width*0.95}
          height={220}
          data={data}
          chartConfig={{
            backgroundColor: "#FFFFFF",
            backgroundGradientFrom: "#FFFFFF",
            backgroundGradientTo: "#FFFFFF",
            color: (opacity = 1) => `rgba(238, 0, 51, ${opacity})`,

          }}
          style={{
            marginVertical: 8,
          }}
        />

        {/*<StackedBarChart*/}
        {/*  style={{*/}
        {/*    marginVertical: 8,*/}
        {/*  }}*/}
        {/*  data={data}*/}
        {/*  width={Dimensions.get("window").width}*/}
        {/*  height={220}*/}
        {/*  chartConfig={{*/}
        {/*    backgroundColor: "#FFFFFF",*/}
        {/*    backgroundGradientFrom: "#FFFFFF",*/}
        {/*    backgroundGradientTo: "#FFFFFF",*/}
        {/*    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,*/}
        {/*    fromNumber: 10000*/}
        {/*  }}*/}
        {/*  fromZero={true}*/}
        {/*  fromNumber={10000}*/}
        {/*  yLabelsOffset={-10}*/}
        {/*/>*/}
      </View>
    </View>
  );
}
