import DataLocal from '../../data/dataLocal';
import { generateRandomId } from '../../functions/utils';
import { wsCheckSim } from "../http/ApiUrl";
import * as encoding from 'text-encoding';
var encoder = new encoding.TextEncoder();

export default class WebSocketSafeZone {
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
    // console.log('WebSocketSafeZone Ping');
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
      'destination:/' + DataLocal.deviceId + '/sim-controller/upsertUsingPOST_3\n' +
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
    console.log('==============>>>>>>',message)
    // if (DataLocal.accessToken !== null && message.data) {
    //   const split = message.data.split('\n');
    //   if (
    //     split[0] === 'MESSAGE' &&
    //     split.length > 4 &&
    //     split[2] === 'destination:/user/queue/unsafe-locations'
    //   ) {
    //     const data = split.filter(val => val.includes('{'));
    //     if (data.length > 0) {
    //       if (split[1] === 'event:UNSAFE_LOCATION') {
    //         const infoDevice = JSON.parse(
    //           split[split.length - 1]
    //             .replace('\u0000', '')
    //             .replace('\\u0000', ''),
    //         );
    //         Vibration.vibrate(this.PATTERN, true);
    //         AlertDropHelper.show(
    //           Consts.dropdownAlertType.ERROR,
    //           'MyKid',
    //           `Thiết bị ${infoDevice.deviceCode} ra khỏi vùng an toàn `,
    //         );
    //         Sound.setCategory('Playback');
    //         this.ringtone = new Sound(
    //           'nof_default.mp3',
    //           Sound.MAIN_BUNDLE,
    //           error => {
    //             console.log('error', error);
    //             this.ringtone.play(() => {});
    //             this.ringtone.setNumberOfLoops(5);
    //           },
    //         );
    //         this.navigationRef.navigate(Consts.ScreenIds.ElectronicFence, {
    //           data: infoDevice,
    //         });
    //         setTimeout(() => {
    //           Vibration.cancel();
    //           if (this.ringtone) this.ringtone.stop();
    //         }, 1000 * 15);
    //       }
    //     }
    //   }
    //   console.log(message, 'WebSocketSafeZone Message');
    // }
  };
}
