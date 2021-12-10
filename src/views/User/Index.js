import React from 'react';
import {View,Text,Button} from 'react-native'
import auth from '@react-native-firebase/auth';

const User =()=>{
    return(
        <View>
            <Button 
            title="Signing out"
            onPress={()=>{
                auth()
                .signOut()
                .then(() => console.log('User signed out!'));
            }}/>        
        </View>
    )
}

export default User;