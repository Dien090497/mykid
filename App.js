import {AlertDropHelper} from './src/functions/AlertDropHelper';
import {Colors} from './src/assets/colors/Colors';
import DropdownAlert from 'react-native-dropdownalert';
import {Provider} from 'react-redux';
import React from 'react';
import Routes from './src/routes';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {StatusBar} from 'react-native';
import redux from './src/redux/config/redux';

class App extends React.Component {
  render() {
    return (
      <SafeAreaProvider>
        <Provider store={redux.store}>
          <Routes />
          <DropdownAlert
            closeInterval={10000}
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
}

export default App;
