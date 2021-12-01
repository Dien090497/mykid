import { dele, get, post, upload2 } from "./http/HttpClient";

import {  phoneBookUrl } from "./http/ApiUrl";
import { Platform } from "react-native";

export function getListContactPhoneApi(
  deviceId,
  {success, failure, autoShowMsg = true, refLoading = null, refNotification = null} = {},
) {
  const url = [phoneBookUrl, deviceId].join('/');
  return get(url, {
    success,
    failure,
    autoShowMsg,
    refLoading,
    refNotification,
  });
}

export function setSOSApi(
  deviceId,
  body,
  {success, failure, autoShowMsg = true, refLoading = null, refNotification = null} = {},
) {
  const url = [phoneBookUrl, deviceId, 'sos'].join('/');
  return post(url, {
    body,
    success,
    failure,
    autoShowMsg,
    refLoading,
    refNotification
  });
}

export function deletePhoneBookApi(
  deviceId,
  body,
  {success, failure, autoShowMsg = true, refLoading = null, refNotification = null} = {},
) {
  const url = [phoneBookUrl, deviceId].join('/');
  return dele(url, {
    body,
    success,
    failure,
    autoShowMsg,
    refLoading,
    refNotification
  });
}
export function addPhoneBookApi(
  deviceId,
  body,
  {success, failure, autoShowMsg = true, refLoading = null, refNotification = null} = {},
) {
  const formData = new FormData();
  if (body.name !== null ) {formData.append("name", body.name);}
  if (body.phoneNumber !== null) {formData.append("phoneNumber", body.phoneNumber);}
  if (body.file) {
    formData.append("file", {
      uri: Platform.OS === "android" ? body.file : body.file.replace("file://", "/"),
      type: "image/jpeg",
      name: "123",
    });
  }
  const url = [phoneBookUrl,deviceId].join('/');
  return upload2(url, formData, {success, failure, autoShowMsg, refLoading, refNotification});
}

export function setBlockUnknownApi(
  deviceId,
  block,
  {success, failure, autoShowMsg = true, refLoading = null, refNotification = null} = {},
) {
  let body = {
    block
  };
  const url = [phoneBookUrl, deviceId, 'block-unknown'].join('/');
  return post(url, {
    body,
    success,
    failure,
    autoShowMsg,
    refLoading,
    refNotification
  });
}
