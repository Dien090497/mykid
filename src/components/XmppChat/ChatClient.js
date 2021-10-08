import React, {Component} from 'react';
import {wssXmppUrl} from '../../network/http/ApiUrl';
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
      username: '140',
      password:
        'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJqaWQiOiIxNDBAbXlraWQudHRjLnNvZnR3YXJlIiwiaWQiOjE0MCwiZXhwIjoxNjM2Njc4NzEzLCJpYXQiOjE2MzMwNzg3MTMsImVtYWlsIjoiQW5odnRAZ21haWwuY29tIiwianRpIjoiYzE4MDVjMTctYTZhYi00NzFjLWFmYzctZmEyNDM1YmFkNjk0In0.jkB3cMDVMhT6QC5YyLbt9edZvWJ6YJDgKAHcM_POHCe3IBA5thB8XaozhiQXai5XGHpBWcqkO1MjC2fM2D8juYnRSq_LwiMOZoqMkeh5AsEl7ea7GikCpZw5TrNB0tSdZ40zUqe28lQ4dITK6VLw263J8r1ZLn1sgV3Z0THsFBk5vvDSQ_78KQGUZ-eVgL2uNaInc6UCzTbme2bl9RQvEApsdAjfCQcLgi6qYCzRbBUAc-VKb_cdZ1seU6wHwLURaiA_5sf4CjMhDdEgXtU5XeVcl8FT6xdogqmxY8XcaLYI7Cs2bIrMXYTwMzQ_nogY0OpSO3fl8PyUIbaFXgCXXULrCmgSuBGDdlvZEIq4cfClxXawmM6IfTi23Q2rciiBOmYLvHcLiplJ_avPxZH-MaGKFV3mdhSMiMkMlqB-9iaAPiIub-Yp6O0Ad_BkNTRquRgNl2m2JjDfUSg-jOHrA1XoxU9O_bScitsc5v5DASzeeOwllp3ujj6uupgWUzHTbHabi_htlnI7mmV8HxMV3WglBm_f3HXanvpuAQpztDZ5nbG4GbiqPeCI4ChdVeT5outZp1MzSL2vjHm5PchZ20a3TqvEE2IaejiuSgM0bTbVFDONwE_dAdejmHJ3O_n-JMLUgJLUYxW77qSfsfzS3lhd_piqg7KJCp8mG0V0EH8',
    });
    this.initXmpp();
  }
  initXmpp() {
    debug(clientXmpp, true);
    clientXmpp.on('error', err => {});
    // handle respond
    clientXmpp.on('stanza', this.callbackStanza);
    clientXmpp.on('online', async () => {
      if (clientXmpp === '') {
        return;
      }

      await clientXmpp.send(xml('presence'));
      const message = xml('presence', {
        to: 'test@conference.mykid.ttc.software',
      });
      await clientXmpp.send(message);
    });
    clientXmpp.start().catch(console.error);
  }
  callbackStanza = function (stanza) {

  };
  render() {
    return <></>;
  }
}
