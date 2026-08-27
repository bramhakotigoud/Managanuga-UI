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

  pageTitle: {
    fontSize: 22,
    fontWeight: '700',
    marginHorizontal: 15,
    marginTop: 15,
    marginBottom: 10,
    color: '#2D341F',
  },

  card: {
    backgroundColor: '#fff',
    marginHorizontal: 15,
    marginBottom: 15,
    borderRadius: 20,
    padding: 15,
    flexDirection: 'row',
  },

  image: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
  },

  details: {
    flex: 1,
    marginLeft: 15,
  },

  name: {
    fontSize: 18,
    fontWeight: '700',
    color: '#2D341F',
  },

  rating: {
    color: '#777',
    marginTop: 5,
  },

  price: {
    fontSize: 22,
    color: '#A84B21',
    fontWeight: '700',
    marginTop: 5,
  },

  qtyRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },

  qtyButton: {
    width: 30,
    height: 30,
    backgroundColor: '#EEE',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },

  qty: {
    marginHorizontal: 15,
    fontWeight: '700',
  },

  actionRow: {
    flexDirection: 'row',
    marginTop: 15,
  },

  remove: {
    color: '#D32F2F',
    marginRight: 20,
    fontWeight: '600',
  },

  save: {
    color: '#2E7D32',
    fontWeight: '600',
  },

  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#FFF',
    padding: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
  },

  totalLabel: {
    color: '#777',
  },

  totalPrice: {
    fontSize: 24,
    fontWeight: '700',
    color: '#2D341F',
  },

  checkoutButton: {
    backgroundColor: '#A84B21',
    paddingHorizontal: 25,
    paddingVertical: 14,
    borderRadius: 12,
  },

  checkoutText: {
    color: '#FFF',
    fontWeight: '700',
  },

  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },

  emptyIcon: {
    fontSize: 60,
  },

  emptyTitle: {
    fontSize: 24,
    fontWeight: '700',
    marginTop: 15,
    color: '#2D341F',
  },

  emptyText: {
    color: '#777',
    marginTop: 10,
  },
  productImage: {
  width: 100,
  height: 100,
  resizeMode: 'contain',
},
});

export default styles;
