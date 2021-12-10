import React from 'react';
import Main from './src/views/Main';
import {NativeBaseProvider} from 'native-base';
import {PermissionProvider} from './src/context/PermissionsContext';

const AppState = ({children}) => {
  return <PermissionProvider>{children}</PermissionProvider>;
};

const App = () => {
  return (
    <NativeBaseProvider>
      <AppState>
        <Main />
      </AppState>
    </NativeBaseProvider>
  );
};
export default App;
