import React, {useEffect, useState} from 'react';
import styles from '../styles/LegalScreen.styles';
import {
  ActivityIndicator,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  Image,
} from 'react-native';
import {
  Bell,
  ShoppingCart,
  CircleChevronLeft,
  Search,
  Truck,
  MapPinHouse,
  Summary,
} from 'lucide-react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

import {getLegalContent, LegalContent} from '../services/legalService';

type LegalType =
  | 'terms'
  | 'privacy'
  | 'customerCare'
  | 'refund'
  | 'shipping';

const LegalScreen = ({navigation, route}: any) => {
  const [legalContent, setLegalContent] =
    useState<LegalContent | null>(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const type: LegalType = route?.params?.type || 'terms';
  

  useEffect(() => {
    loadLegalContent();
  }, []);

  const loadLegalContent = async () => {
    try {
      setLoading(true);
      setError('');

      const data = await getLegalContent();

      setLegalContent(data);
    } catch (err: any) {
      console.error('LEGAL CONTENT ERROR:', err);

      setError(
        err?.message ||
          'Unable to load this information. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  const getTitle = () => {
    switch (type) {
      case 'terms':
        return 'Terms & Conditions';

      case 'privacy':
        return 'Privacy Policy';

      case 'customerCare':
        return 'Customer Care';

      case 'refund':
        return 'Refund & Cancellation Policy';

      case 'shipping':
        return 'Shipping & Delivery';

      default:
        return 'Legal Information';
    }
  };

  const getContent = () => {
    if (!legalContent) {
      return '';
    }

    switch (type) {
      case 'terms':
        return legalContent.terms_conditions;

      case 'privacy':
        return legalContent.privacy_policy;

      case 'customerCare':
        return legalContent.customer_care;

      case 'refund':
        return legalContent.refund_cancellation_policy;

      case 'shipping':
        return legalContent.shipping_delivery;

      default:
        return '';
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>

      {/* Header */}
      {/* Header */}
<View style={styles.header}>

  <TouchableOpacity
    onPress={() => navigation.goBack()}
    hitSlop={{
      top: 10,
      bottom: 10,
      left: 10,
      right: 10,
    }}>
    <CircleChevronLeft 
      size={24}
      color="#000000"
      strokeWidth={2}
      />
  </TouchableOpacity>

  <View style={styles.brandContainer}>
    <Image
      source={require('../assets/images/logo.png')}
      style={styles.logo}
    />

    <View style={styles.brandTextContainer}>
      <Text style={styles.brandTitle}>
        Mana Ganuga
      </Text>

      <Text style={styles.brandSubtitle}>
        Pure Tradition • Healthy Future
      </Text>
    </View>
  </View>

  <View style={styles.headerPlaceholder} />

</View>

      {/* Content */}
      {loading ? (

        <View style={styles.centerContainer}>

          <ActivityIndicator
            size="large"
            color="#A84B21"
          />

          <Text style={styles.loadingText}>
            Loading...
          </Text>

        </View>

      ) : error !== '' ? (

        <View style={styles.centerContainer}>

          <Text style={styles.errorText}>
            {error}
          </Text>

          <TouchableOpacity
            style={styles.retryButton}
            onPress={loadLegalContent}>

            <Text style={styles.retryText}>
              Try Again
            </Text>

          </TouchableOpacity>

        </View>

      ) : (

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.content}>

          <Text style={styles.title}>
            {getTitle()}
          </Text>

          <Text style={styles.legalText}>
            {getContent() || 'Content will be updated soon.'}
          </Text>

        </ScrollView>

      )}

    </SafeAreaView>
  );
};

export default LegalScreen;

