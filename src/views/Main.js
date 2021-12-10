import React, {useState, useContext, useEffect} from 'react';
//Navigation
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Text} from 'native-base';
//Firebase
import auth from '@react-native-firebase/auth';
//Components
import BottomNavigation from './BottomNavigation/index';
import Login from './Login/Index';
import PermissionScreen from './Permissions/PermissionsScreen';
import {PermissionContext} from '../context/PermissionsContext';
import {LoadingScreen} from '../utils/LoaderScreen';

const Main = () => {
  const Stack = createNativeStackNavigator();
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState(null);
  const {permissions} = useContext(PermissionContext);
  // Handle user state changes
  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }
  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (permissions.locationStatus === 'unavailable') {
    return <LoadingScreen />;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {!user ? (
          <Stack.Screen
            options={{headerShown: false}}
            name="Login"
            component={Login}
          />
        ) : permissions.locationStatus === 'granted' ? (
          <Stack.Screen
            options={{headerShown: false}}
            name="BottomNavigation"
            component={BottomNavigation}
          />
        ) : (
          <Stack.Screen
            options={{headerShown: false}}
            name="PermissionsScreen"
            component={PermissionScreen}
          />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default Main;
