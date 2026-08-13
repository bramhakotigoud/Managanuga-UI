import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
  ImageBackground,
} from "react-native";

import { useNavigation } from "@react-navigation/native";
import { useAuth } from "../context/AuthContext";

import CustomersContent from "../components/reseller/CustomersContent";
import ReferralContent from "../components/reseller/ReferralContent";

export default function ResellerDashboardScreen() {
  const [activeMenu, setActiveMenu] = useState("Customers");
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const { user, logout } = useAuth();
  const navigation = useNavigation<any>();

  return (
    <SafeAreaView style={styles.container}>

      {/* ================= HEADER ================= */}

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
              Reseller Panel
            </Text>
          </View>
        </View>

        <View style={styles.headerRight}>

          {/* Notification Bell */}

          <TouchableOpacity style={styles.notificationBtn}>
            <Text style={{ fontSize: 22 }}>
              🔔
            </Text>
          </TouchableOpacity>

          {/* Profile Avatar */}

          <TouchableOpacity
            style={styles.avatarBtn}
            onPress={() =>
              setShowProfileMenu(!showProfileMenu)
            }
          >
            <Text style={{ fontSize: 20 }}>
              👤
            </Text>
          </TouchableOpacity>

        </View>
      </View>

      {/* ================= PROFILE DROPDOWN ================= */}

      {showProfileMenu && (
        <TouchableOpacity
          style={styles.overlay}
          activeOpacity={1}
          onPress={() => setShowProfileMenu(false)}
        >
          <View style={styles.dropdownMenu}>

            {/* Reseller ID */}

            <View style={styles.dropdownHeader}>
              <Text
                style={{
                  fontSize: 18,
                  marginRight: 8,
                }}
              >
                👤
              </Text>

              <Text
                style={{
                  fontWeight: "700",
                  color: "#2D341F",
                }}
              >
                Reseller {user?.id || "001"}
              </Text>
            </View>

            {/* Change Password */}

            <TouchableOpacity
              style={{
                paddingVertical: 8,
              }}
            >
              <Text style={{ color: "#444" }}>
                🔒 Change Password
              </Text>
            </TouchableOpacity>

            {/* Logout */}

            <TouchableOpacity
              style={{
                paddingVertical: 8,
              }}
              onPress={async () => {
                setShowProfileMenu(false);

                await logout();

                navigation.reset({
                  index: 0,
                  routes: [{ name: "Login" }],
                });
              }}
            >
              <Text
                style={{
                  color: "#A84B21",
                  fontWeight: "700",
                }}
              >
                🚪 Logout
              </Text>
            </TouchableOpacity>

          </View>
        </TouchableOpacity>
      )}

      {/* ================= BODY ================= */}

      <ScrollView showsVerticalScrollIndicator={false}>

        {/* ================= BANNER ================= */}

        <ImageBackground
          source={require("../assets/images/banner-bg.png")}
          style={styles.banner}
          imageStyle={{ borderRadius: 18 }}
          resizeMode="cover"
        >
          <Text style={styles.bannerSubtitle}>
            Welcome back,
          </Text>

          <Text style={styles.bannerTitle}>
            Reseller {user?.id || "001"} 👋
          </Text>

          <Text style={styles.bannerDescription}>
            Manage your customers{"\n"}
            and referrals with ease.
          </Text>
        </ImageBackground>

        {/* ================= TABS ================= */}

        <View style={styles.tabsContainer}>

          {/* Customers Tab */}

          <TouchableOpacity
            style={[
              styles.tabItem,
              activeMenu === "Customers" &&
                styles.activeTabItem,
            ]}
            onPress={() => setActiveMenu("Customers")}
          >
            <Text style={{ fontSize: 20 }}>
              👥
            </Text>

            <Text
              style={[
                styles.tabText,
                activeMenu === "Customers" &&
                  styles.activeTabText,
              ]}
            >
              Customers
            </Text>
          </TouchableOpacity>

          {/* Referral Tab */}

          <TouchableOpacity
            style={[
              styles.tabItem,
              activeMenu === "Referral" &&
                styles.activeTabItem,
            ]}
            onPress={() => setActiveMenu("Referral")}
          >
            <Text style={{ fontSize: 20 }}>
              🎁
            </Text>

            <Text
              style={[
                styles.tabText,
                activeMenu === "Referral" &&
                  styles.activeTabText,
              ]}
            >
              Referral
            </Text>
          </TouchableOpacity>

        </View>

        {/* ================= CONTENT ================= */}

        <View style={styles.content}>

          {activeMenu === "Customers" && (
            <CustomersContent />
          )}

          {activeMenu === "Referral" && (
            <ReferralContent
              resellerId={user?.id || "001"}
            />
          )}

        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  /* ================= CONTAINER ================= */

  container: {
    flex: 1,
    backgroundColor: "#FFF8EE",
  },

  /* ================= HEADER ================= */

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

  logo: {
    width: 40,
    height: 40,
    marginRight: 10,
    resizeMode: "contain",
  },

  appName: {
    fontSize: 18,
    fontWeight: "700",
  },

  tagline: {
    color: "#777",
    fontSize: 11,
  },

  /* ================= HEADER RIGHT ================= */

  headerRight: {
    flexDirection: "row",
    alignItems: "center",
  },

  notificationBtn: {
    marginRight: 12,
    position: "relative",
  },

  avatarBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#FFF",
    justifyContent: "center",
    alignItems: "center",
    elevation: 2,
  },

  /* ================= PROFILE DROPDOWN ================= */

  overlay: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 998,
    backgroundColor: "transparent",
  },

  dropdownMenu: {
    position: "absolute",
    top: 60,
    right: 16,
    backgroundColor: "#FFF",
    borderRadius: 14,
    padding: 14,
    width: 180,
    zIndex: 999,
    elevation: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 8,
  },

  dropdownHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#EEE",
  },

  /* ================= BANNER ================= */

  banner: {
    borderRadius: 18,
    padding: 20,
    marginHorizontal: 16,
    marginTop: 12,
    marginBottom: 12,
    minHeight: 160,
    justifyContent: "center",
    overflow: "hidden",
  },

  bannerSubtitle: {
    color: "#E2D8C3",
    fontSize: 14,
    fontWeight: "500",
  },

  bannerTitle: {
    color: "#FFFFFF",
    fontSize: 22,
    fontWeight: "800",
    marginVertical: 4,
  },

  bannerDescription: {
    color: "#BAC8B4",
    fontSize: 12,
    lineHeight: 16,
  },

  /* ================= TABS ================= */

  tabsContainer: {
    flexDirection: "row",
    backgroundColor: "#FFF",
    borderRadius: 16,
    padding: 6,
    marginHorizontal: 16,
    marginBottom: 16,
    elevation: 2,
  },

  tabItem: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 8,
    borderRadius: 12,
  },

  activeTabItem: {
    backgroundColor: "#FFF9EE",
  },

  tabText: {
    fontSize: 11,
    fontWeight: "600",
    color: "#555",
  },

  activeTabText: {
    color: "#A84B21",
    fontWeight: "700",
  },

  /* ================= CONTENT ================= */

  content: {
    flex: 1,
  },
});