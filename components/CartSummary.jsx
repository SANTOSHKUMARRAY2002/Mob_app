import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Button, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native'; 
import { useCart } from '../context/CartContext';

const CartSummary = () => {
  const { cart, dispatch } = useCart();
  const navigation = useNavigation(); 
  const handleRemoveItem = (id) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: { id } });
  };

  const handleBuyNow = () => {
    dispatch({ type: 'CLEAR_CART' });
    navigation.navigate('Home', { message: 'Your Order is Placed' });
  };

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Image source={item.image} style={styles.itemImage} />
      <View style={styles.itemDetails}>
        <Text style={styles.itemTitle}>{item.title}</Text>
        <Text style={styles.itemPrice}>₹{item.price}</Text>
        <Text style={styles.itemQuantity}>Quantity: {item.quantity}</Text>
      </View>
      <View style={styles.itemButtons}>
        <Button title="Remove" onPress={() => handleRemoveItem(item.id)} />
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {cart.length === 0 ? (
        <Text style={styles.emptyMessage}>Your cart is empty</Text>
      ) : (
        <>
          <FlatList
            data={cart}
            renderItem={renderItem}
            keyExtractor={item => item.id}
          />
          <Text style={styles.total}>Grand Total: ₹{cart.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2)}</Text>
          <TouchableOpacity style={styles.buyNowButton} onPress={handleBuyNow}>
            <Text style={styles.buyNowText}>Buy Now</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  itemContainer: {
    flexDirection: 'row',
    marginBottom: 20,
    padding: 10,
    borderRadius: 10,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 2,
  },
  itemImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginRight: 10,
  },
  itemDetails: {
    flex: 1,
    justifyContent: 'center',
  },
  itemTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  itemPrice: {
    fontSize: 16,
    color: '#888',
  },
  itemQuantity: {
    fontSize: 14,
    color: '#888',
  },
  itemButtons: {
    justifyContent: 'center',
  },
  total: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 20,
  },
  emptyMessage: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 20,
  },
  buyNowButton: {
    backgroundColor: '#007bff',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginVertical: 20,
  },
  buyNowText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
  },
});

export default CartSummary;
