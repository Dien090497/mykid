import { dele, get, path, post, put } from "./http/HttpClient";
import { deleteDeviceUrl, deviceUrl, listDeviceUrl, locationDeviceUrl, disconnectUrl } from "./http/ApiUrl";
import Consts from "../functions/Consts";

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
  let body = {
    id,
    deviceName,
    icon,
    relationship,
    relationshipName,
  };
  const url = [listDeviceUrl, id].join("/");
  return put(url, { body,success, failure, autoShowMsg, refLoading, refNotification });
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

export function startWebSocket(
  deviceId,
  { success, failure, autoShowMsg = true, refLoading = null, refNotification = null } = {},
) {
  const url = [locationDeviceUrl, deviceId, "host-position"].join("/");
  return post(url, {
    success,
    failure,
    autoShowMsg,
    refLoading,
    refNotification
  });
}

export function disconnectClockApi(
  deviceId,
  { success, failure, autoShowMsg = true, refLoading = null, refNotification = null } = {},
) {
  const url = [disconnectUrl, deviceId, "reset"].join("/");
  return dele(url, {
    success,
    failure,
    autoShowMsg,
    refLoading,
    refNotification
  });
}

export function getFriendsList(
  deviceId,
  { success, failure, autoShowMsg = true, refLoading = null, refNotification = null },
) {
  const url = [disconnectUrl, deviceId, "friends"].join("/");
  return get(url, {
    success,
    failure,
    autoShowMsg,
    refLoading,
    refNotification
  });
}

export function deleteFriend(
  deviceId,
  roomId,
  { success, failure, autoShowMsg = true, refLoading = null, refNotification = null } = {},
) {
  const url = [disconnectUrl, deviceId, 'friends', roomId].join("/");
  return dele(url, {
    success,
    failure,
    autoShowMsg,
    refLoading,
    refNotification
  });
}

