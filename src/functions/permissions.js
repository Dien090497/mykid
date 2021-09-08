import {Platform} from 'react-native';
import {String} from '../assets/strings/String';
// import {check, request, PERMISSIONS, RESULTS, openSettings} from 'react-native-permissions';
import {showAlert, showConfirmation} from './utils';

// export async function checkWriteExternalStorageAndroid() {
//   if (Platform.OS !== 'android') {
//     return true;
//   }

//   const msgs = [String.writeExternalStorageAndroidUnavailable, String.writeExternalStorageAndroidDenied];
//   const result = await check(PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE);
//   return handlePermissionResp(result, PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE, msgs);
// }

// export async function checkPhotoLibraryWritePermission() {
//   const msgs = [String.photoLibraryUnavailable, String.photoLibraryWriteDenied, String.photoLibraryReadLimit];
//   if (Platform.OS === 'ios') {
//     const result = await check(PERMISSIONS.IOS.PHOTO_LIBRARY);
//     return handlePermissionResp(result, PERMISSIONS.IOS.PHOTO_LIBRARY, msgs);
//   } else if (Platform.OS === 'android') {
//     const result = await check(PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE);
//     return handlePermissionResp(result, PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE, msgs);
//   }

//   return false;
// }

// export async function checkPhotoLibraryReadPermission() {
//   const msgs = [String.photoLibraryUnavailable, String.photoLibraryReadDenied, String.photoLibraryReadLimit];
//   if (Platform.OS === 'ios') {
//     const result = await check(PERMISSIONS.IOS.PHOTO_LIBRARY);
//     return handlePermissionResp(result, PERMISSIONS.IOS.PHOTO_LIBRARY, msgs);
//   } else if (Platform.OS === 'android') {
//     const result = await check(PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE);
//     return handlePermissionResp(result, PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE, msgs);
//   }

//   return false;
// }

// export async function checkMicrophonePermission() {
//   const msgs = [String.microphoneUnavailable, String.microphoneDenied];
//   if (Platform.OS === 'ios') {
//     const result = await check(PERMISSIONS.IOS.MICROPHONE);
//     return handlePermissionResp(result, PERMISSIONS.IOS.MICROPHONE, msgs);
//   } else if (Platform.OS === 'android') {
//     const result = await check(PERMISSIONS.ANDROID.RECORD_AUDIO);
//     return handlePermissionResp(result, PERMISSIONS.ANDROID.RECORD_AUDIO, msgs);
//   }

//   return false;
// }

// export async function checkCameraPermission() {
//   const msgs = [String.cameraUnavailable, String.cameraDenied];
//   if (Platform.OS === 'ios') {
//     const result = await check(PERMISSIONS.IOS.CAMERA);
//     return handlePermissionResp(result, PERMISSIONS.IOS.CAMERA, msgs);
//   } else if (Platform.OS === 'android') {
//     const result = await check(PERMISSIONS.ANDROID.CAMERA);
//     return handlePermissionResp(result, PERMISSIONS.ANDROID.CAMERA, msgs);
//   }

//   return false;
// }

// async function handlePermissionResp(result, permission, listMsg = []) {
//   switch (result) {
//     case RESULTS.UNAVAILABLE:
//       if (listMsg.length > 0) {
//         showAlert(listMsg[0]);
//       }
//       break;
//     case RESULTS.DENIED:
//       console.log('The permission has not been requested / is denied but requestable');
//       const tmp = await request(permission);
//       return handlePermissionResp(tmp);
//     case RESULTS.LIMITED:
//       console.log('The permission is limited: some actions are possible');
//       if (listMsg.length > 2) {
//         showConfirmation(listMsg[2], {
//           response: accept => {
//             if (accept) {
//               openSettings();
//             }
//           },
//         });
//       }
//       break;
//     case RESULTS.GRANTED:
//       console.log('The permission is granted');
//       return true;
//     case RESULTS.BLOCKED:
//       if (listMsg.length > 1) {
//         showConfirmation(listMsg[1], {
//           response: accept => {
//             if (accept) {
//               openSettings();
//             }
//           },
//         });
//       }
//   }

//   return false;
// }
