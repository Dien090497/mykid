import {
  Dimensions,
  FlatList,
  Image, Modal, RefreshControl,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useLayoutEffect, useRef, useState } from 'react';
import {
  BarChart,
} from "react-native-chart-kit";
import Header from '../../components/Header';


export default function Health({navigation}) {
  const data = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June'],
    datasets: [{
      data: [
        50,
        20,
        2,
        86,
        71,
        100
      ],
      color: `rgba(134, 65, 244, 1)`
    },{
      data: [
        20,
        10,
        4,
        56,
        87,
        90
      ]
    },{
      data: [
        30,
        90,
        67,
        54,
        10,
        2
      ]
    }]
  }
  return (
    <View>
      <Header title={'sức khỏe'}/>
      <Text>123123213</Text>
      <View>
        <BarChart
          style={{
            marginVertical: 10,
            textAlign: 'center',
            fontSize: 16,
            color: '#fff'
          }}
          data={data}
          width={Dimensions.get('window').width}
          height={220}
          chartConfig={220}
          verticalLabelRotation={30}
        />
      </View>
    </View>
  );
}
