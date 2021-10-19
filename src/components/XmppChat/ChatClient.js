import React, {Component} from 'react';
import DataLocal from '../../data/dataLocal';
import {wssXmppUrl} from '../../network/http/ApiUrl';
import * as RNFS from 'react-native-fs';
import { uploadFile } from '../../network/http/HttpClient';
const {client, xml, jid} = require('@xmpp/client');
const debug = require('@xmpp/debug');
import RNFetchBlob from 'react-native-fetch-blob'
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
      // <iq id="333:st" type="set" xmlns="jabber:client"><query xmlns="urn:xmpp:mam:2">
      //   <x type="submit" xmlns="urn:xmpp:mam:2">
      //     <field type="hidden" var="FORM_TYPE">
      //       <value>urn:xmpp:mam:2</value></field></x></query></iq>
{/* <iq type="set">
      <query xmlns="urn:xmpp:mam:2">
        <x xmlns="jabber:x:data" type="submit">
          <field var="FORM_TYPE" type="hidden">
            <value>urn:xmpp:mam:2</value>
          </field>
          {args.with && (
            <field var="with">
              <value>{args.with}</value>
            </field>
          )}
          {start && (
            <field var="start">
              <value>{new Date(start).toISOString()}</value>
            </field>
          )}
          {end && (
            <field var="end">
              <value>{new Date(end).toISOString()}</value>
            </field>
          )}
        </x>
        <set xmlns="http://jabber.org/protocol/rsm">
          {max && <max>{max}</max>}
          {typeof before === 'string' && <before>{before}</before>}
          {typeof after === 'string' && <after>{after}</after>}
        </set>
      </query>
    </iq>, */}
// console.log('xxc');
//       message = xml('iq',
//         {
//           id:'70:st',
//           type: 'set',
//           to: '7304425285@conference.mykid.ttc.software'
//         },
//         xml('query', 
//           {
//             xmlns: 'urn:xmpp:mam:2'
//           },
//           xml('x', 
//             {
//               type: 'submit',
//               xmlns: 'urn:xmpp:mam:2'
//             },
//             xml('field', 
//               {
//                 var: 'FORM_TYPE'
//               },
//               xml('value', 
//                 {
//                 },
//                 'urn:xmpp:mam:2'
//               ),
//             ),
//           ),
//           xml('set', 
//             {
//               xmlns: 'http://jabber.org/protocol/rsm'
//             },
//             xml('before', 
//               {
//               },
//             ),
//             xml('max', 
//               {
//               },
//               '10'
//             ),
//           )
//         )
//       );
// 2011-10-05T14:48:00.000Z
      // await clientXmpp.send(message);

      const file = await RNFS.readFile('file:///var/mobile/Containers/Data/Application/D695C7A2-3485-4FF8-8363-40F32C1FD653/Documents/44ADBC08-7A5A-4583-9143-95A33A644002.jpg', 'base64')
       // const file = await RNFetchBlob.fs.readFile('file:///var/mobile/Containers/Data/Application/D695C7A2-3485-4FF8-8363-40F32C1FD653/Documents/44ADBC08-7A5A-4583-9143-95A33A644002.jpg', 'base64')

// var files = [
//   {
//     name: 'anh',
//     filename: 'anh.jpg',
//     filepath: 'file:///var/mobile/Containers/Data/Application/D695C7A2-3485-4FF8-8363-40F32C1FD653/Documents/44ADBC08-7A5A-4583-9143-95A33A644002.jpg',
//     filetype: 'image/jpeg'
//   }
// ];
//       RNFS.uploadFiles({
//         toUrl: 'https://mykid.ttc.software:5443/upload/924382e303b4b1fb6be0e6f14cd541eca52b3eb8/bMOZz3rmu4jTPNOuVep9I3bnksZo0paKDCBZlUvK/anh.jpg',
//         files: files,
//         method: 'PUT',
//         headers: {
//           'Accept': 'application/octet-stream',
//         }
//       }).promise.then((response) => {
//           if (response.statusCode == 200) {
//             console.log('FILES UPLOADED!'); // response.statusCode, response.headers, response.body
//           } else {
//             console.log('SERVER ERROR');
//           }
//         })
//         .catch((err) => {
//           if(err.description === "cancelled") {
//             // cancelled by user
//           }
//           console.log(err);
//         });
      message = xml(
        'iq',
        {
          id:'23456:sendIQ',
          type: 'get',
          to: 'upload.mykid.ttc.software'
        },
        xml('request', 
          {
            'content-type': 'application/octet-stream',
            filename: 'CF95F36E-E7DA-46F7-8A30-E91F5FF612C0.jpg',
            size: file.length,
            xmlns: 'urn:xmpp:http:upload:0'
          }
        ),
      );

      await clientXmpp.send(message);
      // const header = {
      //   'content-type': 'application/octet-stream',
      //   filename: 'anh.jpg',
      //   size: file.length
      // }
      // uploadFile('https://mykid.ttc.software:5443/upload/924382e303b4b1fb6be0e6f14cd541eca52b3eb8/bMOZz3rmu4jTPNOuVep9I3bnksZo0paKDCBZlUvK/anh.jpg',
      // {file, header, 
      //   success: success => {
      //     console.log(success);
      //   },
      //   failure: err => {
      //     console.log(err);
      //   }
      // })
    });
    clientXmpp.start().catch(console.error);
  }

  // handlePress = async (putUrl) => {
  //   fetch(putUrl)
  //     .then((response) => response.json())
  //     .then((responseJson) => {
  //  Alert.alert("The film at 2nd:  " + responseJson.movies[1].title);
  //     })
  //     .catch((error) => {
  //       console.error(error);
  //     });
  // }

  callbackStanza = async function (stanza) {
    console.log(stanza);
    if (stanza.is('iq')) {
      const result = stanza.getChild('slot', 'urn:xmpp:http:upload:0');
      if (result) {
        const put = result.getChild('put');
        console.log(put.attrs.url);
        const putUrl = put.attrs.url;

        const file = await RNFS.readFile('file:///var/mobile/Containers/Data/Application/D695C7A2-3485-4FF8-8363-40F32C1FD653/Documents/44ADBC08-7A5A-4583-9143-95A33A644002.jpg', 'base64')
      
        // const file = await RNFetchBlob.fs.readFile('file:///var/mobile/Containers/Data/Application/D695C7A2-3485-4FF8-8363-40F32C1FD653/Documents/44ADBC08-7A5A-4583-9143-95A33A644002.jpg', 'base64')
        const dirs = RNFetchBlob.fs.dirs.DocumentDir
        console.log(dirs)
        console.log('dirs')

        fetch('file:///var/mobile/Containers/Data/Application/D695C7A2-3485-4FF8-8363-40F32C1FD653/Documents/44ADBC08-7A5A-4583-9143-95A33A644002.jpg').then( (response) => {

          console.log(response);
          let blob = response.getBinaryData();
          console.log(blob);
          // fetch(putUrl, {
          //     method: 'PUT',
          //     mode: 'cors',
          //     header : header,
          //     body: data
          //     })
      })

        // RNFetchBlob.fs.readFile(dirs + '/CF95F36E-E7DA-46F7-8A30-E91F5FF612C0.jpg', 'base64')
        // .then((base64DataString) => {

        //   const header = {
        //     'content-type': 'application/octet-stream',
        //     filename: 'CF95F36E-E7DA-46F7-8A30-E91F5FF612C0.jpg',
        //     size: file.length,
        //   }
        //   // RNFetchBlob.fetch('PUT', putUrl, {
        //   //   'Content-Type' : 'application/octet-stream',
        //   // }, data);
        //   RNFetchBlob.fetch('PUT', putUrl, {
        //     //... some headers,
        //     'Content-Type' : 'octet-stream'
        //   }, base64DataString)
        //   // listen to upload progress event
        //   .uploadProgress((written, total) => {
        //       console.log('uploaded', written / total)
        //   })
        //   // listen to download progress event
        //   .progress((received, total) => {
        //       console.log('progress', received / total)
        //   })
        //   .then((resp) => {
        //     console.log(resp)
        //     // ...
        //   })
        //   .catch((err) => {
        //     console.log(err)
        //     // ...
        //   })
          // console.log(file.length);
          // console.log(data.length);
          // fetch(putUrl, {
          //     method: 'PUT',
          //     mode: 'cors',
          //     header : header,
          //     body: data
          //     })
        // })

var files = [
  {
    filepath: 'file:///var/mobile/Containers/Data/Application/D695C7A2-3485-4FF8-8363-40F32C1FD653/Documents/44ADBC08-7A5A-4583-9143-95A33A644002.jpg',
  }
];

       
        
        // setTimeout(() => {
          // RNFS.uploadFiles({toUrl: putUrl, // URL to upload file to
          //   // binaryStreamOnly: true, // Allow for binary data stream for file to be uploaded without extra headers, Default is 'false'
          //   files: files, // An array of objects with the file information to be uploaded.
          //   // headers: header, // An object of headers to be passed to the server
          //   method: 'PUT' // Default is 'POST', supports 'POST' and 'PUT')
          // })  
          // fetch(putUrl, {
          //   method: 'PUT',
          //   mode: 'cors',
          //   header : header,
          //   body: file
          //   })
        // }, 1500);

        
        // RNFetchBlob.fetch('PUT', putUrl, {
        //   'Content-Type' : 'application/octet-stream',
        // }, file);

        const get = result.getChild('get');
        console.log(get.attrs.url);
        // const form = new FormData();

        // form.append('image', {
        //   uri: 'file:///var/mobile/Containers/Data/Application/D695C7A2-3485-4FF8-8363-40F32C1FD653/Documents/44ADBC08-7A5A-4583-9143-95A33A644002.jpg',
        //   type: 'image/jpg',
        //   name: 'image.jpg',
        // });

        // uploadFile(putUrl,
        // {form, header, 
        //   success: success => {
        //     console.log(success);
        //   },
        //   failure: err => {
        //     console.log(err);
        //   }
        // })
      }
      // var files = [
      //   {
      //     name: 'anh',
      //     filename: 'anh.jpg',
      //     filepath: 'file:///var/mobile/Containers/Data/Application/D695C7A2-3485-4FF8-8363-40F32C1FD653/Documents/44ADBC08-7A5A-4583-9143-95A33A644002.jpg',
      //     filetype: 'image/jpeg'
      //   }
      // ];
      // RNFS.uploadFiles({
      //   toUrl: putUrl,
      //   files: files,
      //   method: 'PUT',
      //   headers: {
      //     'Accept': 'application/octet-stream',
      //   }
      // }).promise.then((response) => {
      //     if (response.statusCode == 200) {
      //       console.log('FILES UPLOADED!'); // response.statusCode, response.headers, response.body
      //     } else {
      //       console.log('SERVER ERROR');
      //     }
      //   })
      //   .catch((err) => {
      //     if(err.description === "cancelled") {
      //       // cancelled by user
      //     }
      //     console.log(err);
      //   });
      // }
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