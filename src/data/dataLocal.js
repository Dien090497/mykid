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
    await loadDeviceIndex();
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
  await loadDeviceIndex();
}

function getDeviceIndex() {
  if (deviceIndex) {
    return deviceIndex;
  }
  try {
    const index = AsyncStorage.getItem(deviceIndexKey + userInfo.id);
    
    if (index) {
      deviceIndex = 0;
    } else {
      deviceIndex = parseInt(index);
    }
    return deviceIndex;
  } catch(e) {
    console.log(e);
    return 0;
  }
}

async function loadDeviceIndex() {
  try {
    const index = AsyncStorage.getItem(deviceIndexKey + userInfo.id);
    
    if (index) {
      deviceIndex = 0;
    } else {
      deviceIndex = parseInt(index);
    }
  } catch(e) {
    console.log(e);
  }
}

async function saveDeviceIndex(index) {
  deviceIndex = index;
  try {
    return AsyncStorage.setItem(deviceIndexKey + userInfo.id, index.toString());
  } catch (e) {
    console.log(e);
    return false;
  }
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

  getDeviceIndex,
  saveDeviceIndex,

  accessToken,
  userInfo
};

export default DataLocal;
