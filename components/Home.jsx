import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ImageBackground, Animated, Easing } from 'react-native';

const Home = () => {
  const [fadeAnim] = useState(new Animated.Value(0)); // Initial value for opacity: 0

  useEffect(() => {
    Animated.timing(
      fadeAnim,
      {
        toValue: 1,
        duration: 2000, // Animation duration in milliseconds
        easing: Easing.ease,
        useNativeDriver: true, // Add this line for better performance
      }
    ).start();
  }, [fadeAnim]);

  return (
    <ImageBackground source={require('../assets/Home_Wallpaper.jpg')} style={styles.background}>
      <View style={styles.container}>
        <Animated.Text style={[styles.text, { opacity: fadeAnim }]}>Welcome to Shopgo Home!</Animated.Text>
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
  },
  text: {
    fontSize: 24,
    color: '#fff',
    textAlign: 'center',
  },
});

export default Home;
