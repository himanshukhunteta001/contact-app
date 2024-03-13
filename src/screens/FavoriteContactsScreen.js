import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { openDatabase } from 'react-native-sqlite-storage';

const db = openDatabase({ name: 'contacts.db', createFromLocation: 1 });

const FavoriteContactsScreen = ({ navigation }) => {
  const [favoriteContacts, setFavoriteContacts] = useState([]);

  useEffect(() => {
    loadFavoriteContacts();
  }, []);

  const loadFavoriteContacts = () => {
    db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM contacts WHERE favorite = 1 ORDER BY name ASC;',
        [],
        (_, { rows }) => {
          setFavoriteContacts(rows.raw());
        },
        (_, error) => {
          console.error('Error loading favorite contacts', error);
        }
      );
    });
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate('UpdateContact', {
          contact: item,
          onContactUpdate: loadFavoriteContacts,
        })
      }
      style={styles.contactItem}
    >
      <View style={styles.contactInfo}>
        <Text>{item.name}</Text>
        <Text>{item.phone}</Text>
      </View>
      {item.photo && <Image source={{ uri: item.photo }} style={styles.contactPhoto} />}
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={favoriteContacts}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  contactItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  contactInfo: {
    flex: 1,
  },
  contactPhoto: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
});

export default FavoriteContactsScreen;
