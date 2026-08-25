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
  StatusBar,
} from "react-native";
import {
  Bell,
  ShoppingCart,
  CircleChevronLeft,
  Search,
} from 'lucide-react-native';

import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { getOrders } from "../services/orderService";

export default function OrdersScreen({
  navigation,
}: any) {
  const { cartItems } = useCart();
  const { user } = useAuth();

  // Calculate cart count safely
  const cartCount =
    cartItems?.reduce((total: number, item: any) => {
      const q = item.quantity ?? item.qty ?? item.count ?? 1;
      return total + Number(q);
    }, 0) || cartItems?.length || 0;

  const [orders, setOrders] = useState<any[]>([]);
  const [filteredOrders, setFilteredOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

 useEffect(() => {
  loadOrders();
}, [user?.id]);

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
    if (!user?.id) {
      setOrders([]);
      setFilteredOrders([]);
      return;
    }

    const response = await getOrders(
      "USER",
      Number(user.id)
    );

    if (response.success) {
      setOrders(response.data || []);
      setFilteredOrders(response.data || []);
    }
  } catch (e) {
    console.log("LOAD ORDERS ERROR:", e);
  } finally {
    setLoading(false);
  }
};

  // Helper function to resolve remote images or fallbacks correctly
  const getImageSource = (imagePath: string) => {
    if (!imagePath) {
      return require("../assets/images/sunflower.png"); // Default fallback asset
    }

    // Handle full http/https URLs
    if (imagePath.startsWith("http")) {
      return { uri: imagePath };
    }

    // Clean slashes to avoid double slashes like //uploads//
    const cleanPath = imagePath.startsWith("/") ? imagePath.slice(1) : imagePath;
    const finalPath = cleanPath.startsWith("uploads")
      ? cleanPath
      : `uploads/${cleanPath}`;

    return { uri: `${BASE_URL}/${finalPath}` };
  };

  const getStatusColor = (status: string) => {
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
          <ActivityIndicator size="large" color="#D4A017" />
          <Text style={styles.loadingText}>Loading Orders...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#F8F4EE" barStyle="dark-content" />

      {/* FIXED BRAND HEADER (NO BACK BUTTON) */}
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

      {/* SUB-HEADER & SEARCH SECTION */}
      <View style={styles.subHeaderSection}>
        <Text style={styles.title}>
          My Orders ({orders.length})
        </Text>

        <View style={styles.searchBox}>
          <TextInput
            placeholder="Search Order"
            value={search}
            onChangeText={setSearch}
            style={styles.input}
          />
        </View>
      </View>

      {filteredOrders.length === 0 ? (
        <View style={styles.emptyBox}>
          <Text style={styles.emptyEmoji}>📦</Text>
          <Text style={styles.emptyTitle}>No Orders Found</Text>
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
                navigation.navigate("OrderDetails", {
                  orderId: item.id,
                })
              }>
              <View style={styles.cardTop}>
                {/* Product Image with robust source handling */}
                <Image
                  source={getImageSource(item.image || item.product_image)}
                  style={styles.image}
                />

                <View style={styles.info}>
                  <Text style={styles.productTitle}>Order #{item.id}</Text>

                  <Text style={styles.productSubTitle}>
                    Tap to view ordered products
                  </Text>

                  <Text style={styles.amount}>₹{item.total_amount}</Text>

                  <View
                    style={[
                      styles.statusBadge,
                      {
                        backgroundColor: getStatusColor(item.status),
                      },
                    ]}>
                    <Text style={styles.statusText}>{item.status}</Text>
                  </View>

                  <Text style={styles.orderDate}>
                    {item.created_at
                      ? new Date(item.created_at).toDateString()
                      : ""}
                  </Text>
                </View>

                <Text style={styles.arrow}>❯</Text>
              </View>

              <View style={styles.divider} />

              <View style={styles.bottomRow}>
                <Text style={styles.viewText}>View Details</Text>
                <Text style={styles.itemsText}>
                  Tap to view products, address & payment
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

  /* Fixed Header Styles */
  header: {
    backgroundColor: '#F8F4EC',
    paddingHorizontal: 16,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    zIndex: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },

  logoSection: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
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

  /* Sub Header & Search Box Styles */
  subHeaderSection: {
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 5,
  },

  title: {
    fontSize: 20,
    fontWeight: "700",
    color: "#2D341F",
    marginBottom: 8,
  },

  searchBox: {
    marginVertical: 4,
  },

  input: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    paddingHorizontal: 15,
    height: 44,
    fontSize: 14,
    color: "#222",
    elevation: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
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
    fontSize: 22,
    fontWeight: "700",
    color: "#222",
  },

  emptySub: {
    marginTop: 8,
    fontSize: 14,
    textAlign: "center",
    color: "#777",
  },

  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 15,
    marginBottom: 15,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 3,
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
    fontSize: 17,
    fontWeight: "700",
    color: "#222",
  },

  productSubTitle: {
    marginTop: 4,
    fontSize: 13,
    color: "#777",
  },

  amount: {
    marginTop: 6,
    fontSize: 20,
    fontWeight: "700",
    color: "#D4A017",
  },

  statusBadge: {
    alignSelf: "flex-start",
    marginTop: 8,
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 4,
  },

  statusText: {
    color: "#FFFFFF",
    fontSize: 11,
    fontWeight: "700",
  },

  orderDate: {
    marginTop: 6,
    fontSize: 12,
    color: "#777",
  },

  arrow: {
    fontSize: 20,
    color: "#999",
    marginLeft: 10,
  },

  divider: {
    height: 1,
    backgroundColor: "#ECECEC",
    marginVertical: 12,
  },

  bottomRow: {
    flexDirection: "column",
  },

  viewText: {
    fontSize: 15,
    fontWeight: "700",
    color: "#1565C0",
  },

  itemsText: {
    marginTop: 3,
    fontSize: 12,
    color: "#777",
  },
  brandTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#2D341F',
  },
  brandSubtitle: {
    fontSize: 9,
    color: '#8C8C8C',
    fontWeight: '500',
  },
  headerRightPlaceholder: {
    width: 36,
  },
});