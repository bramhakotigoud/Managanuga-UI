import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

import {useCart} from '../context/CartContext';

const ProductCard = ({product, navigation}: any) => {
  const {addToCart} = useCart();

  return (
    <View style={styles.card}>
      <Image
        source={product.image}
        style={styles.image}
      />

      <Text style={styles.name}>
        {product.name}
      </Text>

      <Text style={styles.rating}>
        ⭐ {product.rating}
      </Text>

      <Text style={styles.price}>
        ₹{product.price}
      </Text>

      <TouchableOpacity
        style={styles.detailsButton}
        onPress={() =>
          navigation.navigate(
            'ProductDetails',
            {product},
          )
        }>
        <Text style={styles.detailsText}>
          View Details
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.cartButton}
        onPress={() => addToCart(product)}>
        <Text style={styles.cartText}>
          Add To Cart
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default ProductCard;

const styles = StyleSheet.create({
  card: {
    width: 170,
    backgroundColor: '#FFF',
    borderRadius: 20,
    padding: 15,
    marginRight: 15,
  },

  image: {
    width: 100,
    height: 100,
    alignSelf: 'center',
    resizeMode: 'contain',
  },

  name: {
    fontWeight: '700',
    marginTop: 10,
  },

  rating: {
    color: '#777',
    marginTop: 5,
  },

  price: {
    fontSize: 20,
    fontWeight: '700',
    color: '#A84B21',
    marginTop: 8,
  },

  detailsButton: {
    backgroundColor: '#EEE',
    padding: 10,
    borderRadius: 10,
    marginTop: 12,
  },

  detailsText: {
    textAlign: 'center',
  },

  cartButton: {
    backgroundColor: '#A84B21',
    padding: 12,
    borderRadius: 10,
    marginTop: 10,
  },

  cartText: {
    color: '#FFF',
    textAlign: 'center',
    fontWeight: '700',
  },
});