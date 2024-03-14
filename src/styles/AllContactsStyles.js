// // AllContactsStyles.js

// import { StyleSheet } from 'react-native';

// export const allContactsStyles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 16,
//   },
//   contactItem: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     padding: 12,
//     borderBottomWidth: 1,
//     borderBottomColor: '#ccc',
//   },
//   contactName: {
//     color: 'black', // Change to your desired text color
//     fontWeight: 'bold',
//   },
//   addButton: {
//     position: 'absolute',
//     bottom: 16,
//     right: 16,
//     width: 50,
//     height: 50,
//     borderRadius: 25,
//     backgroundColor: '#007BFF',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   addButtonText: {
//     color: 'white',
//     fontSize: 24,
//     fontWeight: 'bold',
//   },
//   contactPhoto: {
//     width: 50,
//     height: 50,
//     borderRadius: 25,
//     marginRight: 12,
//   },
//   contactInfo: {
//     flex: 1,
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginLeft: 12,
//   },
// });

// export default allContactsStyles;

import { StyleSheet } from 'react-native';

export const allContactsStyles = StyleSheet.create({
  container: {
    flex: 1,

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
  sectionHeader: {
    backgroundColor: '#f2f2f2',
    padding: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  sectionHeaderText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ccc',
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    flex:1
  },
  contactPhoto: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 12,
  },
  contactInfo: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  contactName: {
    fontSize: 16,
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
  
 hiddenItem: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderBottomWidth: 1,
    borderBottomColor: '#CCCCCC',
  },
  editButton: {
    backgroundColor: '#FFCC00',
    justifyContent: 'center',
    alignItems: 'center',
    width: 75,
    height: '100%',
  },
  deleteButton: {
    backgroundColor: '#FF0000',
    justifyContent: 'center',
    alignItems: 'center',
    width: 75,
    height: '100%',
  },
});

export default allContactsStyles;
