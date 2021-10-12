import React, { useLayoutEffect, useRef, useState } from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {styles} from './styles';
import ActionSheet from '@alessiocancian/react-native-actionsheet';
import Header from '../../../components/Header';
import LoadingIndicator from '../../../components/LoadingIndicator';
import DataLocal from '../../../data/dataLocal';
import { Image } from 'react-native';
import Images from '../../../assets/Images';
import Consts from '../../../functions/Consts';
import { getListDeviceApi } from '../../../network/DeviceService';
import { hideLoading, resizeImage, showAlert, showLoading } from '../../../functions/utils';
import { String } from '../../../assets/strings/String';
import RecorderComponent from '../../../components/RecorderComponent';
import Spinner from 'react-native-spinkit';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import { checkCameraPermission, checkPhotoLibraryReadPermission, checkPhotoLibraryWritePermission } from '../../../functions/permissions';

export default function RoomChat({navigation}) {
  const refLoading = useRef();
  const refRecorder = useRef();
  const refScrollView = useRef();
  const refTextInput = useRef();
  const [isRecord, setIsRecord] = useState(true);
  const [isRecording, setIsRecording] = useState(false);
  const [isCancelRecording, setIsCancelRecording] = useState(false);
  const [devices, setDevices] = useState();
  const [text, setText] = useState();
  let sheet = null;
  
  useLayoutEffect(() => {
    focusTextInput();
  }, [refTextInput]);

  useLayoutEffect(() => {
    if (!isRecord)
      focusTextInput();
  }, [isRecord]);

  useLayoutEffect(() => {
    getListDevice();
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
    // onStartRecord1();
    setIsRecord(state);
    // setModalVisible(true);
    // setTimeout(() => refScrollView.current.scrollToEnd({animated: true}), 100);
    
  };

  function selectPhoto() {
    Keyboard.dismiss();
    sheet.show();
  }

  const gotoDeleteMessage = () => {
    navigation.navigate(Consts.ScreenIds.DeleteMessage);
  };

  const onResponderStart = async (e) => {
    console.log('onResponderStart', e.nativeEvent);
    // onStartRecord();
    setIsRecording(true);
    await refRecorder.current.onStartRecord();
  }

  const onResponderMove = async (e) => {
    setIsCancelRecording(e.nativeEvent.locationX < 20 || e.nativeEvent.locationX > 250
      || e.nativeEvent.locationY < -20 || e.nativeEvent.locationY > 25);
  }

  const onResponderRelease = async (e) => {
    console.log('onResponderRelease', e.nativeEvent);
    setIsRecording(false);
    await refRecorder.current.onStopRecord();
  }

  const onStopRecord = (url) => {
    setIsRecording(false);
    refRecorder.current.onStartPlay(url);
    console.log('onStopRecord: ', url);
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
          // setSelectedAvatarUri(uri);
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
            saveToPhotos: true,
          }, resp => {
            resizeImg(resp);
          });
        }
        break;
    }
  }

  return (
    <KeyboardAvoidingView style={styles.contain}
      behavior={Platform.OS === "ios" ? "padding" : ""}>
      <Header title={'Server TQ nhóm gia đình (3)'} right rightIcon={Images.icGroup} rightAction={() => {gotoDeleteMessage()}}/>
      <View style={styles.container}>
        <ScrollView ref={refScrollView} style={styles.container}>
          {devices && devices.map((obj, i) => (
            <View key={i} style={[styles.viewItem, i % 2 === 0 ? {flexDirection: 'row'} : {flexDirection: 'row-reverse'}]}>
              <View style={styles.viewImg}>
                <Image source={Images.icAvatar} style={styles.icAvatar}/>
              </View>
              <View style={styles.viewContent}>
                {i % 2 === 0 && <Text style={styles.txtTitle}>{obj.deviceName}</Text>}
                <View style={styles.viewContentDetail}>
                </View>
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
          <TouchableOpacity style={styles.viewImg} onPress={() => {selectPhoto()}}>
            <Image source={Images.icCamera} style={styles.icCamera}/>
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
          paddingTop: 150,
          paddingLeft: 12,
          borderRadius: 5,
          width: 150,
          height: 150,
          justifyContent: 'center',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
        }}>
          <Image source={isCancelRecording ? Images.icCancelRecord : Images.icMicrophone} 
            style={isCancelRecording ? styles.icCancelRecord : styles.icMicrophone}/>
          {isCancelRecording ? <View style={{marginBottom: 160, marginTop: -10, height: 30}}/> :
          <Spinner style={{marginBottom: 160, marginTop: -10, height: 30, marginLeft: 30}} isVisible={true} size={60} type={'ThreeBounce'} color={'white'}/>}
        </View>
      </View>}
      <LoadingIndicator ref={refLoading}/>
      <RecorderComponent ref={refRecorder} onStopRecord={onStopRecord} recordBackListener={recordBackListener}/>
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
