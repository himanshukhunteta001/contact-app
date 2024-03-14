import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer'
import AllContactsScreen from '../screens/AllContactsScreen';
import FavoriteContactsScreen from '../screens/FavoriteContactsScreen';
const Drawer=createDrawerNavigator();
const DrawerNavigator = () => {
  return (
    <Drawer.Navigator>
    <Drawer.Screen name="Contact List" component={AllContactsScreen} options={{headerShown:true}}/>
    <Drawer.Screen name="Favorite Contact List" component={FavoriteContactsScreen} options={{headerShown:true}}/>
    </Drawer.Navigator>
  )
}
 
export default DrawerNavigator