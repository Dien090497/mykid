import RNFetchBlob from 'react-native-fetch-blob';
import AppConfig from '../../data/AppConfig';
import DataLocal from '../../data/dataLocal';
import { generateRandomId } from '../../functions/utils';
import {wssXmppUrl} from '../../network/http/ApiUrl';
import chatAction from '../../redux/actions/chatAction';
const {client, xml, jid} = require('@xmpp/client');
const debug = require('@xmpp/debug');
// const roomId = '7304425285@conference.mykid.ttc.software';
import reduxStore from '../../redux/config/redux';
// const filePath = 'file:///var/mobile/Containers/Data/Application/E1850AAA-FFDF-4890-93E4-D522433C28AE/tmp/E1539DE6-72E0-4815-84B1-0A2E63D59878.jpg';
const filePath = 'file:///var/mobile/Containers/Data/Application/E1850AAA-FFDF-4890-93E4-D522433C28AE/Library/Caches/sound.m4a';
export default class XmppClient {
  static lstMsg = [];
  static clientXmpp = null;
  // static needReconnect = false;

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
    });
    clientXmpp.start().catch(console.error);
  };

  static disconnectXmppServer = () => {
    if (clientXmpp) {
      clientXmpp.stop().catch(console.error);
    }
  }

  static getNickName = () => {
    return `${DataLocal.userInfo.id}@${AppConfig.dev.rootDomain}`
  }

  static async joinRoom(roomId) {
    const toAddress = [roomId, this.getNickName()].join('/');

    let message = xml('presence', { to: toAddress });
    await clientXmpp.send(message);
  }

  static async sendMessage(roomId, typeMsg, msg) {
    //typeMsg: text | audio | image
    const content = [typeMsg, msg].join(':');
    let message = xml('message', { 
        type: 'groupchat',
        to: roomId
      },
      xml('body', {}, content)
    );
    await clientXmpp.send(message);
  }

  static async getHistory(roomId, maxLength) {
    this.lstMsg = [];
    let message = xml('iq', 
      {
        id: generateRandomId() + ':history',
        type: 'set',
        to: roomId
      }, xml('query', 
        {
          xmlns: 'urn:xmpp:mam:2'
        }, xml('x', 
          {
            type: 'submit',
            xmlns: 'urn:xmpp:mam:2'
          }, xml('field',
            {
              var: 'FORM_TYPE'
            }, xml('value',
              {}, 'urn:xmpp:mam:2'
            ),
          ),
        ), xml('set',
          {
            xmlns: 'http://jabber.org/protocol/rsm'
          }, xml('before',
            {},
          ), xml('max', 
            {}, maxLength.toString()
          ),
        ),
      ),
    );
    await clientXmpp.send(message);
  }

  static async requestSendFile(path) {
    filePath = path;
    const file = await fetch(filePath);

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

  static uploadFile = function (filePath, putUrl) {
    fetch(filePath).then((file) => {
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
      });
    });
  }

  static callbackStanza = async function (stanza) {
    console.log(stanza);
    if (stanza.is('iq')) {
      const result = stanza.getChild('slot', 'urn:xmpp:http:upload:0');
      if (result) {
        const put = result.getChild('put');
        console.log(put.attrs.url);
        const putUrl = put.attrs.url;

        if (filePath && putUrl) {
          this.uploadFile(filePath, putUrl);
          filePath = null;
        }

        const get = result.getChild('get');
        console.log(get.attrs.url);

        // this.sendMessage(roomId, 'audio', get.attrs.url);
      }
      if (stanza.getChild('fin')) {
        console.log(this.lstMsg);
        reduxStore.store.dispatch(chatAction.updateMessage(this.lstMsg));
      }
    }

    if (!stanza.is('message')) return;
    if (stanza.attrs.type === 'error') return;
  
    // mam result
    const result = stanza.getChild('result', 'urn:xmpp:mam:2');
    if (result) {
      const forwarded = result.getChild('forwarded', 'urn:xmpp:forward:0');
      if (!forwarded) return;
      const delay = forwarded.getChild('delay', 'urn:xmpp:delay');
      const message = forwarded.getChild('message');
      if (!message) return;
  
      const date = delay?.attrs.stamp ? new Date(delay?.attrs.stamp) : undefined;
      let body = message.getChildText('body');
      const fromSplit = message.attrs.from.split('/');
      if (body && fromSplit.length > 1) {
        // const bodySplit = body.split(':');
        // message is a mam message
        let type = 'text';
        if (body.startsWith('audio')) {
          body = body.substr(6);
          type = 'audio';
        } else if (body.startsWith('image')) {
          body = body.substr(6);
          type = 'image';
        } else if (body.startsWith('text')) {
          body = body.substr(5);
        }
        
        this.lstMsg.push({
          from: fromSplit[1],
          body: body,
          type: type,
          time: date
        })
      }
    }

    // msg 
    let body = stanza.getChildText('body');
    if (body) {
      console.log(body);
      const fromSplit = stanza.attrs.from.split('/');
      if (body && fromSplit.length > 1) {
        // const bodySplit = body.split(':');
        // message is a mam message
        let type = 'text';
        if (body.startsWith('audio')) {
          body = body.substr(6);
          type = 'audio';
        } else if (body.startsWith('image')) {
          body = body.substr(6);
          type = 'image';
        } else if (body.startsWith('text')) {
          body = body.substr(5);
        }
        
        this.lstMsg.push({
          from: fromSplit[1],
          body: body,
          type: type,
          time: new Date()
        })
        reduxStore.store.dispatch(chatAction.updateMessage(this.lstMsg));
      }
    }
  };
}