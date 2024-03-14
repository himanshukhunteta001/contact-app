import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native'
import DrawerNavigator from '../navigation/DrawerNavigator'
import UpdateContactScreen from '../screens/UpdateContactScreen'
import AllContactsScreen from '../screens/AllContactsScreen'
import AddContactScreen from '../screens/AddContactScreen'
const Stack=createStackNavigator();
const AppNavigator = () => {
  return (
    <NavigationContainer>
        <Stack.Navigator>
            <Stack.Screen component={DrawerNavigator} name='DrawerNavigator'options={{headerShown:false}} />
             <Stack.Screen component={AllContactsScreen} name='Contact List' options={{headerShown:true}}/>
             <Stack.Screen component={UpdateContactScreen} name='UpdateContact' options={{headerShown:false}}/>
             <Stack.Screen component={AddContactScreen} name='AddContact' options={{headerShown:false}}/>
        </Stack.Navigator>
    </NavigationContainer>
  )
}
 
export default AppNavigator;