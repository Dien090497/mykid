import * as React from 'react';
import {View, TouchableOpacity, ImageBackground, Image, Keyboard, Text, SafeAreaView} from 'react-native';
import {styles} from './styles';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Images from '../../assets/Images';
import Consts from '../../functions/Consts';
import {useEffect, useState} from 'react';

export default function BottomTabBar({state, descriptors, navigation}) {
  const insets = useSafeAreaInsets();
  const heightContent = Consts.screenHeight / 20;
  const focusedOptions = descriptors[state.routes[state.index].key].options;
  // const refCustomer = useRef();
  useEffect(() => {
    Keyboard.addListener('keyboardDidShow', _keyboardDidShow);
    Keyboard.addListener('keyboardDidHide', _keyboardDidHide);

    // cleanup function
    return () => {
      // Keyboard.removeListener('keyboardDidShow', _keyboardDidShow);
      // Keyboard.removeListener('keyboardDidHide', _keyboardDidHide);
    };
  }, []);

  const [keyboardStatus, setKeyboardStatus] = useState(undefined);
  const _keyboardDidShow = () => setKeyboardStatus(0);
  const _keyboardDidHide = () => setKeyboardStatus(1);

  if (keyboardStatus === 'Keyboard Shown') return (<></>);
  if (focusedOptions.tabBarVisible === false || focusedOptions.keyboardHidesTabBar == true) {
    return null;
  }
  return (
    keyboardStatus == 0 ? (<></>) : (<SafeAreaView><ImageBackground
      style={[styles.container, {paddingTop: 0}]}
      source={Images.bgBottom} resizeMode={'stretch'}>
      {state.routes.map((route, index) => {
        const {options} = descriptors[route.key];
        const isFocused = state.index === index;
        let icon;
        let text = null;
        if (index == 0) {
          if (isFocused) {
            icon = <View style={styles.bgIcon}><Image source={Images.icHomeOn}
                                                      style={styles.icon}/></View>;
            text = <Text style={{fontWeight: 'bold'}}>HOME</Text>
          } else {
            icon = <View style={styles.bgIcon}><Image source={Images.icHomeOff}
                                                      style={styles.icon}/></View>;
            text = <Text>HOME</Text>
          }
        } else {
          if (isFocused) {
            icon =
              <View style={styles.bgIcon}><Image source={Images.icProfileOn}
                                                 style={styles.icon}/></View>;
            text = <Text style={{fontWeight: 'bold'}}>MY</Text>
          } else {
            icon = <View style={styles.bgIcon}><Image source={Images.icProfileOff}
                                                      style={styles.icon}/></View>;
            text = <Text>MY</Text>
          }
        }
        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
          });
          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <TouchableOpacity
            key={index.toString()}
            accessibilityRole="button"
            accessibilityStates={isFocused ? ['selected'] : []}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={[styles.item, {backgroundColor: index == 0 ? '#13c700' :'#079be6'}]}
          >
            {icon}
            {text}
          </TouchableOpacity>
        );
      })}
    </ImageBackground></SafeAreaView>)
  );
}
