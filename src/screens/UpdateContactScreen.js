import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Button, Alert } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import { openDatabase } from 'react-native-sqlite-storage';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'; // Import FontAwesome5 for icons
import updateContactStyle from '../styles/UpdateContactStyle';

let db = openDatabase({ name: 'contacts.db' });

const UpdateContactScreen = ({ route, navigation }) => {
  const { contact } = route.params;
  const [name, setName] = useState(contact.name);
  const [mobile, setMobile] = useState(contact.phone);
  const [landline, setLandline] = useState(contact.landline);
  const [photo, setPhoto] = useState(contact.photo);
  const [isFavorite, setIsFavorite] = useState(contact.favorite === 1);

  useEffect(() => {
    navigation.setOptions({
      title: 'Update Contact',
      headerRight: () => (
        <TouchableOpacity onPress={handleDeleteContact}>
          <Text style={updateContactStyle.headerButton}>Delete</Text>
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  const handleUpdateContact = () => {
    db.transaction(
      function (tx) {
        tx.executeSql(
          'UPDATE contacts SET name = ?, phone = ?, landline = ?, photo = ?, favorite = ? WHERE id = ?;',
          [name, mobile, landline, photo, isFavorite ? 1 : 0, contact.id],
          function (tx, result) {
            console.log('Contact updated successfully:', result.rowsAffected);
            navigation.reset({
              index: 0,
              routes: [{ name: 'Contact List' }],
            });
            navigation.navigate('DrawerNavigator');
          },
          function (tx, error) {
            console.error('Error updating contact', error);
            console.error('SQL statement:', tx.sql);
          }
        );
      },
      function (error) {
        console.error('Transaction error:', error);
      }
    );
  };

  const handleToggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  const openImagePicker = () => {
    const options = {
      mediaType: 'photo',
      includeBase64: false,
      maxHeight: 2000,
      maxWidth: 2000,
    };

    launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('Image picker error: ', response.error);
      } else {
        let imageUri = response.uri || response.assets?.[0]?.uri;
        setPhoto(imageUri);
      }
    });
  };
  const handleDeleteContact = () => {
    Alert.alert(
      'Delete Contact',
      'Are you sure you want to delete this contact?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          onPress: () => {
            db.transaction(
              function (tx) {
                tx.executeSql(
                  'DELETE FROM contacts WHERE id = ?;',
                  [contact.id],
                  function (tx, result) {
                    console.log('Contact deleted successfully:', result.rowsAffected);
                    navigation.reset({
                      index: 0,
                      routes: [{ name: 'Contact List' }],
                    });
                    navigation.navigate('DrawerNavigator');
                  },
                  function (tx, error) {
                    console.error('Error deleting contact', error);
                    console.error('SQL statement:', tx.sql);
                  }
                );
              },
              function (error) {
                console.error('Transaction error:', error);
              }
            );
          },
          style: 'destructive',
        },
      ],
      { cancelable: true }
    );
  };
  return (
    <View style={updateContactStyle.container}>
      <Text style={updateContactStyle.title}>Update Contact</Text>
      <TouchableOpacity style={updateContactStyle.deleteButton} onPress={handleDeleteContact}>
        <Text>Delete</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={openImagePicker}>
        {photo ? (
          <Image source={{ uri: photo }} style={updateContactStyle.photoPreview} />
        ) : (
          <View style={updateContactStyle.cameraIcon}>
            <FontAwesome5 name="camera" size={50} color="#007BFF" />
          </View>
        )}
      </TouchableOpacity>


      <View style={updateContactStyle.inputContainer}>
        <FontAwesome5 name="user" size={20} color="#333" style={updateContactStyle.icon} />
        <TextInput
          placeholder="Name"
          value={name}
          onChangeText={(text) => setName(text)}
          style={updateContactStyle.input}
        />
      </View>

      <View style={updateContactStyle.inputContainer}>
        <FontAwesome5 name="mobile" size={20} color="#333" style={updateContactStyle.icon} />
        <TextInput
          placeholder="Mobile Phone"
          value={mobile}
          onChangeText={(text) => setMobile(text)}
          keyboardType="phone-pad"
          style={updateContactStyle.input}
        />
      </View>

      <View style={updateContactStyle.inputContainer}>
        <FontAwesome5 name="phone" size={20} color="#333" style={updateContactStyle.icon} />
        <TextInput
          placeholder="Landline Number"
          value={landline}
          onChangeText={(text) => setLandline(text)}
          keyboardType="phone-pad"
          style={updateContactStyle.input}
        />
      </View>

      <TouchableOpacity style={updateContactStyle.favoriteButton} onPress={handleToggleFavorite}>
        <Text style={updateContactStyle.buttonText}>
          {isFavorite ? 'Unmark as Favorite' : 'Mark as Favorite'}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity style={updateContactStyle.updateButton} onPress={handleUpdateContact}>
        <Text style={updateContactStyle.buttonText}>Update</Text>
      </TouchableOpacity>
    </View>
  );
};

export default UpdateContactScreen;
