const production = {
  env: 'production',
  xmppServer: 'mykid.ttc.software:5443',
  rootDomain: 'mykid.ttc.software',
};

const staging = {
  env: 'staging',
  xmppServer: 'mykid.ttc.software:5443',
  rootDomain: 'mykid.ttc.software',
};

const dev = {
  env: 'dev',
  xmppServer: 'mykid.ttc.software:5443',
  rootDomain: 'mykid.ttc.software',
};

export const RETRY_HTTP_REQUEST_NUMBER = 0;
export default {
  maxThumbnailSize: 600,
  dev,
  staging,
  production,
};
