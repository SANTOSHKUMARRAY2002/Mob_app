import React from 'react';
import { StyleSheet, View, ImageBackground, Text, Image } from 'react-native';
import ReusableButton from './ReusableButton'; 

const WelcomeScreen = ({ navigation }) => {
  return (
    <ImageBackground
      source={require('../assets/Welcome_background.jpg')}
      style={styles.background}
    >
      <View style={styles.container}>
        <Image source={require('../assets/logo-transparent.png')} style={styles.logo} />
        <Text style={styles.title}>Welcome to Shopgo</Text>
        
        
        <ReusableButton
          title="Login"
          onPress={() => navigation.navigate('Login')}
          buttonStyle={{ backgroundColor: '#007bff' }} 
          textStyle={{ color: '#fff' }} 
        />
        
        <ReusableButton
          title="Register"
          onPress={() => navigation.navigate('Register')}
          buttonStyle={{ backgroundColor: '#28a745' }} 
          textStyle={{ color: '#fff' }} 
        />
        
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
  logo: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#ffffff', 
  },
});

export default WelcomeScreen;
