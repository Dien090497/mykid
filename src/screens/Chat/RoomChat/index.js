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
import ActionSheet from '@alessiocancian/react-native-actionsheet';
import FastImage from 'react-native-fast-image';
import Header from '../../../components/Header';
import LoadingIndicator from '../../../components/LoadingIndicator';
import DataLocal from '../../../data/dataLocal';
import { Image } from 'react-native';
import Images from '../../../assets/Images';
import Consts from '../../../functions/Consts';
import { hideLoading, resizeImage, showLoading } from '../../../functions/utils';
import { String } from '../../../assets/strings/String';
import RecorderComponent from '../../../components/RecorderComponent';
import Spinner from 'react-native-spinkit';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import { checkCameraPermission, checkPhotoLibraryReadPermission, checkPhotoLibraryWritePermission } from '../../../functions/permissions';
import AudioPlayerComponent from '../../../components/AudioPlayerComponent';
import CameraRoll from '@react-native-community/cameraroll';
import { Tooltip } from 'react-native-elements';
import { Colors } from '../../../assets/colors/Colors';
import XmppClient from '../../../components/XmppChat/XmppClient';
import { useSelector } from 'react-redux';
import AppConfig from '../../../data/AppConfig';
import RNFetchBlob from 'react-native-fetch-blob';

export default function RoomChat({navigation, route}) {
  const refLoading = useRef();
  const refRecorder = useRef();
  const refAudioPlayer = useRef();
  const refScrollView = useRef();
  const refTextInput = useRef();
  const [isRecord, setIsRecord] = useState(true);
  const [isRecording, setIsRecording] = useState(false);
  const [isCancelRecording, setIsCancelRecording] = useState(false);
  const [chatHistory, setChatHistory] = useState();
  const [text, setText] = useState();
  const [locationY, setLocationY] = useState();
  const [indexPlaying, setIndexPlaying] = useState(-1);
  const chatReducer = useSelector(state => state.chatReducer);
  let sheet = null;
  
  useLayoutEffect(() => {
    focusTextInput();
  }, [refTextInput]);
  
  useLayoutEffect(() => {
    if (chatReducer.dataInfo) {
      console.log(chatReducer.dataInfo);
      setChatHistory(chatReducer.dataInfo);
    }
  }, [chatReducer]);

  useLayoutEffect(() => {
    if (!isRecord)
      focusTextInput();
  }, [isRecord]);

  useLayoutEffect(() => {
    if (route.params && route.params.roomInfo) {
      const roomAddress = route.params.roomInfo.roomAddress;
      XmppClient.joinRoom(roomAddress);
      XmppClient.getHistory(roomAddress, 50);
    }
    
  }, []);

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

  const togglePlay = (url, index) => {
    try {
      RNFetchBlob
        .config({
          fileCache : true,
          appendExt : 'm4a'
        })
        .fetch('GET', url)
        .then((res) => {
          console.log(res);
          setIndexPlaying(index);
          refAudioPlayer.current.onStartPlay(res.path());
        })
    } catch (e) {
      console.log(e);
      setIndexPlaying(-1);
    }
    
  };

  const sendMsg = () => {
    Keyboard.dismiss();
    console.log(text);
    XmppClient.sendMessage(route.params.roomInfo.roomAddress, 'text', text);
    setText('');
  }

  const selectPhoto = () => {
    Keyboard.dismiss();
    sheet.show();
  }

  const gotoDeleteMessage = () => {
    navigation.navigate(Consts.ScreenIds.DeleteMessage);
  };

  const onResponderStart = async (e) => {
    setLocationY(e.nativeEvent.pageY);
    setIsRecording(true);
    await refRecorder.current.onStartRecord();
  }

  const onResponderMove = async (e) => {
    setIsCancelRecording(locationY - e.nativeEvent.pageY > 80);
  }

  const onResponderRelease = async (e) => {
    setIsRecording(false);
    await refRecorder.current.onStopRecord();
  }

  const onStopRecord = (url) => {
    setIsRecording(false);

    const lst = Object.assign([], chatHistory);
    const item = Object.assign({}, lst[0]);
    item.audio = url;
    lst.push(item);
    setChatHistory(lst);
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
        hideLoading(refLoading);
        if (uri) {
          console.log(uri);
          const lst = Object.assign([], chatHistory);
          const item = Object.assign({}, lst[0]);
          item.img = uri;
          lst.push(item);
          setChatHistory(lst);
        }
      });
    }
  };

  const handleImageAction = async (index) => {
    switch (index) {
      case 0:
        const granted = await checkPhotoLibraryReadPermission();
        if (granted) {
          launchImageLibrary({
            mediaType: 'photo',
          }, resp => {
            resizeImg(resp);
          });
        }
        break;
      case 1:
        const cameraGranted = await checkCameraPermission();
        const photosGranted = await checkPhotoLibraryWritePermission();
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
    return obj.from === `${DataLocal.userInfo.id}@${AppConfig.dev.rootDomain}`;
  };

  return (
    <KeyboardAvoidingView style={styles.contain}
      behavior={Platform.OS === "ios" ? "padding" : ""}>
      <Header title={'Server TQ nhóm gia đình (3)'} right rightIcon={Images.icGroup} rightAction={() => {gotoDeleteMessage()}}/>
      <View style={styles.container}>
        <ScrollView ref={refScrollView} style={styles.container}>
          {chatHistory && chatHistory.map((obj, i) => (
            <View key={i} style={[styles.viewItem, !isMe(obj) ? {flexDirection: 'row'} : {flexDirection: 'row-reverse'}]}>
              <View style={styles.viewImg}>
                <Image source={Images.icAvatar} style={styles.icAvatar}/>
              </View>
              <View style={styles.viewContent}>
                { !isMe(obj) && 
                  <Text style={styles.txtTitle}>{obj.from}</Text>
                }
                {obj.type !== 'image' &&
                <View style={{flexDirection: !isMe(obj) ? 'row' : 'row-reverse'}}>
                    <View style={[styles.viewContentDetail, !isMe(obj) ? {} : {backgroundColor: Colors.pinkBgMsg}]}>
                      {obj.type === 'audio' &&
                      <TouchableOpacity onPress={() => {togglePlay(obj.body, i)}}>
                        <FastImage
                          source={!isMe(obj) ? (indexPlaying === i ? Images.aAudioLeft : Images.icAudioLeft) : (indexPlaying === i ? Images.aAudioRight : Images.icAudioRight)}
                          resizeMode={FastImage.resizeMode.cover}
                          style={styles.icRecord}
                        />
                      </TouchableOpacity>
                      }
                      {obj.type === 'text' &&
                      <Text>{obj.body}</Text>
                      }
                    </View>
                  </View>
                }
                {obj.type === 'image' &&
                <Tooltip toggleAction={'onLongPress'} popover={
                  <View style={styles.viewTooltip}
                  onStartShouldSetResponder={(e) => {
                      if (Platform.OS === 'ios') {
                        CameraRoll.save(obj.body)
                        .then(console.log('Photo added to camera roll!')) 
                        .catch(err => console.log('err:', err))
                      } else {
                        RNFetchBlob
                          .config({
                            fileCache : true,
                            appendExt : 'jpg'
                          })
                          .fetch('GET', obj.body)
                          .then((res) => {
                              console.log()
                            CameraRoll.saveToCameraRoll(res.path())
                              .then((res) => {
                              console.log("save", res)
                              }).catch((error) => {
                                console.log("error", error)
                              })

                          })
                      }
                      return false;
                    }}>
                    <Text>Lưu ảnh</Text>
                  </View>
                }>
                  <View style={{flexDirection: !isMe(obj) ? 'row' : 'row-reverse'}}>
                    <View style={[styles.viewContentDetail, !isMe(obj) ? {} : {backgroundColor: Colors.pinkBgMsg}]}>
                      <FastImage resizeMode={FastImage.resizeMode.cover} source={{uri: obj.body}} style={styles.icPhoto}/>
                    </View>
                  </View>
                </Tooltip>
                }
              </View>
            </View>
          ))}
        </ScrollView>
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
              <Text style={styles.txtInput}>{String.holdAndTalk}</Text>
            </View>
            :
            <View style={styles.toInput}>
              <TextInput
                numberOfLines={1}
                maxLength={20}
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
          <TouchableOpacity style={styles.viewImg} onPress={isRecord ? selectPhoto : sendMsg}>
            <Image source={isRecord ? Images.icCamera : Images.icSend} style={isRecord ? styles.icCamera : styles.icSend}/>
          </TouchableOpacity>
        </View>
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
          paddingTop: Platform.OS === "ios" ? 150 : 180,
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
          <Spinner style={{marginBottom: 120, marginTop: Platform.OS === "ios" ? -20 : -10, height: 70, marginLeft: Platform.OS === "ios" ? 30 : 35}} isVisible={true} size={60} type={'ThreeBounce'} color={'white'}/>}
        </View>
      </View>}
      <LoadingIndicator ref={refLoading}/>
      <RecorderComponent ref={refRecorder} onStopRecord={onStopRecord} recordBackListener={recordBackListener}/>
      <AudioPlayerComponent ref={refAudioPlayer} onStopPlayer={onStopPlayer}/>
      <ActionSheet
        ref={o => sheet = o}
        title={String.selectPhoto}
        options={[
          String.selectPhotoLibrary,
          String.takePhoto,
          String.cancel,
        ]}
        cancelButtonIndex={2}
        onPress={handleImageAction}
      />
    </KeyboardAvoidingView>
  );
}
