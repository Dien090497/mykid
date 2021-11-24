import { dele, get, path, post, upload } from "./http/HttpClient";
import { deleteDeviceUrl, deviceUrl, listDeviceUrl, locationDeviceUrl } from "./http/ApiUrl";
import Consts from "../functions/Consts";
import { Platform } from "react-native";

export function getListDeviceConnected(payload) {
  const url = `${listDeviceUrl}?accountId=${payload?.accountId || ""}&page=${
    payload?.page || Consts.pageDefault
  }&status=ACTIVE&size=${payload?.size || Consts.maxSizeInPage}`;
  return get(url);
}

export function getListDeviceApi(
  accountId,
  page,
  size,
  deviceId,
  status,
  { success, failure, autoShowMsg = true, refLoading = null, refNotification = null } = {},
) {
  let params = {
    accountId: accountId || "",
    status: status || "",
    page,
    size,
    deviceId: deviceId || "",
    sort: "createdAt:ASC",
  };
  return get(listDeviceUrl, {
    params,
    success,
    failure,
    autoShowMsg,
    refLoading,
    refNotification,
  });
}

export function addDeviceApi(
  imeiCode,
  deviceName,
  icon,
  relationship,
  relationshipName,
  { success, failure, autoShowMsg = true, refLoading = null, refNotification = null } = {},
) {
  let body = {
    imeiCode,
    deviceName,
    icon,
    relationship,
    relationshipName,
  };
  return post(listDeviceUrl, { body, success, failure, autoShowMsg, refLoading, refNotification });
}

export function editDeviceApi(
  id,
  deviceName,
  icon,
  relationship,
  relationshipName,
  { success, failure, autoShowMsg = true, refLoading = null, refNotification = null } = {},
) {
  const formData = new FormData();
  formData.append("deviceName", deviceName);
  formData.append("icon", icon);
  formData.append("relationship", relationship);
  relationshipName ? formData.append("relationshipName", relationshipName) : null;
  const url = [listDeviceUrl, id].join("/");
  return upload(url, formData, { success, failure, autoShowMsg, refLoading, refNotification });
}

export function getLocationDeviceApi(
  deviceIds,
  { success, failure, autoShowMsg = true, refLoading = null, refNotification = null } = {},
) {
  let params = {
    deviceIds
  };
  return get(locationDeviceUrl, {
    params: params,
    success,
    failure,
    autoShowMsg,
    refLoading,
    refNotification
  });
}

export function acceptContactApi(
  id,
  { success, failure, autoShowMsg = true, refLoading = null, refNotification = null },
) {
  const url = [listDeviceUrl, id].join("/");
  return path(url, { success, failure, autoShowMsg, refLoading, refNotification });
}

export function rejectContactApi(
  id,
  { success, failure, autoShowMsg = true, refLoading = null, refNotification = null },
) {
  const url = [listDeviceUrl, id].join("/");
  return dele(url, { success, failure, autoShowMsg, refLoading, refNotification });
}

export function getJourneyApi(
  deviceId,
  fromDate,
  toDate,
  page,
  size,
  { success, failure, autoShowMsg = true, refLoading = null, refNotification = null },
) {
  let params = {
    fromDate,
    toDate,
    page,
    size,
  };
  const url = [locationDeviceUrl, deviceId, "histories"].join("/");
  return get(url, {
    params,
    success,
    failure,
    autoShowMsg,
    refLoading,
    refNotification
  });
}

export function getNumberDevices(
  deviceId,
  { success, failure, autoShowMsg = true, refLoading = null, refNotification = null },
) {
  const url = [listDeviceUrl, deviceId, "total-account"].join("/");
  return get(url, {
    success,
    failure,
    autoShowMsg,
    refLoading,
    refNotification
  });
}

export function deleteDevicesApi(
  deviceId,
  { success, failure, autoShowMsg = true, refLoading = null, refNotification = null },
) {
  const url = [deleteDeviceUrl, deviceId].join("/");
  return dele(url, {
    autoShowMsg,
    success,
    failure,
    refLoading,
    refNotification
  });
}

export function offDeviceApi(
  deviceId,
  { success, failure, autoShowMsg = true, refLoading = null, refNotification = null } = {},
) {
  const url = [deviceUrl, deviceId, "power-off"].join("/");
  return post(url, {
    success,
    failure,
    autoShowMsg,
    refLoading,
    refNotification
  });
}

export function restartDeviceApi(
  deviceId,
  { success, failure, autoShowMsg = true, refLoading = null, refNotification = null } = {},
) {
  const url = [deviceUrl, deviceId, "restart"].join("/");
  return post(url, {
    success,
    failure,
    autoShowMsg,
    refLoading,
    refNotification
  });
}
