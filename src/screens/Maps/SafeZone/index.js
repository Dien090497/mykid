import {
  Image,
  KeyboardAvoidingView, Modal,
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { Slider, Switch} from 'react-native-elements';
import MapView, {Circle, Marker} from 'react-native-maps';
import React, { useCallback, useEffect, useRef, useState} from 'react';
import {
  createSafeZoneApi,
  deleteSafeZoneApi,
  getListSafeZoneApi,
  updateSafeZoneApi,
} from '../../../network/SafeZoneService';
import {Colors} from '../../../assets/colors/Colors';
import DataLocal from '../../../data/dataLocal';
import {FontSize} from '../../../functions/Consts';
import Geolocation from 'react-native-geolocation-service';
import Header from '../../../components/Header';
import Images from '../../../assets/Images';
import LoadingIndicator from '../../../components/LoadingIndicator';
import styles from './styles';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next';
import NotificationModal from '../../../components/NotificationModal';

const initialRegion = {
  latitude: 21.030653,
  longitude: 105.84713,
  latitudeDelta: 0.0922,
  longitudeDelta: 0.0421,
};

export default ({navigation, route}) => {
  const refMap = useRef(null);
  const refLoading = useRef(null);
  const refNotification = useRef(null);
  const [listSafeArea, setListSafeArea] = useState([]);
  const [currentLocation, setCurrentLocation] = useState(null);
  const [safeArea, setSafeArea] = useState({
    visible: false,
    area: null,
    latitude: null,
    longitude: null,
  });
  const [newLocationSafeArea, setNewLocation] = useState(null);
  const [deviceOutSafeZone, setDeviceOutSafeZone] = useState(
    route?.params?.data,
  );
  const [showModal,setShowModal] = useState(false);
  const { t } = useTranslation();

  const getListSafeZone = () => {
    getListSafeZoneApi(DataLocal.deviceId, 1, 30, {
      success: res => {
        setListSafeArea(res.data.content);
      },
      refLoading: refLoading,
      refNotification: refNotification,
    });
  };

  const headerScreen = () => {
    let title = t('common:home_safeArea').toLocaleLowerCase();
    return title.charAt(0).toUpperCase() + title.slice(1);
  };

  useEffect(() => {
    Geolocation.getCurrentPosition(
      position => {
        var payload = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        };
        setCurrentLocation(payload);
        if (deviceOutSafeZone) {
          refMap.current.animateCamera({
            center: {
              latitude: deviceOutSafeZone.location.lat,
              longitude: deviceOutSafeZone.location.lng,
            },
            zoom: 15,
          });
        }
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
      refNotification: refNotification,
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
      refNotification: refNotification,
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
        refNotification: refNotification,
      });
    }
    onToggleCreateArea();
  };

  const onRemove = () => {
    const index = listSafeArea.findIndex(val => val.id === safeArea.area?.id);
    if (index !== -1) {
      const newListSafeArea = JSON.parse(JSON.stringify(listSafeArea));
      const zone = newListSafeArea[index];
      deleteSafeZoneApi(DataLocal.deviceId, zone.id, {
        success: res => {
          newListSafeArea.splice(index, 1);
          setListSafeArea(newListSafeArea);
        },
        refLoading: refLoading,
        refNotification: refNotification,
      });
    }
    setShowModal(false)
    onToggleCreateArea();
  };
  const removeModal =() =>{
    return(
      <Modal
        animationType='fade'
        transparent={true}
        visible={showModal}>
        <View style={styles.modal}>
          <View style={styles.modalContain}>
            <Text style={styles.modalTitle}>{t('common:confirm_remove_safe_zone')}</Text>
            <View style={{flexDirection:'row', alignItems:'center'}}>
              <TouchableOpacity style={[styles.containerTextAction,{borderWidth:1, borderColor: Colors.grayTextColor,marginRight:10}]} onPress={()=>{setShowModal(false)}}>
                <Text children={t('common:back')} style={[styles.txtBack,{color:Colors.black}]} />
              </TouchableOpacity>
              <TouchableOpacity style={[styles.containerTextAction,{backgroundColor:Colors.colorMain,marginLeft:10}]} onPress={onRemove}>
                <Text children={t('common:member_approval')} style={styles.txtSave} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    )
  }

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
                  <Text children={`${val.radius}m`}  style={{fontFamily:'Roboto-Medium'}}/>
                  <View style={{ flexDirection:'row', justifyContent:'center',alignItems:'center'}}>
                    <Switch
                      value={val.status === 'ON'}
                      thumbColor={Colors.white}
                      trackColor={{false: Colors.gray, true: Colors.colorMain}}
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
            </View>
          ))
        ) : (
          <ViewAddOrEditArea
            area={safeArea.area}
            toggle={onToggleCreateArea}
            onCreate={onCreate}
            onEdit={onEdit}
            onRemove={()=>setShowModal(true)}
            newLocationSafeArea={newLocationSafeArea}
          />
        )}
        {!safeArea.visible && listSafeArea.length < 3 && (
          <TouchableOpacity style={styles.btn} onPress={() => setSafeArea({visible: true, area: null})}>
              <Text style={styles.textBtn}>{t('common:palaceHolderSafeZone')}</Text>
          </TouchableOpacity>
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

  const renderCircleMarker = val => {
    return (
      <Circle
        fillColor={'rgba(160, 214, 253, 0.5)'}
        center={{
          latitude: val.location.lat,
          longitude: val.location.lng,
        }}
        radius={(1000 * val.radius) / 1000}
        strokeColor='#4F6D7A'
        strokeWidth={0.1}
      />
    );
  };

  const renderCustomMarker = val => {
    return (
      <Marker
        coordinate={{
          latitude: val.location.lat,
          longitude: val.location.lng,
        }}>
        <View style={styles.containerTitleMarker}>
          <Text
            children={val.name || val.deviceCode}
            style={styles.txtMarkerName}
          />
        </View>

        <Image
          source={val.name ? Images.icMarkerDefault : Images.icWatchMarker}
          style={[
            styles.icMarkerDefault,
            val.name ? {tintColor: Colors.red} : {},
          ]}
          resizeMode='contain'
        />
      </Marker>
    );
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
            {listSafeArea.map(val => (
              <View key={val.id}>{renderCustomMarker(val)}</View>
            ))}
            {listSafeArea
              .filter(val => val.status === 'ON')
              .map(val => (
                <View key={val.id}>{renderCircleMarker(val)}</View>
              ))}
            {deviceOutSafeZone && (
              <>
                {renderCustomMarker(deviceOutSafeZone)}
                <Circle
                  fillColor={'rgba(255, 0, 0, 0.48)'}
                  center={{
                    latitude: deviceOutSafeZone.location.lat,
                    longitude: deviceOutSafeZone.location.lng,
                  }}
                  radius={500}
                  strokeColor='#4F6D7A'
                  strokeWidth={0.1}
                />
              </>
            )}
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
                children={t('common:note_create_area')}
                style={styles.txtNoteDrag}
              />
            </View>
          )}
          {listSafeArea.length === 3 && (
            <View style={styles.containerNote}>
              <Text
                children={t('common:note_max_length_safe_zone')}
                style={styles.txtNoteDrag}
              />
            </View>
          )}
        </View>
      </View>
      {removeModal()}
      <LoadingIndicator ref={refLoading} />
      <NotificationModal ref={refNotification} />
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
  const [range, setRange] = useState(area?.radius || 200);
  const { t } = useTranslation();
  const refNotification = useRef();
  const renderIncrementOrDecrement = (type = 'increment', onPress) => {
    return (
      <TouchableOpacity
        onPress={onPress}
        style={styles.containerAction}>
        <Text
          children={type === 'increment' ? '+' : '-'}
          style={styles.txtAction}
        />
      </TouchableOpacity>
    );
  };

  const onSave = () => {
    if (!name.length) {
      refNotification.current.open(t('common:errorNameArea'));
      return;
    }

    if (area) {
      onEdit({
        ...area,
        name,
        radius: Math.floor(range),
      });
    } else {
      if (!newLocationSafeArea) {
        refNotification.current.open(t('common:errorLocationArea'));
        return;
      }
      onCreate({
        name,
        radius: Math.floor(range),
        status: 'ON',
        location: {
          lat: newLocationSafeArea.latitude,
          lng: newLocationSafeArea.longitude,
        },
      });
    }
  };

  return (
    <View>
      <View style={styles.textInput}>
        <TextInput
          style={styles.wrap}
          clearButtonMode='always'
          maxLength={32}
          value={name}
          onChangeText={text => setName(text)}
        />
        <Text children={t('common:maxLengthSafeAreaName')} style={styles.txtNote} />
      </View>
      <View style={styles.slide}>
        <Text children={t('common:area')} style={{marginRight: 5, color:Colors.colorMain, fontFamily:'Roboto-Medium', fontSize: FontSize.small}} />
        {renderIncrementOrDecrement('decrement', () =>
          setRange(prev => {
            return prev - 100 < 200 ? 200 : prev - 100;
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
          step={1}
          minimumValue={200}
          maximumValue={2000}
          trackStyle={{paddingHorizontal: 0}}
          minimumTrackTintColor={Colors.colorMain}
          maximumTrackTintColor='#b7b7b7'
        />
        {renderIncrementOrDecrement('increment', () =>
          setRange(prev => {
            return prev + 100 <= 2000 ? prev + 100 : 2000;
          }),
        )}
        <Text style={{width: 55, fontFamily:'Roboto-Medium',color:Colors.grayTextColor}} children={`${Math.floor(range).toFixed(0)} m`} />
      </View>
      <View
        style={styles.containerTextInput}>
        <TouchableOpacity style={[styles.containerTextAction,{backgroundColor:Colors.colorMain,marginRight:10}]} onPress={onSave}>
          <Text children={t('common:save')} style={styles.txtSave} />
        </TouchableOpacity>
        {area && (
          <TouchableOpacity
            style={[styles.containerTextAction,{borderWidth:1, borderColor: Colors.colorMain}]}
            onPress={onRemove}>
            <Text children={t('common:member_remove')} style={styles.txtBack} />
          </TouchableOpacity>
        )}
        <TouchableOpacity style={[styles.containerTextAction,{borderWidth:1, borderColor: Colors.grayTextColor,marginLeft:10}]} onPress={toggle}>
          <Text children={t('common:back')} style={[styles.txtBack,{color:Colors.black}]} />
        </TouchableOpacity>
      </View>
      <NotificationModal ref={refNotification} />
    </View>
  );
};
