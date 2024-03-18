import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native';
import { addContactStyle } from '../styles/AddContactStyle';
import { launchImageLibrary } from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import { openDatabase } from 'react-native-sqlite-storage';
import { HeaderBackButton } from '@react-navigation/elements';

let db = openDatabase({ name: 'contacts.db' });

const AddContactScreen = ({ navigation }) => {
  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [landline, setLandline] = useState('');
  const [photo, setPhoto] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);

  const handleSaveContact = () => {
    console.log(name, mobile, landline, photo, isFavorite);
    db.transaction(
      function (tx) {
        tx.executeSql(
          'INSERT INTO contacts (name, phone, landline, photo, favorite) VALUES (?, ?, ?, ?, ?);',
          [name, mobile, landline, photo, isFavorite ? 1 : 0],
          function (tx, result) {
            if (result.insertId) {
              console.log('Contact inserted with ID:', result.insertId);
              navigation.reset({
                index: 0,
                routes: [{ name: 'Contact List' }],
              });
              navigation.navigate('DrawerNavigator');
            } else {
              console.error('Error saving contact: No insertId');
            }
          },
          function (tx, error) {
            console.error('Error saving contact', error);
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

  return (
    <View style={addContactStyle.container}>
      <View style={addContactStyle.header}>
  <HeaderBackButton onPress={() => navigation.goBack()} />
  <View style={{ flex: 1, alignItems: 'center' }}>
    <Text style={addContactStyle.title}>Add New Contact</Text>
  </View>
</View>


      <View style={addContactStyle.topButtonContainer}>

        {photo ?
          <View style={{ alignItems: 'center', justifyContent: 'center', borderRadius: 70, borderWidth: 1, height: 80, width: 80 }}>
            <Image source={{ uri: photo }} style={{ height: 100, width: 100, resizeMode: 'cover', borderRadius: 80 }} />
          </View>
          :
          <TouchableOpacity style={addContactStyle.topButton} onPress={openImagePicker}>
            <Icon name="camera" type="font-awesome" color="#fff" size={24} />
          </TouchableOpacity>
        }
      </View>

      <View style={addContactStyle.inputContainer}>
        <Icon name="user" type="font-awesome" color="#333" size={20} style={addContactStyle.icon} />
        <TextInput
          placeholder="Name"
          value={name}
          onChangeText={(text) => setName(text)}
          style={addContactStyle.input}
        />
      </View>

      <View style={addContactStyle.inputContainer}>
        <Icon name="mobile" type="font-awesome" color="#333" size={20} style={addContactStyle.icon} />
        <TextInput
          placeholder="Mobile Phone"
          value={mobile}
          onChangeText={(text) => setMobile(text)}
          keyboardType="phone-pad"
          style={addContactStyle.input}
        />
      </View>

      <View style={addContactStyle.inputContainer}>
        <Icon name="phone" type="font-awesome" color="#333" size={20} style={addContactStyle.icon} />
        <TextInput
          placeholder="Landline Number"
          value={landline}
          onChangeText={(text) => setLandline(text)}
          keyboardType="phone-pad"
          style={addContactStyle.input}
        />
      </View>
      <TouchableOpacity style={addContactStyle.favoriteButton} onPress={handleToggleFavorite}>
        <Text style={addContactStyle.buttonText}>
          {isFavorite ? 'Unmark as Favorite' : 'Mark as Favorite'}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity style={addContactStyle.saveButton} onPress={handleSaveContact}>
        <Text style={addContactStyle.buttonText}>Save</Text>
      </TouchableOpacity>
    </View>
  );
};

export default AddContactScreen;
