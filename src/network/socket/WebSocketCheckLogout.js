import DataLocal from '../../data/dataLocal';
import { generateRandomId } from '../../functions/utils';
import { wsCheckSim } from "../http/ApiUrl";
import * as encoding from 'text-encoding';
import XmppClient from "../xmpp/XmppClient";
import WebSocketSafeZone from "./WebSocketSafeZone";
import WebSocketVideoCall from "./WebSocketVideoCall";
import reduxStore from "../../redux/config/redux";
import loginAction from "../../redux/actions/loginAction";
var encoder = new encoding.TextEncoder();

export default class WebSocketCheckLogout {
  static ws = null;
  static reconnect = false;
  static isConnected = false;

  static setReconnect(autoReconnect) {
    this.reconnect = !!autoReconnect;
  }

  static disconnect() {
    this.reconnect = false;
    this.ws.close();
  }

  static _handleWebSocketSetup = () => {
    this.ws = new WebSocket(wsCheckSim);
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
    await this.ws.send(encoder.encode('').buffer, true);
    setTimeout(() => {
      if (this.reconnect) {
        this.ping();
      }
    }, 3000)
  };

  static onOpen = async () => {
    console.log('Websocket Logout Open!');
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
      'destination:/user/queue/login-session\n' +
      'content-length:0\n' +
      '\n\0';
    await this.ws.send(encoder.encode(command).buffer, true);
    this.isConnected = true;
    this.ping();
  };

  static onClose = () => {
    this.isConnected = false;
    console.log('Websocket Logout Close!');
  };

  static onError = error => {
    console.log(JSON.stringify(error));
    console.log(error, 'Websocket Logout Error!');
  };

  static onMessage = message => {
    console.log('Websocket Logout Message', message);
    if (DataLocal.accessToken !== null && message.data) {
      const split = message.data.split('\n');
      if (
        split[0] === 'MESSAGE' &&
        split.length > 4 &&
        split[2] === 'destination:/user/queue/login-session'
      ) {
          if (split[1] === 'event:login') {
            const data = JSON.parse(
              split[split.length - 1]
                .replace('\u0000', '')
                .replace('\\u0000', ''),
            );
            if (data) {
              console.log('CheckLogout: ', data)
              DataLocal.removeAll();
              WebSocketSafeZone.disconnect();
              WebSocketVideoCall.disconnect();
              XmppClient.disconnectXmppServer();
              reduxStore.store.dispatch(loginAction.logout());
            }
          }
        }
    }
  };
}
