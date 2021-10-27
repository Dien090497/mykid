import React, {Component} from 'react';
import Sound from 'react-native-sound';
import AMR from 'react-native-amr'

export default class AudioPlayerComponent extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isPlaying: false,
      path: ''
    };

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
      if (this.props.onStopPlayer) {
        this.props.onStopPlayer();
      }
      this._isMounted && this.setState({
        isPlaying: false
      });
      return;
    } 
    this._isMounted && this.setState({
      isPlaying: true,
      path: url
    });

    if (url.endsWith('amr')) {
      AMR.stop();
 
      // status: 0:playing, 1:play success end, 2:play failed, 3: stop
      AMR.play(url.replace('file://', ''), (error, event) => {
          if (!error) {
              if (event.status === 1) {
                console.log('play success');
              } else if(event.status === 3) {
                console.log('stop success');
              }
          } else {
              //event.status = 2
              console.log('can\'t play');
          }
          if (this.props.onStopPlayer) {
            this.props.onStopPlayer();
            this._isMounted && this.setState({
              isPlaying: false
            });
          }
      });
    } else {
      this.state.sound = new Sound(url, '', (error) => {
        if (error) {
          console.log('failed to load the sound', error);
        }
      });

      setTimeout(() => {
        this.state.sound.play((success) => {
          if (this.props.onStopPlayer) {
            this.props.onStopPlayer();
            this._isMounted && this.setState({
              isPlaying: false
            });
          }
        });
      }, 100);
    }
  };

  onStopPlay = async () => {
    if (!this.state.path.endsWith('amr')) {
      this.state.sound.stop((time) => {
        console.log('stop: ', time);
      });
    }
    this._isMounted && this.setState({
      isPlaying: false
    });
  };
}