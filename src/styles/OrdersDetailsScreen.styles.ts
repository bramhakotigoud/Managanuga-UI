import {StyleSheet} from 'react-native';

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
addressPhone: {
  marginTop: 4,
  fontSize: 14,
  fontWeight: "600",
  color: "#444",
},
});

export default styles;
