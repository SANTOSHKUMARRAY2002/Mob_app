import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useCart } from '../context/CartContext';

const ProductDetails = ({ route, navigation }) => {
  const { product } = route.params;
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart(product);
    navigation.navigate('CartSummary');
  };

  return (
    <View style={styles.container}>
      <Image source={product.image} style={styles.productImage} />
      <Text style={styles.productTitle}>{product.title}</Text>
      <Text style={styles.productPrice}>₹{product.price}</Text>
      <Text style={styles.productRating}>Rating: {product.rating}</Text>
      <Text style={styles.productDiscount}>Discount: {product.discount}%</Text>
      <TouchableOpacity style={styles.addToCartButton} onPress={handleAddToCart}>
        <Text style={styles.addToCartText}>ADD TO CART</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  productImage: {
    width: '100%',
    height: 300,
    borderRadius: 10,
  },
  productTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  productPrice: {
    fontSize: 20,
    color: '#888',
  },
  productRating: {
    fontSize: 18,
    color: '#444',
  },
  productDiscount: {
    fontSize: 18,
    color: '#888',
  },
  addToCartButton: {
    backgroundColor: '#007bff',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  addToCartText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
  },
});

export default ProductDetails;
