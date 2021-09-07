import React from 'react';
import { View} from 'react-native';

export default class LoadingIndicator extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      visible: false,
      msg: '',
    };
  }

  show = (msg) => {
    if (msg !== undefined && msg !== null) {
      this.setState({
        msg: msg,
        visible: true,
      });
    } else {
      this.setState({
        msg: '',
        visible: true,
      });
    }
  };
  hide = (callback) => {
    this.setState({
      visible: false,
    }, callback);
  };

  render() {
    if (this.state.visible) {
      return <View style={{
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
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
        }}>
          {/* <ActivityIndicator size="large" color={'white'}/> */}
        </View>
      </View>;
    } else {
      return <></>;
    }
  }
}
