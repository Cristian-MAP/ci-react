import React from 'react';
import {View,Text,Button} from 'react-native'
import MapScreen from '../../utils/MapScreen';


const Home =()=>{
    return(
        <View style={{flex:1}}>
            <MapScreen/>     
        </View>
    )
}

export default Home;