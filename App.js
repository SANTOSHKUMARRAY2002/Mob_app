import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image } from 'react-native';
import WelcomeScreen from './components/WelcomeScreen';
import LoginScreen from './components/LoginScreen';
import RegisterScreen from './components/RegisterScreen';
import Home from './components/Home';
import ProductList from './components/ProductList';
import ProductDetails from './components/ProductDetails';
import Profile from './components/Profile';
import CartSummary from './components/CartSummary';
import Wishlist from './components/Wishlist';
import { CartProvider } from './context/CartContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import { WishlistProvider } from './context/WishlistContext'; 

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const AuthStack = () => (
  <Stack.Navigator initialRouteName="Welcome">
    <Stack.Screen name="Welcome" component={WelcomeScreen} options={{ headerShown: false }} />
    <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
    <Stack.Screen name="Register" component={RegisterScreen} options={{ headerShown: false }} />
  </Stack.Navigator>
);

const AppTabs = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        let iconName;

        if (route.name === 'Home') {
          iconName = require('./assets/home_icon.png');
        } else if (route.name === 'Product') {
          iconName = require('./assets/product_icon.png');
        } else if (route.name === 'Profile') {
          iconName = require('./assets/profile_icon.png');
        } else if (route.name === 'Wishlist') {
          iconName = require('./assets/wishlist_icon.png');
        } else if (route.name === 'Cart') {
          iconName = require('./assets/cart_icon.png');
        }

        return <Image source={iconName} style={{ width: size, height: size, tintColor: color }} />;
      },
    })}
    tabBarOptions={{
      activeTintColor: 'red',
      inactiveTintColor: 'gray',
    }}
  >
    <Tab.Screen name="Home" component={Home}/>
    <Tab.Screen name="Product" component={ProductList}/>
    <Tab.Screen name="Profile" component={Profile}/>
    <Tab.Screen name="Wishlist" component={Wishlist}/>
    <Tab.Screen name="Cart" component={CartSummary}/>
  </Tab.Navigator>
);

const AppStack = () => (
  <Stack.Navigator initialRouteName="Home">
    <Stack.Screen name="Home" component={AppTabs} options={{ headerShown: false }} />
    <Stack.Screen name="ProductDetails" component={ProductDetails} />
  </Stack.Navigator>
);

const App = () => {
  const { isAuthenticated } = useAuth();

  return (
    <CartProvider>
      <WishlistProvider> 
        <NavigationContainer>
          {isAuthenticated ? <AppStack /> : <AuthStack />}
        </NavigationContainer>
      </WishlistProvider>
    </CartProvider>
  );
};

export default () => (
  <AuthProvider>
    <App />
  </AuthProvider>
);
