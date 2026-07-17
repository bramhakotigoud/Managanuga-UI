import React, { useEffect, useState } from "react";
import Config from "react-native-config";
const BASE_URL = Config.BASE_URL;
import {
  SafeAreaView,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  Image,
  StyleSheet,
} from "react-native";

import { getOrders } from "../services/orderService";

export default function OrdersScreen({
  navigation,
}: any) {
  const [orders, setOrders] = useState<any[]>([]);
  const [filteredOrders, setFilteredOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    loadOrders();
  }, []);

  useEffect(() => {
    if (search.trim() === "") {
      setFilteredOrders(orders);
      return;
    }

    const filtered = orders.filter(
      (item: any) =>
        item.id.toString().includes(search) ||
        item.status
          ?.toLowerCase()
          .includes(search.toLowerCase())
    );

    setFilteredOrders(filtered);
  }, [search, orders]);

  const loadOrders = async () => {
    try {
      const response = await getOrders(
        "USER",
        1,
      );

      if (response.success) {
        setOrders(response.data);
        setFilteredOrders(response.data);
      }
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (
    status: string,
  ) => {
    switch (status) {
      case "DELIVERED":
        return "#2E7D32";

      case "SHIPPED":
        return "#1565C0";

      case "PLACED":
        return "#A65A2A";

      case "CANCELLED":
        return "#C62828";

      default:
        return "#777";
    }
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loader}>
          <ActivityIndicator
            size="large"
            color="#D4A017"
          />
          <Text style={styles.loadingText}>
            Loading Orders...
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>

      <View style={styles.header}>

        <Text style={styles.title}>
          My Orders
        </Text>

        <Text style={styles.subtitle}>
          {filteredOrders.length} Orders
        </Text>

      </View>

      <View style={styles.searchBox}>

        <TextInput
          placeholder="Search Order"
          value={search}
          onChangeText={setSearch}
          style={styles.input}
        />

      </View>

      {filteredOrders.length === 0 ? (

        <View style={styles.emptyBox}>

          <Text style={styles.emptyEmoji}>
            📦
          </Text>

          <Text style={styles.emptyTitle}>
            No Orders Found
          </Text>

          <Text style={styles.emptySub}>
            Your placed orders will appear here.
          </Text>

        </View>

      ) : (

        <FlatList
          data={filteredOrders}
          keyExtractor={(item: any, index) =>
          `${item.id}-${item.product_name}-${index}`
           }

          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            padding: 15,
            paddingBottom: 120,
          }}
          renderItem={({ item }: any) => (

            <TouchableOpacity
              activeOpacity={0.85}
              style={styles.card}
              onPress={() =>
                navigation.navigate(
                  "OrderDetails",
                  {
                    orderId: item.id,
                  },
                )
              }
            >

              <View style={styles.cardTop}>

                <Image
                  source={{
                    uri: `${BASE_URL}/uploads/${item.image}`,
                  }}
                  style={styles.image}
                />

                <View style={styles.info}>
                <Text style={styles.productTitle}>
                    Order #{item.id}
                  </Text>

                  <Text style={styles.productSubTitle}>
                    Tap to view ordered products
                  </Text>

                  <Text style={styles.amount}>
                    ₹{item.total_amount}
                  </Text>

                  <View
                    style={[
                      styles.statusBadge,
                      {
                        backgroundColor:
                          getStatusColor(
                            item.status,
                          ),
                      },
                    ]}
                  >
                    <Text
                      style={styles.statusText}
                    >
                      {item.status}
                    </Text>
                  </View>

                  <Text style={styles.orderDate}>
                    {item.created_at
                      ? new Date(
                          item.created_at,
                        ).toDateString()
                      : ""}
                  </Text>

                </View>

                <Text style={styles.arrow}>
                  ❯
                </Text>

              </View>

              <View
                style={styles.divider}
              />

              <View
                style={styles.bottomRow}
              >

                <Text
                  style={styles.viewText}
                >
                  View Details
                </Text>

                <Text
                  style={styles.itemsText}
                >
                  Tap to view products,
                  address & payment
                </Text>

              </View>

            </TouchableOpacity>

          )}
        />

      )}

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F4EE",
  },

  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  loadingText: {
    marginTop: 15,
    fontSize: 16,
    color: "#666",
    fontWeight: "500",
  },

  header: {
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 15,
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 5,
  },

  title: {
    fontSize: 30,
    fontWeight: "700",
    color: "#222",
  },

  subtitle: {
    marginTop: 5,
    fontSize: 15,
    color: "#777",
  },

  searchBox: {
    backgroundColor: "#F8F4EE",
    paddingHorizontal: 15,
    paddingVertical: 12,
  },

  input: {
    backgroundColor: "#F3F3F3",
    borderRadius: 12,
    paddingHorizontal: 15,
    height: 48,
    fontSize: 15,
    color: "#222",
  },

  emptyBox: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 30,
  },

  emptyEmoji: {
    fontSize: 70,
  },

  emptyTitle: {
    marginTop: 15,
    fontSize: 24,
    fontWeight: "700",
    color: "#222",
  },

  emptySub: {
    marginTop: 8,
    fontSize: 15,
    textAlign: "center",
    color: "#777",
  },

  card: {
    backgroundColor: "#F8F4EE",
    borderRadius: 16,
    padding: 15,
    marginBottom: 15,
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 5,
  },

  cardTop: {
    flexDirection: "row",
    alignItems: "center",
  },

  image: {
    width: 75,
    height: 75,
    borderRadius: 12,
    resizeMode: "contain",
    backgroundColor: "#F8F8F8",
  },

  info: {
    flex: 1,
    marginLeft: 15,
  },

  productTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#222",
  },

  productSubTitle: {
    marginTop: 4,
    fontSize: 14,
    color: "#777",
  },

  amount: {
    marginTop: 8,
    fontSize: 22,
    fontWeight: "700",
    color: "#D4A017",
  },

  statusBadge: {
    alignSelf: "flex-start",
    marginTop: 10,
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 5,
  },

  statusText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "700",
  },

  orderDate: {
    marginTop: 8,
    fontSize: 13,
    color: "#777",
  },

  arrow: {
    fontSize: 24,
    color: "#999",
    marginLeft: 10,
  },

  divider: {
    height: 1,
    backgroundColor: "#ECECEC",
    marginVertical: 15,
  },

  bottomRow: {
    flexDirection: "column",
  },

  viewText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#1565C0",
  },

  itemsText: {
    marginTop: 5,
    fontSize: 13,
    color: "#777",
  },
});
