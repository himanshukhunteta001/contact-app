import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AllContactsScreen from '../screens/AllContactsScreen';
import AddContactScreen from '../screens/AddContactScreen';
import UpdateContactScreen from '../screens/UpdateContactScreen';
import FavoriteContactsScreen from '../screens/FavoriteContactsScreen';
import { createDrawerNavigator } from '@react-navigation/drawer';

const StackNav = () => {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator initialRouteName="ContactList">
      <Stack.Screen
        name="ContactList"
        component={AllContactsScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="AddContact" component={AddContactScreen} />
      <Stack.Screen name="UpdateContact" component={UpdateContactScreen} />
      <Stack.Screen name="FavoriteContacts" component={FavoriteContactsScreen} />
    </Stack.Navigator>
  );
};

const AppNavigator = () => {
  const Drawer = createDrawerNavigator();

  return (
    <NavigationContainer>
      <Drawer.Navigator>
        <Drawer.Screen name='Contact List' component={StackNav}  />
        <Drawer.Screen name='FavoriteContacts' component={FavoriteContactsScreen} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;

