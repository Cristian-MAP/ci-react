import React, {useEffect} from 'react';
import {useLocation} from '../hooks/useLocation';
import {View} from 'react-native';
import {Map} from '../utils/Map';

const MapScreen = () => {
  const {userLocation, useDistance} = useLocation();

  useEffect(() => {}, [userLocation]);
  console.log('Metros', userLocation);
  return (
    <View style={{flex: 1}}>
      <Map />
    </View>
  );
};

export default MapScreen;
