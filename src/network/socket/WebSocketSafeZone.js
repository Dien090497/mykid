import { Vibration } from 'react-native';
import Sound from 'react-native-sound';
import DataLocal from '../../data/dataLocal';
import { AlertDropHelper } from '../../functions/AlertDropHelper';
import Consts from '../../functions/Consts';
import { generateRandomId } from '../../functions/utils';
import { wsSafeZoneUrl } from '../http/ApiUrl';
import * as encoding from 'text-encoding';
var encoder = new encoding.TextEncoder();

export default class WebSocketSafeZone {
  static ws = null;
  static ringtone = null;
  static reconnect = false;
  static isConnected = false;
  static navigationRef = null;

  static PATTERN = [
    0, 500, 110, 500, 110, 450, 110, 200, 110, 170, 40, 450, 110, 200, 110, 170,
    40, 500,
  ];

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
    AlertDropHelper.setOnClose(() => {
      Vibration.cancel();
      if (this.ringtone) this.ringtone.stop();
    });

    this.ws = new WebSocket(wsSafeZoneUrl);
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
    // console.log('WebSocketSafeZone Ping');
    await this.ws.send(encoder.encode('').buffer, true);
    setTimeout(() => {
      if (this.reconnect) {
        this.ping();
      }
    }, 3000)
  };

  static onOpen = async () => {
    console.log('Websocket SafeZone Open!');
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
      'destination:/user/queue/unsafe-locations\n' +
      'content-length:0\n' +
      '\n\0';
    await this.ws.send(encoder.encode(command).buffer, true);
    this.isConnected = true;

    this.ping();
  };

  static onClose = () => {
    console.log('Websocket SafeZone Close!');
    this.isConnected = false;
  };

  static onError = error => {
    console.log(JSON.stringify(error));
    console.log(error, 'Websocket Error!');
  };

  static onMessage = message => {
    if (DataLocal.accessToken !== null && message.data) {
      const split = message.data.split('\n');
      if (
        split[0] === 'MESSAGE' &&
        split.length > 4 &&
        split[2] === 'destination:/user/queue/unsafe-locations'
      ) {
        const data = split.filter(val => val.includes('{'));
        if (data.length > 0) {
          if (split[1] === 'event:UNSAFE_LOCATION') {
            const infoDevice = JSON.parse(
              split[split.length - 1]
                .replace('\u0000', '')
                .replace('\\u0000', ''),
            );
            Vibration.vibrate(this.PATTERN, true);
            AlertDropHelper.show(
              Consts.dropdownAlertType.ERROR,
              'MyKid',
               DataLocal.language === 'vi' ? `Thiết bị ${infoDevice.deviceCode} ra khỏi vùng an toàn ` : `Device ${infoDevice.deviceCode} is out of the safe zone `
            );
            Sound.setCategory('Playback');
            this.ringtone = new Sound(
              'nof_default.mp3',
              Sound.MAIN_BUNDLE,
              error => {
                console.log('error', error);
                this.ringtone.play(() => {});
                this.ringtone.setNumberOfLoops(5);
              },
            );
            console.log('DATA',infoDevice)
            this.navigationRef.navigate(Consts.ScreenIds.ElectronicFence, {
              data: infoDevice,
            });
            setTimeout(() => {
              Vibration.cancel();
              if (this.ringtone) this.ringtone.stop();
            }, 1000 * 15);
          }
        }
      }
      console.log(message, 'WebSocketSafeZone Message');
    }
  };
}
