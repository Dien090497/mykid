import {appUrl, refreshTokenUrl} from './ApiUrl';
import {
  generateRandomId,
  hideLoading,
  showLoading,
} from '../../functions/utils';

import DataLocal from '../../data/dataLocal';
import errorMsg from "../../constants/translations/vi/errorMsg";
import {Platform} from 'react-native';
import {RETRY_HTTP_REQUEST_NUMBER} from '../../data/AppConfig';
import axios from 'axios';
import i18next from 'i18next';
import SimpleToast from "react-native-simple-toast";
import XmppClient from "../xmpp/XmppClient";
import WebSocketSafeZone from "../socket/WebSocketSafeZone";
import WebSocketVideoCall from "../socket/WebSocketVideoCall";
import reduxStore from '../../redux/config/redux';
import loginAction from '../../redux/actions/loginAction'


const TIMEOUT_CONNECT = 60000;

const client = axios.create({
  baseURL: appUrl,
  timeout: TIMEOUT_CONNECT,
});

const requestType = {
  post: 'post',
  put: 'put',
  patch: 'patch',
  get: 'get',
  delete: 'delete',
};

const getDefaultHeaders = () => {
  return {
    'Accept': 'application/json',
    'Content-type': 'application/json',
    'request-id': generateRandomId(5).toLowerCase(),
    'os': Platform.OS,
  };
};

const successResponse = (data, rawResponse) => {
  return {success: data, failure: null, rawResponse: rawResponse};
};

const failureResponse = (err, rawResponse) => {
  return {success: null, failure: err, rawResponse};
};

async function getHeaders(headers) {
  let requestHeaders = headers;
  if (!headers) requestHeaders = getDefaultHeaders();

  const accessToken = await DataLocal.accessToken;
  if (accessToken) {
    requestHeaders['Authorization'] = 'Bearer ' + accessToken;
  }

  return requestHeaders;
}

async function tryRequest(url, headers, body, type) {
  let response;
  let config = {
    headers: headers,
    timeout: TIMEOUT_CONNECT,
    responseType: 'json',
  };
  if (type === requestType.delete) {
    config.data = body;
  }

  console.log('[API] [call]', type, url, 'body:', body, 'headers:', headers);

  const bodyStr = JSON.stringify(body);
  try {
    switch (type) {
      case requestType.post:
        response = await client.post(url, bodyStr, config);
        break;
      case requestType.patch:
        response = await client.patch(url, bodyStr, config);
        break;
      case requestType.put:
        response = await client.put(url, bodyStr, config);
        break;
      case requestType.get:
        response = await client.get(url, config);
        break;
      case requestType.delete:
        response = await client.delete(url, config);
        break;
      default:
        return {success: false, data: null, error: null};
    }
    console.log('[API] [response]', type, url, response);
    return {success: true, data: response, error: null};
  } catch (error) {
    response = await error.response;
    console.log(`[API] [ERROR] ${type} ${url}:`, response);
    return {success: false, data: null, error: response};
  }
}

async function doRequest(url, headers, body, type) {
  let response;
  let tmp = await tryRequest(url, headers, body, type);
  if (tmp.success) {
    response = tmp.data;
  } else {
    response = tmp.error;
    let number = RETRY_HTTP_REQUEST_NUMBER;
    while (number > 0) {
      const tmp = await tryRequest(url, headers, body, type);
      if (tmp.success) {
        response = tmp.data;
        break;
      }

      number -= 1;
    }
  }
  return response;
}

export async function post(
  url, {
    body,
    headers,
    success,
    failure,
    autoShowMsg = true,
    refLoading = null,
    refNotification = null,
  } = {}) {
  showLoading(refLoading);
  const headersGet = await getHeaders(headers);
  let response = await doRequest(url, headersGet, body, requestType.post);
  hideLoading(refLoading);
  return handleResp(response, autoShowMsg, success, failure, refLoading, refNotification);
}

export async function path(
  url, {body, headers, success, failure, autoShowMsg = true, refLoading = null, refNotification = null} = {}) {
  showLoading(refLoading);
  const headersGet = await getHeaders(headers);
  let response = await doRequest(url, headersGet, body, requestType.patch);
  hideLoading(refLoading);

  return handleResp(response, autoShowMsg, success, failure, refLoading, refNotification);
}

export async function put(
  url, {body, headers, success, failure, autoShowMsg = true, refLoading = null, refNotification = null} = {}) {
  showLoading(refLoading);
  const headersGet = await getHeaders(headers);
  let response = await doRequest(url, headersGet, body, requestType.put);
  hideLoading(refLoading);

  return handleResp(response, autoShowMsg, success, failure, refLoading, refNotification);
}

export async function get(
  url, {params, headers, success, failure, autoShowMsg = true, refLoading = null, refNotification = null} = {}) {
  showLoading(refLoading);

  if (params) {
    let arrBody = [];
    for (let key in params) {
      if (params.hasOwnProperty(key)) {
        arrBody.push(key + '=' + params[key]);
      }
    }
    const strQuery = arrBody.join('&');
    url = url + '?' + strQuery;
  }

  const headersGet = await getHeaders(headers);
  let response = await doRequest(url, headersGet, null, requestType.get);
  hideLoading(refLoading);

  return handleResp(response, autoShowMsg, success, failure, refLoading, refNotification);
}

export async function dele(
  url, {body = {}, headers, success, failure, autoShowMsg = true, refLoading = null, refNotification = null} = {}) {
  showLoading(refLoading);
  const headersGet = await getHeaders(headers);
  let response = await doRequest(url, headersGet, body, requestType.delete);
  hideLoading(refLoading);

  return handleResp(response, autoShowMsg, success, failure, refLoading, refNotification);
}

export async function upload(
  url, formData, {success, failure, autoShowMsg = true, refLoading = null, refNotification = null} = {}) {
  showLoading(refLoading);

  let headers = await getHeaders(null);
  headers['Content-Type'] = 'multipart/form-data';

  let response;
  try {
    console.log(url)
    console.log(formData)
    response = await client.put(url, formData, {
      headers,
      timeout: TIMEOUT_CONNECT,
      responseType: 'json',
    });
  } catch (error) {
    response = await error.response;
  }
  hideLoading(refLoading);
  return handleResp(response, autoShowMsg, success, failure, refLoading, refNotification);
}

export async function upload2(
  url, formData, {success, failure, autoShowMsg = true, refLoading = null, refNotification = null} = {}) {
  showLoading(refLoading);

  let headers = await getHeaders(null);
  headers['Content-Type'] = 'multipart/form-data';

  let response;
  try {
    console.log(url)
    console.log(formData)
    response = await client.post(url, formData, {
      headers,
      timeout: TIMEOUT_CONNECT,
      responseType: 'json',
    });
  } catch (error) {
    response = await error.response;
  }
  hideLoading(refLoading);
  return handleResp(response, autoShowMsg, success, failure, refLoading, refNotification);
}

export async function uploadFile(
  url, {
    body,
    headers,
    success,
    failure,
    autoShowMsg = true,
    refLoading = null,
    refNotification =null,
  } = {}) {
  showLoading(refLoading);

  let response;
  try {
    response = await client.put(url, body, {
      headers,
      timeout: TIMEOUT_CONNECT,
    });
  } catch (error) {
    console.log('[API] [ERROR] call API upload ' + url, error);
    response = await error.response;
  }
  console.log('[API] [response] upload ' + url, response);

  hideLoading(refLoading);

  return handleResp(response, autoShowMsg, success, failure, refLoading, refNotification);
}

async function handleResp(response, autoShowMsg, success, failure, refLoading, refNotification) {
  if (!response || response.status === 500) {
    let err = i18next.t('errorMsg:connectToServerFailed');
    console.log('handleResp >>>>>>>>>>>', response)
    if (response && response.error) {
      err = response.error;
    }
    if (autoShowMsg) {
      if (refNotification) {
        refNotification.current.open(err);
      } else {
       SimpleToast.show(err);
      }
    }
    if (failure) {
      failure(err);
    }
    return failureResponse(err, response);
  }

  const httpStatusCode = response.status;
  let result = response.data;

  if (httpStatusCode < 200 || httpStatusCode > 299) {
    if (httpStatusCode === 403 || httpStatusCode === 401) {
      if (autoShowMsg) {
        if (refNotification) refNotification.current.open(i18next.t('errorMsg:TOKEN_EXPIRED_MSG'));
        else SimpleToast.show(i18next.t('errorMsg:TOKEN_EXPIRED_MSG'));
      }
      if (failure) {
        failure(i18next.t('errorMsg:TOKEN_EXPIRED_MSG'));
      }
      await DataLocal.removeAll();
      XmppClient.disconnectXmppServer();
      WebSocketSafeZone.disconnect();
      WebSocketVideoCall.disconnect();
      reduxStore.store.dispatch(loginAction.logout());
      return failureResponse(i18next.t('errorMsg:TOKEN_EXPIRED_MSG'), response);
    }

    const err = checkFailure(result);

    if (!!err && err.includes('KWS-4001')) {
      console.log('error KWS-4001');
    }
    else if (autoShowMsg) {
      if (refNotification) refNotification.current.open(err);
      else SimpleToast.show(err);

    }

    if (failure) {
      failure(err);
    }

    return failureResponse(err, response);
  }

  const headers = await response.headers;
  if (result && typeof (result) === 'object') {
    result.headers = headers;
  }

  await checkRefreshToken(headers, refLoading, refNotification);

  if (success) {
    success(result);
  }

  return successResponse(result, response);
}

async function checkRefreshToken(headers, refLoading, refNotification) {
  const xUpdated = headers['x-updated'];
  if (xUpdated === true || xUpdated === 'true') {
    await refreshUserToken(refLoading, refNotification);
  }
}

export const refreshUserToken = async (refLoading = null, refNotification = null) => {
  const resp = await get(refreshTokenUrl, {refLoading});
  if (!resp.success) {
    if (refNotification) refNotification.current.open(i18next.t('errorMsg:clientServerCommunicationProb'));
    else SimpleToast.show(i18next.t('errorMsg:clientServerCommunicationProb'));
  } else {
    const resData = resp.success.data;
    if (!resData || !resData.token) {
      if (refNotification) refNotification.current.open(i18next.t('errorMsg:clientServerCommunicationProb'));
      else SimpleToast.show(i18next.t('errorMsg:clientServerCommunicationProb'));
    } else {
    }
  }
  return resp;
};

function checkFailure(result) {
  let meta;
  if (result && result.code) {
    meta = result;
  } else if (result) {
    meta = result.meta;
  }

  if (!meta || !meta.code) {
    return i18next.t('errorMsg:UNEXPECTED_ERROR_MSG');
  }

  const code = meta.code.toLowerCase().split('-').join('');

  if (code === 'kwa4067'){
    DataLocal.saveHaveSim('0');
  }

  if (!!Object.keys(errorMsg) && Object.keys(errorMsg).includes(code)) {
    return i18next.t('errorMsg:'+code);
  }

  return i18next.t('errorMsg:UNEXPECTED_ERROR_MSG') + ' (' + meta.code + ')';
}

export default client;
