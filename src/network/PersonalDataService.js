import {get, post, put} from './http/HttpClient';
import {PersonalDataUrl} from "./http/ApiUrl";

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
  const url = [PersonalDataUrl].join('/');
  return put(url, {success, failure, autoShowMsg, refLoading});
}