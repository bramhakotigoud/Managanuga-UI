import { createOrder } from "../services/paymentServices";
import RazorpayCheckout from "react-native-razorpay";
import React, { useEffect, useState } from 'react';
import { useAuth } from "../context/AuthContext";
import { getCheckoutSummary } from "../services/paymentServices";
import { createOrder as createAppOrder } from "../services/orderService";
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Image,
  Modal,
} from 'react-native';
import { useCart } from '../context/CartContext';
import Config from "react-native-config";

const BASE_URL = Config.API_BASE_URL;

export default function PaymentScreen({
  navigation,
  route,
}: any) {
  const { getCartTotal } = useCart();
  const { user } = useAuth();
  const buyNow = route?.params?.buyNow;
const product = route?.params?.product;

// NEW
const paymentType = route?.params?.type || "order";
const membershipPlan = route?.params?.plan;

const isMembership = paymentType === "membership";

const productAmount = buyNow
  ? Number(product?.price || 0)
  : getCartTotal();

const totalAmount = isMembership
  ? 1
  : productAmount;

 console.log("buyNow =", buyNow);
 console.log("product =", product);
 console.log("product.price =", product?.price);
 console.log("productAmount =", productAmount);
 console.log("totalAmount =", totalAmount);

  const [selectedPayment, setSelectedPayment] =
    useState('UPI');
    const [benefits, setBenefits] =
  useState<any>(null);
  const [showSubscriptionTerms, setShowSubscriptionTerms] =
  useState(isMembership);

const [understoodTerms, setUnderstoodTerms] =
  useState(false);
const handleAcceptTerms = () => {
  setUnderstoodTerms(true);
  setShowSubscriptionTerms(false);
};

const [payableAmount, setPayableAmount] =
  useState(totalAmount);
  const loadMembershipBenefits = async () => {

  if (isMembership) return;

  try {

    const response =
      await getCheckoutSummary(user.id);

    setBenefits(
      response.membershipBenefits
    );

    if (isMembership) {
  setPayableAmount(1);
} else {
  setPayableAmount(
    response.membershipBenefits.payableAmount
  );
}

  } catch (e) {

    console.log("Checkout Summary Error:", e);

  }

};
useEffect(() => {

  if (user?.id) {
    loadMembershipBenefits();
  }

}, [user]);

  const placeOrder = async () => {
  console.log("Pay Button Clicked");

  // Membership Flow
  if (isMembership) {
    await handleMembershipPayment();
    return;
  }

  // Order Flow
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
      payableAmount,
      isMembership ? "membership" : "order",
      user.id,
      membershipPlan?.id || null,
    );
   
    
    console.log("RESPONSE =", response);

if (!response?.data?.razorpayOrder) {
  Alert.alert("No Razorpay Order", JSON.stringify(response));
  return;
}

const razorpayOrder = response.data.razorpayOrder;
    const options = {
      description: isMembership
      ? "ManaGanuga Membership"
      : "ManaGanuga Order Payment",
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
          paymentType: isMembership ? "MEMBERSHIP" : "ORDER",
          membershipPlanId: membershipPlan?.id,
          userId: user.id,
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

  if (isMembership) {

    navigation.replace("Subscription");

  } else {

    navigation.navigate("OrderSuccess");

  }

} else {

  Alert.alert(
    "Failed",
    verifyData.message || "Verification Failed"
  );

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
const handleMembershipPayment = async () => {
  await handleCreatePaymentOrder();
};

  return (
    <SafeAreaView style={styles.container}>

      <View style={styles.header}>
                    <TouchableOpacity
                      style={styles.backButton}
                      onPress={() => navigation.goBack()}
                      hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
                      <Text style={styles.backIcon}>‹</Text>
                    </TouchableOpacity>
            
                    <View style={styles.brandContainer}>
                      <Image
                        source={require('../assets/images/logo.png')}
                        style={styles.logo}
                      />
                      <View style={styles.brandTextContainer}>
                        <Text style={styles.brandTitle}>Mana Ganuga</Text>
                        <Text style={styles.brandSubtitle}>Pure Tradition • Healthy Future</Text>
                      </View>
                    </View>
            
                    <View style={styles.headerRightPlaceholder} />
                  </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 120 }}
      >

        <View style={styles.header}>
          <Text style={styles.stepText}>
            {isMembership ? "Step 2 of 2" : "Step 3 of 3"}
          </Text>

          <Text style={styles.title}>
             {isMembership ? "Membership Payment" : "Payments"}
          </Text>
        </View>

        {isMembership && (
          <View style={styles.offerCard}>
            <Text style={styles.offerTitle}>
               👑 {membershipPlan?.name}
            </Text>

            <Text style={styles.offerText}>
              Price : ₹{membershipPlan?.price}
            </Text>

            <Text style={styles.offerText}>
              Discount : {membershipPlan?.discount}%
            </Text>

            <Text style={styles.offerText}>
              Wallet Bonus : ₹{membershipPlan?.walletAmount}
            </Text>

            <Text style={styles.offerText}>
              Monthly Claim : ₹{membershipPlan?.monthlyClaim}
            </Text>

            <Text style={styles.offerText}>
              Validity : 1 Year
            </Text>
          </View>
        )}
        {!isMembership && benefits && (

<View style={styles.offerCard}>

<Text style={styles.offerTitle}>
👑 Membership  Applied
</Text>

<View style={styles.priceRow}>
  <Text>Current Plan</Text>
  <Text style={{fontWeight:"700"}}>

  {benefits.membership.plan_name ||
   (benefits.membership.plan_id === 1
      ? "Basic"
      : benefits.membership.plan_id === 2
      ? "Silver"
      : benefits.membership.plan_id === 3
      ? "Gold"
      : benefits.membership.plan_id === 4
      ? "Platinum"
      : "Membership")}

</Text>
</View>

<View style={styles.priceRow}>
  <Text>Usage</Text>
  <Text style={{fontWeight:"700"}}>
    {benefits.usedLitres} / {benefits.membership.monthly_limit_litres} Litres
  </Text>
</View>

<View style={styles.priceRow}>
  <Text>Remaining</Text>
  <Text style={{fontWeight:"700", color:"#2E7D32"}}>
    {benefits.remainingLitres} Litres
  </Text>
</View>

</View>

)}
{!isMembership && benefits && (

<View style={styles.offerCard}>

  <Text style={styles.offerTitle}>
    Discount Distribution
  </Text>

  <View style={styles.priceRow}>
    <Text style={styles.offerText}>
      Full Discount
    </Text>

    <Text
      style={{
        fontWeight: "700",
        color: "#2E7D32",
      }}
    >
      {benefits.fullDiscountLitres} Litres @{" "}
      {benefits.membership.discount_percent}%
    </Text>
  </View>

  {benefits.halfDiscountLitres > 0 && (

    <View style={styles.priceRow}>

      <Text style={styles.offerText}>
        Half Discount
      </Text>

      <Text
        style={{
          fontWeight: "700",
          color: "#F59E0B",
        }}
      >
        {benefits.halfDiscountLitres} Litres @{" "}
        {benefits.membership.discount_percent / 2}%
      </Text>

    </View>

  )}

</View>

)}
{!isMembership && benefits && (

<View style={styles.offerCard}>

  <Text style={styles.offerTitle}>
    Price Breakdown
  </Text>

  <View style={styles.priceRow}>
    <Text>Items Total</Text>
    <Text>₹{benefits.subtotal.toFixed(2)}</Text>
  </View>

  <View style={styles.priceRow}>
    <Text>
      Membership Discount ({benefits.membership.discount_percent}%)
    </Text>
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

  

  <View style={styles.divider} />

  <View style={styles.priceRow}>
    <Text style={styles.totalText}>
      Final Payable
    </Text>

    <Text style={styles.totalAmount}>
      ₹{benefits.payableAmount.toFixed(2)}
    </Text>
  </View>

</View>

)}
        <Text style={styles.section}>
          {isMembership
          ? "Choose Payment Method"
          : "Recommended For You"}
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

        {!isMembership && (
           <TouchableOpacity
            style={styles.paymentCard}
            onPress={() => setSelectedPayment("COD")}
            >
             <Text style={styles.paymentTitle}>
              Cash On Delivery
             </Text>

             <Text style={styles.paymentSub}>
              Pay when order arrives
             </Text>

             <Text style={styles.radio}>
              {selectedPayment === "COD" ? "🔘" : "⚪"}
             </Text>
            </TouchableOpacity>
        )}

      </ScrollView>


      <View style={styles.bottomBar}>

  {isMembership ? (

    <>
      <TouchableOpacity
        style={styles.cancelButton}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.cancelText}>
          Cancel
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.payButton}
        onPress={placeOrder}
      >
        <Text style={styles.payText}>
          Activate ₹{totalAmount}
        </Text>
      </TouchableOpacity>
    </>

  ) : (

    <>
      <Text style={styles.bottomAmount}>
       ₹{payableAmount}
      </Text>

      <TouchableOpacity
        style={styles.payButton}
        onPress={placeOrder}
      >
        <Text style={styles.payText}>
          Continue to Pay
        </Text>
      </TouchableOpacity>
    </>

  )}

</View>
      {/* SUBSCRIPTION TERMS & CONDITIONS */}
      <Modal
        visible={isMembership && showSubscriptionTerms}
        transparent
        animationType="fade"
        onRequestClose={() => {
          // User must accept the terms before closing
        }}
      >
        <View style={styles.termsOverlay}>

          <View style={styles.termsModal}>

            <Text style={styles.termsTitle}>
              MANA GANUGA
            </Text>

            <Text style={styles.termsSubtitle}>
              Membership Terms & Conditions
            </Text>

            <ScrollView
              style={styles.termsScroll}
              showsVerticalScrollIndicator={true}
            >

              <Text style={styles.termsSection}>
                1. Subscription Validity
              </Text>

              <Text style={styles.termsText}>
                • The subscription is valid only for the selected plan
                duration (Monthly, Quarterly, Half-Yearly, or Annual).
              </Text>

              <Text style={styles.termsText}>
                • Benefits will automatically expire upon completion of
                the subscription period unless renewed.
              </Text>

              <Text style={styles.termsSection}>
                2. Subscription Benefits
              </Text>

              <Text style={styles.termsText}>
                • Discounts, special offers, loyalty rewards, and
                promotional benefits are available only during the active
                subscription period.
              </Text>

              <Text style={styles.termsText}>
                • Subscription benefits cannot be exchanged for cash.
              </Text>

              <Text style={styles.termsSection}>
                3. Product Availability
              </Text>

              <Text style={styles.termsText}>
                • Product supply is subject to availability.
              </Text>

              <Text style={styles.termsText}>
                • In the event of stock shortages, APFDC LLP reserves the
                right to provide an equivalent product or reschedule
                delivery.
              </Text>

              <Text style={styles.termsSection}>
                4. Delivery Terms
              </Text>

              <Text style={styles.termsText}>
                • Deliveries will be made to the registered address
                provided by the subscriber.
              </Text>

              <Text style={styles.termsText}>
                • Customers are responsible for providing accurate
                address and contact information.
              </Text>

              <Text style={styles.termsText}>
                • Delivery schedules may vary due to public holidays,
                weather conditions, transportation issues, or other
                unforeseen circumstances.
              </Text>

              <Text style={styles.termsSection}>
                5. Subscription Benefits
              </Text>

              <Text style={styles.termsText}>
                • Discounts, special offers, loyalty rewards, and
                promotional benefits are available only during the active
                subscription period.
              </Text>

              <Text style={styles.termsSection}>
                6. Customer Responsibilities
              </Text>

              <Text style={styles.termsText}>
                • Subscribers must maintain accurate and up-to-date
                personal information.
              </Text>

              <Text style={styles.termsText}>
                • Any change in address, phone number, or other details
                must be communicated promptly.
              </Text>

              <Text style={styles.termsSection}>
                7. Cancellation and Termination
              </Text>

              <Text style={styles.termsText}>
                • Subscription fees added to wallet can be claimed only
                on monthly remittance.
              </Text>

              <Text style={styles.termsText}>
                • APFDC LLP reserves the right to suspend or terminate
                any subscription found to be involved in fraudulent
                activity, misuse, or violation of company policies.
              </Text>

              <Text style={styles.termsSection}>
                8. Renewal Policy
              </Text>

              <Text style={styles.termsText}>
                • Subscribers are responsible for renewing their plans
                before the expiry date.
              </Text>

              <Text style={styles.termsText}>
                • Benefits may be discontinued until renewal is completed.
              </Text>

              <Text style={styles.termsSection}>
                9. Changes to Terms and Plans
              </Text>

              <Text style={styles.termsText}>
                • APFDC LLP reserves the right to modify subscription
                plans, pricing, benefits, and terms & conditions at any
                time.
              </Text>

              <Text style={styles.termsSection}>
                10. Privacy Policy
              </Text>

              <Text style={styles.termsText}>
                • Customer information will be used solely for order
                processing, service delivery, customer support, and
                promotional communications.
              </Text>

              <Text style={styles.termsText}>
                • Personal information will not be shared with third
                parties except as required by law.
              </Text>

              <Text style={styles.termsSection}>
                11. Force Majeure
              </Text>

              <Text style={styles.termsText}>
                APFDC LLP shall not be held responsible for delays or
                inability to provide services due to circumstances beyond
                its reasonable control, including natural disasters,
                government regulations, transportation disruptions,
                strikes, or emergencies.
              </Text>

              <Text style={styles.termsSection}>
                12. Dispute Resolution
              </Text>

              <Text style={styles.termsText}>
                Any disputes arising out of this subscription shall be
                subject to the jurisdiction of the courts in Hyderabad,
                Telangana.
              </Text>

              <View style={{ height: 15 }} />

            </ScrollView>

            {/* UNDERSTAND CHECKBOX */}
            <TouchableOpacity
              style={styles.termsCheckboxRow}
              activeOpacity={0.8}
              onPress={() =>
                setUnderstoodTerms(!understoodTerms)
              }
            >

              <View
                style={[
                  styles.termsCheckbox,
                  understoodTerms &&
                    styles.termsCheckboxChecked,
                ]}
              >
                {understoodTerms && (
                  <Text style={styles.termsCheckmark}>
                    ✓
                  </Text>
                )}
              </View>

              <Text style={styles.termsCheckboxText}>
                I understand and agree to the Subscription Terms &
                Conditions.
              </Text>

            </TouchableOpacity>

            {/* CONTINUE BUTTON */}
            <TouchableOpacity
              style={[
                styles.termsContinueButton,
                !understoodTerms &&
                  styles.termsContinueDisabled,
              ]}
              disabled={!understoodTerms}
             onPress={handleAcceptTerms}
            >
              <Text style={styles.termsContinueText}>
                I Understand
              </Text>
            </TouchableOpacity>

          </View>

        </View>
      </Modal>
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
    paddingHorizontal: 20,
    alignItems: 'center',
    elevation: 10,
  },

  bottomAmount: {
    fontSize: 28,
    fontWeight: '700',
  },

  payButton: {
  backgroundColor: '#F59E0B',
  width: 220,
  height: 50,
  borderRadius: 10,
  justifyContent: 'center',
  alignItems: 'center',
},

  payText: {
    fontSize: 18,
    fontWeight: '700',
  },
  cancelButton: {
  flex: 1,
  backgroundColor: "#FFFFFF",
  borderWidth: 1,
  borderColor: "#C8942E",
  height: 50,
  borderRadius: 10,
  justifyContent: "center",
  alignItems: "center",
  marginRight: 10,
},

cancelText: {
  color: "#C8942E",
  fontSize: 18,
  fontWeight: "700",
},
priceRow:{
  flexDirection:"row",
  justifyContent:"space-between",
  marginVertical:8,
},
totalText: {
  fontSize: 18,
  fontWeight: "700",
  color: "#1F3A24",
},

totalAmount: {
  fontSize: 22,
  fontWeight: "800",
  color: "#2E7D32",
},
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

  brandContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
   logo: {
    width: 32,
    height: 32,
    resizeMode: 'contain',
    marginRight: 8,
  },

  brandTextContainer: {
    justifyContent: 'center',
  },

  brandTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#2D341F',
  },

  brandSubtitle: {
    fontSize: 9,
    color: '#8C8C8C',
    fontWeight: '500',
  },
   headerRightPlaceholder: {
    width: 36,
  },
    /* ================================
     SUBSCRIPTION TERMS MODAL
  ================================= */

  termsOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.55)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 18,
  },

  termsModal: {
    width: '100%',
    maxHeight: '90%',
    backgroundColor: '#FFFFFF',
    borderRadius: 22,
    padding: 20,

    elevation: 12,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.25,
    shadowRadius: 12,
  },

  termsTitle: {
    textAlign: 'center',
    fontSize: 21,
    fontWeight: '800',
    color: '#6B4F2A',
  },

  termsSubtitle: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginTop: 4,
    marginBottom: 15,
  },

  termsScroll: {
    maxHeight: 430,
  },

  termsSection: {
    fontSize: 16,
    fontWeight: '700',
    color: '#3E2B1F',
    marginTop: 14,
    marginBottom: 7,
  },

  termsText: {
    fontSize: 14,
    lineHeight: 21,
    color: '#555',
    marginBottom: 7,
  },

  termsCheckboxRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginTop: 12,
    marginBottom: 15,
  },

  termsCheckbox: {
    width: 23,
    height: 23,
    borderWidth: 2,
    borderColor: '#6B4F2A',
    borderRadius: 5,
    marginRight: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },

  termsCheckboxChecked: {
    backgroundColor: '#6B4F2A',
  },

  termsCheckmark: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '800',
  },

  termsCheckboxText: {
    flex: 1,
    fontSize: 14,
    lineHeight: 20,
    color: '#333',
  },

  termsContinueButton: {
    height: 50,
    backgroundColor: '#6B4F2A',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },

  termsContinueDisabled: {
    backgroundColor: '#B8B8B8',
  },

  termsContinueText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
  

});