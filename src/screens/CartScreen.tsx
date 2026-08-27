import { useAuth } from '../context/AuthContext';
import styles from '../styles/CartScreen.styles';
import React from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import {
  Bell,
  ShoppingCart,
  CircleChevronLeft,
} from 'lucide-react-native';
import {getProductImage} from '../utils/productImage';
import { useCart } from '../context/CartContext';

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

  // Calculate cart count safely
  const cartCount =
    cartItems?.reduce((total: number, item: any) => {
      const q = item.quantity ?? item.qty ?? item.count ?? 1;
      return total + Number(q);
    }, 0) || cartItems?.length || 0;

  // Header JSX block reusable for both empty and populated states
  const renderHeader = () => (
    <View style={styles.header}>
      {/* Back Button */}
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
        <CircleChevronLeft 
        size={24}
  color="#000000"
  strokeWidth={2}
  />

      </TouchableOpacity>

      {/* Logo and App Title */}
      <View style={styles.logoSection}>
        <Image
          source={require('../assets/images/logo.png')}
          style={styles.logo}
        />
        <View style={styles.brandTextContainer}>
          <Text style={styles.appName}>Mana Ganuga</Text>
          <Text style={styles.tagline}>Pure Tradition • Healthy Future</Text>
        </View>
      </View>

      {/* Right Icons: Bell & Cart with Badge */}
      <View style={styles.headerIcons}>
        <TouchableOpacity
          style={styles.iconButton}
          onPress={() => navigation.navigate('Notifications')}>
          <Bell
  size={24}
  color="#000000"
  strokeWidth={2}
/>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.cartIconWrapper}
          onPress={() => navigation.navigate('Cart')}>
          <ShoppingCart
  size={24}
  color="#0c0502"
  strokeWidth={2}
/>
          {Boolean(cartCount) && cartCount > 0 ? (
            <View style={styles.badgeContainer}>
              <Text style={styles.badgeText}>
                {cartCount > 99 ? '99+' : cartCount}
              </Text>
            </View>
          ) : null}
        </TouchableOpacity>
      </View>
    </View>
  );

  if (cartItems.length === 0) {
    return (
      <SafeAreaView style={styles.container}>
        {renderHeader()}
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyIcon}>🛒</Text>
          <Text style={styles.emptyTitle}>Your Cart Is Empty</Text>
          <Text style={styles.emptyText}>
            Add some healthy oils to continue shopping
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* FIXED TOP HEADER */}
      {renderHeader()}

      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={styles.pageTitle}>
          My Cart ({cartItems.length})
        </Text>

        {cartItems.map((item: any) => (
          <View key={item.id} style={styles.card}>
           <Image
  source={getProductImage(item.image)}
  style={styles.productImage}
/>
            <View style={styles.details}>
              <Text style={styles.name}>{item.name}</Text>

              <Text style={styles.rating}>⭐ {item.rating}</Text>

              <View style={{flexDirection: 'row', alignItems: 'center'}}>
  <Text style={styles.price}>₹{item.price}</Text>

  {item.size && (
    <Text
      style={{
        marginLeft: 8,
        fontSize: 14,
        color: '#666',
        fontWeight: '500',
      }}>
      • {item.size}
    </Text>
  )}
</View>

              <View style={styles.qtyRow}>
                <TouchableOpacity
                  style={styles.qtyButton}
                  onPress={() => decreaseQuantity(item.id)}>
                  <Text>-</Text>
                </TouchableOpacity>

                <Text style={styles.qty}>{item.quantity}</Text>

                <TouchableOpacity
                  style={styles.qtyButton}
                  onPress={() => increaseQuantity(item.id)}>
                  <Text>+</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.actionRow}>
                <TouchableOpacity onPress={() => removeFromCart(item.id)}>
                  <Text style={styles.remove}>Remove</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => saveForLater(item)}>
                  <Text style={styles.save}>Save Later</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        ))}

        <View style={{ height: 120 }} />
      </ScrollView>

      {/* STICKY BOTTOM CHECKOUT BAR */}
      <View style={styles.bottomBar}>
        <View>
          <Text style={styles.totalLabel}>Total</Text>
          <Text style={styles.totalPrice}>₹{getCartTotal()}</Text>
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
          }}>
          <Text style={styles.checkoutText}>Proceed To Checkout</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default CartScreen;

