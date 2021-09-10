import {Provider} from 'react-redux';
import React from 'react';
import Routes from './src/routes';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import redux from './src/redux/config/redux';

class App extends React.Component {
  render() {
    return (
      <SafeAreaProvider>
        <Provider store={redux.store}>
          <Routes />
        </Provider>
      </SafeAreaProvider>
    );
  }
}

export default App;
