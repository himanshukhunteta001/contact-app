import React, { useEffect, useState } from 'react';
import { View, Text, SectionList, TouchableOpacity, Image, TextInput, StyleSheet } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { openDatabase } from 'react-native-sqlite-storage';
import { allContactsStyles } from '../styles/AllContactsStyles';
import { SwipeListView } from 'react-native-swipe-list-view';

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
  const handleEditContact = contact => {
    navigation.navigate('UpdateContact', { contact });
  };

  const handleDeleteContact = (contactId) => {
    db.transaction(
      function (tx) {
        tx.executeSql(
          'DELETE FROM contacts WHERE id = ?;',
          [contactId],
          function (tx, result) {
            console.log('Contact deleted successfully:', result.rowsAffected);
            loadContacts(); // Refresh contacts after deletion
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
  };
  const renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate('UpdateContact', {
          contact: item,
        })
      }
      style={[{
        marginBottom: 15, alignItems: 'center',
        backgroundColor: '#ffffff',
        borderBottomColor: '#AEAEAE',
        borderBottomWidth: 1,
        flexDirection: 'row',
        padding: 15,
      }]}
    >
      {item.photo && <Image source={{ uri: item.photo }} style={allContactsStyles.contactPhoto} />}
      <View style={allContactsStyles.contactInfo}>
        <Text style={allContactsStyles.contactName}>{item.name}</Text>
      </View>
    </TouchableOpacity>
  );

  const renderHiddenItem = ({item}) => (
    <View style={styles.rowBack}>
      <TouchableOpacity onPress={() => handleEditContact(item)}>
        <Text>Edit</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handleDeleteContact(item.id)}>
        <Text>Delete</Text>
      </TouchableOpacity>
    </View>
  );

  const renderSectionHeader = ({ section }) => (
    <View style={allContactsStyles.sectionHeader}>
      <Text style={allContactsStyles.sectionHeaderText}>{section.title}</Text>
    </View>
  );
  
  return (
    // <View style={allContactsStyles.container}>
    //   <View style={allContactsStyles.searchContainer}>
    //     <TextInput
    //       style={allContactsStyles.searchInput}
    //       placeholder="Search contacts..."
    //       value={searchText}
    //       onChangeText={(text) => setSearchText(text)}
    //     />
    //   </View>

    //   {noResults && (
    //     <Text style={allContactsStyles.noResultsText}>No contacts found with the entered name.</Text>
    //   )}

    //   {!noResults && (
    //     // <SectionList
    //     //   sections={Object.entries(contacts).map(([title, data]) => ({
    //     //     title,
    //     //     data,
    //     //   }))}
    //     //   renderItem={renderItem}
    //     //   renderSectionHeader={renderSectionHeader}
    //     //   keyExtractor={(item, index) => index.toString()}
    //     // />
    //     <SwipeListView
    //     data={newArray}
    //     renderItem={renderItem}
    //     renderHiddenItem={renderHiddenItem}
    //     // leftOpenValue={150}
    //     // rightOpenValue={-75}
    //     swipeToOpenPercent={10}
    //     />
    //   )}

    //   <TouchableOpacity style={allContactsStyles.addButton} onPress={() => navigation.navigate('AddContact')}>
    //     <Text style={allContactsStyles.addButtonText}>+</Text>
    //   </TouchableOpacity>
    // </View>

  <View style={allContactsStyles.container}>
      <View style={allContactsStyles.searchContainer}>
        <TextInput
          style={allContactsStyles.searchInput}
          placeholder="Search contacts..."
          value={searchText}
          onChangeText={(text) => setSearchText(text)}
        />
      </View>
    <SwipeListView
      useSectionList
      // data={newArray}
      sections={Object.entries(contacts).map(([title, data]) => ({ title, data, }))}
      renderSectionHeader={renderSectionHeader}
      keyExtractor={(item, index) => index.toString()}
      renderItem={renderItem}
      renderHiddenItem={renderHiddenItem}
      leftOpenValue={75}
      rightOpenValue={-75}
    />
    <TouchableOpacity style={allContactsStyles.addButton} onPress={() => navigation.navigate('AddContact')}>
        <Text style={allContactsStyles.addButtonText}>+</Text>
       </TouchableOpacity>
    </View>
);

};
const styles = StyleSheet.create({
  rowFront: {
    alignItems: 'center',
    backgroundColor: '#CCC',
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    justifyContent: 'center',
    height: 50,
  },
  rowBack: {
    alignItems: 'center',

    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 15,
  },
});
export default AllContactsScreen;

