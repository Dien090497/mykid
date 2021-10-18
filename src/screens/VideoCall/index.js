import {
  ActivityIndicator,
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  Vibration,
  View,
} from 'react-native';
import React, {
  useLayoutEffect,
  useEffect,
  useReducer,
  useRef,
  useState,
} from 'react';

import Consts from '../../functions/Consts';
import Header from '../../components/Header';
import Images from '../../assets/Images';
import LoadingIndicator from '../../components/LoadingIndicator';
import {String} from '../../assets/strings/String';
import VideoCallModal from './VideoCallModal';
import {getListDeviceApi} from '../../network/DeviceService';
import styles from './styles.js';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useSelector} from 'react-redux';
import {
  createVideoCalllApi,
  finishVideoCalllApi,
  rejectVideoCallApi,
} from '../../network/VideoCallService';
import DataLocal from '../../data/dataLocal';
import VideoCallStateModal from './VideoCallStateModal';
import videoCallAction from '../../redux/actions/videoCallAction';
import reduxStore from '../../redux/config/redux';
import Sound from 'react-native-sound';
import {useIsFocused} from '@react-navigation/native';
import {keepScreenAwake} from '../../functions/utils';

const initialState = {
  data: [],
  page: 0,
  loading: true,
  error: null,
  isLoadMore: false,
  isLastPage: false,
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'loading': {
      let {page} = action.payload;
      return {
        ...state,
        error: null,
        loading: !state.data.length || page === Consts.pageDefault,
        isLoadMore: page > Consts.pageDefault,
        isLastPage: false,
      };
    }
    case 'success': {
      const {page} = action.params;
      const {data} = action.payload;
      return {
        data: page === Consts.pageDefault ? data : state.data.concat(data),
        loading: false,
        isLoadMore: false,
        isLastPage: !data.length,
        error: null,
      };
    }
    case 'fail': {
      return {
        ...state,
        error: action.payload,
        loading: false,
        isLoadMore: false,
        isLastPage: false,
      };
    }
  }
};

const ListDeviceScreen = () => {
  const refLoading = useRef();
  const {token} = useSelector(state => state.loginReducer).dataInfo;
  const videoCallReducer = useSelector(state => state.videoCallReducer);
  const [state, dispatch] = useReducer(reducer, initialState);
  const [page, setPage] = useState(0);
  const [presentRoomId, setPresentRoomId] = useState(-1);
  const [videoCallData, setVideoCallData] = useState();

  let isPickUp = false;
  const [visibleCall, setVisibleCall] = useState({
    visible: false,
    server: null,
    data: [],
  });
  const [visibleCallState, setVisibleCallState] = useState({
    visible: false,
    deviceName: 'demo',
    connectionState: '',
    data: [],
  });
  const isFocused = useIsFocused();
  const ringtone = useRef(null);
  const PATTERN = [
    0, 500, 110, 500, 110, 450, 110, 200, 110, 170, 40, 450, 110, 200, 110, 170,
    40, 500,
  ];
  var onEndReachedCalledDuringMomentum = true;
  useEffect(() => {
    if (isFocused) {
      keepScreenAwake();
    } else {
      keepScreenAwake(false);
    }
  }, [isFocused]);

  const getData = async () => {
    try {
      getListDeviceApi(DataLocal.userInfo.id, page, 100, '', 'ACTIVE', {
        success: resData => {
          dispatch({
            type: 'success',
            payload: {data: resData.data},
            params: {page},
          });
        },
        refLoading,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleLoadMore = () => {
    const {isLastPage, isLoadMore} = state;
    if (!onEndReachedCalledDuringMomentum && !isLastPage && !isLoadMore) {
      setPage(prev => prev + 1);
    }
  };

  const onMomentumScrollBegin = () => {
    onEndReachedCalledDuringMomentum = false;
  };

  useLayoutEffect(() => {
    if (!videoCallReducer.connectionData) {
      return;
    }
    setVideoCallData(videoCallReducer.connectionData);
    if (
      presentRoomId === -1 ||
      videoCallReducer.connectionData.id === presentRoomId
    ) {
      if (videoCallReducer.connectionState === 'INIT') {
        setPresentRoomId(videoCallReducer.connectionData.id);
        Vibration.vibrate(PATTERN, true);
        Sound.setCategory('Playback');
        ringtone.current = new Sound('reng.mp3', Sound.MAIN_BUNDLE, error => {
          console.log('error', error);
          ringtone.current.play(() => {});
          ringtone.current.setNumberOfLoops(5);
        });
        setTimeout(() => {
          Vibration.cancel();
          if (ringtone.current) {
            ringtone.current.stop();
          }
        }, 1000 * 32);
        setVisibleCallState({
          visible: true,
          deviceName: videoCallReducer.connectionData.caller.deviceName,
          connectionState: videoCallReducer.connectionState,
          data: videoCallReducer.connectionData,
        });
        // reduxStore.store.dispatch(videoCallAction.reset());
      } else if (videoCallReducer.connectionState === 'REJECTED') {
        setPresentRoomId(-1);
        setVisibleCall({visible: false, device: null, data: []});
        setVisibleCallState({
          visible: true,
          deviceName: videoCallReducer.connectionData.caller.deviceName,
          connectionState: videoCallReducer.connectionState,
          data: videoCallReducer.connectionData,
        });
        reduxStore.store.dispatch(videoCallAction.reset());
      } else {
        setPresentRoomId(-1);
        if (!isPickUp && videoCallReducer.connectionState === 'INIT') {
          setVisibleCallState({
            visible: true,
            deviceName: videoCallReducer.connectionData.caller.deviceName,
            connectionState: videoCallReducer.connectionState,
            data: videoCallReducer.connectionData,
          });
        }
        setVisibleCall({visible: false, device: null, data: []});
        reduxStore.store.dispatch(videoCallAction.reset());
      }
    }
  }, [videoCallReducer]);

  useEffect(() => {
    getData();
  }, [page]);

  useEffect(() => {
    dispatch({type: 'loading', payload: {page}});
  }, [page]);
  const onPressCall = item => () => {
    createVideoCalllApi(
      // DataLocal.deviceId,
      {deviceId: item.deviceId},
      {
        success: res => {
          //show modal call when connected
          setVisibleCall({
            visible: true,
            device: item,
            data: res.data,
          });
          setPresentRoomId(res.data.id);
          setTimeout(() => {
            if (!isPickUp) {
              finishVideoCalllApi({}, res.data.id, {
                success: res => {},
                refLoading: refLoading,
              });
            }
          }, 1000 * 59);
        },
        refLoading: refLoading,
      },
    );
  };

  const pickUp = isAccept => {
    isPickUp = isAccept;
  };
  const toggleModal = roomId => {
    finishVideoCalllApi({}, roomId, {
      success: res => {
        setPresentRoomId(-1);
        setVisibleCallState({
          visible: false,
          deviceName: 'off',
          connectionState: '',
          data: [],
        });
      },
      refLoading: refLoading,
    });
    setVisibleCall({visible: false, device: null, data: []});
  };
  const onCreateVideoCall = item => {
    Vibration.cancel();
    if (ringtone.current) {
      ringtone.current.stop();
    }
    if (videoCallReducer.connectionState === 'INIT') {
      setVisibleCallState({
        visible: false,
        deviceName: 'off',
        connectionState: '',
        data: [],
      });
      setVisibleCall({
        visible: true,
        device: {deviceName: item.caller.deviceName},
        data: item,
      });
    } else {
      createVideoCalllApi(
        // DataLocal.deviceId,
        {deviceId: item.caller.deviceId},
        {
          success: res => {
            //show modal call when connected
            setVisibleCall({
              visible: true,
              device: {
                deviceId: item.caller.deviceId,
                deviceName: item.caller.deviceName,
              },
              data: res.data,
            });
            setPresentRoomId(res.data.id);
            setTimeout(() => {
              if (!isPickUp) {
                finishVideoCalllApi({}, res.data.id, {
                  success: res => {},
                  refLoading: refLoading,
                });
              }
            }, 1000 * 20);
          },
          refLoading: refLoading,
        },
      );
    }
  };
  const toggleModalState = ({connectionState, roomId}) => {
    Vibration.cancel();
    if (ringtone.current) {
      ringtone.current.stop();
    }
    if (connectionState === 'INIT') {
      rejectVideoCallApi({}, roomId, {
        success: res => {
          setPresentRoomId(-1);
          setVisibleCallState({
            visible: false,
            deviceName: 'off',
            connectionState: '',
            data: [],
          });
        },
        refLoading: refLoading,
      });
    } else {
      setVisibleCallState({
        visible: false,
        deviceName: 'off',
        connectionState: '',
        data: [],
      });
    }
  };

  const renderItem = ({item, index}) => (
    <View key={item?.id} activeOpacity={0.5} style={styles.containerDeviceItem}>
      <Text children={item?.deviceName} style={styles.txtNameDevice} />

      <TouchableOpacity
        style={styles.containerPhone}
        onPress={onPressCall(item)}>
        <Image source={Images.icPhone} style={styles.icPhone} />
      </TouchableOpacity>
    </View>
  );

  return (
    <View
      style={[styles.container, {paddingBottom: useSafeAreaInsets().bottom}]}>
      <Header title={String.video_call} />
      <View style={styles.mainView}>
        {!state.loading && !state.error && (
          <FlatList
            style={styles.containerFlatList}
            data={state.data}
            renderItem={renderItem}
            keyExtractor={item => item.id}
            onMomentumScrollBegin={onMomentumScrollBegin}
            handleLoadMore={handleLoadMore}
            ListFooterComponent={
              state.isLoadMore && <ActivityIndicator style={styles.loadMore} />
            }
            ListEmptyComponent={
              <Text
                children={String.device_connected_not_found}
                style={styles.txtNotfound}
              />
            }
          />
        )}
      </View>
      <LoadingIndicator ref={refLoading} />
      {visibleCall.visible && (
        <VideoCallModal
          visible={visibleCall.visible}
          device={visibleCall.device}
          toggleModal={toggleModal}
          pickUp={pickUp}
          data={visibleCall.data}
        />
      )}
      {visibleCallState.visible && (
        <VideoCallStateModal
          connectionState={visibleCallState.connectionState}
          visible={visibleCallState.visible}
          deviceName={visibleCallState.deviceName}
          item={visibleCallState.data}
          toggleModal={toggleModalState}
          createVideoCall={onCreateVideoCall}
        />
      )}
    </View>
  );
};

export default ListDeviceScreen;
