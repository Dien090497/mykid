import {StatusBar} from "react-native";
import React, { useEffect} from 'react';
import {AlertDropHelper} from './src/functions/AlertDropHelper';
import {Colors} from './src/assets/colors/Colors';
import DropdownAlert from 'react-native-dropdownalert';
import {Provider} from 'react-redux';
import Routes from './src/routes';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import redux from './src/redux/config/redux';
import './src/constants/IMLocalize';
import {fcmService} from './src/FCMService'
import {localNotificationService} from './src/LocalNotificationService'

export default function App() {

  useEffect(() => {
    fcmService.registerAppWithFCM()
    fcmService.register(onRegister, onNotification, onOpenNotification)
    localNotificationService.configure(onOpenNotification)

    function onRegister(token) {
      console.log("[App] onRegister: ", token)
    }

    function onNotification(notify) {
      console.log("[App] onNotification: ", notify)
      const options = {
        soundName: 'default',
        playSound: true,
      }
      localNotificationService.showNotification(
        0,
        notify.title,
        notify.body,
        notify,
        options
      )
    }

    function onOpenNotification(notify) {
      console.log("[App] onOpenNotification: ", notify)
      alert("Open Notification: " + notify.body)
    }

    return () => {
      console.log("[App] unRegister")
      fcmService.unRegister()
      localNotificationService.unregister()
    }

  }, [])

  return (
      <SafeAreaProvider>
        <Provider store={redux.store}>
          <Routes />
          <DropdownAlert
            closeInterval={15000}
            updateStatusBar={false}
            warnColor={Colors.yellow}
            defaultContainer={{
              paddingHorizontal: 8,
              paddingTop: StatusBar.currentHeight,
              flexDirection: 'row',
            }}
            ref={ref => AlertDropHelper.setDropDown(ref)}
            onClose={() => AlertDropHelper.invokeOnClose()}
          />
        </Provider>
      </SafeAreaProvider>
    );
}

