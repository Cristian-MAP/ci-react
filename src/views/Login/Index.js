import React from 'react';
import {
  View,
  Button,
  Image,
  StyleSheet,
  Dimensions,
  TouchableWithoutFeedback,
} from 'react-native';
import {Text} from 'native-base';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
GoogleSignin.configure({
  webClientId:
    '522009643316-lbgk7m95a5fgu2b6s3qq8pm4q6nsshup.apps.googleusercontent.com',
});

const Login = () => {
  async function onGoogleButtonPress() {
    // Get the users ID token
    const {idToken} = await GoogleSignin.signIn();

    // Create a Google credential with the token
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);

    // Sign-in the user with the credential
    return auth().signInWithCredential(googleCredential);
  }

  return (
    <View style={styles.container}>
      <View style={styles.Header}>
        <Text fontSize="4xl" bold italic>
          CircaBike
        </Text>
      </View>
      <Image
        style={styles.BackGroundImage}
        source={require('../../../assets/images/back.jpg')}
      />
      <View style={styles.body}>
        <View>
          <Text style={styles.text1} fontSize="3xl" bold>
            Log In
          </Text>
        </View>
        <TouchableWithoutFeedback
          onPress={() =>
            onGoogleButtonPress().then(() =>
              console.log('Signed in with Google!'),
            )
          }>
          <View style={styles.btn1}>
            <Image
              style={styles.imgIcon}
              source={{
                uri: 'https://cdn-icons-png.flaticon.com/512/2875/2875404.png',
              }}
            />
            <Text fontSize="md" bold>
              Google Sign-In
            </Text>
          </View>
        </TouchableWithoutFeedback>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: windowHeight / 20,
  },
  Header: {
    alignItems: 'center',
    width: windowWidth,
  },
  BackGroundImage: {
    width: windowWidth,
    height: windowHeight / 2,
  },
  body: {
    paddingRight: windowWidth / 10,
    paddingLeft: windowWidth / 10,
    paddingTop: windowWidth / 20,
  },
  text1: {
    textAlign: 'center',
    color: '#5f5e5e',
  },
  imgIcon: {
    width: 25,
    height: 25,
    marginRight: 10,
  },
  btn1: {
    borderColor: '#ddd',
    cursor: 'pointer',
    marginTop: windowHeight / 40,
    borderWidth: 1.4,
    paddingHorizontal: windowHeight / 52,
    paddingVertical: windowHeight / 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
});

export default Login;
