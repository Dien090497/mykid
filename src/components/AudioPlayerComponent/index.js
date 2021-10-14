import React, {Component} from 'react';
import AudioRecorderPlayer from 'react-native-audio-recorder-player';

export default class AudioPlayerComponent extends Component {

  constructor(props) {
    super(props);
    this.state = {
      currentPositionSec: 0,
      currentDurationSec: 0,
      playTime: '00:00:00',
      duration: '00:00:00',
      isPlaying: false
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

  onStartPlay = async (url) => {
    if (this.state.isPlaying) {
      await this.onStopPlay();
      this._isMounted && this.setState({
        isPlaying: false
      });
      return;
    } 
    this._isMounted && this.setState({
      isPlaying: true
    });
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
        isPlaying: (e.currentPosition !== e.duration)
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
    this._isMounted && this.setState({
      isPlaying: false
    });
  };
}