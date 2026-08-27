import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

import {useCart} from '../context/CartContext';
import {getProductImage} from '../utils/productImage';
import {getProductVariants} from '../services/productVariantService';
const ProductCard = ({product, navigation}: any) => {
  const {addToCart} = useCart();
  const [defaultVariant, setDefaultVariant] = useState<any>(null);

useEffect(() => {
  const loadDefaultVariant = async () => {
    try {
      const variants = await getProductVariants(Number(product.id));

      const oneLVariant = variants.find(
        (variant: any) =>
          String(variant.size).toLowerCase() === '1l',
      );

      setDefaultVariant(oneLVariant || null);
    } catch (error) {
      console.error('Failed to load default variant:', error);
    }
  };

  loadDefaultVariant();
}, [product.id]);

  return (
    <View style={styles.card}>
      <TouchableOpacity
        onPress={() =>
          navigation.navigate('ProductDetails', {product})
        }
        activeOpacity={0.8}>
        <Image
          source={getProductImage(product.image)}
          style={styles.image}
        />
      </TouchableOpacity>

      <Text style={styles.name}>
        {product.name}
      </Text>

     <View style={styles.priceRow}>
  <Text style={styles.price}>
    ₹{defaultVariant ? defaultVariant.price : product.price}
  </Text>

  <View style={styles.sizeBadge}>
    <Text style={styles.sizeText}>
      {defaultVariant?.size || '1L'}
    </Text>
  </View>
</View>

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
  priceRow: {
  flexDirection: 'row',
  alignItems: 'center',
  marginTop: 8,
},

size: {
  fontSize: 18,
  color: '#666',
  marginLeft: 8,
  fontWeight: '500',
},
sizeBadge: {
  marginLeft: 8,
  paddingHorizontal: 8,
  paddingVertical: 4,
  borderRadius: 8,
  backgroundColor: '#F3EFE8',
},

sizeText: {
  fontSize: 14,
  fontWeight: '600',
  color: '#555',
},
});