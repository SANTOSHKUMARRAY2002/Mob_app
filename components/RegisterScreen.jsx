import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ImageBackground, Alert } from 'react-native';
import ReusableTextInput from './ReusableTextInput';

const RegisterScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const handleRegister = () => {
    if (!email || !password) {
      Alert.alert('Validation Error', 'Email and password are required.');
      setEmailError(!email);
      setPasswordError(!password);
      return;
    }

    navigation.navigate('Login');
  };

  return (
    <ImageBackground source={require('../assets/RegandLog_background.jpg')} style={styles.background}>
      <View style={styles.container}>
        <Text style={styles.title}>Register for Shopgo</Text>
        <ReusableTextInput
          style={[styles.input, emailError && styles.inputError]}
          placeholder="Email"
          value={email}
          onChangeText={text => {
            setEmail(text);
            setEmailError(false);
          }}
        />
        {emailError && <Text style={styles.errorText}>Field Required</Text>}
        <ReusableTextInput
          style={[styles.input, passwordError && styles.inputError]}
          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={text => {
            setPassword(text);
            setPasswordError(false);
          }}
        />
        {passwordError && <Text style={styles.errorText}>Field Required</Text>}
        <TouchableOpacity style={styles.button} onPress={handleRegister}>
          <Text style={styles.buttonText}>Register</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    borderRadius: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#EA425C',
  },
  input: {
    width: '80%',
    padding: 10,
    margin: 10,
    borderRadius: 5,
    borderColor: '#ccc',
    borderWidth: 1,
  },
  inputError: {
    borderColor: 'red',
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#6200ee',
    padding: 15,
    borderRadius: 25,
    marginTop: 20,
    width: '80%',
    alignItems: 'center',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.8)',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default RegisterScreen;
