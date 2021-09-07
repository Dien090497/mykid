// import codePush from 'react-native-code-push';
import {String} from '../assets/strings/String';

const updateLatestVersion = (upToDateCallback, statusCallback, downloadProgressCallback) => {
  // codePush.sync({
  //   updateDialog: null,
  //   installMode: codePush.InstallMode.IMMEDIATE,
  // }, status => {
  //   const Status = codePush.SyncStatus;
  //   let msg = '';
  //   switch (status) {
  //     case Status.UP_TO_DATE:
  //       if (upToDateCallback) {
  //         upToDateCallback();
  //         return;
  //       }
  //       break;
  //     case Status.CHECKING_FOR_UPDATE:
  //       msg = String.codepushChecking;
  //       break;
  //     case Status.DOWNLOADING_PACKAGE:
  //       msg = String.codepushDownloading;
  //       break;
  //     case Status.INSTALLING_UPDATE:
  //       msg = String.codepushInstalling;
  //       break;
  //     case Status.UPDATE_INSTALLED:
  //       msg = String.codepushRestarting;
  //       break;
  //   }

  //   if (statusCallback) {
  //     statusCallback({
  //       status: status,
  //       msg: msg,
  //     });
  //   }

  //   if (status === Status.UPDATE_INSTALLED) {
  //     codePush.restartApp();
  //   }
  // }, progress => {
  //   if (downloadProgressCallback) {
  //     downloadProgressCallback(progress);
  //   }
  // }).catch(err => {
  //   console.log('Codepush error:', err);

  //   if (upToDateCallback) {
  //     upToDateCallback();
  //   }
  //   codePush.allowRestart();
  // });
};

const checkNewVersion = async () => {
  const current = await codePush.getUpdateMetadata();
  const update = await codePush.checkForUpdate();

  let needUpdate = false;
  if (current && update) {
    needUpdate = current.label !== update.label;
  }
  return {
    needUpdate,
    oldVersion: current,
    newVersion: update,
  };
}

export default {
  updateLatestVersion,
  checkNewVersion,
};
