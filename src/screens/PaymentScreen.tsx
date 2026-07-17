import { createOrder } from "../services/paymentServices";
import RazorpayCheckout from "react-native-razorpay";
import React, { useState } from 'react';
import { createOrder as createAppOrder } from "../services/orderService";
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import { useCart } from '../context/CartContext';
import Config from "react-native-config";

const BASE_URL = Config.API_BASE_URL;

export default function PaymentScreen({
  navigation,
  route,
}: any) {
  const { getCartTotal } = useCart();
  const buyNow = route?.params?.buyNow;
  const product = route?.params?.product;

  const productAmount = 1;
  const totalAmount = 1;

 console.log("buyNow =", buyNow);
 console.log("product =", product);
 console.log("product.price =", product?.price);
 console.log("productAmount =", productAmount);
 console.log("totalAmount =", totalAmount);

  const [selectedPayment, setSelectedPayment] =
    useState('UPI');

  const placeOrder = async () => {
    console.log("Pay Butoon Clicked");  
    
  if (selectedPayment === "COD") {
    navigation.navigate("OrderSuccess");
    return;
  }

  await handleCreatePaymentOrder();
};
  const handleCreatePaymentOrder = async () => {
  try {
    
    const response = await createOrder(
      "ORDER_" + Date.now(),
      totalAmount,
    );
    
    console.log("RESPONSE =", response);

if (!response?.data?.razorpayOrder) {
  Alert.alert("No Razorpay Order", JSON.stringify(response));
  return;
}

const razorpayOrder = response.data.razorpayOrder;
    const options = {
      description: "ManaGanuga Order Payment",
      image: "",
      currency: "INR",
      key: "rzp_live_TDluPzhj49kPM5",
      amount: razorpayOrder.amount,
      order_id: razorpayOrder.id,
      name: "ManaGanuga",
      prefill: {
        email: "test@test.com",
        contact: "9123456789",
        name: "Test User",
      },
      theme: {
        color: "#D4A017",
      },
    };
    
    RazorpayCheckout.open(options)
   .then(async (data: any) => {
    try{
  const verifyResponse = await fetch(
    `${BASE_URL}/payments/verify`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          razorpay_order_id: data.razorpay_order_id,
          razorpay_payment_id: data.razorpay_payment_id,
          razorpay_signature: data.razorpay_signature,
          buyNow,
          productId: product?.id,
          quantity: 1,
        }),
      },
    );

    const text = await verifyResponse.text();


if (!verifyResponse.ok) {
  Alert.alert("Verify Error", text);
  return;
}

const verifyData = JSON.parse(text);

if (verifyData.success) {
  Alert.alert("Success", "Payment Verified");
  navigation.navigate("OrderSuccess");
} else {
  Alert.alert("Failed", verifyData.message || "Verification Failed");
}

 } catch (err: any) {
  console.log("VERIFY ERROR:", err);
  console.log("VERIFY ERROR MESSAGE:", err?.message);
  console.log("VERIFY ERROR STACK:", err?.stack);

  Alert.alert(
    "Verify Error",
    err?.message || JSON.stringify(err)
  );
}
})
    .catch((error: any) => {
     
  console.log("PAYMENT FAILED:", error);
  Alert.alert("Payment Failed", error.description || "Payment cancelled");
});

   
  } catch (error: any) {
  console.log("ERROR:", error);
  Alert.alert("Error", JSON.stringify(error));
  }
};

  return (
    <SafeAreaView style={styles.container}>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 120 }}
      >

        <View style={styles.header}>
          <Text style={styles.stepText}>
            Step 3 of 3
          </Text>

          <Text style={styles.title}>
            Payments
          </Text>
        </View>

        <View style={styles.amountCard}>
          <Text style={styles.amountLabel}>
            Total Amount
          </Text>

          <Text style={styles.amount}>
            ₹{totalAmount}
          </Text>
        </View>

        <View style={styles.offerCard}>
          <Text style={styles.offerTitle}>
            5% Cashback
          </Text>

          <Text style={styles.offerText}>
            Claim with payment offers
          </Text>
        </View>

        <Text style={styles.section}>
          Recommended For You
        </Text>

        <TouchableOpacity
          style={styles.paymentCard}
          onPress={() => setSelectedPayment('UPI')}
        >
          <Text style={styles.paymentTitle}>
            UPI
          </Text>

          <Text style={styles.paymentSub}>
            Pay using any UPI app
          </Text>

          <Text style={styles.radio}>
            {selectedPayment === 'UPI'
              ? '🔘'
              : '⚪'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.paymentCard}
          onPress={() => setSelectedPayment('CARD')}
        >
          <Text style={styles.paymentTitle}>
            Credit / Debit Card
          </Text>

          <Text style={styles.paymentSub}>
            Visa, MasterCard, RuPay
          </Text>

          <Text style={styles.radio}>
            {selectedPayment === 'CARD'
              ? '🔘'
              : '⚪'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.paymentCard}
          onPress={() => setSelectedPayment('COD')}
        >
          <Text style={styles.paymentTitle}>
            Cash On Delivery
          </Text>

          <Text style={styles.paymentSub}>
            Pay when order arrives
          </Text>

          <Text style={styles.radio}>
            {selectedPayment === 'COD'
              ? '🔘'
              : '⚪'}
          </Text>
        </TouchableOpacity>

      </ScrollView>

      <View style={styles.bottomBar}>
        <Text style={styles.bottomAmount}>
          ₹{totalAmount}
        </Text>

        <TouchableOpacity
          style={styles.payButton}
          onPress={placeOrder}
        >
          <Text style={styles.payText}>
            Pay ₹{totalAmount}
          </Text>
        </TouchableOpacity>
      </View>

    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F4EC',
  },

  header: {
    padding: 20,
  },

  stepText: {
    color: '#666',
  },

  title: {
    fontSize: 30,
    fontWeight: '700',
  },

  amountCard: {
    backgroundColor: '#EEF1FF',
    margin: 20,
    padding: 20,
    borderRadius: 14,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  amountLabel: {
    fontSize: 18,
  },

  amount: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1E40AF',
  },

  offerCard: {
    backgroundColor: '#E7F8EA',
    marginHorizontal: 20,
    padding: 18,
    borderRadius: 14,
    marginBottom: 20,
  },

  offerTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: 'green',
  },

  offerText: {
    marginTop: 5,
    color: '#444',
  },

  section: {
    fontSize: 22,
    fontWeight: '700',
    marginHorizontal: 20,
    marginBottom: 15,
  },

  paymentCard: {
    backgroundColor: '#FFF',
    marginHorizontal: 20,
    marginBottom: 15,
    borderRadius: 16,
    padding: 20,
    elevation: 2,
  },

  paymentTitle: {
    fontSize: 18,
    fontWeight: '700',
  },

  paymentSub: {
    color: '#666',
    marginTop: 5,
  },

  radio: {
    position: 'absolute',
    right: 20,
    top: 25,
    fontSize: 22,
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
    elevation: 10,
  },

  bottomAmount: {
    fontSize: 28,
    fontWeight: '700',
  },

  payButton: {
    backgroundColor: '#F59E0B',
    paddingHorizontal: 35,
    paddingVertical: 15,
    borderRadius: 10,
  },

  payText: {
    fontSize: 18,
    fontWeight: '700',
  },
});