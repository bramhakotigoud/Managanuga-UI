import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
  View,
  Text,
  TouchableOpacity,
  Image,
} from 'react-native';

import {useAuth} from "../context/AuthContext";
import SubscriptionHeader from '../components/SubscriptionHeader';
import MembershipCarousel from '../components/MembershipCarousel';
import PlanDetailsCard from '../components/PlanDetailsCard';
import BenefitsSection from '../components/BenefitsSection';
import SubscribeButton from '../components/SubscribeButton';
import ActiveMembershipScreen from "../components/ActiveMembershipScreen";

import {getSubscriptionPlans} from '../services/subscriptionService';
import {useCart} from '../context/CartContext';

export default function SubscriptionScreen({navigation}: any) {
  const {cartItems} = useCart();

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
    loadPlans();
  }, []);

  const loadPlans = async () => {
    try {
      const response = await getSubscriptionPlans();
      console.log('Subscription Plans:', response);

    // Load subscription plans
    const plansResponse =
      await getSubscriptionPlans();

      if (response && response.length > 0) {
        setSelectedPlan(response[0]);
      }
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
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
    if (!selectedPlan) return;

    navigation.navigate('Payment', {
      type: 'membership',
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

        <SubscriptionHeader
          navigation={navigation}
        />

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

      <ScrollView showsVerticalScrollIndicator={false}>
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


        <PlanDetailsCard selectedPlan={selectedPlan} />

        <BenefitsSection />

        <SubscribeButton selectedPlan={selectedPlan} onPress={subscribeNow} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF8EE',
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF8EE',
  },
  /* Header Styles */
  header: {
    backgroundColor: '#FFF8EE',
    paddingHorizontal: 18,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    zIndex: 10,
    elevation: 2,
    shadowColor: '#000000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  backButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  backIcon: {
    fontSize: 24,
    fontWeight: '600',
    color: '#222222',
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
  appName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#111111',
  },
  tagline: {
    fontSize: 9,
    color: '#777777',
    marginTop: 1,
  },
  /* Right Actions & Badge Styles */
  headerRightActions: {
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
});