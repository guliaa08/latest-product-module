import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const ProductDetail = ({ route }) => {
  const { product } = route.params;

  return (
    <View style={styles.container}>
      <Image source={{ uri: product.productImage }} style={styles.image} />
      <Text style={styles.name}>{product.productName}</Text>
      <Text style={styles.price}>₹{product.price}</Text>
      <Text>{product.productFor}</Text>
      <Text>Available Qty: {product.quantity}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  image: { width: '100%', height: 240, borderRadius: 12 },
  name: { fontSize: 22, fontWeight: 'bold', marginTop: 12 },
  price: { fontSize: 20, color: '#2196F3', marginVertical: 8 },
});

export default ProductDetail;
