import React, { useState } from "react";
import styles from '../styles/ResellerDashboardScreen.styles';
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
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

