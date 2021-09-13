import AsyncStorage from "@react-native-async-storage/async-storage";

const accessTokenKey = 'ACCESS_TOKEN';
const userInfoKey = 'USER_INFO';
const deviceIdKey = 'DEVICE_ID';
const deviceIndexKey = 'DEVICE_Active_';
let accessToken = null;
let userInfo = null;
let deviceIndex = 0;

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

async function saveDeviceId(value) {
  try {
    return AsyncStorage.setItem(deviceIdKey, value);
  } catch (e) {
    console.log(e);
    return false;
  }
}

async function getDeviceId() {
  try {
    return AsyncStorage.getItem(deviceIdKey);
  } catch(e) {
    console.log(e);
    return null;
  }
}

async function removeAll() {
  await removeAccessToken();
}

async function loadDeviceIndex() {
  try {
    const index = await AsyncStorage.getItem(deviceIndexKey + DataLocal.userInfo.id, '');
    DataLocal.deviceIndex = parseInt(index);
  } catch(e) {
    DataLocal.deviceIndex = 0;
    console.log(e);
  }
}

async function saveDeviceIndex(index) {
  DataLocal.deviceIndex = index;
  try {
    return await AsyncStorage.setItem(deviceIndexKey + DataLocal.userInfo.id, index.toString());
  } catch (e) {
    console.log(e);
    return false;
  }
}

const DataLocal = {
  removeAll,

  saveAccessToken,
  removeAccessToken,
  getAccessToken,

  saveDeviceId,
  getDeviceId,

  loadDeviceIndex,
  saveDeviceIndex,

  accessToken,
  userInfo,
  deviceIndex
};

export default DataLocal;
