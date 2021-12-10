import React, {createContext, useEffect, useState} from 'react';
import {AppState, Platform} from 'react-native';
import {check, request, PERMISSIONS} from 'react-native-permissions';

export const permisionsInitialState = {
  locationStatus: 'unavailable',
};
export const PermissionContext = createContext({});

export const PermissionProvider = ({children}) => {
  const [permissions, setpermissions] = useState(permisionsInitialState);

  useEffect(() => {
    AppState.addEventListener('change', state => {
      // eslint-disable-next-line no-undef
      if (state !== 'active') return;
      checkLocationPermission();
    });
  }, []);

  const askLocationPermissions = async () => {
    let permissionsStatus;
    if (Platform.Os === 'ios') {
      permissionsStatus = await check(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
    } else {
      //permissionsStatus = await check(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
      permissionsStatus = await request(
        PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
      );
    }
    setpermissions({
      ...permissions,
      locationStatus: permissionsStatus,
    });
  };
  const checkLocationPermission = async () => {
    let permissionsStatus;
    if (Platform.Os === 'ios') {
      permissionsStatus = await check(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
    } else {
      permissionsStatus = await check(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
    }
    setpermissions({
      ...permissions,
      locationStatus: permissionsStatus,
    });
  };
  return (
    <PermissionContext.Provider
      value={{
        permissions,
        askLocationPermissions,
        checkLocationPermission,
      }}>
      {children}
    </PermissionContext.Provider>
  );
};
