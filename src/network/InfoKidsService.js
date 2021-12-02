import { get, post, upload, upload2 } from "./http/HttpClient";
import {InfoKids} from "./http/ApiUrl";
import { Platform } from "react-native";

export function getInfoApi (
  deviceId,
  {success, failure, autoShowMsg = true, refLoading = null, refNotification = null} = {},
) {
  const url = [InfoKids, deviceId].join('/');
  return get(url, {
    success,
    failure,
    autoShowMsg,
    refLoading,
    refNotification,
  });
}

export function setInfoKitsApi (
  deviceId,
  body,
  {success, failure, autoShowMsg = true, refLoading = null, refNotification = null} = {},
) {
  const formData = new FormData();
  formData.append("name", body.name);
  formData.append("gender", body.gender);
  formData.append("birthday", body.birthday);
  formData.append("height", body.height);
  formData.append("weight", body.weight);
  if (body.avatar) {
    formData.append("file", {
      uri: Platform.OS === "android" ? body.avatar : body.avatar.replace("file://", "/"),
      type: "image/jpeg",
      name: "123",
    })}
  formData.append("isdn", body.phone);
  const url = [InfoKids, deviceId].join('/');
  return upload2(url, formData, {success, failure, autoShowMsg, refLoading, refNotification });
}
