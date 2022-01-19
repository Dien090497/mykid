import AsyncStorage from '@react-native-async-storage/async-storage';

const accessTokenKey = 'ACCESS_TOKEN';
const deviceIdKey = 'DEVICE_ID_';
const deviceIndexKey = 'DEVICE_Active_';
const languageKey = 'LANGUAGE';
const simKey = 'SIM';
let accessToken = null;
let tokenFirebase = null;
let userInfo = null;
let deviceIndex = 0;
let deviceId = 0;
let language = null;
let haveSim = '1';
const videoCallInfoKey = 'VIDEO_CALL_INFO';
async function saveAccessToken(value) {
  try {
    return AsyncStorage.setItem(accessTokenKey, value);
  } catch(e) {
    console.log(e);
  }
}

async function getAccessToken() {
  try {
    return AsyncStorage.getItem(accessTokenKey, '');
  } catch(e) {
    console.log(e);
  }
}

async function removeAccessToken() {
  try {
    DataLocal.accessToken = null;
    return AsyncStorage.removeItem(accessTokenKey);
  } catch(e){
    console.log(e);
  }
}

async function saveTokenFirebase(value) {
  try {
    return AsyncStorage.setItem(tokenFirebase, value);
  } catch(e) {
    console.log(e);
  }
}

async function getTokenFirebase() {
  try {
    return AsyncStorage.getItem(tokenFirebase, '');
  } catch(e) {
    console.log(e);
  }
}

async function removeTokenFirebase() {
  try {
    DataLocal.tokenFirebase = null;
    return AsyncStorage.removeItem(tokenFirebase);
  } catch(e){
    console.log(e);
  }
}

async function saveDeviceId(value) {
  try {
    DataLocal.deviceId = value;
    return AsyncStorage.setItem(deviceIdKey + DataLocal.userInfo.id, value.toString());
  } catch (e) {
    console.log(e);
    return false;
  }
}

async function loadDeviceId() {
  try {
    const value = await AsyncStorage.getItem(deviceIdKey + DataLocal.userInfo.id, '');
    if (value === null || value === undefined) {
      DataLocal.deviceId = 0;
    } else {
      DataLocal.deviceId = parseInt(value);
    }
  } catch(e) {
    console.log(e);
    DataLocal.deviceId = 0;
  }
}

async function loadDeviceIndex() {
  try {
    const value = await AsyncStorage.getItem(deviceIndexKey + DataLocal.userInfo.id, '');
    if (value === null || value === undefined) {
      DataLocal.deviceIndex = 0;
    } else {
      DataLocal.deviceIndex = parseInt(value);
    }
  } catch(e) {
    DataLocal.deviceIndex = 0;
    console.log(e);
  }
}

async function saveDeviceIndex(index) {
  try {
    DataLocal.deviceIndex = index;
    return await AsyncStorage.setItem(deviceIndexKey + DataLocal.userInfo.id, index.toString());
  } catch (e) {
    console.log(e);
    return false;
  }
}

async function loadLanguage() {
  if (DataLocal.language) return;
  try {
    const value = await AsyncStorage.getItem(languageKey, '');
    if (value !== null && value !== undefined) {
      DataLocal.language = value.toString();
    } else {
      DataLocal.language = 'vi';
    }
  } catch(e) {
    console.log(e);
    DataLocal.language = 'vi';
  }
}

async function saveLanguage(language) {
  try {
    DataLocal.language = language;
    return await AsyncStorage.setItem(languageKey, language.toString());
  } catch (e) {
    console.log(e);
    return false;
  }
}

async function loadHaveSim() {
  if (DataLocal.haveSim) return;
  try {
    const value = await AsyncStorage.getItem(simKey, '');
    if (value !== null && value !== undefined) {
      DataLocal.haveSim = value.toString();
    } else {
      DataLocal.haveSim = '0';
    }
  } catch(e) {
    console.log(e);
    DataLocal.haveSim = '0';
  }
}

async function saveHaveSim(sim) {
  try {
    DataLocal.haveSim = sim;
    return await AsyncStorage.setItem(simKey, sim.toString());
  } catch (e) {
    console.log(e);
    return false;
  }
}

async function loadDuration(link) {
  try {
    const value = await AsyncStorage.getItem(link, '');
    if (value !== null && value !== undefined) {
      return value.toString();
    } else {
      return null;
    }
  } catch(e) {
    console.log(e);
    return null;
  }
}

async function saveDuration(link, duration) {
  try {
    return await AsyncStorage.setItem(link, duration);
  } catch (e) {
    console.log(e);
    return false;
  }
}

async function saveVideoCallInfo(value) {
  try {
    return AsyncStorage.setItem(videoCallInfoKey, JSON.stringify(value));
  } catch (e) {
    console.log(e);
  }
}

async function getVideoCallInfo() {
  try {
    return AsyncStorage.getItem(videoCallInfoKey, '');
  } catch (e) {
    console.log(e);
  }
}

async function removeVideoCallInfo() {
  try {
    return AsyncStorage.removeItem(videoCallInfoKey);
  } catch (e) {
    console.log(e);
  }
}

async function removeAll() {
  DataLocal.userInfo = null;
  await removeAccessToken();
}

const DataLocal = {
  removeAll,

  saveAccessToken,
  removeAccessToken,
  getAccessToken,

  saveTokenFirebase,
  removeTokenFirebase,
  getTokenFirebase,

  saveVideoCallInfo,
  getVideoCallInfo,
  removeVideoCallInfo,

  saveDeviceId,
  loadDeviceId,

  loadDeviceIndex,
  saveDeviceIndex,

  saveLanguage,
  loadLanguage,

  saveHaveSim,
  loadHaveSim,

  saveDuration,
  loadDuration,

  accessToken,
  tokenFirebase,
  userInfo,
  deviceIndex,
  deviceId,
  language,
  haveSim,
};

export default DataLocal;
