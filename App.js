import React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {Provider} from 'react-redux';
import redux from './src/redux/config/redux';

import Routes from './src/routes';

class App extends React.Component {
  render() {
    return (
      <Provider store={redux.store}>
        <SafeAreaProvider style={{flex: 1}}>
          <Routes/>
        </SafeAreaProvider>
      </Provider>
    );
  }
}

export default App;
