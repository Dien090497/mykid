import React, {Component} from 'react';
import AMR from 'react-native-amr'
import AudioRecorderPlayer from 'react-native-audio-recorder-player';

export default class AudioPlayerComponent extends Component {

  constructor(props) {
    super(props);
    this.state = {
      currentPositionSec: 0,
      currentDurationSec: 0,
      playTime: '00:00:00',
      duration: '00:00:00',
      isPlaying: false,
      path: ''
    };

    this._isMounted = false;
    this.audioRecorderPlayer = new AudioRecorderPlayer();
    this.audioRecorderPlayer.setSubscriptionDuration(0.1); // optional. Default is 0.5
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
      return;
    } 
    this._isMounted && this.setState({
      isPlaying: true,
      path: url
    });

    if (url.endsWith('amr')) {
      console.log('play ', url);
      AMR.stop();
 
      // status: 0:playing, 1:play success end, 2:play failed, 3: stop
      AMR.play(url.replace('file://', ''), (error, event) => {
          if (!error) {
              if (event.status === 1) {
                console.log('play success');
                this._isMounted && this.setState({
                  isPlaying: true,
                  path: url
                });
              } else if(event.status === 3) {
                console.log('stop success');
                this._isMounted && this.setState({
                  isPlaying: false,
                  path: url
                });
              }
          } else {
              //event.status = 2
              console.log('can\'t play');
              this._isMounted && this.setState({
                isPlaying: true,
                path: url
              });
          }
          if (this.props.onStopPlayer) {
            this.props.onStopPlayer();
            this._isMounted && this.setState({
              isPlaying: false
            });
          }
      });
    } else if (url.endsWith('wav')) {
      console.log('play ', url);
      const msg = await this.audioRecorderPlayer.startPlayer(url);
      const volume = await this.audioRecorderPlayer.setVolume(1.0);
      console.log(`file: ${msg}`, `volume: ${volume}`);

      this.audioRecorderPlayer.addPlayBackListener((e) => {
        if (this.props.onStopPlayer && e.currentPosition === e.duration) {
          this.props.onStopPlayer();
        }
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
    } else {
      //iós
      console.log('play ', url);
      const msg = await this.audioRecorderPlayer.startPlayer(url);
      const volume = await this.audioRecorderPlayer.setVolume(1.0);
      console.log(`file: ${msg}`, `volume: ${volume}`);

      this.audioRecorderPlayer.addPlayBackListener((e) => {
        if (this.props.onStopPlayer && e.currentPosition === e.duration) {
          this.props.onStopPlayer();
        }
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
    }
  };

  onStopPlay = async () => {
    if (this.state.path.endsWith('amr')) {
      AMR.stop();
    } else {
      this.audioRecorderPlayer.stopPlayer();
      this.audioRecorderPlayer.removePlayBackListener();
    }
    this._isMounted && this.setState({
      isPlaying: false
    });
    if (this.props.onStopPlayer) {
      this.props.onStopPlayer();
    }
  };
}