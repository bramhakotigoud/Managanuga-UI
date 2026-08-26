import React, { useEffect, useState } from "react";
import styles from '../styles/VendorWalletScreen.styles';
import {
  SafeAreaView,
  View,
  Text,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import Config from "react-native-config";
import { useAuth } from "../context/AuthContext";

export default function VendorWalletScreen({ navigation }: any) {
  const { user } = useAuth();

  const [balance, setBalance] = useState<number>(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadWallet();
  }, []);

  const loadWallet = async () => {
    try {
      const userId = user?.id;

      if (!userId) {
        console.log("Vendor user ID missing");
        return;
      }

      console.log("Loading wallet for:", userId);

      const response = await fetch(
        `${Config.API_BASE_URL}/wallet/${userId}`
      );

      const data = await response.json();

      console.log("Wallet response:", data);

      if (data.success && data.wallet) {
        setBalance(Number(data.wallet.balance));
      }
    } catch (error) {
      console.log("Wallet API Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.back}>‹</Text>
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Vendor Wallet</Text>

        <View style={{ width: 30 }} />
      </View>

      <View style={styles.content}>
        <View style={styles.walletCard}>
          <Text style={styles.walletIcon}>💰</Text>

          <Text style={styles.label}>Available Wallet Balance</Text>

          {loading ? (
            <ActivityIndicator size="large" />
          ) : (
            <Text style={styles.balance}>
              ₹{balance.toFixed(2)}
            </Text>
          )}

          <Text style={styles.walletId}>
            Vendor ID: {user?.id}
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

