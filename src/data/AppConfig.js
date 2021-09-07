const production = {
  env: 'production',
  xmppServer: 'poseidon.firecloud.live:5443',
  rootDomain: 'hera.firecloud.live',
}

const staging = {
  env: 'staging',
  xmppServer: 'dragon-uat.firecloud.live:5280',
  rootDomain: 'unicorn-uat.firecloud.live',
}

const dev = {
  env: 'dev',
  xmppServer: 'dragon-dev.firecloud.live:5280',
  rootDomain: 'unicorn-dev.firecloud.live',
}

export const RETRY_HTTP_REQUEST_NUMBER = 1;
export default {
  dev,
  staging,
  production
}
