import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';

import SubscriptionHeader from '../components/SubscriptionHeader';
import MembershipCarousel from '../components/MembershipCarousel';
import PlanDetailsCard from '../components/PlanDetailsCard';
import BenefitsSection from '../components/BenefitsSection';
import SubscribeButton from '../components/SubscribeButton';

import {getSubscriptionPlans} from '../services/subscriptionService';

export default function SubscriptionScreen({navigation}: any) {

  const [plans, setPlans] = useState<any[]>([]);
  const [selectedPlan, setSelectedPlan] = useState<any>(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadPlans();
  }, []);

  const loadPlans = async () => {
    try {
      const response = await getSubscriptionPlans();

      setPlans(response);

      if (response.length > 0) {
        setSelectedPlan(response[0]);
      }
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  const subscribeNow = () => {
    navigation.navigate('Payment', {
      subscription: selectedPlan,
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

  return (
    <SafeAreaView style={styles.container}>

      <ScrollView
        showsVerticalScrollIndicator={false}>

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

        <SubscribeButton
          selectedPlan={selectedPlan}
          onPress={subscribeNow}
        />

      </ScrollView>

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