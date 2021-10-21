import React, { useEffect, useRef, useState } from "react";
import {
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { styles } from "./styles";
import Header from "../../../../components/Header";
import { String } from "../../../../assets/strings/String";
import LoadingIndicator from "../../../../components/LoadingIndicator";
import { TimePicker } from "react-native-wheel-picker-android";
import { Colors } from "../../../../assets/colors/Colors";
import { showAlert } from "../../../../functions/utils";

export default function DoNotDisturb({ navigation, route }) {
  const refLoading = useRef();
  const [config, setConfig] = useState({
    deviceId: null,
    from: null,
    number: null,
    period: null,
    status: null,
    to: null,
  });
  const [dayOfWeeks, setDayOfWeeks] = useState([
    { day: "CN", value: 1, isOn: route.params.config.period[0] ==='1' ? true : false },
    { day: "T2", value: 2, isOn: route.params.config.period[1] ==='1' ? true : false },
    { day: "T3", value: 3, isOn: route.params.config.period[2] ==='1' ? true : false },
    { day: "T4", value: 4, isOn: route.params.config.period[3] ==='1' ? true : false },
    { day: "T5", value: 5, isOn: route.params.config.period[4] ==='1' ? true : false },
    { day: "T6", value: 6, isOn: route.params.config.period[5] ==='1' ? true : false },
    { day: "T7", value: 7, isOn: route.params.config.period[6] ==='1' ? true : false },
  ]);

  useEffect(() => {
    const splitFrom = route.params.config.from.split(":");
    const from = new Date();
    from.setHours(Math.floor(splitFrom[0]));
    from.setMinutes(Math.floor(splitFrom[1]));
    from.setSeconds(0);
    const splitTo = route.params.config.to.split(":");
    const to = new Date();
    to.setHours(Math.floor(splitTo[0]));
    to.setMinutes(Math.floor(splitTo[1]));
    to.setSeconds(0);
    setConfig({
      deviceId: route.params.config.deviceId,
      from: from,
      number: route.params.config.number,
      period: route.params.config.period,
      status: route.params.config.status,
      to: to,
    });
  }, []);

  const getMinutes = () => {
    let minutes = [];
    for (let i = 0; i < 60; i++) {
      minutes.push(i < 10 ? "0" + i.toString() : i.toString());
    }
    return minutes;
  };

  const onFromSelected = (timeSelect) => {
    let timeFrom = timeSelect;
    timeFrom.setSeconds(0);
    setConfig({
      deviceId: config.deviceId,
      from: timeFrom,
      number: config.number,
      period: config.period,
      status: config.status,
      to: config.to,
    });
  };

  const onToSelected = (timeSelect) => {
    let timeTo = timeSelect;
    timeTo.setSeconds(0);
    setConfig({
      deviceId: config.deviceId,
      from: config.from,
      number: config.number,
      period: config.period,
      status: config.status,
      to: timeTo,
    });
  };

  const toggleDay = (day, i) => {
    const days = Object.assign([], dayOfWeeks);
    days[i].isOn = !days[i].isOn;
    setDayOfWeeks(days);
  };

  const onSubmit = () => {
    const data = {};
    if (config.to <= config.from) {
      showAlert(String.timeInvalidNote);
      return;
    }
    data.deviceId = config.deviceId;
    if (config.from instanceof Date && config.to instanceof Date) {
      const hoursFrom = config.from.getHours() < 10 ? "0" + config.from.getHours() : config.from.getHours();
      const minuteFrom = config.from.getMinutes() < 10 ? "0" + config.from.getMinutes() : config.from.getMinutes();
      const hoursTo = config.to.getHours() < 10 ? "0" + config.to.getHours() : config.to.getHours();
      const minuteTo = config.to.getMinutes() < 10 ? "0" + config.to.getMinutes() : config.to.getMinutes();
      data.from = hoursFrom + ":" + minuteFrom;
      data.to = hoursTo + ":" + minuteTo;
    }
    data.number = config.number;
    data.status = "ON";
    data.period = "";
    dayOfWeeks.map((item, i) => {
      item.isOn ? data.period = data.period + "1" : data.period = data.period + "0";
    });
    if (data.period === "0000000") {
      showAlert(String.selectAtLeastOneDay);
      return;
    }
    route.params.saveConfig(data);
    navigation.goBack();
  };

  return (
    <View style={styles.contain}>
      <Header title={String.header_doNotDisturb} />
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.body}>
            <View style={[styles.viewTime, Platform.OS !== "ios" ? { height: 150, paddingTop: 20 } : {}]}>
              {config.from &&
              <TimePicker format24
                          initDate={config.from}
                          minutes={getMinutes()}
                          indicatorColor={Colors.indicatorColor}
                          onTimeSelected={onFromSelected} />}
            </View>
            <View style={[styles.viewSub, Platform.OS !== "ios" ? { height: "100%" } : {}]}>
              <View style={styles.txtSub} />
            </View>
            <View style={[styles.viewTime, Platform.OS !== "ios" ? { height: 150, paddingTop: 20 } : {}]}>
              {config.to &&
              <TimePicker format24
                          initDate={config.to}
                          minutes={getMinutes()}
                          onTimeSelected={onToSelected}
                          indicatorColor={Colors.indicatorColor} />}
            </View>
          </View>
          <View style={styles.customView}>
            <View style={styles.titleCustom}>
              <Text style={[styles.txtMode]}>{String.custom}</Text>
            </View>
            <View style={{ flexDirection: "row", marginVertical: 5 }}>
              {dayOfWeeks.map((day, i) => (
                <TouchableOpacity key={day.day}
                                  style={[styles.viewDay, dayOfWeeks[i].isOn === true ? { backgroundColor: Colors.colorMain } : {}]}
                                  onPress={() => {
                                    toggleDay(day, i);
                                  }}
                >
                  <Text style={styles.txtDay}>{day.day}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
          <TouchableOpacity style={styles.button} onPress={onSubmit}>
            <Text style={styles.buttonText}>{String.confirm}</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <LoadingIndicator ref={refLoading} />
    </View>
  );
}