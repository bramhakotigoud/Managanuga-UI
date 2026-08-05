import React, { useState } from "react";

import CustomersContent from "../components/vendor/CustomersContent";
import OrdersContent from "../components/vendor/OrdersContent";
import InventoryContent from "../components/vendor/InventoryContent";
import ReferralContent from "../components/vendor/ReferralContent";
import { useNavigation } from "@react-navigation/native";
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";
import { useAuth } from "../context/AuthContext";

export default function VendorDashboardScreen() {
    const [activeMenu, setActiveMenu] = useState("Customers");
  const { user, logout } = useAuth();

const navigation = useNavigation<any>();

  return (

    <SafeAreaView style={styles.container}>

      {/* Header */}
      <View style={styles.header}>

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
        Vendor Panel
      </Text>

    </View>

  </View>

  <TouchableOpacity
  style={styles.logoutButton}
  onPress={async () => {

    await logout();

    navigation.reset({
      index: 0,
      routes: [
        {
          name: "Login",
        },
      ],
    });

  }}
>
  <Text style={styles.logoutText}>
    Logout
  </Text>
</TouchableOpacity>

</View>

      {/* Body */}
      <View style={styles.body}>

        {/* Left Menu */}
       <View style={styles.sidebar}>

  

<TouchableOpacity
  style={
    activeMenu === "Customers"
      ? styles.activeMenu
      : styles.menuItem
  }
  onPress={() => setActiveMenu("Customers")}
>
  <Text
    style={
      activeMenu === "Customers"
        ? styles.activeText
        : styles.menuText
    }
  >
    👥 Customers
  </Text>
</TouchableOpacity>

<TouchableOpacity
  style={
    activeMenu === "Orders"
      ? styles.activeMenu
      : styles.menuItem
  }
  onPress={() => setActiveMenu("Orders")}
>
  <Text
    style={
      activeMenu === "Orders"
        ? styles.activeText
        : styles.menuText
    }
  >
    📦 Orders
  </Text>
</TouchableOpacity>

<TouchableOpacity
  style={
    activeMenu === "Inventory"
      ? styles.activeMenu
      : styles.menuItem
  }
  onPress={() => setActiveMenu("Inventory")}
>
  <Text
    style={
      activeMenu === "Inventory"
        ? styles.activeText
        : styles.menuText
    }
  >
    🛒 Inventory
  </Text>
</TouchableOpacity>

<TouchableOpacity
  style={
    activeMenu === "Referral"
      ? styles.activeMenu
      : styles.menuItem
  }
  onPress={() => setActiveMenu("Referral")}
>
  <Text
    style={
      activeMenu === "Referral"
        ? styles.activeText
        : styles.menuText
    }
  >
    📨 Referral
  </Text>
</TouchableOpacity>
</View>

        {/* Right Content */}
     <View style={styles.content}>

  

  {activeMenu === "Customers" && (
    <CustomersContent />
  )}

  {activeMenu === "Orders" && (
    <OrdersContent />
  )}

  {activeMenu === "Inventory" && (
    <InventoryContent />
  )}

  {activeMenu === "Referral" && (
  <ReferralContent
  vendorId={user?.id}
/>
)}

</View>

      </View>

    </SafeAreaView>

  );

}

const styles = StyleSheet.create({

  container:{
    flex:1,
    backgroundColor:"#FFF8EE",
  },

  header: {
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
  paddingHorizontal: 20,
  paddingVertical: 14,
  backgroundColor: "#F8F4EC",
},

  logoSection: {
  flexDirection: "row",
  alignItems: "center",
  flex: 1,
},

  logo:{
    width:40,
    height:40,
    marginRight:10,
    resizeMode:"contain",
  },

  appName:{
    fontSize:18,
    fontWeight:"700",
  },

  tagline:{
    color:"#777",
    fontSize:11,
  },

  body:{
    flex:1,
    flexDirection:"row",
  },

  sidebar:{
    width:120,
    backgroundColor:"#2D341F",
    paddingTop:20,
  },

  menuItem:{
    paddingVertical:18,
    paddingHorizontal:12,
  },

  menuText:{
    color:"#FFF",
    fontWeight:"600",
  },

  content:{
    flex:1,
    justifyContent:"center",
    alignItems:"center",
  },

  title:{
    fontSize:28,
    fontWeight:"700",
  },
  logout: {
  color: "#A84B21",
  fontWeight: "700",
  fontSize: 16,
},

activeMenu: {
  backgroundColor: "#C8942E",
  paddingVertical: 18,
  paddingHorizontal: 14,
},

activeText: {
  color: "#FFF",
  fontWeight: "700",
},

cardsRow: {
  flexDirection: "row",
  justifyContent: "space-between",
  marginTop: 25,
},

card: {
  flex: 1,
  backgroundColor: "#FFF",
  marginHorizontal: 8,
  borderRadius: 16,
  paddingVertical: 24,
  alignItems: "center",
  elevation: 5,
},

cardValue: {
  fontSize: 28,
  fontWeight: "800",
  color: "#A84B21",
},

cardTitle: {
  marginTop: 8,
  color: "#666",
},

activityCard: {
  marginTop: 30,
  backgroundColor: "#FFF",
  borderRadius: 18,
  padding: 20,
  elevation: 4,
},

activityTitle: {
  fontSize: 18,
  fontWeight: "700",
  marginBottom: 15,
},

activityText: {
  color: "#777",
},
logoutButton: {
  paddingHorizontal: 16,
  paddingVertical: 8,
  backgroundColor: "#A84B21",
  borderRadius: 8,
},

logoutText: {
  color: "#FFF",
  fontWeight: "700",
  fontSize: 15,
},

});