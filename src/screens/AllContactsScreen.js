import React, { useEffect, useState } from 'react';
import { View, Text, SectionList, TouchableOpacity, Image, TextInput } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { openDatabase } from 'react-native-sqlite-storage';
import { allContactsStyles } from '../styles/AllContactsStyles';

const db = openDatabase({ name: 'contacts.db', createFromLocation: 1 });

db.transaction(tx => {
  tx.executeSql(
    'CREATE TABLE IF NOT EXISTS contacts (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, phone TEXT, landline TEXT, photo TEXT, favorite INTEGER);'
  );
});

const AllContactsScreen = ({ navigation, route }) => {
  const [contacts, setContacts] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [noResults, setNoResults] = useState(false);

  useFocusEffect(
    React.useCallback(() => {
      loadContacts();
    }, [route.params?.updatedContactId])
  );

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      loadContacts();
    }, 300);

    return () => clearTimeout(debounceTimer);
  }, [searchText]);

  const loadContacts = () => {
    db.transaction((tx) => {
      const query = searchText
        ? 'SELECT * FROM contacts WHERE name LIKE ? ORDER BY name ASC;'
        : 'SELECT * FROM contacts ORDER BY name ASC;';

      const params = searchText ? [`%${searchText}%`] : [];

      tx.executeSql(
        query,
        params,
        (_, { rows }) => {
          const data = rows.raw();
          const groupedContacts = groupContacts(data);
          setNoResults(searchText.length > 0 && Object.keys(groupedContacts).length === 0);
          setContacts(groupedContacts);
        },
        (_, error) => {
          console.error('Error loading contacts', error);
        }
      );
    });
  };

  const groupContacts = (contacts) => {
    // Group contacts by the first letter of their names and sort the sections
    const groupedContacts = contacts.reduce((result, contact) => {
      const firstLetter = contact.name[0].toUpperCase();
      if (!result[firstLetter]) {
        result[firstLetter] = [];
      }
      result[firstLetter].push(contact);
      return result;
    }, {});

    // Sort the sections alphabetically
    const sortedSections = Object.entries(groupedContacts).sort(([a], [b]) => a.localeCompare(b));

    return sortedSections.reduce((result, [title, data]) => {
      result[title] = data;
      return result;
    }, {});
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate('UpdateContact', {
          contact: item,
        })
      }
      style={allContactsStyles.contactItem}
    >
      {item.photo && <Image source={{ uri: item.photo }} style={allContactsStyles.contactPhoto} />}
      <View style={allContactsStyles.contactInfo}>
        <Text style={allContactsStyles.contactName}>{item.name}</Text>
      </View>
    </TouchableOpacity>
  );

  const renderSectionHeader = ({ section }) => (
    <View style={allContactsStyles.sectionHeader}>
      <Text style={allContactsStyles.sectionHeaderText}>{section.title}</Text>
    </View>
  );

return (
  <View style={allContactsStyles.container}>
    <View style={allContactsStyles.searchContainer}>
      <TextInput
        style={allContactsStyles.searchInput}
        placeholder="Search contacts..."
        value={searchText}
        onChangeText={(text) => setSearchText(text)}
      />
    </View>

    {noResults && (
      <Text style={allContactsStyles.noResultsText}>No contacts found with the entered name.</Text>
    )}

    {!noResults && (
      <SectionList
        sections={Object.entries(contacts).map(([title, data]) => ({
          title,
          data,
        }))}
        renderItem={renderItem}
        renderSectionHeader={renderSectionHeader}
        keyExtractor={(item, index) => index.toString()}
      />
    )}

    <TouchableOpacity
      style={allContactsStyles.addButton}
      onPress={() => navigation.navigate('AddContact')}
    >
      <Text style={allContactsStyles.addButtonText}>+</Text>
    </TouchableOpacity>
  </View>
);
};

export default AllContactsScreen;

