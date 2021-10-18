import React, {useState} from 'react';
import {Image, Text, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import {Colors} from '../../assets/colors/Colors';
import Consts, { FontSize } from '../../functions/Consts';
import {Header as HeaderE} from 'react-native-elements';
import Icons from '../../components/VectorIcons';
import {styles} from './styles';

export default Header = props => {
  const navigation = useNavigation();
  const {dangerouslyGetState} = useNavigation();
  const {index, routes} = dangerouslyGetState();
  const [back] = useState(props.back !== undefined ? props.back : true);
  const [right] = useState(props.right !== undefined ? props.right : false);

  const handleGoBack = () => {
    if (index > 0 && routes[index - 1].name === Consts.ScreenIds.Splash) {
      navigation.replace(Consts.ScreenIds.Auth);
    } else {
      navigation.goBack();
    }
  };

  const handleRightAction = () => {
    props.rightAction();
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
      rightComponent={
        right && (
          <TouchableOpacity style={styles.back} onPress={handleRightAction}>
            { props.rightIcon &&
            <Image style={styles.iconRight} source={props.rightIcon}/>
            }
          </TouchableOpacity>
        )
      }
      centerComponent={
        <Text style={styles.title} numberOfLines={1}>
          {props.title}
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
