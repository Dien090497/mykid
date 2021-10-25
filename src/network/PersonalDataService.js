import {get, post, put} from './http/HttpClient';
import {PersonalDataUrl} from "./http/ApiUrl";
import {Platform} from "react-native";

export function getPersonalDataApi (
  {success, failure, autoShowMsg = true, refLoading = null} = {},
) {
  const url = [PersonalDataUrl].join('/');
  return get(url, {
    success,
    failure,
    autoShowMsg,
    refLoading,
  });
}
export function updatePersonalDataApi(
  contact,
  email,
  file,
  gender,
  name,
  {success, failure, autoShowMsg = true, refLoading = null} = {},
) {

  if (file) {
      file = {
        uri: Platform.OS === "android" ? file : file.replace("file://", "/"),
        type: "image/jpeg",
        name: "123",
      }
  }
  let body = {
    contact,
    email,
    file,
    gender,
    name
  }
  const url = [PersonalDataUrl].join('/');
  return put(url, body, {success, failure, autoShowMsg, refLoading});
}