import {get, post, put, upload} from './http/HttpClient';
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
  const formData = new FormData();
  if (contact !== null ) {formData.append("contact", contact);}
  if (email !== null) {formData.append("email", email);}
  if (gender !== null) {formData.append("gender", gender);}
  if (name !== null) {formData.append("name", name);}
  if (file) {
    formData.append("file", {
      uri: Platform.OS === "android" ? file : file.replace("file://", "/"),
      type: "image/jpeg",
      name: "123",
    });
  }

  const url = [PersonalDataUrl].join('/');
  return upload(url, formData, {success, failure, autoShowMsg, refLoading});
}