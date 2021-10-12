const production = {
  env: 'production',
  xmppServer: 'poseidon.firecloud.live:5443',
  rootDomain: 'mykid.ttc.software',
}

const staging = {
  env: 'staging',
  xmppServer: 'dragon-uat.firecloud.live:5280',
  rootDomain: 'mykid.ttc.software',
}

const dev = {
  env: 'dev',
  xmppServer: 'dragon-dev.firecloud.live:5280',
  rootDomain: 'mykid.ttc.software',
}

export const RETRY_HTTP_REQUEST_NUMBER = 0;
export default {
  maxThumbnailSize: 600,
  dev,
  staging,
  production
}
