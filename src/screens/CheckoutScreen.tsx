import { useCart } from '../context/CartContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Image,
} from 'react-native';

export default function CheckoutScreen({
  navigation,
  route,
}: any) {
  const [paymentMethod, setPaymentMethod] = useState('COD');
  const { cartItems, getCartTotal } = useCart();
  const buyNow = route?.params?.buyNow;
  const product = route?.params?.product;
  console.log(cartItems);
  const [selectedAddress, setSelectedAddress] = useState<any>(null);
  useEffect(() => {
  const unsubscribe = navigation.addListener('focus', () => {
    loadAddress();
  });

  return unsubscribe;
}, [navigation]);

const loadAddress = async () => {
  const data = await AsyncStorage.getItem('addresses');

  if (data) {
    const addresses = JSON.parse(data);

    const defaultAddress = addresses.find(
      (item: any) => item.isDefault
    );

    setSelectedAddress(defaultAddress);
  }
};

  return (
    <SafeAreaView style={styles.container}>
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingBottom: 100 }}
    >

        <Text style={styles.title}>
          Checkout
        </Text>
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

          <Text style={styles.heading}>
            Delivery Address
          </Text>
          {!selectedAddress && (
            <Text style={{ color: 'red' }}>
                No default address selected
            </Text>
          )}
          <Text style={styles.name}>
           {selectedAddress?.name}
          </Text>
          <Text style={styles.address}>
           {selectedAddress?.houseNo}, {selectedAddress?.street}
          </Text>
          <Text style={styles.address}>
           {selectedAddress?.city}, {selectedAddress?.state} - {selectedAddress?.pincode}
          </Text>
          <Text style={styles.mobile}>
           {selectedAddress?.mobile}
          </Text>
          <TouchableOpacity
          onPress={() =>navigation.navigate('AddressList', {
            fromCheckout: true,
          })
        }>
            <Text style={styles.change}>
              Change Address
            </Text>
          </TouchableOpacity>
        </View>

        {/* Order Summary */}
        {(buyNow ? [product] : cartItems).map((item, index) => (
  <View
    key={index}
    style={styles.productCard}
  >
    <View style={styles.productRow}>

      <Image
        source={item.image}
        style={styles.productImage}
      />

      <View style={styles.productDetails}>

        <Text style={styles.productName}>
          {item.name}
        </Text>

        <Text style={styles.productQty}>
          Qty: {item.quantity}
        </Text>

        <Text style={styles.productPrice}>
          ₹{item.price}
        </Text>

        <Text style={styles.deliveryText}>
          Delivery in 2 days
        </Text>

      </View>

    </View>
  </View>
))}
       
        <View style={styles.priceCard}>

  <Text style={styles.priceHeading}>
    Price Details
  </Text>

  <View style={styles.priceRow}>
    <Text>Items Total</Text>
    <Text>₹{buyNow ? product.price : getCartTotal()}</Text>
  </View>

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

</View>
 </ScrollView>
        {/* Place Order */}
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            navigation.navigate('Payment',{
              type: 'order',
              buyNow,
              product,
            });
          }}
        >
          <Text style={styles.buttonText}>
            Continue
          </Text>
        </TouchableOpacity>

      
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F4EC',
    padding: 20,
  },

  title: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 20,
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
    marginBottom: 15,
    color: '#A84B21',
  },

  name: {
    fontSize: 18,
    fontWeight: '700',
  },

  address: {
    marginTop: 5,
    color: '#666',
  },

  mobile: {
    marginTop: 8,
    fontWeight: '600',
  },

  change: {
    color: '#A84B21',
    fontWeight: '700',
    marginTop: 10,
  },

  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 8,
  },

  divider: {
    borderBottomWidth: 1,
    borderBottomColor: '#DDD',
    marginVertical: 10,
  },

  totalLabel: {
    fontSize: 18,
    fontWeight: '700',
  },

  total: {
    fontSize: 20,
    fontWeight: '700',
    color: '#A84B21',
  },

  option: {
    fontSize: 16,
    paddingVertical: 10,
  },

  button: {
    backgroundColor: '#A84B21',
    padding: 18,
    borderRadius: 14,
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 30,
  },

  buttonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: '700',
  },
  summaryRow: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  marginVertical: 8,
},

totalRow: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  marginTop: 15,
  paddingTop: 15,
  borderTopWidth: 1,
  borderColor: '#ddd',
},

totalText: {
  fontSize: 20,
  fontWeight: '700',
},

totalPrice: {
  fontSize: 22,
  fontWeight: '700',
  color: '#A84B21',
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
  marginTop: 10,
  color: '#666',
},

productPrice: {
  marginTop: 10,
  color: '#A84B21',
  fontWeight: '700',
  fontSize: 20,
},

deliveryText: {
  marginTop: 10,
  color: 'green',
},
priceCard: {
  backgroundColor: '#FFF',
  borderRadius: 18,
  padding: 18,
  marginBottom: 20,
},

priceHeading: {
  fontSize: 22,
  fontWeight: '700',
  marginBottom: 20,
},

priceRow: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  marginVertical: 10,
},

discountText: {
  color: 'green',
  fontWeight: '600',
},

finalTotal: {
  fontSize: 22,
  fontWeight: '700',
},

saveBox: {
  backgroundColor: '#E7F8EC',
  padding: 15,
  borderRadius: 12,
  marginTop: 20,
},

saveText: {
  color: 'green',
  fontWeight: '700',
  textAlign: 'center',
},
});