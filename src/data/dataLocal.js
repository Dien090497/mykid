import AsyncStorage from "@react-native-async-storage/async-storage";

const accessToken = 'ACCESS_TOKEN';
const userInfo = 'USER_INFO';
const deviceId = 'DEVICE_ID';

async function saveAccessToken(value) {
  try {
    return AsyncStorage.setItem(accessToken, value);
  } catch(e) {
    console.log(e);
  }
}

async function getAccessToken() {
  try {
    return AsyncStorage.getItem(accessToken, '');
  } catch(e) {
    console.log(e);
  }
}

async function removeAccessToken() {
  try {
    return AsyncStorage.removeItem(accessToken);
  } catch(e){
    console.log(e);
  }
}

async function saveUserInfo(value) {
  try {
    return AsyncStorage.setItem(userInfo, JSON.stringify(value));
  }catch(e) {
    console.log(e);
  }
}

async function getUserInfo() {
  try {
    return AsyncStorage.getItem(userInfo, null);
  }catch(e) {
    console.log(e);
  }
}

async function removeUserInfo() {
  try {
    return AsyncStorage.removeItem(userInfo);
  }catch(e) {
    console.log(e);
  }
}

async function saveDeviceId(value) {
  try {
    return AsyncStorage.setItem(deviceId, value);
  } catch (e) {
    console.log(e);
    return false;
  }
}

async function getDeviceId() {
  try {
    return AsyncStorage.getItem(deviceId);
  } catch(e) {
    console.log(e);
    return null;
  }
}

async function removeAll() {
  await removeAccessToken();
  await removeUserInfo();
}

const DataLocal = {
  removeAll,

  saveAccessToken,
  removeAccessToken,
  getAccessToken,

  saveUserInfo,
  getUserInfo,
  removeUserInfo,

  saveDeviceId,
  getDeviceId,
};

export default DataLocal;
