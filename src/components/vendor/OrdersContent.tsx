import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import Config from "react-native-config";

export default function OrdersContent() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    try {
      const response = await fetch(
        `${Config.API_BASE_URL}/vendor/orders`
      );

      const data = await response.json();

      if (Array.isArray(data)) {
        setOrders(data);
      } else {
        setOrders([]);
      }
    } catch (err) {
      console.log("Orders API Error:", err);
      setOrders([]);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <ActivityIndicator size="large" />;
  }

  if (orders.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>
          No Orders Found
        </Text>
      </View>
    );
  }

  return (
    <FlatList
      data={orders}
      keyExtractor={(item: any) => item.id.toString()}
      renderItem={({ item }: any) => (
        <View style={styles.card}>
          <Text style={styles.name}>
            {item.username}
          </Text>

          <Text>📱 {item.mobile_no}</Text>

          <Text>💰 ₹{item.total_amount}</Text>

          <Text>📦 {item.status}</Text>

          <Text>💳 {item.payment_status}</Text>
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  emptyText: {
    fontSize: 20,
    fontWeight: "700",
    color: "#777",
  },

  card: {
    backgroundColor: "#FFF",
    padding: 16,
    marginBottom: 12,
    borderRadius: 12,
    elevation: 3,
  },

  name: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 8,
  },
});