import React, { useState } from "react";
import styles from '../styles/VendorDashboardScreen.styles';
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  Image,
  ImageBackground,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "../context/AuthContext";

import CustomersContent from "../components/vendor/CustomersContent";
import OrdersContent from "../components/vendor/OrdersContent";
import InventoryContent from "../components/vendor/InventoryContent";
import ReferralContent from "../components/vendor/ReferralContent";

export default function VendorDashboardScreen() {
  const [activeMenu, setActiveMenu] = useState("Customers");
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const { user, logout } = useAuth();
  const navigation = useNavigation<any>();

  return (
    <SafeAreaView style={styles.container}>

      {/* HEADER SECTION  */}

      <View style={styles.header}>
        <View style={styles.logoSection}>
          <Image
            source={require("../assets/images/logo.png")}
            style={styles.logo}
          />
          <View>
            <Text style={styles.appName}>Mana Ganuga</Text>
            <Text style={styles.tagline}>Vendor Panel</Text>
          </View>
        </View>

        <View style={styles.headerRight}>

            {/* Wallet Button */}
  <TouchableOpacity
  style={styles.walletBtn}
  onPress={() => navigation.navigate("VendorWallet")}
>
    <Text style={styles.walletIcon}>💰</Text>
    <Text style={styles.walletText}>Wallet</Text>
  </TouchableOpacity>
          {/* Notification Bell */}
          <TouchableOpacity style={styles.notificationBtn}>
            <Text style={{ fontSize: 22 }}>🔔</Text>
          </TouchableOpacity>

          {/* Profile Avatar Trigger */}
          <TouchableOpacity
            style={styles.avatarBtn}
            onPress={() => setShowProfileMenu(!showProfileMenu)}
          >
            <Text style={{ fontSize: 20 }}>👤</Text>
          </TouchableOpacity>
        </View>
      </View>

      {showProfileMenu && (
        <TouchableOpacity
          style={styles.overlay}
          activeOpacity={1}
          onPress={() => setShowProfileMenu(false)}
        >
          <View style={styles.dropdownMenu}>
            <View style={styles.dropdownHeader}>
              <Text style={{ fontSize: 18, marginRight: 8 }}>👤</Text>
              <Text style={{ fontWeight: "700", color: "#2D341F" }}>
                Vendor {user?.id || "100"}
              </Text>
            </View>

            {/* <TouchableOpacity style={{ paddingVertical: 8 }}>
              <Text style={{ color: "#444" }}>👤 Profile</Text>
            </TouchableOpacity> */}

            <TouchableOpacity style={{ paddingVertical: 8 }}>
              <Text style={{ color: "#444" }}>🔒 Change Password</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={{ paddingVertical: 8 }}
              onPress={async () => {
                setShowProfileMenu(false);
                await logout();
                navigation.reset({
                  index: 0,
                  routes: [{ name: "Login" }],
                });
              }}
            >
              <Text style={{ color: "#A84B21", fontWeight: "700" }}>
                🚪 Logout
              </Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      )}

      {/* BODY*/}

      <View style={styles.body}>
        
        {/* Banner inside Body */}
        {/* 🌿 Welcome Banner with Clean Graphic Background */}
        <ImageBackground
          source={require("../assets/images/banner-bg.png")}
          style={styles.banner}
          imageStyle={{ borderRadius: 18 }}
          resizeMode="cover"
        >
          <Text style={styles.bannerSubtitle}>Welcome back,</Text>
          <Text style={styles.bannerTitle}>
            Vendor {user?.id || "100"} 👋
          </Text>
          <Text style={styles.bannerDescription}>
            Manage your business{"\n"}with ease and efficiency.
          </Text>
        </ImageBackground>
        {/* Horizontal Tabs inside Body */}
        <View style={styles.tabsContainer}>
          <TouchableOpacity
            style={[
              styles.tabItem,
              activeMenu === "Customers" && styles.activeTabItem,
            ]}
            onPress={() => setActiveMenu("Customers")}
          >
            <Text style={{ fontSize: 20 }}>👥</Text>
            <Text
              style={[
                styles.tabText,
                activeMenu === "Customers" && styles.activeTabText,
              ]}
            >
              Customers
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.tabItem,
              activeMenu === "Orders" && styles.activeTabItem,
            ]}
            onPress={() => setActiveMenu("Orders")}
          >
            <Text style={{ fontSize: 20 }}>📦</Text>
            <Text
              style={[
                styles.tabText,
                activeMenu === "Orders" && styles.activeTabText,
              ]}
            >
              Orders
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.tabItem,
              activeMenu === "Inventory" && styles.activeTabItem,
            ]}
            onPress={() => setActiveMenu("Inventory")}
          >
            <Text style={{ fontSize: 20 }}>🛒</Text>
            <Text
              style={[
                styles.tabText,
                activeMenu === "Inventory" && styles.activeTabText,
              ]}
            >
              Inventory
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.tabItem,
              activeMenu === "Referral" && styles.activeTabItem,
            ]}
            onPress={() => setActiveMenu("Referral")}
          >
            <Text style={{ fontSize: 20 }}>🎁</Text>
            <Text
              style={[
                styles.tabText,
                activeMenu === "Referral" && styles.activeTabText,
              ]}
            >
              Referral
            </Text>
          </TouchableOpacity>
        </View>

        {/* Dynamic Active Tab Content inside Body */}
        <View style={styles.content}>
          {activeMenu === "Customers" && <CustomersContent />}
          {activeMenu === "Orders" && <OrdersContent />}
          {activeMenu === "Inventory" && <InventoryContent />}
          {activeMenu === "Referral" && (
            <ReferralContent vendorId={user?.id || 100} />
          )}
        </View>

      </View>
    </SafeAreaView>
  );
}

