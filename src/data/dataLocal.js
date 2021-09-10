import AsyncStorage from "@react-native-async-storage/async-storage";

const accessTokenKey = 'ACCESS_TOKEN';
const userInfoKey = 'USER_INFO';
const deviceIdKey = 'DEVICE_ID';
let accessToken = null;
let userInfo = null;

async function saveAccessToken(value) {
  try {
    accessToken = value;
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
    accessToken = null;
    return AsyncStorage.removeItem(accessTokenKey);
  } catch(e){
    console.log(e);
  }
}

async function saveUserInfo(value) {
  try {
    userInfo = value;
    return AsyncStorage.setItem(userInfoKey, JSON.stringify(value));
  }catch(e) {
    console.log(e);
  }
}

async function getUserInfo() {
  try {
    return AsyncStorage.getItem(userInfoKey, null);
  }catch(e) {
    console.log(e);
  }
}

async function removeUserInfo() {
  try {
    userInfo = null;
    return AsyncStorage.removeItem(userInfoKey);
  }catch(e) {
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
  await removeUserInfo();
}

async function loadFromData() {
  accessToken = await getAccessToken();
  userInfo = await getUserInfo();
}

const DataLocal = {
  removeAll,
  loadFromData,

  saveAccessToken,
  removeAccessToken,
  getAccessToken,

  saveUserInfo,
  getUserInfo,
  removeUserInfo,

  saveDeviceId,
  getDeviceId,

  accessToken,
  userInfo,
};

export default DataLocal;
