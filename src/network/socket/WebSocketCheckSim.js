import DataLocal from '../../data/dataLocal';
import { generateRandomId } from '../../functions/utils';
import { wsCheckSim } from "../http/ApiUrl";
import * as encoding from 'text-encoding';
var encoder = new encoding.TextEncoder();

export default class WebSocketCheckSim {
  static ws = null;
  static reconnect = false;
  static navigationRef = null;


  static setReconnect(autoReconnect) {
    this.reconnect = !!autoReconnect;
  }

  static disconnect() {
    this.reconnect = false;
    this.ws.close();
  }

  static _handleWebSocketSetup = (navigation) => {
    this.navigationRef = navigation;

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
    console.log('Websocket Check Sim Open!');
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
      'destination:/user/queue/sims\n' +
      'content-length:0\n' +
      '\n\0';
    await this.ws.send(encoder.encode(command).buffer, true);

    this.ping();
  };

  static onClose = () => {
    console.log('Websocket Check Sim Close!');
  };

  static onError = error => {
    console.log(JSON.stringify(error));
    console.log(error, 'Websocket Check Sim Error!');
  };

  static onMessage = message => {
    if (DataLocal.accessToken !== null && message.data) {
      const split = message.data.split('\n');
      if (
        split[0] === 'MESSAGE' &&
        split.length > 4 &&
        split[2] === 'destination:/user/queue/sims'
      ) {
        const data = JSON.parse(
          split[split.length - 1].replace('\u0000', '').replace('\\u0000', ''),
        );
        if (data && data.deviceId === DataLocal.deviceId){
          const checkSim = data.isValid ? '1' : '0';
          DataLocal.haveSim === checkSim ? null : DataLocal.saveHaveSim(checkSim).then(r => console.log('SIM',DataLocal.haveSim))
        }
      }
      console.log(message, 'WebSocketSafeZone Message');
    }
  };
}
