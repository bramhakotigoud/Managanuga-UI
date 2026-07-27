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

import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import {
  getOrderById,
  getOrderItems,
  getOrderTracking,
} from "../services/orderService";

export default function OrderDetailsScreen({
  navigation,
  route,
}: any) {

  const { orderId } = route.params;

  const [loading, setLoading] = useState(true);

  const [order, setOrder] = useState<any>(null);

  const [items, setItems] = useState<any[]>([]);

  const [tracking, setTracking] =
    useState<any>(null);

  const loadOrder = async () => {

    try {

      setLoading(true);

      const [
        orderRes,
        itemsRes,
        trackingRes,
      ] = await Promise.all([

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

  if (loading) {

    return (

      <SafeAreaView
        style={{
          flex:1,
          justifyContent:"center",
          alignItems:"center",
          backgroundColor:"#F8F4EE",
        }}
      >

        <ActivityIndicator
          size="large"
          color="#D4A017"
        />

        <Text
          style={{
            marginTop:15,
            fontSize:16,
            color:"#666",
          }}
        >
          Loading Order...
        </Text>

      </SafeAreaView>

    );

  }

  if (!order) {

    return (

      <SafeAreaView
        style={{
          flex:1,
          justifyContent:"center",
          alignItems:"center",
        }}
      >

        <Text>

          Order Not Found

        </Text>

      </SafeAreaView>

    );

  }

  return (

    <SafeAreaView style={styles.container}>

      <StatusBar
        backgroundColor="#F8F4EE"
        barStyle="dark-content"
      />

      <View style={styles.header}>

  <TouchableOpacity
    style={styles.backButton}
    onPress={() => navigation.goBack()}
  >
    <Icon
      name="arrow-left"
      size={24}
      color="#222"
    />
  </TouchableOpacity>

  <View style={styles.logoSection}>

    <Image
      source={require("../assets/images/logo.png")}
      style={styles.logo}
    />

    <View>

      <Text style={styles.appName}>
        Mana Ganuga
      </Text>

      <Text style={styles.tagline}>
        Pure Tradition • Healthy Future
      </Text>

    </View>

  </View>

  <View style={styles.headerIcons}>

    <TouchableOpacity>
      <Icon
        name="credit-card-outline"
        size={23}
        color="#444"
      />
    </TouchableOpacity>

    <TouchableOpacity style={{marginLeft:18}}>
      <Icon
        name="bell-outline"
        size={23}
        color="#444"
      />
    </TouchableOpacity>

    <TouchableOpacity style={{marginLeft:18}}>
      <Icon
        name="cart-outline"
        size={23}
        color="#444"
      />
    </TouchableOpacity>

  </View>

</View>

      <ScrollView
        showsVerticalScrollIndicator={false}
      >
        {/* ORDER CARD */}

        <View style={styles.orderCard}>

          <View>

            <Text style={styles.orderNumber}>
              Order #{order.id}
            </Text>

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
            ]}
          >

            <Text style={styles.statusText}>
              {order.status}
            </Text>

          </View>

        </View>

        <Text style={styles.amount}>
          ₹{order.total_amount}
        </Text>

        {/* PRODUCTS */}

        <View style={styles.section}>

          <Text style={styles.sectionTitle}>
            🛒 Products
          </Text>

          {items.map((item: any) => (

            <View
              key={item.id}
              style={styles.productCard}
            >

              <Image
                source={{
                  uri: `${BASE_URL}/uploads/${item.image}`,
                }}
                style={styles.productImage}
              />

              <View style={styles.productInfo}>

                <Text style={styles.productName}>
                  {item.product_name}
                </Text>

                <Text style={styles.productQty}>
                  Quantity : {item.quantity}
                </Text>

                <Text style={styles.productPrice}>
                  ₹{item.unit_price}
                </Text>

              </View>

              <Text style={styles.productTotal}>
                ₹{item.total_price}
              </Text>

            </View>

          ))}

        </View>

        {/* ADDRESS */}

        <View style={styles.section}>

          <Text style={styles.sectionTitle}>
            📍 Delivery Address
          </Text>

          <View style={styles.addressCard}>

            <Text style={styles.addressName}>
              Address will be available
            </Text>

            <Text style={styles.addressText}>
              after address integration.
            </Text>

          </View>

        </View>
        {/* SHIPMENT */}

        <View style={styles.section}>

          <Text style={styles.sectionTitle}>
            🚚 Shipment Tracking
          </Text>

          <View style={styles.trackingCard}>

            <View style={styles.trackingRow}>

              <Text style={styles.label}>
                Courier
              </Text>

              <Text style={styles.value}>
                {order.courier_name || "-"}
              </Text>

            </View>

            <View style={styles.trackingRow}>

              <Text style={styles.label}>
                Tracking Number
              </Text>

              <Text style={styles.value}>
                {order.tracking_number || "-"}
              </Text>

            </View>

            <View style={styles.trackingRow}>

              <Text style={styles.label}>
                Current Status
              </Text>

              <Text
                style={{
                  color:"#2E7D32",
                  fontWeight:"700",
                }}
              >
                {tracking?.status || "-"}
              </Text>

            </View>

          </View>

          <Text style={styles.timelineTitle}>
            Tracking History
          </Text>

          {tracking?.history?.map(
            (item:any,index:number)=>(
            <View
              key={index}
              style={styles.timelineRow}
            >

              <View style={styles.timelineLeft}>

                <View style={styles.timelineDot}/>

                {index !== tracking.history.length-1 && (
                  <View style={styles.timelineLine}/>
                )}

              </View>

              <View style={styles.timelineContent}>

                <Text style={styles.timelineStatus}>
                  {item.message}
                </Text>

                <Text style={styles.timelineLocation}>
                  {item.location}
                </Text>

                <Text style={styles.timelineDate}>
                  {item.event_time}
                </Text>

              </View>

            </View>

          ))}

        </View>

        {/* PAYMENT */}

        <View style={styles.section}>

          <Text style={styles.sectionTitle}>
            💳 Payment Details
          </Text>

          <View style={styles.paymentCard}>

            <View style={styles.trackingRow}>

              <Text style={styles.label}>
                Payment Status
              </Text>

              <Text
                style={{
                  color:"#C97A1B",
                  fontWeight:"700",
                }}
              >
                {order.payment_status}
              </Text>

            </View>

            <View style={styles.trackingRow}>

              <Text style={styles.label}>
                Order Amount
              </Text>

              <Text
                style={{
                  fontSize:22,
                  fontWeight:"700",
                  color:"#D4A017",
                }}
              >
                ₹{order.total_amount}
              </Text>

            </View>

          </View>

        </View>

        {/* ORDER SUMMARY */}

        <View style={styles.section}>

          <Text style={styles.sectionTitle}>
            📊 Order Summary
          </Text>

          <View style={styles.summaryRow}>

            <Text style={styles.summaryLabel}>
              Items Total
            </Text>

            <Text style={styles.summaryValue}>
              ₹{order.total_amount}
            </Text>

          </View>

          <View style={styles.summaryRow}>

            <Text style={styles.summaryLabel}>
              Delivery Charges
            </Text>

            <Text
              style={{
                color:"#2E7D32",
                fontWeight:"700",
              }}
            >
              FREE
            </Text>

          </View>

          <View style={styles.summaryDivider}/>

          <View style={styles.summaryRow}>

            <Text style={styles.totalLabel}>
              Grand Total
            </Text>

            <Text style={styles.totalValue}>
              ₹{order.total_amount}
            </Text>

          </View>

        </View>

      </ScrollView>

    </SafeAreaView>

  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F4EE",
  },

  header: {
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 18,
    paddingVertical: 18,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 5,
  },

  headerTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: "#222",
  },

  orderCard: {
    margin: 18,
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

  amount: {
    textAlign: "center",
    fontSize: 34,
    fontWeight: "700",
    color: "#D4A017",
    marginBottom: 18,
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

  paymentCard: {
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
    marginVertical: 12,
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

  icon: {
    fontSize: 26,
  },
  
backButton: {
  width: 42,
  height: 42,
  borderRadius: 21,
  backgroundColor: "#F5F5F5",
  justifyContent: "center",
  alignItems: "center",
},

logoSection: {
  flex: 1,
  flexDirection: "row",
  alignItems: "center",
  marginLeft: 12,
},

logo: {
  width: 42,
  height: 42,
  resizeMode: "contain",
  marginRight: 10,
},

appName: {
  fontSize: 22,
  fontWeight: "700",
  color: "#111",
},

tagline: {
  fontSize: 12,
  color: "#777",
  marginTop: 2,
},

headerIcons: {
  flexDirection: "row",
  alignItems: "center",
},
});

   