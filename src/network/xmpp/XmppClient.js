import FastImage from 'react-native-fast-image';
import AppConfig from '../../data/AppConfig';
import DataLocal from '../../data/dataLocal';
import { generateRandomId } from '../../functions/utils';
import { getRoomsApi } from '../ChatService';
import {wssXmppUrl} from '../http/ApiUrl';
import chatAction from '../../redux/actions/chatAction';
const {client, xml, jid} = require('@xmpp/client');
const debug = require('@xmpp/debug');
import reduxStore from '../../redux/config/redux';
import Sound from 'react-native-sound';
import SimpleToast from 'react-native-simple-toast';

export default class XmppClient {
  static lstMsg = {};
  static lstRoom = [];
  static clientXmpp = null;
  static currentRoomId = null;
  static filePath = null;
  static ringtone = null;

  static connectXmppServer = () => {
    if (!DataLocal.userInfo.id || !DataLocal.accessToken) return;
    if (!this.clientXmpp) {
      clientXmpp = client({
        service: wssXmppUrl,
        username: DataLocal.userInfo.id,
        password: DataLocal.accessToken
      });
      debug(clientXmpp, true);
    }

    clientXmpp.on('error', err => { console.log(err); });
    // handle respond
    clientXmpp.on('stanza', async (stanza) => { await this.callbackStanza(stanza); });
    clientXmpp.on('online', async () => {
      console.log('online');
      if (clientXmpp === '') {
        return;
      }
      await clientXmpp.send(xml('presence'));
      await this.getRooms();
      await this.loadAllHistory();
      await this.ping();
    });
    clientXmpp.start().catch(console.error);
  };

  static ping = async () => {
    let message = xml('iq', {
        id: 'KAQWV-' + generateRandomId(),
        type: 'get',
        to: 'mykid.ttc.software'
      }, xml('ping', 
        {
          xmlns: 'urn:xmpp:ping'
        }
      ),
    );
    await clientXmpp.send(message);
    setTimeout(() => {
      this.ping();
    }, 10000)
  };

  static getRooms = async () => {
    await getRoomsApi({
      success: resData => {
        this.lstRoom = resData.data;
      },
    });
  };

  static loadAllHistory = async () => {
    for (const roomInfo of this.lstRoom) {
      this.lstMsg[roomInfo.roomAddress] = [];
      await this.joinRoom(roomInfo.roomAddress);
      await this.getHistory(roomInfo.flagTime);
    }
  }

  static disconnectXmppServer = () => {
    if (clientXmpp) {
      clientXmpp.stop().catch(console.error);
    }
  }

  static getNickName = () => {
    return `${DataLocal.userInfo.id}@${AppConfig.dev.rootDomain}`
  }

  static async joinRoom(roomId) {
    this.currentRoomId = roomId;
    const toAddress = [roomId, this.getNickName()].join('/');

    let message = xml('presence', { to: toAddress },);
    await clientXmpp.send(message);

    await this.pingRoom();
  }

  static pingRoom = async (isAuto = true) => {
    const toAddress = [this.currentRoomId, this.getNickName()].join('/');
    let message = xml('iq', {
        to: toAddress,
        from: this.getNickName(),
        type: 'get',
        id: generateRandomId() + ':ping',
      }, xml('ping', {xmlns: 'urn:xmpp:ping'}, )
    );
    await clientXmpp.send(message);
    if (isAuto) {
      setTimeout(() => {
        this.pingRoom();
      }, 10000)
    }
  };

  static setRoomId(roomId) {
    this.currentRoomId = roomId;
  }

  static getCurrentHistory() {
    return this.lstMsg[this.currentRoomId];
  }

  static cleanCurrentHistory() {
    this.lstMsg[this.currentRoomId] = [];
  }

  static async sendMessage(typeMsg, msg) {
    //typeMsg: text | audio | image
    const content = [typeMsg, msg].join(':');
    let message = xml('message', { 
        type: 'groupchat',
        to: this.currentRoomId
      },
      xml('body', {}, content)
    );
    await clientXmpp.send(message);
    await this.pingRoom(false);
  }

  static async getHistory(flagTime) {
    let message = xml('iq', 
      {
        id: generateRandomId() + ':history',
        type: 'set',
        to: this.currentRoomId
      }, xml('query', 
        {
          xmlns: 'urn:xmpp:mam:2',
          queryid: generateRandomId() + ':queryid'
        }, xml('x', 
          {
            type: 'submit',
            xmlns: 'jabber:x:data'
          }, xml('field',
            {
              var: 'FORM_TYPE'
            }, xml('value',
              {}, 'urn:xmpp:mam:2'
            ),
          ), xml('field',
            {
              var: 'start'
            }, xml('value',
              {}, flagTime
            ),
          ),
        ), xml('set',
          {
            xmlns: 'http://jabber.org/protocol/rsm'
          }, xml('before',
            {},
          ), xml('max', 
            {}, '100'
          ),
        ),
      ),
    );
    await clientXmpp.send(message);
  }

  static saveLastMsg(roomId, msg) {
    const index = this.lstRoom.findIndex(val => val.roomAddress === roomId);
    this.lstRoom[index].lastMsg = msg;
  }

  static async requestSendFile(path) {
    this.filePath = path;
    const file = await fetch(this.filePath);

    let message = xml('iq', {
        id: generateRandomId() + ':sendIQ',
        type: 'get',
        to: 'upload.mykid.ttc.software'
      }, xml('request', 
        {
          'content-type': file._bodyBlob._data.type,
          filename: file._bodyBlob._data.name,
          size: file._bodyBlob._data.size,
          xmlns: 'urn:xmpp:http:upload:0'
        }
      ),
    );

    await clientXmpp.send(message);
  }

  static uploadFile = function (putUrl, getUrl) {
    fetch(this.filePath).then((file) => {
      const header = {
        'content-type': file._bodyBlob._data.type,
        filename: file._bodyBlob._data.name,
        size: file._bodyBlob._data.size,
      }
      fetch(putUrl, {
        method: 'PUT',
        mode: 'cors',
        header : header,
        body: file._bodyBlob
      }).then((resp) => {
        const type = (getUrl.toUpperCase().endsWith('JPG') || getUrl.toUpperCase().endsWith('JPEG')) ? 'image' : 'audio';
        this.sendMessage(type, getUrl);
      });
    });
  }

  static callbackStanza = async function (stanza) {
    console.log(stanza);
    //<enabled resume="true" max="300" id="g2gCbQAAABk5ODg1ODUyNjg2NDQ5MDcyODg0MzY5MzgxbQAAAAhUwCXVzTdFdA==" xmlns="urn:xmpp:sm:3"/>
    if (stanza.is('enabled')) {
      console.log(stanza.attrs.id);
    }
    if (stanza.is('iq')) {
      const result = stanza.getChild('slot', 'urn:xmpp:http:upload:0');
      if (result) {
        const put = result.getChild('put');
        const get = result.getChild('get');
        const putUrl = put.attrs.url;
        const getUrl = get.attrs.url;

        if (this.filePath && putUrl && getUrl) {
          this.uploadFile(putUrl, getUrl);
          this.filePath = null;
        }
      }
      if (stanza.getChild('fin')) {
        console.log(this.lstMsg);
        reduxStore.store.dispatch(chatAction.updateMessage(this.lstMsg));
        for (const key in this.lstMsg) {
          if (Object.hasOwnProperty.call(this.lstMsg, key)) {
            const lst = this.lstMsg[key];
            if (lst.length > 0) {
              this.saveLastMsg(key, lst[lst.length - 1]);
            }
          }
        }
      }
    }

{/* 
  <iq xmlns="jabber:client" xml:lang="en" to="196@mykid.ttc.software/11572907895786457476399748" from="7304424985@conference.mykid.ttc.software/196@mykid.ttc.software" type="error" id="imt3cO0MeB:ping">
<ping xmlns="urn:xmpp:ping"/>
<error code="406" type="modify"><not-acceptable xmlns="urn:ietf:params:xml:ns:xmpp-stanzas"/><text xml:lang="en" xmlns="urn:ietf:params:xml:ns:xmpp-stanzas">Only occupants are allowed to send queries to the conference</text></error></iq> */}

    if (stanza.attrs.type === 'error') {
      const error = stanza.getChild('error');
      if (error && error.attrs.code === '406') {
        // TODO: test
        if (stanza.is('message'))
          SimpleToast.show('Have some error when send message');
        console.log('err 406 rejoin');
        // rejoin
        this.joinRoom(this.currentRoomId);
      }
      // <message xmlns="jabber:client" xml:lang="en" to="162@mykid.ttc.software/1171796266918910368535781" from="7304425285@conference.mykid.ttc.software" type="error">
      //   <error code="406" type="modify">
      //     <not-acceptable xmlns="urn:ietf:params:xml:ns:xmpp-stanzas"/>
      //     <text xml:lang="en" xmlns="urn:ietf:params:xml:ns:xmpp-stanzas">Only occupants are allowed to send messages to the conference</text></error><body>audio:https://mykid.ttc.software:5443/upload/46901d9bc4e0990d88f09f9f8db22236c5b8c401/bAbl6v4TTEJmJpiWn8LFQxdePDpr7daEC5FRxL7T/sound.m4a</body></message>
      return;
    }
    if (!stanza.is('message')) return;
  
    // mam result
    const result = stanza.getChild('result', 'urn:xmpp:mam:2');
    if (result) {
      const forwarded = result.getChild('forwarded', 'urn:xmpp:forward:0');
      if (!forwarded) return;
      const delay = forwarded.getChild('delay', 'urn:xmpp:delay');
      const message = forwarded.getChild('message');
      if (!message) return;
  
      const time = delay?.attrs.stamp ? new Date(delay?.attrs.stamp) : new Date();
      let body = message.getChildText('body');
      const fromSplit = message.attrs.from.split('/');
      if (!this.lstMsg[fromSplit[0]]) {
        this.lstMsg[fromSplit[0]] = [];
      }
      if (body && fromSplit.length > 1) {
        // const bodySplit = body.split(':');
        // message is a mam message
        let type = 'text';
        if (body.startsWith('audio')) {
          body = body.substr(6);
          type = 'audio';
        } else if (body.startsWith('image')) {
          body = body.substr(6);
          FastImage.preload([{uri: body}]);
          type = 'image';
        } else if (body.startsWith('text')) {
          body = body.substr(5);
        }

        const length = this.lstMsg[fromSplit[0]].length;
        let date = time.toLocaleDateString();
        let isShowDate = (length === 0 || this.lstMsg[fromSplit[0]][length - 1].date !== date);
        
        this.lstMsg[fromSplit[0]].push({
          from: fromSplit[1],
          body: body,
          type: type,
          time: time.toLocaleTimeString(),
          date: date,
          isShowDate: isShowDate
        })
      }
    }

    // msg 
    let body = stanza.getChildText('body');
    if (body) {
      console.log(body);
      const fromSplit = stanza.attrs.from.split('/');
      if (!this.lstMsg[fromSplit[0]]) {
        this.lstMsg[fromSplit[0]] = [];
      }
      if (body && fromSplit.length > 1) {
        let type = 'text';
        if (body.startsWith('audio')) {
          body = body.substr(6);
          type = 'audio';
        } else if (body.startsWith('image')) {
          body = body.substr(6);
          FastImage.preload([{uri: body}]);
          type = 'image';
        } else if (body.startsWith('text')) {
          body = body.substr(5);
        }
        const length = this.lstMsg[fromSplit[0]].length;
        let date = (new Date()).toLocaleDateString();
        let isShowDate = (length === 0 || this.lstMsg[fromSplit[0]][length - 1].date !== date);
        const msg = {
          from: fromSplit[1],
          body: body,
          type: type,
          time: (new Date()).toLocaleTimeString(),
          date: date,
          isShowDate: isShowDate
        };
        this.lstMsg[fromSplit[0]].push(msg);
        this.saveLastMsg(fromSplit[0], msg);

        if (msg.from !== `${DataLocal.userInfo.id}@${AppConfig.dev.rootDomain}`) {
          Sound.setCategory('Playback');
          this.ringtone = new Sound(
            'message.mp3',
            Sound.MAIN_BUNDLE,
            error => {
              console.log('error', error);
              this.ringtone.play(() => {});
            },
          );
        }
        reduxStore.store.dispatch(chatAction.updateMessage(this.lstMsg));
      }
    }
  };
}