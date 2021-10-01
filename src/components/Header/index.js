import React, {useState} from 'react';
import {Text, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import {Colors} from '../../assets/colors/Colors';
import Consts, { FontSize } from '../../functions/Consts';
import {Header as HeaderE} from 'react-native-elements';
import Icons from '../../components/VectorIcons';
import {String} from '../../assets/strings/String';
import {styles} from './styles';

export default Header = props => {
  const navigation = useNavigation();
  const {dangerouslyGetState} = useNavigation();
  const {index, routes} = dangerouslyGetState();
  const [back] = useState(props.back !== undefined ? props.back : true);

  const handleGoBack = () => {
    if (index > 0 && routes[index - 1].name === Consts.ScreenIds.Splash) {
      navigation.replace(Consts.ScreenIds.Auth);
    } else {
      navigation.goBack();
    }
  };

  return (
    <HeaderE
      placement="center"
      containerStyle={styles.container}
      leftComponent={
        back && (
          <TouchableOpacity style={styles.back} onPress={handleGoBack}>
            <Icons
              name={'arrow-back'}
              iconFamily={'MaterialIcons'}
              size={FontSize.xxxtraBig}
              color={Colors.white}
            />
          </TouchableOpacity>
        )
      }
      centerComponent={
        <Text style={styles.title}>
          {props.title !== undefined ? props.title : String.bangSepHang}
        </Text>
      }
      statusBarProps={{
        barStyle: 'dark-content',
        translucent: true,
        backgroundColor: 'transparent',
      }}
    />
  );
};
