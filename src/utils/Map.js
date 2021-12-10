import React, {useEffect, useRef, useState} from 'react';
import MapView, {PROVIDER_GOOGLE, Marker, Polyline} from 'react-native-maps';
import {useLocation} from '../hooks/useLocation';
import {LoadingScreen} from './LoaderScreen';
import {Fab} from './Fab';
import {View, StyleSheet} from 'react-native';
import {Text} from 'native-base';

export const Map = ({markers}) => {
  const [showPolyline, setShowPolyline] = useState(true);
  const {
    hasLocation,
    initialPosition,
    getCurrentLocation,
    followUserLocation,
    userLocation,
    useDistance,
    stopFollowUserLocation,
    routeLines,
  } = useLocation();

  const mapViewRef = useRef();
  const following = useRef(true);

  useEffect(() => {
    followUserLocation();
    return () => {
      stopFollowUserLocation();
    };
  }, []);

  useEffect(() => {
    if (!following.current) return;

    const {latitude, longitude} = userLocation;
    mapViewRef.current?.animateCamera({
      center: {latitude, longitude},
    });
  }, [userLocation]);

  if (!hasLocation) {
    return <LoadingScreen />;
  }
  return (
    <>
      <MapView
        provider={PROVIDER_GOOGLE} // remove if not using Google Maps
        ref={el => (mapViewRef.current = el)}
        showsUserLocation
        style={{flex: 1}}
        onTouchStart={() => (following.current = false)}
        region={{
          latitude: initialPosition.latitude,
          longitude: initialPosition.longitude,
          latitudeDelta: 0.015,
          longitudeDelta: 0.0121,
        }}>
        {showPolyline && (
          <Polyline
            coordinates={routeLines}
            strokeColor="black"
            strokeWidth={3}
          />
        )}
        {/* <Marker
          coordinate={{
            latitude: 4.617,
            longitude: -75.633,
          }}
          title="esto es un marcador"
          description="esto es un marcador"
        /> */}
      </MapView>
      <Fab
        iconName="custom-marker"
        onPress={() => setShowPolyline(!showPolyline)}
        style={{
          position: 'absolute',
          bottom: 80,
          right: 20,
        }}
      />
      <View style={styles.container}>
        <Text fontSize="2xl" bold>
          Metros: {Math.round( useDistance(userLocation))}
        </Text>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 50,
    backgroundColor: 'white',
    padding: 10,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
