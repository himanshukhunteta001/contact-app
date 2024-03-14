import { StyleSheet } from 'react-native';

export const addContactStyle = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
    alignItems: 'center', // Center content horizontally
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
    width: '100%',
    marginBottom: 16,
  },
  icon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    paddingHorizontal: 8,
    borderRadius: 5,
    flexDirection: 'row', // Align items horizontally
    alignItems: 'center', // Center vertically
  },
  cameraButtonContainer: {
    width: 120,
    height: 120,
    borderRadius: 60, // Make it circular
    backgroundColor: '#007BFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  cameraImage: {
    width: '100%',
    height: '100%',
    borderRadius: 60, // Make it circular
  },
  button: {
    backgroundColor: '#007BFF',
    padding: 10,
    marginBottom: 16,
    alignItems: 'center',
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
  },
  photoPreview: {
    width: 40,
    height: 40,
    alignSelf: 'center',
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
  saveButton: {
    backgroundColor: '#007BFF',
    padding: 10,
    marginBottom: 16,
    alignItems: 'center',
    borderRadius: 5,
    position: 'absolute',
    bottom: 16,
    right: 16,
  },
  topButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 16, 
  },
  topButton: {
    backgroundColor: '#007BFF',
    padding: 35,
    borderRadius: 50,
  },
});
