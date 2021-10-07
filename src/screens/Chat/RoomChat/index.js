import React, { useLayoutEffect, useRef, useState } from 'react';
import {
  KeyboardAvoidingView,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import AudioRecorderPlayer, {
  AVEncoderAudioQualityIOSType,
  AVEncodingOption,
  AudioEncoderAndroidType,
  AudioSet,
  AudioSourceAndroidType,
  PlayBackType,
  RecordBackType,
} from 'react-native-audio-recorder-player';
import {styles} from './styles';
import Header from '../../../components/Header';
import LoadingIndicator from '../../../components/LoadingIndicator';
import DataLocal from '../../../data/dataLocal';
import { Image } from 'react-native';
import Images from '../../../assets/Images';
import Consts from '../../../functions/Consts';
import { getListDeviceApi } from '../../../network/DeviceService';
import { showAlert } from '../../../functions/utils';
import { String } from '../../../assets/strings/String';

export default function RoomChat({navigation}) {
  const refLoading = useRef();
  const [isRecord, setIsRecord] = useState(true);
  const [isRecording, setIsRecording] = useState(false);
  const [isCancelRecording, setIsCancelRecording] = useState(false);
  const [devices, setDevices] = useState();
  const [text, setText] = useState();
  const [audioState, setAudioState] = useState({audioRecorderPlayer: new AudioRecorderPlayer()});
  const refTextInput = useRef();
  // const audioRecorderPlayer = new AudioRecorderPlayer();
  const audioRecorderPlayer = new AudioRecorderPlayer();

  const onStartRecord1 = async () => {
    const result = await this.audioRecorderPlayer.startRecorder();
    this.audioRecorderPlayer.addRecordBackListener((e) => {
      this.setState({
        recordSecs: e.currentPosition,
        recordTime: this.audioRecorderPlayer.mmssss(
          Math.floor(e.currentPosition),
        ),
      });
      return;
    });
    console.log(result);
  };

  useLayoutEffect(() => {
    focusTextInput();
  }, [refTextInput]);

  useLayoutEffect(() => {
    if (!isRecord)
      focusTextInput();
  }, [isRecord]);

  useLayoutEffect(() => {
    getListDevice();
    console.log(audioState);
    console.log(audioState.audioRecorderPlayer);
    // if (!audioState.audioRecorderPlayer) {
    //   audioState.audioRecorderPlayer = new AudioRecorderPlayer();
    // }
    // AudioRecorderPlayer.setSubscriptionDuration(0.1); // optional. Default is 0.5
  }, []);

  const focusTextInput = () => {
    if (refTextInput && refTextInput.current) {
      Platform.OS === 'ios'
        ? refTextInput.current.focus()
        : setTimeout(() => refTextInput.current.focus(), 30);
    }
  };

  const getListDevice = async () => {
    getListDeviceApi(DataLocal.userInfo.id, Consts.pageDefault, 100, '', '', {
      success: resData => {
        setDevices(resData.data);
      },
      refLoading,
    });
  };

  const toggleRecord = (state) => {
    onStartRecord1();
    setIsRecord(state);
    // setModalVisible(true);
  };

  const sendMessage = () => {
    setMessageText('');
    props.closeKeyBoard();
  };

  const toggleGroup = () => {
    showAlert('toggleGroup');
  };

  const onStartRecord = async () => {
    if (Platform.OS === 'android') {
      try {
        const grants = await PermissionsAndroid.requestMultiple([
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
          PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
        ]);

        console.log('write external stroage', grants);

        if (
          grants['android.permission.WRITE_EXTERNAL_STORAGE'] ===
            PermissionsAndroid.RESULTS.GRANTED &&
          grants['android.permission.READ_EXTERNAL_STORAGE'] ===
            PermissionsAndroid.RESULTS.GRANTED &&
          grants['android.permission.RECORD_AUDIO'] ===
            PermissionsAndroid.RESULTS.GRANTED
        ) {
          console.log('permissions granted');
        } else {
          console.log('All required permissions not granted');
          return;
        }
      } catch (err) {
        console.warn(err);
        return;
      }
    }

    const audioSet = {
      AudioEncoderAndroid: AudioEncoderAndroidType.AAC,
      AudioSourceAndroid: AudioSourceAndroidType.MIC,
      AVEncoderAudioQualityKeyIOS: AVEncoderAudioQualityIOSType.high,
      AVNumberOfChannelsKeyIOS: 2,
      AVFormatIDKeyIOS: AVEncodingOption.aac,
    };

    console.log('audioSet', audioSet);

    //? Default path
    const uri = await audioState.audioRecorderPlayer.startRecorder(
      '',
      audioSet,
    );

    audioState.audioRecorderPlayer.addRecordBackListener((e) => {
      console.log('record-back', e);
      // setAudioState({
      //   recordSecs: e.currentPosition,
      //   recordTime: audioRecorderPlayer.mmssss(
      //     Math.floor(e.currentPosition),
      //   ),
      // });
    });
    console.log(`uri: ${uri}`);
  };

  const onResponderStart = async (e) => {
    console.log('onResponderStart', e.nativeEvent);
    onStartRecord();
    setIsRecording(true);
  }

  const onResponderMove = async (e) => {
    setIsCancelRecording(e.nativeEvent.locationX < 20 || e.nativeEvent.locationX > 250
      || e.nativeEvent.locationY < -20 || e.nativeEvent.locationY > 25);
  }

  const onResponderRelease = async (e) => {
    console.log('onResponderRelease', e.nativeEvent);
    setIsRecording(false); console.log(audioState);
    const result = await audioState.audioRecorderPlayer.stopRecorder();
    audioState.audioRecorderPlayer.removeRecordBackListener();
  }

  return (
    <KeyboardAvoidingView style={styles.contain}
      behavior={Platform.OS === "ios" ? "padding" : ""}>
      <Header title={'Server TQ nhóm gia đình (3)'} right rightIcon={Images.icGroup} rightAction={() => {toggleGroup()}}/>
      <View style={styles.container}>
        <ScrollView style={styles.container}>
          {devices && devices.map((obj, i) => (
            <View key={i} style={[styles.viewItem, i % 2 === 0 ? {flexDirection: 'row'} : {flexDirection: 'row-reverse'}]}>
              <View style={styles.viewImg}>
                <Image source={Images.icAvatar} style={styles.icAvatar}/>
              </View>
              <View style={styles.viewContent}>
                {i % 2 === 0 && <Text style={styles.txtTitle}>{obj.deviceName}</Text>}
                <View style={styles.viewContentDetail}></View>
              </View>
            </View>
          ))}
          {devices && devices.map((obj, i) => (
            <View key={i} style={[styles.viewItem, i % 2 === 0 ? {flexDirection: 'row'} : {flexDirection: 'row-reverse'}]}>
              <View style={styles.viewImg}>
                <Image source={Images.icAvatar} style={styles.icAvatar}/>
              </View>
              <View style={styles.viewContent}>
                {i % 2 === 0 && <Text style={styles.txtTitle}>{obj.deviceName}</Text>}
                <View style={styles.viewContentDetail}></View>
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
            // <TouchableOpacity style={styles.toInput}
            //   onPressIn={(e) => {console.log('onPressIn'); console.log(e.nativeEvent)}}
            //   onLongPress={(e) => {console.log('onLongPress'); console.log(e.nativeEvent)}}
            //   onLayout={(e) => {console.log('onLayout'); console.log(e.nativeEvent)}}
            //   onPress={(e) => {console.log('onPress'); console.log(e.nativeEvent)}}
            //   onPressOut={(e) => {console.log('onPressOut'); console.log(e.nativeEvent)}}>
            <View style={styles.toInput} 
              onStartShouldSetResponder={() => {return true;}}
              onResponderStart={(e) => {onResponderStart(e)}}
              onResponderMove={(e) => {onResponderMove(e)}}
              onResponderRelease={(e) => {onResponderRelease(e)}}>
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
          <TouchableOpacity style={styles.viewImg}>
            <Image source={Images.icCamera} style={styles.icCamera}/>
          </TouchableOpacity>
        </View>
      </View>
      <LoadingIndicator ref={refLoading} />
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
          paddingTop: 12,
          paddingLeft: 12,
          borderRadius: 5,
          width: 150,
          height: 150,
          justifyContent: 'center',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
        }}>
          <Image source={isCancelRecording ? Images.icCancelRecord : Images.icMicrophone} 
            style={isCancelRecording ? styles.icCancelRecord : styles.icMicrophone}/>
        </View>
      </View>}
    </KeyboardAvoidingView>
  );
}
