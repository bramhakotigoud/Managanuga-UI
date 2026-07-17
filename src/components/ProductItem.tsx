import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
} from 'react-native';

const ProductItem = ({image, title}: any) => {
  return (
    <View style={styles.container}>
      <View style={styles.imageCard}>
        <Image source={image} style={styles.image} />
      </View>

      <Text style={styles.title}>
        {title}
      </Text>
    </View>
  );
};

export default ProductItem;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginHorizontal: 12,
    width: 110,
  },

  imageCard: {
    width: 75,
    height: 75,
    borderRadius: 50,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.12,
    shadowRadius: 6,
    elevation: 5,

    borderWidth: 2,
    borderColor: '#D9C49A',
  },

  image: {
    width: 60,
    height: 60,
    resizeMode: 'contain',
  },

  title: {
    marginTop: 10,
    fontSize: 14,
    color: '#2D341F',
    fontWeight: '700',
    textAlign: 'center',
  },
});