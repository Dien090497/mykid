import {
  FlatList,
  Image,
  ScrollView,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useLayoutEffect, useRef, useState} from 'react';
import DataLocal from '../../../data/dataLocal';
import Header from '../../../components/Header';
import LoadingIndicator from '../../../components/LoadingIndicator';
import {String} from '../../../assets/strings/String';
import {styles} from './styles';
import {Colors} from '../../../assets/colors/Colors';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {
  getLanguageTimeZoneApi,
  setLanguageTimeZoneApi,
} from '../../../network/LanguageTimeZoneService';
import RadioGroup from '../../../components/RadioGroup';
import Consts from '../../../functions/Consts';

export default function LanguageTimeZone({navigation, route}) {
  const refLoading = useRef();
  const [timeZoneSelect, setTimeZoneSelect] = useState(0);
  const [dataLanguageTimeZones, setDataLanguageTimeZones] = useState({
    timeZone: 0,
  });
  const refRadioGroup = useRef();
  useEffect(() => {
    getLanguageTimeZoneApi(DataLocal.deviceId, {
      success: res => {
        if (res.data) {
          setDataLanguageTimeZones(res.data);
          console.log("getLanguageTimeZoneApi res.data.timeZone",res.data.timeZone )
          refRadioGroup.current.updateView(res.data.timeZone);
        }
      },
      refLoading: refLoading,
    });
  }, []);

  const updateTimeZoneSelect = timeZoneSelect => {
    setTimeZoneSelect(timeZoneSelect);
  };
  const setLanguageTimeZones = () => {
    setLanguageTimeZoneApi(
      DataLocal.deviceId,
      {
        language: dataLanguageTimeZones.language,
        timeZone: timeZoneSelect,
      },
      {
        success: res => {
          alert('Cập nhật múi giờ thành công');
        },
        refLoading: refLoading,
      },
    );
  };
  return (
    <View
      style={[styles.container, {paddingBottom: useSafeAreaInsets().bottom}]}>
      <Header title={String.header_language_timezone} />
      <View style={styles.mainView}>
        <TouchableOpacity
          style={styles.containerAdd}
          onPress={setLanguageTimeZones}>
          <Text style={[styles.txtAdd,{color:Colors.white}]}>{String.confirm}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.containerAdd1}
          // onPress={{}}
          >
          <Text style={[styles.txtAdd,{color:Colors.red}]}>{String.language}</Text>
        </TouchableOpacity>

      </View>
      <ScrollView
        howsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        contentInsetAdjustmentBehavior="automatic"
        style={[
          styles.scrollView,
          {height: (Consts.windowHeight * 55) / 100, width: Consts.windowWidth},
        ]}>
        <View style={[styles.row, {width: Consts.windowWidth}]}>
          <RadioGroup
            ref={refRadioGroup}
            updateTimeZoneSelect={updateTimeZoneSelect}
          />
        </View>
      </ScrollView>

      <LoadingIndicator ref={refLoading} />
    </View>
  );
}
