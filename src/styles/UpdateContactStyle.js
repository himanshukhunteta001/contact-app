import { StyleSheet } from 'react-native';

export const updateContactStyle = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#333',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  icon: {
    marginRight: 10,
    color: '#333',
  },
  input: {
    flex: 1,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 8,
  },
  photoButton: {
    backgroundColor: '#007BFF',
    padding: 10,
    marginBottom: 16,
    alignItems: 'center',
    borderRadius: 5,
  },
  photoPreview: {
    width: 200,
    height: 200,
    marginBottom: 16,
    borderRadius: 5,
  },
  cameraIcon: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 200,
    height: 200,
    backgroundColor: '#f4f4f4',
    marginBottom: 16,
    borderRadius: 5,
  },
  favoriteButton: {
    backgroundColor: '#28a745',
    padding: 10,
    marginBottom: 16,
    alignItems: 'center',
    borderRadius: 5,
    position: 'absolute',
    bottom: 16,
    left: 16,
  },
  updateButton: {
    backgroundColor: '#007BFF',
    padding: 10,
    marginBottom: 16,
    alignItems: 'center',
    borderRadius: 5,
    position: 'absolute',
    bottom: 16,
    right: 16,
    fontSize: 16,
  },
  deleteButton: {
    // backgroundColor: '#dc3545',
    padding: 10,
    marginBottom: 16,
    alignItems: 'center',
    borderRadius: 5,
    position: 'absolute',
    top: 16,
    right: 16,
    // fontSize: 16,
  },
  deleteButtonText: {
    color: 'white',
  },
  buttonText: {
    color: 'white',
  },
  headerButton: {
    
    fontSize: 16,
    marginRight: 16,
  },
});

export default updateContactStyle;
