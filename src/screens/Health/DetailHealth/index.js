import {
  Dimensions,
  Image, ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useLayoutEffect, useRef, useState } from 'react';
import { BarChart } from 'react-native-chart-kit';
import Header from '../../../components/Header';
import { Colors } from '../../../assets/colors/Colors';
import { styles } from './styles';
import Images from '../../../assets/Images';
import DatePickerModal from '../../../components/DatePickerModal';
import { createTarget, getTarget, walkingTimeTracking } from '../../../network/HealthService';
import DataLocal from '../../../data/dataLocal';
import NotificationModal from '../../../components/NotificationModal';
import LoadingIndicator from '../../../components/LoadingIndicator';
import { useTranslation } from 'react-i18next';
import ModalConfirmInput from '../../../components/ModalConfirmInput';
import SimpleToast from 'react-native-simple-toast';

export default function Health({ navigation }) {
  const refDate = useRef();
  const refLoading = useRef();
  const refNotification = useRef();
  const refInput = useRef();
  const [tracking, setTracking] = useState({});
  const [listTracking, setListTracking] = useState({});
  const [date, setDate] = useState(new Date());
  const [goals, setGoals] = useState(null);
  const { t } = useTranslation();

  useLayoutEffect(() => {
    const ms = date - 86400000 * 6;
    const startTime = new Date(ms);
    walkingTimeTracking({
      deviceId: DataLocal.deviceId,
      startDate: startTime.toISOString().slice(0, 10),
      endDate: date.toISOString().slice(0, 10),
      page: 0,
      size: 100,
    }, {
      success: res => {
        convertData(res.data);
        if (res.data.length > 0) setTracking(res.data[res.data.length - 1]);
        else setTracking({});
      },
      refLoading,
      refNotification,
    });
    getTarget(DataLocal.deviceId, {
      success: res => {
        setGoals(res.data.steps);
      },
      refLoading,
    });
  }, [date]);

  const changeDate = () => {
    refDate.current.openModal(date,
      (config) => {
        setDate(config);
      });
  };

  const convertData = (arr) => {
    const data = {
      labels: [
        new Date(date - 86400000 * 6).toISOString().slice(5, 10),
        new Date(date - 86400000 * 5).toISOString().slice(5, 10),
        new Date(date - 86400000 * 4).toISOString().slice(5, 10),
        new Date(date - 86400000 * 3).toISOString().slice(5, 10),
        new Date(date - 86400000 * 2).toISOString().slice(5, 10),
        new Date(date - 86400000).toISOString().slice(5, 10),
        date.toISOString().slice(5, 10),
      ],
      datasets: [
        {
          data: [0, 0, 0, 0, 0, 0, 0],
        },
      ],
    };
    data.labels.map((obj, i) => {
      for (const key in arr) {
        if (arr[key].dateTracking.slice(5) === obj){
          data.datasets[0].data[i] = arr[key].steps
        }
      }
    });
    console.log(data)
    setListTracking(data);
  };

  const setTargets = (title, text) => {
    if (parseInt(text) < 1) {
      SimpleToast.show(t('common:error_health1'));
      return;
    }
    if (parseInt(text) > 20000) {
      SimpleToast.show(t('common:error_health2'));
      return;
    }
    createTarget({
      active: true,
      deviceId: DataLocal.deviceId,
      steps: parseInt(text),
    }, {
      success: res => {
        setGoals(res.data.steps);
      },
      refLoading,
      refNotification,
    });
  };
  return (
    <View style={styles.body}>
      <Header title={t('common:header_health')} />
      <ScrollView>
        <View style={styles.main}>
          <TouchableOpacity style={styles.dateBtn} onPress={changeDate}>
            <Text style={styles.txtDate}>{date.toISOString().slice(0, 10)}</Text>
            <Image source={Images.icCalendar} style={styles.iconDate} />
          </TouchableOpacity>
          <View style={styles.chartView}>
            <View style={styles.headerCharView}>
              <Text style={styles.txtHeaderChartView}>{t('common:steps')}</Text>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text style={[styles.txtHeaderChartView, { marginRight: 5 }]}>{(goals ? goals : '0') + '/10000'}</Text>
                <TouchableOpacity style={styles.iconHeaderChartView} onPress={() => {
                  refInput.current.open('', () => {
                  }, 100, true);
                }}>
                  <Image source={Images.icTransport} style={{ height: 30, width: 30 }} />
                </TouchableOpacity>
              </View>
            </View>
            {listTracking.labels && <BarChart
              width={Dimensions.get('window').width * 0.95}
              height={220}
              data={listTracking}
              chartConfig={{
                backgroundColor: '#FFFFFF',
                backgroundGradientFrom: '#fcf7f7',
                backgroundGradientTo: '#fcf7f7',
                color: (opacity = 0.02) => `rgba(238, 0, 51, ${opacity})`,
                labelColor: (opacity = 1) => `rgba(114, 114, 114, ${opacity})`,
                decimalPlaces: 0,
                scrollableDotStrokeWidth: 0,
              }}
              style={{
                marginVertical: 8,
              }}
            />}
          </View>
          <View style={styles.line} />
          <View style={styles.viewBottom}>
            <View style={styles.viewCount}>
              <Image source={Images.icHealthHeart} style={styles.icon} resizeMode={'stretch'} />
              <Text
                style={[styles.txtTop, { color: Colors.greenHealth }]}>{tracking.distance ? tracking.distance : '0'}</Text>
              <Text style={[styles.subTxtTop, { color: Colors.greenHealth }]}>m</Text>
            </View>
            <View style={styles.viewCount}>
              <Image source={Images.icHealthStep} style={styles.iconMid} resizeMode={'stretch'} />
              <Text
                style={[styles.txtTop, { color: Colors.orangeHealth }]}>{tracking.steps ? tracking.steps : '0'}</Text>
              <Text style={[styles.subTxtTop, { color: Colors.orangeHealth }]}>{t('common:step')}</Text>
            </View>
            <View style={styles.viewCount}>
              <Image source={Images.icHealthCalo} style={styles.icon} resizeMode={'stretch'} />
              <Text style={[styles.txtTop, { color: Colors.blueHealth }]}>{tracking.calo ? tracking.calo : '0'}</Text>
              <Text style={[styles.subTxtTop, { color: Colors.blueHealth }]}>{t('common:calo')}</Text>
            </View>
          </View>
        </View>
      </ScrollView>
      <DatePickerModal ref={refDate} />
      <LoadingIndicator ref={refLoading} />
      <NotificationModal ref={refNotification} />
      <ModalConfirmInput
        ref={refInput}
        title={t('common:goals')}
        inputText={t('common:inputNumberOfStep')}
        onPressYes={(title, text) => {
          setTargets(title, text);
        }}
      />
    </View>
  );
}
