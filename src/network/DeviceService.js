import {get, post} from './http/HttpClient';

import Consts from '../functions/Consts';
import {listDeviceUrl} from './http/ApiUrl';

export function getListDeviceConnected(payload) {
  const url = `${listDeviceUrl}?accountId=${payload?.accountId || ''}&page=${
    payload?.page || Consts.pageDefault
  }&status=ACTIVE&size=${payload?.size || Consts.maxSizeInPage}`;
  return get(url);
}

export function getListDeviceApi(accountId, page, size, { success, failure, autoShowMsg = true, refLoading = null } = {}) {
  let params = {
    accountId,
    page,
    size,
    sort: 'createAt:ASC'
  };
  return get(listDeviceUrl, { params, success, failure, autoShowMsg, refLoading });
}
