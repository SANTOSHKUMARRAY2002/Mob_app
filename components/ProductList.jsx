import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, TextInput, StyleSheet } from 'react-native';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';

const products = [
  { id: '1', title: 'Red T-shirt', price: 500, rating: 4.5, discount: 10, image: require('../assets/RedTshirt.jpg'), description: 'Comfortable red cotton t-shirt.' },
  { id: '2', title: 'Blue T-shirt', price: 600, rating: 4.0, discount: 5, image: require('../assets/BlueTshirt.jpg'), description: 'Stylish blue cotton t-shirt.' },
  { id: '3', title: 'Green T-shirt', price: 700, rating: 4.8, discount: 15, image: require('../assets/GreenTshirt.jpg'), description: 'Fresh green cotton t-shirt.' },
  { id: '4', title: 'Yellow T-shirt', price: 550, rating: 4.2, discount: 8, image: require('../assets/YellowTshirt.jpg'), description: 'Bright yellow cotton t-shirt.' },
  { id: '5', title: 'Purple T-shirt', price: 650, rating: 4.3, discount: 12, image: require('../assets/PurpleTshirt.jpg'), description: 'Elegant purple cotton t-shirt.' },
  { id: '6', title: 'Orange T-shirt', price: 750, rating: 4.7, discount: 10, image: require('../assets/OrangeTshirt.jpg'), description: 'Vibrant orange cotton t-shirt.' },
];

const ProductList = ({ navigation }) => {
  const { addToCart } = useCart();
  const { addToWishlist } = useWishlist();
  const [numColumns, setNumColumns] = useState(2);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [quantities, setQuantities] = useState({});
  const [filteredProducts, setFilteredProducts] = useState(products); 

  useEffect(() => {
    setFilteredProducts(products);
  }, []);

  const toggleColumns = () => {
    setNumColumns(numColumns === 2 ? 1 : 2);
  };

  const handleSearch = (text) => {
    setSearchQuery(text);
    if (text.trim() === '') {
      setFilteredProducts(products); 
    } else {
      const filtered = products.filter(product =>
        product.title.toLowerCase().includes(text.toLowerCase())
      );
      setFilteredProducts(filtered);
    }
  };

  const handleProductPress = (product) => {
    setSelectedProduct(product);
    setQuantities({ [product.id]: 1 }); 
  };

  const handleWishlistPress = (product) => {
    addToWishlist(product);
  };

  const handleAddToCart = () => {
    if (selectedProduct && quantities[selectedProduct.id] > 0) {
      addToCart({ ...selectedProduct, quantity: quantities[selectedProduct.id] });
      setSelectedProduct(null); 
    }
  };

  const handleIncreaseQuantity = () => {
    setQuantities(prevQuantities => ({
      ...prevQuantities,
      [selectedProduct.id]: prevQuantities[selectedProduct.id] ? prevQuantities[selectedProduct.id] + 1 : 1
    }));
  };

  const handleDecreaseQuantity = () => {
    if (quantities[selectedProduct.id] > 0) {
      setQuantities(prevQuantities => ({
        ...prevQuantities,
        [selectedProduct.id]: prevQuantities[selectedProduct.id] - 1
      }));
    }
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity style={[styles.productCard, { flex: 1 / numColumns }]} onPress={() => handleProductPress(item)}>
      <Image source={item.image} style={styles.productImage} />
      <Text style={styles.productTitle}>{item.title}</Text>
      <Text style={styles.productPrice}>₹{item.price}</Text>
      <Text style={styles.productRating}>Rating: {item.rating}</Text>
      <Text style={styles.productDiscount}>Discount: {item.discount}%</Text>
      <TouchableOpacity style={styles.wishlistButton} onPress={() => handleWishlistPress(item)}>
        <Image source={require('../assets/wishlist_icon.png')} style={styles.wishlistIcon} />
      </TouchableOpacity>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search products..."
            value={searchQuery}
            onChangeText={handleSearch}
          />
        </View>
        <TouchableOpacity style={styles.toggleButton} onPress={toggleColumns}>
          <Image source={require('../assets/toggle_icon.png')} style={styles.toggleIcon} />
        </TouchableOpacity>
      </View>
      <FlatList
        data={filteredProducts} // Render filtered products
        renderItem={renderItem}
        keyExtractor={item => item.id}
        numColumns={numColumns}
        key={numColumns}
      />
      {selectedProduct && (
        <View style={styles.productDetails}>
          <Image source={selectedProduct.image} style={styles.selectedProductImage} />
          <View style={styles.selectedProductInfo}>
            <Text style={styles.selectedProductTitle}>{selectedProduct.title}</Text>
            <Text style={styles.selectedProductPrice}>₹{selectedProduct.price}</Text>
            <Text style={styles.selectedProductRating}>Rating: {selectedProduct.rating}</Text>
            <Text style={styles.selectedProductDiscount}>Discount: {selectedProduct.discount}%</Text>
            <Text style={styles.selectedProductDescription}>{selectedProduct.description}</Text>
            <View style={styles.quantityContainer}>
              <TouchableOpacity onPress={handleDecreaseQuantity} style={styles.quantityButton}>
                <Text style={styles.quantityButtonText}>-</Text>
              </TouchableOpacity>
              <Text style={styles.quantityText}>{quantities[selectedProduct.id]}</Text>
              <TouchableOpacity onPress={handleIncreaseQuantity} style={styles.quantityButton}>
                <Text style={styles.quantityButtonText}>+</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity style={styles.addToCartButton} onPress={handleAddToCart}>
              <Text style={styles.addToCartButtonText}>Add to Cart</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  searchContainer: {
    flex: 1,
    marginRight: 10,
  },
  searchInput: {
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  productCard: {
    margin: 10,
    padding: 10,
    borderRadius: 10,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 2,
  },
  productImage: {
    width: '100%',
    height: 150,
    borderRadius: 10,
  },
  productTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  productPrice: {
    fontSize: 16,
    color: '#888',
  },
  productRating: {
    fontSize: 14,
    color: '#444',
  },
  productDiscount: {
    fontSize: 14,
    color: '#888',
  },
  toggleButton: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 2,
  },
  toggleIcon: {
    width: 30,
    height: 30,
    tintColor: '#555',
  },
  wishlistButton: {
    position: 'absolute',
    top: 10,
    left: 10,
    backgroundColor: 'transparent',
    borderRadius: 20,
    padding: 5,
  },
  wishlistIcon: {
    width: 30,
    height: 30,
    tintColor: '#555',
  },
  productDetails: {
    flexDirection: 'row',
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
  },
  selectedProductImage: {
    width: 150,
    height: 150,
    borderRadius: 10,
    marginRight: 10,
  },
  selectedProductInfo: {
    flex: 1,
  },
  selectedProductTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  selectedProductPrice: {
    fontSize: 18,
    color: '#888',
    marginBottom: 5,
  },
  selectedProductRating: {
    fontSize: 16,
    color: '#444',
    marginBottom: 5,
  },
  selectedProductDiscount: {
    fontSize: 16,
    color: '#888',
    marginBottom: 5,
  },
  selectedProductDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 10,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  quantityButton: {
    backgroundColor: '#ddd',
    borderRadius: 5,
    padding: 10,
  },
  quantityButtonText: {
    fontSize: 20,
    color: '#555',
  },
  quantityText: {
    fontSize: 18,
    marginHorizontal: 10,
  },
  addToCartButton: {
    backgroundColor: '#5cb85c',
    paddingVertical: 12,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  addToCartButtonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default ProductList;
