import { useCart } from '../context/CartContext';
import React, { useEffect, useState } from 'react';
import { useAuth } from "../context/AuthContext";
import { getCheckoutSummary } from "../services/paymentService";
import { useFocusEffect } from '@react-navigation/native';
import { getAddresses } from '../services/addressService';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';
import {
  Bell,
  ShoppingCart,
  CircleChevronLeft,
} from 'lucide-react-native';

export default function CheckoutScreen({
  navigation,
  route,
}: any) {
  const { cartItems, getCartTotal } = useCart();
  const { user } = useAuth();
  const buyNow = route?.params?.buyNow;
  const product = route?.params?.product;
  const [selectedAddress, setSelectedAddress] =
  useState<any>(route?.params?.selectedAddress || null);
  const [benefits, setBenefits] =
  useState<any>(null);

  // Calculate cart count safely for header
  const cartCount =
    cartItems?.reduce((total: number, item: any) => {
      const q = item.quantity ?? item.qty ?? item.count ?? 1;
      return total + Number(q);
    }, 0) || cartItems?.length || 0;

  // Calculate total items for current checkout order
  const checkoutItems = buyNow ? [product] : cartItems;
  const totalItemsCount = checkoutItems.reduce((sum: number, item: any) => {
    const q = item.quantity ?? item.qty ?? item.count ?? 1;
    return sum + Number(q);
  }, 0);

const loadAddress = async () => {
  if (!user?.id) {
    setSelectedAddress(null);
    return;
  }

  try {
    const response = await getAddresses(Number(user.id));

    console.log('CHECKOUT ADDRESSES:', response);

    if (response?.success) {
      const addresses = response.data || [];

      const defaultAddress = addresses.find(
        (item: any) => item.is_default === true
      );

      console.log('CHECKOUT DEFAULT ADDRESS:', defaultAddress);

      setSelectedAddress(defaultAddress || null);
    } else {
      setSelectedAddress(null);
    }
  } catch (error) {
    console.log('CHECKOUT ADDRESS ERROR:', error);
    setSelectedAddress(null);
  }
};
useFocusEffect(
  React.useCallback(() => {
    loadAddress();

    if (user?.id) {
      loadMembershipBenefits();
    }
  }, [user?.id])
);
  const loadMembershipBenefits = async () => {

  try {

    console.log("USER:", user);
    console.log("USER ID:", user?.id);

    const response =
      await getCheckoutSummary(user.id);

    console.log("CHECKOUT RESPONSE:", response);

    setBenefits(
      response.membershipBenefits
    );

  } catch (e) {

    console.log("CHECKOUT ERROR:", e);

  }

};
  return (
    <SafeAreaView style={styles.container}>
      {/* FIXED BRAND HEADER WITH BACK BUTTON, LOGO, BELL & CART BADGE */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
          <CircleChevronLeft 
            size={24}
            color="#000000"
            strokeWidth={2}
              />
        </TouchableOpacity>

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

        <View style={styles.headerIcons}>
          <TouchableOpacity
            onPress={() => navigation.navigate('Notifications')}>
            <Bell
              size={24}
              color="#000000"
              strokeWidth={2}
            />
          </TouchableOpacity>


          <TouchableOpacity
            style={{ marginLeft: 14 }}
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

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100, paddingHorizontal: 20, paddingTop: 10 }}
      >
        <Text style={styles.title}>Checkout</Text>

        <View style={styles.stepContainer}>
          <View style={styles.activeStep}>
            <Text style={styles.stepNumber}>1</Text>
          </View>
          <View style={styles.line} />
          <View style={styles.activeStep}>
            <Text style={styles.stepNumber}>2</Text>
          </View>

          <View style={styles.line} />

          <View style={styles.inactiveStep}>
            <Text style={styles.stepNumber}>3</Text>
          </View>
        </View>

        <View style={styles.stepLabels}>
          <Text>Address</Text>
          <Text>Order</Text>
          <Text>Payment</Text>
        </View>

        {/* Address Card */}
        <View style={styles.card}>
          <Text style={styles.heading}>Delivery Address</Text>
          
         {!selectedAddress ? (
  <Text style={{ color: 'red', marginVertical: 5 }}>
    No default address selected
  </Text>
) : (
  <>
    <Text style={styles.name}>
      {selectedAddress?.full_name}
    </Text>

    <Text style={styles.address}>
      {selectedAddress?.address_line1}
      {selectedAddress?.address_line2
        ? `, ${selectedAddress.address_line2}`
        : ''}
    </Text>

    <Text style={styles.address}>
      {selectedAddress?.city}, {selectedAddress?.state}
      {selectedAddress?.postal_code
        ? ` - ${selectedAddress.postal_code}`
        : ''}
    </Text>

    <Text style={styles.mobile}>
      {selectedAddress?.phone}
    </Text>
  </>
)}

          <TouchableOpacity
            onPress={() =>
              navigation.navigate('AddressList', {
                fromCheckout: true,
              })
            }>
            <Text style={styles.change}>
              {selectedAddress ? 'Change Address' : 'Select / Add Address'}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Order Summary */}
        {checkoutItems.map((item, index) => (
          <View key={index} style={styles.productCard}>
            <View style={styles.productRow}>
              <Image source={item.image} style={styles.productImage} />

              <View style={styles.productDetails}>
                <Text style={styles.productName}>{item.name}</Text>

                <Text style={styles.productQty}>
                  Qty: {item.quantity || 1}
                </Text>

                <Text style={styles.productPrice}>₹{item.price}</Text>

                <Text style={styles.deliveryText}>Delivery in 2 days</Text>
              </View>
            </View>
          </View>
        ))}

        {/* Price Details */}
       {/* Price Details */}
<View style={styles.priceCard}>
  <Text style={styles.priceHeading}>Price Details</Text>

  <View style={styles.priceRow}>
    <Text>Total Items</Text>
    <Text>
      {totalItemsCount}{" "}
      {totalItemsCount === 1 ? "Item" : "Items"}
    </Text>
  </View>

  <View style={styles.priceRow}>
    <Text>Items Cost</Text>
    <Text>
      ₹{buyNow ? product.price : getCartTotal()}
    </Text>
  </View>

  {benefits ? (

    <>

      <View style={styles.priceRow}>
        <Text>Membership Discount</Text>

        <Text style={styles.discountText}>
          -₹{benefits.membershipDiscount.toFixed(2)}
        </Text>
      </View>

      <View style={styles.priceRow}>
        <Text>Wallet Claim</Text>

        <Text style={styles.discountText}>
          -₹{benefits.walletClaim.toFixed(2)}
        </Text>
      </View>

      <View style={styles.priceRow}>
        <Text>Delivery</Text>

        <Text>
          {benefits.deliveryCharge === 0
            ? "FREE"
            : `₹${benefits.deliveryCharge}`}
        </Text>
      </View>

      <View style={styles.divider} />

      <View style={styles.priceRow}>
        <Text style={styles.finalTotal}>
          Payable Amount
        </Text>

        <Text style={styles.finalTotal}>
          ₹{benefits.payableAmount.toFixed(2)}
        </Text>
      </View>

      <View style={styles.saveBox}>
        <Text style={styles.saveText}>
          🎉 You saved ₹
          {(
            benefits.membershipDiscount +
            benefits.walletClaim
          ).toFixed(2)}
          {" "}on this order!
        </Text>
      </View>

    </>

  ) : (

    <>

      <View style={styles.priceRow}>
        <Text>Delivery Charges</Text>
        <Text>₹40</Text>
      </View>

      <View style={styles.priceRow}>
        <Text style={styles.discountText}>
          Discount
        </Text>

        <Text style={styles.discountText}>
          ₹0
        </Text>
      </View>

      <View style={styles.divider} />

      <View style={styles.priceRow}>
        <Text style={styles.finalTotal}>
          Total Amount
        </Text>

        <Text style={styles.finalTotal}>
          ₹{(buyNow ? product.price : getCartTotal()) + 40}
        </Text>
      </View>

      <View style={styles.saveBox}>
        <Text style={styles.saveText}>
          🎉 You'll save on this order!
        </Text>
      </View>

    </>

  )}

</View>
      </ScrollView>

      {/* Place Order Button */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => {

  if (!selectedAddress) {

    navigation.navigate("AddressList", {
      fromCheckout: true,
    });

    return;
  }

  navigation.navigate("Payment", {
  type: "order",
  buyNow,
  product,
  selectedAddress,
});

}}>
        <Text style={styles.buttonText}>Continue</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F4EC',
  },

  /* Fixed Top Header Styles */
  header: {
    backgroundColor: '#F8F4EC',
    paddingHorizontal: 16,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    zIndex: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },

  backButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },

  backIcon: {
    fontSize: 24,
    fontWeight: '600',
    color: '#2D341F',
    marginTop: -2,
  },

  logoSection: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 10,
  },

  logo: {
    width: 34,
    height: 34,
    resizeMode: 'contain',
    marginRight: 8,
  },

  brandTextContainer: {
    justifyContent: 'center',
  },

  appName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#2D341F',
  },

  tagline: {
    fontSize: 9,
    color: '#8C8C8C',
    fontWeight: '500',
    marginTop: 1,
  },

  headerIcons: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  iconButton: {
    marginLeft: 10,
    padding: 4,
  },

  cartIconWrapper: {
    marginLeft: 10,
    padding: 4,
    position: 'relative',
  },

  headerIconText: {
    fontSize: 18,
  },

  badgeContainer: {
    position: 'absolute',
    top: -2,
    right: -4,
    backgroundColor: '#A84B21',
    borderRadius: 9,
    minWidth: 18,
    height: 18,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 3,
  },

  badgeText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '700',
  },

  title: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 15,
    marginTop: 5,
    color: '#2D341F',
  },

  card: {
    backgroundColor: '#FFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 15,
    elevation: 2,
  },

  heading: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 10,
    color: '#A84B21',
  },

  name: {
    fontSize: 16,
    fontWeight: '700',
  },

  address: {
    marginTop: 4,
    color: '#666',
  },

  mobile: {
    marginTop: 6,
    fontWeight: '600',
  },

  change: {
    color: '#A84B21',
    fontWeight: '700',
    marginTop: 10,
  },

  divider: {
    borderBottomWidth: 1,
    borderBottomColor: '#DDD',
    marginVertical: 10,
  },

  button: {
    backgroundColor: '#A84B21',
    padding: 16,
    borderRadius: 14,
    alignItems: 'center',
    marginHorizontal: 20,
    marginBottom: 20,
  },

  buttonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: '700',
  },

  stepContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },

  activeStep: {
    width: 35,
    height: 35,
    borderRadius: 20,
    backgroundColor: '#2874F0',
    justifyContent: 'center',
    alignItems: 'center',
  },

  inactiveStep: {
    width: 35,
    height: 35,
    borderRadius: 20,
    backgroundColor: '#DDD',
    justifyContent: 'center',
    alignItems: 'center',
  },

  line: {
    width: 60,
    height: 2,
    backgroundColor: '#DDD',
  },

  stepNumber: {
    color: '#FFF',
    fontWeight: '700',
  },

  stepLabels: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },

  productCard: {
    backgroundColor: '#FFF',
    borderRadius: 15,
    padding: 15,
    marginBottom: 15,
  },

  productRow: {
    flexDirection: 'row',
  },

  productImage: {
    width: 90,
    height: 90,
    borderRadius: 10,
    resizeMode: 'contain',
  },

  productDetails: {
    flex: 1,
    marginLeft: 15,
  },

  productName: {
    fontSize: 16,
    fontWeight: '700',
  },

  productQty: {
    marginTop: 8,
    color: '#666',
  },

  productPrice: {
    marginTop: 6,
    color: '#A84B21',
    fontWeight: '700',
    fontSize: 18,
  },

  deliveryText: {
    marginTop: 6,
    color: 'green',
  },

  priceCard: {
    backgroundColor: '#FFF',
    borderRadius: 18,
    padding: 18,
    marginBottom: 20,
  },

  priceHeading: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 15,
  },

  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 8,
  },

  discountText: {
    color: 'green',
    fontWeight: '600',
  },

  finalTotal: {
    fontSize: 20,
    fontWeight: '700',
  },

  saveBox: {
    backgroundColor: '#E7F8EC',
    padding: 12,
    borderRadius: 12,
    marginTop: 15,
  },

  saveText: {
    color: 'green',
    fontWeight: '700',
    textAlign: 'center',
  },
});