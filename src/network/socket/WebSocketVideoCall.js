import DataLocal from '../../data/dataLocal';
import { generateRandomId } from '../../functions/utils';
import reduxStore from '../../redux/config/redux';
import videoCallAction from '../../redux/actions/videoCallAction';
import * as encoding from 'text-encoding';
import { wsUrl } from '../http/ApiUrl';
import Consts from '../../functions/Consts';
var encoder = new encoding.TextEncoder();

export default class WebSocketVideoCall {
  static ws = null;
  static ringtone = null;
  static reconnect = false;
  static navigationRef = null;

  static setReconnect(autoReconnect) {
    this.reconnect = !!autoReconnect;
    // this._handleWebSocketSetup();
  }

  static disconnect() {
    this.reconnect = false;
    this.ws.close();
  }

  static _handleWebSocketSetup = (navigation) => {
    this.navigationRef = navigation;
    this.ws = new WebSocket(wsUrl);
    this.ws.onopen = () => {
      this.onOpen();
    };
    this.ws.onmessage = event => {
      this.onMessage(event);
    };
    this.ws.onerror = error => {
      this.onError(error);
    };
    this.ws.onclose = () =>
      this.onClose();
  };

  static ping = async () => {
    console.log('WebSocketVideoCall Ping');
    await this.ws.send(encoder.encode('').buffer, true);
    setTimeout(() => {
      if (this.reconnect) {
        this.ping();
      }
    }, 3000)
  };

  static onOpen = async () => {
    let command =
      'CONNECT\n' +
      'accept-version:1.2\n' +
      'host:mykid.ttc.software\n' +
      'authorization:Bearer ' +
      DataLocal.accessToken +
      '\n' +
      'content-length:0\n' +
      '\n\0';
    await this.ws.send(encoder.encode(command).buffer, true);

    command =
      'SUBSCRIBE\n' +
      'id:' + generateRandomId(10) + '\n' +
      'destination:/user/queue/video-calls\n' +
      'content-length:0\n' +
      '\n\0';
    await this.ws.send(encoder.encode(command).buffer, true);
    
    this.ping();
  };

  static onClose = () => {
    console.log('Websocket Close!');
  };

  static onError = error => {
    console.log(JSON.stringify(error));
    console.log(error, 'Websocket Error!');
  };

  static onMessage = message => {
    console.log(JSON.stringify(message));
    if (DataLocal.accessToken !== null && message.data) {
      const split = message.data.split('\n');
      //['MESSAGE', 'event:INCOMING_CALL', 'destination:/user/queue/video-calls', 'content-type:application/json', 'subscription:111111', 'message-id:50952199-de98-32f6-b671-087214694a64-17', 'content-length:423', '', '{"id":213,"key":"ea0b71e8-6d4a-4093-95d5-d33316b6c…829Z","updatedAt":"2021-09-18T02:38:20.033829Z"}\x00']
      if (
        split[0] === 'MESSAGE' &&
        split.length > 4 &&
        split[2] === 'destination:/user/queue/video-calls'
      ) {
        const data = JSON.parse(
          split[split.length - 1].replace('\u0000', '').replace('\\u0000', ''),
        );
        if (split[1] === 'event:INCOMING_CALL') {
          // INCOMING_CALL
          reduxStore.store.dispatch(videoCallAction.incomingCall(data));
          this.navigationRef.navigate(Consts.ScreenIds.ListDevice);
        } else if (split[1] === 'event:REJECTED_CALL') {
          // REJECTED_CALL
          reduxStore.store.dispatch(videoCallAction.rejectedCall(data));
        } else if (split[1] === 'event:ENDED_CALL') {
          // ENDED_CALL
          reduxStore.store.dispatch(videoCallAction.endedCall(data));
        }
      }
      console.log(message, 'Websocket Message');
    }
  };
}