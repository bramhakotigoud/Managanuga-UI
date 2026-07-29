import { useAuth } from '../context/AuthContext';
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';

import {useCart} from '../context/CartContext';

const CartScreen = ({ navigation }: any) => {
  const { isLoggedIn } = useAuth();
  const {
    cartItems,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    saveForLater,
    getCartTotal,
  } = useCart();

  if (cartItems.length === 0) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyIcon}>🛒</Text>
          <Text style={styles.emptyTitle}>
            Your Cart Is Empty
          </Text>

          <Text style={styles.emptyText}>
            Add some healthy oils to continue shopping
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>

        <Text style={styles.header}>
          My Cart ({cartItems.length})
        </Text>

        {cartItems.map((item: any) => (
          <View key={item.id} style={styles.card}>

            <Image
              source={item.image}
              style={styles.image}
            />

            <View style={styles.details}>

              <Text style={styles.name}>
                {item.name}
              </Text>

              <Text style={styles.rating}>
                ⭐ {item.rating}
              </Text>

              <Text style={styles.price}>
                ₹{item.price}
              </Text>

              <View style={styles.qtyRow}>

                <TouchableOpacity
                  style={styles.qtyButton}
                  onPress={() =>
                    decreaseQuantity(item.id)
                  }>
                  <Text>-</Text>
                </TouchableOpacity>

                <Text style={styles.qty}>
                  {item.quantity}
                </Text>

                <TouchableOpacity
                  style={styles.qtyButton}
                  onPress={() =>
                    increaseQuantity(item.id)
                  }>
                  <Text>+</Text>
                </TouchableOpacity>

              </View>

              <View style={styles.actionRow}>

                <TouchableOpacity
                  onPress={() =>
                    removeFromCart(item.id)
                  }>
                  <Text style={styles.remove}>
                    Remove
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() =>
                    saveForLater(item)
                  }>
                  <Text style={styles.save}>
                    Save Later
                  </Text>
                </TouchableOpacity>

              </View>

            </View>

          </View>
        ))}

        <View style={{height: 120}} />

      </ScrollView>

      <View style={styles.bottomBar}>
        <View>
          <Text style={styles.totalLabel}>
            Total
          </Text>

          <Text style={styles.totalPrice}>
            ₹{getCartTotal()}
          </Text>
        </View>

        <TouchableOpacity
          style={styles.checkoutButton}
          onPress={() => {          
            if (isLoggedIn) {
              navigation.navigate('Checkout');
              } else {
                Alert.alert(
                 'Login Required',
                 'Please login to continue checkout.',
                 [
                  {
                    text: 'OK',
                    onPress: () =>
                      navigation.navigate('Login', {
                        fromCart: true,
                      }),
                    },
                  ]
                );
              }
            }}                
          >
          <Text style={styles.checkoutText}>
            Proceed To Checkout
          </Text>
        </TouchableOpacity>
      </View>

    </SafeAreaView>
  );
};

export default CartScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F4EC',
  },

  header: {
    fontSize: 26,
    fontWeight: '700',
    margin: 20,
    color: '#2D341F',
  },

  card: {
    backgroundColor: '#fff',
    marginHorizontal: 15,
    marginBottom: 15,
    borderRadius: 20,
    padding: 15,
    flexDirection: 'row',
  },

  image: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
  },

  details: {
    flex: 1,
    marginLeft: 15,
  },

  name: {
    fontSize: 18,
    fontWeight: '700',
  },

  rating: {
    color: '#777',
    marginTop: 5,
  },

  price: {
    fontSize: 22,
    color: '#A84B21',
    fontWeight: '700',
    marginTop: 5,
  },

  qtyRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },

  qtyButton: {
    width: 30,
    height: 30,
    backgroundColor: '#EEE',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },

  qty: {
    marginHorizontal: 15,
    fontWeight: '700',
  },

  actionRow: {
    flexDirection: 'row',
    marginTop: 15,
  },

  remove: {
    color: '#D32F2F',
    marginRight: 20,
  },

  save: {
    color: '#2E7D32',
  },

  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#FFF',
    padding: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  totalLabel: {
    color: '#777',
  },

  totalPrice: {
    fontSize: 24,
    fontWeight: '700',
  },

  checkoutButton: {
    backgroundColor: '#A84B21',
    paddingHorizontal: 25,
    paddingVertical: 14,
    borderRadius: 12,
  },
  checkoutText: {
    color: '#FFF',
    fontWeight: '700',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  emptyIcon: {
    fontSize: 60,
  },

  emptyTitle: {
    fontSize: 24,
    fontWeight: '700',
    marginTop: 15,
  },

  emptyText: {
    color: '#777',
    marginTop: 10,
  },
});