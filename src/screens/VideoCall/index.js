import {
  ActivityIndicator,
  Alert,
  FlatList,
  Image,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useLayoutEffect, useEffect, useReducer, useRef, useState} from 'react';
import {
  hideLoading,
  parseTokenToObject,
  showAlert,
  showLoading,
} from '../../functions/utils';

import Consts from '../../functions/Consts';
import Header from '../../components/Header';
import Images from '../../assets/Images';
import LoadingIndicator from '../../components/LoadingIndicator';
import {String} from '../../assets/strings/String';
import VideoCallModal from './VideoCallModal';
import {getListDeviceConnected} from '../../network/DeviceService';
import styles from './styles.js';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useSelector} from 'react-redux';
import {
  createVideoCalllApi,
  finishVideoCalllApi,
} from '../../network/VideoCallService';
import DataLocal from '../../data/dataLocal';
import JanusVideoRoomScreen from './JanusVideoRoomScreen';
import VideoCallStateModal from './VideoCallStateModal';

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
  const connectionData = useSelector((state) => state.videoCallReducer.connectionData);
  const [state, dispatch] = useReducer(reducer, initialState);
  const [page, setPage] = useState(0);
  const [videoCallData, setVideoCallData] = useState();
  const [visibleCall, setVisibleCall] = useState({
    visible: false,
    server: null,
    data: [],
  });
  const [visibleCallState, setVisibleCallState] = useState({
    visible: false,
    deviceName: 'demo'
  });
  var onEndReachedCalledDuringMomentum = true;

  const getData = async () => {
    try {
      const user = parseTokenToObject(token);
      showLoading(refLoading);
      const res = await getListDeviceConnected({page, accountId: user?.id});
      dispatch({
        type: 'success',
        payload: {data: res.success.data},
        params: {page},
      });
      hideLoading(refLoading);
    } catch (error) {
      hideLoading(refLoading);
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
    console.log('connectionData');
    if (connectionData.includes('"status":"INIT"')) 
    {
      showAlert('có cuộc gọi tới', {
        close: () => {
          setVisibleCallState({
            visible: true,
            deviceName: 'demo'
          });
        },
      });
    } else if (connectionData.includes('"status":"REJECT"')) 
    {
      showAlert('Cuộc gọi bị hủy/ người dùng bận', {
        close: () => {
          setVisibleCallState({
            visible: true,
            deviceName: 'demo'
          });
        },
      });
    } else
    {
      showAlert('Cuộc gọi kết thúc', {
        close: () => {
          setVisibleCallState({
            visible: true,
            deviceName: 'demo'
          });
        },
      });
    }

    setVideoCallData(connectionData);
  }, [connectionData])

  useEffect(() => {
    getData();
  }, [page]);

  useEffect(() => {
    dispatch({type: 'loading', payload: {page}});
  }, [page]);

  const onPressCall = item => () => {
    // Demo show
    // setVisibleCallState({
    //   visible: true,
    //   deviceName: 'demo'
    // });
    createVideoCalllApi(
      // DataLocal.deviceId,
      {deviceId: item.deviceId},
      {
        success: res => {
          //show modal call when connected
          console.log('TNT ', res);
          setVisibleCall({
            visible: true,
            device: item,
            data: res.data,
          });
        },
        refLoading: refLoading,
      },
    );
  };

  const toggleModal = roomId => {
    finishVideoCalllApi({}, roomId, {
      success: res => {
        setVisibleCall({visible: false, device: null, data: []});
      },
      refLoading: refLoading,
    });
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
          data={visibleCall.data}
        />
      )}
      {visibleCallState.visible && (
        <VideoCallStateModal
          visible={visibleCallState.visible}
          deviceName={visibleCallState.deviceName}
          toggleModal={() => {setVisibleCallState({visible: false, deviceName: 'off'});}}
        />
      )}
    </View>
  );
};

export default ListDeviceScreen;
