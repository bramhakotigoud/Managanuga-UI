import React, {useEffect, useState} from 'react';
import styles from '../styles/SubscriptionScreen.styles';
import {
  SafeAreaView,
  ScrollView,
  ActivityIndicator,
  View,
  Text,
  TouchableOpacity,
  Image,
} from 'react-native';

import {useAuth} from "../context/AuthContext";

import MembershipCarousel from '../components/MembershipCarousel';
import PlanDetailsCard from '../components/PlanDetailsCard';
import BenefitsSection from '../components/BenefitsSection';
import SubscribeButton from '../components/SubscribeButton';
import ActiveMembershipScreen from "../components/ActiveMembershipScreen";

import {
  getSubscriptionPlans,
  getMyMembership,
} from '../services/subscriptionService';
import {useCart} from '../context/CartContext';

export default function SubscriptionScreen({navigation}: any) {
  const {cartItems} = useCart();
  const {user} = useAuth();

const [membership, setMembership] =
  useState<any>(null);

  // Safely sum total items checking all common quantity key names
  const cartCount =
    cartItems?.reduce((total: number, item: any) => {
      const q = item.quantity ?? item.qty ?? item.count ?? 1;
      return total + Number(q);
    }, 0) || cartItems?.length || 0;

  const [plans, setPlans] = useState<any[]>([]);
  const [selectedPlan, setSelectedPlan] = useState<any>(null);
  const [loading, setLoading] = useState(true);

 useEffect(() => {

  const unsubscribe = navigation.addListener(
    "focus",
    () => {
      loadPlans();
    }
  );

  return unsubscribe;

}, [navigation, user]);

 const loadPlans = async () => {
  try {

    const plansResponse =
      await getSubscriptionPlans();

    console.log(
      "Subscription Plans:",
      plansResponse,
    );

    setPlans(plansResponse);

    if (plansResponse.length > 0) {

  const currentMembership =
    user?.id
      ? await getMyMembership(user.id)
      : null;

  setMembership(currentMembership);

  if (currentMembership) {

    const nextPlan =
      plansResponse.find(
        p => p.id > currentMembership.plan_id
      );

    setSelectedPlan(
      nextPlan || plansResponse[0]
    );

  } else {

    setSelectedPlan(plansResponse[0]);

  }

}

    if (user?.id) {

      const membershipResponse =
        await getMyMembership(user.id);

      console.log(
        "Current Membership:",
        membershipResponse,
      );

      setMembership(
        membershipResponse,
      );
    }

  } catch (e) {

    console.log(
      "Subscription Screen Error:",
      e,
    );

  } finally {

    setLoading(false);

  }
};

  const subscribeNow = () => {

  if (!user) {

    navigation.navigate("Login", {
      fromSubscription: true,
    });

    return;
  }

  if (!selectedPlan) return;

  navigation.navigate("Payment", {
    type: "membership",
    plan: {
      id: selectedPlan.id,
      name: selectedPlan.plan_name,
      price: selectedPlan.plan_price,
      discount: selectedPlan.discount,
      walletAmount: selectedPlan.wallet_amount,
      monthlyClaim: selectedPlan.monthly_claim,
    },
  });

};

  if (loading) {
    return (
      <SafeAreaView style={styles.loader}>
        <ActivityIndicator size="large" color="#C8942E" />
      </SafeAreaView>
    );
  }
  if (membership) {
  return (
    <ActiveMembershipScreen
      membership={membership}
      plans={plans}
      navigation={navigation}
    />
  );
}

  return (
    <SafeAreaView style={styles.container}>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: 110,
        }}>

       

      {/* Fixed Top Header */}
      <View style={styles.header}>
        {/* Back Button */}
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
          hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}>
          <Text style={styles.backIcon}>‹</Text>
        </TouchableOpacity>

        {/* Logo and App Title */}
        <View style={styles.logoSection}>
          <Image
            source={require('../assets/images/logo.png')}
            style={styles.logo}
          />
          <View>
            <Text style={styles.appName}>Mana Ganuga</Text>
            <Text style={styles.tagline}>Pure Tradition • Healthy Future</Text>
          </View>
        </View>

        {/* Header Actions (Bell + Cart with Badge) */}
        <View style={styles.headerRightActions}>
          <TouchableOpacity
            style={styles.iconButton}
            onPress={() => navigation.navigate('Notifications')}>
            <Text style={styles.headerIconText}>🔔</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.cartIconWrapper}
            onPress={() => navigation.navigate('Cart')}>
            <Text style={styles.headerIconText}>🛒</Text>
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

      
        <MembershipCarousel
          plans={plans}
          selectedPlan={selectedPlan}
          setSelectedPlan={setSelectedPlan}
        />

        

        <PlanDetailsCard
          selectedPlan={selectedPlan}
        />

        <BenefitsSection />

      </ScrollView>
        
       <SubscribeButton
          selectedPlan={selectedPlan}
          onPress={subscribeNow}
        />

    </SafeAreaView>
  );
}

