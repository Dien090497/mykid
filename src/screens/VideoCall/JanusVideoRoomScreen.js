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
import { Colors } from '../../assets/colors/Colors';
import SimpleToast from "react-native-simple-toast";

Janus.setDependencies({
  RTCPeerConnection,
  RTCSessionDescription,
  RTCIceCandidate,
  MediaStream,
});
let mediaStream =null;
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

    mediaDevices.getUserMedia({
      audio: true,
      video: {
        facingMode: isFront ? 'user' : 'environment',
      },
    }).then(stream => {
      mediaStream = stream;
     this.initJanus(mediaStream);
    });
  };

  async componentDidMount() {
    this.getMediaStream();
  }

  componentWillUnmount = async () => {
    if (this.janus) {
      await mediaStream.release();
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
          backgroundColor: Colors.black,
          justifyContent: 'center',
          alignContent: 'center',
          alignItems: 'center',
        }}>
        <StatusBar translucent={true} barStyle={'light-content'} />
        {this.state.publishers.length > 0 && (
          <View style={{
            flex: this.state.publishers.length > 1 ? 0.5 : 1,
            width: '90%',
            height: '50%',
            borderRadius: 10,
            overflow: 'hidden'
          }}>
            <RTCView
              style={{
                flex: 1,
                width: '100%',
                height: '100%',
                alignSelf: 'center',
                borderColor: Colors.gray,
                borderWidth: 1
              }}
              objectFit={'cover'}
              streamURL={
                this.state.publishers.length > 1
                  ? this.state.publishers[1].stream.toURL()
                  : this.state.publishers[0].stream.toURL()
              }
            />
          </View>
        )}
        {this.state.publishers.length > 1 && (
          <View style={{
            flex: 0.5,
            width: '90%',
            height: '50%',
            borderRadius: 10,
            overflow: 'hidden',
            marginTop: '5%',
          }}>
            <RTCView
              style={{
                flex: 1,
                width: '100%',
                alignSelf: 'center',
                backgroundColor: 'white',
                borderColor: Colors.gray,
                borderWidth: 1
              }}
              objectFit={'cover'}
              streamURL={this.state.publishers[0].stream.toURL()}
            />
          </View>
        )}
      </View>
    );
  }
}

export default JanusVideoRoomScreen;
