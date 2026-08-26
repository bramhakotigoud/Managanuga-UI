import React from 'react';
import styles from '../styles/OrderSuccessScreen.styles';
import {
  View,
  Text,
  TouchableOpacity,
} from 'react-native';

export default function OrderSuccessScreen({navigation}: any) {
  return (
    <View style={styles.container}>
      <Text style={styles.icon}>✅</Text>

      <Text style={styles.title}>
        Order Placed Successfully
      </Text>

      <Text style={styles.subtitle}>
        Thank you for shopping with Mana Ganuga
      </Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('MainTabs')}
      >
        <Text style={styles.buttonText}>
          Continue Shopping
        </Text>
      </TouchableOpacity>
    </View>
  );
}

