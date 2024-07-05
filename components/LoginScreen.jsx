import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, ImageBackground, Alert } from 'react-native';
import ReusableTextInput from './ReusableTextInput';
import { useAuth } from '../context/AuthContext';

const LoginScreen = ({ navigation }) => {
  const { login } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [usernameError, setUsernameError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const handleLogin = () => {
    if (!username || !password) {
      Alert.alert('Validation Error', 'Username and password are required.');
      setUsernameError(!username);
      setPasswordError(!password);
      return;
    }
    
    login();
    navigation.navigate('Home');
  };

  return (
    <ImageBackground source={require('../assets/RegandLog_background.jpg')} style={styles.background}>
      <View style={styles.container}>
        <Text style={styles.title}>Login</Text>
        <ReusableTextInput
          style={[styles.input, usernameError && styles.inputError]}
          placeholder="Username"
          value={username}
          onChangeText={text => {
            setUsername(text);
            setUsernameError(false);
          }}
        />
        {usernameError && <Text style={styles.errorText}>Field Required</Text>}
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
        <Button title="Login" onPress={handleLogin} />
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
});

export default LoginScreen;
