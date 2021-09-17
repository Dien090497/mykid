/* global WebSocket */
import React, {Component} from 'react';

import PropTypes from 'prop-types';
import DataLocal from '../data/dataLocal';
import { wsUrl } from '../network/http/ApiUrl';

class WS extends Component {
  state = {
    ws: null,
  };

  static defaultProps = {
    reconnect: false,
  };

  static propTypes = {
    url: PropTypes.string.isRequired,
    reconnect: PropTypes.bool,
    onOpen: PropTypes.func,
    onMessage: PropTypes.func,
    onError: PropTypes.func,
    onClose: PropTypes.func,
    subProtocol: PropTypes.string,
  };

  send = data => this.state.ws.send(data);

  componentDidMount() {
    this.reconnect = !!this.props.reconnect;
    this._handleWebSocketSetup();
  }

  componentWillUnmount() {
    this.reconnect = false;
    this.state.ws.close();
  }

  render() {
    return null;
  }

  _handleWebSocketSetup = () => {
    let ws = null;
    // if (this.props.subProtocol)
    //   ws = new WebSocket(this.props.url, this.props.subProtocol.toString());
    // else 
    ws = new WebSocket(this.props.url);
    ws.onopen = () => {
      this.props.onOpen && this.props.onOpen();
    };
    ws.onmessage = event => {
      this.props.onMessage && this.props.onMessage(event);
    };
    ws.onerror = error => {
      this.props.onError && this.props.onError(error);
    };
    ws.onclose = () =>
      this.reconnect
        ? this._handleWebSocketSetup()
        : this.props.onClose && this.props.onClose();
    this.setState({ws});
  };
}

export default WS;
