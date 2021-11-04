import {
  Dimensions,
  Image, ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useLayoutEffect, useRef, useState } from 'react';
import { BarChart } from 'react-native-chart-kit';
import Header from '../../../components/Header';
import { Colors } from '../../../assets/colors/Colors';
import { styles } from './styles';
import Images from '../../../assets/Images';
import DatePickerModal from "../../../components/DatePickerModal";

export default function Health({ navigation }) {
  const refDate = useRef();

  const data = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'June'],
    datasets: [
      {
        data: [50, 20, 2, 86, 71, 20, 10000],
      },
    ],
  };

  return (
    <View style={styles.body}>
      <Header title={'sức khỏe'} />
      <ScrollView>
        <View style={styles.main}>
          <TouchableOpacity style={styles.dateBtn} onPress={()=>{refDate.current.openModal(new Date(), ()=>{ console.log('123')})}}>
            <Text style={styles.txtDate}>123</Text>
            <Image source={Images.icCalendar} style={styles.iconDate}/>
          </TouchableOpacity>
          <View style={styles.chartView}>
            <View style={styles.headerCharView}>
              <Text style={styles.txtHeaderChartView}>Bước chân</Text>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Text style={[styles.txtHeaderChartView,{marginRight:5}]}>0/10000</Text>
                <View style={styles.iconHeaderChartView}>
                  <Image source={Images.icTransport} style={{height:30, width: 30}}/>
                </View>
              </View>
            </View>
            <BarChart
              width={Dimensions.get('window').width*0.95}
              height={220}
              data={data}
              chartConfig={{
                backgroundColor: '#FFFFFF',
                backgroundGradientFrom: '#fcf7f7',
                backgroundGradientTo: '#fcf7f7',
                color: (opacity = 0.02) => `rgba(238, 0, 51, ${opacity})`,
                labelColor: (opacity = 1) => `rgba(114, 114, 114, ${opacity})`,
                decimalPlaces: 0,
                scrollableDotStrokeWidth: 0
              }}
              style={{
                marginVertical: 8,
              }}
            />
          </View>
          <View style={styles.line}/>
          <View style={styles.viewBottom}>
            <View style={styles.viewCount}>
              <Image source={Images.icHealthHeart} style={styles.icon} resizeMode={'stretch'}/>
              <Text style={[styles.txtTop,{color: Colors.greenHealth}]}>123</Text>
              <Text style={[styles.subTxtTop,{color: Colors.greenHealth}]}>m</Text>
            </View>
            <View style={styles.viewCount}>
              <Image source={Images.icHealthStep} style={styles.iconMid} resizeMode={'stretch'}/>
              <Text style={[styles.txtTop,{color: Colors.orangeHealth}]}>123</Text>
              <Text style={[styles.subTxtTop,{color: Colors.orangeHealth}]}>Bước</Text>
            </View>
            <View style={styles.viewCount}>
              <Image source={Images.icHealthCalo} style={styles.icon} resizeMode={'stretch'}/>
              <Text style={[styles.txtTop,{color: Colors.blueHealth}]}>123</Text>
              <Text style={[styles.subTxtTop,{color: Colors.blueHealth}]}>Calo</Text>
            </View>
          </View>
        </View>
      </ScrollView>
      <DatePickerModal ref={refDate} />
    </View>
  );
}
