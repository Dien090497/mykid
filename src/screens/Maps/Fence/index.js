import {Divider, Switch} from 'react-native-elements';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import MapView, {Circle, Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import React, {memo, useCallback, useRef, useState} from 'react';

import {Colors} from '../../../assets/colors/Colors';
import {FontSize} from '../../../functions/Consts';
import Header from '../../../components/Header';
import Images from '../../../assets/Images';
import {String} from '../../../assets/strings/String';
import styles from './styles';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

const mockData = [
  {
    id: 1,
    name: 'Đi học',
    radius: 1000,
    status: 'on',
    latitude: 21.0070253,
    longitude: 105.843136,
  },
  {
    id: 2,
    name: 'Đi chơi',
    radius: 700,
    status: 'on',
    latitude: 21.0067305,
    longitude: 105.8181346,
  },
];

const initialRegion = {
  latitude: 21.030653,
  longitude: 105.84713,
  latitudeDelta: 0.0922,
  longitudeDelta: 0.0421,
};

const headerScreen = () => {
  let title = String.home_safeArea.toLocaleLowerCase();
  return title.charAt(0).toUpperCase() + title.slice(1);
};

export default ({}) => {
  const refMap = useRef(null);
  const [listSafeArea, setListSafeArea] = useState(mockData);
  const [safeArea, setSafeArea] = useState({
    visible: false,
    area: null,
  });

  const onToggleStatus = (index, value) => {
    const newListSafeArea = JSON.parse(JSON.stringify(listSafeArea));
    newListSafeArea[index].status = value ? 'on' : 'off';
    setListSafeArea(newListSafeArea);
  };

  const renderBottomSheet = useCallback(() => {
    console.log(safeArea)
    return (
      <View style={styles.containerBottomSheet}>
        {!safeArea.visible ? (
          listSafeArea.map((val, index) => (
            <>
              <TouchableOpacity
                onPress={() => setSafeArea({visible: true, area: val})}
                key={val.id}
                style={styles.rowDirection}>
                <Text children={val.name} style={styles.txtName} />
                <Text children={`${val.radius}m`} />
                <View style={styles.rowDirection}>
                  <Switch
                    value={val.status === 'on'}
                    color={Colors.blueLight}
                    onValueChange={value => {
                      onToggleStatus(index, value);
                    }}
                  />
                  <Image source={Images.icRightArrow} style={styles.icArrow} />
                </View>
              </TouchableOpacity>
              <Divider style={styles.line} />
            </>
          ))
        ) : (
          <ViewAddOrEditArea area={safeArea} />
        )}
      </View>
    );
  }, [listSafeArea, safeArea]);

  return (
    <View
      style={[styles.container, {paddingBottom: useSafeAreaInsets().bottom}]}>
      <Header title={headerScreen()} />

      <MapView
        ref={refMap}
        style={styles.container}
        // provider={PROVIDER_GOOGLE}
        showsUserLocation={true}
        region={initialRegion}>
        {listSafeArea
          .filter(val => val.status === 'on')
          .map(val => (
            <>
              <Marker coordinate={val} title={val.name} />
              <Circle
                fillColor={'rgba(160, 214, 253, 0.5)'}
                center={val}
                radius={(1000 * val.radius) / 1000}
                strokeColor="#4F6D7A"
                strokeWidth={0.1}
              />
            </>
          ))}
      </MapView>

      {renderBottomSheet()}
    </View>
  );
};

const ViewAddOrEditArea = ({area}) => {
  return <View></View>;
};
