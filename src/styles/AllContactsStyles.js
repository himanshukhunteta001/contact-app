import { StyleSheet } from 'react-native';

export const allContactsStyles = StyleSheet.create({
  container: {
    flex: 1,

  },
  sectionHeader: {
    padding: 8,
  },
  sectionHeaderText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ccc',
  },
  contactPhoto: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 20,
  },
  contactName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
  },
  addButton: {
    position: 'absolute',
    bottom: 16,
    right: 16,
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#007BFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButtonText: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
  });

export default allContactsStyles;
