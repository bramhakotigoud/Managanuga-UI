import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF8EE",
  },
    body: {
    flex: 1,
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
  headerRight: {
    flexDirection: "row",
    alignItems: "center",
  },
  walletBtn: {
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "center",
  height: 26,
  paddingHorizontal: 6,
  borderWidth: 2,
  borderColor: "#C8A227",
  borderRadius: 20,
  backgroundColor: "#FFFDF7",
  marginRight: 10,
  shadowColor: "#C8A227",
  shadowOffset: {
    width: 0,
    height: 1,
  },
  shadowOpacity: 0.25,
  shadowRadius: 3,
  elevation: 2,
},

walletIcon: {
  fontSize: 13,
  marginRight: 5,
},

walletText: {
  color: "#A88416",
  fontSize: 13,
  fontWeight: "700",
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
    shadowOffset: { width: 0, height: 4 },
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
  banner: {
    borderRadius: 18,
    padding: 20,
    marginHorizontal: 16,
    marginTop: 12,
    marginBottom: 12,
    minHeight: 160,
    justifyContent: "center",
    overflow: "hidden", // Ensures background image respects rounded corners
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
  content: {
    flex: 1,
  },
});

export default styles;
