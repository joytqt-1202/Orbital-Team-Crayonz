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


const Stack= createNativeStackNavigator()
const Drawer= createDrawerNavigator()

const SettingsStack = () => {
  return (
   
    <Stack.Navigator>
      <Stack.Screen name='Main' component={CamScreen} options={{ headerShown:false }}/>
      <Stack.Screen name='Settings' component={Settings} />
    </Stack.Navigator>
  )
  
}

export default function RootNavigation() {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName='CamScreen'>
        <Drawer.Screen name='CamScreen' component={SettingsStack} options={{ headerShown:false }}/>
        <Drawer.Screen name='VMWScreen' component={VMWScreen} options={{
          headerShown:false
        }}/>
        <Drawer.Screen name='CMWScreen' component={CMWScreen} options={{ headerShown:true }}/>
        <Drawer.Screen name='PScreen' component={PScreen} />
      </Drawer.Navigator>
    </NavigationContainer>
    

    // <NavigationContainer>
    //     <Stack.Navigator initialRouteName='CamMain'>
    //         <Stack.Screen name='CamMain' component={CamMain} options={{ headerShown:false }}/>
    //         <Stack.Screen name='Settings' component={Settings} />
    //     </Stack.Navigator>
    // </NavigationContainer>
    //     <Drawer.Navigator initialRouteName='CamMain'>
    //         <Drawer.Screen name='CamMain' component={CamMain} options={{ headerShown:false }}/>
    //         <Drawer.Screen name='VMWScreen' component={VMWScreen} />
    //         <Drawer.Screen name='CMWScreen' component={CMWScreen} options={{ headerShown:false }}/>
    //         <Drawer.Screen name='PScreen' component={PScreen} />
    //     </Drawer.Navigator>
    


  )
}