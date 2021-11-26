import {
    positionModeuRL
} from "./http/ApiUrl";

import { post, get, put } from "./http/HttpClient";
export function getPositionModesApi(deviceId, { success, failure, autoShowMsg = true, refLoading = null, refNotification = null } = {}) {
    const url = [positionModeuRL, deviceId].join('/');
    return get(url, { success, failure, autoShowMsg, refLoading, refNotification });
}

export function setPositionModesApi(deviceId, enable, time, { success, failure, autoShowMsg = true, refLoading = null, refNotification = null } = {}) {
    let body = {
        enable,
        time
    }
    const url = [positionModeuRL, deviceId].join('/');
    return post(url, { body, success, failure, autoShowMsg, refLoading, refNotification });
}