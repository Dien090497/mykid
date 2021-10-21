import React, {Component} from 'react';
import { generateRandomId } from '../../functions/utils';
import {wssXmppUrl} from '../../network/http/ApiUrl';
const {client, xml, jid} = require('@xmpp/client');
const debug = require('@xmpp/debug');
let clientXmpp = '';
const roomId = '7304425285@conference.mykid.ttc.software';
// const filePath = 'file:///var/mobile/Containers/Data/Application/E1850AAA-FFDF-4890-93E4-D522433C28AE/tmp/E1539DE6-72E0-4815-84B1-0A2E63D59878.jpg';
const filePath = 'file:///var/mobile/Containers/Data/Application/E1850AAA-FFDF-4890-93E4-D522433C28AE/Library/Caches/sound.m4a';
export default class ChatClient extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    clientXmpp = client({
      service: wssXmppUrl,
      username: 140,
      password: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJqaWQiOiIxNDBAbXlraWQudHRjLnNvZnR3YXJlIiwiaWQiOjE0MCwiZXhwIjoxNjM3NzgxMDQ0LCJpYXQiOjE2MzQxODEwNDQsImVtYWlsIjoiQW5odnRAZ21haWwuY29tIiwianRpIjoiMGRkZGQzYTctNzQ4Mi00Njc3LTk3NzUtNjhiMzkwNmQ5MTc2In0.OPHHQpzZ0B98MBF-4-N6o7AiIt7_gLEwPDj9n1bFVCUK20orwUtHj5_lWxQtsdZ1a1O5Tt7f-6juKpCBqiA3ezlXQotG3AZFZPXu4kelmCY47jXjOT4NaBuOg1yOlzEY-X2TkGmVrwXZCJkwzbk_xW3jPA1-4BQPNSLOAXMQXW0zbBTsdd3cDeS0LWEz6YMaqH_Q9CpjBgO_HCGM4MeNhfY9b7a4B1cDOPE5rV-dYm2Lio6SjLSfNAaW62bstACFGUiahB_1JNgzXT9UnuLSAuRNC7aiKD7Ujlo-rCvq2MZSdZHCHjnlfU6vQgEFeC-HeGwFTyKggy4aOhi1OLq-SwHBWx3s0eztRY6npU5M2VIp_b-No2jugh12wX-plQkpLbVDowxQWVsQGOCCStVdyW9YD1QTWk9Siyn92KmxYk7FtyhqV0uwGIUly-REa_Yh4Ho_DLEAm8Al88a6Q8uw4rU8iZsETcwsW2G5n8vBu3_NrTF2zjzk_ri5mcC-ZeEXnlqzFHdwNoNLeOfvkH1Ungy6CiKGo0QFPoRHSOV68puS1bOUk0MZKoqH_WPbktg64ihnqBWtFDbjAHGnY3hCkEk2MmdBSPXWC5TyWKfkKmWAr0PSzFkSM5eqRLXT0f42AbNUROkhYreE4p6WFjvNQTj4acuyKundMWmGKnw-jmI'
    });
    this.initXmpp();
  }

  componentWillUnmount() {
    if (clientXmpp) {
      clientXmpp.stop().catch(console.error);
    }
  }

  async joinRoom(roomId, nickname) {
    const toAddress = [roomId, nickname].join('/');

    let message = xml('presence', { to: toAddress });
    await clientXmpp.send(message);
  }

  async sendMessage(roomId, typeMsg, msg) {
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

  async getHistory(roomId, maxLength) {
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

  async requestSendFile(filePath) {
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

  uploadFile = function (filePath, putUrl) {
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

  initXmpp() {

    debug(clientXmpp, true);
    clientXmpp.on('error', err => {});
    // handle respond
    clientXmpp.on('stanza', async (stanza) => { await this.callbackStanza(stanza); });
    clientXmpp.on('online', async () => {
      console.log('online');
      if (clientXmpp === '') {
        return;
      }
      await clientXmpp.send(xml('presence'));

      await this.joinRoom(roomId, '140@mykid.ttc.software');

      await this.sendMessage(roomId, 'text', 'text content111');

      // await this.getHistory(roomId, 3);
     
      // await this.requestSendFile(filePath);
    });
    clientXmpp.start().catch(console.error);
  }

  callbackStanza = async function (stanza) {
    console.log(stanza);
    if (stanza.is('iq')) {
      const result = stanza.getChild('slot', 'urn:xmpp:http:upload:0');
      if (result) {
        const put = result.getChild('put');
        console.log(put.attrs.url);
        const putUrl = put.attrs.url;

        // this.uploadFile(filePath, putUrl);

        const get = result.getChild('get');
        console.log(get.attrs.url);

        // this.sendMessage(roomId, 'audio', get.attrs.url);
      }
    }

    if (!stanza.is('message')) return;
    if (stanza.attrs.type === 'error') return;
  
    // other kinds of messages
    // ...
  
    // mam result
    const result = stanza.getChild('result', 'urn:xmpp:mam:2');
    if (result) {
      const forwarded = result.getChild('forwarded', 'urn:xmpp:forward:0');
      if (!forwarded) return;
      const delay = forwarded.getChild('delay', 'urn:xmpp:delay');
      const message = forwarded.getChild('message');
      if (!message) return;
  
      const date = delay?.attrs.stamp ? new Date(delay?.attrs.stamp) : undefined;
      if (message.getChildText('body')) {
        // message is a mam message
      }
    }
  };
  render() {
    return <></>;
  }
}