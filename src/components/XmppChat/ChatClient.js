import React, {Component} from 'react';
import DataLocal from '../../data/dataLocal';
import {wssXmppUrl} from '../../network/http/ApiUrl';
import * as RNFS from 'react-native-fs';
import { uploadFile } from '../../network/http/HttpClient';
const {client, xml, jid} = require('@xmpp/client');
const debug = require('@xmpp/debug');
let clientXmpp = '';

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

  initXmpp() {

    debug(clientXmpp, true);
    clientXmpp.on('error', err => {});
    // handle respond
    clientXmpp.on('stanza', this.callbackStanza);
    clientXmpp.on('online', async () => {
      console.log('online');
      if (clientXmpp === '') {
        return;
      }

      await clientXmpp.send(xml('presence'));
      let message = xml(
        'presence',
        {
          to: '7304425285@conference.mykid.ttc.software/140'
        }
      );

      await clientXmpp.send(message);

//       <message
//     from='romeo@example.net/orchard'
//     id='sl3nx51f'
//     to='juliet@example.com/balcony'
//     type='chat'
//     xml:lang='en'>
//   <body>Neither, fair saint, if either thee dislike.</body>
// </message>

      // message = xml(
      //   'message',
      //   {
      //     type: 'groupchat',
      //     to: '7304425285@conference.mykid.ttc.software'
      //   },
      //   xml('body', {}, 'image:https://www.dungplus.com/wp-content/uploads/2019/12/girl-xinh-1-480x600.jpg'),
      // );

      // await clientXmpp.send(message);
       


      const file = await RNFS.readFile('file:///var/mobile/Containers/Data/Application/A8DDCFD8-7D6B-47AD-8E05-E527F7A51F6E/Library/Caches/sound.m4a', 'base64')

      // message = xml(
      //   'iq',
      //   {
      //     id:'222:sendIQ',
      //     type: 'get',
      //     to: 'upload.mykid.ttc.software'
      //   },
      //   xml('request', 
      //     {
      //       'content-type': 'audio/mpeg',
      //       filename: 'sound.m4a',
      //       size: file.length,
      //       xmlns: 'urn:xmpp:http:upload:0'
      //     }
      //   ),
      // );

      // await clientXmpp.send(message);
      const header = {
        'content-type': 'audio/mpeg',
        filename: 'sound.m4a',
        size: file.length
      }
      uploadFile('https://mykid.ttc.software:5443/upload/924382e303b4b1fb6be0e6f14cd541eca52b3eb8/t5QpnzKyMdEzyO058YBiCbkGJYmjqMfNmI2qHHR3/sound.m4a',
      {file, header, 
        success: success => {
          console.log(success);
        },
        failure: err => {
          console.log(err);
        }
      })
    });
    clientXmpp.start().catch(console.error);
  }
  callbackStanza = function (stanza) {
    console.log(stanza);
    // <iq xmlns="jabber:client" xml:lang="en" to="140@mykid.ttc.software/13019148890870797925924" from="upload.mykid.ttc.software" type="result" id="222:sendIQ"><slot xmlns="urn:xmpp:http:upload:0">
    //<get url="https://mykid.ttc.software:5443/upload/924382e303b4b1fb6be0e6f14cd541eca52b3eb8/t5QpnzKyMdEzyO058YBiCbkGJYmjqMfNmI2qHHR3/sound.m4a"/>
    //<put url="https://mykid.ttc.software:5443/upload/924382e303b4b1fb6be0e6f14cd541eca52b3eb8/t5QpnzKyMdEzyO058YBiCbkGJYmjqMfNmI2qHHR3/sound.m4a"/></slot></iq>
  };
  render() {
    return <></>;
  }
}

// <iq from="102@..." id="...:sendIQ" 
// to="upload.mykid.ttc.software" type="get" xmlns="jabber:client">
//   <request content-type="image/jpeg" filename="242720184_1032201997615223_432968261034897369_n.jpg" 
//   size="40673" xmlns="urn:xmpp:http:upload:0"/></iq>
{/* <iq id="222:sendIQ" type="get" to="upload.mykid.ttc.software" xmlns="jabber:client">
// <request content-type="audio/mpeg" filename="sound.m4a" size="80772"/></iq> */}
//   <iq xmlns='jabber:client' from='upload.dragon-uat.firecloud.live' xml:lang='en'
//    to='102@dragon-uat.firecloud.live/converse.js-16536698' type='result'
//     id='fc83856c-37a1-4963-a451-728cfb01f403:sendIQ'>
//       <slot xmlns='urn:xmpp:http:upload:0'>
//         <get url='https://dragon-uat.firecloud.live:5443/upload/f66fe096947f555c3d0ad71b3b6cbc1d01420a0b/hcf7Fnk9AzN3GDiAFhYweJuVfQtt9EZMxgherJpO/242720184_1032201997615223_432968261034897369_n.jpg'/>
//         <put url='https://dragon-uat.firecloud.live:5443/upload/f66fe096947f555c3d0ad71b3b6cbc1d01420a0b/hcf7Fnk9AzN3GDiAFhYweJuVfQtt9EZMxgherJpO/242720184_1032201997615223_432968261034897369_n.jpg'/></slot></iq>