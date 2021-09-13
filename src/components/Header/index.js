import React, {useEffect, useState} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {useNavigation, useNavigationState} from '@react-navigation/native';

import {Colors} from '../../assets/colors/Colors';
import Consts, { FontSize } from '../../functions/Consts';
import {Header as HeaderE} from 'react-native-elements';
import Icons from '../../components/VectorIcons';
import {String} from '../../assets/strings/String';
import {styles} from './styles';
import {useSafeArea} from 'react-native-safe-area-context';

// import Orientation from 'react-native-orientation';
const STT_BAR_STYLE: StatusBarProps = {
  barStyle: 'dark-content',
  translucent: true,
  backgroundColor: 'transparent',
};

export default Header = props => {
  const insets = useSafeArea();
  const navigation = useNavigation();
  const {dangerouslyGetState} = useNavigation();
  const {index, routes} = dangerouslyGetState();
  const [back] = useState(props.back !== undefined ? props.back : true);

  const handleGoBack = () => {
    navigation.goBack();
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
      statusBarProps={STT_BAR_STYLE}
    />
  );
};
