import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF8EE",
  },

  header: {
    height: 60,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 18,
    backgroundColor: "#F8F4EC",
  },

  back: {
    fontSize: 38,
    color: "#A84B21",
    lineHeight: 40,
  },

  headerTitle: {
    fontSize: 19,
    fontWeight: "800",
    color: "#2D341F",
  },

  content: {
    padding: 20,
  },

  walletCard: {
    backgroundColor: "#FFF",
    borderRadius: 22,
    paddingVertical: 35,
    paddingHorizontal: 20,
    alignItems: "center",

    borderWidth: 2,
    borderColor: "#D4AF37",

    shadowColor: "#D4AF37",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.25,
    shadowRadius: 10,

    elevation: 6,
  },

  walletIcon: {
    fontSize: 42,
    marginBottom: 12,
  },

  label: {
    fontSize: 14,
    color: "#777",
    fontWeight: "600",
  },

  balance: {
    fontSize: 36,
    fontWeight: "900",
    color: "#A84B21",
    marginTop: 8,
  },

  walletId: {
    marginTop: 12,
    color: "#888",
    fontSize: 12,
  },
});