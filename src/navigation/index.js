import 'react-native-gesture-handler'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { createDrawerNavigator } from '@react-navigation/drawer'
import Settings from '../screens/settings'
import CamScreen from '../screens/main-camera'
import CMWScreen from '../screens/colour-my-world'
import VMWScreen from '../screens/view-my-world'
import PScreen from '../screens/photography'
import LoginScreen from '../screens/login'


const Stack= createNativeStackNavigator()
const Drawer= createDrawerNavigator()

const SettingsStack = () => {
  return (
   
    <Stack.Navigator>
      <Stack.Screen name='Login' component={LoginScreen} options={{ headerShown:false }}/>
      <Stack.Screen name='HomeScreen' component={VMWScreen} options={{ headerShown:false }}/>
      <Stack.Screen name='Settings' component={Settings} />
    </Stack.Navigator>
  )
  
}

export default function RootNavigation() {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName='View My World'>
        <Drawer.Screen name='CamScreen' component={CamScreen} options={{ headerShown:false }}/>
        <Drawer.Screen name='View My World' component={SettingsStack} options={{
          headerShown:false
        }}/>
        <Drawer.Screen name='CMWScreen' component={CMWScreen} />
        <Drawer.Screen name='PScreen' component={PScreen} />
      </Drawer.Navigator>
    </NavigationContainer>
    
       
    


  )
}