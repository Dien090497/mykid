import {
  mediaDevices,
  MediaStream,
  RTCIceCandidate,
  RTCPeerConnection,
  RTCSessionDescription,
  RTCView,
} from 'react-native-webrtc';
import React from 'react';
import {StatusBar, View} from 'react-native';
import {Janus, JanusVideoRoomPlugin} from 'react-native-janus';
import Consts from '../../functions/Consts';

Janus.setDependencies({
  RTCPeerConnection,
  RTCSessionDescription,
  RTCIceCandidate,
  MediaStream,
});
class JanusVideoRoomScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      stream: null,
      publishers: [],
    };
  }

  async receivePublisher(publisher) {
    try {
      let videoRoom = new JanusVideoRoomPlugin(this.janus);
      videoRoom.setRoomID(this.props.roomId);
      videoRoom.setOnStreamListener(stream => {
        this.setState(state => ({
          publishers: [
            ...state.publishers,
            {
              publisher: publisher,
              stream: stream,
            },
          ],
        }));
      });

      await videoRoom.createPeer();
      await videoRoom.connect();
      await videoRoom.receive(this.videoRoom.getUserPrivateID(), publisher);
    } catch (e) {
      console.error(e);
    }
  }

  async removePublisher(publisherID) {
    try {
      this.setState(state => ({
        publishers: state.publishers.filter(
          pub => pub.publisher == null || pub.publisher.id !== publisherID,
        ),
      }));
    } catch (e) {
      console.error(e);
    }
  }

  async initJanus(stream) {
    try {
      this.setState(state => ({
        publishers: [
          {
            publisher: null,
            stream: stream,
          },
        ],
      }));

      this.janus = new Janus(this.props.server);
      this.janus.setApiSecret('janusrocks');
      await this.janus.init();

      this.videoRoom = new JanusVideoRoomPlugin(this.janus);
      this.videoRoom.setRoomID(this.props.roomId);
      this.videoRoom.setDisplayName(
        'A' + this.props.accountId + ':' + this.props.relationship,
      );
      this.videoRoom.setOnPublishersListener(publishers => {
        for (let i = 0; i < publishers.length; i++) {
          this.receivePublisher(publishers[i]);
        }
      });
      this.videoRoom.setOnPublisherJoinedListener(publisher => {
        this.receivePublisher(publisher);
        this.props.pickUp(true);
      });
      this.videoRoom.setOnPublisherLeftListener(publisherID => {
        this.removePublisher(publisherID);
        this.props.pickUp(false);
      });
      this.videoRoom.setOnWebRTCUpListener(async () => {});

      await this.videoRoom.createPeer();
      await this.videoRoom.connect();
      await this.videoRoom.join();
      await this.videoRoom.publish(stream);
    } catch (e) {
      console.error('main', JSON.stringify(e));
    }
  }

  getMediaStream = async () => {
    let isFront = true;
    let sourceInfos = await mediaDevices.enumerateDevices();
    let videoSourceId;
    for (let i = 0; i < sourceInfos.length; i++) {
      const sourceInfo = sourceInfos[i];
      console.log(sourceInfo);
      if (
        sourceInfo.kind == 'videoinput' &&
        sourceInfo.facing == (isFront ? 'front' : 'environment')
      ) {
        videoSourceId = sourceInfo.deviceId;
      }
    }

    let stream = await mediaDevices.getUserMedia({
      audio: true,
      video: {
        facingMode: isFront ? 'user' : 'environment',
      },
    });
    await this.initJanus(stream);
  };

  async componentDidMount() {
    this.getMediaStream();
  }

  componentWillUnmount = async () => {
    if (this.janus) {
      await this.janus.destroy();
    }
  };

  destroyVideoCall() {
    // if (this.videoRoom) {
    //   this.videoRoom.detach().then();
    // }
    // this.state = {
    //   stream: null,
    //   publishers: [],
    // };
  }

  render() {
    return (
      <View
        style={{
          flex: 1,
          width: '100%',
          height: '100%',
          backgroundColor: '#53535F',
          justifyContent: 'flex-end',
          alignContent: 'flex-end',
          alignItems: 'flex-end',
        }}>
        <StatusBar translucent={true} barStyle={'light-content'} />
        {this.state.publishers.length > 0 && (
          <RTCView
            style={{
              flex: 1,
              width: '100%',
              height: '100%',
            }}
            objectFit={'cover'}
            streamURL={
              this.state.publishers.length > 1
                ? this.state.publishers[1].stream.toURL()
                : this.state.publishers[0].stream.toURL()
            }
          />
        )}
        {this.state.publishers.length > 1 && (
          <RTCView
            style={{
              position: 'absolute',
              width: Consts.windowWidth / 3,
              height: (Consts.screenHeight * 90) / 100 / 4,
              right: 5,
              bottom: (Consts.screenHeight * 10) / 100,
            }}
            objectFit={'cover'}
            streamURL={this.state.publishers[0].stream.toURL()}
          />
        )}
      </View>
    );
  }
}

export default JanusVideoRoomScreen;
