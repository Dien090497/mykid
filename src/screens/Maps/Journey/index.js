import {
  Alert,
  Animated,
  Image,
  KeyboardAvoidingView,
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {Divider, Icon, Slider, Switch} from 'react-native-elements';
import MapView, {Circle, Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import React, {memo, useCallback, useRef, useState} from 'react';

import Button from '../../../components/buttonGradient';
import {Colors} from '../../../assets/colors/Colors';
import {FontSize} from '../../../functions/Consts';
import Header from '../../../components/Header';
import Images from '../../../assets/Images';
import {String} from '../../../assets/strings/String';
import {showAlert} from '../../../functions/utils';
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
  let title = String.home_journey.toLocaleLowerCase();
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

  const onToggleCreateArea = () => {
    setSafeArea({
      visible: false,
      area: null,
    });
  };

  const onCreate = data => {
    const newListSafeArea = JSON.parse(JSON.stringify(listSafeArea));
    newListSafeArea.push(data);
    setListSafeArea(newListSafeArea);
    onToggleCreateArea();
  };

  const onEdit = data => {
    const index = listSafeArea.findIndex(val => val.id === data?.id);
    if (index !== -1) {
      const newListSafeArea = JSON.parse(JSON.stringify(listSafeArea));
      newListSafeArea[index] = data;
      setListSafeArea(newListSafeArea);
    }
    onToggleCreateArea();
  };

  const onRemove = () => {
    const index = listSafeArea.findIndex(val => val.id === safeArea.area?.id);
    if (index !== -1) {
      const newListSafeArea = JSON.parse(JSON.stringify(listSafeArea));
      newListSafeArea.splice(index, 1);
      setListSafeArea(newListSafeArea);
    }
    onToggleCreateArea();
  };

  const renderBottomSheet = useCallback(() => {
    return (
      <View style={styles.containerBottomSheet}>
        {!safeArea.visible ? (
          listSafeArea.map((val, index) => (
            <View key={val.id}>
              <TouchableOpacity
                onPress={() => setSafeArea({visible: true, area: val})}
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
            </View>
          ))
        ) : (
          <ViewAddOrEditArea
            area={safeArea.area}
            toggle={onToggleCreateArea}
            onCreate={onCreate}
            onEdit={onEdit}
            onRemove={onRemove}
          />
        )}
        {!safeArea.visible && listSafeArea.length < 3 && (
          <Button
            onclick={() => setSafeArea({visible: true, area: null})}
            title={'Thêm vùng an toàn'}
            color={Colors.GradientColor}
            Sty_btn={{
              borderRadius: 6,
              paddingVertical: 0,
            }}
            containerStyle={{height: 40}}
          />
        )}
      </View>
    );
  }, [listSafeArea, safeArea]);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}>
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
    </KeyboardAvoidingView>
  );
};

const ViewAddOrEditArea = ({area, toggle, onCreate, onEdit, onRemove}) => {
  const [name, setName] = useState(area?.name || '');
  const [range, setRange] = useState(area?.radius / 1000 || 0.5);
  const renderIncrementOrDecrement = (type = 'increment', onPress) => {
    return (
      <TouchableOpacity
        onPress={onPress}
        style={[
          styles.containerAction,
          {backgroundColor: type === 'increment' ? Colors.orange : Colors.red},
        ]}>
        <Text
          children={type === 'increment' ? '+' : '-'}
          style={styles.txtAction}
        />
      </TouchableOpacity>
    );
  };

  const onSave = () => {
    if (!name.length) {
      showAlert(String.errorNameArea);
      return;
    }
    if (area) {
      onEdit({
        ...area,
        name,
        radius: range * 1000,
      });
    } else {
      onCreate({
        id: 3,
        name,
        radius: range * 1000,
        status: 'on',
        latitude: 21.000147,
        longitude: 105.8161342,
      });
    }
  };

  return (
    <View s>
      <View style={styles.containerTextInput}>
        <TextInput
          style={styles.wrap}
          clearButtonMode="always"
          placeholder="Tên vùng an toàn"
          maxLength={32}
          value={name}
          onChangeText={text => setName(text)}
        />
        <Text children="Vui lòng nhập 1-32 ký tự" style={styles.txtNote} />
      </View>
      <Divider style={styles.line} />
      <View style={styles.containerTextInput}>
        <Text children={String.area} style={{marginRight: 5}} />
        {renderIncrementOrDecrement('decrement', () =>
          setRange(prev => {
            return parseFloat(prev.toFixed(1)) === 0.1 ? prev : prev - 0.1;
          }),
        )}
        <Slider
          style={{flex: 1, marginHorizontal: 5}}
          value={range}
          onValueChange={value => setRange(value)}
          thumbStyle={styles.thumb}
          thumbProps={{
            children: <View style={styles.thumbCircle} />,
          }}
          step={0.1}
          minimumValue={0.1}
          maximumValue={1}
          trackStyle={{paddingHorizontal: 0}}
          minimumTrackTintColor={Colors.orange}
          maximumTrackTintColor="#b7b7b7"
        />
        {renderIncrementOrDecrement('increment', () =>
          setRange(prev => {
            console.log(prev);
            return parseFloat(prev.toFixed(1)) < 1 ? prev + 0.1 : prev;
          }),
        )}
        <Text children={`${(range * 1000).toFixed(0)} m`} />
      </View>
      <Divider style={styles.line} />
      <View
        style={[
          styles.containerTextInput,
          {justifyContent: 'space-between', marginTop: 4},
        ]}>
        <TouchableOpacity style={styles.containerTextAction} onPress={onSave}>
          <Text children={String.save} style={styles.txtSave} />
        </TouchableOpacity>
        {area && (
          <TouchableOpacity
            style={styles.containerTextAction}
            onPress={onRemove}>
            <Text children={String.member_remove} style={styles.txtBack} />
          </TouchableOpacity>
        )}
        <TouchableOpacity style={styles.containerTextAction} onPress={toggle}>
          <Text children={String.back} style={styles.txtBack} />
        </TouchableOpacity>
      </View>
    </View>
  );
};
