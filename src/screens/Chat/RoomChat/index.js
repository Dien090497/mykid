import React, { useLayoutEffect, useRef, useState } from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {styles} from './styles';
import { ActionSheetCustom } from '@alessiocancian/react-native-actionsheet';
import FastImage from 'react-native-fast-image';
import Header from '../../../components/Header';
import LoadingIndicator from '../../../components/LoadingIndicator';
import DataLocal from '../../../data/dataLocal';
import { Image } from 'react-native';
import Images from '../../../assets/Images';
import Consts from '../../../functions/Consts';
import { hideLoading, resizeImage, showLoading } from '../../../functions/utils';
import RecorderComponent from '../../../components/RecorderComponent';
import Spinner from 'react-native-spinkit';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import { checkCameraPermission, checkPhotoLibraryReadPermission, checkPhotoLibraryWritePermission } from '../../../functions/permissions';
import AudioPlayerComponent from '../../../components/AudioPlayerComponent';
import CameraRoll from '@react-native-community/cameraroll';
import { Tooltip } from 'react-native-elements';
import { Colors } from '../../../assets/colors/Colors';
import XmppClient from '../../../network/xmpp/XmppClient';
import { useSelector } from 'react-redux';
import AppConfig from '../../../data/AppConfig';
import RNFetchBlob from 'react-native-fetch-blob';
import { getListDeviceApi } from '../../../network/DeviceService';
import { useTranslation } from 'react-i18next';
import NotificationModal from "../../../components/NotificationModal";
import SimpleToast from 'react-native-simple-toast';

export default function RoomChat({navigation, route}) {
  const refLoading = useRef();
  const refNotification = useRef();
  const refRecorder = useRef();
  const refAudioPlayer = useRef();
  const refScrollView = useRef();
  const refTextInput = useRef();
  const [isRecord, setIsRecord] = useState(true);
  const [isRecording, setIsRecording] = useState(false);
  const [isCancelRecording, setIsCancelRecording] = useState(false);
  const [chatHistory, setChatHistory] = useState([]);
  const [text, setText] = useState();
  const [locationY, setLocationY] = useState();
  const [indexPlaying, setIndexPlaying] = useState(-1);
  const [roomInfo, setRoomInfo] = useState();
  const [isLock, setIsLock] = useState(false);
  const [listMember, setListMember] = useState([]);
  const chatReducer = useSelector(state => state.chatReducer);
  const [timerCount, setTimerCount] = useState();
  const { t } = useTranslation();
  let sheet = null;
  let recordTimeout = null;

  const dataMock = [
    {
      name: 'Bố',
      icon: Images.icFather,
      relationship: 'FATHER'
    },
    {
      name: 'Mẹ',
      icon: Images.icMother,
      relationship: 'MOTHER'
    },
    {
      name: 'Ông',
      icon: Images.icGrandfather,
      relationship: 'GRANDFATHER'
    },
    {
      name: 'Bà',
      icon: Images.icGrandmother,
      relationship: 'GRANDMOTHER'
    },
    {
      name: 'Anh',
      icon: Images.icBrother,
      relationship: 'BROTHER'
    },
    {
      name: 'Chị',
      icon: Images.icSister,
      relationship: 'SISTER'
    },
    {
      icon: Images.icOther,
      relationship: 'OTHER'
    },
  ];

  useLayoutEffect(() => {
    focusTextInput();
  }, [refTextInput]);

  useLayoutEffect(() => {
    if (chatReducer.dataInfo && roomInfo) {
      setChatHistory(chatReducer.dataInfo[roomInfo.roomAddress]);

      setTimeout(() => {
        refScrollView.current.scrollToEnd({animated: true});
      }, 500);
    }
  }, [chatReducer]);

  useLayoutEffect(() => {
    if (!isRecord)
      focusTextInput();
  }, [isRecord]);

  useLayoutEffect(() => {
    if (route.params && route.params.roomInfo) {
      setRoomInfo(route.params.roomInfo);
      XmppClient.setRoomId(route.params.roomInfo.roomAddress);
      setChatHistory(XmppClient.getCurrentHistory());
      XmppClient.joinRoom(route.params.roomInfo.roomAddress);
    }
    setTimeout(() => {
      refScrollView.current.scrollToEnd({animated: true});
    }, 500);

    return ()=>{
      refAudioPlayer.current.onStopPlay();
    }
  }, []);

  useLayoutEffect(() => {
    if (roomInfo) {
      getListDevice();
    }
  }, [roomInfo]);

  const getListDevice = () => {
    getListDeviceApi(roomInfo.type === 'FAMILY' ? null : DataLocal.userInfo.id, 0, 100, roomInfo.type === 'FAMILY' ? roomInfo.deviceId : '', 'ACTIVE', {
      success: res => {
        setListMember(res.data);
      },
      refLoading,
      refNotification,
    });
  };

  const focusTextInput = () => {
    if (refTextInput && refTextInput.current) {
      Platform.OS === 'ios'
        ? refTextInput.current.focus()
        : setTimeout(() => refTextInput.current.focus(), 30);
    }
  };

  const toggleRecord = (state) => {
    setIsRecord(state);
  };

  const togglePlay = (obj, index) => {
    try {
      if (obj.audio) {
        if (!obj.isError) {
          setIndexPlaying(index);
          refAudioPlayer.current.onStartPlay(obj.audio);
        } else {
          SimpleToast.show(t('errorMsg:playAudioFail'));
        }
        return;
      }

      const appendExt = obj.body.split('.');
      showLoading(refLoading);
      RNFetchBlob
        .config({
          fileCache : true,
          appendExt : appendExt[appendExt.length - 1]
        })
        .fetch('GET', obj.body)
        .then((res) => {
          const lst = Object.assign([], chatHistory);
          lst[index].isError = parseInt(res.respInfo.headers['Content-Length'], 0) < 100;
          lst[index].audio = 'file://' + res.path();
          setChatHistory(lst);

          hideLoading(refLoading);
          if (!lst[index].isError) {
            setIndexPlaying(index);
            refAudioPlayer.current.onStartPlay(lst[index].audio);
          } else {
            SimpleToast.show(t('errorMsg:playAudioFail'));
          }
        })
    } catch (e) {
      setIndexPlaying(-1);
    }

  };

  const sendMsg = () => {
    if (isLock || text === '') return;
    Keyboard.dismiss();
    setIsLock(true);
    XmppClient.sendMessage('text', text);
    setText('');
    setTimeout(() => {
      setIsLock(false);
    }, 5000);
  }

  const selectPhoto = () => {
    Keyboard.dismiss();
    sheet.show();
  }

  const gotoDeleteMessage = () => {
    navigation.navigate(Consts.ScreenIds.DeleteMessage, {roomInfo: roomInfo});
  };

  const onResponderStart = async (e) => {
    setLocationY(e.nativeEvent.pageY);
    setIsRecording(true);
    await refRecorder.current._record();
    setTimerCount(getTime());
    recordTimeout = setTimeout(() => {
      if (recordTimeout && refRecorder.current && getTime() - timerCount >= 14) {
        setIsRecording(false);
        refRecorder.current._stop().then();
      }
    }, 15000)
  }

  const getTime = () => {
    return Math.floor(Date.now() / 1000);
  };

  const onResponderMove = async (e) => {
    setIsCancelRecording(locationY - e.nativeEvent.pageY > 80);
  }

  const onResponderRelease = async (e) => {
    setIsRecording(false);
    await refRecorder.current._stop();
  }

  const onStopRecord = (url) => {
    clearTimeout(recordTimeout);
    setIsRecording(false);
    setTimerCount(getTime());
    if (getTime() - timerCount < 2) {
      SimpleToast.show(t('errorMsg:recordingFail'));
    } else {
      showLoading(refLoading);
      XmppClient.requestSendFile(url);
      hideLoading(refLoading);
    }
  };

  const onStopPlayer = () => {
    setIndexPlaying(-1);
  };

  const recordBackListener = (e) => {
    console.log('recordBackListener: ', e);
  };

  const resizeImg = (imagePickerResponse) => {
    if (imagePickerResponse.uri) {
      showLoading(refLoading);
      resizeImage(imagePickerResponse).then(uri => {
        XmppClient.requestSendFile(uri)
        hideLoading(refLoading);
      });
    }
  };

  const handleImageAction = async (index) => {
    const photosGranted = await checkPhotoLibraryWritePermission();
    switch (index) {
      case 0:
        const granted = await checkPhotoLibraryReadPermission();
        if (granted && photosGranted) {
          launchImageLibrary({
            mediaType: 'photo',
          }, resp => {
            resizeImg(resp);
          });
        }
        break;
      case 1:
        const cameraGranted = await checkCameraPermission();
        if (cameraGranted && photosGranted) {
          launchCamera({
            mediaType: 'photo',
            cameraType: 'front',
            saveToPhotos: false,
          }, resp => {
            resizeImg(resp);
          });
        }
        break;
    }
  }

  const isMe = (obj) => {
    return roomInfo.type === 'FAMILY' ? obj.from === `${DataLocal.userInfo.id}@${AppConfig.dev.rootDomain}`
            : obj.from === roomInfo.deviceId;
  };

  const saveImage = (obj) => {
    if (Platform.OS === 'ios') {
      CameraRoll.save(obj.body)
      .then(SimpleToast.show(t('common:savePictureSuccess')))
      .catch(err => SimpleToast.show(t('common:savePictureFail')))
    } else {
      RNFetchBlob
        .config({
          fileCache : true,
          appendExt : 'jpg'
        })
        .fetch('GET', obj.body)
        .then((res) => {
          CameraRoll.saveToCameraRoll(res.path())
            .then((res) => {
              SimpleToast.show(t('common:savePictureSuccess'))
            }).catch((error) => {
              SimpleToast.show(t('common:savePictureFail'))
            })

        })
        .catch(err => {
          SimpleToast.show(t('common:savePictureFail'))
          console.log('err:', err)
        });
    }
  }

  const getName = (obj) => {
    if (roomInfo.type === 'FAMILY') {
      const uid = obj.from.split('@')[0];
      if (uid === 'terminal_mykid' && roomInfo.deviceName) {
        return roomInfo.deviceName;
      }
      const mems = listMember.filter(mem => mem.accountId.toString() === uid);
      if (mems.length > 0) {
        if (mems[0].relationship === 'OTHER') return mems[0].relationshipName;
        const relationship = dataMock.filter(val => val.relationship === mems[0].relationship);
        if (relationship.length > 0) return relationship[0].name;
      }
      return uid;
    } else {
      const mems = listMember.filter(mem => mem.deviceCode.toString() === obj.from);
      if (mems.length > 0) {
        if (roomInfo.deviceId === null) {
          const info = Object.assign({}, roomInfo);
          info.deviceId = obj.from;
          setRoomInfo(info);
        }
        return mems[0].deviceName;
      }
      return t('common:friend');
    }
  };

  const getIcon = (obj) => {
    if (roomInfo.type === 'FAMILY') {
      const uid = obj.from.split('@')[0];
      if (uid === 'terminal_mykid' && roomInfo.avatar) {
        return {uri: roomInfo.avatar}
      }
      const mems = listMember.filter(mem => mem.accountId.toString() === uid);
      if (mems.length > 0) {
        const relationship = dataMock.filter(val => val.relationship === mems[0].relationship);
        return relationship.length > 0 ? relationship[0].icon : dataMock[6].icon;
      }
      return dataMock[6].icon;
    } else {
      const mems = listMember.filter(mem => mem.deviceCode.toString() === obj.from);
      if (mems.length > 0) {
        if (roomInfo.deviceId === null) {
          const info = Object.assign({}, roomInfo);
          info.deviceId = obj.from;
          setRoomInfo(info);
        }
        return {uri: mems[0].avatar};
      }
      return dataMock[6].icon;
    }
  };

  const gotoHomeScreen = () => {
    if (DataLocal.haveSim === '0') {
        navigation.navigate(Consts.ScreenIds.Tabs)
    }
  }

  return (
    <KeyboardAvoidingView style={styles.contain}
      behavior={Platform.OS === 'ios' ? 'padding' : ''}>
      {roomInfo && roomInfo.type === 'FAMILY' &&
      <Header title={ `${roomInfo.deviceName || ''} ${t('common:familyGroup')} (${listMember.length})`}
       right rightIcon={Images.icGroup} rightAction={() => {gotoDeleteMessage()}}/>}
      {roomInfo && roomInfo.type !== 'FAMILY' &&
      <Header title={`${t('common:talkWithFriends')} (${roomInfo.roomName || '0'})`}/>}
      <View style={styles.container}>
        <ScrollView ref={refScrollView} style={styles.container}>
          {chatHistory && chatHistory.map((obj, i) => (
          <View key={i}>
            { obj.isShowDate &&
              <View style={[styles.viewItem, {flexDirection: 'row', justifyContent: 'center'}]}>
                <Text style={styles.textDate}>{obj.date}</Text>
              </View>
            }
            <View style={[styles.viewItem, !isMe(obj) ? {flexDirection: 'row'} : {flexDirection: 'row-reverse'}]}>
              <View style={styles.viewImg}>
                <FastImage source={getIcon(obj)} style={styles.icAvatar} resizeMode={FastImage.resizeMode.stretch} />
              </View>
              <View style={styles.viewContent}>
                {(!isMe(obj) || roomInfo.type !== 'FAMILY') &&
                <Text style={[styles.txtTitle, isMe(obj) ? { textAlign: 'right' } : {}]}>{getName(obj)}</Text>}
                {obj.type !== 'image' &&
                <View style={{ flexDirection: !isMe(obj) ? 'row' : 'row-reverse' }}>
                  <View style={[styles.viewContentDetail, !isMe(obj) ? {} : { backgroundColor: Colors.pinkBgMsg }]}>
                    {isMe(obj) ? <View style={{ flexDirection: 'row' }}>
                      {!!obj.duration && <View style={{alignItems: 'flex-end', justifyContent:'flex-end'}}><Text>{obj.duration.toString() + '"'}</Text></View>}
                      {obj.type === 'audio' &&
                      <TouchableOpacity onPress={() => {
                        togglePlay(obj, i);}}>
                        <FastImage
                          source={!isMe(obj) ? (indexPlaying === i ? Images.aAudioLeft : Images.icAudioLeft) : (indexPlaying === i ? Images.aAudioRight : Images.icAudioRight)}
                          resizeMode={FastImage.resizeMode.cover}
                          style={styles.icAudio} />
                      </TouchableOpacity>}
                    </View> : <View style={{ flexDirection: 'row' }}>
                      {obj.type === 'audio' &&
                      <TouchableOpacity onPress={() => {
                        togglePlay(obj, i);}}>
                        <FastImage
                          source={!isMe(obj) ? (indexPlaying === i ? Images.aAudioLeft : Images.icAudioLeft) : (indexPlaying === i ? Images.aAudioRight : Images.icAudioRight)}
                          resizeMode={FastImage.resizeMode.cover}
                          style={styles.icAudio} />
                      </TouchableOpacity>}
                      {!!obj.duration && <View style={{alignItems: 'flex-end', justifyContent:'flex-end'}}><Text>{obj.duration.toString() + '"'}</Text></View>}
                    </View>}
                    {obj.type === 'text' && <Text style={styles.textBody}>{obj.body}</Text>}
                    <Text style={styles.textTime}>{obj.time}</Text>
                  </View>
                </View>}
                {obj.type === 'image' &&
                <Tooltip toggleAction={'onLongPress'} popover={
                  <View style={styles.viewTooltip}
                        onStartShouldSetResponder={(e) => {
                          saveImage(obj);
                          return false;
                        }}>
                    <Text>{t('common:savePicture')}</Text>
                  </View>
                }>
                  <View style={{ flexDirection: !isMe(obj) ? 'row' : 'row-reverse' }}>
                    <View style={[styles.viewContentDetail, !isMe(obj) ? {} : { backgroundColor: Colors.pinkBgMsg }]}>
                      <FastImage resizeMode={FastImage.resizeMode.cover} source={{ uri: obj.body }}
                                 style={styles.icPhoto} />
                      <Text style={styles.textTime}>{obj.time}</Text>
                    </View>
                  </View>
                </Tooltip>
                }
              </View>
            </View>
          </View>
          ))}
        </ScrollView>
        { roomInfo && roomInfo.type === 'FAMILY' &&
        <View style={styles.viewBottom}>
          <TouchableOpacity style={styles.viewImg} onPress={() => {toggleRecord(!isRecord)}}>
            <Image source={isRecord ? Images.icKeyboard: Images.icRecord} style={isRecord ? styles.icKeyboard : styles.icRecord}/>
          </TouchableOpacity>
          <View style={styles.viewContent}>
            {isRecord ?
            <View style={styles.toInput}
              onStartShouldSetResponder={() => {return true;}}
              onResponderStart={(e) => {onResponderStart(e)}}
              onResponderMove={(e) => {onResponderMove(e)}}
              onResponderRelease={(e) => {onResponderRelease(e)}}
              onResponderTerminate={(e) => {onResponderRelease(e)}}>
              <Text style={styles.txtInput}>{t('common:holdAndTalk')}</Text>
            </View>
            :
            <View style={styles.toInput}>
              <TextInput
                numberOfLines={1}
                maxLength={160}
                autoCompleteType={'off'}
                importantForAutofill={'off'}
                autoCorrect={false}
                underlineColorAndroid={'transparent'}
                style={styles.textInput}
                disableFullscreenUI
                value={text}
                placeholder={'...'}
                onChangeText={txt => setText(txt)}
                ref={refTextInput}
              />
            </View>
            }
          </View>
          <TouchableOpacity activeOpacity={isLock ? 1 : 0} style={styles.viewImg} onPress={isRecord ? selectPhoto : sendMsg}>
            <Image source={isRecord ? Images.icCamera : Images.icSend}
              style={isRecord ? styles.icCamera : isLock ? [styles.icSend, {opacity: 0.3}] : styles.icSend}/>
          </TouchableOpacity>
        </View>
        }
      </View>
      { isRecording &&
      <View style={{
        position: 'absolute',
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <View style={{
          padding: 10,
          paddingTop: Platform.OS === 'ios' ? 150 : 180,
          paddingLeft: 12,
          borderRadius: 5,
          width: 150,
          height: 150,
          justifyContent: 'center',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
        }}>
          <Image source={isCancelRecording ? Images.icCancelRecord : Images.icMicrophone}
            style={isCancelRecording ? styles.icCancelRecord : styles.icMicrophone}/>
          {isCancelRecording ? <View style={{marginBottom: 120, marginTop: -10, height: 70}}/> :
          <Spinner style={{marginBottom: 120, marginTop: Platform.OS === 'ios' ? -20 : -10, height: 70, marginLeft: Platform.OS === 'ios' ? 30 : 35}} isVisible={true} size={60} type={'ThreeBounce'} color={'white'}/>}
        </View>
      </View>}
      <LoadingIndicator ref={refLoading}/>
      <NotificationModal ref={refNotification} goBack={gotoHomeScreen}/>
      <RecorderComponent ref={refRecorder} onStopRecord={onStopRecord} recordBackListener={recordBackListener}/>
      <AudioPlayerComponent ref={refAudioPlayer} onStopPlayer={onStopPlayer}/>
      <ActionSheetCustom
        ref={o => sheet = o}
        title={t('common:selectPhoto')}
        options={[
          <Text style={{fontSize: 18, fontFamily: 'Roboto', color: Colors.grayTextColor}}>{t('common:selectPhotoLibrary')}</Text>,
          <Text style={{fontSize: 18, fontFamily: 'Roboto', color: Colors.grayTextColor}}>{t('common:takePhoto')}</Text>,
          <Text style={{fontSize: 18, fontFamily: 'Roboto', color: Colors.colorMain}}>{t('common:cancel')}</Text>,
        ]}
        cancelButtonIndex={2}
        onPress={handleImageAction}
      />
    </KeyboardAvoidingView>
  );
}
