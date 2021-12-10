import React, {useContext, useEffect} from 'react';
import {View, Button, Image, StyleSheet, Dimensions} from 'react-native';
import {Text} from 'native-base';
import {PermissionContext} from '../../context/PermissionsContext';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const PermissionScreen = () => {
  const {askLocationPermissions} = useContext(PermissionContext);
  useEffect(() => {
    askLocationPermissions();
  }, []);

  return (
    <View style={styles.container}>
      {/* <Text>Permisos</Text>
      <Button title="Permisos" onPress={askLocationPermissions} />
      <Text>{JSON.stringify(permissions, null, 5)}</Text> */}
      <Image style={styles.image} source={require('../../assets/map.jpg')} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    height: windowHeight,
    width: windowWidth,
    flex: 1,
  },
  image: {
    height: windowHeight,
    width: windowWidth,
    flex: 1,
  },
});

export default PermissionScreen;
