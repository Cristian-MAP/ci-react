import React from 'react';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
//Components
import HomeScreen from '../Home/Index';
import UserProfile from '../User/Index';

const Tab = createMaterialBottomTabNavigator();

function Index() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="UserProfile" component={UserProfile} />
    </Tab.Navigator>
  );
}

export default Index;
