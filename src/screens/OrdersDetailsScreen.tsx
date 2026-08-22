import React, { useEffect, useState } from "react";
import Config from "react-native-config";

const BASE_URL = Config.BASE_URL;

import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  ActivityIndicator,
  StatusBar,
} from "react-native";
import {
  Bell,
  ShoppingCart,
  CircleChevronLeft,
  Search,
  Truck,
  MapPinHouse,
  Summary,
} from 'lucide-react-native';

import { useCart } from "../context/CartContext";

import {
  getOrderById,
  getOrderItems,
  getOrderTracking,
} from "../services/orderService";

export default function OrderDetailsScreen({
  navigation,
  route,
}: any) {
  const { cartItems } = useCart();

  // Calculate cart count safely
  const cartCount =
    cartItems?.reduce((total: number, item: any) => {
      const q = item.quantity ?? item.qty ?? item.count ?? 1;
      return total + Number(q);
    }, 0) || cartItems?.length || 0;

  const { orderId } = route.params;

  const [loading, setLoading] = useState(true);
  const [order, setOrder] = useState<any>(null);
  const [items, setItems] = useState<any[]>([]);
  const [tracking, setTracking] = useState<any>(null);

  const loadOrder = async () => {
    try {
      setLoading(true);

      const [orderRes, itemsRes, trackingRes] = await Promise.all([
        getOrderById(orderId),
        getOrderItems(orderId),
        getOrderTracking(orderId),
      ]);

      if (orderRes.success) {
        setOrder(orderRes.data);
      }

      if (itemsRes.success) {
        setItems(itemsRes.data);
      }

      if (trackingRes.status) {
        setTracking(trackingRes.data);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadOrder();
  }, []);

  // Map product names / image keys to local required assets or remote URIs
  const getImageSource = (item: any) => {
    const imageName = (item?.image || item?.product_image || item?.product_name || "").toLowerCase();

    if (imageName.includes("groundnut")) {
      return require("../assets/images/groundnut.png");
    }
    if (imageName.includes("sunflower")) {
      return require("../assets/images/sunflower.png");
    }
    if (imageName.includes("coconut")) {
      return require("../assets/images/coconut.png");
    }
    if (imageName.includes("sesame")) {
      return require("../assets/images/sesame.png");
    }

    // Fallback if item points to an external HTTP URL
    if (typeof item?.image === "string" && item.image.startsWith("http")) {
      return { uri: item.image };
    }

    // Fallback if item points to a backend server URL
    if (typeof item?.image === "string" && item.image.trim() !== "") {
      const cleanPath = item.image.startsWith("/") ? item.image.slice(1) : item.image;
      const finalPath = cleanPath.startsWith("uploads")
        ? cleanPath
        : `uploads/${cleanPath}`;
      return { uri: `${BASE_URL}/${finalPath}` };
    }

    // Default Fallback
    return require("../assets/images/sunflower.png");
  };

  // Calculate total number of items ordered
  const totalItemCount = items.reduce(
    (sum: number, item: any) => sum + (item.quantity || 1),
    0
  );

  if (loading) {
    return (
      <SafeAreaView
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#F8F4EE",
        }}>
        <ActivityIndicator size="large" color="#D4A017" />
        <Text
          style={{
            marginTop: 15,
            fontSize: 16,
            color: "#666",
          }}>
          Loading Order...
        </Text>
      </SafeAreaView>
    );
  }

  if (!order) {
    return (
      <SafeAreaView
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}>
        <Text>Order Not Found</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#F8F4EE" barStyle="dark-content" />

      {/* FIXED TOP HEADER WITH BACK BUTTON, LOGO, BELL & CART BADGE */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
          <CircleChevronLeft 
            size={24}
            color="#000000"
            strokeWidth={2}
            />
        </TouchableOpacity>

        <View style={styles.logoSection}>
          <Image
            source={require("../assets/images/logo.png")}
            style={styles.logo}
          />

          <View style={styles.brandTextContainer}>
            <Text style={styles.appName}>Mana Ganuga</Text>
            <Text style={styles.tagline}>Pure Tradition • Healthy Future</Text>
          </View>
        </View>

        <View style={styles.headerIcons}>
          <TouchableOpacity
            style={styles.iconButton}
            onPress={() => navigation.navigate("Notifications")}>
            <Bell
             size={24}
             color="#000000"
             strokeWidth={2}
              />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.cartIconWrapper}
            onPress={() => navigation.navigate("Cart")}>
            <ShoppingCart
              size={24}
              color="#0c0502"
              strokeWidth={2}
              />
            {Boolean(cartCount) && cartCount > 0 ? (
              <View style={styles.badgeContainer}>
                <Text style={styles.badgeText}>
                  {cartCount > 99 ? "99+" : cartCount}
                </Text>
              </View>
            ) : null}
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* ORDER CARD */}
        <View style={styles.orderCard}>
          <View>
            <Text style={styles.orderNumber}>Order #{order.id}</Text>
            <Text style={styles.orderDate}>
              {new Date(order.created_at).toDateString()}
            </Text>
          </View>

          <View
            style={[
              styles.statusBadge,
              {
                backgroundColor:
                  order.status === "DELIVERED"
                    ? "#2E7D32"
                    : order.status === "SHIPPED"
                    ? "#1565C0"
                    : "#C97A1B",
              },
            ]}>
            <Text style={styles.statusText}>{order.status}</Text>
          </View>
        </View>

        {/* PRODUCTS */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Products</Text>

          {items.map((item: any) => (
            <View key={item.id} style={styles.productCard}>
              <Image
                source={getImageSource(item)}
                style={styles.productImage}
              />

              <View style={styles.productInfo}>
                <Text style={styles.productName}>{item.product_name}</Text>
                <Text style={styles.productQty}>Quantity : {item.quantity}</Text>
                <Text style={styles.productPrice}>₹{item.unit_price}</Text>
              </View>

              <Text style={styles.productTotal}>₹{item.total_price}</Text>
            </View>
          ))}
        </View>

        {/* ADDRESS */}
        <View style={styles.section}>
         <View style={styles.sectionTitleRow}>
  <MapPinHouse
    size={22}
    color="#040201"
    strokeWidth={2}
  />

  <Text style={styles.sectionTitle}>
    Delivery Address
  </Text>
</View>

          <View style={styles.addressCard}>
            <Text style={styles.addressName}>Address will be available</Text>
            <Text style={styles.addressText}>after address integration.</Text>
          </View>
        </View>

        {/* SHIPMENT */}
        <View style={styles.section}>
          <View style={styles.sectionTitleRow}>
  <Truck
    size={22}
    color="#130a05"
    strokeWidth={2}
  />
  <Text style={styles.sectionTitle}>
    Shipment Tracking
  </Text>
</View>

          <View style={styles.trackingCard}>
            <View style={styles.trackingRow}>
              <Text style={styles.label}>Courier</Text>
              <Text style={styles.value}>{order.courier_name || "-"}</Text>
            </View>

            <View style={styles.trackingRow}>
              <Text style={styles.label}>Tracking Number</Text>
              <Text style={styles.value}>{order.tracking_number || "-"}</Text>
            </View>

            <View style={styles.trackingRow}>
              <Text style={styles.label}>Current Status</Text>
              <Text style={{ color: "#2E7D32", fontWeight: "700" }}>
                {tracking?.status || "-"}
              </Text>
            </View>
          </View>

          <Text style={styles.timelineTitle}>Tracking History</Text>

          {tracking?.history?.map((item: any, index: number) => (
            <View key={index} style={styles.timelineRow}>
              <View style={styles.timelineLeft}>
                <View style={styles.timelineDot} />
                {index !== tracking.history.length - 1 && (
                  <View style={styles.timelineLine} />
                )}
              </View>

              <View style={styles.timelineContent}>
                <Text style={styles.timelineStatus}>{item.message}</Text>
                <Text style={styles.timelineLocation}>{item.location}</Text>
                <Text style={styles.timelineDate}>{item.event_time}</Text>
              </View>
            </View>
          ))}
        </View>

        {/* MERGED PAYMENT & ORDER SUMMARY CONTAINER */}
        <View style={styles.section}>
          <View style={styles.sectionTitleRow}>
  <Summary
    size={22}
    color="#000000"
    strokeWidth={2}
  />
  <Text style={styles.sectionTitle}>
    Order Summary
  </Text>
</View>

          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Total Items</Text>
            <Text style={styles.summaryValue}>{totalItemCount} {totalItemCount === 1 ? 'Item' : 'Items'}</Text>
          </View>

          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Items Cost</Text>
            <Text style={styles.summaryValue}>₹{order.total_amount}</Text>
          </View>

          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Payment Status</Text>
            <Text style={{ color: "#C97A1B", fontWeight: "700" }}>
              {order.payment_status}
            </Text>
          </View>

          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Delivery Charges</Text>
            <Text style={{ color: "#2E7D32", fontWeight: "700" }}>FREE</Text>
          </View>

          <View style={styles.summaryDivider} />

          <View style={styles.summaryRow}>
            <Text style={styles.totalLabel}>Grand Total</Text>
            <Text style={styles.totalValue}>₹{order.total_amount}</Text>
          </View>
        </View>

        <View style={{ height: 30 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F4EE",
  },

  /* Fixed Header Styles */
  header: {
    backgroundColor: "#F8F4EE",
    paddingHorizontal: 16,
    paddingVertical: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    zIndex: 10,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },

  backButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#FFF",
    justifyContent: "center",
    alignItems: "center",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },

  backIcon: {
    fontSize: 24,
    fontWeight: "600",
    color: "#2D341F",
    marginTop: -2,
  },

  logoSection: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 10,
  },

  logo: {
    width: 34,
    height: 34,
    resizeMode: "contain",
    marginRight: 8,
  },

  brandTextContainer: {
    justifyContent: "center",
  },

  appName: {
    fontSize: 16,
    fontWeight: "700",
    color: "#2D341F",
  },

  tagline: {
    fontSize: 9,
    color: "#8C8C8C",
    fontWeight: "500",
    marginTop: 1,
  },

  headerIcons: {
    flexDirection: "row",
    alignItems: "center",
  },

  iconButton: {
    marginLeft: 10,
    padding: 4,
  },

  cartIconWrapper: {
    marginLeft: 10,
    padding: 4,
    position: "relative",
  },

  headerIconText: {
    fontSize: 18,
  },

  badgeContainer: {
    position: "absolute",
    top: -2,
    right: -4,
    backgroundColor: "#A84B21",
    borderRadius: 9,
    minWidth: 18,
    height: 18,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 3,
  },

  badgeText: {
    color: "#FFFFFF",
    fontSize: 10,
    fontWeight: "700",
  },

  orderCard: {
    margin: 18,
    marginBottom: 12,
    padding: 18,
    backgroundColor: "#FFF",
    borderRadius: 18,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    elevation: 4,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 5,
  },

  orderNumber: {
    fontSize: 22,
    fontWeight: "700",
    color: "#222",
  },

  orderDate: {
    marginTop: 6,
    color: "#777",
    fontSize: 14,
  },

  statusBadge: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
  },

  statusText: {
    color: "#FFF",
    fontWeight: "700",
    fontSize: 13,
  },

  section: {
    backgroundColor: "#FFF",
    marginHorizontal: 18,
    marginBottom: 18,
    borderRadius: 18,
    padding: 18,
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 5,
  },

  sectionTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#222",
    marginBottom: 15,
  },

  productCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FAFAFA",
    padding: 15,
    borderRadius: 14,
    marginBottom: 14,
  },

  productImage: {
    width: 70,
    height: 70,
    borderRadius: 12,
    resizeMode: "contain",
    backgroundColor: "#FFF7E6",
  },

  productInfo: {
    flex: 1,
    marginLeft: 15,
  },

  productName: {
    fontSize: 17,
    fontWeight: "700",
    color: "#222",
  },

  productQty: {
    marginTop: 6,
    fontSize: 14,
    color: "#666",
  },

  productPrice: {
    marginTop: 6,
    fontSize: 14,
    color: "#777",
  },

  productTotal: {
    fontSize: 18,
    fontWeight: "700",
    color: "#D4A017",
  },

  addressCard: {
    backgroundColor: "#FAFAFA",
    borderRadius: 14,
    padding: 15,
  },

  addressName: {
    fontSize: 17,
    fontWeight: "700",
    color: "#222",
  },

  addressText: {
    marginTop: 8,
    color: "#666",
    lineHeight: 22,
  },

  trackingCard: {
    marginTop: 5,
  },

  trackingRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },

  label: {
    fontSize: 15,
    color: "#777",
    fontWeight: "600",
  },

  value: {
    flex: 1,
    textAlign: "right",
    fontSize: 16,
    color: "#222",
    fontWeight: "700",
  },

  timelineTitle: {
    marginTop: 25,
    marginBottom: 15,
    fontSize: 18,
    fontWeight: "700",
    color: "#222",
  },

  timelineRow: {
    flexDirection: "row",
    marginBottom: 18,
  },

  timelineLeft: {
    width: 35,
    alignItems: "center",
  },

  timelineDot: {
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: "#D4A017",
  },

  timelineLine: {
    width: 2,
    flex: 1,
    backgroundColor: "#DDD",
    marginTop: 3,
  },

  timelineContent: {
    flex: 1,
    paddingBottom: 10,
  },

  timelineStatus: {
    fontSize: 16,
    fontWeight: "700",
    color: "#222",
  },

  timelineLocation: {
    marginTop: 4,
    color: "#666",
    fontSize: 14,
  },

  timelineDate: {
    marginTop: 4,
    color: "#999",
    fontSize: 13,
  },

  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 10,
  },

  summaryLabel: {
    fontSize: 15,
    color: "#666",
  },

  summaryValue: {
    fontSize: 16,
    fontWeight: "700",
    color: "#222",
  },

  summaryDivider: {
    height: 1,
    backgroundColor: "#ECECEC",
    marginVertical: 15,
  },

  totalLabel: {
    fontSize: 19,
    fontWeight: "700",
    color: "#222",
  },

  totalValue: {
    fontSize: 25,
    fontWeight: "700",
    color: "#D4A017",
  },
sectionTitleRow: {
  flexDirection: 'row',
  alignItems: 'center',
  gap: 11,
  marginTop: 15,
  marginBottom: 10,
},
sectionTitle: {
  fontSize: 18,
  fontWeight: '700',
  color: '#2D341F',
  marginLeft: 0,
},
});