import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';

import {useAuth} from "../context/AuthContext";
import SubscriptionHeader from '../components/SubscriptionHeader';
import MembershipCarousel from '../components/MembershipCarousel';
import PlanDetailsCard from '../components/PlanDetailsCard';
import BenefitsSection from '../components/BenefitsSection';
import SubscribeButton from '../components/SubscribeButton';
import ActiveMembershipScreen from "../components/ActiveMembershipScreen";

import {
  getSubscriptionPlans,
  getMyMembership,
} from '../services/subscriptionService';

export default function SubscriptionScreen({navigation}: any) {
  const {user} = useAuth();
  const [plans, setPlans] = useState<any[]>([]);
  const [selectedPlan, setSelectedPlan] = useState<any>(null);
  const [membership, setMembership] =
useState<any>(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadPlans();
  }, []);

  const loadPlans = async () => {
  try {

    // Load subscription plans
    const plansResponse =
      await getSubscriptionPlans();

    console.log(
      "Subscription Plans:",
      plansResponse
    );

    setPlans(plansResponse);

    if (plansResponse.length > 0) {
      setSelectedPlan(plansResponse[0]);
    }

    // Load current user's membership
    if (user?.id) {

      const membershipResponse =
        await getMyMembership(user.id);

      console.log(
        "Current Membership:",
        membershipResponse
      );

      setMembership(
        membershipResponse
      );
    }

  } catch (e) {

    console.log(
      "Subscription Screen Error:",
      e
    );

  } finally {

    setLoading(false);

  }
};

  const subscribeNow = () => {
    navigation.navigate('Payment', {
      type: 'membership',
      plan: {
        id: selectedPlan.id,
        name: selectedPlan.plan_name,
        price: selectedPlan.plan_price,
        discount: selectedPlan.discount,
        walletAmount: selectedPlan.wallet_amount,
        monthlyClaim: selectedPlan.monthly_claim,
      }
    });
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.loader}>
        <ActivityIndicator
          size="large"
          color="#C8942E"
        />
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

        <SubscriptionHeader
          navigation={navigation}
        />

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

const styles = StyleSheet.create({

  container:{
    flex:1,
    backgroundColor:"#FFF8EE",
  },

  loader:{
    flex:1,
    justifyContent:"center",
    alignItems:"center",
    backgroundColor:"#FFF8EE",
  },

});