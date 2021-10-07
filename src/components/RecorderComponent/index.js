import React, {Component} from 'react';
import {
  Dimensions,
  PermissionsAndroid,
  Platform,
} from 'react-native';
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
      isLoggingIn: false,
      recordSecs: 0,
      recordTime: '00:00:00',
      currentPositionSec: 0,
      currentDurationSec: 0,
      playTime: '00:00:00',
      duration: '00:00:00',
    };

    this.audioRecorderPlayer = new AudioRecorderPlayer();
    this.audioRecorderPlayer.setSubscriptionDuration(0.1); // optional. Default is 0.5
    this._isMounted = false;
  }

  componentDidMount() {
    this._isMounted = true;
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    return <></>;
  }

  // onStatusPress = (e) => {
  //   const touchX = e.nativeEvent.locationX;
  //   const playWidth =
  //     (this.state.currentPositionSec / this.state.currentDurationSec) *
  //     (screenWidth - 56);

  //   const currentPosition = Math.round(this.state.currentPositionSec);

  //   if (playWidth && playWidth < touchX) {
  //     const addSecs = Math.round(currentPosition + 1000);
  //     this.audioRecorderPlayer.seekToPlayer(addSecs);
  //   } else {
  //     const subSecs = Math.round(currentPosition - 1000);
  //     this.audioRecorderPlayer.seekToPlayer(subSecs);
  //   }
  // };

  onStartRecord = async () => {
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

    //? Default path
    const uri = await this.audioRecorderPlayer.startRecorder(
      undefined,
      audioSet,
    );

    this.audioRecorderPlayer.addRecordBackListener(async (e) => {
      this._isMounted && this.setState({
        recordSecs: e.currentPosition,
        recordTime: this.audioRecorderPlayer.mmssss(
          Math.floor(e.currentPosition),
        ),
      });
      if (Math.floor(e.currentPosition) > 5000) {
        await this.onStopRecord();
      }
      if (this.props.recordBackListener) {
        this.props.recordBackListener(e);
      }
    });
    console.log(`uri: ${uri}`);
  };

  onPauseRecord = async () => {
    try {
      await this.audioRecorderPlayer.pauseRecorder();
    } catch (err) {
      console.log('pauseRecord', err);
    }
  };

  onResumeRecord = async () => {
    await this.audioRecorderPlayer.resumeRecorder();
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

  onStartPlay = async (url) => {
    //? Default path
    const msg = await this.audioRecorderPlayer.startPlayer(url);
    const volume = await this.audioRecorderPlayer.setVolume(1.0);
    console.log(`file: ${msg}`, `volume: ${volume}`);

    this.audioRecorderPlayer.addPlayBackListener((e) => {
      this._isMounted && this.setState({
        currentPositionSec: e.currentPosition,
        currentDurationSec: e.duration,
        playTime: this.audioRecorderPlayer.mmssss(
          Math.floor(e.currentPosition),
        ),
        duration: this.audioRecorderPlayer.mmssss(Math.floor(e.duration)),
      });
    });
  };

  onStartPlay = async () => {
    //? Default path
    const msg = await this.audioRecorderPlayer.startPlayer();
    const volume = await this.audioRecorderPlayer.setVolume(1.0);
    console.log(`file: ${msg}`, `volume: ${volume}`);

    this.audioRecorderPlayer.addPlayBackListener((e) => {
      this._isMounted && this.setState({
        currentPositionSec: e.currentPosition,
        currentDurationSec: e.duration,
        playTime: this.audioRecorderPlayer.mmssss(
          Math.floor(e.currentPosition),
        ),
        duration: this.audioRecorderPlayer.mmssss(Math.floor(e.duration)),
      });
    });
  };

  onPausePlay = async () => {
    await this.audioRecorderPlayer.pausePlayer();
  };

  onResumePlay = async () => {
    await this.audioRecorderPlayer.resumePlayer();
  };

  onStopPlay = async () => {
    this.audioRecorderPlayer.stopPlayer();
    this.audioRecorderPlayer.removePlayBackListener();
  };
}