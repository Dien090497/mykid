import React, {Component} from 'react';
import {
  Platform,
  PermissionsAndroid,
} from 'react-native';
import { AudioRecorder, AudioUtils } from 'react-native-audio';
import AudioRecorderPlayer, {
  AVEncoderAudioQualityIOSType,
  AVEncodingOption,
  AudioEncoderAndroidType,
  AudioSourceAndroidType,
} from 'react-native-audio-recorder-player';


export default class RecorderComponent extends Component {
  /* 
  recordBackListener
  onStopRecord
  */

  constructor(props) {
    super(props);
    this.state = {
      recordSecs: 0,
      recordTime: '00:00:00',
      currentTime: 0.0,
      recording: false,
      paused: false,
      stoppedRecording: false,
      finished: false,
      audioPath: AudioUtils.DocumentDirectoryPath + '/test.aac',
      hasPermission: undefined,
    };

    this._isMounted = false;
    this.audioRecorderPlayer = new AudioRecorderPlayer();
    this.audioRecorderPlayer.setSubscriptionDuration(0.1); // optional. Default is 0.5
  }

  prepareRecordingPath(audioPath){
    AudioRecorder.prepareRecordingAtPath(audioPath, {
      SampleRate: 8000,
      Channels: 1,
      AudioQuality: "Low",
      AudioEncoding: "aac",
      AudioEncodingBitRate: 8000
    });
  }

  componentDidMount() {
    this._isMounted = true;
    AudioRecorder.requestAuthorization().then((isAuthorised) => {
      this.setState({ hasPermission: isAuthorised });

      if (!isAuthorised) return;

      this.prepareRecordingPath(this.state.audioPath);

      AudioRecorder.onProgress = (data) => {
        this.setState({currentTime: Math.floor(data.currentTime)});
      };

      AudioRecorder.onFinished = (data) => {
        // Android callback comes in the form of a promise instead.
        if (Platform.OS === 'ios') {
          this._finishRecording(data.status === "OK", data.audioFileURL, data.audioFileSize);
        }
      };
    });
  }

  async _pause() {
    if (!this.state.recording) {
      console.warn('Can\'t pause, not recording!');
      return;
    }

    try {
      const filePath = await AudioRecorder.pauseRecording();
      this.setState({paused: true});
    } catch (error) {
      console.error(error);
    }
  }

  async _resume() {
    if (!this.state.paused) {
      console.warn('Can\'t resume, not paused!');
      return;
    }

    try {
      await AudioRecorder.resumeRecording();
      this.setState({paused: false});
    } catch (error) {
      console.error(error);
    }
  }

  async _stop() {
    if (Platform.OS === 'android') {
      await this.onStopRecord();
      return;
    }

    if (!this.state.recording) {
      console.warn('Can\'t stop, not recording!');
      return;
    }

    this.setState({stoppedRecording: true, recording: false, paused: false});

    try {
      const filePath = await AudioRecorder.stopRecording();
      return filePath;
    } catch (error) {
      console.error(error);
    }
  }

  onStartRecordAndroid = async () => {
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

    const audioSet = {
      AudioEncoderAndroid: AudioEncoderAndroidType.AAC,
      AudioSourceAndroid: AudioSourceAndroidType.MIC,
      AVEncoderAudioQualityKeyIOS: AVEncoderAudioQualityIOSType.medium,
      AVNumberOfChannelsKeyIOS: 2,
      AVFormatIDKeyIOS: AVEncodingOption.aac,
    };
    //? Default path
    const uri = await this.audioRecorderPlayer.startRecorder(
      this.state.audioPath,
      audioSet,
    );

    this.audioRecorderPlayer.addRecordBackListener(async (e) => {
      this._isMounted && this.setState({
        recordSecs: e.currentPosition,
        recordTime: this.audioRecorderPlayer.mmssss(
          Math.floor(e.currentPosition),
        ),
      });
      if (Math.floor(e.currentPosition) > 15000) {
        await this.onStopRecord();
      }
      // if (this.props.recordBackListener) {
      //   this.props.recordBackListener(e);
      // }
    });
  };
  
  onStopRecord = async () => {
    const result = await this.audioRecorderPlayer.stopRecorder();
    this.audioRecorderPlayer.removeRecordBackListener();
    this._isMounted && this.setState({
      recordSecs: 0,
    });
    if (this.props.onStopRecord) {
      this.props.onStopRecord(result);
    }
  };


  async _record() {
    if (this.state.recording) {
      console.warn('Already recording!');
      return;
    }

    if (Platform.OS === 'android') {
      await this.onStartRecordAndroid();
      return;
    }

    if (!this.state.hasPermission) {
      console.warn('Can\'t record, no permission granted!');
      return;
    }

    if(this.state.stoppedRecording){
      this.prepareRecordingPath(this.state.audioPath);
    }

    this.setState({recording: true, paused: false});

    try {
      const filePath = await AudioRecorder.startRecording();
      console.log(filePath);
    } catch (error) {
      console.error(error);
    }
  }

  _finishRecording(didSucceed, filePath, fileSize) {
    this.setState({ finished: didSucceed });

    if (this.props.onStopRecord) {
      this.props.onStopRecord(filePath);
    }
    console.log(`Finished recording of duration ${this.state.currentTime} seconds at path: ${filePath} and size of ${fileSize || 0} bytes`);
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    return <></>;
  }
}