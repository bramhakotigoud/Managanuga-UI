import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F4EC',
  },

  /* Fixed Top Header Styles */
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

  backButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },

  backIcon: {
    fontSize: 24,
    fontWeight: '600',
    color: '#2D341F',
    marginTop: -2,
  },

  logoSection: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 10,
  },

  logo: {
    width: 34,
    height: 34,
    resizeMode: 'contain',
    marginRight: 8,
  },

  brandTextContainer: {
    justifyContent: 'center',
  },

  appName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#2D341F',
  },

  tagline: {
    fontSize: 9,
    color: '#8C8C8C',
    fontWeight: '500',
    marginTop: 1,
  },

  headerIcons: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  iconButton: {
    marginLeft: 10,
    padding: 4,
  },

  cartIconWrapper: {
    marginLeft: 10,
    padding: 4,
    position: 'relative',
  },

  headerIconText: {
    fontSize: 18,
  },

  badgeContainer: {
    position: 'absolute',
    top: -2,
    right: -4,
    backgroundColor: '#A84B21',
    borderRadius: 9,
    minWidth: 18,
    height: 18,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 3,
  },

  badgeText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '700',
  },

  title: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 15,
    marginTop: 5,
    color: '#2D341F',
  },

  card: {
    backgroundColor: '#FFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 15,
    elevation: 2,
  },

  heading: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 10,
    color: '#A84B21',
  },

  name: {
    fontSize: 16,
    fontWeight: '700',
  },

  address: {
    marginTop: 4,
    color: '#666',
  },

  mobile: {
    marginTop: 6,
    fontWeight: '600',
  },

  change: {
    color: '#A84B21',
    fontWeight: '700',
    marginTop: 10,
  },

  divider: {
    borderBottomWidth: 1,
    borderBottomColor: '#DDD',
    marginVertical: 10,
  },

  button: {
    backgroundColor: '#A84B21',
    padding: 16,
    borderRadius: 14,
    alignItems: 'center',
    marginHorizontal: 20,
    marginBottom: 20,
  },

  buttonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: '700',
  },

  stepContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },

  activeStep: {
    width: 35,
    height: 35,
    borderRadius: 20,
    backgroundColor: '#2874F0',
    justifyContent: 'center',
    alignItems: 'center',
  },

  inactiveStep: {
    width: 35,
    height: 35,
    borderRadius: 20,
    backgroundColor: '#DDD',
    justifyContent: 'center',
    alignItems: 'center',
  },

  line: {
    width: 60,
    height: 2,
    backgroundColor: '#DDD',
  },

  stepNumber: {
    color: '#FFF',
    fontWeight: '700',
  },

  stepLabels: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },

  productCard: {
    backgroundColor: '#FFF',
    borderRadius: 15,
    padding: 15,
    marginBottom: 15,
  },

  productRow: {
    flexDirection: 'row',
  },

  productImage: {
    width: 90,
    height: 90,
    borderRadius: 10,
    resizeMode: 'contain',
  },

  productDetails: {
    flex: 1,
    marginLeft: 15,
  },

  productName: {
    fontSize: 16,
    fontWeight: '700',
  },

  productQty: {
    marginTop: 8,
    color: '#666',
  },

  productPrice: {
    marginTop: 6,
    color: '#A84B21',
    fontWeight: '700',
    fontSize: 18,
  },

  deliveryText: {
    marginTop: 6,
    color: 'green',
  },

  priceCard: {
    backgroundColor: '#FFF',
    borderRadius: 18,
    padding: 18,
    marginBottom: 20,
  },

  priceHeading: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 15,
  },

  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 8,
  },

  discountText: {
    color: 'green',
    fontWeight: '600',
  },

  finalTotal: {
    fontSize: 20,
    fontWeight: '700',
  },

  saveBox: {
    backgroundColor: '#E7F8EC',
    padding: 12,
    borderRadius: 12,
    marginTop: 15,
  },

  saveText: {
    color: 'green',
    fontWeight: '700',
    textAlign: 'center',
  },
});

export default styles;
