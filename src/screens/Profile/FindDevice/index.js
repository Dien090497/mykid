import React, { useRef } from 'react';
import {
  View,
  Image,
  Text,
  TouchableOpacity,
} from 'react-native';
import {styles} from './styles';
import Header from '../../../components/Header';
import Images from '../../../assets/Images';
import {String} from '../../../assets/strings/String';
import LoadingIndicator from '../../../components/LoadingIndicator';
import { findWatchsApi } from '../../../network/UserInfoService';
import DataLocal from '../../../data/dataLocal';
import { showAlert } from '../../../functions/utils';

export default function FindDevice({navigation}) {
  const refLoading = useRef();

  const handleFindDevice = async () => {
    await findWatchsApi(DataLocal.deviceId, {
      success: resData => {
        if (resData.data) {
          showAlert(String.sendRequestSuccess);
        }
      },
      refLoading,
    });
  };

  return (
    <View style={styles.contain}>
      <Header title={String.header_findDevice} />
      <View style={styles.container}>
        <Image
            source={Images.icAlarmClock}
            resizeMode={'stretch'}
            style={styles.iconClock}
          />
        <View>
          <Text style={styles.textPlus}>{'Luôn biết vị trí thiết bị mọi thời điểm, mọi vị trí'}</Text>
          <Text style={styles.textPlus}>{'1. Bấm nút để tìm Thiết bị'}</Text>
          <Text style={styles.textPlus}>{'2. Bấm thành công'}</Text>
          <Text style={styles.textPlus}>{'3. Gửi thành công'}</Text>
          <Text style={styles.textPlus}>{'4. Thiết bị sẽ bắt đầu đổ chuông sau khi nhận được yêu cầu'}</Text>
          <Text style={styles.textPlus}>{''}</Text>
        </View>
        <TouchableOpacity style={styles.button} onPress={handleFindDevice}>
          <Text style={styles.buttonText}>{String.header_findDevice}</Text>
        </TouchableOpacity>
      </View>
      <LoadingIndicator ref={refLoading} />
    </View>
  );
}
