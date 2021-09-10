import React from 'react';
import {
  View,
  Image,
  TouchableOpacity,
  Text,
  TextInput as NativeTextInput,
} from 'react-native';
import {styles} from './styles';
import Images from '../../assets/Images';
import {String} from '../../assets/strings/String';
import { showAlert} from '../../functions/utils';
import Consts from '../../functions/Consts';

export default function Profile({navigation}) {
  const handleChangePass = () => {
    navigation.navigate(Consts.ScreenIds.ChangePassword)
  };

  const handleLogout = () => {
    showAlert(String.thisFunctionIsNotValid);
  };

  return (
    <View style={styles.contain}>
      <Header title={String.header_connectDevice} />
      <View style={styles.container}>
        <TouchableOpacity activeOpacity={1} style={styles.rowSettings}>
           <Image source={Images.icUser} resizeMode={'contain'} style={styles.iconSetting}/>
           <Text style={styles.textSettings1}>{'useremail@xxx.xxx'}</Text>
         </TouchableOpacity>
       
        <TouchableOpacity onPress={handleChangePass} style={styles.rowSettings}>
          <Image source={Images.icLock} resizeMode={'contain'}
                  style={styles.iconSetting}/>
          <Text style={styles.textSettings}>{String.changePassword}</Text>
          <Image source={Images.icDetail} resizeMode={'contain'} style={styles.iconDetail}/>
        </TouchableOpacity>
        
        <TouchableOpacity onPress={handleLogout} style={styles.rowSettings}>
          <Image source={Images.icLogout} resizeMode={'contain'}
                  style={styles.iconSetting}/>
          <Text style={styles.textSettings1}>{String.logout}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
