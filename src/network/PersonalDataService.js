import {get, post} from './http/HttpClient';
import {PersonalData} from "./http/ApiUrl";

export function getPersonalData (
  {success, failure, autoShowMsg = true, refLoading = null} = {},
) {
  const url = [PersonalData].join('/');
  return get(url, {
    success,
    failure,
    autoShowMsg,
    refLoading,
  });
}