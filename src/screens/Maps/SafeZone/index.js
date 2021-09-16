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
import React, {memo, useCallback, useEffect, useRef, useState} from 'react';
import {
  createSafeZoneApi,
  deleteSafeZoneApi,
  getListSafeZoneApi,
  updateSafeZoneApi,
} from '../../../network/SafeZoneService';
import {
  getCurrentLocation,
  showAlert,
  showConfirmation,
} from '../../../functions/utils';

import Button from '../../../components/buttonGradient';
import {Colors} from '../../../assets/colors/Colors';
import DataLocal from '../../../data/dataLocal';
import {FontSize} from '../../../functions/Consts';
import Geolocation from 'react-native-geolocation-service';
import Header from '../../../components/Header';
import Images from '../../../assets/Images';
import LoadingIndicator from '../../../components/LoadingIndicator';
import {String} from '../../../assets/strings/String';
import styles from './styles';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

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
  const refLoading = useRef(null);
  const [listSafeArea, setListSafeArea] = useState([]);
  const [currentLocation, setCurrentLocation] = useState(null);
  const [safeArea, setSafeArea] = useState({
    visible: false,
    area: null,
    latitude: null,
    longitude: null,
  });
  const [newLocationSafeArea, setNewLocation] = useState(null);

  const getListSafeZone = () => {
    getListSafeZoneApi(DataLocal.deviceId, 1, 30, {
      success: res => {
        setListSafeArea(res.data.content);
      },
      refLoading: refLoading,
    });
  };

  useEffect(() => {
    Geolocation.getCurrentPosition(
      position => {
        var payload = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        };
        setCurrentLocation(payload);
        // setNewLocation({
        //   latitude: position.coords.latitude,
        //   longitude: position.coords.longitude,
        // });
      },
      error => {
        console.log(error, 'error getLocation');
      },
      {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
    );

    getListSafeZone();
  }, []);

  const onToggleStatus = (index, value) => {
    const newListSafeArea = JSON.parse(JSON.stringify(listSafeArea));
    const zone = newListSafeArea[index];
    newListSafeArea[index].status = value ? 'ON' : 'OFF';
    updateSafeZoneApi(DataLocal.deviceId, zone.id, zone, {
      success: res => {
        setListSafeArea(newListSafeArea);
      },
      refLoading: refLoading,
    });
  };

  const onToggleCreateArea = () => {
    setSafeArea({
      visible: false,
      area: null,
    });
  };

  const onCreate = data => {
    const newListSafeArea = JSON.parse(JSON.stringify(listSafeArea));
    createSafeZoneApi(DataLocal.deviceId, data, {
      success: res => {
        newListSafeArea.push(res.data);
        setListSafeArea(newListSafeArea);
        onToggleCreateArea();
      },
      refLoading: refLoading,
    });
  };

  const onEdit = data => {
    const index = listSafeArea.findIndex(val => val.id === data?.id);
    if (index !== -1) {
      const newListSafeArea = JSON.parse(JSON.stringify(listSafeArea));
      newListSafeArea[index] = data;
      const zone = newListSafeArea[index];
      updateSafeZoneApi(DataLocal.deviceId, zone.id, zone, {
        success: res => {
          setListSafeArea(newListSafeArea);
        },
        refLoading: refLoading,
      });
    }
    onToggleCreateArea();
  };

  const onRemove = () => {
    const index = listSafeArea.findIndex(val => val.id === safeArea.area?.id);
    if (index !== -1) {
      showConfirmation(String.confirm_remove_safe_zone, {
        cancelStr: String.back,
        response: () => {
          const newListSafeArea = JSON.parse(JSON.stringify(listSafeArea));
          const zone = newListSafeArea[index];
          deleteSafeZoneApi(DataLocal.deviceId, zone.id, {
            success: res => {
              newListSafeArea.splice(index, 1);
              setListSafeArea(newListSafeArea);
            },
            refLoading: refLoading,
          });
        },
      });
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
                onPress={() => {
                  refMap.current.animateCamera({
                    center: {
                      latitude: val.location.lat,
                      longitude: val.location.lng,
                    },
                    zoom: 15,
                  });
                  setSafeArea({visible: true, area: val});
                }}
                style={styles.rowDirection}>
                <Text children={val.name} style={styles.txtName} />
                <View style={styles.containerRadius}>
                  <Text children={`${val.radius}m`} />
                  <View style={styles.rowDirection}>
                    <Switch
                      value={val.status === 'ON'}
                      color={Colors.blueLight}
                      onValueChange={value => {
                        onToggleStatus(index, value);
                      }}
                    />
                    <Image
                      source={Images.icRightArrow}
                      style={styles.icArrow}
                    />
                  </View>
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
            newLocationSafeArea={newLocationSafeArea}
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
  }, [listSafeArea, safeArea, newLocationSafeArea]);

  useEffect(() => {
    if (newLocationSafeArea) {
      refMap.current.animateCamera({
        center: {
          latitude: newLocationSafeArea.latitude,
          longitude: newLocationSafeArea.longitude,
        },
        zoom: 15,
      });
    }
  }, [newLocationSafeArea]);

  const getRegion = () => {
    var result = initialRegion;
    if (newLocationSafeArea)
      result = {
        ...initialRegion,
        ...newLocationSafeArea,
      };
    else if (!!listSafeArea.length) {
      result = {
        ...initialRegion,
        latitude: listSafeArea[0].location.lat,
        longitude: listSafeArea[0].location.lng,
      };
    }
    return result;
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}>
      <View
        style={[styles.container, {paddingBottom: useSafeAreaInsets().bottom}]}>
        <Header title={headerScreen()} />

        <View style={styles.container}>
          <MapView
            ref={refMap}
            style={styles.container}
            // provider={PROVIDER_GOOGLE}
            onPress={event => {
              const {latitude, longitude} = event.nativeEvent.coordinate;
              if (safeArea.visible && !safeArea.area && latitude && longitude) {
                setNewLocation({
                  latitude,
                  longitude,
                });
              }
            }}
            moveOnMarkerPress
            showsUserLocation={
              !(safeArea.visible && !safeArea.area && currentLocation)
            }
            minZoomLevel={10}
            region={getRegion()}>
            {listSafeArea
              .filter(val => val.status === 'ON')
              .map(val => (
                <View key={val.id}>
                  <Marker
                    coordinate={{
                      latitude: val.location.lat,
                      longitude: val.location.lng,
                    }}
                    title={val.name}
                  />
                  <Circle
                    fillColor={'rgba(160, 214, 253, 0.5)'}
                    center={{
                      latitude: val.location.lat,
                      longitude: val.location.lng,
                    }}
                    radius={(1000 * val.radius) / 1000}
                    strokeColor="#4F6D7A"
                    strokeWidth={0.1}
                  />
                </View>
              ))}
            {safeArea.visible && !safeArea.area && newLocationSafeArea && (
              <>
                <Marker
                  coordinate={newLocationSafeArea}
                  title={'Khu vực an toàn'}
                  draggable
                  onDragEnd={event => {
                    const {latitude, longitude} = event.nativeEvent.coordinate;
                    if (latitude && longitude) {
                      setNewLocation({
                        latitude,
                        longitude,
                      });
                    }
                  }}>
                  <Image
                    source={Images.icWatchMarker}
                    style={styles.icMarker}
                  />
                </Marker>
              </>
            )}
          </MapView>

          {renderBottomSheet()}
          {safeArea.visible && !safeArea.area && (
            <View style={styles.containerNote}>
              <Text
                children={String.note_create_area}
                style={styles.txtNoteDrag}
              />
            </View>
          )}
          {listSafeArea.length === 3 && (
            <View style={styles.containerNote}>
              <Text
                children={String.note_max_length_safe_zone}
                style={styles.txtNoteDrag}
              />
            </View>
          )}
        </View>
      </View>
      <LoadingIndicator ref={refLoading} />
    </KeyboardAvoidingView>
  );
};

const ViewAddOrEditArea = ({
  area,
  toggle,
  onCreate,
  onEdit,
  onRemove,
  newLocationSafeArea,
}) => {
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
        name,
        radius: range * 1000,
        status: 'ON',
        location: {
          lat: newLocationSafeArea.latitude,
          lng: newLocationSafeArea.longitude,
        },
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
        <Text children={String.maxLengthSafeAreaName} style={styles.txtNote} />
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
            return parseFloat(prev.toFixed(1)) < 1 ? prev + 0.1 : prev;
          }),
        )}
        <Text style={{width: 50}} children={`${(range * 1000).toFixed(0)} m`} />
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
