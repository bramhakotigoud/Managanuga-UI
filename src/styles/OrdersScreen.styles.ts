import {StyleSheet} from 'react-native';

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
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    height: 44,
    paddingRight: 12,
  },

  input: {
    flex: 1,
    backgroundColor: "transparent",
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

  searchIconButton: {
    padding: 8,
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

export default styles;
