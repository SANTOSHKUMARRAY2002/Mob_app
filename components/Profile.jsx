import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Profile = () => {
  const [name, setName] = useState('Santosh Kumar');
  const [email, setEmail] = useState('santosh@example.com');
  const [phoneNumber, setPhoneNumber] = useState('xxxxxxxxxx');
  const [isEditing, setIsEditing] = useState(false);
  const navigation = useNavigation();

  const handleSave = () => {
    setIsEditing(false);
    console.log('Saving phone number:', phoneNumber);
  };

  const handleLogout = () => {
    navigation.navigate('WelcomeScreen');
  };

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={require('../assets/Profile_icon2.png')} style={styles.profileImage} />
      </View>

      {isEditing ? (
        <>
          <TextInput style={styles.input} value={name} onChangeText={setName} placeholder="Name" />
          <TextInput style={styles.input} value={email} onChangeText={setEmail} placeholder="Email" />
          <TextInput style={styles.input} value={phoneNumber} onChangeText={setPhoneNumber} placeholder="Phone Number" keyboardType="phone-pad" />
          <View style={styles.buttonContainer}>
            <Button title="Save" onPress={handleSave} color="#007bff" />
          </View>
        </>
      ) : (
        <>
          <Text style={styles.label}>Name:</Text>
          <Text style={styles.text}>{name}</Text>
          <Text style={styles.label}>Email:</Text>
          <Text style={styles.text}>{email}</Text>
          <Text style={styles.label}>Phone Number:</Text>
          <Text style={styles.text}>{phoneNumber}</Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.editButton} onPress={() => setIsEditing(true)}>
              <Text style={styles.editText}>Edit</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
              <Text style={styles.logoutText}>Logout</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  imageContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
    color: '#333',
  },
  text: {
    fontSize: 16,
    marginBottom: 10,
    color: '#555',
  },
  input: {
    width: '80%',
    padding: 10,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    color: '#333',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '80%',
    marginTop: 20,
  },
  editButton: {
    backgroundColor: '#007bff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  editText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  logoutButton: {
    backgroundColor: '#dc3545',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  logoutText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default Profile;
